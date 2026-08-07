import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import KineticGrid from "@/components/KineticGrid";
import PointerFX from "@/components/PointerFX";
import RouteProgress from "@/components/RouteProgress";
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
const CaseStudyHealthcareFrontDesk = lazy(() => import("./pages/CaseStudyHealthcareFrontDesk"));
const CaseStudyContentPipeline = lazy(() => import("./pages/CaseStudyContentPipeline"));
const CaseStudyEcommerceReconciliation = lazy(() => import("./pages/CaseStudyEcommerceReconciliation"));
const CaseStudyInvoiceReconciliation = lazy(() => import("./pages/CaseStudyInvoiceReconciliation"));
const CaseStudyVapiGhlSync = lazy(() => import("./pages/CaseStudyVapiGhlSync"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <TooltipProvider>
        {/*KG*/}
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <PointerFX />
        <FloatingCV />
        <FloatingROI />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/roi" element={<Suspense fallback={<RouteProgress />}><RoiCalculator /></Suspense>} />
            <Route path="/case-studies/dwinvideo" element={<Suspense fallback={<RouteProgress />}><CaseStudyDwinVideo /></Suspense>} />
            <Route path="/case-studies/ai-receptionist" element={<Suspense fallback={<RouteProgress />}><CaseStudyReceptionist /></Suspense>} />
            <Route path="/case-studies/healthcare-front-desk" element={<Suspense fallback={<RouteProgress />}><CaseStudyHealthcareFrontDesk /></Suspense>} />
            <Route path="/case-studies/content-pipeline" element={<Suspense fallback={<RouteProgress />}><CaseStudyContentPipeline /></Suspense>} />
            <Route path="/case-studies/ecommerce-reconciliation" element={<Suspense fallback={<RouteProgress />}><CaseStudyEcommerceReconciliation /></Suspense>} />
            <Route path="/case-studies/invoice-reconciliation" element={<Suspense fallback={<RouteProgress />}><CaseStudyInvoiceReconciliation /></Suspense>} />
            <Route path="/case-studies/vapi-ghl-sync" element={<Suspense fallback={<RouteProgress />}><CaseStudyVapiGhlSync /></Suspense>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
