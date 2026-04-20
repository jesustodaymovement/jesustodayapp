import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, Loader2, Search } from 'lucide-react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Testimony {
  id: string;
  languageCode: string;
  quote: string;
  churchName: string;
  status: string;
  vimeoUrl: string;
  websiteVideoUrl: string;
  creationTime: string;
  user: { id: string; username: string };
}

interface ApiResponse {
  totalCount: number;
  items: Testimony[];
}

const LANGUAGES = [
  { code: 'nl', label: 'Nederlands' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
];

const thumbCache = new Map<string, string>();

const fetchThumbnail = async (vimeoId: string): Promise<string | null> => {
  if (thumbCache.has(vimeoId)) return thumbCache.get(vimeoId)!;
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${vimeoId}&width=640`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const url = data.thumbnail_url as string | undefined;
    if (url) {
      thumbCache.set(vimeoId, url);
      return url;
    }
  } catch (e) {
    console.error('Vimeo thumbnail error', e);
  }
  return null;
};

const TestimonyCard = ({
  testimony,
  onPlay,
}: {
  testimony: Testimony;
  onPlay: (t: Testimony) => void;
}) => {
  const [thumb, setThumb] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchThumbnail(testimony.vimeoUrl).then((url) => {
      if (mounted) setThumb(url);
    });
    return () => {
      mounted = false;
    };
  }, [testimony.vimeoUrl]);

  return (
    <button
      onClick={() => onPlay(testimony)}
      className="group relative rounded-2xl overflow-hidden bg-anthracite shadow-card hover:shadow-lg transition-all duration-300 text-left"
    >
      <div className="relative aspect-[3/4] bg-anthracite-light">
        {thumb ? (
          <img
            src={thumb}
            alt={`Getuigenis van ${testimony.user.username}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-warm-white/50 animate-spin" />
          </div>
        )}

        <div className="absolute inset-0 bg-anthracite/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-gold">
            <Play className="w-8 h-8 text-anthracite ml-1" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-anthracite via-anthracite/70 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-warm-white font-semibold text-lg">
            {testimony.user.username}
          </p>
          <p className="text-warm-white/80 text-sm line-clamp-2 mb-1">
            "{testimony.quote}"
          </p>
          {testimony.churchName && testimony.churchName !== 'undefined' && (
            <p className="text-gold text-xs font-medium line-clamp-1">
              {testimony.churchName}
            </p>
          )}
        </div>
      </div>
    </button>
  );
};

const Testimonies = () => {
  const [items, setItems] = useState<Testimony[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState('nl');
  const [search, setSearch] = useState('');
  const [churchFilter, setChurchFilter] = useState('all');
  const [skip, setSkip] = useState(0);
  const [activeVideo, setActiveVideo] = useState<Testimony | null>(null);

  const PAGE_SIZE = 12;

  const fetchVideos = async (
    lang: string,
    skipCount: number,
    append: boolean
  ) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    setError(null);
    try {
      const url = `https://jesustoday-production-backend.azurewebsites.net/api/jesustoday/videos?LanguageCode=${lang}&Status=50&Sorting=creationTime%20desc&MaxResultCount=${PAGE_SIZE}&SkipCount=${skipCount}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ApiResponse = await res.json();
      setTotalCount(data.totalCount);
      setItems((prev) => (append ? [...prev, ...data.items] : data.items));
    } catch (e) {
      console.error(e);
      setError('Er ging iets mis bij het ophalen van de getuigenissen.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setSkip(0);
    fetchVideos(language, 0, false);
  }, [language]);

  const churches = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => {
      if (i.churchName && i.churchName !== 'undefined') set.add(i.churchName);
    });
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (churchFilter !== 'all' && i.churchName !== churchFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        return (
          i.quote.toLowerCase().includes(s) ||
          i.user.username.toLowerCase().includes(s) ||
          (i.churchName || '').toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [items, churchFilter, search]);

  const loadMore = () => {
    const newSkip = skip + PAGE_SIZE;
    setSkip(newSkip);
    fetchVideos(language, newSkip, true);
  };

  const hasMore = items.length < totalCount;

  return (
    <div className="min-h-screen bg-cream">
      <Helmet>
        <title>Video Getuigenissen — Jesus Today</title>
        <meta
          name="description"
          content="Bekijk video getuigenissen van mensen die hun geloof in Jezus delen."
        />
        <link rel="canonical" href="/getuigenissen" />
      </Helmet>

      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-anthracite mb-4">
                Video <span className="text-gold">Getuigenissen</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Ontdek de verhalen van mensen die hun leven met Jezus delen.
                {totalCount > 0 && ` ${totalCount} getuigenissen beschikbaar.`}
              </p>
            </ScrollReveal>

            {/* Filters */}
            <ScrollReveal delay={150}>
              <div className="flex flex-col md:flex-row gap-4 mb-10 p-4 bg-warm-white rounded-2xl shadow-card">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Zoek op naam, quote of kerk..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>

                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="md:w-48 h-12">
                    <SelectValue placeholder="Taal" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((l) => (
                      <SelectItem key={l.code} value={l.code}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={churchFilter} onValueChange={setChurchFilter}>
                  <SelectTrigger className="md:w-56 h-12">
                    <SelectValue placeholder="Kerk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle kerken</SelectItem>
                    {churches.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </ScrollReveal>

            {/* Content */}
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-12 h-12 text-gold animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-24">
                <p className="text-destructive mb-4">{error}</p>
                <button
                  onClick={() => fetchVideos(language, 0, false)}
                  className="text-gold underline"
                >
                  Opnieuw proberen
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24 text-muted-foreground">
                Geen getuigenissen gevonden met deze filters.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((t) => (
                    <TestimonyCard
                      key={t.id}
                      testimony={t}
                      onPlay={setActiveVideo}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center mt-12">
                    <button
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-anthracite text-warm-white font-semibold hover:bg-gold hover:text-anthracite transition-all duration-300 disabled:opacity-50"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Laden...
                        </>
                      ) : (
                        'Meer getuigenissen laden'
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Video player dialog */}
      <Dialog
        open={!!activeVideo}
        onOpenChange={(open) => !open && setActiveVideo(null)}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-anthracite border-anthracite">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-warm-white">
              {activeVideo?.user.username} — "{activeVideo?.quote}"
            </DialogTitle>
          </DialogHeader>
          {activeVideo && (
            <div className="aspect-video w-full">
              <iframe
                src={`https://player.vimeo.com/video/${activeVideo.vimeoUrl}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={`Getuigenis van ${activeVideo.user.username}`}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Testimonies;