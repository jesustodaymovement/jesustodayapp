import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomeTest from "./pages/HomeTest";
import Base from "./pages/Base";
import Testimonies from "./pages/Testimonies";
import TestimonyDetail from "./pages/TestimonyDetail";
import Doneren from "./pages/Doneren";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import OverOns from "./pages/OverOns";
import Media from "./pages/Media";
import NotFound from "./pages/NotFound";
import { CookieConsent } from "./components/CookieConsent";

import { useEffect, useState } from "react";

const AUDIENCE_KEY = "jt-audience-mode";

const HomeGate = () => {
  const [ready, setReady] = useState(false);
  const [hasMode, setHasMode] = useState(false);
  useEffect(() => {
    setHasMode(!!localStorage.getItem(AUDIENCE_KEY));
    setReady(true);
  }, []);
  if (!ready) return null;
  return hasMode ? <HomeTest /> : <Base />;
};

const queryClient = new QueryClient();

// Legacy WordPress URL-redirects (jesustoday.app), SPA "soft redirects" via React Router.
const legacyRedirects: { from: string; to: string }[] = [
  { from: "/stories", to: "/getuigenissen" },
  { from: "/verhalen", to: "/getuigenissen" },
  { from: "/deel-jouw-verhaal", to: "/" },
  { from: "/jesus-today", to: "/" },
  { from: "/over-jesus-today", to: "/over-ons" },
  { from: "/onze-droom", to: "/over-ons" },
  { from: "/voor-wie-en-waar", to: "/over-ons" },
  { from: "/over-de-app", to: "/" },
  { from: "/de-app", to: "/" },
  { from: "/doneren-2", to: "/doneren" },
  { from: "/en/donate", to: "/doneren" },
  { from: "/meedoen", to: "/doneren" },
  { from: "/meedoen-2", to: "/doneren" },
  { from: "/inspirator", to: "/" },
  { from: "/voor-inspirators", to: "/" },
  { from: "/wordt-inspirator", to: "/" },
  { from: "/privacy-verklaring", to: "/privacy" },
  { from: "/privacy-verklaring-2", to: "/privacy" },
  { from: "/cookiebeleid-eu", to: "/privacy" },
  { from: "/contact", to: "/" },
  { from: "/nieuws", to: "/media" },
  { from: "/vacatures", to: "/" },
  { from: "/vacature", to: "/" },
  { from: "/checklist", to: "/" },
  { from: "/testen", to: "/" },
  { from: "/languages", to: "/" },
  { from: "/aanmelden", to: "/" },
  { from: "/aanmelden-nieuwsbrief", to: "/" },
  { from: "/aanmeldenopwekking2026", to: "/" },
  { from: "/15c42-web-agency-gb-home", to: "/" },
  { from: "/15c42-web-agency-gb-portfolio", to: "/" },
  { from: "/15c42-web-agency-gb-portfolio-single", to: "/" },
];

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeGate />} />
            <Route path="/base" element={<Base />} />
            <Route path="/getuigenissen" element={<Testimonies />} />
            <Route path="/getuigenissen/:vimeoId" element={<TestimonyDetail />} />
            <Route path="/doneren" element={<Doneren />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/over-ons" element={<OverOns />} />
            <Route path="/media" element={<Media />} />
            {legacyRedirects.flatMap(({ from, to }) => [
              <Route key={from} path={from} element={<Navigate to={to} replace />} />,
              <Route key={`${from}/`} path={`${from}/`} element={<Navigate to={to} replace />} />,
            ])}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
