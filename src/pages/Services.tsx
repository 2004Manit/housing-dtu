import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/ServiceCard";
import { PropertyFooter } from "@/components/PropertyFooter";
import { 
  Home, 
  MapPin, 
  Shield, 
  Users, 
  Video, 
  Search,
  CheckCircle2,
  Building2,
  UserCheck,
  Layers,
  Phone,
  TrendingUp
} from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import headerBg from "@/assets/property img.png";
import Model3DViewer from "@/components/Model3DViewer";

// Animation wrapper component for scroll-triggered animations
const AnimateOnScroll = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" }); // Reduced margin for better mobile performance

  const directions = {
    up: { y: 40, x: 0 }, // Reduced from 60
    down: { y: -40, x: 0 }, // Reduced from -60
    left: { x: 40, y: 0 }, // Reduced from 60
    right: { x: -40, y: 0 }, // Reduced from -60
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }} // Reduced from 0.6
    >
      {children}
    </motion.div>
  );
};

// Stagger children animation
const StaggerContainer = ({ children, staggerDelay = 0.1, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, direction = "up" }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...directions[direction] },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "Flat & Apartment Listings",
      description: "Discover a wide range of verified flats and apartments across prime locations. From cozy 1BHKs to spacious 3BHKs, find your perfect home with complete transparency and no hidden charges.",
    },
    {
      icon: Home,
      title: "PG Accommodations",
      description: "Browse through verified paying guest accommodations ideal for students and working professionals. Each PG listing includes amenities, house rules, and genuine reviews from current residents.",
    },
    {
      icon: UserCheck,
      title: "Verified Roommate Matching",
      description: "Find compatible roommates through our verified matching system. Connect with like-minded individuals who share your lifestyle preferences, budget, and location requirements.",
    },
    {
      icon: Users,
      title: "Flatmate Finder",
      description: "Looking for someone to share your flat? Our flatmate finder helps you connect with verified individuals seeking shared accommodation, ensuring safety and compatibility.",
    },
    {
      icon: Shield,
      title: "100% Property Verification",
      description: "Every property on our platform undergoes rigorous verification. We validate ownership documents, check property conditions, and ensure all listings are genuine and accurate.",
    },
    {
      icon: MapPin,
      title: "Google Maps Integration",
      description: "Never get lost finding your property. All our listings feature integrated Google Maps locations, showing nearby amenities, transport links, and neighborhood insights.",
    },
    {
      icon: Video,
      title: "Virtual Video Tours",
      description: "Explore properties from the comfort of your home with detailed video tours. Get a real feel of the space, interiors, and amenities before scheduling a physical visit.",
    },
    {
      icon: Phone,
      title: "Direct Owner Contact",
      description: "Connect directly with property owners or verified listers. No middlemen, no broker fees—just straightforward communication and transparent dealings.",
    },
  ];

  // Scroll progress for header parallax
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
   <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Navbar />
      
      {/* Hero Header Section with 3D Model */}
     <section ref={headerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-0 max-w-full">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: headerY }}
        >
          <img 
            src={headerBg}
            alt="Property Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]" />
        </motion.div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Glowing Orbs */}
       <motion.div
  className="absolute top-10 -left-10 sm:top-20 sm:left-10 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-cyan-500/10 blur-3xl"
  animate={{ 
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3] 
  }}
  transition={{ duration: 8, repeat: Infinity }}
/>
        <motion.div
  className="absolute bottom-10 -right-10 sm:bottom-20 sm:right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-blue-500/10 blur-3xl"
  animate={{ 
    scale: [1.2, 1, 1.2],
    opacity: [0.3, 0.5, 0.3] 
  }}
  transition={{ duration: 10, repeat: Infinity }}
