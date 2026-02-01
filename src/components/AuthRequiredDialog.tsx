import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuthCard } from "@/components/AuthCard";
import { Sparkles, Lock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthRequiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  pendingRoute?: string;
}

export const AuthRequiredDialog = ({ open, onOpenChange, onSuccess, pendingRoute }: AuthRequiredDialogProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] sm:max-w-[85vw] md:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden p-0 border-0 bg-transparent shadow-none [&>button]:hidden"
      >
        <div className="relative max-w-full">
          {/* Custom Close Button - Smaller Size */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-50 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 hover:scale-110 active:scale-95 group"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
          </button>

          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl"></div>
            <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Content */}
          <div className="relative bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="relative px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl blur-lg opacity-50 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-lg">
                          <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1"
                        >
                          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                        </motion.div>
                      </motion.div>
                    </div>

                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-lg sm:text-xl md:text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2"
                    >
                      Just a Quick Step Before Moving Ahead!
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-center text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-3 px-2"
                    >
                      Create an account or sign in to continue. It only takes a few seconds!
                    </motion.p>

                    {/* Feature badges */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
                    >
                      {[
                        "🔒 Secure",
                        "⚡ Quick",
                        "🎯 Easy"
                      ].map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.1, type: "spring" }}
                          className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white dark:bg-slate-800 rounded-full text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700"
                        >
                          {feature}
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-3 sm:p-4"
            >
              <AuthCard onSuccess={onSuccess} showHeader={false} returnUrl={pendingRoute} />
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};