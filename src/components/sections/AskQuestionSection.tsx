import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SubmissionForm } from '@/components/forms/SubmissionForm';
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
            <SubmissionForm
              type="vraag"
              formName="Vraag over geloof"
              submitLabel="Stel je vraag"
              successTitle="Je vraag is verstuurd"
              successText="Dankjewel, iemand van ons team neemt persoonlijk contact met je op."
              confirmationIntro="We hebben je vraag ontvangen. Iemand van ons team leest hem persoonlijk en neemt zo snel als het kan contact met je op."
              fields={[
                { name: 'name', label: 'Je naam', required: true, placeholder: 'Voornaam' },
                { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'jij@voorbeeld.nl' },
                {
                  name: 'message',
                  label: 'Je vraag',
                  type: 'textarea',
                  required: true,
                  rows: 5,
                  placeholder: 'Stel hier je vraag, hoe groot of klein ook...',
                },
              ]}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};