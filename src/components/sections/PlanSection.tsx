import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Video, QrCode, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: Video,
    number: '01',
    title: 'Neem jouw verhaal op',
    description: 'We helpen je om in enkele minuten jouw persoonlijke verhaal op video vast te leggen. Download vervolgens onze app en upload jouw verhaal.',
  },
  {
    icon: QrCode,
    number: '02',
    title: 'Ontvang jouw eigen QR-kaartjes',
    description: 'Je krijgt een unieke QR-code met kaartjes die direct naar jouw video leiden.',
  },
  {
    icon: Share2,
    number: '03',
    title: 'Deel jouw verhaal in het dagelijks leven',
    description: 'Geef de kaartjes weg waar je ook bent, inspireer anderen met Jezus en bereik nog meer mensen door je verhaal ook op social media te delen.',
  },
];

export const PlanSection = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-anthracite mb-4">
              Zo werkt het
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              In drie eenvoudige stappen deel je jouw verhaal met de wereld
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={150 + index * 100}>
                <div className="relative group h-full">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-0.5 bg-gradient-to-r from-gold to-gold/20" />
                  )}
                  
                  <div className="relative p-8 rounded-2xl bg-background border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                    {/* Step Number */}
                    <span className="absolute -top-4 -right-2 text-6xl font-bold text-gold/10 font-heading">
                      {step.number}
                    </span>
                    
                    {/* Icon */}
                    <div className="relative w-14 h-14 rounded-2xl bg-gold flex items-center justify-center mb-6 shadow-gold group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-7 h-7 text-anthracite" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={450}>
            <div className="text-center">
              <Button asChild variant="cta-light" size="lg">
                <Link to="/upload">Upload jouw verhaal</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
