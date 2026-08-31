import { ScrollReveal } from '@/components/ScrollReveal';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TransformationSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-anthracite mb-16">
              {t('Jouw')} <span className="text-gold">{t('transformatie')}</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-[1fr,auto,1fr] gap-8 items-center">
            {/* From */}
            <ScrollReveal delay={100}>
              <div className="p-8 rounded-2xl bg-background border border-border/50 shadow-soft h-full">
                <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-4">
                  {t('Van')}
                </span>
                <p className="text-foreground leading-relaxed">
                  {t('Iemand die zijn geloof vaak voor zich houdt uit angst en onzekerheid.')}
                </p>
              </div>
            </ScrollReveal>

            {/* Arrow */}
            <ScrollReveal delay={200}>
              <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gold shadow-gold">
                <ArrowRight className="w-8 h-8 text-anthracite" />
              </div>
              <div className="flex md:hidden items-center justify-center py-4">
                <div className="w-12 h-12 rounded-full bg-gold shadow-gold flex items-center justify-center rotate-90">
                  <ArrowRight className="w-6 h-6 text-anthracite" />
                </div>
              </div>
            </ScrollReveal>

            {/* To */}
            <ScrollReveal delay={300}>
              <div className="p-8 rounded-2xl bg-anthracite text-warm-white h-full border border-gold/20">
                <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold text-sm font-medium mb-4">
                  {t('Naar')}
                </span>
                <p className="text-warm-white/90 leading-relaxed">
                  {t('Een')} <span className="text-gold font-semibold">{t('vrijmoedige getuige')}</span> {t('die deelt vanuit vertrouwen in wie hij of zij is in Jezus — en ziet dat God het gebruikt om levens te veranderen.')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
