import { CURATED_TESTIMONIES } from './curated-testimonies';

// Editorial selection, not inferred ages. Preserve source order for other videos.
const featuredRanks = new Map(CURATED_TESTIMONIES.map((video, index) => [video.vimeoUrl, index]));
const MIDDLE_VIDEO = '1235933143'; // Suzanne, explicitly moved from the front.

export function orderTestimonies<T extends { vimeoUrl: string }>(videos: readonly T[]): T[] {
  const middleVideo = videos.find((video) => video.vimeoUrl === MIDDLE_VIDEO);
  const ordered = videos
    .filter((video) => video !== middleVideo)
    .sort((a, b) => (featuredRanks.get(a.vimeoUrl) ?? Infinity) - (featuredRanks.get(b.vimeoUrl) ?? Infinity));

  if (middleVideo) ordered.splice(Math.floor(videos.length / 2), 0, middleVideo);
  return ordered;
}