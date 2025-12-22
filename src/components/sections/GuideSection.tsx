import { ScrollReveal } from '@/components/ScrollReveal';
import { Users, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

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
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={heroImage} 
                  alt="Jongvolwassenen delen hun verhaal" 
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite/60 to-transparent" />
              </div>
            </ScrollReveal>

            {/* Content Right */}
            <ScrollReveal delay={200}>
              <div className="space-y-6">
                <p className="text-lg text-warm-white/80 leading-relaxed">
                  We begrijpen hoe spannend het kan voelen om je geloof te delen en hoe moeilijk het soms is om de juiste woorden te vinden.
                </p>
                
                <p className="text-lg text-warm-white/80 leading-relaxed">
                  Jesus Today is opgezet door mensen die zelf door de getuigenis van anderen geraakt en veranderd zijn. Wij weten hoe krachtig één verhaal kan zijn.
                </p>

                <p className="text-lg text-warm-white/80 leading-relaxed">
                  We hebben al honderden christenen geholpen om hun getuigenis eenvoudig, persoonlijk en impactvol te delen, in samenwerking met kerken en christelijke initiatieven die dit proces ondersteunen.
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium">
                    <Users className="w-4 h-4" />
                    <span>500+ getuigenissen</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>50+ kerken</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
