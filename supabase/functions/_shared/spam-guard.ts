// Server-side spam checks, shared by public form endpoints.
// Every rule returns a machine-readable reason so blocks can be monitored.

export interface SpamInput {
  name: string
  email: string
  subject?: string
  message: string
  honeypot?: string
  elapsedMs?: number
}

export interface SpamVerdict {
  blocked: boolean
  reason?: string
  score: number
  signals: string[]
}

const SPAM_WORDS = [
  'seo', 'backlink', 'back link', 'link building', 'linkbuilding', 'ranking',
  'rank higher', 'google ranking', 'domain authority', 'guest post', 'casino',
  'crypto', 'bitcoin', 'forex', 'viagra', 'cialis', 'porn', 'escort',
  'loan offer', 'cheap price', 'buy now', 'traffic to your website',
  'first page of google', 'web design services', 'digital marketing agency',
]

const DISPOSABLE_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'yopmail.com', '10minutemail.com',
  'tempmail.com', 'temp-mail.org', 'trashmail.com', 'sharklasers.com',
  'getnada.com', 'dropmail.me', 'maildrop.cc', 'fakeinbox.com',
]

/** Counts links, including obfuscated variants such as "example [dot] com". */
export function countUrls(text: string): number {
  const normalized = text
    .toLowerCase()
    .replace(/\s*[\[\(]\s*(dot|punt|d0t)\s*[\]\)]\s*/g, '.')
    .replace(/\s+(dot|punt)\s+/g, '.')
    .replace(/\s*[\[\(]\s*(at|apenstaartje)\s*[\]\)]\s*/g, '@')

  const patterns = [
    /https?:\/\/\S+/g,
    /\bwww\.[a-z0-9-]+\.[a-z]{2,}/g,
    /\b[a-z0-9-]+\.(com|net|org|ru|cn|xyz|top|info|biz|online|site|club|shop|link|io|co|de|nl|uk|es|ph)\b(?!\S*@)/g,
    /\[url[=\]]/g,
    /<a\s+href/g,
  ]

  const hits = new Set<string>()
  for (const re of patterns) {
    for (const match of normalized.matchAll(re)) {
      hits.add(match[0].replace(/[.,;:!?)]+$/, ''))
    }
  }
  return hits.size
}

export function evaluateSpam(input: SpamInput): SpamVerdict {
  const signals: string[] = []
  let score = 0

  // 1. Honeypot: only bots fill a hidden field.
  if ((input.honeypot ?? '').trim() !== '') {
    return { blocked: true, reason: 'honeypot', score: 100, signals: ['honeypot_filled'] }
  }

  // 2. Humans need time to type; sub-second submits are automated.
  if (typeof input.elapsedMs === 'number' && input.elapsedMs >= 0 && input.elapsedMs < 1500) {
    return { blocked: true, reason: 'too_fast', score: 100, signals: ['submitted_too_fast'] }
  }

  const haystack = `${input.name} ${input.subject ?? ''} ${input.message}`
  const lower = haystack.toLowerCase()

  // 3. More than one link is never a genuine message here.
  const urlCount = countUrls(haystack)
  if (urlCount > 1) {
    return {
      blocked: true,
      reason: 'too_many_links',
      score: 100,
      signals: [`urls_${urlCount}`],
    }
  }
  if (urlCount === 1) {
    score += 20
    signals.push('urls_1')
  }

  // 4. Weighted signals.
  const matchedWords = SPAM_WORDS.filter((w) => lower.includes(w))
  if (matchedWords.length > 0) {
    score += 35 * Math.min(matchedWords.length, 3)
    signals.push(`spam_words:${matchedWords.slice(0, 5).join(',')}`)
  }

  const domain = input.email.split('@')[1]?.toLowerCase() ?? ''
  if (DISPOSABLE_DOMAINS.includes(domain)) {
    score += 60
    signals.push('disposable_email')
  }

  // Non-latin scripts in an otherwise latin form.
  if (/[\u0400-\u04FF\u4E00-\u9FFF\u3040-\u30FF]/.test(haystack)) {
    score += 60
    signals.push('non_latin_script')
  }

  if (/\b(bcc|to):\s*\S+@\S+/i.test(input.message) || /content-type:\s*text\//i.test(input.message)) {
    score += 80
    signals.push('header_injection')
  }

  if (/(.)\1{9,}/.test(input.message)) {
    score += 25
    signals.push('repeated_characters')
  }

  if (input.name.length > 0 && /https?:|www\./i.test(input.name)) {
    score += 60
    signals.push('url_in_name')
  }

  if (score >= 60) {
    return { blocked: true, reason: 'spam_score', score, signals }
  }
  return { blocked: false, score, signals }
}

export async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for') ?? ''
  return (forwarded.split(',')[0] || req.headers.get('cf-connecting-ip') || 'unknown').trim()
}

export interface TurnstileResult {
  ok: boolean
  reason?: string
  configured: boolean
}

/** Verifies a Cloudflare Turnstile token. Without a secret configured the
 *  check is skipped so the other layers keep the forms working. */
export async function verifyTurnstile(token: string, ip: string): Promise<TurnstileResult> {
  const secret = Deno.env.get('TURNSTILE_SECRET_KEY')
  if (!secret) return { ok: true, configured: false }
  if (!token) return { ok: false, reason: 'turnstile_missing_token', configured: true }

  try {
    const form = new FormData()
    form.append('secret', secret)
    form.append('response', token)
    if (ip && ip !== 'unknown') form.append('remoteip', ip)

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    })
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] }
    if (data.success) return { ok: true, configured: true }
    return {
      ok: false,
      reason: `turnstile_failed:${(data['error-codes'] ?? []).join(',') || 'unknown'}`,
      configured: true,
    }
  } catch (error) {
    console.error('Turnstile verification error', (error as Error)?.message)
    // Never lose a genuine message because Cloudflare is unreachable.
    return { ok: true, configured: true }
  }
}
