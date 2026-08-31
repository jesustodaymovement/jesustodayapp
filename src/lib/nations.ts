export interface Nation {
  /** Land in het Engels, basis van de vertaling */
  name: string;
  /** ISO 3166-1 alpha-2 code */
  code: string;
  /** Vlagemoji voor een lichte visuele hint */
  flag: string;
  /** Officiële JesusToday website van dit land */
  url: string;
}

/**
 * Landen met een eigen JesusToday website.
 * Nieuw land toevoegen? Voeg hier een regel toe, de navigatie en de
 * Nations pagina nemen die automatisch mee.
 */
export const NATIONS: Nation[] = [
  {
    name: 'Netherlands',
    code: 'NL',
    flag: '🇳🇱',
    url: 'https://jesustoday.nl',
  },
  {
    name: 'South Africa',
    code: 'ZA',
    flag: '🇿🇦',
    url: 'https://jesustoday.co.za',
  },
];

export const nationDomain = (url: string) => url.replace(/^https?:\/\//, '');
