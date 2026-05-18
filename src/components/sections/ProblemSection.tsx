import { ScrollReveal } from '@/components/ScrollReveal';
import { useTranslation } from 'react-i18next';
import { MessageCircle, ShieldX, HelpCircle, Users } from 'lucide-react';

const painPoints = [
  { icon: HelpCircle, text: 'Je wilt wel delen, maar weet niet hoe je moet beginnen' },
  { icon: ShieldX, text: 'Je bent bang dat het ongemakkelijk of "cringe" wordt' },
  { icon: MessageCircle, text: 'Je vraagt je af of jouw verhaal wel bijzonder genoeg is' },
  { icon: Users, text: 'Je wilt geen discussies of ongemakkelijke gesprekken' },
];

export const ProblemSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-anthracite mb-8">
              {t('Herken je dit?')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-lg md:text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t('Je voelt het verlangen om over Jezus te vertellen. Maar tegelijk merk je dat het lastig is om daadwerkelijk die stap te zetten.')}
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {painPoints.map((point, index) => (
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

          <ScrollReveal delay={550}>
            <div className="text-center p-8 rounded-2xl bg-anthracite text-warm-white">
              <p className="text-lg md:text-xl font-medium leading-relaxed">
                {t('Je bent niet zwak. Je bent niet de enige.')}<br />
                <span className="text-gold">{t('Getuigen is spannend, en dat begrijpen we.')}</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
