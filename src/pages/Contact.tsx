import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { AskQuestionSection } from '@/components/sections/AskQuestionSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Mail, MessageCircle } from 'lucide-react';
import { SubmissionForm } from '@/components/forms/SubmissionForm';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact, JesusToday</title>
        <meta
          name="description"
          content="Neem contact op met JesusToday. Stel je vraag of deel je verhaal, we luisteren graag."
        />
        <meta property="og:title" content="Contact, JesusToday" />
        <meta property="og:description" content="Neem contact op met JesusToday. Stel je vraag of deel je verhaal." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jesustoday.app/contact" />

        <link rel="canonical" href="https://jesustoday.app/contact" />
        <meta name="twitter:title" content="Contact, JesusToday" />
        <meta name="twitter:description" content="Neem contact op met JesusToday." />
      </Helmet>
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6">
                  <MessageCircle className="w-4 h-4 text-gold" />
                  <span className="text-anthracite text-sm font-medium">Contact</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="text-4xl md:text-5xl font-bold text-anthracite mb-6">
                  Laten we <span className="text-gold">kennismaken</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Heb je een vraag, idee of wil je samenwerken? Stuur ons gerust een bericht, we reageren persoonlijk.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <a
                  href="mailto:info@jesustoday.nl"
                  className="inline-flex items-center gap-2 mt-8 text-gold font-semibold hover:gap-3 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  info@jesustoday.nl
                </a>
              </ScrollReveal>
            </div>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <ScrollReveal>
                <h2 className="text-2xl md:text-3xl font-bold text-anthracite text-center mb-8">Stuur ons een bericht</h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <SubmissionForm
                  type="contact"
                  formName="Contactformulier"
                  successTitle="Bericht verstuurd"
                  successText="Dankjewel, we reageren persoonlijk zodra het kan."
                />
              </ScrollReveal>
            </div>
          </div>
        </section>
        <AskQuestionSection />
        <Footer />
      </main>
    </>
  );
};

export default Contact;