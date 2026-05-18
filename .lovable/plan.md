# Plan: /upload landingspagina voor app-conversie

## Doel
Een tussenstap creëren tussen de "Upload jouw verhaal" CTA's en de app stores. In plaats van direct naar Apple/Google te sturen (waar veel mensen afhaken), krijgen ze eerst een korte, krachtige uitleg over hoe het werkt, waarna ze gemotiveerd doorklikken naar de juiste store.

## Waarom dit conversie verhoogt
- **Verwachting managen**: mensen weten waarom ze de app nodig hebben voordat ze installeren
- **Vertrouwen opbouwen**: visuele uitleg + sociale bewijslast vermindert drempel
- **Device detection**: iOS-gebruikers zien de App Store knop bovenaan, Android-gebruikers Google Play, geen verwarring
- **Eén focus per pagina**: geen afleidende navigatie, alleen "download de app"

## Pagina structuur (/upload)

```text
+--------------------------------------------------+
| 1. Hero                                          |
|    H1: Jouw verhaal, in 3 stappen gedeeld        |
|    Sub: Download de app, neem op, deel.          |
|    [App Store]  [Google Play]                    |
|    (device-detect: relevante store eerst+groot)  |
+--------------------------------------------------+
| 2. Zo werkt het (3 stappen, visueel)             |
|    01 Download    02 Neem op    03 Deel via QR   |
|    Iconen + korte tekst per stap                 |
+--------------------------------------------------+
| 3. App preview (screenshots of mockup)           |
|    1-2 schermen van de app naast elkaar          |
+--------------------------------------------------+
| 4. Korte FAQ / geruststelling                    |
|    - Is het gratis? Ja.                          |
|    - Hoe lang duurt opnemen? ~5 min.             |
|    - Wat gebeurt er met mijn video? (privacy)    |
+--------------------------------------------------+
| 5. Eindsectie: nogmaals de download knoppen      |
|    [App Store]  [Google Play]                    |
+--------------------------------------------------+
| Footer                                           |
+--------------------------------------------------+
```

## Wijzigingen aan bestaande site

**Alle "Upload jouw verhaal" knoppen** verwijzen voortaan naar `/upload` in plaats van direct naar de stores. Bestanden waar dit nu speelt:
- `HeroAudience.tsx` (share-modus primaire CTA)
- `GuideSection.tsx` (nieuwe CTA die we net plaatsten)
- `PlanSection.tsx`
- `CTASection.tsx`
- `HeroSectionVideo.tsx`
- eventueel andere upload-knoppen

De directe App Store / Google Play badges in de hero blijven wel direct linken (voor wie al weet dat ze de app willen).

## Technische details

- Nieuwe file: `src/pages/Upload.tsx` met `<Helmet>` (title + meta), `<Header>` en `<Footer>`
- Route toevoegen in `src/App.tsx`: `<Route path="/upload" element={<Upload />} />`
- Device detection via `navigator.userAgent` (simpele check op iPhone/iPad vs Android) om de juiste store-knop prominent te tonen, beide blijven altijd zichtbaar
- Stijl in lijn met huidige design system: lichte sfeer, cream/anthracite afwisseling, gele accent #fad150, dezelfde Button-varianten
- App store links die al in de codebase staan hergebruiken:
  - https://apps.apple.com/nl/app/jesus-today/id1623308816
  - https://play.google.com/store/apps/details?id=io.mxapps.jesustoday

## Wat ik nog van jou nodig heb
- App screenshots/mockups: heb je die ergens, of mag ik placeholders gebruiken die je later vervangt?
- De 3 stappen tekst: mag ik de stappen uit `PlanSection` hergebruiken (opnemen, QR ontvangen, delen), of moet de uitleg specifieker over de app zijn?
