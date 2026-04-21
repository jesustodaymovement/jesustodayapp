import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';

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

const LANGUAGES = ['nl', 'en', 'de', 'fr', 'es'];

const TestimonyDetail = () => {
  const { vimeoId } = useParams<{ vimeoId: string }>();
  const [testimony, setTestimony] = useState<Testimony | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          const found = data.items.find((t) => t.vimeoUrl === vimeoId);
          if (found) {
            if (!cancelled) setTestimony(found);
            return;
          }
        }
        if (!cancelled) setError('Getuigenis niet gevonden.');
      } catch (e) {
        console.error(e);
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

  return (
    <div className="min-h-screen bg-cream">
      <Helmet>
        <title>
          {testimony
            ? `${testimony.user.username} — Getuigenis | Jesus Today`
            : 'Video Getuigenis | Jesus Today'}
        </title>
        <meta
          name="description"
          content={
            testimony
              ? `${testimony.user.username}: "${testimony.quote}"`
              : 'Bekijk een video getuigenis op Jesus Today.'
          }
        />
        <link rel="canonical" href={`/getuigenissen/${vimeoId}`} />
      </Helmet>

      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/getuigenissen"
              className="inline-flex items-center gap-2 text-anthracite hover:text-gold transition-colors mb-8 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Terug naar alle getuigenissen
            </Link>

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-12 h-12 text-gold animate-spin" />
              </div>
            ) : error || !testimony ? (
              <div className="text-center py-24">
                <p className="text-destructive mb-4">
                  {error ?? 'Getuigenis niet gevonden.'}
                </p>
                <Link to="/getuigenissen" className="text-gold underline">
                  Bekijk alle getuigenissen
                </Link>
              </div>
            ) : (
              <>
                <ScrollReveal>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-card bg-anthracite mb-8">
                    <iframe
                      src={`https://player.vimeo.com/video/${testimony.vimeoUrl}?autoplay=1`}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={`Getuigenis van ${testimony.user.username}`}
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                  <div className="bg-warm-white rounded-2xl shadow-card p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-anthracite mb-4">
                      {testimony.user.username}
                    </h1>
                    <blockquote className="text-xl md:text-2xl text-anthracite/90 italic border-l-4 border-gold pl-6 mb-6">
                      "{testimony.quote}"
                    </blockquote>
                    {testimony.churchName &&
                      testimony.churchName !== 'undefined' && (
                        <p className="text-gold font-semibold">
                          {testimony.churchName}
                        </p>
                      )}
                  </div>
                </ScrollReveal>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TestimonyDetail;