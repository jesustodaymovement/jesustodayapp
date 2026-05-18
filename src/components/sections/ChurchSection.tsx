import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Church, Calendar, Users } from 'lucide-react';

export const ChurchSection = () => {
  return (
    <section className="py-24 bg-anthracite">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
                  <Church className="w-4 h-4 text-gold" />
                  <span className="text-gold text-sm font-medium">Voor kerken</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <h2 className="text-3xl md:text-4xl font-bold text-warm-white mb-6">
                  Jesus Today in <span className="text-gold">jouw kerk</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="text-warm-white/80 leading-relaxed mb-8">
                  We organiseren opnamedagen in kerken om mensen te helpen hun verhaal vast te leggen en te delen. Een praktische manier om verhaal een vaste plek te geven in de gemeente.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <Button variant="hero" size="lg" className="gap-2">
                  <Calendar className="w-5 h-5" />
                  Organiseer een opnamedag
                </Button>
              </ScrollReveal>
            </div>

            {/* Visual */}
            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-gold/20 rounded-3xl blur-2xl" />
                <div className="relative p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10 backdrop-blur-sm">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                        <Church className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <p className="text-warm-white font-semibold">50+ kerken</p>
                        <p className="text-warm-white/60 text-sm">deden al mee</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                        <Users className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <p className="text-warm-white font-semibold">500+ verhalen</p>
                        <p className="text-warm-white/60 text-sm">opgenomen</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <p className="text-warm-white font-semibold">Flexibele planning</p>
                        <p className="text-warm-white/60 text-sm">wij komen naar jullie</p>
                      </div>
                    </div>
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
