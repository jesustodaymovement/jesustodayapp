# Plan: Foto's van het JesusToday-team verwerken op /over-ons

## Doel
De twee uploads (standje met QR-banners en het team met QR-shirts op de rug) een prominente plek geven op de Over Ons pagina, zodat bezoekers zien dat JesusToday écht actief is op events en in het veld.

## Aanpak

Nieuwe sectie `InTheFieldSection` toevoegen tussen `ProofSection` (de cijfers) en `PlanSection` (drie stappen). Zo zien bezoekers eerst dat het platform werkt (cijfers), daarna visueel bewijs dat het team in actie is, en vervolgens de uitleg in 3 stappen.

```text
ProofSection (cijfers)
  ↓
InTheFieldSection  ← NIEUW
  ↓
PlanSection (3 stappen)
```

### Layout van de nieuwe sectie

- Cream achtergrond (past in het ritme cream/anthracite)
- Korte kop bv. "JesusToday in het veld" met subtekst over events, kerken en straat
- Twee-koloms-grid:
  - Links: brede liggende foto van het team met QR-shirts (image-14)
  - Rechts: portretfoto van de stand met QR-banners (image-13)
- Op mobiel onder elkaar
- Lichte ronde hoeken, subtiele schaduw, lazy loading, beschrijvende alt-teksten

## Technisch

- Twee uploads kopiëren naar `src/assets/team/`:
  - `event-stand.jpg` (image-13, stand met banners)
  - `team-qr-shirts.jpg` (image-14, team van achteren met QR-shirts)
- ES6 imports in `OverOns.tsx`
- Geen nieuwe routes of nav-aanpassingen
