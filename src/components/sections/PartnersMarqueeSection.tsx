import { ScrollReveal } from '@/components/ScrollReveal';
import globalrize from '@/assets/partners/globalrize.png';
import theSend from '@/assets/partners/the-send.png';
import europoort from '@/assets/partners/europoort.png';
import opwekking from '@/assets/partners/opwekking.png';
import lifeschool from '@/assets/partners/lifeschool.png';
import motionChurch from '@/assets/partners/motion-church.png';
import stadskerk from '@/assets/partners/stadskerk.png';
import agape from '@/assets/partners/agape.png';
import r5 from '@/assets/partners/r5.png';
import impactWorldTour from '@/assets/partners/impact-world-tour.png';
import theMessage from '@/assets/partners/the-message.png';

const partners = [
  { name: 'GlobalRize', url: 'https://www.globalrize.nl/', logo: globalrize },
  { name: 'The Send Nederland', url: 'https://thesend.nl/', logo: theSend },
  { name: 'Europoort International Church', url: 'https://europoortinternational.nl/', logo: europoort },
  { name: 'Stichting Opwekking', url: 'https://opwekking.nl/', logo: opwekking },
  { name: 'Lifeschool', url: 'https://lifeschool.nu/', logo: lifeschool },
  { name: 'Motion Church', url: 'https://motion.church/', logo: motionChurch },
  { name: 'De Stadskerk VBG', url: 'https://destadskerk.nl/', logo: stadskerk },
  { name: 'Agapè Nederland', url: 'https://agape.nl/', logo: agape },
  { name: 'R5 Kerk & Bijbelschool', url: 'https://r5church.nl/', logo: r5 },
  { name: 'Impact World Tour', url: 'https://impactworldtour.com/', logo: impactWorldTour },
  { name: 'The Message Nederland', url: 'https://www.themessage.nl/', logo: theMessage },
];

export const PartnersMarqueeSection = () => {
  const loop = [...partners, ...partners];

  return (
    <section className="py-16 md:py-20 bg-cream" aria-label="Onze partners">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-10">
            Samen met deze kerken en organisaties
          </p>
        </ScrollReveal>
        <div
          className="group relative overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div className="flex w-max animate-marquee-slow gap-12 md:gap-16 group-hover:[animation-play-state:paused]">
            {loop.map((p, i) => (
              <a
                key={`${p.name}-${i}`}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                title={p.name}
                aria-label={p.name}
                className="flex items-center justify-center h-20 md:h-24 w-40 md:w-48 shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              >
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};