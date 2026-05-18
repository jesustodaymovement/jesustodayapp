import { Helmet } from 'react-helmet-async';
import { AudienceProvider, useAudience } from '@/contexts/AudienceContext';
import { Header } from '@/components/sections/Header';
import { HeroAudience } from '@/components/sections/HeroAudience';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { GuideSection } from '@/components/sections/GuideSection';
import { PlanSection } from '@/components/sections/PlanSection';
import { SuccessSection } from '@/components/sections/SuccessSection';
import { VideoSliderSection } from '@/components/sections/VideoSliderSection';
import { ChurchSection } from '@/components/sections/ChurchSection';
import { CTASection } from '@/components/sections/CTASection';
import { DiscoverProblemSection } from '@/components/sections/DiscoverProblemSection';
import { DiscoverOutcomesSection } from '@/components/sections/DiscoverOutcomesSection';
import { NextStepsSection } from '@/components/sections/NextStepsSection';
import { AskQuestionSection } from '@/components/sections/AskQuestionSection';
import { Footer } from '@/components/sections/Footer';

const HomeTestContent = () => {
  const { mode } = useAudience();

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <HeroAudience />

        {mode === 'share' ? (
          <>
            <ProblemSection />
            <GuideSection />
            <div id="hoe-werkt-het">
              <PlanSection />
            </div>
            <SuccessSection />
            <VideoSliderSection />
            <ChurchSection />
            <CTASection />
          </>
        ) : (
          <>
            <DiscoverProblemSection />
            <VideoSliderSection
              title={<>Ontdek <span className="text-gold">verhalen</span></>}
              subtitle="Ontdek hoe anderen hoop vonden in een wereld vol vragen."
            />
            <DiscoverOutcomesSection />
            <NextStepsSection />
            <AskQuestionSection />
            <CTASection />
          </>
        )}

        <Footer />
      </main>
    </>
  );
};

const HomeTest = () => {
  return (
    <AudienceProvider>
      <Helmet>
        <title>Jesus Today - Kies jouw reis | Vertel of ontdek</title>
        <meta
          name="description"
          content="Of je nu jouw verhaal wilt delen of God wilt ontdekken, Jesus Today begeleidt je in jouw reis. Kies wat bij jou past."
        />
        <link rel="canonical" href="https://jesustoday.nl/" />
      </Helmet>
      <HomeTestContent />
    </AudienceProvider>
  );
};

export default HomeTest;