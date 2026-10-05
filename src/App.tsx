import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CookieConsent } from "./components/CookieConsent";

import { ScrollToTop } from "./components/ScrollToTop";
import { LangSync } from "./components/LangSync";
import { PREFIX_LANGS, PAGE_SLUGS } from "./lib/routes";
import { useParams } from "react-router-dom";

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

const OldEnChurchRedirect = () => {
  const { churchSlug } = useParams();
  return <Navigate to={`/en/stories-about-jesus/church/${churchSlug}`} replace />;
};

const localizedPages: { nl: string; el: () => JSX.Element }[] = [
  { nl: "/verhalen-over-jezus", el: () => <Testimonies /> },
  { nl: "/verhalen-over-jezus/:vimeoId", el: () => <TestimonyDetail /> },
  { nl: "/verhalen-over-jezus/kerk/:churchSlug", el: () => <Testimonies /> },
  { nl: "/doneren", el: () => <Doneren /> },
  { nl: "/steun", el: () => <Steun /> },
  { nl: "/privacy", el: () => <Privacy /> },
  { nl: "/disclaimer", el: () => <Disclaimer /> },
  { nl: "/over-ons", el: () => <OverOns /> },
  { nl: "/media", el: () => <Media /> },
  { nl: "/contact", el: () => <Contact /> },
  { nl: "/upload", el: () => <Upload /> },
  { nl: "/partners", el: () => <Partners /> },
  { nl: "/nations", el: () => <Nations /> },
  { nl: "/shoop-shoop-partners", el: () => <ShoopShoopPartners /> },
  { nl: "/aanmelden-nieuwsbrief", el: () => <Nieuwsbrief /> },
];

const enPath = (nl: string) => {
  const parts = nl.split("/").filter(Boolean);
  parts[0] = PAGE_SLUGS[parts[0]] ?? parts[0];
  return "/" + parts.map((p) => (p === "kerk" ? "church" : p)).join("/");
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
          <LangSync />
          <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomeGate />} />
            <Route path="/base" element={<Base />} />
            {localizedPages.map(({ nl, el }) => (
              <Route key={nl} path={nl} element={el()} />
            ))}
            {PREFIX_LANGS.flatMap((l) => [
              <Route key={`${l}-home`} path={`/${l}`} element={<HomeGate />} />,
              <Route key={`${l}-oldchurch`} path={`/${l}/stories/church/:churchSlug`} element={<OldEnChurchRedirect />} />,
              ...localizedPages.map(({ nl, el }) => (
                <Route key={`${l}${nl}`} path={`/${l}${enPath(nl)}`} element={el()} />
              )),
            ])}
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
