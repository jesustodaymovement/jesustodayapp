/**
 * Spamfilter voor alle eigen formulieren.
 * Geeft een reden terug als een inzending spam is, anders null.
 * Dezelfde regels lopen ook op de server, vlak voor het versturen van mail.
 */

export interface SpamCheckInput {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  /** Inhoud van het verborgen honeypot-veld */
  honeypot?: string;
  /** Milliseconden tussen openen en verzenden van het formulier */
  elapsedMs?: number;
}

export const MIN_FILL_TIME_MS = 3000;

const SPAM_WORDS = [
  'seo services', 'seo service', 'seo expert', 'seo agency', 'search engine optimization',
  'backlink', 'back link', 'link building', 'linkbuilding', 'guest post', 'guest posting',
  'domain authority', 'rank higher', 'higher ranking', 'first page of google',
  'increase traffic', 'website traffic', 'web design services', 'digital marketing agency',
  'free quote', 'free consultation', 'crypto', 'bitcoin', 'forex', 'casino', 'betting',
  'loan offer', 'quick loan', 'viagra', 'cialis', 'escort', 'porn', 'cheap price',
  'buy now', 'limited offer', 'work from home', 'make money online', 'unsubscribe here',
];

/** Telt links, inclusief verhulde varianten zoals "voorbeeld [dot] nl". */
export function countLinks(text: string): number {
  const normalized = text
    .toLowerCase()
    .replace(/\s*[[(]\s*(dot|punt|d0t)\s*[)\]]\s*/g, '.')
    .replace(/\s+(dot|punt)\s+/g, '.')
    .replace(/\s*[[(]\s*(at|apenstaartje)\s*[)\]]\s*/g, '@');

  const patterns = [
    /https?:\/\/\S+/g,
    /\bwww\.[a-z0-9-]+\.[a-z]{2,}/g,
    /\b[a-z0-9-]+\.(com|net|org|ru|cn|xyz|top|info|biz|online|site|club|shop|link|io|co|de|nl|uk|es|ph|in|pk)\b(?!\S*@)/g,
  ];

  const hits = new Set<string>();
  for (const re of patterns) {
    for (const match of normalized.matchAll(re)) {
      hits.add(match[0].replace(/[.,;:!?)]+$/, ''));
    }
  }
  return hits.size;
}

export function hasMarkupLink(text: string): boolean {
  return /\[url[=\]]/i.test(text) || /<a\s+href/i.test(text) || /\[link[=\]]/i.test(text);
}

function hasNonLatinScript(text: string): boolean {
  // Cyrillisch, Chinees, Japans of Koreaans schrift
  return /[\u0400-\u04FF\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF]/.test(text);
}

function looksLikeFakeName(name: string, email: string): boolean {
  const clean = name.trim().toLowerCase();
  if (!clean) return false;
  if (clean === email.trim().toLowerCase()) return true;
  const letters = clean.replace(/[^a-z]/g, '');
  if (letters.length >= 5 && !/[aeiouy]/.test(letters)) return true;
  return false;
}

/**
 * Geeft een korte reden terug bij spam, of null bij een gewone inzending.
 */
export function detectSpam(input: SpamCheckInput): string | null {
  const name = (input.name ?? '').trim();
  const email = (input.email ?? '').trim();
  const subject = (input.subject ?? '').trim();
  const message = (input.message ?? '').trim();

  if ((input.honeypot ?? '').trim() !== '') return 'honeypot';

  if (
    typeof input.elapsedMs === 'number' &&
    input.elapsedMs >= 0 &&
    input.elapsedMs < MIN_FILL_TIME_MS
  ) {
    return 'too_fast';
  }

  const haystack = `${name} ${subject} ${message}`;
  const lower = haystack.toLowerCase();

  if (hasMarkupLink(haystack)) return 'markup_link';

  const links = countLinks(haystack);
  if (links >= 3) return 'too_many_links';
  if (links >= 1 && message.length < 200) return 'link_in_short_message';

  const wordHits = SPAM_WORDS.filter((w) => lower.includes(w));
  if (wordHits.length >= 2) return `spam_words:${wordHits.slice(0, 3).join(',')}`;
  if (wordHits.length === 1 && links >= 1) return `spam_word_with_link:${wordHits[0]}`;

  if (hasNonLatinScript(haystack)) return 'non_latin_script';

  if (looksLikeFakeName(name, email)) return 'suspicious_name';

  return null;
}
