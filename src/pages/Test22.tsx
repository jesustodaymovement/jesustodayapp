import { useEffect, useState } from "react";
import hero from "@/assets/test22-hero-light.jpg";
import t1 from "@/assets/test22-thumb1.jpg";
import t2 from "@/assets/test22-thumb2.jpg";
import t3 from "@/assets/test22-thumb3.jpg";

const Test22 = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-cream text-anthracite font-sans">
      {/* Hero background */}
      <img
        src={hero}
        alt="Jonge vrouw met hoopvolle blik in warm zonlicht"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Soft cream wash for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--cream))]/40 via-[hsl(var(--cream))]/10 to-[hsl(var(--cream))]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--cream))]/60 via-transparent to-[hsl(var(--cream))]/30" />

      {/* Top nav */}
      <header className="relative z-20 flex items-center justify-between px-10 py-8 text-sm tracking-[0.2em]">
        <div className="font-bold text-anthracite">JESUS · TODAY</div>
        <nav className="hidden gap-14 md:flex">
          {["Verhalen", "Getuigen", "Methode", "Contact"].map((l) => (
            <a key={l} href="#" className="text-anthracite/80 hover:text-anthracite transition">
              {l}
            </a>
          ))}
        </nav>
        <a href="#" className="text-anthracite/80 hover:text-anthracite transition">
          hallo@jesustoday.nl
        </a>
      </header>

      {/* Left column */}
      <div className="relative z-20 px-10 mt-16 max-w-sm">
        <div className="text-xs tracking-[0.3em] mb-32 text-anthracite/60">(01)</div>
        <div className="text-xs tracking-[0.3em] mb-4 text-anthracite">JOUW VERHAAL</div>
        <p className="text-anthracite text-xl leading-snug font-medium">
          Echte momenten, eerlijk gedeeld,<br />één verhaal tegelijk.
        </p>
      </div>

      {/* Right column, serif headline */}
      <div
        className={`absolute right-10 top-1/4 z-20 text-right transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
      >
        <div className="text-anthracite leading-[0.95] tracking-tight" style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}>
          <div>HOOP</div>
          <div className="italic text-[#fad150]" style={{ textShadow: "0 2px 30px rgba(250,209,80,0.4)" }}>BOVEN</div>
          <div>ANGST</div>
        </div>
      </div>

      {/* Giant DEEL word */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-40 z-10 overflow-hidden">
        <div
          className={`font-black leading-none text-center transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{
            fontSize: "clamp(6rem, 22vw, 22rem)",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "-0.06em",
            color: "#fad150",
          }}
        >
          DEEL
        </div>
      </div>

      {/* Bottom thumbnails */}
      <div className="absolute bottom-16 left-10 z-20 flex gap-4">
        {[t1, t2, t3].map((src, i) => (
          <div
            key={i}
            className="h-24 w-32 overflow-hidden rounded-xl ring-1 ring-anthracite/10 shadow-md hover:scale-105 hover:ring-[#fad150] transition-all cursor-pointer bg-warm-white"
          >
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>

      {/* Bottom right text block */}
      <div className="absolute bottom-16 right-10 z-20 max-w-2xl grid grid-cols-2 gap-8 text-xs text-anthracite/75 leading-relaxed">
        <div>
          <div
            className="tracking-[0.3em] mb-3 text-anthracite"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
          >
            DE BEWEGING
          </div>
          <div className="text-[0.65rem] tracking-[0.3em] mb-3 text-anthracite/60">(02)</div>
          <p>
            Jongeren delen kleine, eerlijke momenten waarin God dichtbij kwam. Geen preek, geen druk, gewoon echte verhalen die anderen moed geven om ook te zien wat zij meemaken.
          </p>
        </div>
        <div className="pt-12">
          <p>
            Met één korte video, een QR-code en een glimlach wordt jouw verhaal een lichtpunt voor iemand die het vandaag nodig heeft.
          </p>
        </div>
      </div>

      {/* CTA pill, primary action */}
      <a
        href="#"
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-3 rounded-full bg-[#fad150] px-8 py-4 text-sm font-semibold text-anthracite shadow-xl shadow-[#fad150]/30 hover:scale-105 transition-transform"
      >
        Upload jouw verhaal
        <span aria-hidden>→</span>
      </a>

      {/* Playback bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center gap-4 px-10 py-4 text-anthracite/60 text-xs">
        <button className="text-lg leading-none" aria-label="Pauze">‖</button>
        <div className="flex-1 h-px bg-anthracite/15 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-1/3 bg-[#fad150] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Test22;
