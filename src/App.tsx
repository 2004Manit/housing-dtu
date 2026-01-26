import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ListProperty from "./pages/ListProperty";
import FindFlatmate from "./pages/FindFlatmate";
import PropertyTypeSelection from "./pages/PropertyTypeSelection";
import PGListingForm from "./pages/PGListingForm";
import FlatListingForm from "./pages/FlatListingForm";
import PropertyListingSuccess from "./pages/PropertyListingSuccess";
import FlatListingSuccess from "./pages/FlatListingSuccess";
import { AuthProvider } from '@/contexts/AuthContext';
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect } from "react";
import SplashScreenManager from "@/components/SplashScreenManager";

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
              <Route path="/property-type-selection" element={<PropertyTypeSelection />} />
              <Route path="/pg-listing-form" element={<PGListingForm />} />
              <Route path="/flat-listing-form" element={<FlatListingForm />} />
              <Route path="/property-listing-success" element={<PropertyListingSuccess />} />
              <Route path="/flat-listing-success" element={<FlatListingSuccess />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SplashScreenManager>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;