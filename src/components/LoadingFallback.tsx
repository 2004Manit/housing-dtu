import { Loader2 } from "lucide-react";

/**
 * Loading fallback component shown during lazy route loading
 * Minimal, non-blocking design for fast perceived performance
 */
export default function LoadingFallback() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-sm text-gray-600 font-medium">Loading...</p>
            </div>
        </div>
    );
}
