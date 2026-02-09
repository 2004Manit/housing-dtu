import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { AuthProvider } from '@/contexts/AuthContext';
import SplashScreenManager from "@/components/SplashScreenManager";
import LoadingFallback from "@/components/LoadingFallback";
import * as Sentry from "@sentry/react";
import { lazyWithRetry } from "@/utils/lazyWithRetry";

// Lazy load all page components with automatic retry on network failures
const Index = lazyWithRetry(() => import("./pages/Index"));
const Properties = lazyWithRetry(() => import("./pages/Properties"));
const PropertyDetail = lazyWithRetry(() => import("./pages/PropertyDetail"));
const Services = lazyWithRetry(() => import("./pages/Services"));
const Contact = lazyWithRetry(() => import("./pages/Contact"));
const Auth = lazyWithRetry(() => import("./pages/Auth"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
const About = lazyWithRetry(() => import("./pages/About"));
const ListProperty = lazyWithRetry(() => import("./pages/ListProperty"));
const FindFlatmate = lazyWithRetry(() => import("./pages/FindFlatmate"));
const FlatmateTypeSelection = lazyWithRetry(() => import("./pages/FlatmateTypeSelection"));
const FlatmateRequirementQueries = lazyWithRetry(() => import("./pages/FlatmateRequirementQueries"));
const PropertyTypeSelection = lazyWithRetry(() => import("./pages/PropertyTypeSelection"));
const PGListingForm = lazyWithRetry(() => import("./pages/PGListingForm"));
const FlatListingForm = lazyWithRetry(() => import("./pages/FlatListingForm"));
const PropertyListingSuccess = lazyWithRetry(() => import("./pages/PropertyListingSuccess"));
const FlatListingSuccess = lazyWithRetry(() => import("./pages/FlatListingSuccess"));
const AdminDashboard = lazyWithRetry(() => import("./pages/AdminDashboard"));


const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <Sentry.ErrorBoundary fallback={<div className="min-h-screen flex items-center justify-center bg-background text-white"><p>Something went wrong. Please refresh the page.</p></div>}>
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
  </Sentry.ErrorBoundary>
);

export default App;