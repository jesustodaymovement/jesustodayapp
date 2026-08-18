# Contactgegevens "Vraag over God" bijwerken

## Wat er verandert

**Floating chatknop (rechtsonder, hele site)**
- WhatsApp-nummer: van +31 6 43798701 naar **+31 6 57450632** (link wordt `wa.me/31657450632`)
- E-mailadres: van `info@vraagovergod.nl` naar **jesustoday@vraagovergod.nl**

**Verhalenpagina (detailpagina van een getuigenis)**
De knop "Doorpraten over het geloof" staat er twee keer (bovenaan bij de video en in het blok "Vragen of contact?"). Beide openen nu de chatwidget. Dat wordt:
- de bovenste knop: opent direct een mail naar **jesustoday@vraagovergod.nl** (met onderwerp over het bekeken verhaal)
- de knop in "Vragen of contact?": opent direct **WhatsApp** naar +31 6 57450632

De "Stel een vraag aan JesusToday" knoppen gaan ook naar **jesustoday@vraagovergod.nl** in plaats van `info@jesustoday.nl`.

## Techniek
- `src/components/ChatWidget.tsx`: constanten `WHATSAPP_NUMBER` en `EMAIL_ADDRESS` aanpassen.
- `src/pages/TestimonyDetail.tsx`:
  - adres in `buildMailTo` naar `jesustoday@vraagovergod.nl`
  - bovenste "Doorpraten over het geloof": `openChat` vervangen door de mailto-link
  - tweede "Doorpraten over het geloof": `openChat` vervangen door `https://wa.me/31657450632` (nieuw tabblad), tekst eronder aangepast naar WhatsApp in plaats van de chat
