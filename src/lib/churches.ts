/**
 * Eén centrale lijst met alle kerken en organisaties uit de verhalenbron.
 * - name: officiële naam (overal gebruikt: filter, titel, knop)
 * - slug: korte naam voor in de link
 * - website: alleen ingevuld als die zeker klopt
 * - aliases: andere schrijfwijzen die in de video-gegevens voorkomen
 */
export interface Church {
  name: string;
  slug: string;
  website?: string;
  aliases: string[];
}

export const CHURCHES: Church[] = [
  { name: 'Agapè', slug: 'agape', website: 'https://agape.nl/', aliases: [] },
  { name: 'Alongsiders Nederland', slug: 'alongsiders-nederland', website: 'https://www.alongsidersnederland.org/', aliases: [] },
  { name: 'Beach Mission', slug: 'beach-mission', website: 'https://nl.beachmission.org/', aliases: [] },
  { name: 'Beacon Church Langebaan', slug: 'beacon-church-langebaan', website: 'https://www.beacon.org.za/', aliases: [] },
  { name: 'Best Life Church', slug: 'best-life-church', website: 'https://www.bestlifechurch.nl/', aliases: [] },
  { name: 'C3 Home Church Erzgebirge', slug: 'c3-home-church-erzgebirge', website: 'https://c3home.church/', aliases: ['C3 Home Church Erzgebirge The Message Trust'] },
  { name: 'Charis Bible College Nederland', slug: 'charis-bible-college-nederland', website: 'https://charisbiblecollege.nl/', aliases: ['Charis Bible Collage Nederland'] },
  { name: 'De Ark', slug: 'de-ark', aliases: [] },
  { name: 'Divine Healing Church', slug: 'divine-healing-church', aliases: ['Devine healing church'] },
  { name: 'Europoort International Church', slug: 'europoort-international-church', website: 'https://europoortinternational.nl/', aliases: ['Europoort Int. Church'] },
  { name: 'Evangelische Gemeente Vida Plena', slug: 'evangelische-gemeente-vida-plena', aliases: [] },
  { name: 'Fellowship of Believers', slug: 'fellowship-of-believers', aliases: [] },
  { name: 'GlobalRize', slug: 'globalrize', website: 'https://www.globalrize.org/', aliases: [] },
  { name: 'God veranderd mensen in Limburg', slug: 'god-veranderd-mensen-in-limburg', aliases: [] },
  { name: "God's Embassy Amsterdam", slug: 'gods-embassy-amsterdam', website: 'https://embassyamsterdam.nl/', aliases: ['Gods Embassy Amsterdam'] },
  { name: 'Hillsong Amsterdam', slug: 'hillsong-amsterdam', website: 'https://hillsong.com/netherlands/amsterdam/', aliases: [] },
  { name: 'HUB Church Utrecht', slug: 'hub-church-utrecht', website: 'https://www.hubchurch.nl/', aliases: [] },
  { name: 'Huizen van Genade Rhenen', slug: 'huizen-van-genade-rhenen', website: 'https://www.huizenvangenade.nl/', aliases: ['Huizen van Genade - Rhenen'] },
  { name: 'Impact World Tour', slug: 'impact-world-tour', website: 'https://www.impactworldtour.nl/', aliases: [] },
  { name: 'Jesus Central Church', slug: 'jesus-central-church', website: 'https://www.jesuscentral.church/', aliases: [] },
  { name: 'Jesus in the Streets', slug: 'jesus-in-the-streets', website: 'https://jesusinthestreets.nu/', aliases: ['Jesus in the Street'] },
  { name: 'Leef! Zutphen', slug: 'leef-zutphen', website: 'https://leefzutphen.nl/', aliases: [] },
  { name: 'Levend Evangelie Gemeente', slug: 'levend-evangelie-gemeente', website: 'https://leg.nl/', aliases: [] },
  { name: 'Levend Huis', slug: 'levend-huis', website: 'https://levendhuis.nl/', aliases: [] },
  { name: 'Life Builders Hoorn', slug: 'life-builders-hoorn', website: 'https://www.lifebuilders.nl/', aliases: ['Life Builders'] },
  { name: 'Mission Possible Nederland', slug: 'mission-possible-nederland', website: 'https://missionpossible.nl/', aliases: [] },
  { name: 'Motion Church', slug: 'motion-church', aliases: ['Motionchurch'] },
  { name: 'Mozaiek071', slug: 'mozaiek071', website: 'https://071.mozaiek.nl/', aliases: [] },
  { name: 'Nehemia Gemeente Heemstede', slug: 'nehemia-gemeente-heemstede', website: 'https://www.rafael-nehemia.nl/', aliases: [] },
  { name: 'New Life West Amsterdam', slug: 'new-life-west-amsterdam', website: 'https://newlifewest.nl/', aliases: ['New Life West (Amsterdam)'] },
  { name: 'Nieuw Seizoen', slug: 'nieuw-seizoen', aliases: [] },
  { name: 'OWNJ', slug: 'ownj', aliases: [] },
  { name: 'Pinksterkerk De Weg Mijdrecht', slug: 'pinksterkerk-de-weg-mijdrecht', website: 'https://www.deweg.net/', aliases: ['Pinksterkerk De Weg'] },
  { name: 'R5 Church', slug: 'r5-church', website: 'https://r5church.nl/', aliases: ['R5', 'R5 bijbelschool Amsterdam', 'R5 Bijbelschool', 'Bijbelschool R5', 'R5 Church /Bijbelschool', 'R5 Church Amsterdam', 'R5 Kerk en Bijbelschool', 'R5Church'] },
  { name: 'Ríos de Vida Den Helder', slug: 'rios-de-vida-den-helder', website: 'https://www.riosdevidadenhelder.nl/', aliases: [] },
  { name: 'Sjaloom Heerhugowaard', slug: 'sjaloom-heerhugowaard', website: 'https://www.sjaloomheerhugowaard.nl/', aliases: [] },
  { name: 'Soulwinners', slug: 'soulwinners', aliases: [] },
  { name: 'Testimony of Jesus', slug: 'testimony-of-jesus', aliases: [] },
  { name: 'The Message Nederland', slug: 'the-message-nederland', website: 'https://messagenederland.nl/', aliases: [] },
  { name: 'The Message Trust', slug: 'the-message-trust', website: 'https://www.message.org.uk/', aliases: [] },
  { name: 'Tribe Church Haarlem', slug: 'tribe-church-haarlem', website: 'https://tribechurch.nl/', aliases: [] },
  { name: 'Vrienden van de Hoop', slug: 'vrienden-van-de-hoop', website: 'https://www.vriendenvandehoop.nl/', aliases: [] },
  { name: 'Vrije Baptistengemeente Bethel Drachten', slug: 'vrije-baptistengemeente-bethel-drachten', website: 'https://www.bethel.nl/', aliases: ['Vrije baptisten gemeente Bethel Drachten'] },
  { name: 'YWAM Alblasserwaard', slug: 'ywam-alblasserwaard', website: 'https://ywam.nl/lokaties/alblasserwaard', aliases: ['Impact World Tour YWAM Alblasserwaard', 'Jeugd met een opdracht Alblasserwaard'] },
  { name: 'YWAM', slug: 'ywam', aliases: [] },
];

export const normalizeChurch = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export const slugify = (s: string) => normalizeChurch(s).replace(/ /g, '-');

const lookup = new Map<string, Church>();
CHURCHES.forEach((c) => {
  [c.name, c.slug.replace(/-/g, ' '), ...c.aliases].forEach((n) => lookup.set(normalizeChurch(n), c));
});

/** Vind de kerk bij een (vrij geschreven) kerknaam uit de video-gegevens. */
export const findChurch = (raw?: string | null): Church | null => {
  if (!raw) return null;
  return lookup.get(normalizeChurch(raw)) ?? null;
};

export const getChurchBySlug = (slug?: string) => CHURCHES.find((c) => c.slug === slug) ?? null;

import { localizePath } from './routes';
export const churchPath = (slug: string, lang: string) =>
  localizePath(`/verhalen-over-jezus/kerk/${slug}`, lang);
