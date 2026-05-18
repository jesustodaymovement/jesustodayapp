import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://storybrand-share-grace.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/verhalen-over-jezus", changefreq: "weekly", priority: "0.9" },
  { path: "/upload", changefreq: "monthly", priority: "0.9" },
  { path: "/over-ons", changefreq: "monthly", priority: "0.8" },
  { path: "/partners", changefreq: "monthly", priority: "0.7" },
  { path: "/doneren", changefreq: "monthly", priority: "0.8" },
  { path: "/media", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/aanmeldenopwekking2026", changefreq: "weekly", priority: "0.8" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/disclaimer", changefreq: "yearly", priority: "0.3" },
];

function readEnv(name: string): string | undefined {
  try {
    const env = readFileSync(resolve(".env"), "utf8");
    const m = env.match(new RegExp(`^${name}="?([^"\\n]+)"?`, "m"));
    return m?.[1];
  } catch {
    return undefined;
  }
}

async function fetchTestimonyIds(): Promise<string[]> {
  const url = readEnv("VITE_SUPABASE_URL");
  const key = readEnv("VITE_SUPABASE_PUBLISHABLE_KEY");
  if (!url || !key) return [];
  const ids = new Set<string>();
  const languages = ["nl", "en", "de", "fr", "es"];
  for (const lang of languages) {
    try {
      const params = new URLSearchParams({
        LanguageCode: lang,
        Status: "50",
        Sorting: "creationTime desc",
        MaxResultCount: "500",
        SkipCount: "0",
      });
      const res = await fetch(`${url}/functions/v1/get-testimonies?${params.toString()}`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
      });
      if (!res.ok) continue;
      const data: { items?: { vimeoUrl?: string }[] } = await res.json();
      data.items?.forEach((item) => item.vimeoUrl && ids.add(item.vimeoUrl));
    } catch (err) {
      console.warn(`Sitemap: skip lang ${lang}`, err);
    }
  }
  return Array.from(ids);
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

(async () => {
  const testimonyIds = await fetchTestimonyIds();
  const allEntries = [
    ...entries,
    ...testimonyIds.map<SitemapEntry>((id) => ({
      path: `/verhalen-over-jezus/${id}`,
      changefreq: "monthly",
      priority: "0.6",
    })),
  ];
  writeFileSync(resolve("public/sitemap.xml"), generateSitemap(allEntries));
  console.log(`sitemap.xml written (${allEntries.length} entries)`);
})();