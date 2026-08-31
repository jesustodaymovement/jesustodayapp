import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CookieConsent } from "./components/CookieConsent";

import { ScrollToTop } from "./components/ScrollToTop";

import { useEffect, useState, lazy, Suspense } from "react";

const HomeTest = lazy(() => import("./pages/HomeTest"));
const Base = lazy(() => import("./pages/Base"));
const Testimonies = lazy(() => import("./pages/Testimonies"));
const TestimonyDetail = lazy(() => import("./pages/TestimonyDetail"));
const Doneren = lazy(() => import("./pages/Doneren"));
const Steun = lazy(() => import("./pages/Steun"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const OverOns = lazy(() => import("./pages/OverOns"));
const Media = lazy(() => import("./pages/Media"));
const Contact = lazy(() => import("./pages/Contact"));
const Upload = lazy(() => import("./pages/Upload"));
const Partners = lazy(() => import("./pages/Partners"));
const Nations = lazy(() => import("./pages/Nations"));
const ShoopShoopPartners = lazy(() => import("./pages/ShoopShoopPartners"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminSubmissions = lazy(() => import("./pages/admin/AdminSubmissions"));
const Opwekking = lazy(() => import("./pages/Opwekking"));
const Nieuwsbrief = lazy(() => import("./pages/Nieuwsbrief"));
const OpwekkingGetuigenissenForm = lazy(() => import("./pages/OpwekkingGetuigenissenForm"));
const ChatWidget = lazy(() =>
  import("./components/ChatWidget").then((m) => ({ default: m.ChatWidget }))
);

const HomeGate = () => {
  // Toon altijd eerst het keuzescherm bij het openen van de site.
  // Na een keuze (seeker/believer) wordt de bijbehorende pagina getoond.
  const [chosen, setChosen] = useState(false);
  return chosen ? <HomeTest /> : <Base onChoose={() => setChosen(true)} />;
};

const queryClient = new QueryClient();

// Legacy WordPress URL-redirects (jesustoday.app), SPA "soft redirects" via React Router.
const legacyRedirects: { from: string; to: string }[] = [
  { from: "/stories", to: "/verhalen-over-jezus" },
  { from: "/verhalen", to: "/verhalen-over-jezus" },
  { from: "/getuigenissen", to: "/verhalen-over-jezus" },
  { from: "/verhaalsen", to: "/verhalen-over-jezus" },
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
  { from: "/nieuws", to: "/media" },
  { from: "/vacatures", to: "/" },
  { from: "/vacature", to: "/" },
  { from: "/checklist", to: "/" },
  { from: "/testen", to: "/" },
  { from: "/languages", to: "/" },
  { from: "/aanmelden", to: "/aanmeldenopwekking2026" },
  { from: "/opwekking", to: "/aanmeldenopwekking2026" },
  { from: "/15c42-web-agency-gb-home", to: "/" },
  { from: "/15c42-web-agency-gb-portfolio", to: "/" },
  { from: "/15c42-web-agency-gb-portfolio-single", to: "/" },
  { from: "/kerken", to: "/partners" },
];

const ChatWidgetDeferred = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const onLoad = () => {
      if (w.requestIdleCallback) w.requestIdleCallback(() => setShow(true));
      else setTimeout(() => setShow(true), 1500);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <ChatWidget />
    </Suspense>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomeGate />} />
            <Route path="/base" element={<Base />} />
            <Route path="/verhalen-over-jezus" element={<Testimonies />} />
            <Route path="/verhalen-over-jezus/:vimeoId" element={<TestimonyDetail />} />
            <Route path="/doneren" element={<Doneren />} />
            <Route path="/steun" element={<Steun />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/over-ons" element={<OverOns />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/nations" element={<Nations />} />
            <Route path="/shoop-shoop-partners" element={<ShoopShoopPartners />} />
            <Route path="/aanmeldenopwekking2026" element={<Opwekking />} />
            <Route path="/aanmelden-nieuwsbrief" element={<Nieuwsbrief />} />
            <Route path="/opwekkinggetuigenissenform" element={<OpwekkingGetuigenissenForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/inzendingen" element={<AdminSubmissions />} />
            <Route path="/admin" element={<Navigate to="/admin/inzendingen" replace />} />
            {legacyRedirects.flatMap(({ from, to }) => [
              <Route key={from} path={from} element={<Navigate to={to} replace />} />,
              <Route key={`${from}/`} path={`${from}/`} element={<Navigate to={to} replace />} />,
            ])}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          <CookieConsent />
          <ChatWidgetDeferred />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
