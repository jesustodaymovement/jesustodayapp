import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AnbiStamp } from '@/components/AnbiStamp';
import { VideoSliderSection } from '@/components/sections/VideoSliderSection';
import eventStand from '@/assets/team/event-stand.jpg';
import teamQrShirts from '@/assets/team/team-qr-shirts.jpg';
import teamCrewSelfie from '@/assets/team/team-crew-selfie.jpg';
import {
  Upload,
  Play,
  ArrowRight,
  Video,
  QrCode,
  Users,
  ExternalLink,
  Heart,
  Sparkles,
  BookOpen,
  Mail,
} from 'lucide-react';

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
            <span className="text-anthracite text-sm font-medium">{t('Over ons')}</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-anthracite leading-tight mb-6">
            {t('Echte verhalen, van gewone mensen, over')}{' '}
            <span className="text-gold">{t('één bijzondere Persoon.')}</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
            {t('JesusToday is een platform voor persoonlijke verhalen op video, gemaakt door en voor mensen die hun ervaring met Jezus willen delen.')}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/upload">
                <Upload className="w-5 h-5" />
                {t('Upload jouw verhaal')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/verhalen-over-jezus">
                <Play className="w-5 h-5" />
                {t('Bekijk verhalen')}
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
  );
};

const GapSection = () => {
  const { t } = useTranslation();
  return (
  <section className="py-24 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white mb-6">
            {t('Wij zien een')} <span className="text-gold">{t('gat.')}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-warm-white/80 leading-relaxed mb-8">
            {t('Nederland is een van de meest seculiere landen van West-Europa. De generatie die we het meest willen bereiken loopt uit zichzelf nooit een kerk binnen. Tegelijk willen veel christenen hun verhaal delen, maar weten ze niet hoe. Beide groepen wachten op elkaar.')}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-xl md:text-2xl text-gold font-semibold">
            {t('JesusToday slaat een brug.')}
          </p>
        </ScrollReveal>
      </div>
    </div>
  </section>
  );
};

