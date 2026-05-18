## Huidige situatie

Op dit moment werken de "contactformulieren" eigenlijk niet echt:

- **Contactpagina (`/contact`)** heeft geen echt formulier, alleen een grote mailto-link naar `info@jesustoday.nl` en daaronder de "Stel je vraag"-sectie.
- **"Stel je vraag"-sectie** (op homepage, /contact en /upload) heeft wel een formulier met naam, e-mail en vraag, maar bij verzenden opent het simpelweg het mailprogramma van de bezoeker (mailto:). De bezoeker moet zelf nog op "verzenden" klikken in zijn eigen mail-app. Als hij geen mail-app heeft ingesteld, gebeurt er niets.
- **Partners, Upload, Doneren, Media** gebruiken allemaal alleen mailto-links voor contact.
- **Reacties bij getuigenissen** worden alleen in het geheugen van de browser bewaard, ze verdwijnen bij refresh.

Conclusie: er wordt op dit moment niets opgeslagen, niets automatisch verstuurd, en je hebt geen overzicht van wie wat heeft ingestuurd.

## Wat ik ga bouwen

Een volwaardig contact- en aanvraagsysteem op JesusToday, met drie lagen:

### 1. Echte formulieren met opslag in Lovable Cloud

- Vervang de mailto-flow in de "Stel je vraag"-sectie door een echte formulier-submit naar de backend.
- Voeg een volwaardig contactformulier toe op `/contact` (naam, e-mail, onderwerp, bericht) in plaats van alleen een mailto-link.
- Voeg een partner-aanvraagformulier toe op `/partners` (kerk/organisatie, naam, e-mail, telefoon optioneel, type aanvraag: partnership / spreker / draaidag, bericht) zodat aanvragen niet meer via mail-app hoeven.
- Alles wordt opgeslagen in een nieuwe tabel zodat geen enkele aanvraag verloren gaat.

### 2. Automatische e-mailnotificaties

- Elke nieuwe inzending stuurt direct een e-mail naar **zowel `info@jesustoday.nl` als `ben@jesustoday.nl`** (beide ontvangers in CC), met alle gegevens van de inzending.
- De afzender krijgt een automatische bevestigingsmail dat het bericht is ontvangen, met een persoonlijke toon.
- Hiervoor zetten we Lovable's ingebouwde e-mailsysteem op, gekoppeld aan jouw eigen domein (`notify.jesustoday.nl` of vergelijkbaar) zodat mails vanuit JesusToday komen, niet vanuit een generiek adres.

### 3. Beveiligd admin-overzicht in de site zelf

- Nieuwe pagina `/admin/inzendingen` waar je alle ingestuurde berichten kunt bekijken, filteren (per type: contact, partner, vraag) en doorzoeken.
- Per inzending zie je: datum, naam, e-mail, type, bericht, status (nieuw / gelezen / afgehandeld).
- Inloggen met e-mail + wachtwoord (Lovable Cloud auth). Alleen accounts met de rol "admin" kunnen de pagina zien, anderen zien een 404 of inlogscherm.
- Vanuit het overzicht kun je direct op een inzending klikken om de details te zien en de status bij te werken.

## Technische opzet (kort)

```text
Bezoeker → formulier → Lovable Cloud database (tabel: submissions)
                    ↓
            Edge Function stuurt:
            - notificatie naar info@jesustoday.nl + ben@jesustoday.nl
            - bevestiging naar bezoeker
                    ↓
            Admin logt in → /admin/inzendingen toont alles
```

- Eén tabel `submissions` met velden voor naam, e-mail, type, onderwerp, bericht, status, datum.
- Toegangsregels (RLS) zodat alleen admins de tabel kunnen lezen, en iedereen mag insturen.
- Aparte tabel voor admin-rollen (`user_roles`), gekoppeld aan je login-account.
- Edge Function voor het versturen van de twee mails per inzending (notificatie naar beide adressen + bevestiging naar afzender).
- E-maildomein van JesusToday opzetten via Lovable Cloud (eenmalige DNS-stap bij je domeinprovider).

## Wat ik van jou nodig heb

Een paar keuzes voordat ik begin:

1. **Subdomein voor afzender**: ik stel voor `notify.jesustoday.nl` als afzenderdomein (b.v. `noreply@notify.jesustoday.nl`). Akkoord, of wil je een ander subdomein?
2. **Admin-account**: met welk e-mailadres (info@ of ben@ of een ander) wil je inloggen op `/admin/inzendingen`?
3. **Partnerformulier**: wil je dat ik die in deze ronde meteen meeneem, of eerst alleen contact + "Stel je vraag" omzetten en partners later?
