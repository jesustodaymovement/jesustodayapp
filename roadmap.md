# Roadmap

## Spambescherming formulieren (afgerond)
- [x] Tabellen `blocked_submissions` en `submission_rate_limits`, publieke insert op `submissions` ingetrokken
- [x] Server-route `submit-form` met snelheidslimiet per IP en logging
- [x] Spamfilter-module `src/lib/spam-guard.ts` + `supabase/functions/_shared/spam-guard.ts` (honeypot, tijd, links, BBCode/HTML, spamwoorden, Cyrillisch/CJK, naamchecks)
- [x] Honeypot "Website" + tijdmeting in contactformulier, nieuwsbrief en overige eigen formulieren
- [x] Stille weigering: geen opslag, geen mail, gewone succesmelding
- [x] Tweede controle in `send-submission-emails` vlak voor verzenden naar info@jesustoday.nl
- [x] robots.txt: SEO-crawlers en AI-bots blokkeren, zoek- en socialbots toestaan
- [x] Geen captcha/Turnstile (bewuste keuze van de gebruiker)
- [x] Adminoverzicht: tab met geblokkeerde inzendingen
- [x] Getest: echte inzending komt door, SEO-spam wordt stil geweigerd en gelogd
