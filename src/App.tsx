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
import Jong from "./pages/Jong";
import Test22 from "./pages/Test22";
import Test23 from "./pages/Test23";
import Testimonies from "./pages/Testimonies";
import TestimonyDetail from "./pages/TestimonyDetail";
import NotFound from "./pages/NotFound";

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
            <Route path="/jong" element={<Jong />} />
            <Route path="/test22" element={<Test22 />} />
            <Route path="/test23" element={<Test23 />} />
            <Route path="/getuigenissen" element={<Testimonies />} />
            <Route path="/getuigenissen/:vimeoId" element={<TestimonyDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
