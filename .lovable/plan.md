# Merkvideo JesusToday plaatsen

Nieuwe YouTube-video `mAstvAviAkg` op vier plekken tonen.

## Wat je ziet
- **Homepage**: direct onder de openingsfoto een korte sectie "Dit is JesusToday" met de video groot in beeld (16:9, afgeronde hoeken, lichte achtergrond).
- **Over ons**: video bovenaan het verhaal, als introductie op wie JesusToday is.
- **Partners**: video vóór de uitleg voor kerken, met korte zin "Zie wat JesusToday voor jouw kerk kan betekenen".
- **Doneren en Steun**: video bij de cijfers, zodat gevers zien waar hun gift naartoe gaat.
- Koppen vertaald in NL, EN, ES en FIL. Geen em-dashes, lichte stijl, gouden accent #fad150.

## Snelheid
De video laadt pas als iemand op play klikt: eerst alleen een thumbnail met gouden playknop. Zo blijft de site snel (PageSpeed).

## Technisch
- Nieuw herbruikbaar component `BrandVideo` (youtube-nocookie embed na klik, thumbnail van i.ytimg.com, lazy).
- Video-id op één plek (`src/lib/brand-video.ts`).
- Inbouwen in homepage-pagina, OverOns.tsx, Partners.tsx, Doneren.tsx, Steun.tsx; vertaalsleutels in nl/en/es/fil.
- Controleren in de browser op alle vier pagina's en in twee talen.
