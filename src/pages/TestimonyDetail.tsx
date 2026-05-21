import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  ChevronRight,
  Loader2,
  MessageCircle,
  MessagesSquare,
  Mail,
  MapPin,
  PlayCircle,
  Users,
} from 'lucide-react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { fetchThumbnail, getChurchName } from '@/lib/testimonies';

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

interface CommentDraft {
  name: string;
  email: string;
  message: string;
}

interface CommentItem {
  id: string;
  name: string;
  message: string;
  createdAtLabel: string;
}

interface RelatedVideoCardProps {
  video: Testimony;
}

const LANGUAGES = ['nl', 'en', 'de', 'fr', 'es'];
const DEFAULT_COMMENTS: CommentItem[] = [
  {
    id: 'welcome-1',
    name: 'JesusToday team',
    message:
      'Welke gedachte of vraag blijft bij je hangen na deze getuigenis? Deel het gerust hieronder.',
    createdAtLabel: 'Zojuist',
  },
];

const recommendationTitle = (testimony: Testimony) =>
  testimony.user.username || testimony.churchName || 'Verhaal';

const buildMailTo = (subject: string, body: string) =>
  `mailto:info@jesustoday.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const RelatedVideoCard = ({ video }: RelatedVideoCardProps) => {
  const [thumb, setThumb] = useState<string | null>(null);
  const churchName = getChurchName(video.churchName);

  useEffect(() => {
    let active = true;

    fetchThumbnail(video.vimeoUrl).then((url) => {
      if (active) setThumb(url);
    });

    return () => {
      active = false;
    };
  }, [video.vimeoUrl]);

  return (
    <Link
      to={`/verhalen-over-jezus/${video.vimeoUrl}`}
      className="group block overflow-hidden rounded-2xl bg-anthracite shadow-card"
    >
      <div className="relative aspect-[3/4] bg-anthracite-light">
        {thumb ? (
          <img
            src={thumb}
            alt={`Verhaal van ${recommendationTitle(video)}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="w-8 h-8 text-warm-white/50 animate-spin" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-lg font-semibold text-warm-white line-clamp-1">
            {recommendationTitle(video)}
          </p>
          <p className="mt-1 text-sm text-warm-white/80 line-clamp-2">"{video.quote}"</p>
          {churchName && (
            <p className="mt-2 text-xs font-medium text-gold line-clamp-1">{churchName}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

const TestimonyDetail = () => {
  const { vimeoId } = useParams<{ vimeoId: string }>();
  const [testimony, setTestimony] = useState<Testimony | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState<CommentDraft>({
    name: '',
    email: '',
    message: '',
  });
  const [comments, setComments] = useState<CommentItem[]>(DEFAULT_COMMENTS);

  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://server.fillout.com/embed/v1/"]'
    );
    if (existing) return;
    const script = document.createElement('script');
    script.src = 'https://server.fillout.com/embed/v1/';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!vimeoId) return;
    let cancelled = false;

    const findTestimony = async () => {
      setLoading(true);
      setError(null);
      try {
        for (const lang of LANGUAGES) {
          const params = new URLSearchParams({
            LanguageCode: lang,
            Status: '50',
            Sorting: 'creationTime desc',
            MaxResultCount: '500',
            SkipCount: '0',
          });
          const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-testimonies?${params.toString()}`;
          const res = await fetch(url, {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
          });

          if (!res.ok) continue;

          const data: ApiResponse = await res.json();
          const found = data.items.find((item) => item.vimeoUrl === vimeoId);

          if (found) {
            if (!cancelled) {
              setTestimony(found);
              setRelatedVideos(
                data.items
                  .filter((item) => item.vimeoUrl !== vimeoId)
                  .slice(0, 4)
              );
              setComments(DEFAULT_COMMENTS);
            }
            return;
          }
        }

        if (!cancelled) setError('Verhaal niet gevonden.');
      } catch (fetchError) {
        console.error(fetchError);
        if (!cancelled) setError('Er ging iets mis bij het laden.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    findTestimony();

    return () => {
      cancelled = true;
    };
  }, [vimeoId]);

  const fullName = useMemo(() => {
    if (!testimony) return '';
    return testimony.user.username.trim();
  }, [testimony]);

  const firstName = useMemo(() => fullName.split(/\s+/)[0] || fullName, [fullName]);

  const churchName = useMemo(
    () => getChurchName(testimony?.churchName),
    [testimony?.churchName]
  );

  const questionLink = testimony
    ? buildMailTo(
        `Vraag over verhaal van ${fullName}`,
        `Hoi JesusToday,%0D%0A%0D%0AIk heb een vraag na het zien van de video van ${fullName}:`
      )
    : '#';

  const openChat = (event: React.MouseEvent) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('jt:open-chat'));
  };

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = commentDraft.name.trim();
    const email = commentDraft.email.trim();
    const message = commentDraft.message.trim();

    if (!name || !email || !message) return;

    setComments((current) => [
      ...current,
      {
        id: `${Date.now()}`,
        name,
        message,
        createdAtLabel: 'Net geplaatst',
      },
    ]);
    setCommentDraft({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-cream">
      <Helmet>
        <title>
          {testimony
            ? `${fullName}, getuigenis op video | JesusToday`
            : 'Getuigenis op video | JesusToday'}
        </title>
        <meta
          name="description"
          content={
            testimony
              ? `${fullName} deelt een persoonlijke getuigenis over Jezus. Bekijk de video en ontdek je volgende stap.`
              : 'Bekijk een getuigenis op video bij JesusToday.'
          }
        />
        {testimony && (
          <meta
            property="og:title"
            content={`${fullName}, getuigenis op video | JesusToday`}
          />
        )}
        {testimony && (
          <meta
            property="og:description"
            content={`${fullName} deelt een persoonlijke getuigenis over Jezus. Bekijk de video en ontdek je volgende stap.`}
          />
        )}
        <meta property="og:url" content={`https://storybrand-share-grace.lovable.app/verhalen-over-jezus/${vimeoId}`} />
        <link rel="canonical" href={`https://storybrand-share-grace.lovable.app/verhalen-over-jezus/${vimeoId}`} />
        <meta property="og:type" content="video.other" />
        {testimony && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://storybrand-share-grace.lovable.app/" },
                { "@type": "ListItem", position: 2, name: "Verhalen over Jezus", item: "https://storybrand-share-grace.lovable.app/verhalen-over-jezus" },
                { "@type": "ListItem", position: 3, name: fullName, item: `https://storybrand-share-grace.lovable.app/verhalen-over-jezus/${vimeoId}` },
              ],
            })}
          </script>
        )}
        {testimony && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: fullName,
              description: testimony.quote || `${fullName} deelt een persoonlijke getuigenis over Jezus.`,
              embedUrl: `https://player.vimeo.com/video/${testimony.vimeoUrl}`,
              contentUrl: `https://vimeo.com/${testimony.vimeoUrl}`,
              uploadDate: new Date().toISOString().split('T')[0],
            })}
          </script>
        )}
      </Helmet>

      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <nav aria-label="Kruimelpad" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-anthracite/70">
                <li>
                  <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                </li>
                <li aria-hidden className="text-anthracite/30">›</li>
                <li>
                  <Link to="/verhalen-over-jezus" className="hover:text-gold transition-colors">Verhalen over Jezus</Link>
                </li>
                {testimony && (
                  <>
                    <li aria-hidden className="text-anthracite/30">›</li>
                    <li className="text-anthracite font-medium truncate max-w-[60vw]" aria-current="page">{fullName}</li>
                  </>
                )}
              </ol>
            </nav>
            <Link
              to="/verhalen-over-jezus"
              className="inline-flex items-center gap-2 text-anthracite hover:text-gold transition-colors mb-8 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Bekijk alle verhalen
            </Link>

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-12 h-12 text-gold animate-spin" />
              </div>
            ) : error || !testimony ? (
              <div className="text-center py-24">
                <p className="text-destructive mb-4">{error ?? 'Verhaal niet gevonden.'}</p>
                <Link to="/verhalen-over-jezus" className="text-gold underline">
                  Bekijk alle verhalen
                </Link>
              </div>
            ) : (
              <div className="space-y-12">
                <section className="grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)] items-start">
                  <ScrollReveal>
                    <div className="space-y-6">
                      <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-card bg-anthracite">
                        <iframe
                          src={`https://player.vimeo.com/video/${testimony.vimeoUrl}?autoplay=1`}
                          className="w-full h-full"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          title={`Verhaal van ${fullName}`}
                        />
                      </div>

                      <div className="bg-warm-white rounded-2xl shadow-card p-8 space-y-5">
                        <div className="space-y-3">
                          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
                            Getuigenis op video
                          </p>
                          <h1 className="text-3xl md:text-5xl font-bold text-anthracite">
                            {fullName}
                          </h1>
                          <blockquote className="text-xl md:text-2xl text-anthracite/90 italic border-l-4 border-gold pl-6">
                            "{testimony.quote}"
                          </blockquote>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm">
                          {churchName && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-anthracite">
                              <MapPin className="w-4 h-4 text-gold" />
                              {churchName}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-anthracite uppercase">
                            <PlayCircle className="w-4 h-4 text-gold" />
                            {testimony.languageCode}
                          </span>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 items-stretch">
                          <a href="#chat" onClick={openChat} className="h-full">
                            <Button variant="hero" className="w-full h-full justify-between gap-2 px-4 text-sm whitespace-normal text-left min-h-11 py-3 leading-tight">
                              <span className="flex-1">Doorpraten over het geloof</span>
                              <ChevronRight className="w-4 h-4 shrink-0" />
                            </Button>
                          </a>
                          <a href={questionLink} className="h-full">
                            <Button variant="outline" className="w-full h-full justify-between gap-2 px-4 text-sm whitespace-normal text-left min-h-11 py-3 leading-tight">
                              <span className="flex-1">Stel een vraag aan JesusToday</span>
                              <ChevronRight className="w-4 h-4 shrink-0" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={100}>
                    <aside className="bg-anthracite rounded-2xl shadow-card p-8 space-y-6 text-warm-white">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-gold mb-3">
                          Zet een volgende stap
                        </p>
                        <h2 className="text-2xl font-bold mb-3">
                          Wat past bij jou?
                        </h2>
                        <p className="text-warm-white/75 leading-relaxed">
                          Geraakt door dit verhaal? Hieronder vind je twee laagdrempelige manieren om verder te ontdekken wie Jezus voor jou kan zijn.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <a
                          href="https://alphanederland.org"
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-xl bg-warm-white/10 p-5 hover:bg-warm-white/15 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-gold/20 p-3">
                              <Users className="w-5 h-5 text-gold" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">Leer meer over het geloof</h3>
                              <p className="text-warm-white/70 text-sm mt-1">
                                Verken samen met anderen wat geloof betekent, op een open en laagdrempelige manier.
                              </p>
                            </div>
                          </div>
                        </a>

                        <a
                          href={questionLink}
                          className="block rounded-xl bg-warm-white/10 p-5 hover:bg-warm-white/15 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-gold/20 p-3">
                              <MessagesSquare className="w-5 h-5 text-gold" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">Stel je vraag aan ons</h3>
                              <p className="text-warm-white/70 text-sm mt-1">
                                Deel waar je mee zit, wij denken met je mee en helpen je verder.
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </aside>
                  </ScrollReveal>
                </section>

                <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] items-start">
                  <ScrollReveal>
                    <div className="bg-warm-white rounded-2xl shadow-card p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="rounded-lg bg-gold/15 p-3">
                          <MessageCircle className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold text-anthracite">Reacties op deze getuigenis</h2>
                          <p className="text-muted-foreground">
                            Laat de persoon uit de video weten wat dit verhaal bij je oproept.
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleCommentSubmit} className="grid gap-4 mb-8">
                        <Input
                          value={commentDraft.name}
                          onChange={(event) =>
                            setCommentDraft((current) => ({ ...current, name: event.target.value }))
                          }
                          placeholder="Jouw naam"
                          maxLength={80}
                        />
                        <Input
                          type="email"
                          value={commentDraft.email}
                          onChange={(event) =>
                            setCommentDraft((current) => ({ ...current, email: event.target.value }))
                          }
                          placeholder="Jouw e-mailadres"
                          maxLength={120}
                        />
                        <Textarea
                          value={commentDraft.message}
                          onChange={(event) =>
                            setCommentDraft((current) => ({ ...current, message: event.target.value }))
                          }
                          placeholder="Schrijf hier je reactie..."
                          maxLength={500}
                          className="min-h-[140px]"
                        />
                        <div>
                          <Button type="submit" variant="hero">
                            Plaats reactie
                          </Button>
                        </div>
                      </form>

                      <div className="space-y-4">
                        {comments.map((comment) => (
                          <div key={comment.id} className="rounded-xl border border-border bg-cream p-5">
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <p className="font-semibold text-anthracite">{comment.name}</p>
                              <span className="text-sm text-muted-foreground">{comment.createdAtLabel}</span>
                            </div>
                            <p className="text-anthracite/80 leading-relaxed">{comment.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={100}>
                    <div className="space-y-6">
                      <div className="bg-warm-white rounded-2xl shadow-card p-8">
                        <h2 className="text-2xl font-bold text-anthracite mb-3">Vragen of contact?</h2>
                        <p className="text-muted-foreground mb-6">
                          Kies wat het beste aansluit op wat jij nu nodig hebt.
                        </p>
                        <div className="space-y-3">
                          <a href="#chat" onClick={openChat} className="block rounded-xl border border-border p-5 hover:border-gold transition-colors">
                            <p className="font-semibold text-anthracite mb-1">Doorpraten over het geloof</p>
                            <p className="text-sm text-muted-foreground">Open de chat 'Vraag over God?' en stel je vraag direct.</p>
                          </a>
                          <a href={questionLink} className="block rounded-xl border border-border p-5 hover:border-gold transition-colors">
                            <p className="font-semibold text-anthracite mb-1">Stel een vraag aan JesusToday</p>
                            <p className="text-sm text-muted-foreground">Voor geloofsvragen, twijfel of een volgende stap.</p>
                          </a>
                        </div>
                      </div>

                      <div className="bg-warm-white rounded-2xl shadow-card p-8">
                        <h2 className="text-2xl font-bold text-anthracite mb-6">Andere getuigenissen</h2>
                        <div className="relative px-3 md:px-12">
                          <Carousel
                            opts={{ align: 'start', dragFree: true }}
                            className="w-full"
                          >
                            <CarouselContent>
                              {relatedVideos.map((video) => (
                                <CarouselItem
                                  key={video.id}
                                  className="basis-[78%] sm:basis-[42%] lg:basis-[34%] xl:basis-[30%]"
                                >
                                  <RelatedVideoCard video={video} />
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-0 top-1/2 h-10 w-10 -translate-y-1/2 border-border bg-background" />
                            <CarouselNext className="right-0 top-1/2 h-10 w-10 -translate-y-1/2 border-border bg-background" />
                          </Carousel>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </section>

                <section className="bg-warm-white rounded-2xl shadow-card p-6 md:p-8">
                  <div
                    style={{ width: '100%', minHeight: 500 }}
                    data-fillout-id="nRKLonnPqBus"
                    data-fillout-embed-type="standard"
                    data-fillout-inherit-parameters
                    data-fillout-dynamic-resize
                  />
                </section>

                <section className="bg-warm-white rounded-2xl shadow-card p-8 md:p-10">
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-8">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-gold mb-2">
                        Verder kijken
                      </p>
                      <h2 className="text-3xl font-bold text-anthracite">
                        Ontdek meer verhalen over Jezus
                      </h2>
                    </div>
                    <p className="text-muted-foreground max-w-2xl">
                      Blader door meer persoonlijke getuigenissen en laat je inspireren door wat anderen ontdekten.
                    </p>
                  </div>

                  <div className="relative px-3 md:px-12">
                    <Carousel opts={{ align: 'start', dragFree: true }} className="w-full">
                      <CarouselContent>
                        {relatedVideos.map((video) => (
                          <CarouselItem
                            key={`bottom-${video.id}`}
                            className="basis-[72%] sm:basis-[42%] lg:basis-[26%] xl:basis-[22%]"
                          >
                            <RelatedVideoCard video={video} />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-0 top-1/2 h-10 w-10 -translate-y-1/2 border-border bg-background" />
                      <CarouselNext className="right-0 top-1/2 h-10 w-10 -translate-y-1/2 border-border bg-background" />
                    </Carousel>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TestimonyDetail;
