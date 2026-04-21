

# Plan: nieuwe `/hometest` pagina met dual-audience switch

Een nieuwe homepagina-variant die zich richt op twee doelgroepen tegelijk: **gelovigen die willen evangeliseren** en **zoekers die geïnspireerd willen worden**. Een prominente switch bovenaan stuurt de hele pagina-flow.

## Het centrale switch-concept

Bovenaan de hero (onder het logo, vóór de headline) komt een grote, opvallende **toggle-switch** met twee opties:

```text
┌─────────────────────────────────────────────────────┐
│   Ik wil...                                         │
│   ┌──────────────────────┬──────────────────────┐  │
│   │  ✦ Vertel over God   │  ✧ Ontdek God        │  │
│   │   (gelovige modus)   │   (zoeker modus)     │  │
│   └──────────────────────┴──────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

De keuze:
- Wisselt headline, subheadline, CTA-tekst en accentkleur in de hero
- Filtert/verandert welke secties tonen, in welke volgorde, en met welke teksten
- Wordt opgeslagen in `localStorage` zodat de keuze bewaard blijft bij terugkeer
- Is altijd zichtbaar via een kleine "modus-pill" in een sticky positie (rechtsonder), zodat bezoekers kunnen wisselen

## Twee parallelle flows

### Flow A — "Vertel over God" (gelovigen)
Volgorde van secties:
1. **Hero** — "Jouw verhaal kan iemands leven veranderen" + CTA "Upload jouw getuigenis"
2. **Herken je dit?** (bestaande `ProblemSection` — angst om te delen)
3. **Je hoeft het niet alleen te doen** (bestaande `GuideSection`)
4. **Zo werkt het** (bestaande `PlanSection` — opnemen → QR → delen)
5. **Wat er gebeurt als je deelt** (bestaande `SuccessSection`)
6. **Echte verhalen** (bestaande `VideoSliderSection`)
7. **Voor kerken** (`ChurchSection`)
8. **CTA** — "Upload jouw getuigenis"

### Flow B — "Ontdek God" (zoekers)
Volgorde van secties:
1. **Hero** — "Echte verhalen van mensen zoals jij" + CTA "Bekijk getuigenissen"
2. **Nieuwe sectie: "Misschien herken je dit?"** — pijnpunten van zoekers (leegte, twijfel, zoeken naar zin, nieuwsgierigheid naar Jezus)
3. **Bestaande `VideoSliderSection`** — direct verhalen zien (eerder in flow)
4. **Nieuwe sectie: "Wat anderen ontdekten"** — uitkomst-statements (vrede, hoop, richting, vergeving) in plaats van "wat er gebeurt als je deelt"
5. **Nieuwe sectie: "Volgende stap"** — drie kaarten:
   - Bekijk meer getuigenissen → `/getuigenissen`
   - Ontdek Alpha Nederland → externe link
   - Vind een kerk in de buurt → externe link/zoekfunctie
6. **Nieuwe sectie: "Stel je vraag"** — eenvoudig contactblok ("Heb je een vraag over geloof? We luisteren.")
7. **CTA** — "Begin je ontdekkingsreis"

Secties die NIET tonen in zoeker-modus: `ProblemSection` (gericht op delen), `PlanSection` (app-flow), `ChurchSection` (B2B), `InstagramReelsSection` (focus op delen).

## Visueel ontwerp van de switch

- Geplaatst in een glas-achtige container boven de hero-headline
- Twee "tabs" naast elkaar, actieve tab krijgt `bg-gold` (#fad150) met donkere tekst, inactief is transparant met witte tekst
- Subtiele animatie bij wissel (fade + slide van content eronder, ~300ms)
- Op mobiel: full-width, twee gelijke helften
- Sticky mini-versie verschijnt na 50% scroll, rechtsonder, zodat wisselen altijd mogelijk blijft

## Technische uitwerking

**Nieuwe bestanden:**
- `src/pages/HomeTest.tsx` — nieuwe pagina met `AudienceProvider` context en conditionele section rendering
- `src/contexts/AudienceContext.tsx` — React context met `mode: 'share' | 'discover'`, persistent via `localStorage`
- `src/components/AudienceSwitch.tsx` — de hoofdtoggle (gebruikt in hero) + `AudienceSwitchFloating.tsx` voor sticky variant
- `src/components/sections/HeroAudience.tsx` — hero waarvan content reageert op de gekozen modus
- `src/components/sections/DiscoverProblemSection.tsx` — pijnpunten voor zoekers
- `src/components/sections/DiscoverOutcomesSection.tsx` — uitkomsten voor zoekers (vrede, hoop, etc.)
- `src/components/sections/NextStepsSection.tsx` — drie kaarten naar Alpha / kerken / meer video's
- `src/components/sections/AskQuestionSection.tsx` — eenvoudig vraag-contactblok

**Routing (`src/App.tsx`):**
- Voeg toe: `<Route path="/hometest" element={<HomeTest />} />`

**Bestaande secties:** worden hergebruikt zonder wijziging; `HomeTest.tsx` rendert ze conditioneel op basis van `mode` uit de context.

**Stijl:** volgt bestaande tokens (gold #fad150, anthracite, cream, warm-white). Geen donkere/zware esthetiek toevoegen, blijft licht en hoopvol conform projectregels.

## Wat dit oplevert

Eén pagina die als het ware twee homepages is: bezoekers kiezen direct hun reis, en de site spreekt hen vervolgens specifiek aan. Geen gemengde boodschap meer voor twee zeer verschillende doelgroepen. Te bespreken met JCD en eenvoudig later samen te voegen met `/` als de richting bevalt.

