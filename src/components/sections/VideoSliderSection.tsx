import { ScrollReveal } from '@/components/ScrollReveal';
import { Play } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import videoAuke from '@/assets/video-auke.png';
import videoYannick from '@/assets/video-yannick.png';
import videoGregory from '@/assets/video-gregory.png';
import videoJinke from '@/assets/video-jinke.png';

const videos = [
  {
    name: 'Auke',
    image: videoAuke,
    quote: 'Mijn getuigenis over hoe God mij veranderd heeft',
  },
  {
    name: 'Yannick',
    image: videoYannick,
    quote: 'Van twijfel naar vertrouwen in Jezus',
  },
  {
    name: 'Gregory',
    image: videoGregory,
    quote: 'Hoe God mij bevrijdde en een nieuw doel gaf',
  },
  {
    name: 'Jinke',
    image: videoJinke,
    quote: 'Mijn reis van zoeken naar vinden',
  },
];

export const VideoSliderSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-anthracite mb-4">
              Bekijk <span className="text-gold">getuigenissen</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Ontdek de verhalen van anderen die hun geloof delen
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-anthracite text-warm-white flex items-center justify-center shadow-lg hover:bg-gold hover:text-anthracite transition-all duration-300 hidden md:flex"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-anthracite text-warm-white flex items-center justify-center shadow-lg hover:bg-gold hover:text-anthracite transition-all duration-300 hidden md:flex"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Carousel */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6">
                  {videos.map((video, index) => (
                    <div
                      key={index}
                      className="flex-[0_0_320px] md:flex-[0_0_400px] lg:flex-[0_0_450px] min-w-0"
                    >
                      <div className="group relative rounded-2xl overflow-hidden bg-anthracite shadow-card hover:shadow-lg transition-all duration-300">
                        {/* Video Thumbnail */}
                        <div className="relative aspect-[3/4]">
                          <img
                            src={video.image}
                            alt={`Getuigenis van ${video.name}`}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-anthracite/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-gold">
                              <Play className="w-8 h-8 text-anthracite ml-1" />
                            </div>
                          </div>

                          {/* Gradient Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-anthracite to-transparent" />

                          {/* Name Badge */}
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-warm-white font-semibold text-lg">{video.name}</p>
                            <p className="text-warm-white/70 text-sm line-clamp-2">{video.quote}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
