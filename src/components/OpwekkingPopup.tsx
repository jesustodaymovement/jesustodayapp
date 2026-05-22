import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Sparkles, Calendar, MapPin, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'jt-opwekking-popup-dismissed';

export const OpwekkingPopup = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const excludedPaths = ['/aanmeldenopwekking2026', '/opwekkinggetuigenissenform'];
  const isExcluded = excludedPaths.some(
    (p) => location.pathname.toLowerCase() === p.toLowerCase()
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isExcluded) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, [isExcluded]);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {}
  };

  if (!open || isExcluded) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="opwekking-popup-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Sluiten"
        onClick={close}
        className="absolute inset-0 bg-anthracite/70 backdrop-blur-sm"
      />

      {/* Card */}
      <div className="relative w-full max-w-lg animate-scale-in">
        {/* Glow */}
        <div
          aria-hidden
          className="absolute -inset-4 rounded-[2rem] bg-[#fad150]/40 blur-3xl pulse"
        />
        <div className="relative rounded-3xl bg-cream border-2 border-[#fad150] shadow-2xl overflow-hidden">
          {/* Header strip */}
          <div className="relative bg-[#fad150] px-6 py-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-anthracite" />
            <span className="text-anthracite font-bold uppercase tracking-wide text-sm">
              Opwekking dit weekend
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Sluit melding"
              className="ml-auto w-9 h-9 rounded-full bg-anthracite/10 hover:bg-anthracite/20 flex items-center justify-center text-anthracite transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 md:px-8 py-7">
            <h2
              id="opwekking-popup-title"
              className="text-2xl md:text-3xl font-bold text-anthracite leading-tight mb-3"
            >
              Kom jij naar ons seminar over evangelisatie tijdens{' '}
              <span className="text-gold">Opwekking?</span>
            </h2>
            <p className="text-anthracite/80 leading-relaxed mb-5">
              JesusToday loopt daar rond om jouw getuigenis op te nemen,
              en we spreken tijdens een seminar over evangelisatie.
            </p>

            <p className="text-gold font-bold uppercase tracking-wide text-sm mb-2">
              Seminar evangelisatie
            </p>
            <div className="rounded-2xl bg-white border border-anthracite/10 p-4 mb-6 space-y-2">
              <div className="flex items-center gap-3 text-anthracite">
                <Calendar className="w-5 h-5 text-gold shrink-0" />
                <span className="font-semibold">Zaterdagavond, 19:30 - 21:00</span>
              </div>
              <div className="flex items-center gap-3 text-anthracite">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <span className="font-semibold">Seminartent 3</span>
              </div>
            </div>

            <Link
              to="/aanmeldenopwekking2026"
              onClick={close}
              className="group w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-xl bg-[#fad150] text-anthracite font-bold text-lg shadow-gold hover:brightness-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Laat je getuigenis opnemen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={close}
              className="block mx-auto mt-4 text-sm text-anthracite/60 hover:text-anthracite underline underline-offset-4"
            >
              Nee, misschien later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};