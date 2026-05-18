import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-anthracite pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Jongvolwassenen in gesprek" 
          className="w-full h-full object-cover opacity-50"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-anthracite/60 via-anthracite/40 to-anthracite" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-warm-white leading-tight animate-fade-up">
            Deel jouw getuigenis.{' '}
            <span className="text-gold">Laat Jezus zichtbaar worden.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-warm-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-up delay-100">
            Je wilt delen, maar het voelt spannend, misschien zelfs ongemakkelijk. Wij helpen je om jouw verhaal eenvoudig en veilig te delen, op een manier die bij jou past. God kan het gebruiken om anderen te raken.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-up delay-200">
            <Button variant="hero" size="lg" className="min-w-[200px]">
              Upload jouw getuigenis
            </Button>
            <Button variant="hero-outline" size="lg" className="gap-2">
              Ontdek hoe eenvoudig je kan getuigen
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* App Store Badges */}
          <div className="flex justify-center gap-4 pt-4 animate-fade-up delay-300">
            <a href="https://apps.apple.com/nl/app/jesus-today/id1623308816" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-warm-white/10 border border-warm-white/20 hover:bg-warm-white/20 transition-colors">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-warm-white" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-warm-white text-sm font-medium">App Store</span>
            </a>
            <a href="https://play.google.com/store/apps/details?id=io.mxapps.jesustoday" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-warm-white/10 border border-warm-white/20 hover:bg-warm-white/20 transition-colors">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-warm-white" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
              </svg>
              <span className="text-warm-white text-sm font-medium">Google Play</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-warm-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-gold animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
