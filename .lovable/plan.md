# Spam blokkeren op alle openbare formulieren

Doel: geautomatiseerde SEO-spam stopt voordat er ook maar één mail naar info@jesustoday.nl gaat, terwijl echte bezoekers niets extra hoeven te doen.

## Wat de bezoeker merkt

- Onder elk formulier komt een onopvallende Cloudflare-beveiligingscheck. In de meeste gevallen loopt die automatisch door, alleen bij verdacht gedrag verschijnt een klik-vinkje.
- Verzenden gaat verder precies zoals nu: knop, laadstatus, bedankmelding.
- Een geblokkeerde inzending krijgt een vriendelijke melding met de vraag het opnieuw te proberen of te mailen, in alle vier de talen (EN, NL, ES, FIL).

## Zes lagen bescherming

1. **Cloudflare Turnstile** op alle openbare formulieren: contact, vraag over geloof, aanmelden Opwekking, getuigenisformulier op locatie, partner worden, reactie op een getuigenis en de nieuwsbriefaanmelding. Het token wordt op de server gecontroleerd bij Cloudflare; zonder geldig token geen opslag en geen mail.
2. **Honeypot**: het bestaande verborgen veld plus het minimale invultijd-slot verhuizen mee naar de servercontrole, zodat bots ze niet kunnen omzeilen door het formulier over te slaan.
3. **Snelheidslimiet per IP**: maximaal 3 inzendingen per IP per 10 minuten en 10 per dag, plus 3 per e-mailadres per uur. Daarboven volgt een nette foutmelding.
4. **Maximaal één link**: berichten met twee of meer URL's (ook varianten als "www.", "bit.ly" of "example [punt] com") worden geweigerd.
5. **Servercontrole vóór verzenden**: opslaan én mailen gebeurt alleen nog vanuit de server, na alle checks. Extra signalen die meewegen: bekende spamwoorden (SEO, backlinks, ranking, crypto, casino), cyrillisch/Chinees schrift in een verder Nederlands/Engels bericht, wegwerp-e-maildomeinen en identieke berichten die al eerder binnenkwamen.
6. **Logboek van geblokkeerde inzendingen**: elke blokkade wordt vastgelegd met reden, score, tijd, formuliernaam en een afgeschermd IP, zichtbaar in het adminoverzicht onder een tab "Geblokkeerd". Zo zie je of er per ongeluk echte berichten sneuvelen en kun je een adres of IP handmatig vrijgeven.

## Techniek

- Nieuwe Edge Function `submit-form` (verify_jwt = false) wordt het enige verzendpad. Die valideert met zod, verifieert het Turnstile-token bij `https://challenges.cloudflare.com/turnstile/v0/siteverify`, past de spamregels toe, schrijft de inzending met de service-role client en roept daarna `send-submission-emails` aan. `src/lib/submissions.ts` roept alleen nog deze functie aan.
- Directe inserts vanuit de browser op `submissions` worden ingetrokken: de publieke insert-policy en het insert-grant voor `anon` gaan eruit, alleen `service_role` schrijft nog. Lezen blijft admin-only.
- Migratie: tabel `blocked_submissions` (reden, score, formulier, naam, e-mail, bericht-fragment, ip_hash, user_agent, created_at) met GRANT voor `service_role`, select voor `authenticated` via de bestaande adminrol-check, RLS aan, plus tabel `submission_rate_limits` (ip_hash, email, window_start, count) voor de limieten. IP's worden gehasht met een salt, dus er staat geen ruw IP in de database.
- Frontend: `TurnstileWidget` component die het Cloudflare-script eenmalig laadt en per formulier een token levert; `SubmissionForm` en `NewsletterForm` sturen dat token mee en blokkeren verzenden tot het er is. De sitekey is publiek en komt in de code.
- Nieuwe teksten en foutmeldingen gaan door de bestaande vertalingen (en.json, nl, es, fil).

## Wat ik van jou nodig heb

Cloudflare Turnstile-sleutels voor jesustoday.app (gratis, via het Cloudflare-dashboard onder Turnstile, widgetmodus "Managed"). Je krijgt een sitekey en een secret key. De secret key vraag ik straks via het beveiligde formulier op; de sitekey mag je gewoon in de chat plakken. Zonder die sleutels bouw ik de andere vijf lagen alvast en zet ik Turnstile klaar zodra ze binnen zijn.