/>

        {/* Split Layout Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Text Content */}
            <motion.div 
              className="text-center lg:text-left order-2 lg:order-1"
              style={{ opacity: headerOpacity }}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-6"
              >
                <motion.div
                  className="inline-block px-4 sm:px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-6"
                  whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.5)" }}
                >
                  <span className="text-cyan-400 text-sm sm:text-base font-medium">What we bring to the table</span>
                </motion.div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight px-2">
                  The Housing DTU {" "}
                  <span className="relative inline-block">
                    <motion.span
                      className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent"
                      animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      style={{ backgroundSize: "200% auto" }}
                    >
                      Difference
                    </motion.span>
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </span>
                </h1>
              </motion.div>
              
              <AnimateOnScroll delay={0.3}>
               <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl lg:max-w-none leading-relaxed mb-6 sm:mb-8 px-2">
                  Whether you're searching for a flat, PG accommodation, or the perfect flatmate, 
                  our services make finding your perfect home simple, verified, and hassle-free.
                </p>
              </AnimateOnScroll>
            </motion.div>

            {/* Right Side - 3D Model */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative order-1 lg:order-2"
            >
              {/* Title Above 3D Model */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-4 sm:mb-6 text-center"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  DTU Campus <span className="text-cyan-400">3D Tour</span>
                </h3>
              </motion.div>

              <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[550px]">
                {/* Glowing Background for 3D Model */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-lg blur-2xl" />
                
                {/* 3D Model Viewer */}
                <div className="relative w-full h-full">
                  <Model3DViewer 
                    modelPath="/src/assets/model.glb"
                    scale={2.5}
                    position={[0, -0.5, 0]}
                    rotation={[0, 0, 0]}
                    autoRotate={false}
                    className="rounded-lg"
                  />
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/30 rounded-br-lg" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      
      <div className="pb-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Why Choose Us Section */}
          <AnimateOnScroll>
            <div className="mb-16 sm:mb-20 text-center relative">
              <motion.h2 
  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white px-4"
>
                Why Choose Us?
              </motion.h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
                We're not just another property portal. We're your trusted partner in finding the perfect accommodation.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Key Features Grid - All Blue */}
          <StaggerContainer 
  staggerDelay={0.1}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-20 px-2 sm:px-0"
>
            {[
              {
                icon: Shield,
                title: "100% Verified",
                description: "Every property and user is thoroughly verified for your safety",
                gradient: "from-cyan-500/20 to-blue-500/20"
              },
              {
                icon: Phone,
                title: "Direct Contact",
                description: "Connect directly with owners—no middlemen, no hassle",
                gradient: "from-cyan-500/20 to-blue-500/20"
              },
              {
                icon: CheckCircle2,
                title: "No Hidden Fees",
                description: "Transparent pricing with clear brokerage information",
                gradient: "from-cyan-500/20 to-blue-500/20"
              },
              {
                icon: Layers,
                title: "Wide Variety",
                description: "Flats, PGs, roommates—all in one convenient platform",
                gradient: "from-cyan-500/20 to-blue-500/20"
              },
            ].map((feature, index) => (
              <StaggerItem key={index} direction="up">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative group h-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl opacity-50 group-hover:opacity-70 transition-opacity blur-xl`} />
                  <div className="relative bg-[#0f0f0f] border border-cyan-500/20 rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-cyan-500/40 transition-colors">
  <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-cyan-400 mb-3 sm:mb-4" />
  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">{feature.title}</h3>
  <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">{feature.description}</p>
</div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Main Services Grid */}
          <AnimateOnScroll>
            <div className="mb-12 sm:mb-16 text-center relative">
              <motion.h2 
  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white px-4"
>
                Our Services
              </motion.h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
                Comprehensive solutions for all your housing needs
              </p>
            </div>
          </AnimateOnScroll>

         <StaggerContainer 
  staggerDelay={0.08}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-20 px-2 sm:px-0"
>
            {services.map((service, index) => (
              <StaggerItem key={index} direction="up">
                <div className="h-full">
                  <ServiceCard {...service} />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Detailed Service Sections */}
          <div className="space-y-16 sm:space-y-24">
            {/* Property Listings Section */}
            <section className="relative">
              <div className="lg:pl-0">
                <AnimateOnScroll direction="left">
                  <motion.h2 
  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white px-2"
>
                    Property Listings
                  </motion.h2>
                </AnimateOnScroll>
                
                <AnimateOnScroll delay={0.2}>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-12 max-w-3xl px-2">
                    Explore our extensive collection of verified properties. From budget-friendly PGs for students to 
                    luxury apartments for families, we have something for everyone. Each listing comes with detailed 
                    information, high-quality photos, and transparent pricing.
                  </p>
                </AnimateOnScroll>

               <StaggerContainer 
  staggerDelay={0.12}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0"
>
                  {[
                    {
                      icon: Building2,
                      title: "Flats & Apartments",
                      description: "Browse through 1BHK, 2BHK, and 3BHK apartments with complete details on rent, deposit, and amenities.",
                    },
                    {
                      icon: Home,
                      title: "PG Accommodations",
                      description: "Find fully-furnished PGs with meals, Wi-Fi, and all modern amenities included in the rent.",
                    },
                    {
                      icon: MapPin,
                      title: "Location Intelligence",
                      description: "Every property shows exact Google Maps location with nearby schools, hospitals, and metro stations.",
                    },
                  ].map((service, index) => (
                    <StaggerItem key={index} direction="up">
                      <ServiceCard {...service} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </section>

            {/* Roommate & Flatmate Section */}
            <section className="relative">
              <div className="lg:pr-0">
                <AnimateOnScroll direction="right">
                  <motion.h2 
  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white text-center lg:text-right px-2"
>
                    Find Your Perfect Match
                  </motion.h2>
                </AnimateOnScroll>
                
                <AnimateOnScroll delay={0.2}>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto lg:ml-auto text-center lg:text-right px-2">
                    Finding compatible roommates shouldn't be difficult. Our intelligent matching system connects you 
                    with verified individuals who share your lifestyle preferences, budget range, and location choices. 
                    Build meaningful connections and share your living space with like-minded people.
                  </p>
                </AnimateOnScroll>

                <StaggerContainer 
  staggerDelay={0.12}
  className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0"
>
                  {[
                    {
                      icon: UserCheck,
                      title: "Verified Roommates",
                      description: "All users are verified with ID proof and background checks to ensure safety and authenticity.",
                    },
                    {
                      icon: Users,
                      title: "Smart Matching",
                      description: "Our algorithm matches you based on preferences, work schedule, lifestyle habits, and budget.",
                    },
                    {
                      icon: Shield,
                      title: "Safe & Secure",
                      description: "Chat directly with verified users in a secure environment before making any commitments.",
                    },
                    {
                      icon: Phone,
                      title: "Easy Communication",
                      description: "Connect instantly through our platform and arrange meetings at your convenience.",
                    },
                  ].map((service, index) => (
                    <StaggerItem key={index} direction={index % 2 === 0 ? "left" : "right"}>
                      <ServiceCard {...service} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </section>

            {/* Technology Features Section */}
            <section className="relative">
              <AnimateOnScroll>
                <motion.h2 
  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white text-center px-4"
>
                  Advanced Features
                </motion.h2>
              </AnimateOnScroll>
              
              <AnimateOnScroll delay={0.2}>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto text-center px-4">
                  We leverage cutting-edge technology to make your property search seamless and efficient.
                </p>
              </AnimateOnScroll>

             <StaggerContainer 
  staggerDelay={0.12}
  className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0"
>
                {[
                  {
                    icon: Video,
                    title: "Virtual Tours",
                    description: "Watch comprehensive video tours of properties from anywhere, anytime. Save time and visit only the properties you love.",
                  },
                  {
                    icon: MapPin,
                    title: "Interactive Maps",
                    description: "Explore neighborhoods with integrated Google Maps. Check commute times, nearby facilities, and area demographics.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Transparent Pricing",
                    description: "Know exactly what you're paying for. We clearly mention if brokerage is applicable and provide complete cost breakdowns.",
                  },
                ].map((service, index) => (
                  <StaggerItem key={index} direction="up">
                    <div className="h-full">
                      <ServiceCard {...service} />
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-indigo-900/20" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
                               radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
            }} />
          </div>
        </div>

        {/* Floating Orbs */}
        <motion.div
  className="absolute top-5 -left-5 sm:top-10 sm:left-10 md:top-20 md:left-20 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{ 
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
       <motion.div
  className="absolute bottom-5 -right-5 sm:bottom-10 sm:right-10 md:bottom-20 md:right-20 w-28 h-28 sm:w-40 sm:h-40 md:w-64 md:h-64 rounded-full bg-blue-500/10 blur-3xl"
          animate={{ 
            y: [0, -30, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimateOnScroll>
              <motion.div
                className="inline-block px-4 sm:px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-cyan-400 text-sm sm:text-base font-medium">Ready to Get Started?</span>
              </motion.div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <motion.h2
  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight px-4"
>
                Your Perfect Home is{" "}
                <span className="relative inline-block">
                  <motion.span
                    className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent"
                    animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% auto" }}
                  >
                    Waiting
                  </motion.span>
                  <motion.div
                    className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
              </motion.h2>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
             <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
                Join hundreds of happy users who found their dream homes and perfect flatmates through our platform. 
                Start your journey today with verified listings and zero hassle.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.3}>
             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 max-w-full">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto group relative px-8 sm:px-10 py-4 rounded-lg overflow-hidden font-semibold text-sm sm:text-base md:text-lg"
                >
                  <a href="/Properties">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 blur-xl" />
                  </div>
                  
                  <span className="relative z-10 text-white flex items-center justify-center gap-2">
                   
                    <Search className="w-5 h-5" />
                    Browse All Properties
                   
                  </span>
                   </a>
                </motion.button>

                <motion.button
                
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto group relative px-8 sm:px-10 py-4 rounded-lg border-2 border-cyan-500/50 font-semibold text-sm sm:text-base md:text-lg overflow-hidden"
                >
                   <a href="/List-Property">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                 
                  <span className="relative z-10 text-cyan-400 flex items-center justify-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    List Your Property
                  </span>
                </a>
                </motion.button>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>

      {/* Footer */}
      <PropertyFooter />
    </div>
  );
};

export default Services;