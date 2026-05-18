import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Newspaper, Radio, Video, ExternalLink } from 'lucide-react';

const mediaItems = [
  {
    type: 'TV',
    icon: Video,
    outlet: 'VPRO Tegenlicht',
    title: 'JesusToday in Tegenlicht',
    description:
      'In de documentaire van VPRO Tegenlicht komt JesusToday aan bod als voorbeeld van hoe geloof in Nederland op nieuwe manieren gedeeld wordt.',
    href: 'https://www.youtube.com/watch?v=fhIZR5INDX8&t=2s',
    cta: 'Bekijk op YouTube',
  },
  {
    type: 'Online',
    icon: Newspaper,
    outlet: 'EO',
    title: 'De app JesusToday helpt je je geloof te delen',
    description:
      'De Evangelische Omroep schrijft over de app JesusToday en hoe gewone mensen op een laagdrempelige manier hun verhaal met Jezus delen.',
    href: 'https://www.eo.nl/artikel/de-app-jesus-today-helpt-je-je-geloof-te-delen',
    cta: 'Lees het artikel',
  },
  {
    type: 'Radio',
    icon: Radio,
    outlet: 'NPO Radio 5, Thuis op 5',
    title: 'Alexander Keur over JesusToday',
    description:
      'Op NPO Radio 5 is oprichter Alexander Keur geïnterviewd over JesusToday en de app: getuigen van je geloof, nu ook via je telefoon.',
    href: 'https://www.nporadio5.nl/fragmenten/thuisop5/63290b99-68e7-4418-9bdb-4519e62349ca/2023-02-05-getuigen-van-je-geloof-nu-ook-via-de-app',
    cta: 'Luister het fragment',
  },
];

const Hero = () => (
  <section className="relative pt-24 pb-0 bg-anthracite overflow-hidden">
    <div className="relative w-full aspect-video max-h-[70vh] overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/fhIZR5INDX8?autoplay=1&mute=1&loop=1&playlist=fhIZR5INDX8&controls=0&showinfo=0&modestbranding=1&rel=0&start=2"
        title="JesusToday in VPRO Tegenlicht"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="absolute inset-0 w-full h-full pointer-events-none"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-anthracite/40 via-anthracite/30 to-anthracite" aria-hidden />
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-6 pb-12 md:pb-20">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6 backdrop-blur-sm">
                <Newspaper className="w-4 h-4 text-gold" />
                <span className="text-warm-white text-sm font-medium">Pers & media</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-white leading-tight">
                JesusToday <span className="text-gold">in de media.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-lg md:text-xl text-warm-white/80 leading-relaxed mt-6 max-w-2xl">
                Van landelijke televisie tot radio en online artikelen, ontdek
                waar JesusToday in beeld komt en hoe gewone mensen hun verhaal
                delen.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MediaGrid = () => (
  <section className="py-24 bg-cream">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-anthracite mb-4 text-center">
            Nieuws & <span className="text-gold">media</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Een overzicht van publicaties en uitzendingen waarin JesusToday is
            besproken.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:gap-8">
          {mediaItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.href} delay={idx * 100}>
                <article className="group bg-warm-white border border-anthracite/10 rounded-2xl p-6 md:p-8 hover:border-gold/40 hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-gold" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 text-sm">
                        <span className="px-2.5 py-0.5 rounded-full bg-anthracite/5 text-anthracite/70 font-medium">
                          {item.type}
                        </span>
                        <span className="text-muted-foreground">{item.outlet}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-anthracite mb-3 group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-5">
                        {item.description}
                      </p>
                      <Button asChild variant="outline" size="sm">
                        <a href={item.href} target="_blank" rel="noopener noreferrer">
                          {item.cta}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

const PressCTA = () => (
  <section className="py-20 bg-anthracite">
    <div className="container mx-auto px-6">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-warm-white mb-4">
            Pers <span className="text-gold">vragen?</span>
          </h2>
          <p className="text-warm-white/80 leading-relaxed mb-8">
            Werk je aan een artikel, podcast of uitzending over geloof,
            verhalen of JesusToday? We denken graag met je mee.
          </p>
          <Button asChild variant="hero" size="lg">
            <a href="mailto:info@jesustoday.nl">Neem contact op</a>
          </Button>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const Media = () => (
  <>
    <Helmet>
      <title>JesusToday in de media, pers & publicaties</title>
      <meta
        name="description"
        content="JesusToday in de media: VPRO Tegenlicht, EO en NPO Radio 5 over de app en de verhalen van gewone mensen."
      />
      <meta property="og:title" content="JesusToday in de media, pers en publicaties" />
      <meta property="og:description" content="JesusToday in de media: VPRO Tegenlicht, EO en NPO Radio 5 over de app en de verhalen van gewone mensen." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://storybrand-share-grace.lovable.app/media" />

      <link rel="canonical" href="https://storybrand-share-grace.lovable.app/media" />
      <meta name="twitter:title" content="JesusToday in de media" />
      <meta name="twitter:description" content="JesusToday in de media: VPRO Tegenlicht, EO en NPO Radio 5." />
    </Helmet>
    <Header />
    <main>
      <Hero />
      <MediaGrid />
      <PressCTA />
    </main>
    <Footer />
  </>
);

export default Media;