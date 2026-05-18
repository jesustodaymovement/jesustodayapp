import { ArrowRight } from "lucide-react";
import hero from "@/assets/test23-hero.jpg";
import crowd from "@/assets/test23-crowd.jpg";

const GOLD = "#fad150";
const RED = "#e63946";

const ArrowCircle = ({ size = 24, color = GOLD }: { size?: number; color?: string }) => (
  <span
    className="inline-flex items-center justify-center rounded-full border-2"
    style={{ borderColor: color, color, width: size, height: size }}
    aria-hidden
  >
    <ArrowRight size={Math.round(size * 0.5)} strokeWidth={2.5} />
  </span>
);

const Marquee = ({
  text,
  bg = "#fff",
  fg = GOLD,
  speed = 30,
  withArrow = true,
}: {
  text: string;
  bg?: string;
  fg?: string;
  speed?: number;
  withArrow?: boolean;
}) => (
  <div className="w-full overflow-hidden py-4" style={{ background: bg }}>
    <div
      className="flex whitespace-nowrap"
      style={{ animation: `marquee ${speed}s linear infinite` }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="mx-6 inline-flex items-center gap-4 text-sm font-bold tracking-[0.25em]"
          style={{ color: fg, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {text}
          {withArrow && <ArrowCircle size={28} color={fg} />}
        </span>
      ))}
    </div>
  </div>
);

const events = [
  { date: "23 MEI", city: "BIDDINGHUIZEN", desc: "THE GATHERING @ Youth.Opwekking", cta: "GEEN TICKETVERKOOP!" },
  { date: "7 JUNI", city: "NIGHT, ZEELAND", desc: "Regionale samenwerking van kerken in Vlissingen, Terneuzen, Goes en Middelburg", cta: "BOEK JE TICKETS" },
  { date: "13 JUNI", city: "NIGHT, ACHTERHOEK", desc: "Interkerkelijke samenwerking uit de Achterhoek", cta: "BOEK JE TICKETS" },
  { date: "21 JUNI", city: "NIGHT, DRENTHE", desc: "Regionale samenwerking van kerken in Assen, Hoogeveen en Emmen", cta: "BOEK JE TICKETS" },
];

