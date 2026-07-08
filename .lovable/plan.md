## Doel

Op de homepage (beide versies: "Vertel over God"/believer én "Ontdek God"/seeker) en op de "Over ons"-pagina worden de video's in de eerste slider niet meer live opgehaald via de backend-API. In plaats daarvan tonen we een vaste, handmatig gekozen selectie van jong ogende mensen (zoals Amélie).

## Wat er verandert

De component `src/components/sections/VideoSliderSection.tsx` haalt nu bij het laden een lijst op via de `get-testimonies` edge function (met de anon API-key). Die aanroep vervalt. In plaats daarvan komt er een vaste lijst met geselecteerde video's rechtstreeks in de code.

Belangrijk: de video-thumbnails zelf blijven wel geladen worden via de publieke Vimeo-oembed (dat is geen beveiligde API-key en werkt zonder inlog). Alleen de backend-fetch met de API-key verdwijnt.

Zelfde vaste set voor beide homepage-versies én voor "Over ons".

## Gekozen jonge mensen

Op basis van de thumbnails heb ik deze jong ogende mensen geselecteerd (naam + Vimeo-ID). Elk item krijgt ook zijn quote mee zoals die nu al bij de video hoort:

```text
Bickel    1205452716
Nawal     1205136000
Jelle     1204289580
Elijah    1204282360
Daimy     1202930370
Lianne    1202927777
Julian    1198391877
Lydia     1193339697
Hanne     1187194889
Marleen   1175120400
Carlijn   1153711373
Milou     1156442169
Yannick   1144254694
Youri     1114853054
Amélie    1114232845
Sem       1095244451
```

Deze 16 vullen de slider ruim; ik kan er makkelijk namen bij- of afhalen als je dat wilt.

## Technische details

- In `VideoSliderSection.tsx`:
  - De `useEffect` met de `fetch(...)` naar `get-testimonies` en de `loading`/`videos` state-logica worden vervangen door een statische `const CURATED: Testimony[] = [...]` array met bovenstaande items (id, quote, vimeoUrl, user.username).
  - De carousel rendert direct deze vaste lijst; de loading-spinner is niet meer nodig.
  - `fetchThumbnail` (Vimeo oembed) blijft ongewijzigd in gebruik voor de beelden.
- `HomeTest.tsx` en `OverOns.tsx` hoeven niet aangepast te worden: zij gebruiken `VideoSliderSection` en krijgen de vaste set automatisch. De `title`/`subtitle`-props (voor de seeker-variant) blijven werken.
- De edge function `get-testimonies` blijft bestaan (wordt nog gebruikt door de pagina "Verhalen over Jezus"), maar wordt op de homepage/Over ons niet meer aangeroepen.

## Verificatie

Na de wijziging controleer ik met een browser-test (Playwright) dat op de homepage in beide modes (believer + seeker) én op "Over ons" de vaste jonge selectie zichtbaar is en dat er geen `get-testimonies`-request meer vanaf die pagina's wordt gedaan.
