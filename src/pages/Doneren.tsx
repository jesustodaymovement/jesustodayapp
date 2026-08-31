import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AnbiStamp } from '@/components/AnbiStamp';
import { DonorboxWidget } from '@/components/DonorboxWidget';
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

const Hero = () => {
  const { t } = useTranslation();
  return (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-cream overflow-hidden">
    <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-gold/20 rounded-full blur-3xl" aria-hidden />
    <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-gold/15 rounded-full blur-3xl" aria-hidden />
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-8">
            <Heart className="w-4 h-4 text-gold" />
            <span className="text-anthracite text-sm font-medium">
              {t('Doneer aan JesusToday')}
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-anthracite leading-tight mb-6">
            {t('Een verhaal')} <span className="text-gold">{t('verandert alles.')}</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
            {t('Help mee bouwen aan een beweging die een hele generatie bereikt. Jouw gift maakt het mogelijk dat persoonlijke verhalen op straat, werk en school landen, daar waar deze generatie zich beweegt.')}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" onClick={scrollToWidget}>
              <Heart className="w-5 h-5" />
              {t('Doneer nu')}
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToWidget}>
              {t('Word maandelijkse partner')}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
  );
};

const ProblemSection = () => {
  const { t } = useTranslation();
  const problems = [
    t('Een generatie zonder anker, op zoek naar licht, hoop en waarheid.'),
    t('Ze lopen uit zichzelf nooit een kerk binnen, de drempel is te hoog.'),
    t('Christenen willen hun verhaal delen, maar weten niet hoe. JesusToday slaat de brug.'),
  ];
  return (
  <section className="py-24 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white text-center mb-4">
            {t('Het')} <span className="text-gold">{t('gat')}</span> {t('dat we zien')}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-warm-white/80 text-center max-w-2xl mx-auto mb-14">
            {t('Nederland is het meest seculiere land van West-Europa, en die ontwikkeling versnelt.')}
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
};

const GuideSection = () => {
  const { t } = useTranslation();
  const pijlers = [
    { title: t('Evangelisatie'), desc: t('Onder andere via JesusToday.') },
    { title: t('Gebed'), desc: t('De motor van alles wat we doen.') },
    { title: t('Onderwijs en events'), desc: t('Zoals Kingdom Business.') },
  ];
  return (
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
            {t('Een')} <span className="text-gold">{t('ANBI-stichting')}</span> {t('die Gods Koninkrijk zichtbaar maakt.')}
            <AnbiStamp size={64} rotate={-8} className="ml-3 align-middle" />
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {t('JesusToday is een initiatief van Stichting Cornerstone Ministries, een beweging die mensen toerust en activeert om het Koninkrijk van God zichtbaar te maken in hun dagelijks leven. Jouw donatie loopt via deze ANBI-stichting en is fiscaal aftrekbaar.')}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {pijlers.map((pijler, i) => (
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
              {t("Onze vijf kernwaarden, de 5G's:")}
            </p>
            <p className="text-muted-foreground">
              {t('Gebed, Geloof, Gehoorzaamheid, Geven en Gedrag.')}
            </p>
            <a
              href="https://cornerstone-ministries.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold font-semibold mt-4 hover:gap-3 transition-all"
            >
              {t('Lees meer over Cornerstone Ministries')}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
  );
};

const ProofSection = () => {
  const { t } = useTranslation();
  const stats = [
    { value: '200+', label: t('persoonlijke verhalen op video') },
    { value: '10+', label: t('samenwerkingen, o.a. Opwekking, The Send, New Wine, YWAM') },
    { value: '1', label: t('land actief (Zuid-Afrika)') },
    { value: '2', label: t('landen klaar voor opstart (India, Macedonië)') },
  ];
  return (
  <section className="py-24 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white text-center mb-4">
            {t('Het platform')} <span className="text-gold">{t('draait.')}</span> {t('De methode werkt.')}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-warm-white/80 text-center max-w-2xl mx-auto mb-14">
            {t('Waar we nu staan, en waar jouw bijdrage op verder bouwt.')}
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
};

const PlanSection = () => {
  const { t } = useTranslation();
  const planSteps = [
    {
      icon: Video,
      nr: '01',
      title: t('Opnemen'),
      desc: t('Een gelovige neemt zijn persoonlijke verhaal op via de JesusToday-app. Het verhaal komt op het platform.'),
    },
    {
      icon: QrCode,
      nr: '02',
      title: t('Uitdelen'),
      desc: t('Hij ontvangt visitekaartjes met een QR-code die rechtstreeks naar zijn eigen verhaal leidt.'),
    },
    {
      icon: Users,
      nr: '03',
      title: t('Bereiken'),
      desc: t('Op werk, op straat, na een gesprek deelt hij ze uit. De ontvanger scant in eigen tempo en wordt geraakt door iets echts.'),
    },
  ];
  return (
  <section className="py-24 bg-cream">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite text-center mb-4">
            {t('Het')} <span className="text-gold">{t('plan')}</span>{t(', in drie stappen.')}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-14">
            {t('Eenvoudig, schaalbaar, en bewezen.')}
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
};

const ImpactScaleSection = () => {
  const { t } = useTranslation();
  return (
  <section className="py-24 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white mb-6">
            {t('Wat zou er gebeuren')} <span className="text-gold">{t('als we dit samen doen?')}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-warm-white/80 max-w-2xl mx-auto mb-14">
            {t('Twee kaartjes per week, in het dagelijks leven, via iemand die ze kennen of net hebben ontmoet.')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid sm:grid-cols-3 gap-6 items-center mb-10">
            <div className="p-6 lg:p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10">
              <div className="text-3xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-gold mb-2 break-words">
                100.000
              </div>
              <p className="text-warm-white/80">{t('ambassadeurs')}</p>
            </div>
            <div className="p-6 lg:p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10">
              <div className="text-3xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-gold mb-2 break-words">
                × 100
              </div>
              <p className="text-warm-white/80">{t('kaartjes per jaar')}</p>
            </div>
            <div className="p-6 lg:p-8 rounded-2xl bg-gold/15 border border-gold/40">
              <div className="text-3xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-gold mb-2 break-words">
                10.000.000
              </div>
              <p className="text-warm-white">
                {t('Nederlanders bereikt met het evangelie')}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="text-warm-white/70 max-w-2xl mx-auto">
            {t('En we willen dit internationaal uitrollen.')}
          </p>
        </ScrollReveal>
      </div>
    </div>
  </section>
  );
};

const WidgetSection = () => {
  const { t } = useTranslation();
  return (
  <section id="doneer-widget" className="py-24 bg-cream scroll-mt-24">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span className="text-anthracite text-sm font-medium">
              {t('Veilig doneren')}
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-4">
            {t('Doneer in een paar')} <span className="text-gold">{t('klikken.')}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-muted-foreground mb-10">
            {t('Kies een bedrag, eenmalig of maandelijks. Betaal veilig via iDEAL, creditcard of PayPal.')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <DonorboxWidget />
        </ScrollReveal>


        <ScrollReveal delay={400}>
          <p className="text-sm text-muted-foreground mt-8">
            {t('Veilig via Donorbox. Donaties zijn fiscaal aftrekbaar via onze ANBI-status.')}
          </p>
        </ScrollReveal>
      </div>
    </div>
  </section>
  );
};

const PackagesSection = () => {
  const { t } = useTranslation();
  const packages = [
    {
      amount: '€25',
      title: t('Honderd visitekaartjes met QR-code'),
      desc: t('Rust één ambassadeur uit om zijn verhaal de wereld in te dragen.'),
    },
    {
      amount: '€250',
      title: t('Een verhaal op video volledig geproduceerd'),
      desc: t('Van opname tot publicatie op het platform.'),
    },
    {
      amount: '€1.000',
      title: t('Eerste videografie-apparatuur voor een nieuw land'),
      desc: t('Lokale opnames mogelijk maken in de eigen taal.'),
    },
    {
      amount: '€8.000',
      title: t('Een compleet nieuw land opgestart'),
      desc: t("Lokale coördinator, apparatuur, vertaling en eerste kaartjes-druk. Doel: 50 lokale verhaal-video's binnen 6 maanden."),
      highlight: true,
    },
  ];
  return (
  <section className="py-24 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white text-center mb-4">
            {t('Wat jouw gift')} <span className="text-gold">{t('mogelijk maakt.')}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-warm-white/80 text-center max-w-2xl mx-auto mb-14">
            {t('Elke euro is gekoppeld aan een concrete uitkomst. Je weet precies waar je bijdrage landt.')}
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
              {t('Kies jouw bijdrage')}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
  );
};

const OwnershipSection = () => {
  const { t } = useTranslation();
  const ownershipPoints = [
    {
      icon: TrendingUp,
      title: t('Impact die verder reikt dan je bedrijf'),
      desc: t('Als ondernemer wil je verschil maken op een schaal die past bij wat je hebt opgebouwd. JesusToday biedt die schaal.'),
    },
    {
      icon: Handshake,
      title: t('Tastbaar en meetbaar'),
      desc: t('Elke euro is gekoppeld aan een concrete uitkomst. Je ziet waar je bijdrage landt en wat er mee gebeurt.'),
    },
  ];
  return (
  <section className="py-24 bg-cream">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite text-center mb-4">
            {t('Geen sponsorvraag.')}{' '}
            <span className="text-gold">{t('Mede-eigenaarschap.')}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-14">
            {t('Wie nu instapt, bouwt mee aan het fundament van een beweging die een generatie raakt.')}
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
};

const AnbiSection = () => {
  const { t } = useTranslation();
  return (
  <section className="py-24 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span className="text-warm-white text-sm font-medium">
              {t('ANBI-stichting')}
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl md:text-4xl font-bold text-warm-white mb-4">
            {t('Transparant, betrouwbaar,')}{' '}
            <span className="text-gold">{t('fiscaal aftrekbaar.')}</span>
            <AnbiStamp size={64} rotate={-8} className="ml-3 align-middle" />
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-warm-white/80 leading-relaxed mb-10 max-w-2xl">
            {t('JesusToday valt onder Stichting Cornerstone, een door de Belastingdienst erkende Algemeen Nut Beogende Instelling (ANBI). Dat betekent dat je donaties onder voorwaarden aftrekbaar zijn van de inkomstenbelasting.')}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          <ScrollReveal delay={300}>
            <div className="p-6 lg:p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10">
              <h3 className="text-xl font-bold text-warm-white mb-4">
                {t('Organisatiegegevens')}
              </h3>
              <dl className="space-y-3 text-warm-white/80">
                <div className="flex justify-between gap-4">
                  <dt className="text-warm-white/60">{t('Naam')}</dt>
                  <dd className="text-right">Stichting Cornerstone</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-warm-white/60">{t('KVK-nummer')}</dt>
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
            <div className="p-6 lg:p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10">
              <h3 className="text-xl font-bold text-warm-white mb-4">{t('Contact')}</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://wa.me/31653942196"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-warm-white/80 hover:text-gold transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.887 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
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
};

const FinalCtaSection = () => {
  const { t } = useTranslation();
  return (
  <section className="py-24 bg-cream relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/20 rounded-full blur-3xl" aria-hidden />
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-6">
            {t('Verhalen verdienen het om')}{' '}
            <span className="text-gold">{t('verteld te worden.')}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-muted-foreground mb-10">
            {t('Doe je mee? Help mee bouwen aan een beweging die een hele generatie bereikt.')}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <Button variant="hero" size="xl" onClick={scrollToWidget}>
            <Heart className="w-5 h-5" />
            {t('Doneer nu')}
          </Button>
        </ScrollReveal>
      </div>
    </div>
  </section>
  );
};

const Doneren = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('Doneren aan JesusToday, Stichting Cornerstone Ministries')}</title>
        <meta
          name="description"
          content={t('Help mee bouwen aan een beweging die een hele generatie bereikt. Doneer veilig en fiscaal aftrekbaar via Stichting Cornerstone Ministries (ANBI).')}
        />
        <meta
          property="og:title"
          content={t('Doneren aan JesusToday, Stichting Cornerstone Ministries')}
        />
        <meta
          property="og:description"
          content={t('Help mee bouwen aan een beweging die een hele generatie bereikt.')}
        />
        <meta property="og:url" content="https://jesustoday.app/doneren" />

        <link rel="canonical" href="https://jesustoday.app/doneren" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={t('Doneren aan JesusToday')} />
        <meta name="twitter:description" content={t('Help mee bouwen aan een beweging die een hele generatie bereikt.')} />
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
