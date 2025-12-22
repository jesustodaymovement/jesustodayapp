import { ScrollReveal } from '@/components/ScrollReveal';
import { AlertTriangle } from 'lucide-react';

export const FailureSection = () => {
  return (
    <section className="py-24 bg-anthracite">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-warm-white/10 mb-8">
              <AlertTriangle className="w-8 h-8 text-warm-white/60" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white mb-8">
              Wat als je <span className="text-warm-white/60">stil blijft?</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-4 text-lg md:text-xl text-warm-white/70 mb-8">
              <p>Dan blijven verhalen ongehoord.</p>
              <p>Dan blijft jouw geloof onzichtbaar.</p>
              <p>Dan blijft die innerlijke roeping knagen.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="text-lg md:text-xl text-warm-white font-medium">
              Niet om je bang te maken —<br />
              <span className="text-gold">maar omdat jouw verhaal ertoe doet.</span>
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
