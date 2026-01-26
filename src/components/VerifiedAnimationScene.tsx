import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const AnimatedScene = () => {
  const [animationPhase, setAnimationPhase] = useState("running"); // running, entering, transforming, complete

  useEffect(() => {
    // Boy runs for 0.8 seconds (reduced by 1.2 seconds from 2.0)
    const runTimer = setTimeout(() => {
      setAnimationPhase("entering");
    }, 800);

    // Boy enters house
    const enterTimer = setTimeout(() => {
      setAnimationPhase("transforming");
    }, 1300);

    // Transform to checkmark
    const transformTimer = setTimeout(() => {
      setAnimationPhase("complete");
    }, 1800);

    return () => {
      clearTimeout(runTimer);
      clearTimeout(enterTimer);
      clearTimeout(transformTimer);
    };
  }, []); // Empty dependency array means it only runs once on mount

  const getOpacity = () => {
    if (animationPhase === "transforming") return 0;
    if (animationPhase === "complete") return 0;
    return 1;
  };

  return (
     <div
      className="relative flex items-center justify-center overflow-hidden bg-black rounded-3xl shadow-2xl"
      style={{
        width: "500px",
        height: "500px",
        minWidth: "320px",
        minHeight: "320px",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      {/* Boy Character */}
      <div
        className="absolute transition-all ease-out"
        style={{
          left: animationPhase === "running" ? "15%" : "55%",
          opacity: getOpacity(),
          transform: animationPhase === "entering" ? "scale(0.7)" : "scale(1)",
          transitionDuration: "800ms",
        }}
      >
        <div className="relative w-20 h-28">
          {/* Soft glow around boy */}
          <div className="absolute inset-0 bg-blue-300/20 blur-2xl rounded-full scale-150" />

          {/* Head */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-full" />
            {/* Happy eyes */}
            <div className="absolute top-4 left-3 w-1.5 h-1.5 bg-slate-700 rounded-full" />
            <div className="absolute top-4 right-3 w-1.5 h-1.5 bg-slate-700 rounded-full" />
            {/* Smile */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-5 h-2 border-b-2 border-slate-700 rounded-full" />
          </div>

          {/* Body */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-12 h-14 bg-gradient-to-br from-blue-300 to-blue-400 rounded-2xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl" />
          </div>

          {/* Arms - Animated */}
          <div
            className={`absolute top-14 -left-1 w-3 h-10 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full shadow-md origin-top ${
              animationPhase === "running" ? "animate-arm-swing" : ""
            }`}
          />
          <div
            className={`absolute top-14 -right-1 w-3 h-10 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full shadow-md origin-top ${
              animationPhase === "running" ? "animate-arm-swing-alt" : ""
            }`}
          />

          {/* Legs - Animated */}
          <div
            className={`absolute bottom-0 left-3 w-4 h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-full shadow-md ${
              animationPhase === "running" ? "animate-leg-run" : ""
            }`}
          />
          <div
            className={`absolute bottom-0 right-3 w-4 h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-full shadow-md ${
              animationPhase === "running" ? "animate-leg-run-alt" : ""
            }`}
          />

          {/* Backpack */}
          <div className="absolute top-13 right-0 w-5 h-8 bg-gradient-to-br from-rose-300 to-rose-400 rounded-lg shadow-md">
            <div className="absolute inset-1 bg-rose-300/40 rounded" />
          </div>
        </div>

        {/* Motion lines when running */}
        {animationPhase === "running" && (
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 space-y-2 animate-motion-fade">
            <div className="h-0.5 w-10 bg-blue-300/60 rounded-full" />
            <div className="h-0.5 w-8 bg-blue-300/40 rounded-full" />
            <div className="h-0.5 w-6 bg-blue-300/20 rounded-full" />
          </div>
        )}
      </div>

      {/* House */}
      <div
        className="absolute right-[20%] transition-all duration-500"
        style={{
          opacity: getOpacity(),
          transform: animationPhase === "transforming" ? "scale(0)" : "scale(1)",
        }}
      >
        <div className="relative">
          {/* House glow */}
          <div className="absolute inset-0 bg-orange-300/20 blur-3xl rounded-full scale-150" />

          <div className="relative w-48 h-40">
            {/* Roof */}
            <div
              className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-rose-400 to-rose-500 shadow-2xl"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 50% 50%)" }}
              />
            </div>

            {/* House Body */}
            <div className="absolute inset-x-6 bottom-0 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-b-3xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-b-3xl" />

              {/* Windows with warm glow */}
              <div className="absolute top-6 left-6 w-10 h-10 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-lg shadow-lg shadow-yellow-300/60 animate-glow-pulse">
                <div className="absolute inset-1 bg-yellow-100/60 rounded" />
              </div>
              <div className="absolute top-6 right-6 w-10 h-10 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-lg shadow-lg shadow-yellow-300/60 animate-glow-pulse-delayed">
                <div className="absolute inset-1 bg-yellow-100/60 rounded" />
              </div>

              {/* Door - Opens when boy arrives */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-t-2xl shadow-inner transition-all duration-500 origin-bottom"
                style={{
                  transform: animationPhase === "entering" || animationPhase === "transforming"
                    ? "translateX(-50%) scaleY(0.3) translateY(20px)"
                    : "translateX(-50%) scaleY(1)",
                  opacity: animationPhase === "entering" || animationPhase === "transforming" ? 0.3 : 1,
                }}
              >
                <div className="absolute top-10 right-2 w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-md shadow-yellow-300/50" />
              </div>

              {/* Doorway light when door opens */}
              {(animationPhase === "entering" || animationPhase === "transforming") && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-20 bg-gradient-to-t from-yellow-200 to-transparent rounded-t-2xl animate-door-glow" />
              )}

              {/* Chimney */}
              <div className="absolute -top-3 right-8 w-6 h-12 bg-gradient-to-br from-red-400 to-red-500 shadow-xl rounded-t">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-t" />
              </div>

              {/* Smoke */}
              <div className="absolute -top-6 right-9">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2.5 h-2.5 bg-gray-300/50 rounded-full animate-smoke-rise"
                    style={{
                      animationDelay: `${i * 0.5}s`,
                      left: `${i * 2}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Green Checkmark - Appears after transformation */}
      {(animationPhase === "transforming" || animationPhase === "complete") && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            animation: animationPhase === "transforming" 
              ? "checkmark-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
              : "none",
            opacity: animationPhase === "complete" ? 1 : 0,
            transform: animationPhase === "complete" 
              ? "translate(-50%, -50%) scale(1)" 
              : "translate(-50%, -50%) scale(0)",
          }}
        >
          {/* Outer glow rings */}
          <div className="absolute inset-0 animate-ping-slow">
            <div className="w-40 h-40 rounded-full border-4 border-green-400/30" />
          </div>
          <div className="absolute inset-0 animate-ping-slower">
            <div className="w-40 h-40 rounded-full border-4 border-green-400/20" />
          </div>

          {/* Main glow */}
          <div className="absolute inset-0 bg-green-400/40 blur-3xl rounded-full scale-150 animate-pulse-soft" />

          {/* Checkmark circle */}
          <div className="relative w-40 h-40 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-2xl shadow-green-500/50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
            
            {/* Checkmark icon */}
            <Check className="w-20 h-20 text-white stroke-[4]" />

            {/* Sparkle particles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-200 rounded-full animate-sparkle"
                style={{
                  top: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                  left: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes arm-swing {
          0%, 100% { transform: rotate(-25deg); }
          50% { transform: rotate(25deg); }
        }

        @keyframes arm-swing-alt {
          0%, 100% { transform: rotate(25deg); }
          50% { transform: rotate(-25deg); }
        }

        @keyframes leg-run {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(3px) rotate(15deg); }
        }

        @keyframes leg-run-alt {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(-3px) rotate(-15deg); }
        }

        @keyframes motion-fade {
          0% { opacity: 0; transform: translateX(0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(15px); }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 15px rgba(253, 224, 71, 0.6); }
          50% { box-shadow: 0 0 30px rgba(253, 224, 71, 0.9), 0 0 50px rgba(253, 224, 71, 0.4); }
        }

        @keyframes glow-pulse-delayed {
          0%, 100% { box-shadow: 0 0 15px rgba(253, 224, 71, 0.6); }
          50% { box-shadow: 0 0 30px rgba(253, 224, 71, 0.9), 0 0 50px rgba(253, 224, 71, 0.4); }
        }

        @keyframes smoke-rise {
          0% { transform: translateY(0) scale(0.5); opacity: 0.4; }
          100% { transform: translateY(-40px) scale(1.2); opacity: 0; }
        }

        @keyframes door-glow {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes checkmark-appear {
          0% { 
            transform: translate(-50%, -50%) scale(0) rotate(-180deg); 
            opacity: 0; 
          }
          60% { 
            transform: translate(-50%, -50%) scale(1.2) rotate(20deg); 
          }
          100% { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg); 
            opacity: 1; 
          }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }

        @keyframes ping-slower {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        @keyframes pulse-soft {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(0) translateY(0); opacity: 0; }
          50% { transform: scale(1) translateY(-10px); opacity: 1; }
        }

        .animate-arm-swing {
          animation: arm-swing 0.4s ease-in-out infinite;
        }

        .animate-arm-swing-alt {
          animation: arm-swing-alt 0.4s ease-in-out infinite;
        }

        .animate-leg-run {
          animation: leg-run 0.5s ease-in-out infinite;
        }

        .animate-leg-run-alt {
          animation: leg-run-alt 0.5s ease-in-out infinite;
        }

        .animate-motion-fade {
          animation: motion-fade 0.8s ease-in-out infinite;
        }

        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        .animate-glow-pulse-delayed {
          animation: glow-pulse-delayed 2s ease-in-out infinite 0.5s;
        }

        .animate-smoke-rise {
          animation: smoke-rise 2s ease-out infinite;
        }

        .animate-door-glow {
          animation: door-glow 0.3s ease-out forwards;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-ping-slower {
          animation: ping-slower 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s;
        }

        .animate-pulse-soft {
          animation: pulse-soft 3s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }

        .duration-2000 {
          transition-duration: 2000ms;
        }
      `}</style>
    </div>
  );
};

export default AnimatedScene;