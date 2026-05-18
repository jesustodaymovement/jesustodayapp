import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audience = useAudienceOptional();

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
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + audience switch */}
          <div className="hidden md:flex items-center gap-4">
            {audience && <AudienceSwitch variant="header" />}
            <Button asChild variant="hero" size="default">
              <Link to="/upload">Upload jouw verhaal</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-anthracite p-2"
            aria-label="Toggle menu"
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
                  {link.label}
                </a>
              ))}
              <div className="px-6 py-4">
                <Button asChild variant="hero" size="default" className="w-full">
                  <Link to="/upload" onClick={() => setIsMobileMenuOpen(false)}>
                    Upload jouw verhaal
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
