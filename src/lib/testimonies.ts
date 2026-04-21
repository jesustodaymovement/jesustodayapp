const thumbnailCache = new Map<string, string>();

export const getChurchName = (churchName?: string | null) => {
  const cleaned = churchName?.trim().replace(/\s+/g, ' ') ?? '';

  if (!cleaned) return null;

  const normalized = cleaned.toLowerCase();
  if (normalized === 'undefined' || normalized === 'null' || normalized === '-') {
    return null;
  }

  return cleaned;
};

export const getChurchKey = (churchName?: string | null) => {
  const cleaned = getChurchName(churchName);
  return cleaned ? cleaned.toLowerCase() : null;
};

export const fetchThumbnail = async (vimeoId: string): Promise<string | null> => {
  if (thumbnailCache.has(vimeoId)) return thumbnailCache.get(vimeoId)!;

  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${vimeoId}&width=640`
    );
    if (!res.ok) return null;

    const data = await res.json();
    const url = data.thumbnail_url as string | undefined;

    if (url) {
      thumbnailCache.set(vimeoId, url);
      return url;
    }
  } catch (error) {
    console.error('Vimeo thumbnail error', error);
  }

  return null;
};