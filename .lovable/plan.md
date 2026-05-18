## Doel

Twee verbeteringen doorvoeren:
1. Vakjargon dat niet-christenen of mensen buiten kerken niet kennen, vervangen door duidelijke taal.
2. Het partnerformulier verbreden zodat het niet alleen op kerken gericht lijkt, maar ook op andere organisaties (jeugdwerk, festivals, scholen, bedrijven, stichtingen).

## 1. Taalcorrecties

### Pagina Partners (`src/pages/Partners.tsx`)
Het woord "achterban" en een paar andere kerktaal-uitdrukkingen vervangen:

- "jullie achterban" → "jullie mensen" of "jullie community" (afhankelijk van context)
- "Activeer jullie achterban" → "Activeer jullie mensen"
- "gemeenteleden" → "mensen uit jullie kerk of organisatie"
- "leiderschapsteam" → "bestuur of kernteam"
- "praktische handvatten voor jullie achterban" → "praktische handvatten voor jullie team"

Specifiek per regel:
- regel 90: "mensen uit jullie achterban" → "mensen uit jullie kerk, organisatie of team"
- regel 94: "Activeer jullie achterban" → "Activeer jullie mensen"
- regel 167 (meta description): "gemeenteleden" → "mensen uit jullie kerk of organisatie"
- regel 190 (hero intro): "getuigenissen van jullie achterban" → "verhalen van mensen uit jullie kerk of organisatie"
- regel 273: "jullie achterban die de straat op gaat" → "jullie mensen die de kaartjes uitdelen in het dagelijks leven"
- regel 350: "leiderschapsteam" → "bestuur of kernteam"
- regel 357: "voor jullie achterban" → "voor jullie team"
- regel 359: "leiderschapsteam" → "bestuur of kernteam"
- regel 504 (CTA-kop): "Samen jullie achterban activeren in getuigen?" → "Samen jullie mensen helpen hun verhaal te delen?"

De woorden "getuigen", "getuigenis" en "evangelisatie" blijven staan op de Partners-pagina want dat zijn precies de termen waar kerken en christelijke organisaties op zoeken. Wel in CTA's en intro's één keer toelichten met "verhalen over Jezus" zodat de betekenis duidelijk is.

### Overige pagina's
- `src/components/sections/ChurchSection.tsx` regel 47: "een vaste plek geven in de gemeente" → "een vaste plek geven binnen jullie kerk of organisatie"
- Andere paginatekst (Verhalen, Upload, Over Ons, Home) blijft ongewijzigd: daar wordt "getuigenis" en "evangelisatie" als kernbegrip gebruikt en past dat bij het publiek.

## 2. Partnerformulier breder maken

### `src/components/PartnerForm.tsx`

Aanpassingen aan veldlabels, placeholders en opties zodat het niet alleen kerk-gericht klinkt:

- Label "Kerk of organisatie" blijft (was al neutraal), placeholder "Bijv. Stadskerk Groningen" → "Bijv. Stadskerk Groningen of Stichting Hoop"
- E-mail placeholder "jij@kerk.nl" → "jij@organisatie.nl"
- Selectlabel "Waar willen jullie over praten?" blijft staan
- Opties uitbreiden:
  - "Partnership met onze kerk" → "Partnership met onze kerk of organisatie"
  - "Spreker over evangelisatie" blijft
  - "Draaidag om verhalen op te nemen" blijft
  - Nieuw toevoegen: "Samenwerking op een event of festival"
  - "Iets anders" blijft
- Toevoegen onder de selectbox: nieuw veld "Type organisatie" (optioneel select met opties: Kerk, Christelijke organisatie of stichting, Jeugd of jongerenwerk, Festival of event, School of onderwijs, Bedrijf, Anders). Wordt meegestuurd in `metadata.organizationType`.
- Placeholder textarea "Wat hopen jullie te bereiken? Wat is jullie context?" blijft.

### `src/pages/Partners.tsx` formuliersectie (rond regel 504)
Kopjes en omringende teksten breder maken:
- "Samen jullie mensen helpen hun verhaal te delen?" (zie boven)
- intro onder de kop: "Laten we kennismaken. We denken graag met jullie mee over hoe verhalen over Jezus een vaste plek krijgen binnen jullie kerk of organisatie." (woord "getuigenissen" → "verhalen over Jezus" voor toegankelijkheid)

## Niet in scope

- Geen wijzigingen aan de databaseschema's; nieuw veld `organizationType` gaat mee in de bestaande `metadata` JSON-kolom van submissions.
- Geen visuele of layout-veranderingen.
- Geen wijzigingen aan andere formulieren (Contact, Upload).

## Vragen voor jou

Voordat ik implementeer, twee snelle keuzes:
1. Klinkt "jullie mensen" goed als vervanging voor "achterban", of liever "jullie team", "jullie community", of "jullie achterban (gemeenteleden, vrijwilligers of deelnemers)"?
2. Het nieuwe optionele veld "Type organisatie" toevoegen, of liever alleen de placeholders en opties verbreden zonder extra veld?
