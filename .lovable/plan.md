## Doel

Een aparte landingspagina `/kerken` die alle informatie rondom JesusToday voor kerken samenbrengt op één plek, los van de bredere Partners-pagina (die ook organisaties/events bedient).

## Wat komt op de pagina

Samengesteld uit bestaande content (Partners-pagina, ChurchSection, missie/over-ons, getuigenissen):

1. **Hero, speciaal voor kerken**
   - Badge "Voor kerken"
   - H1: "JesusToday in jouw kerk"
   - Subtekst: kerken activeren in evangelisatie, getuigen weer een natuurlijke plek geven
   - CTA's: "Plan een kennismaking" (mailto) + "Upload jouw getuigenis"

2. **Waarom JesusToday voor kerken**
   - 4 kernpunten: eigenaarschap bij de kerk, leden activeren, QR-kaartjes in eigen huisstijl, ondersteuning waar nodig
   - Korte intro over getuigen als bijbels principe

3. **Wat we voor jullie kerk doen**
   - 1-op-1 gesprek met bestuur/voorganger
   - Opnamedagen in de kerk
   - QR-kaartjes in jullie huisstijl met eigen QR-codes
   - Spreekbeurt over evangelisatie (dienst, jongerenavond, leiderschap)
   - Vast aanspreekpunt

4. **Zo werkt het, in 4 stappen**
   - Kennismaking bestuur → opnemen verhalen → QR-kaartjes → de straat op

5. **Aanbevolen door** (endorsements van Martin Koornstra, Jan Pool, Ben Verboom)

6. **Kerken die al meedoen** (marquee/grid met alleen de kerk-partners: Europoort, Motion Church, Stadskerk, R5 Kerk, etc., plus relevante organisaties als Opwekking en The Send)

7. **Veelgestelde vragen voor kerken**
   - Moeten we zelf opnemen?
   - Wat als we geen video-ervaring hebben?
   - Wat kost het?
   - Mogen we de verhalen ook zelf gebruiken in diensten?

8. **CTA-blok onderaan**
   - "Plan een vrijblijvende kennismaking" met mailto naar info@jesustoday.nl + link naar `/upload`

## Technische opzet

- Nieuwe pagina: `src/pages/Kerken.tsx` (gebruikt `Header`, `Footer`, `ScrollReveal`, `Helmet`, dezelfde design tokens en `#fad150`/gold accent)
- Route toevoegen in `src/App.tsx`: `<Route path="/kerken" element={<Kerken />} />` (lazy import)
- Bestaande assets hergebruiken (`@/assets/partners/*`, `boothSelfie`, endorsement-foto's), geen nieuwe afbeeldingen genereren
- Sitemap: `/kerken` toevoegen in `scripts/generate-sitemap.ts` en `public/sitemap.xml`
- `public/llms.txt`: kerken-pagina toevoegen onder Pages
- i18n: NL tekst direct in component via `t()` keys; EN-vertalingen toevoegen in `src/i18n/locales/en.json`
- SEO: unieke `<title>`, meta description en canonical voor `/kerken`
- Geen wijzigingen aan Partners-pagina; vanuit de Partners-pagina kort linken naar `/kerken` voor kerk-specifieke info (optioneel)

## Buiten scope

- Geen backend/formulierwijzigingen, geen nieuwe afbeeldingen, geen redesign van bestaande secties
- Geen wijzigingen aan de Admin-omgeving
