# Brandvideo JesusToday op vier pagina's

Video: YouTube `mAstvAviAkg`. Paginabreed, mobielvriendelijk, speelt af op de eigen website (bezoekers blijven op JesusToday, geen doorverwijzing naar YouTube).

## Plaatsing en koppen
| Pagina | Plek | Kop |
|---|---|---|
| Homepage | direct onder "Misschien herken je dit?" | Verhalen die levens veranderen |
| Over ons | na "Wij zien een gat", vóór "Hoe het begon" | Waarom verhalen levens veranderen. |
| Partners | na de introductie, vóór "Waarom partner worden?" | Samen maken we Jezus zichtbaar. |
| Doneren | na "Het gat dat we zien", vóór Cornerstone Ministries | Help mee om verhalen verder te brengen. |

Koppen vertaald in EN, ES en FIL, met de laatste woorden in goud (#fad150), net als andere koppen. Geen em-dashes.

## Ontwerp
- Volle breedte op een lichte cream-achtergrond, video groot in 16:9 met afgeronde hoeken en een zachte schaduw.
- Eerst een voorbeeldbeeld met een grote gouden playknop. Na een klik speelt de video op dezelfde plek af. Er komt geen YouTube-logo of link naar YouTube in de afbeelding (privacyvriendelijke versie, geen suggesties van andere kanalen).
- Op mobiel past de video over de hele schermbreedte en is de playknop goed te raken.
- De video laadt pas na de klik, dus de site blijft snel.

## Technisch
- `src/lib/brand-video.ts`: video-id op één plek.
- `src/components/sections/BrandVideoSection.tsx`: herbruikbaar, props `title`/`accent`; youtube-nocookie embed met `rel=0&modestbranding=1&playsinline=1&autoplay=1` na klik, thumbnail `maxresdefault` met terugval `hqdefault`, toegankelijke knop met aria-label.
- Invoegen in HomeTest.tsx (na DiscoverProblemSection), OverOns.tsx, Partners.tsx, Doneren.tsx.
- Vertaalsleutels in en/es/fil.json.
- In de browser controleren op alle vier pagina's, op desktop en mobiel, in NL en EN.