const Test23 = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-white/5">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-5">
          <a href="/" className="flex items-center gap-3 font-black tracking-wider" style={{ color: GOLD }}>
            <span className="text-xl">JESUS TODAY</span>
            <ArrowCircle size={28} />
          </a>
          <nav className="hidden gap-12 text-xs font-bold tracking-[0.25em] text-white md:flex">
            <a href="#events" className="hover:text-[color:var(--g)]" style={{ ["--g" as any]: GOLD }}>EVENTS ▾</a>
            <a href="#missie">WAT IS HET ▾</a>
            <a href="#kerken">KERKEN & LEIDERS ▾</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="rounded-sm border-2 px-5 py-2 text-xs font-bold tracking-[0.2em] underline-offset-2 hover:underline"
              style={{ borderColor: "#fff", color: RED }}
            >
              DONEER
            </a>
            <a
              href="#"
              className="rounded-sm border-2 px-5 py-2 text-xs font-bold tracking-[0.2em] underline"
              style={{ background: RED, borderColor: RED, color: "#fff" }}
            >
              UPLOAD GETUIGENIS
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-[80vh] lg:h-[88vh] overflow-hidden">
          <img src={hero} alt="Jongeren met opgeheven handen" className="h-full w-full object-cover" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-xs font-bold tracking-[0.3em]" style={{ color: GOLD }}>SCOOR JE TICKETS</p>
            <h1 className="mt-2 text-4xl md:text-6xl font-black leading-none">JESUS TODAY NL 2026</h1>
            <p className="mt-2 text-sm font-mono tracking-wider" style={{ color: GOLD }}>[ ALL,IN FOR JESUS ]</p>
          </div>
        </div>
        <div className="relative flex items-center justify-center bg-white text-black px-8 py-20">
          <div className="text-center max-w-md">
            <p className="text-sm font-bold tracking-wider">VIND EEN EVENT BIJ JOU IN DE BUURT</p>
            <p className="text-sm font-bold tracking-wider mb-12">KOM SAMEN!</p>
            <div className="flex justify-center">
              <button
                className="flex items-center justify-center rounded-full border-[3px] border-black hover:bg-black hover:text-white transition"
                style={{ width: 140, height: 140 }}
                aria-label="Bekijk events"
              >
                <ArrowRight size={56} strokeWidth={2} />
              </button>
            </div>
            <div className="mt-16 space-y-3">
              <a href="#events" className="block w-full border-2 border-black py-4 text-xs font-bold tracking-[0.25em] hover:bg-black hover:text-white transition">
                BEKIJK EVENTS
              </a>
              <a href="#" className="block w-full bg-black text-white py-4 text-xs font-bold tracking-[0.25em] hover:opacity-90 transition">
                AANKOMENDE EVENTS
              </a>
            </div>
          </div>
        </div>

        {/* Marquee strip across hero bottom */}
        <div className="col-span-full">
          <Marquee text="NEDERLAND" bg="#fff" fg={GOLD} />
        </div>
      </section>

      {/* Missie */}
      <section id="missie" className="bg-black px-8 py-32">
        <div className="mx-auto max-w-[1500px]">
          <p className="mb-12 font-mono text-xs tracking-[0.3em] text-white/60">// DE MISSIE VAN JESUS TODAY</p>
          <h2
            className="font-black uppercase leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7.5rem)", fontFamily: "'Poppins', sans-serif" }}
          >
            WIJ KOMEN SAMEN <span className="inline-flex items-center align-middle mx-2 h-[0.7em] w-[1.4em] overflow-hidden rounded-md">
              <img src={crowd} alt="" className="h-full w-full object-cover" loading="lazy" />
            </span> ALS ANTWOORD OP HET VERLANGEN VAN ONZE{" "}
            <span className="inline-flex items-center align-middle mx-2"><ArrowCircle size={Math.round(80)} /></span> GENERATIE
            <span className="inline-flex items-center align-middle ml-2 h-[0.7em] w-[1.1em] overflow-hidden rounded-md">
              <img src={crowd} alt="" className="h-full w-full object-cover" loading="lazy" />
            </span>
          </h2>
          <p
            className="mt-16 max-w-3xl text-base md:text-lg leading-loose text-white/85"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Wat is jouw reactie? Jesus Today bestaat om een generatie samen te brengen en te activeren in hun roeping, zodat iedereen op elke school, universiteit, in elke buurt en elk land wereldwijd het evangelie hoort. Wat is jouw reactie?
          </p>
        </div>
      </section>

      {/* Upcoming events, yellow */}
      <section id="events" className="relative px-8 py-28" style={{ background: GOLD }}>
        <div className="mx-auto max-w-[1400px]">
          <h2
            className="text-center font-black uppercase leading-none mb-20"
            style={{ fontSize: "clamp(3rem, 9vw, 9rem)", color: RED, fontFamily: "'Poppins', sans-serif" }}
          >
            UPCOMING EVENTS
          </h2>

          <div className="relative">
            {/* center line */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-black/80" />

            <div className="space-y-16">
              {events.map((e, i) => {
                const left = i % 2 === 0;
                return (
                  <div key={i} className="grid grid-cols-2 items-center gap-12">
                    <div className={left ? "" : "order-2"}>
                      {left && (
                        <div className="ml-auto max-w-md rounded-md bg-white p-8 text-center shadow-[8px_8px_0_rgba(0,0,0,0.15)]">
                          <h3 className="text-xl font-black tracking-wide">{e.city}</h3>
                          <p className="mt-3 text-xs font-mono tracking-wider text-black/70">{e.desc}</p>
                          <button className="mt-6 inline-block px-5 py-2 text-xs font-bold tracking-[0.2em]" style={{ background: GOLD, color: "#000" }}>
                            {e.cta}
                          </button>
                        </div>
                      )}
                      {!left && (
                        <p className="ml-auto text-right text-3xl md:text-4xl font-black" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{e.date}</p>
                      )}
                    </div>
                    <div className={left ? "" : "order-1"}>
                      {left && (
                        <p className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{e.date}</p>
                      )}
                      {!left && (
                        <div className="mr-auto max-w-md rounded-md bg-white p-8 text-center shadow-[8px_8px_0_rgba(0,0,0,0.15)]">
                          <h3 className="text-xl font-black tracking-wide">{e.city}</h3>
                          <p className="mt-3 text-xs font-mono tracking-wider text-black/70">{e.desc}</p>
                          <button className="mt-6 inline-block px-5 py-2 text-xs font-bold tracking-[0.2em]" style={{ background: GOLD, color: "#000" }}>
                            {e.cta}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-24 flex justify-center">
            <button
              className="rounded-md border-[3px] px-10 py-5 text-sm font-black tracking-[0.25em]"
              style={{ borderColor: RED, color: RED, background: "transparent" }}
            >
              KRIJG EXCLUSIEVE UPDATES IN ONZE WHATSAPP GROEP
            </button>
          </div>
        </div>
      </section>

      {/* Waitlist black section */}
      <section className="bg-black px-8 py-28">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-white/60 mb-6">// JOIN THE WAITLIST</p>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              JESUS TODAY<br />NEDERLAND '26
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-8 font-mono text-xs tracking-wider">
              <div>
                <p className="text-white/50 mb-2">DATUM</p>
                <p className="text-base font-bold">24 OKTOBER '26</p>
              </div>
              <div>
                <p className="text-white/50 mb-2">LOCATIE</p>
                <p className="text-base font-bold">JAARBEURS UTRECHT</p>
              </div>
            </div>
            <div className="mt-12 space-y-4 max-w-lg font-mono text-sm text-white/80 leading-loose">
              <p>Dit is het moment waar alles samenkomt. Waar onze generatie samenkomt. Duizenden jongeren. Eén dag om actie te geven aan onze "JA".</p>
              <p>Geen event om simpel bij te zijn. Dit is een dag om concrete vervolgstappen te zetten in jouw roeping, in Zijn missie!</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#" className="border-2 border-white px-8 py-3 text-xs font-bold tracking-[0.25em]" style={{ color: GOLD, borderColor: GOLD }}>
                SCOOR JE TICKETS
              </a>
              <a href="#" className="border-2 border-white px-8 py-3 text-xs font-bold tracking-[0.25em]" style={{ color: GOLD, borderColor: GOLD }}>
                MEER INFORMATIE
              </a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-sm">
            <img src={crowd} alt="Volle hal met aanbidders" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Red marquee */}
      <div className="py-2" style={{ background: RED }}>
        <div className="overflow-hidden">
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="mx-8 text-2xl md:text-4xl font-black tracking-wider"
                style={{ color: GOLD, fontFamily: "'Poppins', sans-serif" }}
              >
                WHAT'S YOUR RESPONSE? &nbsp;•&nbsp; ALL,IN FOR JESUS &nbsp;•&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black px-8 py-12 text-center text-xs tracking-wider text-white/60">
        <p>
          Website door{" "}
          <a href="https://shoopshoop.nl" className="underline" style={{ color: GOLD }}>
            Shoop Shoop
          </a>
        </p>
      </footer>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Test23;
