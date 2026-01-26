import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";

interface TypewriterDisclaimerProps {
  text: string;
  className?: string;
}

export const TypewriterDisclaimer = ({ 
  text, 
  className = "" 
}: TypewriterDisclaimerProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20); // Speed of typing (20ms per character)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br from-red-500/10 to-red-600/5 border-2 border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 ${className}`}
    >
      <div className="flex items-start gap-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
        </motion.div>
        
        <div className="flex-1">
          <motion.p
            className="text-sm md:text-base text-red-200/90 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {displayedText}
            {currentIndex < text.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[2px] h-4 bg-red-400 ml-[2px]"
              />
            )}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
