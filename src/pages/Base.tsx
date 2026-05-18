import { Helmet } from 'react-helmet-async';
import { Search, MessageCircle, ArrowRight, BookOpen, Megaphone } from 'lucide-react';
import logo from '@/assets/jesus-today-logo.png';
import { AudienceMode } from '@/contexts/AudienceContext';

const STORAGE_KEY = 'jt-audience-mode';

const Base = () => {
  const choose = (mode: AudienceMode) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, mode);
      // Harde redirect zodat HomeGate de nieuwe modus daadwerkelijk leest
      window.location.assign('/');
      return;
    }
  };

  return (
    <>
      <Helmet>
        <title>JesusToday, kies jouw reis</title>
        <meta
          name="description"
          content="Ontdek Jezus of vertel over Jezus. Kies de reis die bij jou past."
        />
        <meta property="og:title" content="JesusToday, kies jouw reis" />
        <meta property="og:description" content="Ontdek Jezus of vertel over Jezus. Kies de reis die bij jou past." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://storybrand-share-grace.lovable.app/" />

        <link rel="canonical" href="https://storybrand-share-grace.lovable.app/" />
        <meta name="twitter:title" content="JesusToday, kies jouw reis" />
        <meta name="twitter:description" content="Ontdek Jezus of vertel over Jezus. Kies de reis die bij jou past." />
      </Helmet>

      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-cream relative overflow-hidden px-6 py-12">
        {/* Ambient glow layers */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
          style={{ backgroundColor: 'rgba(250, 209, 80, 0.15)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none"
          style={{ backgroundColor: 'rgba(250, 209, 80, 0.10)' }}
        />

        {/* Main content */}
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center animate-fade-up">
          {/* Logo */}
          <div className="mb-10 flex items-center gap-3">
            <img src={logo} alt="JesusToday" className="h-10 w-auto" />
          </div>

          {/* Hero header */}
          <div className="text-center mb-14">
            <h1 className="text-5xl md:text-7xl font-black text-anthracite mb-6 tracking-tighter leading-[1.05]">
              Waar begint{' '}
              <span className="relative inline-block">
                <span className="relative z-10" style={{ color: '#fad150' }}>
                  jouw reis?
                </span>
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 w-full h-3 -z-10"
                  style={{ color: 'rgba(250, 209, 80, 0.4)' }}
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 25 0 50 5 T 100 5"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-anthracite/70 text-lg md:text-xl max-w-md mx-auto leading-relaxed tracking-tight">
              Kies wat bij jou past. Je kunt later altijd wisselen.
            </p>
          </div>

          {/* Choice grid */}
          <div className="grid md:grid-cols-2 gap-8 w-full animate-fade-up delay-200">
            {/* Ontdek Jezus, light glass card */}
            <button
              type="button"
              onClick={() => choose('discover')}
              className="group relative bg-white/50 backdrop-blur-xl border border-white/80 p-10 rounded-[40px] shadow-2xl shadow-black/[0.04] transition-all duration-500 hover:-translate-y-2 hover:bg-white/90 overflow-hidden text-left"
              style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.04)' }}
            >
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none"
              >
                <BookOpen className="w-24 h-24 text-anthracite" strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                  style={{ backgroundColor: 'rgba(250, 209, 80, 0.2)' }}
                >
                  <Search className="w-7 h-7 text-anthracite" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-extrabold text-anthracite mb-3 tracking-tight">
                  Ontdek Jezus
                </h2>
                <p className="text-anthracite/70 mb-8 leading-snug">
                  Luister naar echte verhalen en ontdek wat geloof kan doen.
                </p>
                <div className="flex items-center gap-2 text-sm font-extrabold tracking-widest uppercase text-anthracite">
                  Begin met ontdekken
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </button>

            {/* Vertel over Jezus, dark contrast card */}
            <button
              type="button"
              onClick={() => choose('share')}
              className="group relative p-10 rounded-[40px] shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden text-left"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 p-8 opacity-[0.15] group-hover:opacity-30 transition-opacity pointer-events-none text-white"
              >
                <MessageCircle className="w-24 h-24" strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg"
                  style={{ backgroundColor: '#fad150', boxShadow: '0 10px 25px rgba(250,209,80,0.2)' }}
                >
                  <Megaphone className="w-7 h-7 text-anthracite" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-extrabold text-white mb-3 tracking-tight">
                  Vertel over Jezus
                </h2>
                <p className="text-white/70 mb-8 leading-snug">
                  Deel jouw verhaal eenvoudig en veilig met anderen.
                </p>
                <div
                  className="flex items-center gap-2 text-sm font-extrabold tracking-widest uppercase"
                  style={{ color: '#fad150' }}
                >
                  Deel jouw verhaal
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Integrated background wordmark */}
        <div
          aria-hidden="true"
          className="absolute bottom-[-8%] left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden"
          style={{ opacity: 0.14, mixBlendMode: 'multiply' }}
        >
          <h2
            className="font-black tracking-tighter leading-none whitespace-nowrap translate-y-16"
            style={{ color: '#fad150', fontSize: '28vw' }}
          >
            JESUSTODAY
          </h2>
        </div>
      </div>
    </>
  );
};

export default Base;
