import { useState } from 'react';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BRAND_VIDEO_ID } from '@/lib/brand-video';

interface Props {
  title: string;
  accent: string;
}

export const BrandVideoSection = ({ title, accent }: Props) => {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${BRAND_VIDEO_ID}/maxresdefault.jpg`);
  return (
    <section className="py-16 md:py-24 bg-cream w-full">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite text-center mb-8 md:mb-12">
          {t(title)} <span className="text-gold">{t(accent)}</span>
        </h2>
        <div className="max-w-6xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl bg-anthracite relative">
          {playing ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${BRAND_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="JesusToday"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={t('Bekijk de video')}
              className="group absolute inset-0 w-full h-full"
            >
              <img
                src={thumb}
                onError={() => setThumb(`https://i.ytimg.com/vi/${BRAND_VIDEO_ID}/hqdefault.jpg`)}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute inset-0 bg-anthracite/20 group-hover:bg-anthracite/10 transition-colors" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-9 h-9 md:w-11 md:h-11 text-anthracite fill-current ml-1" />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
