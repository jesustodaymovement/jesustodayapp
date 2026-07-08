import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AnbiStamp } from '@/components/AnbiStamp';
import { Heart, ShieldCheck, CreditCard, CheckCircle2 } from 'lucide-react';
import logo from '@/assets/jesus-today-logo.png';

const trustPoints = [
  'Veilig betalen via iDEAL, creditcard of PayPal',
  'Fiscaal aftrekbaar via onze ANBI-status',
  'Eenmalig of maandelijks, jij kiest',
];

const stats = [
  { value: '200+', label: 'persoonlijke verhalen op video' },
  { value: '10+', label: 'samenwerkingen, o.a. Opwekking en The Send' },
  { value: '10 mln', label: 'Nederlanders die we willen bereiken' },
];

const packages = [
  { amount: '€25', title: 'Honderd kaartjes met QR-code voor één ambassadeur' },
  { amount: '€250', title: 'Een verhaal volledig geproduceerd op video' },
  { amount: '€1.000', title: 'Eerste videografie-apparatuur voor een nieuw land' },
];

const DonorboxWidget = () => (
  <div className="flex justify-center">
    <iframe
      src="https://donorbox.org/embed/donatie-voor-jesus-today"
      name="donorbox"
      allow="payment"
      seamless
      frameBorder={0}
      scrolling="no"
      height="900px"
      width="100%"
      style={{ maxWidth: 500, minWidth: 250, maxHeight: 'none' }}
      title="Doneer aan JesusToday via Donorbox"
    />
  </div>
);

const Steun = () => {
  return (
    <>
      <Helmet>
        <title>Steun JesusToday, doneer aan een generatie vol hoop</title>
        <meta
          name="description"
          content="Doneer aan JesusToday en help persoonlijke verhalen over Jezus verspreiden. Veilig, eenmalig of maandelijks en fiscaal aftrekbaar via onze ANBI-status."
        />
        <meta property="og:title" content="Steun JesusToday, doneer vandaag" />
        <meta
          property="og:description"
          content="Doneer aan JesusToday en help persoonlijke verhalen over Jezus verspreiden. Veilig en fiscaal aftrekbaar via onze ANBI-status."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://storybrand-share-grace.lovable.app/steun" />
        <link rel="canonical" href="https://storybrand-share-grace.lovable.app/steun" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Steun JesusToday, doneer vandaag" />
        <meta name="twitter:description" content="Doneer aan JesusToday en help persoonlijke verhalen over Jezus verspreiden." />
        <script src="https://donorbox.org/widget.js" defer></script>
      </Helmet>

      {/* Slanke koptekst, minder afleiding voor e-mailverkeer */}
      <header className="absolute top-0 left-0 right-0 z-20 py-5">
        <div className="container mx-auto px-6 flex justify-center md:justify-start">
          <Link to="/" aria-label="Naar de homepage van JesusToday">
            <img src={logo} alt="JesusToday" className="h-9 w-auto" />
          </Link>
        </div>
      </header>

      <main>
        {/* Hero met donatie-widget */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-cream overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-gold/20 rounded-full blur-3xl" aria-hidden />
          <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-gold/15 rounded-full blur-3xl" aria-hidden />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              {/* Copy */}
              <div>
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6">
                    <Heart className="w-4 h-4 text-gold" />
                    <span className="text-anthracite text-sm font-medium">Doneer aan JesusToday</span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <h1 className="text-4xl md:text-5xl font-bold text-anthracite leading-tight mb-6">
                    Jouw gift laat verhalen <span className="text-gold">landen.</span>
                  </h1>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Help mee bouwen aan een beweging die een hele generatie bereikt. Met jouw
                    donatie landen persoonlijke verhalen over Jezus op straat, werk en school,
                    daar waar deze generatie zich beweegt.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={300}>
                  <ul className="space-y-3 mb-10">
                    {trustPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <span className="text-anthracite">{point}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
                <ScrollReveal delay={400}>
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((s) => (
                      <div key={s.label} className="rounded-2xl bg-white border border-anthracite/10 shadow-sm p-4 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-gold mb-1">{s.value}</div>
                        <p className="text-xs text-muted-foreground leading-snug">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

              {/* Widget */}
              <ScrollReveal delay={200}>
                <div className="rounded-3xl bg-white border border-anthracite/10 shadow-lg p-4 md:p-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <span className="text-anthracite text-sm font-medium">Veilig doneren via Donorbox</span>
                  </div>
                  <DonorboxWidget />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Wat jouw gift mogelijk maakt */}
        <section className="py-20 bg-anthracite">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-warm-white text-center mb-4">
                  Wat jouw gift <span className="text-gold">mogelijk maakt.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-warm-white/80 text-center max-w-2xl mx-auto mb-12">
                  Elke euro is gekoppeld aan een concrete uitkomst. Je weet precies waar je bijdrage landt.
                </p>
              </ScrollReveal>
              <div className="grid md:grid-cols-3 gap-6">
                {packages.map((p, i) => (
                  <ScrollReveal key={p.amount} delay={150 + i * 100}>
                    <div className="h-full p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10 hover:border-gold/40 transition-all">
                      <div className="text-4xl font-bold text-gold mb-3">{p.amount}</div>
                      <p className="text-warm-white/80 leading-relaxed">{p.title}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ANBI vertrouwen */}
        <section className="py-20 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <AnbiStamp size={72} rotate={-8} className="mx-auto mb-6" />
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-2xl md:text-3xl font-bold text-anthracite mb-4">
                  Transparant, betrouwbaar en <span className="text-gold">fiscaal aftrekbaar.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  JesusToday is een initiatief van Stichting Cornerstone Ministries, een door de
                  Belastingdienst erkende ANBI. Daardoor zijn je donaties onder voorwaarden
                  aftrekbaar van de inkomstenbelasting.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-anthracite">
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold" /> ANBI-stichting
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gold" /> iDEAL, creditcard &amp; PayPal
                  </span>
                  <Link to="/doneren" className="text-gold font-semibold hover:underline">
                    Lees meer over doneren
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Steun;
