import { useEffect, useState } from "react";
import hero from "@/assets/test22-hero.jpg";
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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0d1419] text-[#bfe4f0] font-sans">
      {/* Hero background */}
      <img
        src={hero}
        alt="Editorial portrait"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1419]/40 via-transparent to-[#0d1419]/70" />

      {/* Top nav */}
      <header className="relative z-20 flex items-center justify-between px-10 py-8 text-sm tracking-[0.2em]">
        <div className="font-bold text-white">T—H—P</div>
        <nav className="hidden gap-14 md:flex">
          {["Access", "Vinyl", "Method", "Get In Touch"].map((l) => (
            <a key={l} href="#" className="text-white/90 hover:text-white transition">
              {l}
            </a>
          ))}
        </nav>
        <a href="#" className="text-white/90 hover:text-white transition">
          noise@theamplified
        </a>
      </header>

      {/* Left column */}
      <div className="relative z-20 px-10 mt-16 max-w-sm">
        <div className="text-xs tracking-[0.3em] mb-32">(X)</div>
        <div className="text-xs tracking-[0.3em] mb-4 text-white">THE GROOVE</div>
        <p className="text-white text-xl leading-snug font-medium">
          Distortion tearing<br />through the stereo field.
        </p>
      </div>

      {/* Right column - serif headline */}
      <div
        className={`absolute right-10 top-1/4 z-20 text-right transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
      >
        <div className="text-[#bfe4f0] leading-[0.95] tracking-tight" style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}>
          <div>CLARITY</div>
          <div className="italic">OVER</div>
          <div>NOISE</div>
        </div>
      </div>

      {/* Giant CREATE word */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-40 z-10 overflow-hidden">
        <div
          className={`text-[#bfe4f0] font-black leading-none tracking-tighter text-center transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ fontSize: "clamp(6rem, 22vw, 22rem)", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.06em" }}
        >
          CREATE
        </div>
      </div>

      {/* Bottom thumbnails */}
      <div className="absolute bottom-16 left-10 z-20 flex gap-4">
        {[t1, t2, t3].map((src, i) => (
          <div
            key={i}
            className="h-24 w-32 overflow-hidden rounded-md ring-1 ring-white/10 hover:scale-105 transition-transform cursor-pointer"
          >
            <img src={src} alt="" className="h-full w-full object-cover grayscale" loading="lazy" />
          </div>
        ))}
      </div>

      {/* Bottom right text block */}
      <div className="absolute bottom-16 right-10 z-20 max-w-2xl grid grid-cols-2 gap-8 text-xs text-white/80 leading-relaxed">
        <div>
          <div className="tracking-[0.3em] mb-3 text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>
            THE SOUND
          </div>
          <div className="text-[0.65rem] tracking-[0.3em] mb-3">(V)</div>
          <p>
            Electricity surges through the crowded room until dawn arrives. Synths bleed into heavy drums, strobe lights, and sweat. Movement becomes a ritual. Shadows catch the heat. This rhythmic culture never sleeps.
          </p>
        </div>
        <div className="pt-12">
          <p>
            Analog equipment produces warmth across the studio today. Records spin beneath fingertips, signs and symbols emerge from the static between stations.
          </p>
        </div>
      </div>

      {/* Playback bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center gap-4 px-10 py-4 text-white/70 text-xs">
        <button className="text-lg leading-none">‖</button>
        <div className="flex-1 h-px bg-white/20 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-1/3 bg-white" />
        </div>
      </div>
    </div>
  );
};

export default Test22;
