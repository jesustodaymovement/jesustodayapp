import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MessageCircle } from 'lucide-react';

export const AskQuestionSection = () => {
  const { t } = useTranslation();

  useEffect(() => {
    if (document.getElementById('fillout-embed-script')) return;
    const script = document.createElement('script');
    script.id = 'fillout-embed-script';
    script.src = 'https://server.fillout.com/embed/v1/';
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
            <div
              style={{ width: '100%', height: '500px' }}
              data-fillout-id="mQpEP3ZHmtus"
              data-fillout-embed-type="standard"
              data-fillout-inherit-parameters
              data-fillout-dynamic-resize
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};