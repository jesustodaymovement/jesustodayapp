## Doel

Sitewide alert-balk met een duidelijke CTA voor Opwekking, en een nieuwe aanmeldpagina met contactformulier waar geïnteresseerden zich melden om tijdens Opwekking een getuigenisvideo te laten opnemen.

## 1. Alert-balk (sitewide)

- Nieuwe component `src/components/AlertBar.tsx`.
- Boven de header gepind (boven de sticky `Header`). Achtergrond #fad150, donkere tekst, klein megafoon-icoon.
- Tekst: "Laat je getuigenis opnemen tijdens Opwekking" met daarachter een onderstreepte CTA-link "Meld je aan".
- Hele balk is klikbaar, navigeert naar `/opwekking`.
- Sluitknop (X) rechts. Gesloten-status onthouden in `localStorage` onder key `jt-opwekking-bar-dismissed` zodat de balk niet opnieuw verschijnt na sluiten.
- Mount in `src/App.tsx` boven `<Routes>` zodat hij op elke pagina staat.
- Tone: positief en uitnodigend, sluit aan op huisstijl-regel "lichte, hoopvolle esthetiek".

## 2. Nieuwe pagina `/opwekking`

- Bestand: `src/pages/Opwekking.tsx`, geregistreerd in `App.tsx`.
- Header en Footer hergebruiken (zelfde patroon als andere subpagina's).
- Helmet: title "Opwekking, laat je getuigenis opnemen, JesusToday", description en og/twitter tags.
- H1: "Ja, ik wil een video maken"
- Intro (één H2 + bodytekst, met komma's in plaats van em-dashes):
  - Welkomstparagraaf: "Wat mooi dat je je aanmeldt. Wij gaan je helpen om een impactvolle getuigenisvideo te maken."
  - Vooraf-blok in een vriendelijke "Goed om te weten"-kaart (bewust niet als angstboodschap framen, maar als bemoediging):
    - Korte uitleg dat er drempels kunnen opduiken die je verhaal willen tegenhouden.
    - Lijst met de vier voorbeelden uit de briefing, letterlijk overgenomen.
  - Bemoediging: "Maar jouw authentieke verhaal doet er weldegelijk toe en wij gaan je helpen, zodat jij een gezegend Jezus-getuige bent. Gehoorzaam aan Zijn 'Grote opdracht'."
  - Korte uitleg waarom we contactgegevens vragen.
- Contactformulier (kaart, lichte achtergrond):
  - Velden: Voornaam, Achternaam, Telefoonnummer, E-mailadres (allemaal required).
  - Validatie met `zod` (al aanwezig in project): trim, max-lengtes, e-mailcheck, telefoon min 6 max 20 tekens, alleen cijfers/spaties/+/-.
  - Submit-knop: "Meld mij aan" in #fad150.
- Verzending:
  - Insert in nieuwe Supabase-tabel `opwekking_signups` (kolommen: id uuid pk default gen_random_uuid, first_name text, last_name text, phone text, email text, created_at timestamptz default now).
  - RLS: alleen anonieme INSERT toegestaan (`with check (true)`), geen SELECT/UPDATE/DELETE voor anon. Admins (bestaande user_roles 'admin') krijgen SELECT-policy.
  - Bevestigings-toast en in-page success-state met de hartelijke groet-blok:
    - "We nemen zo snel mogelijk contact met je op."
    - Ondertekening: "Hartelijke groet en zegen namens het JesusToday Team", `info@jesustoday.nl`, tel. 06-83559808, link naar `https://www.jesustoday.nl`.
- Sectie onderaan met praktische contactinfo (mail + telefoon klikbaar) voor wie liever direct contact opneemt.

## 3. Database-migratie

Nieuwe migratie:
- `create table public.opwekking_signups (...)` zoals hierboven.
- `alter table ... enable row level security`.
- Policy `anon_insert`: `for insert to anon with check (true)`.
- Policy `admin_select`: `for select to authenticated using (public.has_role(auth.uid(), 'admin'))` (gebruikt bestaande `has_role` functie).

## 4. Admin-zichtbaarheid (lichte aanvulling, optioneel)

Niet in eerste versie. Inzendingen zijn in de database zichtbaar; we voegen later eventueel een tab toe in `/admin/inzendingen`.

## 5. Toon en stijlregels

- Komma's in plaats van em-dashes.
- "JesusToday" als één woord.
- Gele knoppen/accenten in #fad150.
- Geen angst-retoriek in eigen koppen; de drogredenen-lijst staat in een neutrale "Goed om te weten"-kaart, niet als sectiekop "Wat als je stil blijft?".
- Mobile-first, WCAG AA contrast, alt-tekst op iconen via `aria-hidden`/labels.

## Niet in scope

- Geen e-mailnotificatie naar het team bij een nieuwe aanmelding (kan later via edge function en Resend).
- Geen agenda/datumselectie of tijdslot-boeking.
- Geen wijziging aan bestaande Upload-flow of getuigenis-pagina's.
