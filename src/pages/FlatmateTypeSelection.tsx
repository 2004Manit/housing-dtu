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
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(10)].map((_, i) => (
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-4xl mx-auto px-2 sm:px-4">

                            {/* Option 1: I Have a Flat */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                onClick={handleOptionOne}
                                className="group relative cursor-pointer"
                            >
                                <div
                                    className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl p-5 sm:p-6 md:p-7 shadow-2xl transition-all duration-500 border border-slate-700/50 hover:border-purple-500/50 hover:scale-[1.03] hover:shadow-purple-500/20"
                                    style={{
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(148,163,184,0.05)',
                                    }}
                                >
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-shimmer" />

                                    {/* Gradient Border on Hover */}
                                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '1px' }}>
                                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl"></div>
                                    </div>

                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                                            transition={{ duration: 0.5 }}
                                            className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 mb-4 sm:mb-5 transition-transform duration-500 group-hover:scale-110"
                                        >
                                            <Home className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                        </motion.div>

                                        {/* Title */}
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 sm:mb-3">
                                            I live in a Flat
                                        </h2>

                                        {/* Description */}
                                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                                            Looking for flatmates to fill rooms
                                        </p>

                                        {/* Action Text */}
                                        <div className="flex items-center gap-2 text-purple-400 font-medium text-xs sm:text-sm group-hover:gap-3 transition-all duration-300">
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                            <span>List your flat & find flatmates</span>
                                        </div>

                                        {/* Features */}
                                        <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-slate-700/50 space-y-2">
                                            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
                                                <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                                                <span>Post your listing in seconds</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
                                                <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                                                <span>Connect with verified flatmates</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
                                                <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                                                <span>100% free, always</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Option 2: I Need Flatmates */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                onClick={() => handleNavigation('/flatmate-requirement-queries')}
                                className="group relative cursor-pointer"
                            >
                                <div
                                    className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl p-5 sm:p-6 md:p-7 shadow-2xl transition-all duration-500 border border-slate-700/50 hover:border-cyan-500/50 hover:scale-[1.03] hover:shadow-cyan-500/20"
                                    style={{
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(148,163,184,0.05)',
                                    }}
                                >
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-shimmer" />

                                    {/* Gradient Border on Hover */}
                                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '1px' }}>
                                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl"></div>
                                    </div>

                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ rotate: [0, 5, -5, 5, 0] }}
                                            transition={{ duration: 0.5 }}
                                            className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30 mb-4 sm:mb-5 transition-transform duration-500 group-hover:scale-110"
                                        >
                                            <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                        </motion.div>

                                        {/* Title */}
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 sm:mb-3">
                                            I don't have a flat yet
                                        </h2>

                                        {/* Description */}
                                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                                            Looking for people to move in together
                                        </p>

                                        {/* Action Text */}
                                        <div className="flex items-center gap-2 text-cyan-400 font-medium text-xs sm:text-sm mb-3">
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span>Create profile & connect with others</span>
                                        </div>

                                        {/* Coming Soon Badge
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                                            <span className="text-cyan-400 text-xs sm:text-sm font-medium">Coming Soon</span>
                                        </div> */}

                                        {/* Features */}
                                        <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-slate-700/50 space-y-2">
                                            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
                                                <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                                                <span>Create your flatmate profile</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
                                                <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                                                <span>Match with compatible people</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
                                                <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
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
