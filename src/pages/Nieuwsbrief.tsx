import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { NewsletterForm } from '@/components/NewsletterForm';
import { Mail, Sparkles, Heart, Video } from 'lucide-react';

const benefits = [
  {
    icon: Video,
    title: 'Nieuwe getuigenissen',
    desc: 'Ontvang als eerste de nieuwste persoonlijke verhalen over Jezus, rechtstreeks in je inbox.',
  },
  {
    icon: Sparkles,
    title: 'Updates & bemoediging',
    desc: 'Verhalen uit het veld, events en bemoediging om je geloof aan te wakkeren.',
  },
  {
    icon: Heart,
    title: 'Onderdeel van de beweging',
    desc: 'Blijf verbonden met JesusToday en zie wat God doet door gewone mensen.',
  },
];

const Nieuwsbrief = () => {
  return (
    <>
      <Helmet>
        <title>Aanmelden nieuwsbrief, JesusToday</title>
        <meta
          name="description"
          content="Meld je aan voor de JesusToday nieuwsbrief en ontvang nieuwe getuigenissen, updates en bemoediging in je inbox."
        />
        <meta property="og:title" content="Aanmelden nieuwsbrief, JesusToday" />
        <meta
          property="og:description"
          content="Blijf op de hoogte van nieuwe verhalen over Jezus en updates van de JesusToday-beweging."
        />
        <link rel="canonical" href="https://jesustoday.app/aanmelden-nieuwsbrief" />
      </Helmet>
      <Header />
      <main>
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-cream overflow-hidden">
          <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-gold/20 rounded-full blur-3xl" aria-hidden />
          <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-gold/15 rounded-full blur-3xl" aria-hidden />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fad150]/20 border border-[#fad150]/40 mb-8">
                  <Mail className="w-4 h-4 text-anthracite" />
                  <span className="text-anthracite text-sm font-medium">Nieuwsbrief</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-anthracite leading-tight mb-6">
                  Blijf op de hoogte van <span className="text-gold">JesusToday.</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
                  Ontvang nieuwe getuigenissen, updates en bemoediging rechtstreeks in je inbox.
                  Geen spam, alleen verhalen die je raken.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-anthracite">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto p-8 md:p-10 rounded-2xl bg-warm-white/5 border border-warm-white/10">
              <h2 className="text-warm-white text-2xl md:text-3xl font-bold mb-3 text-center">
                Meld je aan
              </h2>
              <p className="text-warm-white/70 text-center mb-8">
                Vul je gegevens in en je staat op de lijst.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((b, i) => (
                  <ScrollReveal key={b.title} delay={100 + i * 100}>
                    <div className="h-full p-8 rounded-2xl bg-white border border-anthracite/10 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-[#fad150]/20 flex items-center justify-center mb-5">
                        <b.icon className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="text-xl font-bold text-anthracite mb-3">{b.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Nieuwsbrief;