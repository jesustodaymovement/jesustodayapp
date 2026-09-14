# Roadmap

## Spambescherming formulieren (in uitvoering)
- [x] Tabellen `blocked_submissions` en `submission_rate_limits`, publieke insert op `submissions` ingetrokken
- [x] Server-route `submit-form` met snelheidslimiet per IP en logging
- [ ] Spamfilter-module `src/lib/spam-guard.ts` met redenen (honeypot, tijd, links, BBCode/HTML, spamwoorden, Cyrillisch/CJK, naamchecks)
- [ ] Honeypot "Website" + tijdmeting in contactformulier, nieuwsbrief en overige eigen formulieren
- [ ] Stille weigering: geen opslag, geen mail, gewone succesmelding
- [ ] Tweede controle in `send-submission-emails` vlak voor verzenden naar info@jesustoday.nl
- [ ] robots.txt: SEO-crawlers en AI-bots blokkeren, zoek- en socialbots toestaan
- [ ] Geen captcha/Turnstile (bewuste keuze van de gebruiker)
- [ ] Adminoverzicht: tab met geblokkeerde inzendingen
