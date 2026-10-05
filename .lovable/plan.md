# Taal in de URL voor de hele website

## Doel
Elke pagina krijgt een eigen adres per taal. De taal in de link bepaalt welke taal wordt geladen. Wie een /en/-link deelt of aanklikt, krijgt direct de Engelse versie.

## URL-opbouw
Nederlands houdt de huidige adressen, zodat bestaande links en Google-resultaten blijven werken. Andere talen krijgen een voorvoegsel en een vertaald paginanaam:

```text
NL (huidig)                         EN                                  ES / FIL
/verhalen-over-jezus                /en/stories-about-jesus             /es/... , /fil/...
/verhalen-over-jezus/<video>        /en/stories-about-jesus/<video>
/verhalen-over-jezus/kerk/<kerk>    /en/stories-about-jesus/church/<kerk>
/over-ons                           /en/about-us
/doneren                            /en/donate
/contact                            /en/contact
/upload                             /en/upload
/partners, /nations, /privacy ...   /en/partners, /en/nations, ...
```
Spaans en Filipino gebruiken dezelfde paginanamen als Engels, met /es/ of /fil/ ervoor.

## Gedrag
1. Open je een link met /en/, /es/ of /fil/, dan schakelt de site automatisch naar die taal. Zonder voorvoegsel is het Nederlands.
2. De taalknop (EN/NL/ES/FIL) wisselt naar dezelfde pagina in de andere taal, met het juiste adres.
3. Alle links in het menu, de footer, knoppen en videokaarten gaan naar de versie in de huidige taal.
4. De oude kerkpagina-adressen (/en/stories/church/...) sturen door naar de nieuwe adressen.
5. Voor Google: elke pagina krijgt verwijzingen naar zijn andere taalversies (hreflang) en de sitemap bevat alle taalversies.

## Buiten bereik
Alleen voor intern gebruik: beheerpagina's, het Opwekking-formulier en de afmeldpagina krijgen geen taalversies.

## Technische details
- Nieuw `src/lib/routes.ts`: lijst met pagina-ID's en hun slug per taal, plus `localizedPath(id, lang, params)` en `switchLangPath(pathname, lang)`.
- `App.tsx`: routes genereren voor NL zonder voorvoegsel en voor `/:lang(en|es|fil)/...`; een `LangSync`-onderdeel zet de taal van i18n op basis van de URL. De taalkeuze in localStorage geldt niet meer als de URL een taal bevat.
- Een `LocalizedLink`-helper vervangt de vaste `to="/..."` in Header, Footer, kaarten en CTA's.
- In Header gebruikt `setLanguage` de functie `switchLangPath`. De speciale code voor kerkpagina's verdwijnt en `churchPath` in churches.ts maakt de adressen via routes.ts.
- Helmet: canonical en `<link rel="alternate" hreflang>` per pagina. De sitemap-generator schrijft alle taalvarianten.
- Regel in AGENTS.md: routes.ts is de enige bron voor taal-URL's.
