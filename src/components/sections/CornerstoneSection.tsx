import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Heart, BookOpen, HandHeart, ExternalLink } from 'lucide-react';

const pillars = [
  { icon: HandHeart, title: 'Evangelisatie', text: 'JesusToday is hun grootste evangelisatie-initiatief.' },
  { icon: Heart, title: 'Gebed', text: 'Een biddende basis voor alles wat ze doen.' },
  { icon: BookOpen, title: 'Onderwijs & events', text: 'Toerusting en samenkomsten die mensen versterken in geloof.' },
];

export const CornerstoneSection = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
                  <span className="text-anthracite text-sm font-medium">Onze stichting</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-3xl md:text-4xl font-bold text-anthracite mb-6">
                  Samen met <span className="text-gold">Stichting Cornerstone Ministries</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  JesusToday is een initiatief van Stichting Cornerstone Ministries, een Nederlandse ANBI-stichting die mensen wil bemoedigen in hun geloof en het evangelie wil delen met wie Jezus nog niet kent.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Via JesusToday willen ze het licht verspreiden, in Nederland en daarbuiten. Persoonlijke verhalen op video vormen daarbij de brug tussen mensen die geloven en mensen die zoeken.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <Button asChild variant="hero">
                  <a href="https://cornerstone-ministries.com/" target="_blank" rel="noopener noreferrer" className="gap-2">
                    Meer over Cornerstone Ministries
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </ScrollReveal>
            </div>

            <div className="space-y-4">
              {pillars.map((p, i) => (
                <ScrollReveal key={p.title} delay={150 + i * 100}>
                  <div className="flex gap-4 p-5 rounded-xl bg-background border border-border/50 shadow-soft">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                      <p.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-anthracite mb-1">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
