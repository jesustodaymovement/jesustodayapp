import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-8">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-anthracite text-sm font-medium">Begin vandaag</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-6">
              Je kunt vandaag <span className="text-gold">beginnen</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Misschien voelt het nog spannend. Maar stel je voor dat juist jouw verhaal iemand raakt. Dat God jouw woorden gebruikt om hoop te brengen.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="text-xl md:text-2xl text-gold font-semibold mb-10">
              Je hoeft alleen maar te beginnen.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <Button variant="hero" size="xl" className="mb-8">
              Upload jouw getuigenis
            </Button>
          </ScrollReveal>

          {/* App Store Badges */}
          <ScrollReveal delay={500}>
            <div className="flex justify-center gap-4">
              <a href="https://apps.apple.com/nl/app/jesus-today/id1623308816" target="_blank" rel="noopener noreferrer" className="group">
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-anthracite/10 border border-anthracite/20 hover:bg-anthracite/20 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-anthracite" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="text-left">
                    <span className="text-anthracite/60 text-xs block">Download on the</span>
                    <span className="text-anthracite font-semibold">App Store</span>
                  </div>
                </div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=io.mxapps.jesustoday" target="_blank" rel="noopener noreferrer" className="group">
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-anthracite/10 border border-anthracite/20 hover:bg-anthracite/20 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-anthracite" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                  </svg>
                  <div className="text-left">
                    <span className="text-anthracite/60 text-xs block">Get it on</span>
                    <span className="text-anthracite font-semibold">Google Play</span>
                  </div>
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
