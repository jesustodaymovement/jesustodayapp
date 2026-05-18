## Wijzigingen seeker-pagina (Ontdek-modus)

Alle aanpassingen blijven binnen de seeker-flow. De vertel-flow blijft ongewijzigd.

### 1. Jargon weghalen (NextStepsSection)
Bestand: `src/components/sections/NextStepsSection.tsx`
- "Volg een Alpha-cursus" → **"Volg een beginnerscursus over geloof"**
- Subtekst "Stel al je vragen in een veilige groep. Gratis, vrijblijvend en open." blijft, maar CTA "Vind een Alpha bij jou" → **"Vind een cursus bij jou in de buurt"**
- "Vind een kerk in de buurt" → subtekst wordt **"Kom in contact met andere gelovige mensen die hun geloof in het dagelijks leven beleven."**

### 2. "Geen spam, beloofd." verwijderen
Bestand: `src/components/sections/AskQuestionSection.tsx`
- Regel onder het formulier wordt: **"We behandelen je vraag vertrouwelijk."**

### 3. DiscoverProblemSection, onduidelijke tekst herschrijven
Bestand: `src/components/sections/DiscoverProblemSection.tsx`
- "Je zoekt naar zin, maar weet niet precies waar te kijken" → **"Je verlangt naar meer betekenis, maar weet niet waar je moet beginnen"**

### 4. VideoSliderSection: titel + subtitel aanpassen voor seekers
Bestand: `src/components/sections/VideoSliderSection.tsx` + `src/pages/Base.tsx`
- Sectie krijgt optionele props `title` en `subtitle` (defaults blijven huidige tekst zodat de vertel-modus ongewijzigd blijft).
- In Base.tsx wordt de seeker-variant aangeroepen met:
  - Titel: **"Ontdek verhalen"**
  - Subtitel: **"Ontdek hoe anderen hoop vonden in een wereld vol vragen."**

### Technische details
- VideoSlider blijft één component; props zijn optioneel zodat de vertel-flow precies dezelfde output houdt.
- Geen wijzigingen aan data-fetching, routing of styling. Geen em-dashes, gele accent blijft `#fad150` (gold token).
