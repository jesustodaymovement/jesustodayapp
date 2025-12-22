import { ScrollReveal } from '@/components/ScrollReveal';
import { Ear, Heart, TrendingUp, Eye, Users, Sparkles } from 'lucide-react';

const successPoints = [
  { icon: Ear, text: 'Je getuigenis bereikt mensen' },
  { icon: Heart, text: 'Mensen komen tot geloof door jouw getuigenis' },
  { icon: TrendingUp, text: 'Je groeit in vrijmoedigheid en in zekerheid over wie je bent in Jezus' },
  { icon: Sparkles, text: 'Je ontdekt dat God jou gebruikt' },
  { icon: Eye, text: 'Je wordt zichtbaar als christen' },
  { icon: Users, text: 'Je inspireert anderen om ook te delen' },
];

export const SuccessSection = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-anthracite mb-4">
              Wat er gebeurt als je <span className="text-gold">deelt</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Jouw getuigenis heeft meer impact dan je denkt
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {successPoints.map((point, index) => (
              <ScrollReveal key={index} delay={150 + index * 75}>
                <div className="flex items-center gap-4 p-5 rounded-xl bg-background border border-border/50 shadow-soft hover:shadow-card hover:border-gold/30 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                    <point.icon className="w-5 h-5 text-gold" />
                  </div>
                  <p className="text-foreground font-medium">{point.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
