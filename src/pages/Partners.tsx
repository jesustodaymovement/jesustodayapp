import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { PartnerForm } from '@/components/PartnerForm';
import {
  Handshake,
  Users,
  Palette,
  Camera,
  MessageCircle,
  QrCode,
  Mic,
  HeartHandshake,
  Mail,
  ArrowRight,
  Church,
  Sparkles,
  Calendar,
  UserCheck,
} from 'lucide-react';

import globalrize from '@/assets/partners/globalrize.png';
import theSend from '@/assets/partners/the-send.png';
import europoort from '@/assets/partners/europoort.png';
import opwekking from '@/assets/partners/opwekking.png';
import lifeschool from '@/assets/partners/lifeschool.png';
import motionChurch from '@/assets/partners/motion-church.png';
import stadskerk from '@/assets/partners/stadskerk.png';
import agape from '@/assets/partners/agape.png';
import r5 from '@/assets/partners/r5.png';
import impactWorldTour from '@/assets/partners/impact-world-tour.png';
import theMessage from '@/assets/partners/the-message.png';
import martinKoornstra from '@/assets/endorsements/martin-koornstra.jpg';
import janPool from '@/assets/endorsements/jan-pool.jpg';
import benVerboom from '@/assets/endorsements/ben-verboom.jpg';

const partners = [
  { name: 'GlobalRize', url: 'https://www.globalrize.nl/', logo: globalrize },
  { name: 'The Send Nederland', url: 'https://thesend.nl/', logo: theSend },
  { name: 'Europoort International Church', url: 'https://europoortinternational.nl/', logo: europoort },
  { name: 'Stichting Opwekking', url: 'https://opwekking.nl/', logo: opwekking },
  { name: 'Lifeschool', url: 'https://lifeschool.nu/', logo: lifeschool },
  { name: 'Motion Church', url: 'https://motion.church/', logo: motionChurch },
  { name: 'De Stadskerk VBG', url: 'https://destadskerk.nl/', logo: stadskerk },
  { name: 'Agapè Nederland', url: 'https://agape.nl/', logo: agape },
  { name: 'R5 Kerk & Bijbelschool', url: 'https://r5church.nl/', logo: r5 },
  { name: 'Impact World Tour', url: 'https://impactworldtour.com/', logo: impactWorldTour },
  { name: 'The Message Nederland', url: 'https://www.themessage.nl/', logo: theMessage },
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


const benefits = [
  {
    icon: HeartHandshake,
    title: 'Eigenaarschap in de gemeente',
    description: 'Jullie kerk pakt zelf het stuur om getuigenissen van gemeenteleden te verzamelen en te delen, op jullie eigen tempo.',
  },
  {
    icon: Users,
    title: 'Activeer je gemeente',
    description: 'Gemeenteleden gaan zelf de straat op met kaartjes om hun verhaal en geloof te delen met anderen.',
  },
  {
    icon: Palette,
    title: 'Kaartjes in jullie huisstijl',
    description: 'QR-kaartjes ontworpen in de kleuren en met het logo van jullie kerk, herkenbaar en eigen.',
  },
  {
    icon: Camera,
    title: 'Wij helpen waar nodig',
    description: 'Wij denken mee, leveren handvatten en springen bij als jullie er zelf niet uitkomen.',
  },
];

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Kennismaking met het bestuur',
    description: 'We komen langs voor een 1-op-1 gesprek met jullie bestuur om visie, wensen en mogelijkheden te verkennen.',
  },
  {
    number: '02',
    icon: Mic,
    title: 'Jullie nemen verhalen op',
    description: 'Jullie gaan zelf aan de slag met het opnemen van getuigenissen. Wij geven jullie de handvatten en denken mee in de aanpak.',
  },
  {
    number: '03',
    icon: QrCode,
    title: 'QR-kaartjes in jullie huisstijl',
    description: 'Elk verhaal krijgt een uniek kaartje, in jullie kleuren en met jullie logo, klaar om uit te delen.',
  },
  {
    number: '04',
    icon: Users,
    title: 'De straat op',
    description: 'Gemeenteleden delen de kaartjes in hun dagelijks leven, op werk, school en in de buurt.',
  },
];

const offering = [
  { icon: MessageCircle, title: '1-op-1 gesprek met het bestuur' },
  { icon: Users, title: 'Vast aanspreekpunt vanuit het JesusToday-team' },
  { icon: Mic, title: 'Spreekbeurt over evangelisatie en getuigen' },
  { icon: Palette, title: 'QR-kaartjes ontworpen in jullie huisstijl' },
  { icon: QrCode, title: 'Eigen QR-codes met directe link naar JesusToday' },
  { icon: Camera, title: 'Optioneel: hulp bij opnemen als jullie er zelf niet uitkomen' },
];

