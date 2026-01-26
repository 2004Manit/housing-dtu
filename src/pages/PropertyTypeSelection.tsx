import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {Building2, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { AuthRequiredDialog } from "@/components/AuthRequiredDialog";
import Navbar from "@/components/Navbar";

const PropertyTypeSelection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string>("");

  const handleNavigation = (route: string) => {
    if (!user) {
      setPendingRoute(route);
      setShowAuthDialog(true);
    } else {
      navigate(route);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthDialog(false);
    if (pendingRoute) {
      navigate(pendingRoute);
    }
  };

  return (
     <>
    <Navbar />
    <div 
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{
        background: 'radial-gradient(circle at center, #1e3a5f 0%, #0a1628 100%)',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-3 sm:px-4 py-24 sm:py-20 md:py-8">
        <div className="max-w-5xl w-full">
          {/* Title Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-10 md:mb-12 px-2"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200"
            >
              What Property Do You Want to List?
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4"
            >
              Choose the type of property you want to list on our platform
            </motion.p>
          </motion.div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-2 sm:px-0">
            
            {/* PG Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
              }}
              onClick={() => {
                handleNavigation('/pg-listing-form');
              }}
            >
              <div className="p-6 sm:p-8 md:p-10">
                {/* Gradient glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                  }}
                />
                
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-4 sm:mb-5"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 197, 253, 0.2) 100%)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)',
                    }}
                  >
                    <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-blue-300" />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
                    PG
                  </h2>
                </div>

                {/* Top accent line */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent)',
                  }}
                ></div>

                {/* Bottom accent line */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent)',
                  }}
                ></div>
              </div>
            </motion.div>

            {/* Flat Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
              }}
              onClick={() => {
                handleNavigation('/flat-listing-form');
              }}
            >
              <div className="p-6 sm:p-8 md:p-10">
                {/* Gradient glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
                  }}
                />
                
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-4 sm:mb-5"
                    style={{
                      background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(125, 211, 252, 0.2) 100%)',
                      border: '1px solid rgba(14, 165, 233, 0.3)',
                      boxShadow: '0 8px 32px rgba(14, 165, 233, 0.15)',
                    }}
                  >
                    <Home className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-300" />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
                    Flat
                  </h2>
                </div>

                {/* Top accent line */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.8), transparent)',
                  }}
                ></div>

                {/* Bottom accent line */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.8), transparent)',
                  }}
                ></div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Auth Required Dialog */}
      <AuthRequiredDialog 
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onSuccess={handleAuthSuccess}
        pendingRoute={pendingRoute}
      />
    </div>
    </>
  );
};

export default PropertyTypeSelection;