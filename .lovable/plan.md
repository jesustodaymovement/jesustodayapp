# Volledige website vertalen (NL/EN)

De taalschakelaar in de header wisselt nu alleen een localStorage-waarde. Om de hele site echt te vertalen wordt er een i18n-systeem opgezet en wordt alle zichtbare tekst gemigreerd naar vertaal-keys.

## Aanpak

1. **i18n infrastructuur**
   - `react-i18next` + `i18next` toevoegen.
   - `src/i18n/index.ts` met config (NL default, EN fallback, taal uit localStorage `jt-lang`).
   - Twee vertaalbestanden: `src/i18n/locales/nl.json` en `src/i18n/locales/en.json`.
   - Initialiseren in `src/main.tsx`.
   - `<html lang>` dynamisch updaten bij taalwissel.

2. **Taalschakelaar koppelen**
   - `Header.tsx` laat `i18n.changeLanguage()` aanroepen i.p.v. losse state.
   - Actieve taal komt uit `useTranslation().i18n.language`.

3. **Tekst migreren naar `t()`**  
   Alle zichtbare strings in:
   - Header, Footer, AlertBar, CookieConsent, ChatWidget
   - Home secties: HeroAudience, ProblemSection, GuideSection, PlanSection, SuccessSection, VideoSliderSection, ChurchSection, PartnersMarqueeSection, CTASection, DiscoverProblemSection, DiscoverOutcomesSection, NextStepsSection, AskQuestionSection, InstagramReelsSection
   - Pagina's: Base, HomeTest, Testimonies, TestimonyDetail, Doneren, Privacy, Disclaimer, OverOns, Media, Contact, Upload, Partners, Opwekking, NotFound
   - Formulieren: ContactForm, NewsletterForm, PartnerForm
   - `Helmet` titels/descripties per pagina.

4. **Wat NIET vertaald wordt**
   - Eigennamen: "JesusToday", "Shoop Shoop", partner-namen.
   - Dynamische data uit de database (getuigenis-titels, sprekersnamen, etc.) blijven in de taal waarin ze zijn ingevoerd.
   - Admin-paginas (`AdminLogin`, `AdminSubmissions`) blijven NL (interne tool).

5. **SEO**
   - `index.html` blijft NL als basis (canonical / OG).
   - Per pagina geen aparte `/en/` route, alleen client-side switch (kan later uitgebreid worden).

## Technische details

- Keys volgens namespace per sectie, bv. `header.nav.stories`, `hero.share.headline`, `footer.madeBy`.
- Engelse merk- en toonregels: behoud "JesusToday" als één woord, gele accent #fad150 ongewijzigd, positieve toon.
- Em-dashes worden in beide talen vermeden (komma's gebruiken).
- Schatting: ~30 bestanden aangepast, ~300 vertaal-keys.

## Wat je krijgt

Werkende NL/EN switch in de header die direct alle UI-tekst op de hele site omschakelt en de keuze onthoudt.
