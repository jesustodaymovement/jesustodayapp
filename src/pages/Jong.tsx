import { Helmet } from 'react-helmet-async';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Sparkles,
  MessageCircle,
  Compass,
  Users,
  Send,
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/sections/Footer';
import videoAuke from '@/assets/video-auke.png';
import videoYannick from '@/assets/video-yannick.png';
import videoGregory from '@/assets/video-gregory.png';
import videoJinke from '@/assets/video-jinke.png';
import logo from '@/assets/jesus-today-logo.png';

/* ──────────────────────────────────────────────────────────
   Reusable bits
   ────────────────────────────────────────────────────────── */

const NoiseOverlay = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
    }}
  />
);

const Reveal = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out will-change-transform ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

/* ──────────────────────────────────────────────────────────
   Header (light, premium)
   ────────────────────────────────────────────────────────── */

const HeaderJong = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener('scroll', f);
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/80 backdrop-blur-xl border-b border-anthracite/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Jesus Today" className="h-9 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-anthracite/70">
            <a href="#verhalen" className="hover:text-anthracite transition-colors">Verhalen</a>
            <a href="#ontdekken" className="hover:text-anthracite transition-colors">Ontdekken</a>
            <a href="#vraag" className="hover:text-anthracite transition-colors">Stel je vraag</a>
            <a href="#stappen" className="hover:text-anthracite transition-colors">Volgende stap</a>
          </nav>
          <Button variant="hero" size="default" className="hidden md:inline-flex">
            Upload jouw getuigenis
          </Button>
        </div>
      </div>
    </header>
  );
};

/* ──────────────────────────────────────────────────────────
   Hero — editorial, oversized
   ────────────────────────────────────────────────────────── */

