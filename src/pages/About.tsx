import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Home, Github, Linkedin, Twitter, Instagram, Mail, Shield, ArrowRight,
  Search, Users, MessageCircle, Quote, Code, Megaphone, User,
  Building2, BadgeCheck, Sparkles, DollarSign, PhoneCall, 
  GraduationCap, Clock, HeadphonesIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { PropertyFooter } from "@/components/PropertyFooter";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden"
    style={{
      '--primary': '174 62% 47%',  // Teal color
      '--accent': '174 62% 47%',   // Teal color
      '--primary-foreground': '0 0% 100%',
    } as React.CSSProperties }>
      {/* Background gradient elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      </div>
      
      <Navbar />
      
      <main className="relative z-10">

        {/* Hero Section */}
        <HeroSection />

         {/* Story Section */}
        <StorySection />

        {/* Offer Section */}
        <OffersSection />

        {/* Founders Section */}
        <FoundersSection />

       {/* Founders Note */}
        <FoundersNote />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* CTA Section */}
        <CTASection />
      

        
      </main>
      
      <PropertyFooter />
    </div>
  );
};

// CTA Section Component
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 sm:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden"
        >
          {/* Main CTA Card */}
          <div className="relative glass rounded-3xl p-8 sm:p-12 md:p-16 text-center overflow-hidden">
            {/* Decorative gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[80px]" />
            
            {/* Decorative border glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-transparent to-accent/20 p-[1px]">  
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-glow"
              >
                <Home className="w-8 h-8 text-primary-foreground" />
              </motion.div>

              {/* Content */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Ready to find your
                <span className="gradient-text"> perfect home?</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-base sm:text-lg">
                Join hundreds of DTU students who found their ideal PG, flat, or roommate through Housing DTU.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" className="group" asChild>
                  <a href="/Properties">
                  <Search className="w-5 h-5" />
                  Browse Properties
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <a href="/List-Property">
                  <Home className="w-5 h-5" />
                  List Your Property
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Founders Note Component
const FoundersNote = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 sm:py-28 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              From The Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-2">
              A Note from the <span className="gradient-text">Founders</span>
            </h2>
          </div>

          {/* Quote Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="glass rounded-3xl p-8 sm:p-10 md:p-12 relative overflow-hidden"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[60px] translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              {/* Quote Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-primary" />
              </div>

              {/* Quote Content */}
              <div className="space-y-5 text-muted-foreground leading-relaxed text-base sm:text-lg">
                <p>
                 When we first came to DTU, finding a place to stay was one of the most stressful experiences we had. Dealing with brokers who charged exorbitant fees, visiting properties that didn't even exist on-site, and spending weeks just trying to find something decent near campus.
                </p>
                <p>
                  We thought — why isn't there a simple platform where students can directly 
                  connect with property owners? Where listings are verified, there are no hidden 
                  charges, and you can even find roommates who are fellow DTU students?
                </p>
                <p>
                  That's exactly what Housing DTU is. This isn't just a project for us — it's 
                  a solution to a problem we personally faced. We want every DTU student to 
                  have an easier time finding their home away from home.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="font-display font-semibold text-foreground text-lg">
                  — The Housing DTU Team
                </p>
                
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Founders Section Component
const FoundersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const founders = [
    {
      name: "Manit Agarwal",
      role: "Founder | Tech Lead",
      year: "B.Tech 3rd Year, DTU",
      bio: "Takes care of the platform's development, design, and technical operations. Collaborates on marketing strategies to help more students find accommodation",
      icon: User,
      linkedin: "https://www.linkedin.com/in/manit-agarwal-a43b3a2a6/"
    },
    {
      name: "Oorjit Sharma",
      role: "Founder | Operations Lead",
      year: "B.Tech 3rd Year, DTU",
      bio: "Manages user support and platform operations. Leads social media and community outreach efforts.",
      icon: User,
      linkedin: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section ref={ref} className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            The Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-2">
            Meet the <span className="gradient-text">Founders</span>
          </h2>
        </motion.div>

        {/* Founders Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass rounded-2xl p-6 sm:p-8 group relative overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Avatar placeholder with icon */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-sm">
                    <founder.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-foreground">
                      {founder.name}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {founder.role}
                    </p>
                  </div>
                </div>

                {/* Year */}
                <div className="inline-flex self-start px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground font-medium mb-4">
                  {founder.year}
                </div>

                {/* Bio */}
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {founder.bio}
                </p>

                {/* LinkedIn */}
                <div className="mt-5 pt-5 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-primary hover:bg-transparent p-0 h-auto"
                    asChild
                  >
                    <a href={founder.linkedin} className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      <span className="text-sm">Connect on LinkedIn</span>
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Marketing note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          
        </motion.div>
      </div>
    </section>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Built by students, for students
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6"
        >
          <span className="text-foreground">About</span>
          <br />
          <span className="gradient-text glow-text">Housing DTU</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Simplifying student housing search with zero commission. Find verified PGs, flats, 
          and roommates near DTU campus — all in one place.
        </motion.p>

        {/* Floating icons decoration
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex justify-center gap-4 mt-12"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass flex items-center justify-center shadow-glow-sm"
          >
            <Home className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </motion.div>
        </motion.div> */}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom--5 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Offers Section Component
const OffersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const offers = [
    {
      icon: Search,
      title: "Find PGs & Flats",
      description: "Browse through verified listings of PGs and flats near DTU campus with detailed information and photos."
    },
    {
      icon: Users,
      title: "Find Flatmates",
      description: "Connect with fellow DTU students looking for roommates. Share costs and make new friends."
    },
    {
      icon: Home,
      title: "List Your Property",
      description: "Property owners can list their spaces for free. Reach thousands of DTU students looking for housing."
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      description: "Chat directly with property owners or potential flatmates. No middlemen, no broker fees."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section ref={ref} className="py-20 sm:py-28 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-2">
            What We <span className="gradient-text">Offer</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden"
            >
              {/* Hover gradient - removed */}
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5">
                  <offer.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {offer.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {offer.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Story Section Component
const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: Building2,
      value: "10+",
      label: "Properties Listed",
      color: "primary"
    },
    {
      icon: Users,
      value: "50+",
      label: "Students Helped",
      color: "accent"
    },
    {
      icon: BadgeCheck,
      value: "Zero",
      label: "Commission",
      color: "primary"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section ref={ref} className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Content */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Our Story
              </span>
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-display font-bold text-foreground"
            >
              Making Student Housing
              <span className="gradient-text"> Hassle-Free</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                As DTU students ourselves, we know the struggle of finding the perfect place 
                to live. Hours spent visiting each property and shortlisting the best one, dealing with brokers 
                charging hefty commissions, and never knowing if a place is actually verified.
              </p>
              <p>
                That's why we built Housing DTU — a zero-commission platform that connects 
                students directly with property owners. No middlemen, no hidden fees, just 
                straightforward housing solutions for the DTU community.
              </p>
              <p>
                Our mission is simple: make finding a PG, flat, or roommate as easy as 
                ordering food online. Because finding a home shouldn't be the hardest part 
                of college life.
              </p>
            </motion.div>
          </div>

          {/* Stats Bento Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`glass rounded-2xl p-6 sm:p-8 ${index === 2 ? 'col-span-2' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center mb-4`}
                  style={{ backgroundColor: stat.color === 'primary' ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--accent) / 0.1)' }}
                >
                  <stat.icon
                    className="w-6 h-6"
                    style={{ color: stat.color === 'primary' ? 'hsl(var(--primary))' : 'hsl(var(--accent))' }}
                  />
                </div>
                <div className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Why Choose Us Component
const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: DollarSign,
      title: "100% Free",
      description: "No hidden charges or fees"
    },
    {
      icon: Shield,
      title: "Verified Listings",
      description: "Safe and secure properties"
    },
    {
      icon: PhoneCall,
      title: "Direct Contact",
      description: "No middlemen involved"
    },
    {
      icon: GraduationCap,
      title: "Student-Focused",
      description: "Built for DTU community"
    },
    {
      icon: Clock,
      title: "Quick Listings",
      description: "Post in under 100 seconds"
    },
    {
      icon: HeadphonesIcon,
      title: "Active Support",
      description: "We're here to help"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <section ref={ref} className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-2">
            Why Choose <span className="gradient-text">Housing DTU?</span>
          </h2>
        </motion.div>

        {/* Benefits Grid - Bento Style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass rounded-xl p-5 sm:p-6 flex items-start gap-4"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-5 h-5 text-primary" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-base font-display font-semibold text-foreground mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;