import { motion } from "framer-motion";
import { Play, VideoOff, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface VideoSectionProps {
  thumbnail?: string;
  videoUrl?: string;
}

export const VideoSection = ({ thumbnail, videoUrl }: VideoSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: '#8BC6E0' }}>Video Tour</h2>

      {videoUrl && videoUrl.trim() !== '' ? (

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative rounded-2xl overflow-hidden aspect-video cursor-pointer group bg-black flex items-center justify-center"
        onClick={() => setIsPlaying(true)}
      >
        {/* Video element with poster (first frame) */}
        {!isPlaying && (
          <>
            <video
              src={videoUrl}
              className="max-w-full max-h-full object-contain"
              preload="metadata"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
          </>
        )}

        {/* Play Button - show when not playing */}
        {!isPlaying && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary transition-colors duration-300 animate-glow">
              <Play className="text-black ml-1" size={32} fill="currentColor" />
            </div>
          </motion.div>
        )}

        {/* Video Player (when playing) */}
        {isPlaying && (
          <div className="absolute inset-0 bg-black">
            <video
              src={videoUrl}
              className="w-full h-full"
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </motion.div>
     ) : (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="relative rounded-2xl overflow-hidden border-2 border-dashed border-white/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-sm aspect-video"
  >
    <div className="flex flex-col items-center justify-center h-full py-8 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-4 sm:mb-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
          <div className="relative p-4 sm:p-5 md:p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full border-2 border-white/10">
            <VideoOff className="text-purple-300" size={32} />
          </div>
        </div>
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2"
      >
        Video Not Available
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-md px-2"
      >
        A virtual tour video is not available for this property at the moment. Check out the photos above for a detailed view!
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 sm:mt-6 flex items-center gap-2 text-xs sm:text-sm text-purple-400"
      >
        <ImageIcon size={14} className="sm:w-4 sm:h-4" />
        <span>Browse photos for more details</span>
      </motion.div>
    </div>
  </motion.div>
)}
    </motion.div>
    );
};
