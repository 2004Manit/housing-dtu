import { useEffect, useRef } from "react";

const TestimonialsMarquee = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      quote: "Found my Flat in just 2 days! No brokers, no commission, direct contact with owners. Housing DTU made my accommodation search so easy. Must-use for all DTU students!",
      name: "Rishabh Pandey",
      subtitle: "3rd Year B.Tech Student at DTU",
    },
    {
      id: 2,
      quote: "Best part? Zero brokerage! I saved ₹7,000 by finding my flat directly through Housing DTU. The platform is simple, listings are genuine, and everything is verified.",
      name: "Lakshya Dixit",
      subtitle: "3rd Year B.Tech Student at DTU",
    },
    {
      id: 3,
      quote: "As a fresher, I was lost searching for PGs near campus. Housing DTU showed verified listings with real photos. Contacted the owner via WhatsApp and moved in hassle-free!",
      name: "Avish Singh",
      subtitle: "1st Year B.Tech Student at DTU",
    },
    {
      id: 4,
      quote: "Stressed about finding a flatmate for my 2BHK? Housing DTU connected me with a fellow DTU student in just 3 days. Rent split, problem solved!",
      name: "Haaris Aaftab",
      subtitle: "3rd Year B.Tech Student at DTU",
    },
    {
      id: 5,
      quote: "I was skeptical at first, but Housing DTU actually works! Found a PG 5 mins from campus with all amenities. Direct WhatsApp contact made everything super quick and transparent.",
      name: "Dhairya Goyat",
      subtitle: "3rd Year B.Tech Student at DTU",
    },
  ];

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

 useEffect(() => {
  const scrollContainer = scrollRef.current;
  if (!scrollContainer) return;

  let animationFrameId: number;
  let scrollPosition = 0;
  const scrollSpeed = 0.3; // Adjust for slower/faster scroll

  const animate = () => {
    scrollPosition += scrollSpeed;
    
    // Dynamically calculate card width based on screen size
    const getCardWidth = () => {
      if (window.innerWidth < 640) return 304; // 280px + 24px gap
      if (window.innerWidth < 768) return 344; // 320px + 24px gap
      if (window.innerWidth < 1024) return 384; // 360px + 24px gap
      return 424; // 400px + 24px gap
    };
    
    const cardWidth = getCardWidth();
    const resetPoint = testimonials.length * cardWidth;
    
    if (scrollPosition >= resetPoint) {
      scrollPosition = 0;
    }
    
    if (scrollContainer) {
      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
    }
    
    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);

  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };
}, [testimonials.length]);

  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-[#0a0a0f]">
      {/* Ambient glow effects */}
      <div className="absolute top-1/2 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-600/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-pink-600/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] -translate-y-1/2"></div>

      <div className="container mx-auto px-4 mb-8 sm:mb-10 md:mb-12">
  <div className="text-center">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
      <span className="text-white">What Our Users </span>
      <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Say</span>
    </h2>
    <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto px-4">
      Real stories from real people who found their perfect properties with us
    </p>
  </div>
</div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Left fade gradient */}
<div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 md:w-48 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none"></div>

{/* Right fade gradient */}
<div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 md:w-48 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none"></div>
        {/* Scrolling content */}
        <div className="overflow-hidden">
        <div
  ref={scrollRef}
  className="flex gap-4 sm:gap-5 md:gap-6"
  style={{ willChange: "transform" }}
>
           {duplicatedTestimonials.map((testimonial, index) => (
  <div
    key={`${testimonial.id}-${index}`}
    className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px]"
  >
    <div className="group relative h-full p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-500">
      {/* Card glow effect on hover */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600/0 via-pink-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:via-pink-600/10 group-hover:to-blue-600/10 transition-all duration-500"></div>
      
      {/* Quote icon */}
      <div className="relative mb-3 sm:mb-4">
        <svg
          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-purple-400/30"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Review text */}
      <p className="relative text-white/90 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5 md:mb-6">
        "{testimonial.quote}"
      </p>

      {/* User info */}
      <div className="relative flex items-center gap-3">
        <div>
          <p className="font-bold text-white text-sm sm:text-base">{testimonial.name}</p>
          {/* <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div> */}

             <p className="text-xs text-gray-400 mt-1">{testimonial.subtitle}</p>

        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  </div>
))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsMarquee;
