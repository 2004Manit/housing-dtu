import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

export const PropertyGallery = ({ images, propertyName }: PropertyGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Add keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <>
      <div className="relative">
       {/* Main Gallery Grid */}
<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
  {/* All Images - Equal Size */}
  {images.slice(0, 6).map((image, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="relative overflow-hidden rounded-lg sm:rounded-2xl cursor-pointer group aspect-[4/3]"
      onClick={() => openLightbox(idx)}
    >
      <img
        src={image}
        alt={`${propertyName} - View ${idx + 1}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {idx === 5 && images.length > 6 && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3">
                  <span className="text-white text-2xl font-semibold">
                    +{images.length - 6} Photos
                  </span>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(0);
                    }}
                    className="bg-background/90 backdrop-blur-md hover:bg-background border border-border"
                  >
                    View All Photos
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 text-white hover:text-primary transition-colors z-10"
            >
              <ChevronLeft size={48} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 text-white hover:text-primary transition-colors z-10"
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
  key={selectedImage}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  className="max-w-4xl max-h-[70vh] w-full px-4 sm:px-8 md:px-16 flex items-center justify-center"
  onClick={(e) => e.stopPropagation()}
>
  <img
    src={images[selectedImage]}
    alt={`${propertyName} - View ${selectedImage + 1}`}
    className="max-w-full max-h-full object-contain rounded-lg aspect-[4/3]"
  />
</motion.div>
            
           {/* Image Counter */}
<div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 text-white text-sm sm:text-xl font-medium bg-black/50 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
  {selectedImage + 1} / {images.length}
</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
