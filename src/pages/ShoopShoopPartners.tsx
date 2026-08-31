import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Handshake, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';

interface ShoopPartner {
  name: string;
  url: string;
}

/** Alfabetisch op naam */
const SHOOP_PARTNERS: ShoopPartner[] = [
  { name: 'Baptize the Netherlands', url: 'https://baptizethenetherlands.com/' },
  { name: 'Ben van Oosterom', url: 'https://benvanoosterom.nl/' },
  { name: 'Cornerstone Ministries', url: 'https://cornerstone-ministries.com/' },
  { name: 'Crabby', url: 'https://crabby.nl/' },
  { name: 'De Genadeklap', url: 'https://degenadeklap.com/' },
  { name: 'Global Youth Ministry Kenya', url: 'https://globalyouthministrykenya.org/' },
  { name: 'JesusToday', url: 'https://jesustoday.app/' },
  { name: 'JesusToday Nederland', url: 'https://jesustoday.nl/' },
  { name: 'JesusToday South Africa', url: 'https://jesustoday.co.za/' },
  { name: 'Koffiekerk', url: 'https://koffiekerk.nl/' },
  { name: 'Shoop Shoop Marketing', url: 'https://shoopshoop.nl/' },
  { name: 'Stichting Leen', url: 'https://stichtingleen.nl/' },
  { name: 'Viralistic', url: 'https://viralistic.nl/' },
];

const domainOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const ShoopShoopPartners = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('Partners van Shoop Shoop Marketing')}</title>
        <meta
          name="description"
          content={t('Een overzicht van de projecten en organisaties waar Shoop Shoop Marketing mee samenwerkt.')}
        />
        <meta property="og:title" content={t('Partners van Shoop Shoop Marketing')} />
        <meta
          property="og:description"
          content={t('Een overzicht van de projecten en organisaties waar Shoop Shoop Marketing mee samenwerkt.')}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jesustoday.app/shoop-shoop-partners" />
        <link rel="canonical" href="https://jesustoday.app/shoop-shoop-partners" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-cream pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="inline-flex w-16 h-16 rounded-2xl bg-gold/15 items-center justify-center mb-6">
                  <Handshake className="w-8 h-8 text-gold" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-4">
                  {t('Partners van Shoop Shoop Marketing')}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('Deze website is gemaakt door Shoop Shoop Marketing. Hieronder vind je de projecten en organisaties waar zij mee samenwerken.')}
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {SHOOP_PARTNERS.map((partner, i) => (
                <ScrollReveal key={partner.url} delay={80 + i * 40}>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-4 rounded-2xl border border-anthracite/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold text-anthracite">{partner.name}</span>
                      <span className="block text-sm text-muted-foreground">{domainOf(partner.url)}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ShoopShoopPartners;
