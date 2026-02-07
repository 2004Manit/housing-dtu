import * as Sentry from "@sentry/react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

// Initialize Sentry for error tracking (must be first!)
Sentry.init({
  dsn: "https://7b68fd33bd995ca9733011ca66650e2e@o4510846711627776.ingest.us.sentry.io/4510846715428864",

  // Only send errors in production
  enabled: import.meta.env.PROD,

  // Set environment for filtering in Sentry dashboard
  environment: import.meta.env.PROD ? "production" : "development",

  // Capture 10% of transactions for performance monitoring (adjust as needed)
  tracesSampleRate: 0.1,

  // Don't send PII (personally identifiable information) by default
  sendDefaultPii: false,
});

// TEMPORARY TEST: Send a test message to confirm Sentry is connected
// Remove this after confirming it works!
if (import.meta.env.PROD) {
  Sentry.captureMessage("✅ Sentry connection test - Housing DTU is connected!", "info");
}

// Set dark theme permanently
document.documentElement.classList.add("dark");

// Create a QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data stays fresh for 5 minutes (won't refetch if you revisit within 5 min)
      staleTime: 5 * 60 * 1000,
      // Keep unused data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Don't refetch when user switches back to the tab
      refetchOnWindowFocus: false,
      // Only retry failed requests once (not 3 times)
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);