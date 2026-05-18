import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GuideSection = () => {
  return (
    <section className="py-24 bg-anthracite">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-warm-white mb-16">
              Je hoeft het niet <span className="text-gold">alleen</span> te doen
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Visual Left */}
            <ScrollReveal delay={100}>
              <div className="relative mx-auto w-full max-w-[420px] rounded-2xl overflow-hidden aspect-[9/16] bg-anthracite-light shadow-card">
                <iframe
                  src="https://player.vimeo.com/video/1114232845?title=0&byline=0&portrait=0"
                  className="absolute inset-0 w-full h-full"
                  frameBorder={0}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Je hoeft het niet alleen te doen"
                />
              </div>
            </ScrollReveal>

            {/* Content Right */}
            <ScrollReveal delay={200}>
              <div className="space-y-6">
                <p className="text-lg text-warm-white/80 leading-relaxed">
                  We begrijpen hoe spannend het kan voelen om je geloof te delen en hoe moeilijk het soms is om de juiste woorden te vinden.
                </p>
                
                <p className="text-lg text-warm-white/80 leading-relaxed">
                  JesusToday is opgezet door mensen die zelf door het verhaal van anderen geraakt en veranderd zijn. Wij weten hoe krachtig één verhaal kan zijn.
                </p>

                <p className="text-lg text-warm-white/80 leading-relaxed">
                  We hebben al honderden christenen geholpen om hun verhaal eenvoudig, persoonlijk en impactvol te delen, in samenwerking met kerken en christelijke initiatieven die dit proces ondersteunen.
                </p>

                <div className="pt-4">
                  <Button asChild variant="cta-light" size="lg">
                    <Link to="/upload">
                      <Upload className="w-5 h-5" />
                      Upload jouw verhaal
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
