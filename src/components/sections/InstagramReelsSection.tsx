import { ScrollReveal } from '@/components/ScrollReveal';
import { Play, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

const reelsMockups = [
  {
    username: 'emma_gelooft',
    caption: 'Hoe ik begon met delen... 🙏✨',
    likes: '2.847',
    comments: '156',
    thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    username: 'lucas.faith',
    caption: 'Mijn eerste verhaal was zo awkward maar...',
    likes: '4.123',
    comments: '289',
    thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    username: 'sophie_deelt',
    caption: 'Van bang naar bold 💪',
    likes: '3.456',
    comments: '201',
    thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    username: 'noah.stories',
    caption: 'Waarom ik toch begon met getuigen...',
    likes: '5.892',
    comments: '342',
    thumbnail: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
];

export const InstagramReelsSection = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white text-sm font-semibold mb-4">
                📱 Instagram Reels
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-4">
                Tieners die de stap hebben gezet
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Bekijk hoe andere jongeren hun verhaal zijn gaan delen
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {reelsMockups.map((reel, index) => (
              <ScrollReveal key={index} delay={100 + index * 100}>
                <div className="relative group cursor-pointer">
                  {/* Phone Frame */}
                  <div className="relative bg-black rounded-[2rem] p-2 shadow-2xl">
                    {/* Screen */}
                    <div 
                      className="relative aspect-[9/16] rounded-[1.5rem] overflow-hidden"
                      style={{ background: reel.thumbnail }}
                    >
                      {/* Top Bar */}
                      <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {reel.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-white text-xs font-semibold drop-shadow-lg">
                            {reel.username}
                          </span>
                        </div>
                      </div>

                      {/* Center Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </div>
                      </div>

                      {/* Right Side Actions */}
                      <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4">
                        <div className="flex flex-col items-center">
                          <Heart className="w-6 h-6 text-white drop-shadow-lg" />
                          <span className="text-white text-[10px] font-medium mt-1">{reel.likes}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <MessageCircle className="w-6 h-6 text-white drop-shadow-lg" />
                          <span className="text-white text-[10px] font-medium mt-1">{reel.comments}</span>
                        </div>
                        <Send className="w-6 h-6 text-white drop-shadow-lg" />
                        <Bookmark className="w-6 h-6 text-white drop-shadow-lg" />
                      </div>

                      {/* Bottom Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-white text-xs font-medium line-clamp-2 pr-10">
                          {reel.caption}
                        </p>
                      </div>

                      {/* Reels Icon */}
                      <div className="absolute top-3 right-3">
                        <svg className="w-5 h-5 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500}>
            <div className="text-center mt-12">
              <p className="text-muted-foreground italic">
                *Dit zijn mockups ter illustratie. Echte verhalen vind je in de app.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
