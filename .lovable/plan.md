# Plan: /partners pagina voor kerken en organisaties

## Doel
Een aparte landingspagina (`/partners`) die kerken en christelijke organisaties uitnodigt om partner te worden van JesusToday. Focus: kerken nemen eigenaarschap over het verzamelen van getuigenissen, JesusToday levert proces, opnamehulp en QR-kaartjes in de huisstijl van de kerk.

## Pagina structuur (/partners)

```text
+--------------------------------------------------+
| 1. Hero                                          |
|    Chip: Voor kerken & organisaties              |
|    H1: Word partner van JesusToday               |
|    Sub: Activeer je gemeente om getuigenissen    |
|         te delen, in jullie eigen huisstijl.     |
|    [Meld je kerk aan]  [Plan kennismaking]      |
+--------------------------------------------------+
| 2. Waarom partner worden (3-4 voordelen)         |
|    - Eigenaarschap in je gemeente                |
|    - Activeer leden om de straat op te gaan      |
|    - Kaartjes in jullie huisstijl (logo+kleur)   |
|    - Wij regelen techniek, opname en print       |
+--------------------------------------------------+
| 3. Zo werkt een partnership (4 stappen)          |
|    01 Kennismaking met bestuur                   |
|    02 Filmdag in jullie kerk                     |
|    03 QR-kaartjes in jullie huisstijl            |
|    04 Gemeenteleden delen verhalen op straat     |
+--------------------------------------------------+
| 4. Wat we bieden                                 |
|    - 1-op-1 gesprek bestuur                      |
|    - Vast aanspreekpunt JesusToday-team          |
|    - Filmdagen op locatie                        |
|    - Spreekbeurt over evangelisatie              |
|    - Kaartjes met QR in eigen huisstijl          |
+--------------------------------------------------+
| 5. Mockup kaartje in huisstijl (visual)          |
|    Voor/achterkant kaartje, logo+kleur kerk      |
+--------------------------------------------------+
| 6. Onze partners (logo-grid)                     |
|    9 logo's uit upload, allemaal klikbaar        |
+--------------------------------------------------+
| 7. FAQ kort                                      |
|    - Kost dit geld?                              |
|    - Hoe lang duurt een filmdag?                 |
|    - Wat als we geen ervaring hebben?            |
|    - Mogen we de getuigenissen ook zelf delen?   |
+--------------------------------------------------+
| 8. Eind-CTA                                      |
|    [Meld je kerk aan]  [Mail ons]                |
+--------------------------------------------------+
| Footer                                           |
+--------------------------------------------------+
```

## Partners (logo's + gevonden links, ter goedkeuring)

Verwerken in een logo-grid sectie, elk logo klikbaar naar onderstaande URL. Graag goedkeuren of corrigeren:

1. GlobalRize, https://www.globalrize.nl/
2. The Send Nederland, https://thesend.nl/
3. Europoort International Church, https://europoortinternational.nl/
4. Stichting Opwekking, https://opwekking.nl/
5. Lifeschool, https://lifeschool.nu/
6. Motion Church (Utrecht), https://motion.church/
7. De Stadskerk (VBG Groningen), https://destadskerk.nl/
8. Agapè Nederland, https://agape.nl/
9. R5 Kerk & Bijbelschool, https://r5church.nl/

Logo's worden gekopieerd uit de uploads naar `src/assets/partners/` en als ES6-imports geladen. Op kleine schermen: 2 kolommen, op desktop: 4-5 kolommen, in cream-achtige tinten met grayscale-hover-effect zodat de stijl rustig blijft.

## CTA-strategie
Primaire CTA "Meld je kerk aan" wijst standaard naar `/upload`. Je noemde ook "believer page", dat staat nu niet in de codebase, dus ik vraag hieronder waar die naartoe moet wijzen.

Secundaire CTA: `mailto:info@jesustoday.nl` of `/contact` voor een kennismakingsgesprek.

## Wijzigingen aan bestaande site

- Nieuwe route `/partners` in `src/App.tsx`
- Link "Partners" toevoegen aan `Header.tsx` navigatie en aan de footer
- Geen wijzigingen aan andere pagina's nodig

## Technische details

- Nieuwe file: `src/pages/Partners.tsx` met `<Helmet>` (title, meta, canonical), `<Header>`, `<Footer>`
- Nieuwe sectie-component is niet strikt nodig, maar de logo-grid wordt als kleine subcomponent in dezelfde file gehouden
- Design system: cream/anthracite afwisseling, gele accent `#fad150`, bestaande Button-varianten (`hero`, `cta-light`, `outline`)
- Tone: positief, lichte sfeer, geen angst-retoriek, schrijfwijze "JesusToday" als één woord, alleen komma's (geen em-dashes)
- Logo-assets: 9 PNG's via `code--copy` van `user-uploads://` naar `src/assets/partners/`

## Wat ik nog van jou nodig heb

1. "Believer page": welke pagina/URL wordt daarmee bedoeld? Bestaat die al ergens (extern), of moet de CTA gewoon naar `/upload` of `/contact`?
2. Bovenstaande 9 partner-URL's: alle 9 akkoord, of zijn er correcties (denk aan The Send wel/niet, Europoort EN-versie, etc.)?
3. Moet "Partners" ook in de hoofdnavigatie (`Header`), of alleen in de footer en via interne links?
