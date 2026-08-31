import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { EmailAPIError } from 'npm:@lovable.dev/email-js@0.1.0'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

// Auth note: verify_jwt = true in config.toml, so Supabase's gateway validates
// the caller's JWT (anon or service_role) before this code runs.

interface Field {
  label?: string
  value?: string
}

function redactEmail(email: string | null | undefined): string {
  if (!email) return '***'
  const [localPart, domain] = email.split('@')
  if (!localPart || !domain) return '***'
  return `${localPart[0]}***@${domain}`
}

function jsonResponse(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing required environment variables')
    return jsonResponse({ error: 'Server configuration error' }, 500)
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ error: 'Invalid JSON in request body' }, 400)
  }

  const submissionId = str(body.submissionId, 100)
  const formName = str(body.formName, 150) || 'Formulier'
  const name = str(body.name, 100)
  const email = str(body.email, 255).toLowerCase()
  const message = str(body.message, 2000)
  const submittedAt = str(body.submittedAt, 100)
  const intro = str(body.confirmationIntro, 500)
  const fields: Field[] = Array.isArray(body.fields)
    ? (body.fields as Field[])
        .filter((f) => f && typeof f === 'object')
        .slice(0, 20)
        .map((f) => ({ label: str(f.label, 100), value: str(f.value, 500) }))
        .filter((f) => f.label && f.value)
    : []

  if (!submissionId || !name || !EMAIL_RE.test(email) || !message) {
    return jsonResponse({ error: 'submissionId, name, email and message are required' }, 400)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // Only send for a submission that really exists — the recipient and content
  // come from the stored row, never from arbitrary browser input.
  const { data: submission, error: lookupError } = await supabase
    .from('submissions')
    .select('id, name, email, message')
    .eq('id', submissionId)
    .maybeSingle()

  if (lookupError) {
    console.error('Submission lookup failed', {
      code: lookupError.code,
      message: lookupError.message,
    })
    return jsonResponse({ error: 'Failed to verify submission' }, 500)
  }
  if (!submission || String(submission.email).toLowerCase() !== email) {
    return jsonResponse({ error: 'Submission not found' }, 404)
  }

  const logSend = async (
    templateName: string,
    recipient: string,
    status: 'sent' | 'suppressed' | 'failed',
    errorMessage?: string,
  ) => {
    const { error } = await supabase.from('email_send_log').insert({
      message_id: null,
      template_name: templateName,
      recipient_email: recipient,
      status,
      error_message: errorMessage ?? null,
    })
    if (error) {
      console.warn('Failed to insert email_send_log', { code: error.code, message: error.message })
    }
  }

  const send = async (
    templateName: string,
    recipient: string,
    templateData: Record<string, unknown>,
    idempotencyKey: string,
  ) => {
    try {
      const result = await sendTemplateEmail(templateName, recipient, {
        templateData,
        idempotencyKey,
        replyTo: templateName === 'submission-notification' ? email : undefined,
      })
      if (result.sent) {
        await logSend(templateName, recipient, 'sent')
      } else {
        await logSend(templateName, recipient, 'suppressed')
      }
      return result.sent
    } catch (error) {
      const msg =
        error instanceof EmailAPIError
          ? `${error.code}: ${error.message}`
          : (error as Error)?.message ?? 'Unknown error'
      console.error('Failed to send submission email', {
        templateName,
        recipient_redacted: redactEmail(recipient),
        error: msg,
      })
      await logSend(templateName, recipient, 'failed', msg)
      return false
    }
  }

  const [notified, confirmed] = await Promise.all([
    send(
      'submission-notification',
      email,
      { formName, name, email, fields, message, submittedAt },
      `submission-notify-${submissionId}`,
    ),
    send(
      'submission-confirmation',
      email,
      {
        name: name.split(' ')[0],
        formName: 'je bericht',
        message,
        intro: intro || undefined,
      },
      `submission-confirm-${submissionId}`,
    ),
  ])

  return jsonResponse({ success: true, notified, confirmed })
})
