## Doel

Een sitewide zwevende chat-widget (rechtsonder) toevoegen, vergelijkbaar met het Chaty-voorbeeld, met twee kanalen: WhatsApp en Email. Geen externe Chaty-plugin nodig, gewoon een lichte eigen React-component zodat we performance, styling en toegankelijkheid in eigen hand houden.

## Gedrag

- Hoofdknop rechtsonder met label "Vraag over God?" en chat-icoon.
- Klik opent een verticale lijst boven de knop met twee ronde kanaal-iconen:
  1. WhatsApp, opent `https://wa.me/31643798701` in nieuw tabblad (groene cirkel, WhatsApp-glyph, kleur #49E670 zoals in de bron).
  2. Email, opent `mailto:info@vraagovergod.nl` (gele cirkel met #fad150 zoals huisstijl, envelop-glyph).
- Klik op de hoofdknop opnieuw, of buiten de widget, sluit het paneel.
- Tooltip-label naast elk icoon ("WhatsApp", "Email") bij hover op desktop.
- ESC sluit het paneel, focus-trap binnen open state, ARIA: `aria-expanded`, `aria-label="Chat openen"`, kanaal-links met eigen `aria-label`.

## Stijl

- Knop: ronde pill, achtergrond #fad150, donkere tekst (anthracite), subtiele schaduw, hover lift.
- Kanaal-iconen: 48px ronde cirkels, fade+slide-up animatie bij openen (gestaggerd 60ms).
- Mobile: alleen icoon-only hoofdknop (geen tekst) om ruimte te besparen, paneel blijft identiek.
- Geen em-dashes, komma's in alle tekst.
- z-index hoog genoeg om boven Embla carousels en video-embeds te staan (z-50 of hoger).

## Implementatie

1. Nieuwe component `src/components/ChatWidget.tsx`
   - Client-side React, `useState` voor open/dicht, `useEffect` voor ESC + click-outside.
   - Geen extra npm packages, iconen via inline SVG (WhatsApp glyph uit de meegestuurde HTML) of `lucide-react` (`Mail`, `MessageCircle`).
2. Mount in `src/App.tsx` (of de huidige root layout) na de routes, zodat de widget op elke pagina zichtbaar is (inclusief Base, Home, Testimonies, etc.).
3. Telefoonnummer en e-mailadres als consts bovenaan de component voor één-plek-onderhoud.
4. Geen wijzigingen aan bestaande pagina's, layout of footer.

## Niet in scope

- Geen extra kanalen (Messenger, Telegram, etc.); makkelijk later uit te breiden via een config-array.
- Geen analytics-tracking op clicks (kan later toegevoegd via een onClick-handler).
- Geen contactformulier-popup, alleen directe deep-links naar WhatsApp en mail-client.
