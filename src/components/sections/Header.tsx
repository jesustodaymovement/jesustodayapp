import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/jesus-today-logo.png';
import { useAudienceOptional } from '@/contexts/AudienceContext';
import { AudienceSwitch } from '@/components/AudienceSwitch';

const navLinks = [
  { label: 'Verhalen', href: '/verhalen-over-jezus' },
  { label: 'Over Ons', href: '/over-ons' },
  { label: 'Partners', href: '/partners' },
  { label: 'Doneren', href: '/doneren' },
  { label: 'Contact', href: '/contact' },
];

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audience = useAudienceOptional();
  const lang = (i18n.language?.startsWith('en') ? 'en' : 'nl') as 'nl' | 'en';
  const setLanguage = (l: 'nl' | 'en') => {
    i18n.changeLanguage(l);
  };

  const LanguageSwitch = ({ className = '' }: { className?: string }) => (
    <div
      className={`inline-flex items-center rounded-md border border-anthracite/15 overflow-hidden text-xs font-semibold ${className}`}
      role="group"
      aria-label={t('Taal kiezen')}
    >
      <button
        type="button"
        onClick={() => setLanguage('nl')}
        aria-pressed={lang === 'nl'}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === 'nl' ? 'bg-[#fad150] text-anthracite' : 'bg-white text-anthracite/70 hover:text-anthracite'
        }`}
      >
        NL
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={lang === 'en'}
        className={`px-2.5 py-1.5 transition-colors border-l border-anthracite/15 ${
          lang === 'en' ? 'bg-[#fad150] text-anthracite' : 'bg-white text-anthracite/70 hover:text-anthracite'
        }`}
      >
        EN
      </button>
    </div>
  );

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
