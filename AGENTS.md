
- Church names, slugs, websites and spelling variants live only in src/lib/churches.ts; every filter, link, title and sitemap entry reads from it so names never diverge.
- Language URLs come only from src/lib/routes.ts (NL unprefixed, other languages /<lang>/ + English slug); LangSync derives the site language from the URL and rewrites internal links.
