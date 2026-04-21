export interface Topic {
  id: string;
  label: string;
  keywords: string[];
}

export const TOPICS: Topic[] = [
  {
    id: 'depressie',
    label: 'Depressie',
    keywords: ['depressie', 'depressed', 'depressief', 'somber', 'hopeloos', 'donkerte', 'duisternis'],
  },
  {
    id: 'angst',
    label: 'Angst',
    keywords: ['angst', 'anxiety', 'paniek', 'bang', 'onrust', 'angstig'],
  },
  {
    id: 'alcohol',
    label: 'Alcohol',
    keywords: ['alcohol', 'drank', 'drinken', 'zuipen', 'dronken'],
  },
  {
    id: 'drugs',
    label: 'Drugs',
    keywords: ['drugs', 'wiet', 'cocaine', 'cocaïne', 'verslaafd', 'verslaving', 'blowen', 'xtc', 'pillen'],
  },
  {
    id: 'newage',
    label: 'New Age / occult',
    keywords: ['new age', 'spiritueel', 'yoga', 'occult', 'esoterisch', 'energie', 'reiki', 'tarot'],
  },
  {
    id: 'ziekte',
    label: 'Ziekte / genezing',
    keywords: ['ziek', 'ziekte', 'kanker', 'genezen', 'genezing', 'healing', 'pijn', 'chronisch'],
  },
  {
    id: 'eenzaamheid',
    label: 'Eenzaamheid',
    keywords: ['eenzaam', 'alleen', 'isolatie', 'leegte', 'lonely'],
  },
  {
    id: 'relaties',
    label: 'Relaties / liefde',
    keywords: ['relatie', 'liefde', 'gebroken hart', 'scheiding', 'breakup', 'verbroken', 'huwelijk'],
  },
  {
    id: 'identiteit',
    label: 'Identiteit',
    keywords: ['identiteit', 'wie ben ik', 'zelfbeeld', 'onzeker', 'minderwaardig'],
  },
  {
    id: 'verlies',
    label: 'Verlies / rouw',
    keywords: ['verlies', 'overleden', 'dood', 'rouw', 'gemist', 'sterven', 'gestorven'],
  },
  {
    id: 'twijfel',
    label: 'Twijfel / zoeken',
    keywords: ['twijfel', 'zoeken', 'zin', 'doel', 'vragen', 'zoektocht'],
  },
  {
    id: 'vergeving',
    label: 'Vergeving',
    keywords: ['vergeving', 'vergeven', 'schuld', 'schaamte', 'fout', 'spijt'],
  },
  {
    id: 'familie',
    label: 'Familie',
    keywords: ['familie', 'ouders', 'vader', 'moeder', 'gezin', 'kinderen'],
  },
  {
    id: 'trauma',
    label: 'Trauma / misbruik',
    keywords: ['trauma', 'misbruik', 'mishandeling', 'pesten', 'gepest'],
  },
  {
    id: 'wonder',
    label: 'Wonder / ontmoeting',
    keywords: ['wonder', 'ontmoeting', 'visioen', 'droom', 'stem', 'aanraking'],
  },
];

export const matchTopics = (text: string): string[] => {
  const lower = text.toLowerCase();
  return TOPICS.filter((t) => t.keywords.some((k) => lower.includes(k))).map((t) => t.id);
};

export const testimonyMatchesTopics = (
  text: string,
  selectedTopicIds: string[]
): boolean => {
  if (selectedTopicIds.length === 0) return true;
  const lower = text.toLowerCase();
  return selectedTopicIds.some((id) => {
    const topic = TOPICS.find((t) => t.id === id);
    if (!topic) return false;
    return topic.keywords.some((k) => lower.includes(k));
  });
};