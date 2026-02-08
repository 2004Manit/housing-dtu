import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useInView } from 'react-intersection-observer';

interface Model3DViewerProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  className?: string;
}

// Model component that loads the GLB
function Model({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onLoad
}: {
  modelPath: string;
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
  onLoad?: () => void;
}) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (modelRef.current) {
      // Center the model
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
      modelRef.current.position.sub(center);
      modelRef.current.position.add(new THREE.Vector3(...position));

      // Notify that model is loaded
      onLoad?.();
    }
  }, [scene, position, onLoad]);

  return (
    <group ref={modelRef} rotation={rotation}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

// Loading component with progress indication
function LoadingSpinner({ progress }: { progress: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 text-center"
      >
        <p className="text-cyan-400 font-medium text-sm mb-2">Loading 3D Model...</p>
        {progress > 0 && (
          <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
        <p className="text-gray-500 text-xs mt-2">
          {progress > 0 ? `${Math.round(progress)}%` : 'Initializing...'}
        </p>
      </motion.div>
    </div>
  );
}

// Error fallback component
function ErrorFallback({ error }: { error: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-950/20 to-orange-950/20 backdrop-blur-sm rounded-lg border border-red-500/20">
      <div className="text-center p-6 max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center"
        >
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </motion.div>
        <h3 className="text-lg font-semibold text-red-400 mb-2">
          Unable to Load 3D Model
        </h3>
        <p className="text-sm text-gray-400">
          {error || "The 3D model couldn't be loaded. Please check the file path."}
        </p>
      </div>
    </div>
  );
}

const Model3DViewer = ({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
  className = ""
}: Model3DViewerProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Viewport detection - pause when not visible
  const { ref: viewportRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false // Keep observing
  });

  // Simulate loading progress (you can replace this with actual loading progress if available)
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadProgress((prev) => {
          if (prev >= 90) return prev; // Stop at 90% until actual load
          return prev + Math.random() * 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleModelLoad = () => {
    setLoadProgress(100);
    // Small delay to show 100% before hiding
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div ref={viewportRef} className={`relative w-full h-full ${className}`}>
      {/* Loading Overlay */}
      {isLoading && <LoadingSpinner progress={loadProgress} />}

      {/* Error Overlay */}
      {error && <ErrorFallback error={error} />}

      {/* Canvas */}
      {!error && (
        <Canvas
          shadows
          dpr={[1, 1.5]} // Lower DPR for better desktop performance
          performance={{ min: 0.5 }} // Allow performance throttling
          frameloop={inView ? "always" : "never"} // Pause when not in view
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
            powerPreference: "default" // Let browser choose best GPU
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000', 0);
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 2, 4]} fov={50} />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024} // Reduced from 2048 for better performance
            shadow-mapSize-height={1024}
          />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          <pointLight position={[0, 5, 5]} intensity={0.5} />

          {/* Environment lighting using local lights - no external CDN dependency */}
          <hemisphereLight intensity={0.5} groundColor="#1a1a2e" color="#ffffff" />
          <spotLight position={[5, 10, 7.5]} angle={0.3} penumbra={1} intensity={0.8} castShadow />

          {/* Model with Error Boundary */}
          <Suspense fallback={null}>
            <ErrorBoundary onError={setError}>
              <Model
                modelPath={modelPath}
                scale={scale}
                position={position}
                rotation={rotation}
                onLoad={handleModelLoad}
              />
            </ErrorBoundary>
          </Suspense>

          {/* Controls - Click and drag to rotate */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={10}
            autoRotate={autoRotate}
            autoRotateSpeed={2}
            enableDamping
            dampingFactor={0.15}
            makeDefault
          />
        </Canvas>
      )}

      {/* Instructions Overlay (bottom) */}
      {!isLoading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-cyan-500/30 pointer-events-none max-w-[90%]"
        >
          <p className="text-[10px] sm:text-xs text-cyan-400 text-center">
            Click & drag to rotate • Scroll to zoom
          </p>
        </motion.div>
      )}

      {/* Decorative Glowing Border - Static for better performance */}
      <div className="absolute inset-0 rounded-lg pointer-events-none">
        <div className="absolute inset-0 rounded-lg border border-cyan-500/30" />
      </div>
    </div>
  );
};

// Error Boundary for catching model loading errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: string) => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: (error: string) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error.message);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// Preload the model to improve initial load time
useGLTF.preload('/model.glb');

export default Model3DViewer;