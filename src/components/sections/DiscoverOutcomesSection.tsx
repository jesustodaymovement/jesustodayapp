import { ScrollReveal } from '@/components/ScrollReveal';
import { useTranslation } from 'react-i18next';
import { HeartHandshake, Sun, Compass, Sparkles, Anchor, Smile } from 'lucide-react';

const outcomes = [
  { icon: Sun, text: 'Vrede in plaats van onrust' },
  { icon: Compass, text: 'Richting in plaats van twijfel' },
  { icon: HeartHandshake, text: 'Vergeving en een nieuwe start' },
  { icon: Sparkles, text: 'Hoop voor wat komen gaat' },
  { icon: Anchor, text: 'Een fundament dat niet wankelt' },
  { icon: Smile, text: 'Vreugde die niet afhangt van omstandigheden' },
];

export const DiscoverOutcomesSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-anthracite mb-4">
              {t('Wat anderen')} <span className="text-gold">{t('ontdekten')}</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              {t('Mensen die ooit zochten zoals jij vonden iets dat hun leven veranderde.')}
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outcomes.map((point, index) => (
              <ScrollReveal key={index} delay={150 + index * 75}>
                <div className="flex items-center gap-4 p-5 rounded-xl bg-background border border-border/50 shadow-soft hover:shadow-card hover:border-gold/30 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                    <point.icon className="w-5 h-5 text-gold" />
                  </div>
                  <p className="text-foreground font-medium">{t(point.text)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};