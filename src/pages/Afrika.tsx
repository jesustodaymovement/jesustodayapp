import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Compass, Heart, HelpCircle, Cloud, Search, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

const points = [
  { icon: Cloud, text: 'Partykeer voel jy ’n leegte wat jy nie kan verklaar nie' },
  { icon: Search, text: 'Jy soek na betekenis, maar weet nie waar om te begin nie' },
  { icon: HelpCircle, text: 'Jy het vrae oor geloof wat jy nog nooit hardop gevra het nie' },
  { icon: Heart, text: 'Jy is nuuskierig oor wie Jesus regtig is' },
];

const outcomes = [
  { title: 'Vrede in jou hart', text: 'Soos baie ander, kan jy ’n diep rus ervaar wat die wêreld nie kan gee nie.' },
  { title: 'Antwoorde op jou vrae', text: 'Ontdek dat geloof nie blinde aanvaarding is nie, maar ’n reis van ontdekking.' },
  { title: 'Egte verbintenis', text: 'Vind ’n gemeenskap wat jou aanvaar net soos jy is, sonder oordeel.' },
  { title: ’n Nuwe begin', text: 'Dit maak nie saak waar jy vandaan kom nie, by Jesus is daar altyd plek vir jou.' },
];

const Afrika = () => {
  return (
    <>
      <Helmet>
        <title>Jesus Vandag, ontdek wie Jesus regtig is</title>
        <meta
          name="description"
          content="Egte stories van mense soos jy. Ontdek wat geloof in Jesus kan doen, in Suid-Afrika vandag."
        />
        <link rel="canonical" href="https://jesustoday.nl/afrika" />
      </Helmet>

      <Header />

      <main className="overflow-hidden">
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-anthracite pt-20">
          <div className="absolute inset-0">
            <iframe
              src="https://player.vimeo.com/video/947358616?background=1&autoplay=1&loop=1&muted=1&controls=0"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '177.78vh',
                height: '100vh',
                minWidth: '100%',
                minHeight: '56.25vw',
              }}
              frameBorder="0"
              allow="autoplay; fullscreen"
              title="Jesus Vandag Hero"
            />
            <div className="absolute inset-0 bg-anthracite/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-anthracite/40 via-transparent to-anthracite" />
          </div>

          <div className="relative z-10 container mx-auto px-6 py-20 text-center">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-warm-white leading-tight">
                Egte stories van mense soos jy.{' '}
                <span className="text-gold">Ontdek wat geloof kan doen.</span>
              </h1>
              <p className="text-lg md:text-xl text-warm-white/90 max-w-2xl mx-auto leading-relaxed">
                Of jy nou antwoorde, vrede of rigting soek, luister na mense wat dieselfde gevoel het, en sien hoe ’n ontmoeting met Jesus hulle lewens verander het.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                <Button asChild variant="hero" size="lg" className="min-w-[220px]">
                  <Link to="/getuigenissen">
                    <Play className="w-5 h-5" />
                    Kyk getuienisse
                  </Link>
                </Button>
                <Button asChild variant="hero-outline" size="lg" className="gap-2">
                  <a href="#vra-jou-vraag">
                    <ArrowRight className="w-5 h-5" />
                    Vra jou vraag
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Herken je dit */}
        <section className="py-24 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-anthracite mb-8">
                  Dalk herken jy dit?
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg md:text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                  Jy is nie alleen met hierdie vrae nie. Baie mense voor jou het presies daar begin waar jy nou staan.
                </p>
              </ScrollReveal>
              <div className="grid sm:grid-cols-2 gap-6">
                {points.map((point, index) => (
                  <ScrollReveal key={index} delay={150 + index * 100}>
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                        <point.icon className="w-6 h-6 text-gold" />
                      </div>
                      <p className="text-foreground font-medium leading-relaxed">{point.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-24 bg-anthracite text-warm-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Wat kan jy <span className="text-gold">ontdek</span>?
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg md:text-xl text-warm-white/80 mb-12 max-w-2xl mx-auto">
                  Hierdie reis is uniek vir elke mens, maar daar is dinge wat baie mense ervaar.
                </p>
              </ScrollReveal>
              <div className="grid sm:grid-cols-2 gap-6 text-left">
                {outcomes.map((o, i) => (
                  <ScrollReveal key={i} delay={150 + i * 100}>
                    <div className="p-6 rounded-2xl bg-warm-white/5 border border-warm-white/10 hover:border-gold/40 transition-all duration-300">
                      <h3 className="text-xl font-bold text-gold mb-2">{o.title}</h3>
                      <p className="text-warm-white/80 leading-relaxed">{o.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Volgende stappen */}
        <section className="py-24 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-6">
                  Klaar vir die <span className="text-gold">volgende stap</span>?
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Jy hoef nie alles dadelik uit te vind nie. Begin met een klein stap.
                </p>
              </ScrollReveal>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { icon: Play, title: 'Kyk ’n getuienis', text: 'Hoor hoe ander dit ervaar het.' },
                  { icon: Compass, title: 'Verken die Bybel', text: 'Begin by die evangelie van Johannes.' },
                  { icon: MessageCircle, title: 'Praat met iemand', text: 'Stel jou vraag, sonder oordeel.' },
                ].map((step, i) => (
                  <ScrollReveal key={i} delay={150 + i * 100}>
                    <div className="p-6 rounded-2xl bg-background border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 text-left">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                        <step.icon className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="text-lg font-bold text-anthracite mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vra jou vraag */}
        <section id="vra-jou-vraag" className="py-24 bg-anthracite text-warm-white">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Het jy ’n <span className="text-gold">vraag</span>?
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-warm-white/80">
                  Daar is geen verkeerde vrae nie. Stuur jou vraag en iemand sal persoonlik antwoord, in vertroue.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Button variant="hero" size="lg">
                  <MessageCircle className="w-5 h-5" />
                  Stel jou vraag
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Afrika;
