import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
// ORIGINAL IMPORTS (kept for reference/rollback)
// import bgd10 from '@/assets/hero/bgd10.jpg';
// import card1 from '@/assets/hero/card1.png';
// import card2 from '@/assets/hero/card2.png';
// import card3 from '@/assets/hero/card3.png';
// import card4 from '@/assets/hero/card4.png';

// CLOUDINARY OPTIMIZED IMAGES
const bgd10 = 'https://res.cloudinary.com/dgof5pmgh/image/upload/f_auto,q_auto/v1770239397/bgd10_bjksz1.jpg';
const card1 = 'https://res.cloudinary.com/dgof5pmgh/image/upload/f_auto,q_auto/v1770239434/card1_hxkk2c.png';
const card2 = 'https://res.cloudinary.com/dgof5pmgh/image/upload/f_auto,q_auto/v1770239408/card2_nco73f.png';
const card3 = 'https://res.cloudinary.com/dgof5pmgh/image/upload/f_auto,q_auto/v1770239396/card3_srrjfu.png';
const card4 = 'https://res.cloudinary.com/dgof5pmgh/image/upload/f_auto,q_auto/v1770239414/card4_eqldbd.png';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Your 4 animated images with responsive sizes
  const carouselImages = [
    {
      id: 1,
      image: card1,
      alt: "Property showcase 1",
      height: "h-[180px] sm:h-[240px] md:h-[305px]",
      width: "max-w-[280px] sm:max-w-[360px] md:max-w-[460px]"
    },
    {
      id: 2,
      image: card2,
      alt: "Property showcase 2",
      height: "h-[220px] sm:h-[300px] md:h-[380px]",
      width: "max-w-[200px] sm:max-w-[280px] md:max-w-sm"
    },
    {
      id: 3,
      image: card3,
      alt: "Property showcase 3",
      height: "h-[190px] sm:h-[250px] md:h-[320px]",
      width: "max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"
    },
    {
      id: 4,
      image: card4,
      alt: "Property showcase 4",
      height: "h-[170px] sm:h-[230px] md:h-[290px]",
      width: "max-w-[240px] sm:max-w-[400px] md:max-w-xl"
    },
  ];

  // Auto-scroll every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgd10})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center min-h-[80vh]">

          {/* LEFT COLUMN - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            <div className="space-y-3 sm:space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center lg:justify-start"
              >
                <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500/20 text-green-400 rounded-full text-xs sm:text-sm font-semibold border border-green-500/30">
                  🏠 DTU's #1 Property Platform
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Find Your Perfect
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                  PG or Flat
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0"
              >
                Discover verified, affordable accommodations near DTU. Browse hundreds of PGs and flats with photos, videos, and direct owner contact.
              </motion.p>
            </div>

            {/* Carousel on mobile - below text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative lg:hidden h-[400px] sm:h-[500px] flex items-center justify-center mt-8"
              style={{ perspective: '2000px' }}
            >
              <AnimatePresence mode="popLayout">
                {carouselImages.map((card, index) => {
                  const position = (index - currentIndex + carouselImages.length) % carouselImages.length;

                  if (position !== 0) return null;

                  return (
                    <motion.div
                      key={card.id}
                      initial={{
                        y: 100,
                        opacity: 0,
                        scale: 0.8,
                        rotateX: 10,
                      }}
                      animate={{
                        y: position * -100,
                        opacity: position === 0 ? 1 : 0.35 - position * 0.15,
                        scale: 1 - position * 0.08,
                        rotateX: position * 4,
                        rotateY: position * -3,
                        z: -position * 60,
                      }}
                      exit={{
                        y: -200,
                        opacity: 0,
                        scale: 0.8,
                        transition: { duration: 0.5 }
                      }}
                      transition={{
                        duration: 0.7,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className={`absolute w-full ${card.width} mx-auto`}
                      style={{
                        transformStyle: 'preserve-3d',
                        zIndex: carouselImages.length - position,
                      }}
                    >
                      <div
                        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10"
                        style={{
                          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <div className={`relative w-full overflow-hidden ${card.height}`}>
                          <img
                            src={card.image}
                            alt={card.alt}
                            className="w-full h-full object-contain bg-slate-900/50"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="absolute -bottom-12 sm:-bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${index === currentIndex
                        ? 'bg-green-500 w-6 sm:w-8'
                        : 'bg-white/30 hover:bg-white/50'
                      }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - 3D Card Carousel (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:flex h-[700px] items-center justify-center"
            style={{ perspective: '2000px' }}
          >
            <AnimatePresence mode="popLayout">
              {carouselImages.map((card, index) => {
                const position = (index - currentIndex + carouselImages.length) % carouselImages.length;

                if (position !== 0) return null;

                return (
                  <motion.div
                    key={card.id}
                    initial={{
                      y: 100,
                      opacity: 0,
                      scale: 0.8,
                      rotateX: 10,
                    }}
                    animate={{
                      y: position * -140,
                      opacity: position === 0 ? 1 : 0.35 - position * 0.15,
                      scale: 1 - position * 0.08,
                      rotateX: position * 4,
                      rotateY: position * -3,
                      z: -position * 60,
                    }}
                    exit={{
                      y: -200,
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.5 }
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className={`absolute w-full ${card.width}`}
                    style={{
                      transformStyle: 'preserve-3d',
                      zIndex: carouselImages.length - position,
                    }}
                  >
                    <div
                      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10"
                      style={{
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <div className={`relative w-full overflow-hidden ${card.height}`}>
                        <img
                          src={card.image}
                          alt={card.alt}
                          className="w-full h-full object-contain bg-slate-900/50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                      ? 'bg-green-500 w-8'
                      : 'bg-white/30 hover:bg-white/50'
                    }`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;