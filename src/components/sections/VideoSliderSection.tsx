import { ScrollReveal } from '@/components/ScrollReveal';
import { Play, Loader2 } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchThumbnail } from '@/lib/testimonies';

interface Testimony {
  id: string;
  quote: string;
  vimeoUrl: string;
  user: { id: string; username: string };
}

const VideoCard = ({ testimony }: { testimony: Testimony }) => {
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
    <Link
      to={`/getuigenissen/${testimony.vimeoUrl}`}
      className="group relative rounded-2xl overflow-hidden bg-anthracite shadow-card hover:shadow-lg transition-all duration-300 block"
    >
      <div className="relative aspect-[3/4]">
        {thumb ? (
          <img
            src={thumb}
            alt={`Getuigenis van ${testimony.user.username}`}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-anthracite-light">
            <Loader2 className="w-8 h-8 text-warm-white/50 animate-spin" />
          </div>
        )}

        <div className="absolute inset-0 bg-anthracite/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-gold">
            <Play className="w-8 h-8 text-anthracite ml-1" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-gold font-bold text-xl uppercase tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            {testimony.user.username}
          </p>
          <p className="text-gold/90 text-sm font-semibold line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            "{testimony.quote}"
          </p>
        </div>
      </div>
    </Link>
  );
};

export const VideoSliderSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const [videos, setVideos] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const headers = {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        };
        const params = new URLSearchParams({
          LanguageCode: 'nl',
          Status: '50',
          Sorting: 'creationTime desc',
          MaxResultCount: '12',
          SkipCount: '0',
        });
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-testimonies?${params.toString()}`,
          { headers }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setVideos(data.items ?? []);
      } catch (e) {
        console.error('VideoSlider fetch error', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-anthracite mb-4">
              Bekijk <span className="text-gold">getuigenissen</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Ontdek de verhalen van anderen die hun geloof delen
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-anthracite text-warm-white flex items-center justify-center shadow-lg hover:bg-gold hover:text-anthracite transition-all duration-300 hidden md:flex"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-anthracite text-warm-white flex items-center justify-center shadow-lg hover:bg-gold hover:text-anthracite transition-all duration-300 hidden md:flex"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Carousel */}
              <div className="overflow-hidden" ref={emblaRef}>
                {loading ? (
                  <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-10 h-10 text-gold animate-spin" />
                  </div>
                ) : (
                  <div className="flex gap-6">
                    {videos.map((video) => (
                      <div
                        key={video.id}
                        className="flex-[0_0_320px] md:flex-[0_0_400px] lg:flex-[0_0_450px] min-w-0"
                      >
                        <VideoCard testimony={video} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
