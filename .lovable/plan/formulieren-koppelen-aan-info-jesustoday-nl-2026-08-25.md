# Formulieren koppelen aan info@jesustoday.nl

Het verzenddomein notify.jesustoday.nl is geverifieerd en klaar. Nu vervangen we de externe Fillout-embeds door eigen formulieren op de site, die inzendingen opslaan in de database en direct een e-mail sturen naar info@jesustoday.nl, plus een bevestigingsmail naar de inzender.

## Wat er verandert

Zes Fillout-embeds worden eigen formulieren in de huisstijl (geel #fad150, licht en hoopvol):

1. **Contact** (/contact), algemeen bericht
2. **Stel je vraag over geloof** (homepage + contactpagina)
3. **Aanmelden Opwekking 2026** (/aanmeldenopwekking2026), getuigenis laten opnemen
4. **Getuigenisformulier op locatie** (/opwekkinggetuigenissenform), korte versie voor tijdens events
5. **Partner worden** (/partners), inclusief organisatie en rol
6. **Reactie op een getuigenis** (op de detailpagina van elk verhaal), met automatische koppeling aan de video

Elk formulier krijgt validatie in de browser en op de server, duidelijke foutmeldingen, een laadstatus en een vriendelijke bedankmelding. Alle labels en teksten lopen door de bestaande vertalingen (EN basis, NL, ES, FIL).

## Wat er gebeurt na verzenden

1. De inzending wordt opgeslagen in de bestaande inzendingen-tabel, zichtbaar in het adminoverzicht.
2. Er gaat een notificatiemail naar info@jesustoday.nl met alle ingevulde velden en een reply-to op het e-mailadres van de inzender, zodat je direct kunt antwoorden.
3. De inzender ontvangt een bevestigingsmail vanaf notify.jesustoday.nl met JesusToday-branding, met info@jesustoday.nl als antwoordadres.
4. Mislukt de mail, dan blijft de inzending bewaard en zichtbaar in het admin­overzicht, dus niets raakt kwijt.

## Techniek

- Nieuwe formuliercomponenten in `src/components/forms/`, gedeelde zod-schema's per formuliertype in `src/lib/submissions.ts` (uitbreiding van het bestaande schema met `opwekking`, `locatie`, `reactie`).
- Nieuwe Edge Function `send-transactional-email` plus e-mailtemplates voor notificatie en bevestiging, verzonden via de e-mailwachtrij die al is ingericht (retries, logging, suppressielijst).
- De bestaande `notify-submission` aanroep wordt vervangen door de wachtrij-route, zodat verzending betrouwbaar is en te volgen in Cloud → Emails.
- Migratie: `submissions` krijgt de nieuwe types en optionele velden (rol, event, videokoppeling), met behoud van bestaande RLS-policies en grants (publiek insert, alleen admin lezen).
- Anti-spam: honeypot-veld en een eenvoudige snelheidslimiet per e-mailadres in de Edge Function.
- Alle Fillout-scripts en embed-divs worden verwijderd, ook de verwijzing in de privacyverklaring bij externe verwerkers.

## Aandachtspunten

- Bestaande inzendingen in Fillout migreren niet mee, exporteer die daar zelf als je ze wilt bewaren.
- Ontvangen op info@jesustoday.nl vraagt een werkende mailbox bij je mailprovider, dat staat los van dit verzenddomein.
