import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Play, Loader2, Search } from 'lucide-react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Input } from '@/components/ui/input';
import { fetchThumbnail, getChurchKey, getChurchName } from '@/lib/testimonies';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

const TestimonyCard = ({ testimony }: { testimony: Testimony }) => {
  const [thumb, setThumb] = useState<string | null>(null);
  const churchName = getChurchName(testimony.churchName);

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
    <Link
      to={`/getuigenissen/${testimony.vimeoUrl}`}
      className="group relative rounded-2xl overflow-hidden bg-anthracite shadow-card hover:shadow-lg transition-all duration-300 text-left block"
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
          {churchName && (
            <p className="text-gold text-xs font-medium line-clamp-1">
              {churchName}
            </p>
          )}
        </div>
      </div>
    </Link>
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
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);

  const PAGE_SIZE = 12;

  const fetchVideos = async (
    lang: string,
    skipCount: number,
    append: boolean,
    pageSize: number = PAGE_SIZE
  ) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        LanguageCode: lang,
        Status: '50',
        Sorting: 'creationTime desc',
        MaxResultCount: String(pageSize),
        SkipCount: String(skipCount),
      });
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-testimonies?${params.toString()}`;
      const res = await fetch(url, {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ApiResponse = await res.json();
      setTotalCount(data.totalCount);
      setItems((prev) => (append ? [...prev, ...data.items] : data.items));
      if (!append && pageSize >= data.totalCount) {
        setAllLoaded(true);
      } else if (!append) {
        setAllLoaded(false);
      }
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
    setAllLoaded(false);
    fetchVideos(language, 0, false);
  }, [language]);

  // When user starts searching/filtering, automatically load all videos
  useEffect(() => {
    const isFiltering = search.trim().length > 0 || churchFilter !== 'all';
    if (isFiltering && !allLoaded && !loadingAll && totalCount > 0) {
      setLoadingAll(true);
      fetchVideos(language, 0, false, totalCount).finally(() => {
        setLoadingAll(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, churchFilter, totalCount]);

  const churches = useMemo(() => {
    const map = new Map<string, string>();
    items.forEach((i) => {
      const churchName = getChurchName(i.churchName);
      const churchKey = getChurchKey(i.churchName);
      if (churchName && churchKey && !map.has(churchKey)) map.set(churchKey, churchName);
    });
    return Array.from(map.entries())
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([value, label]) => ({ value, label }));
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const churchName = getChurchName(i.churchName) ?? '';
      const churchKey = getChurchKey(i.churchName);
      if (churchFilter !== 'all' && churchKey !== churchFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        return (
          i.quote.toLowerCase().includes(s) ||
          i.user.username.toLowerCase().includes(s) ||
          churchName.toLowerCase().includes(s)
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
                     {churches.map((church) => (
                       <SelectItem key={church.value} value={church.value}>
                         {church.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {loadingAll && (
                <p className="text-sm text-center text-muted-foreground -mt-6 mb-6 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Alle getuigenissen worden geladen voor de zoekfunctie...
                </p>
              )}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filtered.map((t) => (
                    <TestimonyCard key={t.id} testimony={t} />
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
    </div>
  );
};

export default Testimonies;