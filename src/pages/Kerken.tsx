import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { PartnerForm } from '@/components/PartnerForm';
import {
  Church,
  HeartHandshake,
  Users,
  Palette,
  Camera,
  MessageCircle,
  QrCode,
  Mic,
  Calendar,
  UserCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

import europoort from '@/assets/partners/europoort.png';
import motionChurch from '@/assets/partners/motion-church.png';
import stadskerk from '@/assets/partners/stadskerk.png';
import r5 from '@/assets/partners/r5.png';
import opwekking from '@/assets/partners/opwekking.png';
import theSend from '@/assets/partners/the-send.png';
import lifeschool from '@/assets/partners/lifeschool.png';
import meerJezus from '@/assets/partners/meer-jezus.png';
import martinKoornstra from '@/assets/endorsements/martin-koornstra.jpg';
import janPool from '@/assets/endorsements/jan-pool.jpg';
import benVerboom from '@/assets/endorsements/ben-verboom.jpg';
import boothSelfie from '@/assets/partners/jt-booth-selfie.jpg';

const churchPartners = [
  { name: 'Europoort International Church', url: 'https://europoortinternational.nl/', logo: europoort },
  { name: 'Motion Church', url: 'https://motion.church/', logo: motionChurch },
  { name: 'De Stadskerk VBG', url: 'https://destadskerk.nl/', logo: stadskerk },
  { name: 'R5 Kerk & Bijbelschool', url: 'https://r5church.nl/', logo: r5 },
  { name: 'Stichting Opwekking', url: 'https://opwekking.nl/', logo: opwekking },
  { name: 'The Send Nederland', url: 'https://thesend.nl/', logo: theSend },
  { name: 'Lifeschool', url: 'https://lifeschool.nu/', logo: lifeschool },
  { name: 'Meer Jezus', url: 'https://meerjezus.nl/', logo: meerJezus },
];

const benefits = [
  {
    icon: HeartHandshake,
    title: 'Eigenaarschap bij jullie kerk',
    description: 'Jullie pakken zelf het stuur om verhalen van mensen uit de gemeente te verzamelen en te delen, op jullie eigen tempo.',
  },
  {
    icon: Users,
    title: 'Activeer jullie gemeente',
    description: 'Leden gaan zelf op pad met kaartjes om hun verhaal en geloof te delen op werk, school en in de buurt.',
  },
  {
    icon: Palette,
    title: 'QR-kaartjes in jullie huisstijl',
    description: 'Persoonlijke kaartjes ontworpen in de kleuren en met het logo van jullie kerk, herkenbaar en eigen.',
  },
  {
    icon: Camera,
    title: 'Wij helpen waar nodig',
    description: 'We denken mee, leveren handvatten en springen bij als jullie er zelf niet uitkomen.',
  },
];

const offering = [
  { icon: MessageCircle, title: '1-op-1 gesprek met voorganger of bestuur' },
  { icon: Users, title: 'Vast aanspreekpunt vanuit het JesusToday-team' },
  { icon: Mic, title: 'Spreekbeurt over evangelisatie en getuigen' },
  { icon: Palette, title: 'QR-kaartjes ontworpen in jullie huisstijl' },
  { icon: QrCode, title: 'Eigen QR-codes met directe link naar JesusToday' },
  { icon: Camera, title: 'Optioneel: opnamedag in jullie kerk' },
];

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Kennismaking met het bestuur',
    description: 'We komen langs voor een 1-op-1 gesprek met jullie voorganger of bestuur om visie en wensen te verkennen.',
  },
  {
    number: '02',
    icon: Mic,
    title: 'Verhalen opnemen',
    description: 'Jullie nemen zelf de getuigenissen op. Wij geven handvatten en denken mee, of komen langs voor een opnamedag.',
  },
  {
    number: '03',
    icon: QrCode,
    title: 'QR-kaartjes in jullie huisstijl',
    description: 'Elk verhaal krijgt een uniek kaartje, in de kleuren en met het logo van jullie kerk.',
  },
  {
    number: '04',
    icon: Users,
    title: 'De gemeente gaat op pad',
    description: 'Jullie mensen delen de kaartjes in hun dagelijks leven, op werk, school, evenementen en in de buurt.',
  },
];

