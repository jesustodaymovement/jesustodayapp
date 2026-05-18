## Doel

Een nieuwe pagina `/doneren` bouwen die:
1. Funding ophaalt via een StoryBrand-proof verhaal, versterkt met content uit het Pitch Deck 2026
2. De Donorbox widget embed voor directe donaties
3. Duidelijk verwijst naar Stichting Cornerstone Ministries als ANBI-stichting waaronder JesusToday valt
4. Past binnen de bestaande JesusToday huisstijl (gold #fad150, anthracite, cream, warm-white)

## StoryBrand toegepast (met taal uit het Pitch Deck)

1. **Karakter (donor)**: de ondernemer/gever die wil meebouwen aan een beweging die een hele generatie bereikt
2. **Probleem**: Nederland is het meest seculiere land van West-Europa. Een hele generatie groeit op zonder anker, loopt nooit een kerk binnen. Christenen willen hun verhaal delen, maar weten niet hoe. Beide groepen wachten op elkaar.
3. **Gids**: JesusToday, initiatief van Stichting Cornerstone Ministries, slaat de brug. 200+ getuigenissen, 10+ samenwerkingen (Opwekking, The Send, New Wine, YWAM), actief in Zuid-Afrika, India en Macedonië in opstart.
4. **Plan, 3 stappen** (rechtstreeks uit deck slide 5): Opnemen, Uitdelen (kaartjes met QR), Bereiken
5. **Call to action**: "Doneer nu" (primair, scrollt naar Donorbox), "Word maandelijkse partner" (secundair)
6. **Succes**: 100.000 ambassadeurs × 100 kaartjes = 10.000.000 Nederlanders bereikt. Verhalen die verteld worden. Levens die veranderen.
7. **Voorkomt verlies** (positief geframed conform memory): "Elke maand met financiering is een maand met meer bereik, meer verhalen, meer ontmoetingen." (Originele deck-taal "elke maand zonder financiering" wordt omgekeerd naar de positieve framing die de site eist.)

## Paginastructuur

```text
[Header (bestaand, sticky)]

1. Hero
   H1: "Een verhaal verandert alles."
   Sub: "Help mee bouwen aan een beweging die een hele generatie bereikt."
   Primair CTA: "Doneer nu" → scrollt naar #doneer-widget
   Secundair CTA: "Word maandelijkse partner"

2. Het gat dat we zien (probleem, positief)
   Korte intro: Nederland is het meest seculiere land van West-Europa.
   2 of 3 korte statements (uit slide 2-4):
   - Een generatie zonder anker, op zoek naar licht, hoop, waarheid
   - Ze lopen uit zichzelf nooit een kerk binnen
   - Christenen willen delen, maar weten niet hoe, JesusToday slaat de brug

3. De gids: JesusToday × Cornerstone Ministries
   Uitleg dat JesusToday een initiatief is van Stichting Cornerstone Ministries (ANBI)
   Cornerstone, 3 pijlers: Evangelisatie (JesusToday), Gebed, Onderwijs/events (Kingdom Business)
   5G's kort: Gebed, Geloof, Gehoorzaamheid, Geven, Gedrag
   Link naar https://cornerstone-ministries.com/

4. Bewijs dat het werkt (uit slide 4 en 7)
   4 stat-tegels:
   - 200+ persoonlijke videogetuigenissen
   - 10+ samenwerkingen (Opwekking, The Send, New Wine, YWAM)
   - 1 land actief (Zuid-Afrika)
   - 2 landen klaar voor opstart (India, Macedonië)

5. Het plan, 3 stappen (slide 5)
   01 Opnemen, 02 Uitdelen, 03 Bereiken
   Korte beschrijving per stap uit de deck-tekst

6. De schaal van impact (slide 6)
   Visueel: 100.000 ambassadeurs × 100 kaartjes = 10.000.000 Nederlanders
   Onderschrift: "Twee kaartjes per week, in het dagelijks leven, via iemand die ze kennen."

7. Donorbox widget sectie (id="doneer-widget")
   Korte intro boven widget: "Doneer veilig in een paar klikken."
   Iframe Donorbox embed
   Onder: "Veilig via Donorbox · Donaties zijn aftrekbaar (ANBI)"

8. Wat jouw gift mogelijk maakt (slide 11, mede-eigenaarschap)
   Pakkettegels met concrete bestemming, ontleend aan slide 11:
   - €25 – Honderd visitekaartjes met QR-code voor één ambassadeur
   - €250 – Een videogetuigenis volledig geproduceerd
   - €1.000 – Eerste videografie-apparatuur voor een nieuw land
   - €8.000 – Een compleet nieuw land opgestart (lokale coördinator, apparatuur, vertaling, eerste kaartjes-druk, doel: 50 lokale getuigenis-video's binnen 6 maanden)
   (Bedragen verifieer ik bij gebruiker indien gewenst)

9. Mede-eigenaarschap, niet sponsoring (slide 10)
   2 korte punten:
   - Impact die verder reikt dan je bedrijf
   - Tastbaar en meetbaar: elke euro gekoppeld aan een concrete uitkomst

10. ANBI en organisatie info
    Stichting Cornerstone, KVK 90789830, RSIN 863776668
    Telefoon 06 53 94 21 96, E-mail info@cornerstone-ministries.com
    Link naar https://cornerstone-ministries.com/
    Toelichting fiscale aftrekbaarheid (ANBI)

11. Final CTA strip
    "Verhalen verdienen het om verteld te worden. Doe je mee?"
    Knop: "Doneer nu"

[Footer (bestaand)]
```

## Technische sectie

### Nieuwe bestanden
- `src/pages/Doneren.tsx`, page component met Header, alle Donate-secties, Footer
- `src/components/sections/DonateHero.tsx`
- `src/components/sections/DonateProblemSection.tsx`
- `src/components/sections/DonateGuideSection.tsx` (Cornerstone uitleg)
- `src/components/sections/DonateProofSection.tsx` (stats)
- `src/components/sections/DonatePlanSection.tsx` (3 stappen)
- `src/components/sections/DonateImpactScaleSection.tsx` (100k × 100 = 10M)
- `src/components/sections/DonateWidgetSection.tsx` (Donorbox iframe)
- `src/components/sections/DonatePackagesSection.tsx` (giftpakketten)
- `src/components/sections/DonateOwnershipSection.tsx` (mede-eigenaarschap)
- `src/components/sections/DonateAnbiSection.tsx`
- `src/components/sections/DonateFinalCtaSection.tsx`

### Wijzigingen bestaand
- `src/App.tsx`: route `<Route path="/doneren" element={<Doneren />} />` boven catch-all
- `src/components/sections/Footer.tsx`: "Doneren" link in Links-lijst koppelen aan `/doneren` (nu `href="#"`)

### Donorbox integratie
Script via `react-helmet-async` (al aanwezig via `HelmetProvider` in `App.tsx`):

```tsx
<Helmet>
  <script src="https://donorbox.org/widget.js" paypalexpress="false" defer></script>
</Helmet>
```

Iframe in `DonateWidgetSection`, React-compatible attributen:

```tsx
<iframe
  src="https://donorbox.org/embed/donatie-voor-jesus-today"
  name="donorbox"
  allow="payment"
  seamless
  frameBorder={0}
  scrolling="no"
  height="900px"
  width="100%"
  style={{ maxWidth: 500, minWidth: 250, maxHeight: 'none' }}
  title="Doneer aan JesusToday via Donorbox"
/>
```

`allowpaymentrequest` wordt vervangen door `allow="payment"`, `frameBorder` camelCase.

### Styling / design tokens
- Alleen bestaande tokens: `bg-cream`, `bg-anthracite`, `text-gold`, `text-warm-white`, etc.
- Afwisseling lichte (cream) en donkere (anthracite) secties per memory-regel
- Knoppen: `variant="hero"` (gold) primair, `hero-outline` secundair
- Goud accent altijd `#fad150` via bestaande `gold` token
- Komma's, geen em-dashes
- "JesusToday" altijd als één woord
- Positieve toon, geen angsttaal

### SEO
- `<Helmet>` met title "Doneer aan JesusToday, Stichting Cornerstone Ministries", meta description < 160 chars
- Eén H1 (Hero), semantische `<section>` tags

### Toegankelijkheid
- Iframe heeft `title`
- Anker-CTA's met `aria-label` waar nodig
- Voldoende contrast via bestaande tokens

## Wat ik NIET doe
- Geen wijziging aan andere pagina's behalve route toevoegen + footer link
- Geen backend, Donorbox handelt betalingen af
- Geen aanpassing aan huisstijl tokens
- Pitch-deck zin "elke maand zonder financiering" niet letterlijk overnemen (botst met positieve-toon memory), wel positief omgekeerd

## Open punten (niet blokkerend)
- Concrete giftpakket-bedragen, slide 11 noemt alleen €8.000, andere bedragen zijn voorstel
- Of de naamvermelding-optie ("Naam optioneel op de website") al meegenomen moet worden of pas later
