import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import logo from '@/assets/jesus-today-logo.png';
import { useAudienceOptional } from '@/contexts/AudienceContext';
import { AudienceSwitch } from '@/components/AudienceSwitch';
import { NATIONS } from '@/lib/nations';

const navLinks = [
  { label: 'Verhalen', href: '/verhalen-over-jezus' },
  { label: 'Over Ons', href: '/over-ons' },
  { label: 'Partners', href: '/partners' },
  { label: 'Doneren', href: '/doneren' },
];

const contactLink = { label: 'Contact', href: '/contact' };


export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNationsOpen, setIsNationsOpen] = useState(false);
  const [isMobileNationsOpen, setIsMobileNationsOpen] = useState(false);
  const nationsRef = useRef<HTMLDivElement>(null);
  const audience = useAudienceOptional();
  const langOptions = [
    { code: 'en', label: 'EN' },
    { code: 'nl', label: 'NL' },
    { code: 'es', label: 'ES' },
    { code: 'fil', label: 'FIL' },
  ] as const;
  const current = i18n.language?.split('-')[0] ?? 'en';
  const lang = langOptions.some((o) => o.code === current) ? current : 'en';
  const setLanguage = (l: string) => {
    i18n.changeLanguage(l);
  };

  const LanguageSwitch = ({ className = '' }: { className?: string }) => (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-anthracite/60">
        {t('Choose language')}
      </span>
      <div
        className="inline-flex items-center rounded-md border border-anthracite/15 overflow-hidden text-xs font-semibold"
        role="group"
        aria-label={t('Taal kiezen')}
      >
        {langOptions.map((opt, i) => (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLanguage(opt.code)}
            aria-pressed={lang === opt.code}
            className={`px-2.5 py-1.5 transition-colors ${i > 0 ? 'border-l border-anthracite/15' : ''} ${
              lang === opt.code
                ? 'bg-[#fad150] text-anthracite'
                : 'bg-white text-anthracite/70 hover:text-anthracite'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );


  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (nationsRef.current && !nationsRef.current.contains(e.target as Node)) {
        setIsNationsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsNationsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-white shadow-sm'
      }`}
      style={{ top: 'var(--alert-h, 0px)' }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="JesusToday"
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-anthracite/80 hover:text-gold transition-colors font-medium"
              >
                {t(link.label)}
              </a>
            ))}

            {/* Nations dropdown, losstaand van de taalkeuze */}
            <div
              ref={nationsRef}
              className="relative"
              onMouseEnter={() => setIsNationsOpen(true)}
              onMouseLeave={() => setIsNationsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsNationsOpen((o) => !o)}
                aria-expanded={isNationsOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 text-anthracite/80 hover:text-gold transition-colors font-medium"
              >
                {t('Nations')}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isNationsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isNationsOpen && (
                <div className="absolute left-0 top-full pt-3">
                  <div className="w-60 rounded-xl border border-anthracite/10 bg-white p-2 shadow-lg">
                    {NATIONS.map((nation) => (
                      <a
                        key={nation.code}
                        href={nation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-anthracite/80 hover:bg-anthracite/5 hover:text-gold transition-colors font-medium"
                      >
                        <span aria-hidden="true" className="text-lg leading-none">
                          {nation.flag}
                        </span>

                        <span className="flex-1">{t(nation.name)}</span>
                        <ArrowUpRight className="w-4 h-4 text-gold" />
                      </a>
                    ))}
                    <Link
                      to="/nations"
                      onClick={() => setIsNationsOpen(false)}
                      className="mt-1 block border-t border-anthracite/10 px-3 pt-2.5 pb-1 text-sm text-anthracite/60 hover:text-gold transition-colors"
                    >
                      {t('Alle landen bekijken')}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <a
              href={contactLink.href}
              className="text-anthracite/80 hover:text-gold transition-colors font-medium"
            >
              {t(contactLink.label)}
            </a>
          </nav>


          {/* Desktop CTA + audience switch */}
          <div className="hidden md:flex items-center gap-4">
            {audience && <AudienceSwitch variant="header" />}
            <Button asChild variant="hero" size="default">
              <Link to="/upload">{t('Upload jouw verhaal')}</Link>
            </Button>
            <LanguageSwitch />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-anthracite p-2"
            aria-label={t('Toggle menu')}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg border-t border-anthracite/10">
            <nav className="flex flex-col py-4">
              {audience && (
                <div className="px-6 py-3 flex justify-center">
                  <AudienceSwitch variant="header" />
                </div>
              )}
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-6 py-3 text-anthracite/80 hover:text-gold hover:bg-anthracite/5 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(link.label)}
                </a>
              ))}

              {/* Nations in het mobiele menu, uitklapbaar */}
              <button
                type="button"
                onClick={() => setIsMobileNationsOpen((o) => !o)}
                aria-expanded={isMobileNationsOpen}
                className="flex items-center justify-between px-6 py-3 text-anthracite/80 hover:text-gold hover:bg-anthracite/5 transition-colors font-medium"
              >
                {t('Nations')}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isMobileNationsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isMobileNationsOpen && (
                <div className="bg-anthracite/[0.03]">
                  {NATIONS.map((nation) => (
                    <a
                      key={nation.code}
                      href={nation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 pl-10 pr-6 py-3 text-anthracite/80 hover:text-gold transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span
                        aria-hidden="true"
                        className="rounded border border-anthracite/15 bg-anthracite/5 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-anthracite/70"
                      >
                        {nation.code}
                      </span>
                      <span className="flex-1">{t(nation.name)}</span>
                      <ArrowUpRight className="w-4 h-4 text-gold" />
                    </a>
                  ))}
                  <Link
                    to="/nations"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block pl-10 pr-6 py-3 text-sm text-anthracite/60 hover:text-gold transition-colors"
                  >
                    {t('Alle landen bekijken')}
                  </Link>
                </div>
              )}
              <div className="px-6 py-4">
                <Button asChild variant="hero" size="default" className="w-full">
                  <Link to="/upload" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('Upload jouw verhaal')}
                  </Link>
                </Button>
                <div className="mt-3 flex justify-center">
                  <LanguageSwitch />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