const speakingOptions = [
  { icon: Calendar, title: 'In een dienst', desc: 'Een inspirerende boodschap over getuigen, met praktische handvatten voor de gemeente.' },
  { icon: Users, title: 'Op een jongerenavond', desc: 'Een interactieve sessie waarin jongeren ontdekken hoe ze hun verhaal kunnen delen.' },
  { icon: UserCheck, title: 'Voor het leiderschap', desc: 'Een verdiepend gesprek met bestuur of kernteam over getuigen als beweging in de kerk.' },
];

const endorsements = [
  {
    name: 'Martin Koornstra',
    role: 'Spreker & oprichter Royal Mission',
    photo: martinKoornstra,
    description: 'Bekend spreker en evangelist, oprichter van Royal Mission, die zich inzet voor toerusting van gelovigen in heel Nederland.',
  },
  {
    name: 'Jan Pool',
    role: 'Spreker & auteur',
    photo: janPool,
    description: 'Ervaren spreker en auteur met een hart voor de kerk in Nederland en het delen van het evangelie.',
  },
  {
    name: 'Ben Verboom',
    role: 'R5 Church',
    photo: benVerboom,
    description: 'Voorganger en initiatiefnemer bij R5 Church, betrokken bij gemeenteopbouw en het activeren van gelovigen in hun roeping.',
  },
];

const faqs = [
  {
    q: 'Wat kost het voor onze kerk?',
    a: 'JesusToday wordt gedragen door donaties en partnerschappen. De basis-samenwerking is voor jullie kerk laagdrempelig. Voor maatwerk zoals huisstijl-kaartjes en opnamedagen bespreken we samen wat passend is.',
  },
  {
    q: 'Moeten we het zelf opnemen of komen jullie filmen?',
    a: 'Het idee is dat jullie het zelf doen, dat geeft de meeste eigenaarschap binnen de gemeente. Lukt dat niet, dan kunnen we in overleg langskomen om te helpen met opnemen.',
  },
  {
    q: 'Wat als we geen ervaring hebben met video?',
    a: 'Geen probleem. We geven jullie praktische handvatten, voorbeeldvragen en tips zodat je zelf aan de slag kunt. Loop je vast, dan denken we mee.',
  },
  {
    q: 'Mogen we de verhalen ook in onze diensten gebruiken?',
    a: 'Ja, jullie krijgen toegang tot de getuigenissen en mogen deze ook delen via eigen kanalen, social media, in een dienst of op een event.',
  },
  {
    q: 'Voor welke kerken is dit geschikt?',
    a: 'Voor elke missionair gerichte kerk, ongeacht denominatie of grootte. Van kleine gemeentes tot grote bewegingen, we werken samen met kerken die getuigen weer een natuurlijke plek willen geven.',
  },
];

