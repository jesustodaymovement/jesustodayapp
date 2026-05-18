## Doel

Alle oude WordPress-URL's van jesustoday.app netjes laten landen op een bestaande pagina, zodat bezoekers (en zoekmachines) geen 404 zien.

## Belangrijke beperking, eerlijk benoemd

Lovable hosting serveert deze app als SPA. Dat betekent dat we **geen echte server-side HTTP 301** kunnen sturen, omdat `_redirects`, `netlify.toml`, `vercel.json` e.d. op Lovable niet werken. Wat we wel kunnen doen, en wat Google bij SPA's accepteert als "soft redirect":

- React Router vangt elke oude URL af en stuurt de bezoeker direct door met `<Navigate to="..." replace />`. De bezoeker komt op de juiste pagina, de oude URL wordt uit de history vervangen, en de canonical tag op de doelpagina vertelt Google welke URL telt.
- Voor echte 301 statuscodes is een DNS-redirect via de oude `jesustoday.app` registrar of een proxy (bv. Cloudflare Page Rules) nodig. Dat valt buiten deze codebase. Ik kan het mappingvoorstel aanleveren dat je daar 1-op-1 kunt invoeren als je later die route kiest.

## Voorgestelde mapping

| Oude URL | Doel |
|---|---|
| `/stories/` | `/getuigenissen` |
| `/verhalen/` | `/getuigenissen` |
| `/deel-jouw-verhaal/` | `/` (primaire CTA staat in hero) |
| `/jesus-today/` | `/` |
| `/over-jesus-today/` | `/over-ons` |
| `/onze-droom/` | `/over-ons` |
| `/voor-wie-en-waar/` | `/over-ons` |
| `/over-de-app/` | `/` |
| `/de-app/` | `/` |
| `/doneren/` | `/doneren` |
| `/doneren-2/` | `/doneren` |
| `/en/donate/` | `/doneren` |
| `/meedoen/` | `/doneren` |
| `/meedoen-2/` | `/doneren` |
| `/inspirator/` | `/` |
| `/voor-inspirators/` | `/` |
| `/wordt-inspirator/` | `/` |
| `/privacy-verklaring/` | `/privacy` |
| `/privacy-verklaring-2/` | `/privacy` |
| `/cookiebeleid-eu/` | `/privacy` |
| `/contact/` | `/` (footer bevat contact) |
| `/nieuws/` | `/media` |
| `/vacatures/`, `/vacature/` | `/` |
| `/checklist/`, `/testen/`, `/languages/` | `/` |
| `/aanmelden/`, `/aanmelden-nieuwsbrief/`, `/aanmeldenopwekking2026/` | `/` |
| `/15c42-web-agency-gb-home/`, `/15c42-web-agency-gb-portfolio/`, `/15c42-web-agency-gb-portfolio-single/` | `/` |
| `/?page_id=...` | `/` (query string wordt genegeerd, valt automatisch op `/`) |

Open vraag voor jou: wil je `/meedoen` echt naar `/doneren`, of liever naar `/over-ons`? En `/cookiebeleid-eu/` naar `/privacy` of naar een aparte sectie? Laat me weten als je iets anders wilt voor specifieke regels.

## Wat ik ga bouwen

1. **`src/App.tsx`**, één nieuwe `<Route>` per oude pad direct boven de catch-all `*`. Elke route rendert `<Navigate to="/doel" replace />`. Trailing slashes worden meegenomen door beide varianten te registreren (`/stories` en `/stories/`). Voor compactheid komt er een klein array met `{ from, to }` en een `.map` die de routes genereert.

2. **Geen wijziging** aan bestaande pagina's of routes. Alleen toevoegingen.

3. **Sitemap (`scripts/generate-sitemap.ts` of `public/sitemap.xml`)**: ik laat staan zoals nu. Oude URL's horen niet in onze sitemap, alleen de echte routes. Als je wilt dat ik tegelijk een sitemap aanmaakt voor de huidige routes, zeg het erbij.

4. **Optioneel, aan te raden**: in een korte instructie zet ik klaar wat je in Cloudflare Page Rules of bij je registrar moet invoeren om wel echte HTTP 301's te krijgen vanaf het oude domein naar `storybrand-share-grace.lovable.app`. Dat is dan een copy-paste lijstje op basis van bovenstaande mapping.

## Wat ik NIET ga doen

- Geen `public/_redirects` of `vercel.json` aanmaken, want die doen niets op Lovable.
- Geen wijzigingen aan content of styling.
- Geen nieuwe pagina's (contact, cookies, vacatures) aanmaken, tenzij je dat alsnog wilt.
