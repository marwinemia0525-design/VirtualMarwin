import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import FloatingCV from "@/components/FloatingCV";
import FloatingROI from "@/components/FloatingROI";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
const RoiCalculator = lazy(() => import("./pages/RoiCalculator"));
const CaseStudyDwinVideo = lazy(() => import("./pages/CaseStudyDwinVideo"));
const CaseStudyReceptionist = lazy(() => import("./pages/CaseStudyReceptionist"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <TooltipProvider>
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <FloatingCV />
        <FloatingROI />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/roi" element={<Suspense fallback={null}><RoiCalculator /></Suspense>} />
            <Route path="/case-studies/dwinvideo" element={<Suspense fallback={null}><CaseStudyDwinVideo /></Suspense>} />
            <Route path="/case-studies/ai-receptionist" element={<Suspense fallback={null}><CaseStudyReceptionist /></Suspense>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