const HeroJong = () => {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  return (
    <section
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setMouse({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      className="relative min-h-screen pt-32 pb-16 bg-cream overflow-hidden"
    >
      {/* gradient mesh blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-60 animate-blob"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, hsl(45 93% 75% / 0.55), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-50 animate-blob"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, hsl(40 60% 88% / 0.9), transparent 60%)',
          animationDelay: '4s',
        }}
      />
      {/* cursor spotlight */}
      <div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, hsl(45 93% 65% / 0.18), transparent 70%)`,
        }}
      />
      <NoiseOverlay />

      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          {/* LEFT: oversized headline */}
          <div className="lg:col-span-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anthracite/5 border border-anthracite/10 text-xs uppercase tracking-[0.2em] text-anthracite/70 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                Echte verhalen, geen preek
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-heading font-extrabold text-anthracite leading-[0.85] tracking-[-0.04em] text-[clamp(3.5rem,11vw,11rem)]">
                ontdek
                <br />
                <span className="italic font-light relative">
                  wie
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gold/70 -z-10 rounded-sm" />
                </span>{' '}
                <span className="text-anthracite">jezus</span>
                <br />
                <span className="text-anthracite/30">echt is.</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Button variant="hero" size="lg" className="rounded-full px-8">
                  Bekijk de verhalen
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <a
                  href="#vraag"
                  className="group inline-flex items-center gap-2 text-anthracite font-medium"
                >
                  <span className="relative">
                    Stel je vraag anoniem
                    <span className="absolute left-0 -bottom-1 h-px w-full bg-anthracite origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: portrait collage */}
          <div className="lg:col-span-4 relative h-[28rem] lg:h-[34rem]">
            <Reveal delay={300}>
              <div className="absolute top-0 right-8 w-44 h-60 rounded-3xl overflow-hidden shadow-card rotate-3 hover:rotate-0 transition-transform duration-700">
                <img src={videoAuke} alt="" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={420}>
              <div className="absolute top-24 left-0 w-52 h-72 rounded-3xl overflow-hidden shadow-card -rotate-6 hover:rotate-0 transition-transform duration-700">
                <img src={videoJinke} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-end p-4">
                  <div className="w-10 h-10 rounded-full bg-cream/95 flex items-center justify-center">
                    <Play className="w-4 h-4 text-anthracite fill-anthracite" />
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={540}>
              <div className="absolute bottom-0 right-0 w-40 h-52 rounded-3xl overflow-hidden shadow-card rotate-6 hover:rotate-0 transition-transform duration-700">
                <img src={videoYannick} alt="" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            {/* floating quote chip */}
            <Reveal delay={660}>
              <div className="absolute -bottom-6 left-4 max-w-[15rem] px-4 py-3 rounded-2xl bg-anthracite text-warm-white shadow-card">
                <div className="text-[10px] uppercase tracking-widest text-gold mb-1">net gepost</div>
                <div className="text-sm leading-snug">
                  "Ik wist niet dat rust zo dichtbij kon zijn."
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* bottom meta strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-anthracite/10 pt-8">
          {[
            ['250+', 'echte verhalen'],
            ['16-29', 'door en voor'],
            ['100%', 'geen druk'],
            ['NL', 'gemaakt in Nederland'],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="font-heading font-extrabold text-3xl md:text-4xl text-anthracite tracking-tight">
                {k}
              </div>
              <div className="text-sm text-anthracite/60">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────
   Marquee — kernwoorden
   ────────────────────────────────────────────────────────── */

const MarqueeJong = () => {
  const words = [
    'rust', 'vergeving', 'hoop', 'echt', 'twijfel mag', 'liefde',
    'identiteit', 'vrijheid', 'nieuw begin', 'jezus', 'samen', 'licht',
  ];
  const row = [...words, ...words];
  return (
    <section className="py-12 bg-anthracite overflow-hidden border-y border-warm-white/5">
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {row.map((w, i) => (
          <span
            key={i}
            className="font-heading font-extrabold text-[clamp(2.5rem,7vw,6rem)] leading-none tracking-tight"
          >
            <span className={i % 3 === 0 ? 'text-gold' : 'text-warm-white'}>{w}</span>
            <span className="text-warm-white/30 mx-6">,</span>
          </span>
        ))}
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────
   Bento — "Misschien herken je dit"
   ────────────────────────────────────────────────────────── */

const RecognizeJong = () => {
  const cards = [
    {
      span: 'md:col-span-2 md:row-span-2 bg-anthracite text-warm-white',
      eyebrow: '01',
      title: 'Je voelt iets, maar weet niet wat.',
      body: 'Een leegte tussen alle berichten door. Een vraag die blijft hangen.',
      tag: 'echt',
    },
    {
      span: 'md:col-span-2 bg-gold text-anthracite',
      eyebrow: '02',
      title: 'Geloof? Ja, maar hoe dan.',
      body: 'Je kent de woorden, niet de weg. Dat is okē.',
      tag: 'zoeken',
    },
    {
      span: 'bg-warm-white text-anthracite border border-anthracite/10',
      eyebrow: '03',
      title: 'Te veel meningen.',
      body: 'Hier vind je verhalen, geen oordeel.',
      tag: 'vrij',
    },
    {
      span: 'bg-cream text-anthracite border border-anthracite/10',
      eyebrow: '04',
      title: 'Je bent nieuwsgierig.',
      body: 'Naar wie Jezus is, voor jou. Niet voor je oma.',
      tag: 'nu',
    },
  ];
  return (
    <section className="relative py-32 bg-cream overflow-hidden">
      <NoiseOverlay />
      <div className="relative container mx-auto px-6">
        <div className="max-w-5xl mb-16">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.3em] text-anthracite/60 mb-6">
              Misschien herken je dit
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-heading font-extrabold text-anthracite leading-[0.95] tracking-[-0.03em] text-[clamp(2.5rem,6vw,5rem)]">
              Niet de enige.
              <br />
              <span className="text-anthracite/40">Nooit geweest.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 auto-rows-fr">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 100} className={`${c.span} group rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[14rem] hover:-translate-y-1 transition-transform duration-500`}>
              <div className="flex items-start justify-between">
                <div className="text-xs font-mono opacity-60">{c.eyebrow}</div>
                <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border border-current/30 opacity-70">
                  {c.tag}
                </span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl leading-tight tracking-tight mb-3">
                  {c.title}
                </h3>
                <p className="text-base opacity-80 leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────
   Editorial quote
   ────────────────────────────────────────────────────────── */

const QuoteJong = () => (
  <section className="relative py-32 bg-warm-white overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute -top-16 -left-4 md:-left-12 font-heading font-extrabold text-gold/40 leading-none select-none text-[14rem] md:text-[22rem]">
          ”
        </div>
        <Reveal>
          <blockquote className="relative font-heading font-light text-anthracite leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,5vw,4.5rem)]">
            Ik dacht altijd dat geloof iets was voor{' '}
            <span className="italic text-anthracite/50">anderen</span>. Tot
            iemand zijn verhaal deelde, en het{' '}
            <span className="bg-gold/60 px-2 box-decoration-clone">precies
            over mij ging.</span>
          </blockquote>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={videoGregory} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-semibold text-anthracite">Gregory, 24</div>
              <div className="text-sm text-anthracite/60">Rotterdam</div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ──────────────────────────────────────────────────────────
   Video testimonies — portrait carousel
   ────────────────────────────────────────────────────────── */

const stories = [
  { name: 'Auke', age: 22, image: videoAuke, topic: 'twijfel', quote: 'Van zoeken naar zien.' },
  { name: 'Jinke', age: 19, image: videoJinke, topic: 'identiteit', quote: 'Ik mocht zijn wie ik ben.' },
  { name: 'Yannick', age: 27, image: videoYannick, topic: 'vrijheid', quote: 'Eindelijk lucht.' },
  { name: 'Gregory', age: 24, image: videoGregory, topic: 'nieuw begin', quote: 'Een tweede kans, echt.' },
  { name: 'Auke', age: 22, image: videoAuke, topic: 'rust', quote: 'Rust die ik niet kende.' },
];

const TestimoniesJong = () => {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true });
  return (
    <section id="verhalen" className="relative py-32 bg-cream overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div className="max-w-2xl">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.3em] text-anthracite/60 mb-6">
                Verhalen / 16-29
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-heading font-extrabold text-anthracite leading-[0.95] tracking-[-0.03em] text-[clamp(2.5rem,6vw,5rem)]">
                Mensen <span className="italic font-light">zoals jij.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => embla?.scrollPrev()}
                className="w-12 h-12 rounded-full border border-anthracite/15 text-anthracite hover:bg-anthracite hover:text-cream transition-all"
                aria-label="Vorige"
              >
                ←
              </button>
              <button
                onClick={() => embla?.scrollNext()}
                className="w-12 h-12 rounded-full bg-anthracite text-cream hover:bg-gold hover:text-anthracite transition-all"
                aria-label="Volgende"
              >
                →
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6 pl-6 md:pl-[calc((100vw-1200px)/2+1.5rem)]">
          {stories.map((s, i) => (
            <div
              key={i}
              className="group relative shrink-0 w-[78vw] sm:w-[22rem] aspect-[3/4] rounded-3xl overflow-hidden shadow-card cursor-pointer"
            >
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-cream/90 text-anthracite font-semibold">
                  {s.topic}
                </span>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gold flex items-center justify-center transition-transform group-hover:scale-110">
                <Play className="w-5 h-5 text-anthracite fill-anthracite" />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6 text-warm-white">
                <div className="text-sm text-warm-white/70 mb-2">
                  {s.name}, {s.age}
                </div>
                <div className="font-heading font-bold text-xl leading-tight">
                  "{s.quote}"
                </div>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-6" />
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────
   Outcomes — sticky-ish steps
   ────────────────────────────────────────────────────────── */

const OutcomesJong = () => {
  const items = [
    {
      n: '01',
      t: 'Kijk',
      d: 'Bekijk verhalen. Geen agenda, geen druk. Gewoon mensen die delen wat er met ze gebeurde.',
    },
    {
      n: '02',
      t: 'Stel vragen',
      d: 'Anoniem als je dat wil. Een echte gesprekspartner, geen bot, geen oordeel.',
    },
    {
      n: '03',
      t: 'Ontdek zelf',
      d: 'Een eerste stap, hoe klein ook. Een bijbel-app, een Alpha, een kerk bij jou. Jij beslist.',
    },
  ];
  return (
    <section id="ontdekken" className="relative py-32 bg-warm-white overflow-hidden">
      <NoiseOverlay />
      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.3em] text-anthracite/60 mb-6">
                Hoe het werkt
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-heading font-extrabold text-anthracite leading-[0.95] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,4rem)]">
                Drie stappen.{' '}
                <span className="text-anthracite/40">Nul druk.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-anthracite/70 max-w-md leading-relaxed">
                Geen funnel, geen verkooppraatje. Je bepaalt zelf hoe ver je gaat en wanneer je stopt.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8 space-y-6">
            {items.map((it, i) => (
              <Reveal key={it.n} delay={i * 120}>
                <div className="group relative p-8 md:p-12 rounded-3xl bg-cream border border-anthracite/10 hover:border-gold transition-all duration-500 hover:shadow-card">
                  <div className="flex items-start gap-8">
                    <div className="font-heading font-extrabold text-gold/80 leading-none text-6xl md:text-7xl tracking-tight">
                      {it.n}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-anthracite text-3xl md:text-4xl mb-3 tracking-tight">
                        {it.t}
                      </h3>
                      <p className="text-anthracite/70 text-lg leading-relaxed max-w-xl">
                        {it.d}
                      </p>
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-anthracite/30 group-hover:text-anthracite group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────
   Ask question
   ────────────────────────────────────────────────────────── */

const AskJong = () => {
  return (
    <section id="vraag" className="py-32 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto relative">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-anthracite text-warm-white p-10 md:p-16">
              <div
                aria-hidden
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-40"
                style={{
                  background:
                    'radial-gradient(circle, hsl(45 93% 65% / 0.7), transparent 60%)',
                }}
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warm-white/10 text-xs uppercase tracking-widest mb-6">
                  <MessageCircle className="w-3.5 h-3.5 text-gold" />
                  Stel je vraag
                </div>
                <h2 className="font-heading font-extrabold leading-[0.95] tracking-[-0.03em] text-[clamp(2rem,5vw,4rem)] mb-8">
                  Iets dat je <span className="text-gold">altijd al</span> wilde vragen?
                </h2>
                <p className="text-warm-white/70 max-w-2xl mb-10 text-lg leading-relaxed">
                  Anoniem als je wil. Iemand leest mee en stuurt je een eerlijk antwoord. Geen preek, geen mailinglijst.
                </p>
                <form
                  className="flex flex-col sm:flex-row gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    placeholder="bijv. waarom zou ik bidden als ik niet eens geloof?"
                    className="flex-1 bg-warm-white/5 border border-warm-white/15 rounded-full px-6 py-4 text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-gold transition-colors"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gold text-anthracite font-bold hover:bg-gold-hover transition-colors"
                  >
                    Verstuur
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="mt-6 text-xs text-warm-white/40">
                  Reactietijd: meestal binnen 24 uur. Geen verplichting.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────
   Next steps — bento 3
   ────────────────────────────────────────────────────────── */

const NextStepsJong = () => {
  const steps = [
    {
      icon: Compass,
      title: 'Bekijk meer verhalen',
      desc: 'Honderden mensen, één plek.',
      cta: 'Naar de verhalen',
      href: '/getuigenissen',
      external: false,
      tone: 'bg-cream text-anthracite border-anthracite/10',
    },
    {
      icon: Sparkles,
      title: 'Volg een Alpha',
      desc: 'Vrijblijvend, met vragen welkom.',
      cta: 'Vind een Alpha',
      href: 'https://www.alpha-cursus.nl',
      external: true,
      tone: 'bg-gold text-anthracite border-transparent',
    },
    {
      icon: Users,
      title: 'Een plek dichtbij',
      desc: 'Ontmoet mensen die het leven.',
      cta: 'Zoek een kerk',
      href: 'https://www.kerkbuurt.nl',
      external: true,
      tone: 'bg-anthracite text-warm-white border-transparent',
    },
  ];
  return (
    <section id="stappen" className="py-32 bg-warm-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.3em] text-anthracite/60 mb-6">
              Volgende stap
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-heading font-extrabold text-anthracite leading-[0.95] tracking-[-0.03em] text-[clamp(2.5rem,6vw,5rem)]">
              Klein begin,{' '}
              <span className="italic font-light text-anthracite/50">grote ruimte.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => {
            const Wrap = (props: React.PropsWithChildren<{ className?: string }>) =>
              s.external ? (
                <a href={s.href} target="_blank" rel="noopener noreferrer" {...props} />
              ) : (
                <Link to={s.href} {...props} />
              );
            return (
              <Reveal key={s.title} delay={i * 120}>
                <Wrap className={`group block rounded-3xl border p-8 md:p-10 h-full ${s.tone} hover:-translate-y-1 transition-transform duration-500`}>
                  <div className="flex items-center justify-between mb-12">
                    <div className="w-12 h-12 rounded-2xl bg-current/10 flex items-center justify-center">
                      <s.icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl md:text-3xl leading-tight mb-3 tracking-tight">
                    {s.title}
                  </h3>
                  <p className="opacity-70 mb-8">{s.desc}</p>
                  <div className="font-semibold underline underline-offset-4 decoration-2">
                    {s.cta}
                  </div>
                </Wrap>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────
   Final CTA
   ────────────────────────────────────────────────────────── */

const FinalCTAJong = () => (
  <section className="relative py-40 bg-cream overflow-hidden">
    <div
      aria-hidden
      className="absolute inset-0 opacity-60"
      style={{
        background:
          'radial-gradient(ellipse at center, hsl(45 93% 75% / 0.5), transparent 60%)',
      }}
    />
    <NoiseOverlay />
    <div className="relative container mx-auto px-6 text-center">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.3em] text-anthracite/60 mb-8">
          Of jij dat ene verhaal bent
        </div>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="font-heading font-extrabold text-anthracite leading-[0.85] tracking-[-0.04em] text-[clamp(3rem,10vw,9rem)] max-w-5xl mx-auto">
          Deel <span className="italic font-light">jouw</span> verhaal.
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-8 text-anthracite/70 max-w-xl mx-auto text-lg leading-relaxed">
          Eén iemand wacht op precies jouw zinnen. Geen perfecte camera nodig.
        </p>
      </Reveal>
      <Reveal delay={300}>
        <div className="mt-12">
          <Button variant="hero" size="xl" className="rounded-full px-10">
            Upload jouw getuigenis
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ──────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────── */

const Jong = () => {
  return (
    <>
      <Helmet>
        <title>Jong | Jesus Today, echte verhalen voor jouw generatie</title>
        <meta
          name="description"
          content="Voor 16-29: ontdek wie Jezus echt is via eerlijke verhalen van mensen zoals jij. Geen druk, geen preek, gewoon ruimte voor jouw vragen."
        />
        <link rel="canonical" href="https://jesustoday.nl/jong" />
      </Helmet>
      <HeaderJong />
      <main className="overflow-hidden bg-cream">
        <HeroJong />
        <MarqueeJong />
        <RecognizeJong />
        <QuoteJong />
        <TestimoniesJong />
        <OutcomesJong />
        <AskJong />
        <NextStepsJong />
        <FinalCTAJong />
        <Footer />
      </main>
    </>
  );
};

export default Jong;
