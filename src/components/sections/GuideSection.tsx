import { ScrollReveal } from '@/components/ScrollReveal';
import { Heart, Award, Users, CheckCircle } from 'lucide-react';

export const GuideSection = () => {
  return (
    <section className="py-24 bg-anthracite">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-warm-white mb-16">
              Je hoeft het niet <span className="text-gold">alleen</span> te doen
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Empathy Card */}
            <ScrollReveal delay={100}>
              <div className="h-full p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-warm-white">Empathie</h3>
                </div>
                <p className="text-warm-white/80 leading-relaxed">
                  Wij weten hoe spannend het kan zijn om je geloof te delen. Jesus Today is opgezet door mensen die zelf geraakt en veranderd zijn door de getuigenissen van anderen. We weten hoe krachtig één verhaal kan zijn.
                </p>
              </div>
            </ScrollReveal>

            {/* Authority Card */}
            <ScrollReveal delay={200}>
              <div className="h-full p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-warm-white">Autoriteit</h3>
                </div>
                <p className="text-warm-white/80 leading-relaxed mb-6">
                  Honderden christenen hebben via Jesus Today hun getuigenis gedeeld. Kerken en christelijke initiatieven gebruiken de app om getuigenis weer eenvoudig en normaal te maken.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-sm">
                    <Users className="w-4 h-4" />
                    <span>500+ getuigenissen</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-sm">
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
