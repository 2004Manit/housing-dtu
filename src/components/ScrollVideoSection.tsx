import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoSectionProps {
  frameCount: number;
  framePrefix?: string;
  title?: string;
  description?: string;
}

const ScrollVideoSection = ({ 
  frameCount = 85, 
  framePrefix = '/frames/',
  title = "Get In Touch With Us",
  description = "Browse through a curated selection of properties tailored to your needs. Find your dream home, investment, or rental today."
}: ScrollVideoSectionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const images: HTMLImageElement[] = [];
    const videoFrame = { frame: 0 };
    let loadedImages = 0;

    // Preload all images
    for (let i = 2; i <= frameCount + 1; i++) {
      const img = new Image();
      img.src = `${framePrefix}${i.toString().padStart(2, '0')}.png`;
      
      img.onload = () => {
        loadedImages++;
        setLoadProgress((loadedImages / frameCount) * 100);
        
        if (loadedImages === frameCount) {
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        console.error(`Failed to load frame ${i}`);
        loadedImages++;
        setLoadProgress((loadedImages / frameCount) * 100);
      };

      images.push(img);
    }

    // Render function
    function render() {
      if (!context || !canvas) return;
      
      const frameIndex = Math.min(
        Math.max(0, Math.floor(videoFrame.frame)),
        frameCount - 1
      );
      
      const img = images[frameIndex];
      if (!img || !img.complete) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate dimensions to cover canvas while maintaining aspect ratio
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;
      
      if (canvasAspect > imgAspect) {
        // Canvas is wider than image
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        // Canvas is taller than image
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }
      
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    // Wait for images to load before setting up animation
    const checkLoaded = setInterval(() => {
      if (imagesLoaded) {
        clearInterval(checkLoaded);
        
        // Initial render
        render();

        // Animate canvas and text on load
        gsap.fromTo(canvas, 
          { 
            opacity: 0, 
            scale: 1.1 
          },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 1.5, 
            ease: 'power3.out' 
          }
        );

        // GSAP ScrollTrigger animation
        const tl = gsap.to(videoFrame, {
          frame: frameCount - 1,
          snap: 'frame',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
          onUpdate: render,
        });

        return () => {
          tl.kill();
        };
      }
    }, 100);

    return () => {
      clearInterval(checkLoaded);
      window.removeEventListener('resize', setCanvasSize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [frameCount, framePrefix, imagesLoaded]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Loading Progress */}
      {!imagesLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="text-4xl font-bold mb-4 text-white">Loading Experience</div>
            <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="text-muted-foreground mt-2">
              {Math.round(loadProgress)}%
            </div>
          </div>
        </div>
      )}

      {/* Canvas for video frames */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen"
        style={{ 
          display: imagesLoaded ? 'block' : 'none',
          opacity: 0
        }}
      />

      {/* Text Overlay - Fixed at center */}
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center px-4" style={{ opacity: imagesLoaded ? 1 : 0 }}>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollVideoSection;