const Kerken = () => {
  return (
    <>
      <Helmet>
        <title>Voor kerken, JesusToday in jouw gemeente</title>
        <meta
          name="description"
          content="JesusToday helpt kerken om getuigen weer een natuurlijke plek te geven. QR-kaartjes in jullie huisstijl, opnamedagen, sprekers en een vast aanspreekpunt."
        />
        <meta property="og:title" content="Voor kerken, JesusToday in jouw gemeente" />
        <meta property="og:description" content="JesusToday helpt kerken om getuigen weer een natuurlijke plek te geven binnen de gemeente." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://storybrand-share-grace.lovable.app/kerken" />
        <link rel="canonical" href="https://storybrand-share-grace.lovable.app/kerken" />
        <meta name="twitter:title" content="Voor kerken, JesusToday in jouw gemeente" />
        <meta name="twitter:description" content="JesusToday in jouw kerk: getuigen weer een natuurlijke plek geven." />
      </Helmet>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6">
                  <Church className="w-4 h-4 text-anthracite" />
                  <span className="text-anthracite text-sm font-medium">Speciaal voor kerken</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-anthracite mb-6">
                  JesusToday in <span className="text-gold">jouw kerk</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
                  Wij helpen kerken om getuigen weer een natuurlijke plek te geven binnen de gemeente. Samen leggen we verhalen vast van mensen uit jullie kerk en delen we die met de wereld via QR-kaartjes in jullie eigen huisstijl.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="cta-light" size="lg">
                    <a href="mailto:info@jesustoday.nl?subject=JesusToday%20voor%20onze%20kerk">
                      Plan een kennismaking
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/upload">Upload jouw getuigenis</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Visual + Waarom */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="max-w-5xl mx-auto mb-20">
                <div className="relative rounded-3xl overflow-hidden shadow-card border border-border/50">
                  <img
                    src={boothSelfie}
                    alt="JesusToday stand in een kerk met QR-kaartjes"
                    className="w-full h-[280px] md:h-[420px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-anthracite/80 via-anthracite/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/90 mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-anthracite" />
                      <span className="text-anthracite text-xs font-semibold">Samen op pad met kerken</span>
                    </div>
                    <p className="text-warm-white text-lg md:text-2xl font-semibold max-w-2xl leading-snug">
                      Verhalen over Jezus zichtbaar maken, vanuit de gemeente, voor de wereld.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-anthracite mb-4">
                  Waarom JesusToday in jullie kerk?
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
                  Samen bouwen we aan een cultuur waarin getuigen een vaste plek krijgt binnen jullie gemeente.
                </p>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((b, i) => (
                  <ScrollReveal key={b.title} delay={150 + i * 100}>
                    <div className="h-full p-8 rounded-2xl bg-cream border border-border/50 shadow-soft hover:shadow-card transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center mb-5 shadow-gold">
                        <b.icon className="w-6 h-6 text-anthracite" />
                      </div>
                      <h3 className="text-xl font-semibold text-anthracite mb-3">{b.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{b.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Wat we bieden */}
        <section className="py-24 bg-anthracite">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6 mx-auto justify-center">
                  <Church className="w-4 h-4 text-gold" />
                  <span className="text-gold text-sm font-medium">Wat we bieden</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-warm-white mb-4">
                  Alles wat jullie kerk nodig heeft
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg text-center text-warm-white/70 mb-16 max-w-2xl mx-auto">
                  Een compleet pakket aan ondersteuning, persoonlijk contact en praktische middelen.
                </p>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-4">
                {offering.map((o, i) => (
                  <ScrollReveal key={o.title} delay={100 + i * 60}>
                    <div className="flex items-center gap-4 p-5 rounded-xl bg-warm-white/5 border border-warm-white/10 hover:border-gold/40 hover:bg-warm-white/10 transition-all">
                      <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gold/15 flex items-center justify-center">
                        <o.icon className="w-5 h-5 text-gold" />
                      </div>
                      <p className="text-warm-white font-medium">{o.title}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stappen */}
        <section className="py-24 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-anthracite mb-4">
                  Zo werkt het in jullie kerk
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
                  In vier overzichtelijke stappen, van kennismaking tot mensen die hun verhaal delen in het dagelijks leven.
                </p>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((s, i) => (
                  <ScrollReveal key={s.number} delay={150 + i * 100}>
                    <div className="relative h-full p-8 rounded-2xl bg-background border border-border/50 shadow-soft hover:shadow-card transition-all duration-300">
                      <span className="absolute -top-4 -right-2 text-6xl font-bold text-gold/15 font-heading">
                        {s.number}
                      </span>
                      <div className="relative w-12 h-12 rounded-xl bg-gold flex items-center justify-center mb-5 shadow-gold">
                        <s.icon className="w-6 h-6 text-anthracite" />
                      </div>
                      <h3 className="text-lg font-semibold text-anthracite mb-2">{s.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{s.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Spreken */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6">
                    <Sparkles className="w-4 h-4 text-anthracite" />
                    <span className="text-anthracite text-sm font-medium">Bonus, extra mogelijkheid</span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <h2 className="text-3xl md:text-4xl font-bold text-anthracite mb-4">
                    Laat ons spreken over <span className="text-gold">evangelisatie</span>
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    Naast de samenwerking komen we graag langs om in jullie dienst, jongerenavond of leiderschapsteam te spreken over getuigen en het delen van verhalen over Jezus.
                  </p>
                </ScrollReveal>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {speakingOptions.map((item, i) => (
                  <ScrollReveal key={item.title} delay={150 + i * 100}>
                    <div className="h-full p-6 rounded-2xl bg-cream border border-border/50 shadow-soft hover:shadow-card transition-all">
                      <div className="w-11 h-11 rounded-lg bg-gold/20 flex items-center justify-center mb-4">
                        <item.icon className="w-5 h-5 text-gold" />
                      </div>
                      <h3 className="text-lg font-semibold text-anthracite mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={450}>
                <div className="text-center">
                  <Button asChild variant="cta-light" size="lg">
                    <a href="mailto:info@jesustoday.nl?subject=Spreker%20voor%20onze%20kerk">
                      <Mic className="w-5 h-5" />
                      Plan een spreker
                    </a>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Kerken die meedoen */}
        <section className="py-24 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-anthracite mb-4">
                  Kerken die al meedoen
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
                  We werken samen met missionair gerichte kerken en bewegingen die zich inzetten om Jezus zichtbaar te maken in Nederland.
                </p>
              </ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {churchPartners.map((p, i) => (
                  <ScrollReveal key={p.name} delay={80 + i * 50}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={p.name}
                      className="group flex items-center justify-center h-32 p-6 rounded-2xl bg-background border border-border/50 hover:border-gold/40 hover:shadow-card transition-all duration-300"
                    >
                      <img
                        src={p.logo}
                        alt={`${p.name} logo`}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal delay={400}>
                <div className="text-center mt-12">
                  <Link
                    to="/partners"
                    className="inline-flex items-center gap-2 text-anthracite hover:text-gold font-medium transition-colors"
                  >
                    Bekijk al onze partners
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Aanbevolen door */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6 mx-auto justify-center">
                  <UserCheck className="w-4 h-4 text-anthracite" />
                  <span className="text-anthracite text-sm font-medium">Aanbevolen door</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-anthracite mb-4">
                  Gewaardeerde stemmen achter <span className="text-gold">JesusToday</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
                  Sprekers en leiders uit het Nederlandse christelijke landschap staan achter onze missie.
                </p>
              </ScrollReveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {endorsements.map((e, i) => (
                  <ScrollReveal key={e.name} delay={150 + i * 100}>
                    <figure className="h-full p-8 rounded-2xl bg-cream border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col items-center text-center">
                      <img
                        src={e.photo}
                        alt={`Foto van ${e.name}`}
                        loading="lazy"
                        className="w-24 h-24 rounded-full object-cover mb-5 ring-4 ring-gold/20 shadow-soft"
                      />
                      <figcaption className="mb-3">
                        <div className="font-semibold text-anthracite">{e.name}</div>
                        <div className="text-sm text-muted-foreground">{e.role}</div>
                      </figcaption>
                      <p className="text-sm text-anthracite/75 leading-relaxed">
                        {e.description}
                      </p>
                    </figure>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-anthracite mb-4">
                  Veelgestelde vragen
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-center text-muted-foreground mb-12">
                  Nog vragen? Neem gerust contact met ons op.
                </p>
              </ScrollReveal>
              <div className="space-y-4">
                {faqs.map((f, i) => (
                  <ScrollReveal key={f.q} delay={100 + i * 80}>
                    <div className="p-6 rounded-xl bg-background border border-border/50 shadow-soft">
                      <h3 className="text-lg font-semibold text-anthracite mb-2">{f.q}</h3>
                      <p className="text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Eind CTA */}
        <section className="py-24 bg-anthracite">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white mb-6">
                  Klaar om jullie gemeente te <span className="text-gold">activeren</span>?
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-warm-white/80 mb-10 leading-relaxed">
                  Laten we kennismaken. We denken graag met jullie mee over hoe getuigen een vaste plek krijgt binnen jullie kerk.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="text-left bg-background rounded-2xl p-2">
                  <PartnerForm />
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

export default Kerken;
