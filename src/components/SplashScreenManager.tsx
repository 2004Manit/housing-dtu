import { useState, useEffect, ReactNode } from "react";
import SplashScreen from "./SplashScreen";

interface SplashScreenManagerProps {
  children: ReactNode;
}

export default function SplashScreenManager({ children }: SplashScreenManagerProps) {
  // Check sessionStorage synchronously during initialization to prevent content flash
  const [showSplash, setShowSplash] = useState(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    // Show splash if user hasn't seen it yet in this session
    return !hasSeenSplash;
  });

  useEffect(() => {
    // Check if splash has been shown in this tab session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      // First time in this tab - show splash as overlay
      setShowSplash(true);

      // After 4.5 seconds (splash animation duration), hide splash and mark as seen
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 4500);

      return () => clearTimeout(timer);
    }
    // Already seen in this tab - don't show splash (content still renders immediately)
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