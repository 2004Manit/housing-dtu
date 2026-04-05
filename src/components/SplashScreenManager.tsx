import { useState, useEffect, ReactNode } from "react";
import SplashScreen from "./SplashScreen";

interface SplashScreenManagerProps {
  children: ReactNode;
}

export default function SplashScreenManager({ children }: SplashScreenManagerProps) {
  // Check sessionStorage synchronously during initialization to prevent content flash


  const [showSplash, setShowSplash] = useState(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    const isCompassAI = window.location.pathname === "/compass-ai";

    return !hasSeenSplash && !isCompassAI;
  });

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    const isCompassAI = window.location.pathname === "/compass-ai";

    if (!hasSeenSplash && !isCompassAI) {
      setShowSplash(true);

      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* Content renders immediately - critical for LCP and SEO */}
      {children}
      {/* Splash displays as fixed overlay on top when shown */}
      {showSplash && <SplashScreen />}
    </>
  );
}