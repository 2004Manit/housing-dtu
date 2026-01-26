import { useState, useEffect, ReactNode } from "react";
import SplashScreen from "./SplashScreen";

interface SplashScreenManagerProps {
  children: ReactNode;
}

export default function SplashScreenManager({ children }: SplashScreenManagerProps) {
  const [showSplash, setShowSplash] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    // Check if splash has been shown in this tab session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      // First time in this tab - show splash
      setShowSplash(true);
      setSplashComplete(false);
      
      // After 4.5 seconds (splash animation duration), hide splash and mark as seen
      const timer = setTimeout(() => {
        setShowSplash(false);
        setSplashComplete(true);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 4500);

      setIsChecking(false);

      return () => clearTimeout(timer);
    } else {
      // Already seen in this tab - don't show splash
      setShowSplash(false);
      setSplashComplete(true);
      setIsChecking(false);
    }
  }, []);

  // Don't render anything while checking (prevents flash)
  if (isChecking) {
    return null;
  }

  return (
    <>
      {showSplash && <SplashScreen />}
      {/* Only render children after splash is complete */}
      {splashComplete && children}
    </>
  );
}