const faqs = [
  {
    q: 'Moeten we het zelf opnemen of komen jullie filmen?',
    a: 'Het idee is dat jullie het zelf doen, dat geeft de meeste eigenaarschap in de gemeente. Lukt dat niet, dan kunnen we in overleg langskomen om te helpen met opnemen.',
  },
  {
    q: 'Wat als we geen ervaring hebben met video?',
    a: 'Geen probleem. We geven jullie praktische handvatten, voorbeeldvragen en tips zodat je zelf aan de slag kunt. Loop je vast, dan denken we mee.',
  },
  {
    q: 'Mogen we de verhalen ook zelf gebruiken?',
    a: 'Ja, jullie krijgen toegang tot de getuigenissen en mogen deze ook delen via eigen kanalen, social media of in de dienst.',
  },
];

const Partners = () => {
  return (
    <>
      <Helmet>
        <title>Partners, JesusToday voor kerken en organisaties</title>
        <meta
          name="description"
          content="Word partner van JesusToday. We helpen kerken en organisaties om getuigenissen van gemeenteleden vast te leggen en te delen via QR-kaartjes in jullie eigen huisstijl."
        />
        <link rel="canonical" href="/partners" />
      </Helmet>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6">
                  <Handshake className="w-4 h-4 text-anthracite" />
                  <span className="text-anthracite text-sm font-medium">Voor kerken en organisaties</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-anthracite mb-6">
                  Word partner van <span className="text-gold">JesusToday</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
                  We helpen missionair gerichte kerken om zelf getuigenissen van gemeenteleden vast te leggen en te delen via QR-kaartjes in jullie eigen huisstijl. Jullie nemen het eigenaarschap, wij denken mee en springen bij waar nodig.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="cta-light" size="lg">
                    <Link to="/upload">Meld je kerk aan</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="mailto:info@jesustoday.nl?subject=Partnership%20met%20JesusToday">
                      Plan een kennismaking
                    </a>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-anthracite mb-4">
                  Waarom partner worden?
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
                  Samen bouwen we aan een cultuur waarin verhalen over Jezus een vaste plek krijgen in jullie gemeente.
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

        {/* Hoe werkt een partnership */}
        <section className="py-24 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-anthracite mb-4">
                  Zo werkt een partnership
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
                  In vier overzichtelijke stappen van kennismaking tot gemeenteleden die de straat op gaan.
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
                  Alles wat jullie nodig hebben
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

        {/* Spreken in jullie kerk */}
        <section className="py-24 bg-cream">
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
                    Naast partner worden kunnen we ook langskomen om in jullie dienst, jongerenavond of leiderschapsteam te spreken over getuigen en evangelisatie.
                  </p>
                </ScrollReveal>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {[
                  { icon: Calendar, title: 'In de zondagsdienst', desc: 'Een inspirerende boodschap over getuigen, met praktische handvatten voor de gemeente.' },
                  { icon: Users, title: 'Op een jongeren-/jeugdavond', desc: 'Een interactieve sessie waarin jongeren ontdekken hoe ze hun verhaal kunnen delen.' },
                  { icon: UserCheck, title: 'Voor het leiderschapsteam', desc: 'Een verdiepend gesprek over evangelisatie als beweging binnen jullie gemeente.' },
                ].map((item, i) => (
                  <ScrollReveal key={item.title} delay={150 + i * 100}>
                    <div className="h-full p-6 rounded-2xl bg-background border border-border/50 shadow-soft hover:shadow-card transition-all">
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
                    <a href="mailto:info@jesustoday.nl?subject=Spreker%20over%20evangelisatie">
                      <Mic className="w-5 h-5" />
                      Plan een spreker
                    </a>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Partners logo grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-anthracite mb-4">
                  Onze partners
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
                  We werken samen met kerken en organisaties die zich inzetten om Jezus zichtbaar te maken in Nederland.
                </p>
              </ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {partners.map((p, i) => (
                  <ScrollReveal key={p.name} delay={80 + i * 50}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={p.name}
                      className="group flex items-center justify-center h-32 p-6 rounded-2xl bg-cream border border-border/50 hover:border-gold/40 hover:shadow-card transition-all duration-300"
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
            </div>
          </div>
        </section>

        {/* Aanbevolen door */}
        <section className="py-24 bg-cream">
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
                    <figure className="h-full p-8 rounded-2xl bg-background border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col items-center text-center">
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
                  Samen jullie gemeente <span className="text-gold">activeren</span> in getuigen?
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-warm-white/80 mb-10 leading-relaxed">
                  Laten we kennismaken. We denken graag met jullie mee over hoe getuigenissen een vaste plek krijgen in jullie gemeente.
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

export default Partners;