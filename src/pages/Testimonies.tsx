import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Play, Loader2, Search } from 'lucide-react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Input } from '@/components/ui/input';
import { fetchThumbnail, getChurchKey, getChurchName } from '@/lib/testimonies';
import { TOPICS, testimonyMatchesTopics } from '@/lib/topics';
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
      to={`/verhalen-over-jezus/${testimony.vimeoUrl}`}
      className="group relative rounded-2xl overflow-hidden bg-anthracite shadow-card hover:shadow-lg transition-all duration-300 text-left block"
    >
      <div className="relative aspect-[3/4] bg-anthracite-light">
        {thumb ? (
          <img
            src={thumb}
            alt={`Verhaal van ${testimony.user.username}`}
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
  const [globalTotal, setGlobalTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState('nl');
  const [search, setSearch] = useState('');
  const [churchFilter, setChurchFilter] = useState('all');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const fetchVideos = async (lang: string) => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      };
      const base = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-testimonies`;
      const probeParams = new URLSearchParams({
        LanguageCode: lang,
        Status: '50',
        Sorting: 'creationTime desc',
        MaxResultCount: '1',
        SkipCount: '0',
      });
      const probe = await fetch(`${base}?${probeParams.toString()}`, { headers });
      if (!probe.ok) throw new Error(`HTTP ${probe.status}`);
      const probeData: ApiResponse = await probe.json();
      const total = probeData.totalCount;
      setTotalCount(total);

      const fullParams = new URLSearchParams({
        LanguageCode: lang,
        Status: '50',
        Sorting: 'creationTime desc',
        MaxResultCount: String(Math.max(total, 1)),
        SkipCount: '0',
      });
      const res = await fetch(`${base}?${fullParams.toString()}`, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ApiResponse = await res.json();
      setItems(data.items);
    } catch (e) {
      console.error(e);
      setError('Er ging iets mis bij het ophalen van de verhalen.');
    } finally {
      setLoading(false);
    }
  };

  const fetchGlobalTotal = async () => {
    try {
      const headers = {
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      };
      const base = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-testimonies`;
      const totals = await Promise.all(
        LANGUAGES.map(async (l) => {
          const params = new URLSearchParams({
            LanguageCode: l.code,
            Status: '50',
            Sorting: 'creationTime desc',
            MaxResultCount: '1',
            SkipCount: '0',
          });
          const res = await fetch(`${base}?${params.toString()}`, { headers });
          if (!res.ok) return 0;
          const data: ApiResponse = await res.json();
          return data.totalCount ?? 0;
        })
      );
      setGlobalTotal(totals.reduce((a, b) => a + b, 0));
    } catch (e) {
      console.error('global total error', e);
    }
  };

  useEffect(() => {
    fetchVideos(language);
  }, [language]);

  useEffect(() => {
    fetchGlobalTotal();
  }, []);

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
      if (selectedTopics.length > 0) {
        const text = `${i.quote} ${i.user.username}`;
        if (!testimonyMatchesTopics(text, selectedTopics)) return false;
      }
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
  }, [items, churchFilter, search, selectedTopics]);

  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    TOPICS.forEach((t) => (counts[t.id] = 0));
    items.forEach((i) => {
      const text = `${i.quote} ${i.user.username}`.toLowerCase();
      TOPICS.forEach((t) => {
        if (t.keywords.some((k) => text.includes(k))) counts[t.id] += 1;
      });
    });
    return counts;
  }, [items]);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setChurchFilter('all');
    setSelectedTopics([]);
  };

  const hasActiveFilters =
    search.trim().length > 0 || churchFilter !== 'all' || selectedTopics.length > 0;

  return (
    <div className="min-h-screen bg-cream">
      <Helmet>
        <title>Verhalen op video, JesusToday</title>
        <meta
          name="description"
          content="Bekijk persoonlijke verhalen van mensen die hun ervaring met Jezus delen."
        />
        <meta property="og:title" content="Verhalen op video, JesusToday" />
        <meta
          property="og:description"
          content="Bekijk persoonlijke verhalen van mensen die hun ervaring met Jezus delen."
        />
        <meta property="og:url" content="https://storybrand-share-grace.lovable.app/verhalen-over-jezus" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Verhalen op video, JesusToday" />
        <meta name="twitter:description" content="Bekijk persoonlijke verhalen van mensen die hun ervaring met Jezus delen." />
      </Helmet>

      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-anthracite mb-4">
                Verhalen over <span className="text-gold">Jezus</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Echte verhalen van mensen die ontdekten wie Jezus voor hen is.
                {globalTotal > 0 && ` ${globalTotal} verhalen te bekijken.`}
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

              {/* Topic chips */}
              <div className="mb-6 p-4 bg-warm-white rounded-2xl shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-anthracite">Onderwerpen</p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs font-medium text-anthracite/70 hover:text-gold transition-colors underline-offset-2 hover:underline"
                    >
                      Wis filters
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 overflow-x-auto">
                  {TOPICS.map((topic) => {
                    const active = selectedTopics.includes(topic.id);
                    const count = topicCounts[topic.id] ?? 0;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => toggleTopic(topic.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                          active
                            ? 'bg-gold text-anthracite border-gold shadow-gold'
                            : 'bg-warm-white text-anthracite/80 border-anthracite/15 hover:border-gold hover:text-anthracite'
                        }`}
                      >
                        <span>{topic.label}</span>
                        <span
                          className={`text-xs ${
                            active ? 'text-anthracite/70' : 'text-anthracite/50'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
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
                  onClick={() => fetchVideos(language)}
                  className="text-gold underline"
                >
                  Opnieuw proberen
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24 text-muted-foreground">
                Geen verhalen gevonden met deze filters.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filtered.map((t) => (
                    <TestimonyCard key={t.id} testimony={t} />
                  ))}
                </div>
                <div className="mt-16 p-8 md:p-10 bg-warm-white rounded-2xl shadow-card text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-anthracite mb-3">
                    Inspireert dit jou om jouw verhaal te delen?
                  </h2>
                  <p className="text-anthracite/70 mb-6 max-w-xl mx-auto">
                    Net als deze mensen kan jouw verhaal anderen raken. Wij helpen je in 3 eenvoudige stappen.
                  </p>
                  <Link
                    to="/upload"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-anthracite rounded-full font-semibold shadow-gold hover:shadow-lg transition-all"
                  >
                    Upload jouw verhaal
                  </Link>
                </div>
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