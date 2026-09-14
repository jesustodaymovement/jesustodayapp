import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { clientIp, detectSpam, sha256 } from '../_shared/spam-guard.ts'

// Publiek eindpunt (verify_jwt = false): de browser heeft hier geen sessie.
// Bescherming komt van het honeypot-veld, de tijdmeting, de snelheidslimiet
// per IP en het spamfilter. Spam wordt stil geweigerd: niets opgeslagen,
// geen mail, en de afzender ziet een gewone succesmelding.

const SUBMISSION_TYPES = ['contact', 'vraag', 'partner', 'opwekking', 'locatie', 'reactie'] as const

const BodySchema = z.object({
  type: z.enum(SUBMISSION_TYPES),
  formName: z.string().trim().min(1).max(150),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
  organization: z.string().trim().max(150).optional().or(z.literal('')),
  subject: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().min(1).max(2000),
  metadata: z.record(z.any()).optional(),
  extraFields: z
    .array(z.object({ label: z.string().max(100), value: z.string().max(500).optional() }))
    .max(30)
    .optional(),
  confirmationIntro: z.string().max(500).optional(),
  honeypot: z.string().max(200).optional(),
  elapsedMs: z.number().int().min(0).max(86_400_000).optional(),
})

// Vensters: 3 per IP / 10 min, 10 per IP / 24 uur, 3 per e-mail / 1 uur.
const LIMITS = [
  { scope: 'ip' as const, windowMs: 10 * 60 * 1000, max: 3, reason: 'rate_limit_ip_10min' },
  { scope: 'ip' as const, windowMs: 24 * 60 * 60 * 1000, max: 10, reason: 'rate_limit_ip_day' },
  { scope: 'email' as const, windowMs: 60 * 60 * 1000, max: 3, reason: 'rate_limit_email_hour' },
]

function json(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) {
    console.error('Missing required environment variables')
    return json({ error: 'Server configuration error' }, 500)
  }

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return json({ error: 'Invalid JSON in request body' }, 400)
  }

  const parsed = BodySchema.safeParse(raw)
  if (!parsed.success) {
    return json({ error: 'validation_failed', fields: parsed.error.flatten().fieldErrors }, 400)
  }
  const input = parsed.data
  const email = input.email.toLowerCase()

  const supabase = createClient(supabaseUrl, serviceKey)
  const salt = Deno.env.get('SPAM_IP_SALT') ?? 'jesustoday-fallback-salt'
  const ip = clientIp(req)
  const ipHash = await sha256(`${salt}:${ip}`)
  const messageHash = await sha256(
    `${salt}:${input.message.toLowerCase().replace(/\s+/g, ' ').trim()}`,
  )
  const userAgent = (req.headers.get('user-agent') ?? '').slice(0, 300)

  const logBlocked = async (reason: string) => {
    console.warn('Blocked submission', { reason, form: input.formName })
    const { error } = await supabase.from('blocked_submissions').insert({
      form_name: input.formName,
      type: input.type,
      reason,
      score: 100,
      signals: [reason],
      name: input.name.slice(0, 100),
      email,
      message_excerpt: input.message.slice(0, 500),
      ip_hash: ipHash,
      user_agent: userAgent,
    })
    if (error) console.warn('Failed to log blocked submission', error.message)
  }

  /** Stille weigering: bots leren zo niets van de reactie. */
  const silentOk = async (reason: string) => {
    await logBlocked(reason)
    return json({ success: true })
  }

  // 1. Spamfilter: honeypot, tijd, links, spamwoorden, schrift, naamchecks.
  const spamReason = detectSpam({
    name: input.name,
    email,
    subject: input.subject,
    message: input.message,
    honeypot: input.honeypot,
    elapsedMs: input.elapsedMs,
  })
  if (spamReason) return await silentOk(spamReason)

  // 2. Snelheidslimieten per IP en per e-mailadres.
  const oldest = Math.max(...LIMITS.map((l) => l.windowMs))
  const since = new Date(Date.now() - oldest).toISOString()
  const { data: recent, error: recentError } = await supabase
    .from('submission_rate_limits')
    .select('ip_hash, email, message_hash, created_at')
    .gte('created_at', since)
    .or(`ip_hash.eq.${ipHash},email.eq.${email},message_hash.eq.${messageHash}`)
  if (recentError) console.warn('Rate limit lookup failed', recentError.message)

  const rows = recent ?? []
  for (const limit of LIMITS) {
    const from = Date.now() - limit.windowMs
    const count = rows.filter((r) => {
      if (new Date(r.created_at as string).getTime() < from) return false
      return limit.scope === 'ip' ? r.ip_hash === ipHash : r.email === email
    }).length
    if (count >= limit.max) return await silentOk(limit.reason)
  }

  // 3. Exact hetzelfde bericht is al eerder binnengekomen.
  if (rows.some((r) => r.message_hash === messageHash)) {
    return await silentOk('duplicate_message')
  }

  // 4. Opslaan (alleen de server mag dit) en de limiethit vastleggen.
  const id = crypto.randomUUID()
  const { error: insertError } = await supabase.from('submissions').insert({
    id,
    type: input.type,
    name: input.name,
    email,
    phone: input.phone || null,
    organization: input.organization || null,
    subject: input.subject || null,
    message: input.message,
    metadata: input.metadata ?? null,
  })
  if (insertError) {
    console.error('Submission insert failed', {
      code: insertError.code,
      message: insertError.message,
    })
    return json({ error: 'save_failed' }, 500)
  }

  const { error: rlError } = await supabase
    .from('submission_rate_limits')
    .insert({ ip_hash: ipHash, email, message_hash: messageHash })
  if (rlError) console.warn('Rate limit insert failed', rlError.message)

  // 5. Pas hierna gaan de mails eruit.
  const fields = [
    input.subject ? { label: 'Onderwerp', value: input.subject } : null,
    input.phone ? { label: 'Telefoon', value: input.phone } : null,
    input.organization ? { label: 'Organisatie', value: input.organization } : null,
    ...(input.extraFields ?? []).filter((f) => f && f.value),
  ].filter(Boolean)

  const { error: emailError } = await supabase.functions.invoke('send-submission-emails', {
    body: {
      submissionId: id,
      formName: input.formName,
      name: input.name,
      email,
      message: input.message,
      subject: input.subject,
      fields,
      submittedAt: new Date().toLocaleString('nl-NL', { dateStyle: 'long', timeStyle: 'short' }),
      confirmationIntro: input.confirmationIntro,
    },
  })
  if (emailError) console.warn('Email dispatch failed', emailError.message)

  // Opruimen van verlopen limietregels, zonder de reactie te vertragen.
  void supabase
    .from('submission_rate_limits')
    .delete()
    .lt('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .then(({ error }) => {
      if (error) console.warn('Rate limit cleanup failed', error.message)
    })

  return json({ success: true, id })
})
