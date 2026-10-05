# Taalfilter "Alle talen" op Stories about Jesus

## Wat ik heb gecontroleerd
De videobron kent op dit moment maar twee taalcodes: Nederlands (275 video's) en Engels (57 video's), samen 332. Andere talen (Duits, Spaans, Russisch, Filipino, enz.) komen niet als aparte taal terug; video's in die talen staan in de bron gelabeld als Engels. Er zijn dus nu geen extra talen uit te lezen.

## Wat er verandert
1. Nieuwe optie bovenaan het taalfilter: "Alle talen" (EN: "All languages", ook vertaald in ES en FIL). Toont alle 332 verhalen samen.
2. De taalopties worden automatisch opgebouwd uit de talen die in de video's voorkomen. Zodra de bron later een nieuwe taal (bijv. Spaans) teruggeeft, verschijnt die vanzelf als optie, met een nette naam in de gekozen websitetaal.
3. Standaard blijft Nederlands geselecteerd; kerkfilter, zoeken en onderwerpen werken ook bij "Alle talen".

## Technische details
- `src/pages/Testimonies.tsx`: waarde `all` stuurt geen `LanguageCode` mee (bron geeft dan alles). Taallijst = unieke `languageCode` uit de "alle"-resultaten, label via `Intl.DisplayNames`, met nl/en altijd aanwezig als terugval. Totaalteller gebruikt dezelfde "alle"-aanroep.
- `supabase/functions/get-testimonies`: `LanguageCode` alleen doorsturen als die is meegegeven (nu wordt standaard `nl` ingevuld).
- Vertaalsleutel "Alle talen" in en/es/fil.

## Buiten bereik
Video's die eigenlijk in een andere taal zijn maar als Engels gelabeld staan, kunnen pas apart gefilterd worden als dat in de bron (app/backend van JesusToday) wordt aangepast.
