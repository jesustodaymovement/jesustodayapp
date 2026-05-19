import { ScrollReveal } from '@/components/ScrollReveal';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Church, QrCode, Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: HeartHandshake,
    title: 'Samen evangelisatie activeren',
    desc: 'We helpen jullie gemeente om getuigen weer een natuurlijke plek te geven.',
  },
  {
    icon: QrCode,
    title: 'QR-kaartjes in eigen huisstijl',
    desc: 'Persoonlijke kaartjes en codes om verhalen makkelijk te delen.',
  },
  {
    icon: Sparkles,
    title: 'Spreken over evangelisatie',
    desc: 'Optioneel komen we langs voor een dienst, jongerenavond of leiderschapsteam.',
  },
];

export const ChurchSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-anthracite">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
                  <Church className="w-4 h-4 text-gold" />
                  <span className="text-gold text-sm font-medium">{t('Voor kerken en organisaties')}</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <h2 className="text-3xl md:text-4xl font-bold text-warm-white mb-6">
                  {t('JesusToday in')} <span className="text-gold">{t('jouw kerk')}</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="text-warm-white/80 leading-relaxed mb-8">
                  {t('We organiseren opnamedagen in kerken en organisaties om mensen te helpen hun verhaal vast te leggen en te delen. Een praktische manier om verhalen een vaste plek te geven binnen jullie kerk of organisatie.')}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <Button asChild variant="hero" size="lg" className="gap-2">
                  <Link to="/partners">
                    {t('Ontdek partnership')}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </ScrollReveal>
            </div>

            {/* Visual */}
            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-gold/20 rounded-3xl blur-2xl" />
                <div className="relative p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10 backdrop-blur-sm">
                  <div className="space-y-6">
                    {benefits.map((b) => (
                      <div key={b.title} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                          <b.icon className="w-6 h-6 text-gold" />
                        </div>
                        <div>
                          <p className="text-warm-white font-semibold">{t(b.title)}</p>
                          <p className="text-warm-white/60 text-sm leading-relaxed">{t(b.desc)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
