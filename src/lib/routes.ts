/**
 * Enige bron voor taal-URL's.
 * Nederlands: geen voorvoegsel (huidige adressen). Andere talen: /en, /es, /fil
 * plus de Engelse paginanaam.
 */
export const PREFIX_LANGS = ['en', 'es', 'fil'] as const;
export type SiteLang = 'nl' | (typeof PREFIX_LANGS)[number];

/** Eerste URL-deel: Nederlands -> Engels */
export const PAGE_SLUGS: Record<string, string> = {
  'verhalen-over-jezus': 'stories-about-jesus',
  'over-ons': 'about-us',
  doneren: 'donate',
  steun: 'support',
  privacy: 'privacy',
  disclaimer: 'disclaimer',
  media: 'media',
  contact: 'contact',
  upload: 'upload',
  partners: 'partners',
  nations: 'nations',
  'shoop-shoop-partners': 'shoop-shoop-partners',
  'aanmelden-nieuwsbrief': 'newsletter',
};

/** Vaste tussenstukken in een adres */
const SUB_SLUGS: Record<string, string> = { kerk: 'church' };

const invert = (o: Record<string, string>) =>
  Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]));
const PAGE_SLUGS_EN_TO_NL = invert(PAGE_SLUGS);
const SUB_SLUGS_EN_TO_NL = invert(SUB_SLUGS);

const isPrefixLang = (s: string): s is (typeof PREFIX_LANGS)[number] =>
  (PREFIX_LANGS as readonly string[]).includes(s);

/** Taal uit de URL, of null als de URL geen taalgebonden pagina is. */
export const langFromPath = (pathname: string): SiteLang | null => {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] && isPrefixLang(parts[0])) return parts[0];
  if (parts[0] && PAGE_SLUGS[parts[0]]) return 'nl';
  return null;
};

/** Zet een adres om naar de Nederlandse vorm. */
export const toNlPath = (pathname: string): string => {
  const parts = pathname.split('/').filter(Boolean);
  if (!parts[0] || !isPrefixLang(parts[0])) return pathname || '/';
  const rest = parts.slice(1);
  if (rest[0]) rest[0] = PAGE_SLUGS_EN_TO_NL[rest[0]] ?? rest[0];
  for (let i = 1; i < rest.length; i++) rest[i] = SUB_SLUGS_EN_TO_NL[rest[i]] ?? rest[i];
  return '/' + rest.join('/');
};

/** Is dit een pagina die taalversies heeft? */
export const isLocalizable = (nlPath: string) => {
  const first = nlPath.split('/').filter(Boolean)[0];
  return !first || !!PAGE_SLUGS[first];
};

/** Adres van dezelfde pagina in een andere taal. */
export const localizePath = (pathname: string, lang: string): string => {
  const [pathOnly, suffix = ''] = pathname.split(/(?=[?#])/);
  const nl = toNlPath(pathOnly);
  if (!isLocalizable(nl)) return pathname;
  if (lang === 'nl' || !isPrefixLang(lang)) return nl + suffix;
  const parts = nl.split('/').filter(Boolean);
  if (parts[0]) parts[0] = PAGE_SLUGS[parts[0]];
  for (let i = 1; i < parts.length; i++) parts[i] = SUB_SLUGS[parts[i]] ?? parts[i];
  return `/${lang}${parts.length ? '/' + parts.join('/') : ''}` + suffix;
};

export const ALL_LANGS: SiteLang[] = ['nl', ...PREFIX_LANGS];
