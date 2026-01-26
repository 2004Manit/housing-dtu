import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, MessageSquare, Users, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { AuthRequiredDialog } from "@/components/AuthRequiredDialog";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";


const openWhatsApp = () => {
  const phoneNumber = "918826871082"; 
  const message = encodeURIComponent("Hey, I want to list a property on Housing DTU");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};

const ListProperty = () => {
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
        background: 'radial-gradient(circle at center, #3E2733 0%, #110512 100%)',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-3 sm:px-4 py-24 sm:py-20 md:py-8">
        <div className="max-w-6xl w-full">
          {/* Title Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200">
              List Your Property
            </h1>
            <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
              Choose the option that works best for you
            </p>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-4xl mx-auto px-2 sm:px-0">
            
            {/* Self-List Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="group relative cursor-pointer"
              onClick={() => {
                handleNavigation('/property-type-selection');
              }}
            >
              <div 
                className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl p-4 sm:p-5 md:p-6 shadow-2xl transition-all duration-500 border-2 border-cyan-500/20 hover:scale-105"
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(6,182,212,0.1)',
                }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 via-green-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '2px' }}>
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl sm:rounded-2xl"></div>
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="mb-4 sm:mb-5">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500 to-green-500 shadow-lg shadow-cyan-500/50 mb-3 sm:mb-4 transition-transform duration-600 group-hover:rotate-[360deg]"
                      style={{ transition: 'transform 0.6s ease' }}
                    >
                      <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-2">
                      List It Yourself
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed px-2">
                      Post your property in seconds. Connect directly with potential customers.
                    </p>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-2.5">
                    <div className="flex items-center gap-2 sm:gap-2.5 text-gray-400 justify-center">
                      <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm">Post in under 100 seconds</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2.5 text-gray-400 justify-center">
                      <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm">Direct communication</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2.5 text-gray-400 justify-center">
                      <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm">100% free forever</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Us Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="group relative cursor-pointer"
              onClick={openWhatsApp}
            >
              <div 
                className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl p-4 sm:p-5 md:p-6 shadow-2xl transition-all duration-500 border-2 border-orange-500/20 hover:scale-105"
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(249,115,22,0.1)',
                }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-400 via-green-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '2px' }}>
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl sm:rounded-2xl"></div>
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="mb-4 sm:mb-5">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-500 to-green-500 shadow-lg shadow-orange-500/50 mb-3 sm:mb-4 transition-transform duration-600 group-hover:rotate-[-360deg]"
                      style={{ transition: 'transform 0.6s ease' }}
                    >
                      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent mb-2">
                      We'll Help You List
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed px-2">
                      Sit back and relax! Our team handles everything – completely free.
                    </p>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-2.5">
                    <div className="flex items-center gap-2 sm:gap-2.5 text-gray-400 justify-center">
                      <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-gradient-to-r from-orange-400 to-green-400 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm">Professional listing creation</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2.5 text-gray-400 justify-center">
                      <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-gradient-to-r from-orange-400 to-green-400 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm">Curated property photos</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2.5 text-gray-400 justify-center">
                      <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-gradient-to-r from-orange-400 to-green-400 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm">Zero commission, always</span>
                    </div>
                  </div>
                </div>
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

      {/* Add animation styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
    </>
  );
};

export default ListProperty;