const FounderSection = () => {
  const { t } = useTranslation();
  return (
  <section className="py-24 bg-cream">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold text-gold uppercase tracking-wider mb-3">
              {t('Hoe het begon')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite">
              {t('JesusToday begon met een')}{' '}
              <span className="text-gold">{t('persoonlijk verhaal.')}</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <blockquote className="relative bg-white rounded-2xl border border-anthracite/10 shadow-sm p-8 md:p-12 border-l-4 border-l-gold">
            <div className="space-y-5 text-anthracite/90 text-lg leading-relaxed">
              <p>
                {t('JesusToday is ontstaan uit een verlangen om mensen op een eenvoudige manier in aanraking te brengen met inspirerende verhalen. Bijzondere verhalen van gewone mensen, met één gemeenschappelijke deler: Jezus. Wie is deze persoon aan wie we de jaartelling te danken hebben? Waarom spreken we na ruim 2000 jaar nog steeds over hem? En wat is zijn impact vandaag de dag?')}
              </p>
              <p>
                {t('In 2010 kwam ik (Alexander Keur) na een crisisjaar op Kerstavond in een kerk terecht waar ik normaal gesproken nooit kwam. Hier werd de geboorte van Jezus Christus, de Zoon van God, gevierd. Ik had nauwelijks kennis van de Bijbel, de kerk en de christelijke traditie, en ik had hier ook veel kanttekeningen en zelfs vooroordelen bij. Er werd iets getriggerd die avond. Je kunt het terughoren in mijn eigen verhaal.')}
              </p>
              <p>
                {t('Ik had geen idee waar ik met deze nieuwe interesse in mijn leven terecht kon. Er staat van alles op internet, zoveel verschillende kerken en organisaties. Wie kon mij verder helpen en waar kon ik gewoon ervaringen uit de eerste hand krijgen? Gewoon van mensen zoals ik, die vertellen over wat ze persoonlijk met Jezus hebben meegemaakt.')}
              </p>
              <p>
                {t('Er bleken veel mensen te zijn die een persoonlijk verhaal over Jezus hebben en dat graag wilden delen. Zodoende zijn we samen met een team enthousiastelingen dit online platform begonnen.')}
              </p>
              <p>
                {t('We hopen dat deze verhalen jou, net als ons, ook weten te verrassen!')}
              </p>
            </div>

            <footer className="mt-10 pt-6 border-t border-anthracite/10">
              <cite className="not-italic">
                <span className="block font-signature text-5xl md:text-6xl text-gold leading-none mb-2">
                  Alexander Keur
                </span>
                <span className="block text-sm text-muted-foreground">
                  {t('Oprichter JesusToday')}
                </span>
              </cite>
            </footer>
          </blockquote>
        </ScrollReveal>
      </div>
    </div>
  </section>
  );
};

const useStats = () => {
  const { t } = useTranslation();
  return [
    { value: '300+', label: t('persoonlijke verhalen op video') },
    { value: '10+', label: t('samenwerkingen, o.a. Opwekking, The Send, New Wine, YWAM') },
    { value: '1', label: t('land actief (Zuid-Afrika)') },
    { value: '2', label: t('landen klaar voor opstart (India, Macedonië)') },
  ];
};

const ProofSection = () => {
  const { t } = useTranslation();
  const stats = useStats();
  return (
  <section className="py-24 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white text-center mb-4">
            {t('Waar we')} <span className="text-gold">{t('nu staan.')}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-warm-white/80 text-center max-w-2xl mx-auto mb-14">
            {t('Het platform draait. De methode werkt.')}
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

const InTheFieldSection = () => {
  const { t } = useTranslation();
  return (
  <section className="py-24 bg-cream">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal>
            <span className="inline-block text-sm font-semibold text-gold uppercase tracking-wider mb-3">
              {t('In het veld')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-6">
              {t('JesusToday is')} <span className="text-gold">{t('in beweging.')}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('We staan op events, conferenties en in kerken door heel Nederland. Met QR-shirts, kaartjes en een verhaal dat persoonlijk is, brengen we mensen in aanraking met Jezus.')}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ScrollReveal delay={150}>
            <div className="relative overflow-hidden rounded-2xl shadow-card aspect-[4/3] bg-anthracite">
              <img
                src={teamQrShirts}
                alt={t('JesusToday team met QR-code shirts op een event in Nederland')}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={250}>
            <div className="relative overflow-hidden rounded-2xl shadow-card aspect-[4/3] bg-anthracite">
              <img
                src={eventStand}
                alt={t('JesusToday stand met QR-banners en team op een conferentie')}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
  );
};

const useSteps = () => {
  const { t } = useTranslation();
  return [
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
};

const PlanSection = () => {
  const { t } = useTranslation();
  const steps = useSteps();
  return (
  <section className="py-24 bg-cream">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite text-center mb-4">
            {t('Drie')} <span className="text-gold">{t('stappen.')}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-14">
            {t('Eenvoudig, schaalbaar, en bewezen.')}
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
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

const ScaleSection = () => {
  const { t } = useTranslation();
  return (
  <section className="py-24 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white mb-6">
            {t('Wat zou er gebeuren')}{' '}
            <span className="text-gold">{t('als we dit samen doen?')}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-lg text-warm-white/80 max-w-2xl mx-auto mb-14">
            {t('Twee kaartjes per week, in het dagelijks leven, via iemand die ze kennen.')}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="grid sm:grid-cols-3 gap-6 items-center mb-10">
            <div className="p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                100.000
              </div>
              <p className="text-warm-white/80">{t('ambassadeurs')}</p>
            </div>
            <div className="p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                × 100
              </div>
              <p className="text-warm-white/80">{t('kaartjes per jaar')}</p>
            </div>
            <div className="p-8 rounded-2xl bg-gold/15 border border-gold/40">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                10.000.000
              </div>
              <p className="text-warm-white">{t('Nederlanders bereikt')}</p>
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

const CornerstoneSection = () => {
  const { t } = useTranslation();
  const pillars = [
    {
      icon: Sparkles,
      title: t('Evangelisatie'),
      desc: t('Via JesusToday verzamelt en verspreidt Cornerstone persoonlijke verhalen op video, zodat mensen op straat, op werk en online in aanraking komen met Jezus.'),
    },
    {
      icon: Heart,
      title: t('Gebed'),
      desc: t('Cornerstone bouwt aan gebedsinitiatieven die het werk dragen. Elk verhaal dat via JesusToday wordt gedeeld, staat in een breder gebedsfundament.'),
    },
    {
      icon: BookOpen,
      title: t('Onderwijs en events'),
      desc: t('Trainingen en samenkomsten waarin christenen worden toegerust om hun geloof te delen, ook praktisch via JesusToday.'),
    },
  ];
  return (
  <section className="py-24 bg-cream">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <ScrollReveal>
            <span className="inline-block text-sm font-semibold text-gold uppercase tracking-wider mb-3">
              {t('Onze stichting')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-6">
              Stichting Cornerstone <span className="text-gold">Ministries</span>
              <AnbiStamp size={64} rotate={-8} className="ml-3 align-middle" />
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('JesusToday is een initiatief van Stichting Cornerstone Ministries, een ANBI-stichting. Cornerstone werkt vanuit drie pijlers en zet zich in om het licht van Jezus te verspreiden in Nederland en daarbuiten. JesusToday is het platform waarmee zij persoonlijke verhalen een bereik geven dat verder gaat dan één kerk of één stad.')}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.title} delay={150 + i * 100}>
              <div className="h-full p-8 rounded-2xl bg-white border border-anthracite/10 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mb-5">
                  <p.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-anthracite mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="text-center">
            <a
              href="https://cornerstone-ministries.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
            >
              {t('Bezoek cornerstone-ministries.com')}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
  );
};

const FinalCta = () => {
  const { t } = useTranslation();
  return (
  <section className="py-24 bg-anthracite relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/15 rounded-full blur-3xl" aria-hidden />
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
        <ScrollReveal>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold/30 rounded-2xl blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl shadow-card aspect-[4/3] bg-anthracite-light ring-1 ring-warm-white/10">
              <img
                src={teamCrewSelfie}
                alt={t('Vier crewleden van JesusToday in gele shirts op een event')}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-gold text-anthracite text-sm font-semibold shadow-gold">
              {t('Crew JesusToday')}
            </div>
          </div>
        </ScrollReveal>
        <div className="text-center md:text-left">
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white mb-6">
              {t('Doe je')} <span className="text-gold">{t('mee?')}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg text-warm-white/80 mb-10 leading-relaxed">
              {t('Jouw verhaal kan iemands leven veranderen. Word onderdeel van een groeiende beweging die Jezus zichtbaar maakt, in Nederland en daarbuiten.')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/upload">
                  <Upload className="w-5 h-5" />
                  {t('Upload jouw verhaal')}
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="lg">
                <Link to="/verhalen-over-jezus">
                  <ArrowRight className="w-5 h-5" />
                  {t('Bekijk verhalen')}
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
  );
};

const NewsletterInvite = () => {
  const { t } = useTranslation();
  return (
  <section className="py-20 md:py-24 bg-cream">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-white border border-anthracite/10 shadow-sm p-8 md:p-12">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#fad150]/20 rounded-full blur-3xl" aria-hidden />
            <div className="relative grid md:grid-cols-[auto,1fr,auto] gap-6 md:gap-8 items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#fad150]/20 flex items-center justify-center mx-auto md:mx-0">
                <Mail className="w-8 h-8 text-gold" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-anthracite mb-2">
                  {t('Blijf verbonden met')} <span className="text-gold">JesusToday</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('Meld je aan voor onze nieuwsbrief en ontvang nieuwe getuigenissen, updates en bemoediging in je inbox.')}
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <Button asChild variant="hero" size="lg">
                  <Link to="/aanmelden-nieuwsbrief">
                    <Mail className="w-5 h-5" />
                    {t('Aanmelden nieuwsbrief')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
  );
};

const OverOns = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('Over JesusToday, ons verhaal')}</title>
        <meta
          name="description"
          content={t('JesusToday is een platform voor persoonlijke verhalen op video. Lees hoe het begon met het verhaal van oprichter Alexander Keur.')}
        />
        <meta property="og:title" content={t('Over JesusToday, ons verhaal')} />
        <meta
          property="og:description"
          content={t('JesusToday is een platform voor persoonlijke verhalen op video, gemaakt door en voor mensen die hun ervaring met Jezus willen delen.')}
        />
        <meta property="og:url" content="https://jesustoday.app/over-ons" />

        <link rel="canonical" href="https://jesustoday.app/over-ons" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={t('Over JesusToday, ons verhaal')} />
        <meta name="twitter:description" content={t('JesusToday is een platform voor persoonlijke verhalen op video.')} />
      </Helmet>
      <Header />
      <main>
        <Hero />
        <GapSection />
        <FounderSection />
        <ProofSection />
        <InTheFieldSection />
        <PlanSection />
        <ScaleSection />
        <VideoSliderSection />
        <CornerstoneSection />
        <NewsletterInvite />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
};

export default OverOns;