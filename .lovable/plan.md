# Volledige vertaling van de website (EN, NL, ES, FIL)

## Wat er nu aan de hand is

De taalknoppen werken technisch, maar het grootste deel van de sitecontent is nooit door de vertaallaag gehaald. De teksten staan hardcoded in het Nederlands in de pagina's, dus bij EN, ES of FIL blijft er Nederlands staan (zoals op /over-ons in het voorbeeld).

Gecontroleerde status:

- Vertaald en werkend: header, footer, homepage-secties, contactformulier, cookiemelding, nieuwsbriefformulier, Nations, Privacy (aparte NL/EN inhoud).
- Niet vertaald, volledig hardcoded Nederlands:
  - Over ons (/over-ons)
  - Partners (/partners)
  - Doneren (/doneren) en Steun (/steun)
  - Verhalen (/verhalen-over-jezus) en de detailpagina van een verhaal
  - Media (/media), Disclaimer, Nieuwsbrief, Upload, Opwekking-pagina's, 404-pagina
  - Secties: HeroSection, HeroSectionVideo, TestimonialsSection, TransformationSection, InstagramReelsSection
- De vertaalbestanden hebben nu 285 sleutels; er komen er naar schatting 350 tot 450 bij.

## Aanpak

1. Alle bovenstaande pagina's en secties omzetten naar de bestaande vertaalmethode: de Nederlandse tekst blijft de sleutel, zodat NL ongewijzigd blijft werken en EN/ES/FIL uit de vertaalbestanden komen.
2. Voor elke pagina ook de paginatitel en de meta-omschrijving meenemen, zodat ook de tabbladtitel meebeweegt.
3. Nieuwe sleutels toevoegen aan en.json, es.json en fil.json met complete, natuurlijke vertalingen (geen half-Engelse mengvormen).
4. Admin-pagina's blijven Nederlands, die zijn alleen voor intern gebruik.
5. Na de omzetting een controlescript draaien dat alle vertaalsleutels uit de code vergelijkt met de drie vertaalbestanden, zodat er geen enkele sleutel ontbreekt.
6. Steekproef in de browser: per taal de pagina's Over ons, Partners, Doneren, Verhalen en een verhaaldetail openen en controleren dat er geen Nederlands meer doorschemert.

## Volgorde van uitvoering

Vanwege de omvang in vier blokken, elk direct controleerbaar:

1. Over ons + Partners
2. Doneren + Steun + Media + Disclaimer
3. Verhalen + verhaaldetail + Upload
4. Overige secties, Nieuwsbrief, Opwekking-pagina's, 404

## Technische details

- Patroon: `const { t } = useTranslation()` per component, tekst via `t('Nederlandse bron')`; bestaande interpolatie zoals `t('Verhaal van {{name}}', { name })` wordt aangehouden.
- Lange tekstblokken worden per alinea een sleutel, geen enorme sleutels met opmaak erin.
- Tekst met opmaak (bijvoorbeeld een geel gemarkeerd woord in een titel) wordt gesplitst in twee sleutels of via `<Trans>` opgelost, zodat de opmaak per taal correct blijft.
- Namen van personen, kerken, partners en domeinnamen blijven onvertaald.
- Er verandert niets aan de taalkeuze zelf, de knoppen en de opslag in localStorage blijven zoals ze zijn.
