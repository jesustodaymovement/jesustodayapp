import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomeVideo from "./pages/HomeVideo";
import Index from "./pages/Index";
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

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeVideo />} />
            <Route path="/hometest" element={<HomeTest />} />
            <Route path="/base" element={<Base />} />
            <Route path="/getuigenissen" element={<Testimonies />} />
            <Route path="/getuigenissen/:vimeoId" element={<TestimonyDetail />} />
            <Route path="/doneren" element={<Doneren />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/over-ons" element={<OverOns />} />
            <Route path="/media" element={<Media />} />
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
