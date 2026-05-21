## Doel
Alle verwijzingen naar "Vind een kerk in de buurt" via Christ Connect verwijderen uit de seeker journey, zodat de seeker journey geen externe kerkzoeker meer aanbiedt.

## Wijzigingen

1. **`src/components/sections/NextStepsSection.tsx`** (gebruikt op de seeker-variant van de homepage)
   - Verwijder het derde item uit `steps` (titel "Vind een kerk in de buurt", CTA "Zoek een kerk", href `https://www.christconnectapp.com/`).
   - Grid van `md:grid-cols-3` aanpassen naar `md:grid-cols-2` zodat de twee resterende kaarten ("Bekijk meer verhalen" en "Volg een beginnerscursus") netjes naast elkaar staan, gecentreerd met `max-w-4xl mx-auto` op het grid.

2. **`src/pages/TestimonyDetail.tsx`** (zijbalk op elke verhaal-detailpagina, onderdeel van de seeker journey)
   - Verwijder de `<a>` met `href="https://www.christconnectapp.com/"` (regels ~441-458), inclusief het bijbehorende icoon en de tekst "Vind een kerk in de buurt".
   - Pas de intro aan ("drie laagdrempelige manieren" → "twee laagdrempelige manieren") zodat het aantal klopt met de overgebleven kaarten ("Leer meer over het geloof" + "Stel je vraag aan ons").
   - Verwijder de import van `Search` uit `lucide-react` als die nergens anders in het bestand wordt gebruikt.

3. **`src/i18n/locales/en.json`**
   - Verwijder de keys `"Vind een kerk in de buurt"`, `"Zoek een kerk"`, en (indien aanwezig) de bijbehorende beschrijving "Kom in contact met andere gelovige mensen die hun geloof in het dagelijks leven beleven."

## Buiten scope
- Geen wijzigingen aan de share-journey of aan `/kerken`, `/partners` (daar verwijzen we naar onze eigen partner-kerken, niet naar Christ Connect).
- Geen nieuwe alternatieve kerkzoeker toevoegen.
- Geen wijzigingen aan backend, formulieren of routes.
