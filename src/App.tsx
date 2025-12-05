
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SessionProvider } from "./contexts/SessionContext";
import ErrorBoundary from "./components/ErrorBoundary";
import TurkishPrivateUniversitiesAR from "./pages/TurkishPrivateUniversitiesAR";
import TurkishPrivateUniversitiesEN from "./pages/TurkishPrivateUniversitiesEN";
import StudyInTurkeyAR from "./pages/StudyInTurkeyAR";
import StudyInTurkeyEN from "./pages/StudyInTurkeyEN";
import TuitionFees2025AR from "./pages/TuitionFees2025AR";
import TuitionFees2025EN from "./pages/TuitionFees2025EN";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ar/turkish-private-universities" element={<TurkishPrivateUniversitiesAR />} />
          <Route path="/en/turkish-private-universities" element={<TurkishPrivateUniversitiesEN />} />
          <Route path="/ar/study-in-turkey" element={<StudyInTurkeyAR />} />
          <Route path="/en/study-in-turkey" element={<StudyInTurkeyEN />} />
          <Route path="/ar/tuition-fees-turkey-2025" element={<TuitionFees2025AR />} />
          <Route path="/en/tuition-fees-turkey-2025" element={<TuitionFees2025EN />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <SessionProvider>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </SessionProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
