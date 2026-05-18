import { ScrollReveal } from '@/components/ScrollReveal';
import { ArrowRight, PlayCircle, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: PlayCircle,
    title: 'Bekijk meer verhalen',
    description: 'Ontdek tientallen verhalen van mensen die God leerden kennen.',
    cta: 'Naar de verhalen',
    href: '/verhaalsen',
    external: false,
  },
  {
    icon: Users,
    title: 'Volg een beginnerscursus over geloof',
    description: 'Stel al je vragen in een veilige groep. Gratis, vrijblijvend en open.',
    cta: 'Vind een cursus bij jou in de buurt',
    href: 'https://www.alpha-cursus.nl',
    external: true,
  },
  {
    icon: MapPin,
    title: 'Vind een kerk in de buurt',
    description: 'Kom in contact met andere gelovige mensen die hun geloof in het dagelijks leven beleven.',
    cta: 'Zoek een kerk',
    href: 'https://www.kerkbuurt.nl',
    external: true,
  },
];

export const NextStepsSection = () => {
  return (
    <section className="py-24 bg-anthracite" id="volgende-stap">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-warm-white mb-4">
              Klaar voor een <span className="text-gold">volgende stap?</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-lg text-center text-warm-white/80 mb-16 max-w-2xl mx-auto">
              Kies wat bij jou past. Geen druk, geen verplichting, gewoon een uitnodiging.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <ScrollReveal key={step.title} delay={150 + index * 100}>
                <div className="h-full flex flex-col p-8 rounded-2xl bg-warm-white/5 border border-warm-white/10 hover:border-gold/40 hover:bg-warm-white/10 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-gold/15 flex items-center justify-center mb-6 group-hover:bg-gold/25 transition-colors">
                    <step.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-warm-white mb-3">{step.title}</h3>
                  <p className="text-warm-white/70 leading-relaxed mb-6 flex-grow">{step.description}</p>
                  {step.external ? (
                    <a
                      href={step.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
                    >
                      {step.cta}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      to={step.href}
                      className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
                    >
                      {step.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};