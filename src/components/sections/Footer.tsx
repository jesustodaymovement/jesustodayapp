import { Heart, Instagram, Facebook, Youtube, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-anthracite border-t border-warm-white/10">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Top Section */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-warm-white mb-4">
                Jesus <span className="text-gold">Today</span>
              </h3>
              <p className="text-warm-white/60 leading-relaxed mb-6">
                Jouw getuigenis. Eenvoudig gedeeld. Door God gebruikt.
              </p>
              {/* App Buttons */}
              <div className="flex gap-3">
                <a href="https://apps.apple.com/nl/app/jesus-today/id1623308816" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-warm-white/10 border border-warm-white/20 hover:bg-warm-white/20 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-warm-white" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span className="text-warm-white text-sm">App Store</span>
                </a>
                <a href="https://play.google.com/store/apps/details?id=io.mxapps.jesustoday" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-warm-white/10 border border-warm-white/20 hover:bg-warm-white/20 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-warm-white" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                  </svg>
                  <span className="text-warm-white text-sm">Google Play</span>
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-warm-white font-semibold mb-4">Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-warm-white/60 hover:text-gold transition-colors">Verhalen</a>
                </li>
                <li>
                  <a href="#" className="text-warm-white/60 hover:text-gold transition-colors">Over Ons</a>
                </li>
                <li>
                  <a href="#" className="text-warm-white/60 hover:text-gold transition-colors">Contact</a>
                </li>
                <li>
                  <a href="/doneren" className="text-warm-white/60 hover:text-gold transition-colors">Doneren</a>
                </li>
                <li>
                  <a href="#" className="text-warm-white/60 hover:text-gold transition-colors">Privacybeleid</a>
                </li>
                <li>
                  <a href="#" className="text-warm-white/60 hover:text-gold transition-colors">Voorwaarden</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-warm-white font-semibold mb-4">Contact</h4>
              <div className="space-y-4 mb-6">
                <a href="mailto:info@jesustoday.nl" className="flex items-center gap-2 text-warm-white/60 hover:text-gold transition-colors">
                  <Mail className="w-4 h-4" />
                  info@jesustoday.nl
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                <a href="https://www.instagram.com/jesustoday_?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-lg bg-warm-white/10 flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-all text-warm-white/60">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://facebook.com/jesustoday.nl" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-lg bg-warm-white/10 flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-all text-warm-white/60">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@JesusTodayMovement" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-lg bg-warm-white/10 flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-all text-warm-white/60">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@jesustodaymovement" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-lg bg-warm-white/10 flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-all text-warm-white/60">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.62a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.05z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-warm-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-warm-white/40 text-sm">
                © {currentYear} Jesus Today. Alle rechten voorbehouden.
              </p>
              <p className="text-warm-white/40 text-sm">
                Website door{' '}
                <a 
                  href="https://shoopshoop.nl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold/80 transition-colors"
                >
                  Shoop Shoop
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
