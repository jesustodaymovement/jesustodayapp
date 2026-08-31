import { ScrollReveal } from '@/components/ScrollReveal';
import { Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const testimonials = [
  {
    quote: "Het voelde eerst spannend, maar nu heb ik iets om te geven. Ik zie hoe God het gebruikt.",
    name: "Emma",
    age: "23 jaar",
  },
  {
    quote: "Ik dacht altijd dat mijn verhaal niet bijzonder genoeg was. Maar mensen reageren zo geraakt!",
    name: "Thomas",
    age: "27 jaar",
  },
  {
    quote: "De QR-kaartjes maken het zo laagdrempelig. Ik deel ze nu overal.",
    name: "Sarah",
    age: "19 jaar",
  },
];

export const TestimonialsSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-anthracite mb-4">
              {t('Wat anderen')} <span className="text-gold">{t('zeggen')}</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              {t('Echte verhalen van echte mensen die hun verhaal delen')}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={150 + index * 100}>
                <div className="relative p-8 rounded-2xl bg-background border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 h-full">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-lg bg-gold flex items-center justify-center shadow-gold">
                    <Quote className="w-4 h-4 text-anthracite" />
                  </div>

                  <p className="text-foreground leading-relaxed mb-6 pt-2">
                    "{t(testimonial.quote)}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="text-gold font-semibold">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{t(testimonial.age)}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA Button */}
          <ScrollReveal delay={450}>
            <div className="text-center mt-12">
              <Button variant="hero" size="lg">
                {t('Bekijk de verhalen van anderen')}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
