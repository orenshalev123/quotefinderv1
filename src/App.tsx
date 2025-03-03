
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Articles from "./pages/Articles";
import ContentfulArticle from "./components/contentful/ContentfulArticle";
import PreviewPage from "./pages/api/preview";
import QuoteFinderArticle from "./pages/articles/QuoteFinderArticle";

// Keep static article pages for fallback
import UnderstandingCoverageTypes from "./pages/articles/UnderstandingCoverageTypes";
import LowerPremium from "./pages/articles/LowerPremium";
import AfterAccident from "./pages/articles/AfterAccident";
import ComprehensiveVsCollision from "./pages/articles/ComprehensiveVsCollision";
import LiabilityCoverage from "./pages/articles/LiabilityCoverage";
import UninsuredMotorist from "./pages/articles/UninsuredMotorist";
import InsuranceDiscounts from "./pages/articles/InsuranceDiscounts";
import TelematicsSavings from "./pages/articles/TelematicsSavings";
import BundleSave from "./pages/articles/BundleSave";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Articles Listing Page */}
          <Route path="/articles" element={<Articles />} />
          
          {/* Preview API Route */}
          <Route path="/api/preview" element={<PreviewPage />} />
          
          {/* Dynamic Contentful Article Route */}
          <Route path="/articles/:slug" element={<ContentfulArticle />} />
          
          {/* QuoteFinder Article (Static, no Contentful) */}
          <Route path="/quote-finder/:slug" element={<QuoteFinderArticle />} />
          <Route path="/quote-finder" element={<QuoteFinderArticle />} />
          
          {/* Legacy Static Article Routes (for fallback) */}
          <Route path="/articles/understanding-coverage-types" element={<UnderstandingCoverageTypes />} />
          <Route path="/articles/lower-premium" element={<LowerPremium />} />
          <Route path="/articles/after-accident" element={<AfterAccident />} />
          <Route path="/articles/comprehensive-vs-collision" element={<ComprehensiveVsCollision />} />
          <Route path="/articles/liability-coverage" element={<LiabilityCoverage />} />
          <Route path="/articles/uninsured-motorist" element={<UninsuredMotorist />} />
          <Route path="/articles/insurance-discounts" element={<InsuranceDiscounts />} />
          <Route path="/articles/telematics-savings" element={<TelematicsSavings />} />
          <Route path="/articles/bundle-save" element={<BundleSave />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
