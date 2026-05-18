import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import logo from '@/assets/jesus-today-logo.png';
import { AudienceMode } from '@/contexts/AudienceContext';

const STORAGE_KEY = 'jt-audience-mode';

const Base = () => {
  const navigate = useNavigate();

  const choose = (mode: AudienceMode) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, mode);
    }
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Jesus Today, kies jouw reis</title>
        <meta
          name="description"
          content="Ontdek Jezus of vertel over Jezus. Kies de reis die bij jou past."
        />
        <link rel="canonical" href="https://jesustoday.nl/base" />
      </Helmet>

      <main className="min-h-screen flex flex-col items-center justify-center bg-cream px-6 py-16">
        <div className="w-full max-w-3xl mx-auto text-center space-y-12">
          <div className="flex flex-col items-center gap-6 animate-fade-up">
            <img src={logo} alt="Jesus Today" className="h-12 w-auto" />
            <h1 className="text-3xl md:text-5xl font-bold text-anthracite leading-tight">
              Waar begint <span className="text-gold">jouw reis</span>?
            </h1>
            <p className="text-base md:text-lg text-anthracite/70 max-w-xl">
              Kies wat bij jou past. Je kunt later altijd wisselen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-up delay-200">
            <button
              onClick={() => choose('discover')}
              className="group relative flex flex-col items-start gap-4 p-8 rounded-2xl bg-white border border-anthracite/10 hover:border-gold hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center group-hover:bg-gold/25 transition-colors">
                <Compass className="w-6 h-6 text-gold" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-anthracite">
                  Ontdek Jezus
                </h2>
                <p className="text-sm md:text-base text-anthracite/70">
                  Luister naar echte verhalen en ontdek wat geloof kan doen.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold mt-2 group-hover:gap-3 transition-all">
                Begin met ontdekken
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <button
              onClick={() => choose('share')}
              className="group relative flex flex-col items-start gap-4 p-8 rounded-2xl bg-white border border-anthracite/10 hover:border-gold hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center group-hover:bg-gold/25 transition-colors">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-anthracite">
                  Vertel over Jezus
                </h2>
                <p className="text-sm md:text-base text-anthracite/70">
                  Deel jouw verhaal eenvoudig en veilig met anderen.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold mt-2 group-hover:gap-3 transition-all">
                Deel jouw verhaal
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Base;
