import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { GuideSection } from '@/components/sections/GuideSection';
import { PlanSection } from '@/components/sections/PlanSection';
import { CTASection } from '@/components/sections/CTASection';
import { SuccessSection } from '@/components/sections/SuccessSection';
import { ChurchSection } from '@/components/sections/ChurchSection';
import { VideoSliderSection } from '@/components/sections/VideoSliderSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { InstagramReelsSection } from '@/components/sections/InstagramReelsSection';
import { Footer } from '@/components/sections/Footer';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Jesus Today - Deel jouw getuigenis | Jouw verhaal, Gods impact</title>
        <meta 
          name="description" 
          content="Wil je over Jezus vertellen maar vind je het spannend? Jesus Today helpt je om jouw persoonlijke getuigenis eenvoudig en impactvol te delen via video en QR-codes." 
        />
        <meta name="keywords" content="getuigenis, evangelisatie, christelijke app, Jezus delen, geloof delen, video getuigenis" />
        <link rel="canonical" href="https://jesustoday.nl" />
        <meta property="og:title" content="Jesus Today - Deel jouw getuigenis" />
        <meta property="og:description" content="Jouw getuigenis. Eenvoudig gedeeld. Door God gebruikt." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      <main className="overflow-hidden">
        <HeroSection />
        <ProblemSection />
        <GuideSection />
        <VideoSliderSection />
        <SuccessSection />
        <PlanSection />
        <TestimonialsSection />
        <InstagramReelsSection />
        <ChurchSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
