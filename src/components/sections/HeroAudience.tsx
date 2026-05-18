import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAudience } from '@/contexts/AudienceContext';
import { Link } from 'react-router-dom';
import heroVideo from '@/assets/hero-banner.mp4';

export const HeroAudience = () => {
  const { t } = useTranslation();
  const { mode } = useAudience();

  const content =
    mode === 'share'
      ? {
          headline: t('Jouw verhaal kan iemands leven veranderen.'),
          accent: t('Deel het vandaag.'),
          sub: t('Je voelt het verlangen om te getuigen, maar het is spannend. Wij helpen je om jouw verhaal eenvoudig en veilig te delen, op een manier die bij jou past.'),
          primaryLabel: t('Upload jouw verhaal'),
          primaryIcon: Upload,
          secondaryLabel: t('Ontdek hoe het werkt'),
          secondaryHref: '#hoe-werkt-het',
        }
      : {
          headline: t('Echte verhalen van mensen zoals jij.'),
          accent: t('Ontdek wat geloof kan doen.'),
          sub: t('Misschien zoek je antwoorden, rust of richting. Luister naar mensen die hetzelfde voelden, en ontdek hoe een ontmoeting met Jezus hen veranderde.'),
          primaryLabel: t('Bekijk verhalen'),
          primaryIcon: Play,
          secondaryLabel: t('Stel je vraag'),
          secondaryHref: '#stel-je-vraag',
        };

  const PrimaryIcon = content.primaryIcon;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-anthracite pt-20">
      {/* Video Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 w-full h-full">
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-anthracite/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-anthracite/40 via-transparent to-anthracite" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div key={mode} className="space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-warm-white leading-tight">
              {content.headline}{' '}
              <span className="text-gold">{content.accent}</span>
            </h1>

            <p className="text-lg md:text-xl text-warm-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              {content.sub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
              {mode === 'share' ? (
                <Button asChild variant="hero" size="lg" className="min-w-[220px]">
                  <Link to="/upload">
                    <PrimaryIcon className="w-5 h-5" />
                    {content.primaryLabel}
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="hero" size="lg" className="min-w-[220px]">
                  <Link to="/verhalen-over-jezus">
                    <PrimaryIcon className="w-5 h-5" />
                    {content.primaryLabel}
                  </Link>
                </Button>
              )}
              <Button asChild variant="hero-outline" size="lg" className="gap-2">
                <a href={content.secondaryHref}>
                  <ArrowRight className="w-5 h-5" />
                  {content.secondaryLabel}
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-warm-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-gold animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};