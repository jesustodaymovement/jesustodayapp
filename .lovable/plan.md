# Contactgegevens "Vraag over God" bijwerken

## Wat er verandert

**Floating chatknop (rechtsonder, hele site)**
- WhatsApp-nummer: van +31 6 43798701 naar **+31 6 57450632** (link wordt `wa.me/31657450632`)
- E-mailadres: van `info@vraagovergod.nl` naar **jesustoday@vraagovergod.nl**

**Verhalenpagina (detailpagina van een getuigenis)**
De twee "Stel een vraag aan JesusToday" knoppen (plus de derde variant in de zijbalk) openen nu een mail naar `info@jesustoday.nl`. Die worden gericht op **jesustoday@vraagovergod.nl**, met dezelfde onderwerpregel en begintekst als nu.

## Techniek
- `src/components/ChatWidget.tsx`: constanten `WHATSAPP_NUMBER` en `EMAIL_ADDRESS` aanpassen.
- `src/pages/TestimonyDetail.tsx`: het adres in `buildMailTo` aanpassen naar `jesustoday@vraagovergod.nl` (wordt door alle drie de knoppen gebruikt).

## Aanname
De knoppen op de verhalenpagina blijven mailto-links (nu naar het nieuwe adres). Wil je in plaats daarvan dat ze naar een extern vraagovergod-formulier linken, geef dan de URL door, dan zet ik dat erin.
