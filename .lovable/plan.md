## Doel

Een nieuwe, premium-uitziende variant van de seeker-homepagina bouwen, specifiek ontworpen voor jongeren (16-29). Het bestaande design blijft intact, de nieuwe versie leeft op een aparte route zodat we vrij kunnen experimenteren.

## Route & bestanden

- Nieuwe route: `/jong` (gericht op seekers 16-29)
- Nieuwe pagina: `src/pages/Jong.tsx`
- Nieuwe sectie-componenten in `src/components/sections/jong/`:
  - `HeroJong.tsx`
  - `RecognizeJong.tsx` (variant op DiscoverProblem)
  - `OutcomesJong.tsx` (variant op DiscoverOutcomes)
  - `TestimoniesJong.tsx` (hergebruik VideoSlider data, eigen layout)
  - `AskQuestionJong.tsx`
  - `NextStepsJong.tsx`
  - `FooterJong.tsx` (of hergebruik bestaande Footer, met verplichte "Website door Shoop Shoop"-link)
- Route toevoegen in `src/App.tsx`
- Data hergebruiken uit `src/lib/testimonies.ts` en `src/lib/topics.ts`

## Designrichting (jong, premium, huisstijl)

Kern: licht en hoopvol, met #fad150 als signaalkleur, anthraciet als anker, en cream als rustvlak (volgens memory). Visueel rijker dan de huidige seeker-pagina, maar nooit donker of zwaar.

Visuele taal:
- **Editorial bento layout**: asymmetrische grids met grote typografie naast kleine cards, ipv klassieke gestapelde secties
- **Sticky scroll storytelling**: hero blijft staan terwijl tekst eroverheen scrolt
- **Magnetic / hover-microinteracties**: knoppen, video-thumbs en kaarten reageren subtiel op cursor
- **Marquee tickers**: doorlopende band met steekwoorden ("vrede ,  vergeving ,  hoop ,  echt ,  rust") in groot grotesk schrift
- **Noise/grain overlay** op cream vlakken voor tactiele uitstraling
- **Video first**: portrait 9:16 video-tegels in carousel met scrubber, mute-toggle, en chapter-tags (hergebruik Vimeo-thema's)
- **Gradient mesh accents** in zachte gold/cream tinten, nooit overheersend
- **Cursor-reactieve spotlight** in hero
- **Scroll-progress indicator** in goud
- **Lottie/SVG micro-iconen** ipv lucide-line-icons voor unieke uitstraling
- **Animated underlines** en text-reveal per woord (Framer Motion style via CSS keyframes)

Typografie:
- Display: zware grotesk (Poppins 800 reeds aanwezig) op extreme schaal (10-14vw in hero), met negatieve letter-spacing
- Body: Inter, ruim leading
- Quote-styling: oversized openings-aanhalingsteken in goud

Kleurregie (binnen huisstijl):
- Achtergrondritme: cream  ->  warm-white  ->  cream  ->  anthracite (1 keer, voor contrast bij testimonials)  ->  cream
- Gele accenten als highlights achter woorden, niet als grote vlakken
- Subtiele schaduwen, ruime border-radius (2xl/3xl)

## Sectievolgorde `/jong`

```text
1. Sticky header (hergebruik, met audience-switch)
2. Hero  -  fullscreen, oversized typografie + portretvideo-collage
3. Marquee ticker met steekwoorden
4. "Misschien herken je dit" bento (4 kaarten asymmetrisch)
5. Editorial quote-block (groot citaat uit een getuigenis)
6. Video testimonies carousel (portrait, thema-tags)
7. Outcomes -  3 stappen met sticky scroll
8. "Stel je vraag" -  warme card met input
9. Volgende stappen -  bento van 3 keuzes
10. Eind-CTA "Upload jouw getuigenis"
11. Footer (met Shoop Shoop credit)
```

## Toon van content

- "Je" vorm, kort, eerlijk, geen kerktaal
- Geen angst-retoriek (positieve toon, conform memory)
- Voorbeelden: "Geen preek. Geen druk. Gewoon echte verhalen." / "Wat als rust dichterbij is dan je dacht?"

## Technische details

- Geen nieuwe libraries; animaties via Tailwind keyframes + bestaande utilities. Eventueel een lichte custom hook voor magnetic-hover.
- Mobile-first; bento collapses naar single column.
- Lighthouse  >=  90 behouden: lazy load video posters, prefers-reduced-motion respecteren.
- WCAG AA: contrastcheck op goud-op-cream (gebruik anthraciet tekst op goud, niet andersom).
- SEO via Helmet: title "Ontdek Jezus  -  echte verhalen voor jouw generatie".

## Wat blijft buiten scope

- Geen wijzigingen aan bestaande routes (`/`, `/hometest`, `/base`, `/afrika`)
- Geen backend- of datamodelwijzigingen
- Geen nieuwe Vimeo-integratie; bestaande testimony-data wordt hergebruikt
