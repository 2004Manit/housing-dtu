import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { AuthRequiredDialog } from "@/components/AuthRequiredDialog";
import Navbar from "@/components/Navbar";

const openWhatsApp = () => {
  const phoneNumber = "918826871082"; 
  const message = encodeURIComponent("Hey, I am looking for a flatmate or roommate for my property");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};

const FindFlatmate = () => {
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
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 -left-10 sm:top-20 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-10 -right-10 sm:bottom-20 sm:right-10 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-green-400/15 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Floating Particles - Reduce on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-3 sm:px-4 py-24 sm:py-20 md:py-8 relative z-10">
        <div className="max-w-6xl w-full">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8 md:mb-10 px-2"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg"
            >
              Find Your Perfect Flatmate
              <br />
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-cyan-400 via-green-400 to-orange-400 bg-clip-text text-transparent">
                In Record Time!
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4"
            >
              Connect with verified students and professionals – no hassle, no commission!
            </motion.p>
          </motion.div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto px-2 sm:px-0">
            
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
                      Post your property in seconds. Connect directly with potential flatmates.
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

            {/* We'll List It Card */}
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

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-5 sm:mt-6"
          >
            <p className="text-white/70 text-xs sm:text-sm">
              ✨ Trusted by students & professionals near DTU
            </p>
          </motion.div>
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

export default FindFlatmate;