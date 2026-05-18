import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import {
  Heart,
  Video,
  QrCode,
  Users,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Mail,
  Phone,
  ExternalLink,
  Globe,
  Handshake,
  TrendingUp,
} from 'lucide-react';

const scrollToWidget = () => {
  document.getElementById('doneer-widget')?.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-cream overflow-hidden">
    <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-gold/20 rounded-full blur-3xl" aria-hidden />
    <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-gold/15 rounded-full blur-3xl" aria-hidden />
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-8">
            <Heart className="w-4 h-4 text-gold" />
            <span className="text-anthracite text-sm font-medium">
              Doneer aan JesusToday
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-anthracite leading-tight mb-6">
            Een verhaal <span className="text-gold">verandert alles.</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
            Help mee bouwen aan een beweging die een hele generatie bereikt. Jouw
            gift maakt het mogelijk dat persoonlijke verhalen op straat,
            werk en school landen, daar waar deze generatie zich beweegt.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" onClick={scrollToWidget}>
              <Heart className="w-5 h-5" />
              Doneer nu
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToWidget}>
              Word maandelijkse partner
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const problems = [
  'Een generatie zonder anker, op zoek naar licht, hoop en waarheid.',
  'Ze lopen uit zichzelf nooit een kerk binnen, de drempel is te hoog.',
  'Christenen willen hun verhaal delen, maar weten niet hoe. JesusToday slaat de brug.',
];

