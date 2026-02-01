import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Users, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/use-auth";
import { AuthRequiredDialog } from "@/components/AuthRequiredDialog";

const FlatmateTypeSelection = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showAuthDialog, setShowAuthDialog] = useState(false);
    const [pendingRoute, setPendingRoute] = useState<string>("");

    const handleOptionOne = () => {
        navigate('/find-flatmate');
    };

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
                    background: 'linear-gradient(to bottom, #0f172a 0%, #1e293b 50%, #334155 100%)',
                    margin: 0,
                    padding: 0,
                }}
            >
                {/* Subtle Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-10 w-96 h-96 bg-slate-700/10 rounded-full blur-3xl"
                        animate={{
                            x: [0, 20, 0],
                            y: [0, 30, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-[32rem] h-[32rem] bg-slate-600/10 rounded-full blur-3xl"
                        animate={{
                            x: [0, -25, 0],
                            y: [0, -20, 0],
                            scale: [1, 1.15, 1],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                </div>

                {/* Floating Particles */}
                <div className="hidden sm:block absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-slate-400/20 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.1, 0.4, 0.1],
                            }}
                            transition={{
                                duration: 5 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                            }}
                        />
                    ))}
                </div>

                {/* Main Content */}
                <div className="flex items-center justify-center min-h-screen px-3 sm:px-4 py-20 sm:py-16 relative z-10">
                    <div className="max-w-5xl w-full">

                        {/* Options Container - Centered and Compact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 max-w-3xl mx-auto px-2 sm:px-4">

                            {/* Option 1: I Have a Flat */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                onClick={handleOptionOne}
                                className="group relative cursor-pointer"
                            >
                                <div
                                    className="relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl p-3 sm:p-4 md:p-5 shadow-xl transition-all duration-300 border border-slate-700/50 hover:border-purple-500/50 hover:scale-[1.01] hover:shadow-purple-500/20"
                                    style={{
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.4), 0 0 20px rgba(148,163,184,0.03)',
                                    }}
                                >
                                    {/* Shine Effect */}
                                    <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Gradient Border on Hover */}
                                    <div className="hidden sm:block absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '1px' }}>
                                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg sm:rounded-xl"></div>
                                    </div>

                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-md shadow-purple-500/20 mb-2 sm:mb-3">
                                            <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                                            I live in a Flat
                                        </h2>

                                        {/* Description */}
                                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3">
                                            Looking for flatmates to fill rooms
                                        </p>

                                        {/* Action Text */}
                                        <div className="flex items-center gap-1.5 text-purple-400 font-medium text-xs transition-all duration-200">
                                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            <span>List your flat & find flatmates</span>
                                        </div>

                                        {/* Features */}
                                        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-700/50 space-y-1.5">
                                            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                                                <div className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0"></div>
                                                <span>Post your listing in seconds</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                                                <div className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0"></div>
                                                <span>Connect with verified flatmates</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                                                <div className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0"></div>
                                                <span>100% free, always</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Option 2: I Need Flatmates */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.15 }}
                                onClick={() => handleNavigation('/flatmate-requirement-queries')}
                                className="group relative cursor-pointer"
                            >
                                <div
                                    className="relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl p-3 sm:p-4 md:p-5 shadow-xl transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/50 hover:scale-[1.01] hover:shadow-cyan-500/20"
                                    style={{
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.4), 0 0 20px rgba(148,163,184,0.03)',
                                    }}
                                >
                                    {/* Shine Effect */}
                                    <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Gradient Border on Hover */}
                                    <div className="hidden sm:block absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '1px' }}>
                                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg sm:rounded-xl"></div>
                                    </div>

                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md shadow-cyan-500/20 mb-2 sm:mb-3">
                                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                                            I don't have a flat yet
                                        </h2>

                                        {/* Description */}
                                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3">
                                            Looking for people to move in together
                                        </p>

                                        {/* Action Text */}
                                        <div className="flex items-center gap-1.5 text-cyan-400 font-medium text-xs transition-all duration-200">
                                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            <span>Create profile & connect with others</span>
                                        </div>

                                        {/* Coming Soon Badge
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                                            <span className="text-cyan-400 text-xs sm:text-sm font-medium">Coming Soon</span>
                                        </div> */}

                                        {/* Features */}
                                        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-700/50 space-y-1.5">
                                            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                                                <div className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0"></div>
                                                <span>Create your flatmate profile</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                                                <div className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0"></div>
                                                <span>Match with compatible people</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                                                <div className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0"></div>
                                                <span>Find your perfect living group</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>

                    </div>
                </div>
            </div>

            {/* Add shimmer animation to global styles */}
            <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>

            {/* Auth Required Dialog */}
            <AuthRequiredDialog
                open={showAuthDialog}
                onOpenChange={setShowAuthDialog}
                onSuccess={handleAuthSuccess}
                pendingRoute={pendingRoute}
            />
        </>
    );
};

export default FlatmateTypeSelection;
