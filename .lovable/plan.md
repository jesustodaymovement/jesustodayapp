## Auditresultaat

Basis is op orde: één h1 per pagina + h2-structuur, alle 15 img-tags hebben beschrijvende alt, alle pagina's hebben Helmet met title + description, robots.txt en sitemap.xml zijn aanwezig, llms.txt is netjes. Wat ik ga verbeteren staat hieronder.

## 1. Merknaamconsistentie

Memory: altijd "JesusToday" als één woord. Te fixen:
- `index.html`: title, description, author, og:title
- `src/pages/HomeTest.tsx` title
- `src/pages/Base.tsx` title
- `src/components/sections/Header.tsx` logo-alt

## 2. index.html aanvullen

- `og:url`, `og:site_name`, `og:image` (1200×630, zie sectie 6)
- `twitter:title`, `twitter:description`, `twitter:image`
- `<link rel="canonical" href="https://storybrand-share-grace.lovable.app/" />` (sitewide, geen per-route canonicals)
- JSON-LD uitbreiden met `WebSite` naast bestaande `Organization`

## 3. Per-route SEO-tags

Elke Helmet aanvullen met `og:title`, `og:description`, `og:type`, `og:url`, `twitter:title`, `twitter:description` op: HomeTest, Base, Testimonies, OverOns, Upload, Partners, Doneren, Media, Contact, Privacy, Disclaimer. TestimonyDetail heeft dit al, behouden.

## 4. Performance

- `<link rel="preload" as="image" fetchpriority="high">` voor LCP hero
- `<link rel="dns-prefetch">` naar `player.vimeo.com` en `i.vimeocdn.com`
- Google Fonts non-blocking laden met `media="print" onload="this.media='all'"` + `<noscript>`-fallback

## 5. Sitemap

Sitemap-generator uitbreiden zodat tijdens build de videolijst opgehaald wordt en per video een `/verhalen-over-jezus/:vimeoId` URL toegevoegd wordt. Eerst even kijken naar de huidige datasource in `src/pages/Testimonies.tsx`; lukt build-time fetch niet, dan blijft de statische lijst staan met een TODO.

## 6. OG share-image

Genereer een 1200×630 OG-image met JesusToday-logo + tagline "Jouw verhaal, eenvoudig gedeeld" in de huisstijl (lichte achtergrond, gele accent `#fad150`). Opslaan als `public/og-image.jpg`.

## 7. Google Search Console

Eén failing finding: GSC niet gekoppeld. Dit vereist OAuth, kan ik niet voor je doen. Ik laat de connector-knop staan als laatste stap.

## 8. Interne linkstructuur (nieuw)

### Contextuele cross-links in body copy
- `/over-ons`: bestaande verwijzingen koppelen aan `/verhalen-over-jezus` en `/partners`
- `/upload`: linkblok "Bekijk hoe anderen het deden" → `/verhalen-over-jezus`
- `/partners`: links naar `/upload` en `/verhalen-over-jezus`
- `/doneren`: links naar `/over-ons` (vertrouwen) en `/verhalen-over-jezus` (impact)
- `/media`: links naar `/over-ons` en `/contact`
- `/verhalen-over-jezus`: CTA-link naar `/upload`

### Beschrijvende anchor text
Generieke labels ("Lees meer", "Klik hier") vervangen door descriptieve teksten: "Bekijk alle verhalen", "Word partner met je kerk", "Steun via een eenmalige donatie", etc.

### Breadcrumbs op TestimonyDetail
`Home › Verhalen › [titel]` toevoegen bovenaan, plus `BreadcrumbList` JSON-LD in de Helmet zodat Google de kruimels in zoekresultaten kan tonen.

### Related testimonies
TestimonyDetail heeft al een "Andere verhalen"-blok, ik controleer dat de links beschrijvende anchor text (naam + titel) gebruiken in plaats van alleen een thumbnail.

### Footer-uitbreiding
Footer-linkkolom uitbreiden zodat álle hoofdroutes erin staan (nu ontbreken Upload, Partners, Doneren, Media, Contact in de Links-kolom). Dit geeft elke pagina een sitewide ingang en spreidt link equity.

## Niet veranderen

- Headingstructuur (al correct)
- Alt-tags (al volledig)
- robots.txt (al goed)
- Geen nieuwe npm packages
