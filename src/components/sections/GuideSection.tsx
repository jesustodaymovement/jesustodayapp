import { ScrollReveal } from '@/components/ScrollReveal';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { BRAND_VIDEO_ID } from '@/lib/brand-video';

export const GuideSection = () => {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${BRAND_VIDEO_ID}/maxresdefault.jpg`);
  return (
    <section className="py-24 bg-anthracite">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-warm-white mb-16">
              {t('Verhalen die')} <span className="text-gold">{t('levens veranderen')}</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Visual Left */}
            <ScrollReveal delay={100}>
              <div className="relative w-full rounded-2xl overflow-hidden aspect-video bg-anthracite-light shadow-card">
                {playing ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${BRAND_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title="JesusToday"
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <button type="button" onClick={() => setPlaying(true)} aria-label={t('Bekijk de video')} className="group absolute inset-0 w-full h-full">
                    <img src={thumb} onError={() => setThumb(`https://i.ytimg.com/vi/${BRAND_VIDEO_ID}/hqdefault.jpg`)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-anthracite fill-current ml-1" />
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </ScrollReveal>

            {/* Content Right */}
            <ScrollReveal delay={200}>
              <div className="space-y-6">
                <p className="text-lg text-warm-white/80 leading-relaxed">
                  {t('We begrijpen hoe spannend het kan voelen om je geloof te delen en hoe moeilijk het soms is om de juiste woorden te vinden.')}
                </p>
                
                <p className="text-lg text-warm-white/80 leading-relaxed">
                  {t('JesusToday is opgezet door mensen die zelf door het verhaal van anderen geraakt en veranderd zijn. Wij weten hoe krachtig één verhaal kan zijn.')}
                </p>

                <p className="text-lg text-warm-white/80 leading-relaxed">
                  {t('We hebben al honderden christenen geholpen om hun verhaal eenvoudig, persoonlijk en impactvol te delen, in samenwerking met kerken en christelijke initiatieven die dit proces ondersteunen.')}
                </p>

                <div className="pt-4">
                  <Button asChild variant="cta-light" size="lg">
                    <Link to="/upload">
                      <Upload className="w-5 h-5" />
                      {t('Upload jouw verhaal')}
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
