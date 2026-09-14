/**
 * Serverkant van het spamfilter. Dezelfde regels als src/lib/spam-guard.ts,
 * zodat directe API-aanroepen net zo hard worden geweigerd als het formulier.
 */

export interface SpamCheckInput {
  name?: string
  email?: string
  subject?: string
  message?: string
  honeypot?: string
  elapsedMs?: number
}

export const MIN_FILL_TIME_MS = 3000

const SPAM_WORDS = [
  'seo services', 'seo service', 'seo expert', 'seo agency', 'search engine optimization',
  'backlink', 'back link', 'link building', 'linkbuilding', 'guest post', 'guest posting',
  'domain authority', 'rank higher', 'higher ranking', 'first page of google',
  'increase traffic', 'website traffic', 'web design services', 'digital marketing agency',
  'free quote', 'free consultation', 'crypto', 'bitcoin', 'forex', 'casino', 'betting',
  'loan offer', 'quick loan', 'viagra', 'cialis', 'escort', 'porn', 'cheap price',
  'buy now', 'limited offer', 'work from home', 'make money online', 'unsubscribe here',
]

const DISPOSABLE_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'yopmail.com', '10minutemail.com',
  'tempmail.com', 'temp-mail.org', 'trashmail.com', 'sharklasers.com',
  'getnada.com', 'dropmail.me', 'maildrop.cc', 'fakeinbox.com',
]

export function countLinks(text: string): number {
  const normalized = text
    .toLowerCase()
    .replace(/\s*[[(]\s*(dot|punt|d0t)\s*[)\]]\s*/g, '.')
    .replace(/\s+(dot|punt)\s+/g, '.')
    .replace(/\s*[[(]\s*(at|apenstaartje)\s*[)\]]\s*/g, '@')

  const patterns = [
    /https?:\/\/\S+/g,
    /\bwww\.[a-z0-9-]+\.[a-z]{2,}/g,
    /\b[a-z0-9-]+\.(com|net|org|ru|cn|xyz|top|info|biz|online|site|club|shop|link|io|co|de|nl|uk|es|ph|in|pk)\b(?!\S*@)/g,
  ]

  const hits = new Set<string>()
  for (const re of patterns) {
    for (const match of normalized.matchAll(re)) {
      hits.add(match[0].replace(/[.,;:!?)]+$/, ''))
    }
  }
  return hits.size
}

export function hasMarkupLink(text: string): boolean {
  return /\[url[=\]]/i.test(text) || /<a\s+href/i.test(text) || /\[link[=\]]/i.test(text)
}

function hasNonLatinScript(text: string): boolean {
  return /[\u0400-\u04FF\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF]/.test(text)
}

function looksLikeFakeName(name: string, email: string): boolean {
  const clean = name.trim().toLowerCase()
  if (!clean) return false
  if (clean === email.trim().toLowerCase()) return true
  const letters = clean.replace(/[^a-z]/g, '')
  if (letters.length >= 5 && !/[aeiouy]/.test(letters)) return true
  return false
}

/** Reden bij spam, of null bij een gewone inzending. */
export function detectSpam(input: SpamCheckInput): string | null {
  const name = (input.name ?? '').trim()
  const email = (input.email ?? '').trim()
  const subject = (input.subject ?? '').trim()
  const message = (input.message ?? '').trim()

  if ((input.honeypot ?? '').trim() !== '') return 'honeypot'

  if (
    typeof input.elapsedMs === 'number' &&
    input.elapsedMs >= 0 &&
    input.elapsedMs < MIN_FILL_TIME_MS
  ) {
    return 'too_fast'
  }

  const haystack = `${name} ${subject} ${message}`
  const lower = haystack.toLowerCase()

  if (hasMarkupLink(haystack)) return 'markup_link'
  if (/\b(bcc|to):\s*\S+@\S+/i.test(message) || /content-type:\s*text\//i.test(message)) {
    return 'header_injection'
  }

  const links = countLinks(haystack)
  if (links >= 3) return 'too_many_links'
  if (links >= 1 && message.length < 200) return 'link_in_short_message'

  const wordHits = SPAM_WORDS.filter((w) => lower.includes(w))
  if (wordHits.length >= 2) return `spam_words:${wordHits.slice(0, 3).join(',')}`
  if (wordHits.length === 1 && links >= 1) return `spam_word_with_link:${wordHits[0]}`

  if (hasNonLatinScript(haystack)) return 'non_latin_script'
  if (looksLikeFakeName(name, email)) return 'suspicious_name'

  const domain = email.split('@')[1]?.toLowerCase() ?? ''
  if (DISPOSABLE_DOMAINS.includes(domain)) return 'disposable_email'

  return null
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
