import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { AuthProvider } from '@/contexts/AuthContext';
import SplashScreenManager from "@/components/SplashScreenManager";
import LoadingFallback from "@/components/LoadingFallback";

// Lazy load all page components for better performance
const Index = lazy(() => import("./pages/Index"));
const Properties = lazy(() => import("./pages/Properties"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const ListProperty = lazy(() => import("./pages/ListProperty"));
const FindFlatmate = lazy(() => import("./pages/FindFlatmate"));
const FlatmateTypeSelection = lazy(() => import("./pages/FlatmateTypeSelection"));
const FlatmateRequirementQueries = lazy(() => import("./pages/FlatmateRequirementQueries"));
const PropertyTypeSelection = lazy(() => import("./pages/PropertyTypeSelection"));
const PGListingForm = lazy(() => import("./pages/PGListingForm"));
const FlatListingForm = lazy(() => import("./pages/FlatListingForm"));
const PropertyListingSuccess = lazy(() => import("./pages/PropertyListingSuccess"));
const FlatListingSuccess = lazy(() => import("./pages/FlatListingSuccess"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <SplashScreenManager>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/property-detail/:id" element={<PropertyDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/about" element={<About />} />
                <Route path="/list-property" element={<ListProperty />} />
                <Route path="/find-flatmate" element={<FindFlatmate />} />
                <Route path="/flatmate-type-selection" element={<FlatmateTypeSelection />} />
                <Route path="/flatmate-requirement-queries" element={<FlatmateRequirementQueries />} />
                <Route path="/property-type-selection" element={<PropertyTypeSelection />} />
                <Route path="/pg-listing-form" element={<PGListingForm />} />
                <Route path="/flat-listing-form" element={<FlatListingForm />} />
                <Route path="/property-listing-success" element={<PropertyListingSuccess />} />
                <Route path="/flat-listing-success" element={<FlatListingSuccess />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SplashScreenManager>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;