import { ScrollReveal } from '@/components/ScrollReveal';
import { useTranslation } from 'react-i18next';
import { Search, HelpCircle, Cloud, Heart } from 'lucide-react';

const points = [
  { icon: Cloud, text: 'Soms voel je een leegte die je niet kunt benoemen' },
  { icon: Search, text: 'Je verlangt naar meer betekenis, maar weet niet waar je moet beginnen' },
  { icon: HelpCircle, text: 'Je hebt vragen over geloof die je nog nooit hardop stelde' },
  { icon: Heart, text: 'Je bent nieuwsgierig wie Jezus echt is' },
];

export const DiscoverProblemSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-anthracite mb-8">
              {t('Misschien herken je dit?')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-lg md:text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t('Je bent niet de enige die deze vragen heeft. Veel mensen vóór jou begonnen precies waar jij nu staat.')}
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {points.map((point, index) => (
              <ScrollReveal key={index} delay={150 + index * 100}>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                    <point.icon className="w-6 h-6 text-gold" />
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">{t(point.text)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};