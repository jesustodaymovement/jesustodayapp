## Doel

Alle App Store en Google Play knoppen op de site koppelen aan de echte JesusToday app-pagina's.

- App Store → `https://apps.apple.com/nl/app/jesus-today/id1623308816`
- Google Play → `https://play.google.com/store/apps/details?id=io.mxapps.jesustoday`

Alle links openen in een nieuw tabblad (`target="_blank"`, `rel="noopener noreferrer"`).

## Wijzigingen

1. **`src/components/sections/Footer.tsx`** (regel 22 en 28): `href="#"` vervangen door de App Store resp. Google Play URL.

2. **`src/components/sections/CTASection.tsx`** (regel 47 en 58): `href="#"` vervangen door de App Store resp. Google Play URL.

3. **`src/components/sections/HeroSection.tsx`** (regel 46-57): de twee `<div>` badge-blokken omzetten naar `<a>` elementen met de juiste URL, zelfde styling.

4. **`src/components/sections/HeroSectionVideo.tsx`** (analoog aan HeroSection): de twee badge-`<div>`s omzetten naar `<a>` met de juiste URL.

Geen andere wijzigingen, geen styling-aanpassingen.