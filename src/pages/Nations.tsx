import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Globe, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { NATIONS, nationDomain } from '@/lib/nations';

const Nations = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Nations, JesusToday per land</title>
        <meta
          name="description"
          content="Kies jouw land en ga naar de officiële JesusToday website van Nederland of Zuid-Afrika."
        />
        <link rel="canonical" href="https://jesustoday.app/nations" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-cream pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="inline-flex w-16 h-16 rounded-2xl bg-gold/15 items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-gold" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-4">
                  {t('Nations')}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('JesusToday groeit over landsgrenzen heen. Kies jouw land en ga naar de officiële JesusToday website daar.')}
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {NATIONS.map((nation, i) => (
                <ScrollReveal key={nation.code} delay={100 + i * 100}>
                  <a
                    href={nation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-4 rounded-2xl border border-anthracite/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <span className="text-3xl" aria-hidden="true">
                      {nation.flag}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold text-anthracite">
                        {t(nation.name)}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {nationDomain(nation.url)}
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={300}>
              <p className="mt-10 text-center text-sm text-muted-foreground">
                {t('Staat jouw land er nog niet bij? Neem contact met ons op, we denken graag mee.')}
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Nations;
