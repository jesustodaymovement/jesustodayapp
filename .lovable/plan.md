## Doel
De `/hometest` route helemaal weghalen.

## Wat ik ga doen
- In `src/App.tsx`: de regel `<Route path="/hometest" element={<Navigate to="/" replace />} />` verwijderen. Iemand die `/hometest` intypt valt dan door naar de catch-all `*` en ziet de NotFound-pagina.

## Niet doen
- `HomeTest.tsx` zelf NIET verwijderen, want die component wordt nog gebruikt op `/` via `HomeGate` in `App.tsx`.

## Optie
Als je liever wilt dat oude bezoekers van `/hometest` alsnog op `/` landen in plaats van een 404, zeg het, dan houd ik de redirect en haal alleen de directe link weg. Standaard ga ik er nu vanuit dat je hem echt weg wilt.