const ProblemSection = () => (
  <section className="py-24 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white text-center mb-4">
            Het <span className="text-gold">gat</span> dat we zien
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-warm-white/80 text-center max-w-2xl mx-auto mb-14">
            Nederland is het meest seculiere land van West-Europa, en die
            ontwikkeling versnelt.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <ScrollReveal key={i} delay={150 + i * 100}>
              <div className="h-full p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10 hover:border-gold/40 transition-all">
                <p className="text-warm-white/90 leading-relaxed">{p}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const GuideSection = () => (
  <section className="py-24 bg-cream">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-anthracite text-sm font-medium">
              JesusToday × Cornerstone Ministries
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-6">
            Een <span className="text-gold">ANBI-stichting</span> die Gods
            Koninkrijk zichtbaar maakt.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            JesusToday is een initiatief van Stichting Cornerstone Ministries, een
            beweging die mensen toerust en activeert om het Koninkrijk van God
            zichtbaar te maken in hun dagelijks leven. Jouw donatie loopt via deze
            ANBI-stichting en is fiscaal aftrekbaar.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { title: 'Evangelisatie', desc: 'Onder andere via JesusToday.' },
            { title: 'Gebed', desc: 'De motor van alles wat we doen.' },
            { title: 'Onderwijs en events', desc: 'Zoals Kingdom Business.' },
          ].map((pijler, i) => (
            <ScrollReveal key={pijler.title} delay={250 + i * 100}>
              <div className="h-full p-6 rounded-2xl bg-white border border-anthracite/10 shadow-sm">
                <h3 className="text-xl font-bold text-anthracite mb-2">
                  {pijler.title}
                </h3>
                <p className="text-muted-foreground">{pijler.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="p-6 rounded-2xl bg-anthracite/5 border border-anthracite/10">
            <p className="text-anthracite font-medium mb-2">
              Onze vijf kernwaarden, de 5G's:
            </p>
            <p className="text-muted-foreground">
              Gebed, Geloof, Gehoorzaamheid, Geven en Gedrag.
            </p>
            <a
              href="https://cornerstone-ministries.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold font-semibold mt-4 hover:gap-3 transition-all"
            >
              Lees meer over Cornerstone Ministries
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const stats = [
  { value: '200+', label: 'persoonlijke verhalen op video' },
  { value: '10+', label: 'samenwerkingen, o.a. Opwekking, The Send, New Wine, YWAM' },
  { value: '1', label: 'land actief (Zuid-Afrika)' },
  { value: '2', label: 'landen klaar voor opstart (India, Macedonië)' },
];

const ProofSection = () => (
  <section className="py-24 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white text-center mb-4">
            Het platform <span className="text-gold">draait.</span> De methode
            werkt.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-warm-white/80 text-center max-w-2xl mx-auto mb-14">
            Waar we nu staan, en waar jouw bijdrage op verder bouwt.
          </p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={150 + i * 80}>
              <div className="h-full p-6 rounded-2xl bg-warm-white/5 border border-warm-white/10 text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold mb-3">
                  {s.value}
                </div>
                <p className="text-warm-white/80 text-sm leading-relaxed">
                  {s.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const planSteps = [
  {
    icon: Video,
    nr: '01',
    title: 'Opnemen',
    desc: 'Een gelovige neemt zijn persoonlijke verhaal op via de JesusToday-app. Het verhaal komt op het platform.',
  },
  {
    icon: QrCode,
    nr: '02',
    title: 'Uitdelen',
    desc: 'Hij ontvangt visitekaartjes met een QR-code die rechtstreeks naar zijn eigen verhaal leidt.',
  },
  {
    icon: Users,
    nr: '03',
    title: 'Bereiken',
    desc: 'Op werk, op straat, na een gesprek deelt hij ze uit. De ontvanger scant in eigen tempo en wordt geraakt door iets echts.',
  },
];

const PlanSection = () => (
  <section className="py-24 bg-cream">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite text-center mb-4">
            Het <span className="text-gold">plan</span>, in drie stappen.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-14">
            Eenvoudig, schaalbaar, en bewezen.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {planSteps.map((step, i) => (
            <ScrollReveal key={step.nr} delay={150 + i * 120}>
              <div className="h-full flex flex-col p-8 rounded-2xl bg-white border border-anthracite/10 shadow-sm hover:border-gold/40 transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-gold" />
                  </div>
                  <span className="text-sm font-semibold text-gold">
                    {step.nr}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-anthracite mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ImpactScaleSection = () => (
  <section className="py-24 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white mb-6">
            Wat zou er gebeuren <span className="text-gold">als we dit samen doen?</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-warm-white/80 max-w-2xl mx-auto mb-14">
            Twee kaartjes per week, in het dagelijks leven, via iemand die ze
            kennen of net hebben ontmoet.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid sm:grid-cols-3 gap-6 items-center mb-10">
            <div className="p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                100.000
              </div>
              <p className="text-warm-white/80">ambassadeurs</p>
            </div>
            <div className="p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                × 100
              </div>
              <p className="text-warm-white/80">kaartjes per jaar</p>
            </div>
            <div className="p-8 rounded-2xl bg-gold/15 border border-gold/40">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                10.000.000
              </div>
              <p className="text-warm-white">
                Nederlanders bereikt met het evangelie
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="text-warm-white/70 max-w-2xl mx-auto">
            En we willen dit internationaal uitrollen.
          </p>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const WidgetSection = () => (
  <section id="doneer-widget" className="py-24 bg-cream scroll-mt-24">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span className="text-anthracite text-sm font-medium">
              Veilig doneren
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-4">
            Doneer in een paar <span className="text-gold">klikken.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-muted-foreground mb-10">
            Kies een bedrag, eenmalig of maandelijks. Betaal veilig via iDEAL,
            creditcard of PayPal.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
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
              style={{
                maxWidth: 500,
                minWidth: 250,
                maxHeight: 'none',
              }}
              title="Doneer aan JesusToday via Donorbox"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <p className="text-sm text-muted-foreground mt-8">
            Veilig via Donorbox. Donaties zijn fiscaal aftrekbaar via onze
            ANBI-status.
          </p>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const packages = [
  {
    amount: '€25',
    title: 'Honderd visitekaartjes met QR-code',
    desc: 'Rust één ambassadeur uit om zijn verhaal de wereld in te dragen.',
  },
  {
    amount: '€250',
    title: 'Een verhaal op video volledig geproduceerd',
    desc: 'Van opname tot publicatie op het platform.',
  },
  {
    amount: '€1.000',
    title: 'Eerste videografie-apparatuur voor een nieuw land',
    desc: 'Lokale opnames mogelijk maken in de eigen taal.',
  },
  {
    amount: '€8.000',
    title: 'Een compleet nieuw land opgestart',
    desc: 'Lokale coördinator, apparatuur, vertaling en eerste kaartjes-druk. Doel: 50 lokale verhaal-video\'s binnen 6 maanden.',
    highlight: true,
  },
];

const PackagesSection = () => (
  <section className="py-24 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white text-center mb-4">
            Wat jouw gift <span className="text-gold">mogelijk maakt.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-warm-white/80 text-center max-w-2xl mx-auto mb-14">
            Elke euro is gekoppeld aan een concrete uitkomst. Je weet precies
            waar je bijdrage landt.
          </p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-6">
          {packages.map((p, i) => (
            <ScrollReveal key={p.amount} delay={150 + i * 100}>
              <div
                className={`h-full p-8 rounded-2xl border transition-all ${
                  p.highlight
                    ? 'bg-gold/15 border-gold/50'
                    : 'bg-warm-white/5 border-warm-white/10 hover:border-gold/40'
                }`}
              >
                <div className="text-4xl font-bold text-gold mb-3">
                  {p.amount}
                </div>
                <h3 className="text-xl font-bold text-warm-white mb-2">
                  {p.title}
                </h3>
                <p className="text-warm-white/70 leading-relaxed">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={500}>
          <div className="text-center mt-12">
            <Button variant="hero" size="lg" onClick={scrollToWidget}>
              <Heart className="w-5 h-5" />
              Kies jouw bijdrage
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const ownershipPoints = [
  {
    icon: TrendingUp,
    title: 'Impact die verder reikt dan je bedrijf',
    desc: 'Als ondernemer wil je verschil maken op een schaal die past bij wat je hebt opgebouwd. JesusToday biedt die schaal.',
  },
  {
    icon: Handshake,
    title: 'Tastbaar en meetbaar',
    desc: 'Elke euro is gekoppeld aan een concrete uitkomst. Je ziet waar je bijdrage landt en wat er mee gebeurt.',
  },
];

const OwnershipSection = () => (
  <section className="py-24 bg-cream">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite text-center mb-4">
            Geen sponsorvraag.{' '}
            <span className="text-gold">Mede-eigenaarschap.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-14">
            Wie nu instapt, bouwt mee aan het fundament van een beweging die een
            generatie raakt.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6">
          {ownershipPoints.map((pt, i) => (
            <ScrollReveal key={pt.title} delay={150 + i * 100}>
              <div className="h-full p-8 rounded-2xl bg-white border border-anthracite/10 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mb-5">
                  <pt.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-anthracite mb-3">
                  {pt.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const AnbiSection = () => (
  <section className="py-24 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span className="text-warm-white text-sm font-medium">
              ANBI-stichting
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl md:text-4xl font-bold text-warm-white mb-4">
            Transparant, betrouwbaar,{' '}
            <span className="text-gold">fiscaal aftrekbaar.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-warm-white/80 leading-relaxed mb-10 max-w-2xl">
            JesusToday valt onder Stichting Cornerstone, een door de Belastingdienst
            erkende Algemeen Nut Beogende Instelling (ANBI). Dat betekent dat je
            donaties onder voorwaarden aftrekbaar zijn van de inkomstenbelasting.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          <ScrollReveal delay={300}>
            <div className="p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10">
              <h3 className="text-xl font-bold text-warm-white mb-4">
                Organisatiegegevens
              </h3>
              <dl className="space-y-3 text-warm-white/80">
                <div className="flex justify-between gap-4">
                  <dt className="text-warm-white/60">Naam</dt>
                  <dd className="text-right">Stichting Cornerstone</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-warm-white/60">KVK-nummer</dt>
                  <dd className="text-right">90789830</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-warm-white/60">RSIN</dt>
                  <dd className="text-right">863776668</dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10">
              <h3 className="text-xl font-bold text-warm-white mb-4">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+31653942196"
                    className="flex items-center gap-3 text-warm-white/80 hover:text-gold transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    06 53 94 21 96
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@cornerstone-ministries.com"
                    className="flex items-center gap-3 text-warm-white/80 hover:text-gold transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    info@cornerstone-ministries.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://cornerstone-ministries.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-warm-white/80 hover:text-gold transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    cornerstone-ministries.com
                  </a>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
);

const FinalCtaSection = () => (
  <section className="py-24 bg-cream relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/20 rounded-full blur-3xl" aria-hidden />
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-6">
            Verhalen verdienen het om{' '}
            <span className="text-gold">verteld te worden.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-muted-foreground mb-10">
            Doe je mee? Help mee bouwen aan een beweging die een hele generatie
            bereikt.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <Button variant="hero" size="xl" onClick={scrollToWidget}>
            <Heart className="w-5 h-5" />
            Doneer nu
          </Button>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const Doneren = () => {
  return (
    <>
      <Helmet>
        <title>Doneren aan JesusToday, Stichting Cornerstone Ministries</title>
        <meta
          name="description"
          content="Help mee bouwen aan een beweging die een hele generatie bereikt. Doneer veilig en fiscaal aftrekbaar via Stichting Cornerstone Ministries (ANBI)."
        />
        <link
          rel="canonical"
          href="https://storybrand-share-grace.lovable.app/doneren"
        />
        <meta
          property="og:title"
          content="Doneren aan JesusToday, Stichting Cornerstone Ministries"
        />
        <meta
          property="og:description"
          content="Help mee bouwen aan een beweging die een hele generatie bereikt."
        />
        <meta
          property="og:url"
          content="https://storybrand-share-grace.lovable.app/doneren"
        />
        <meta property="og:type" content="website" />
        <script src="https://donorbox.org/widget.js" defer></script>
      </Helmet>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <GuideSection />
        <ProofSection />
        <PlanSection />
        <ImpactScaleSection />
        <WidgetSection />
        <PackagesSection />
        <OwnershipSection />
        <AnbiSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
};

export default Doneren;