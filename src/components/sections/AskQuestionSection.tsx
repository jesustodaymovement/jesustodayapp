import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MessageCircle } from 'lucide-react';

export const AskQuestionSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-cream" id="stel-je-vraag">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex w-16 h-16 rounded-2xl bg-gold/15 items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 text-gold" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-4">
                {t('Heb je een vraag over geloof?')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('We luisteren. Stel je vraag, hoe groot of klein ook, en iemand neemt persoonlijk contact met je op.')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <iframe
              src="https://forms.fillout.com/t/mQpEP3ZHmtus"
              style={{ width: '100%', height: 650, border: 0, borderRadius: 16 }}
              loading="lazy"
              title={t('Heb je een vraag over geloof?')}
            />

          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};