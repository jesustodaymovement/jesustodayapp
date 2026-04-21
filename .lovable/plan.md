

# Plan: onderwerp-filters voor video getuigenissen

Op de pagina `/getuigenissen` komt een extra filter-laag waarmee bezoekers kunnen filteren op **thema's** die in de getuigenissen voorkomen (bijv. depressie, verslaving, new age, ziekte). Omdat de upstream API geen onderwerp-veld levert, classificeren we client-side via trefwoord-matching op de quote en gebruikersnaam.

## Voorgestelde onderwerpen

Een set van 12 herkenbare thema's die passen bij de doelgroep (16-29) en bij wat in de getuigenissen voorkomt:

| Thema | Trefwoorden (NL/EN) |
|---|---|
| Depressie | depressie, depressed, somber, hopeloos, donkerte |
| Angst | angst, anxiety, paniek, bang, onrust |
| Verslaving (alcohol) | alcohol, drank, drinken, zuipen |
| Verslaving (drugs) | drugs, wiet, cocaïne, verslaafd, blowen |
| New Age / occult | new age, spiritueel, yoga, occult, esoterisch, energie |
| Ziekte / genezing | ziek, ziekte, kanker, genezen, healing, pijn |
| Eenzaamheid | eenzaam, alleen, isolatie, leegte |
| Relaties / liefde | relatie, liefde, gebroken hart, scheiding, breakup |
| Identiteit | identiteit, wie ben ik, zelfbeeld, onzeker |
| Verlies / rouw | verlies, overleden, dood, rouw, gemist |
| Twijfel / zoeken | twijfel, zoeken, zin, doel, vragen |
| Vergeving | vergeving, schuld, schaamte, fout |

Lijst is uitbreidbaar in één centraal bestand.

## UX op de pagina

- Onder de bestaande filterbalk (zoek, taal, kerk) komt een rij met **chips/tags** voor onderwerpen
- Chips zijn multi-select: meerdere thema's actief = OR-filter (toont video's die minstens één gekozen thema bevatten)
- Actieve chip: `bg-gold` (#fad150) met donkere tekst; inactief: warm-white met border
- Een "Wis filters" knop verschijnt zodra er een onderwerp gekozen is
- Achter elke chip-label een klein aantal tussen haakjes (hoeveel video's matchen) op basis van de geladen set
- Op mobiel: horizontaal scrollbare rij chips

```text
┌──────────────────────────────────────────────────────────┐
│ [🔍 zoek...]  [Taal ▾]  [Kerk ▾]                         │
├──────────────────────────────────────────────────────────┤
│ Onderwerpen:                                  Wis filters │
│ ( Depressie 4 ) ( Angst 3 ) ( Alcohol 2 ) ( Drugs 5 )    │
│ ( New Age 1 ) ( Ziekte 2 ) ( Eenzaamheid 3 ) ...         │
└──────────────────────────────────────────────────────────┘
```

## Logica

- Omdat filteren over alle data moet gebeuren, blijft de bestaande "load all on filter" trigger werken: zodra een onderwerp wordt geselecteerd worden alle getuigenissen van de huidige taal opgehaald (al geïmplementeerd voor zoek/kerk)
- Een testimony matcht een thema als de gecombineerde tekst (`quote + username`, lowercase) een van de trefwoorden van dat thema bevat (substring match)
- Combinatie met andere filters (zoek/kerk/taal) blijft AND, onderwerpen onderling OR

## Technische uitwerking

**Nieuw bestand `src/lib/topics.ts`**
- Exporteert `TOPICS` array: `{ id, label, keywords: string[] }[]`
- Helper `matchTopics(text: string): string[]` → geeft topic-ids terug die matchen
- Helper `testimonyMatchesTopics(testimony, selectedTopicIds)` → boolean

**`src/pages/Testimonies.tsx`**
- Nieuwe state: `selectedTopics: Set<string>`
- Nieuwe sectie in filterbalk met chip-knoppen (gebruik bestaande `Badge` of een nieuwe lichte chip-styling met Tailwind)
- `filtered` useMemo uitbreiden met onderwerp-filter
- Topic counts via useMemo over `items` (telt alleen binnen huidige taal-set)
- "Wis filters" knop reset zoek + kerk + onderwerpen
- De bestaande effect-trigger voor `loadingAll` uitbreiden zodat `selectedTopics.size > 0` ook alle data laadt

**Geen wijzigingen** aan: edge function, types, routing, andere pagina's.

## Wat dit oplevert

Bezoekers kunnen direct filteren op herkenbare levensthema's, wat de drempel verlaagt om een relevante getuigenis te vinden. Volledig client-side, geen API-wijzigingen, makkelijk uit te breiden door trefwoorden toe te voegen.

