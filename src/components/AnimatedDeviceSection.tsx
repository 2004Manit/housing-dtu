import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Search, Home, TrendingUp, Shield, MessageCircle } from "lucide-react";

interface FeaturePoint {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  stage: number;
}

const features: FeaturePoint[] = [
  {
    id: 1,
    title: "Browse Verified Listings",
    description: "Explore trusted PGs and flats near DTU campus",
    icon: Search,
    stage: 1,
  },
  {
    id: 2,
    title: "Connect Directly with Owners",
    description: "No brokers, no hassle - just WhatsApp and move in",
    icon: MessageCircle,
    stage: 2,
  },
  {
    id: 3,
    title: "Find Your Perfect Flatmate",
    description: "Match with students who share your vibe",
    icon: Home,
    stage: 3,
  },
  {
    id: 4,
    title: "Move In Hassle-Free",
    description: "Zero commission, verified properties, instant contact",
    icon: Shield,
    stage: 4,
  },
];

// Device component
const DeviceDisplay = ({ feature }: { feature: FeaturePoint }) => {
  const IconComponent = feature.icon;
  return (
    <div className="relative w-full flex justify-center">
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0px rgba(139, 92, 246, 0)",
            "0 0 30px rgba(139, 92, 246, 0.5)",
            "0 0 0px rgba(139, 92, 246, 0)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[380px]"
        style={{ willChange: 'box-shadow', transform: 'translateZ(0)' }}
      >
        <div className="relative bg-gradient-to-br from-secondary to-secondary/80 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-primary/50 shadow-2xl">
          <div className="bg-background rounded-md sm:rounded-lg w-full aspect-[3/2] border-2 border-primary/30 overflow-hidden shadow-inner">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-background">
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <IconComponent className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary" />
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium text-center px-2">
                  {feature.title}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 md:mt-6 flex justify-center">
            <div className="w-20 sm:w-24 md:w-32 h-8 sm:h-10 md:h-14 bg-gradient-to-b from-secondary to-secondary/60 border-2 border-primary/30 rounded-b-lg sm:rounded-b-xl shadow-lg"></div>
          </div>
        </div>
        <motion.div
          className="absolute inset-0 -z-10 pointer-events-none"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-primary/15 rounded-full blur-xl"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Details component
const DetailsDisplay = ({ activeStage }: { activeStage: number }) => (
  <div className="space-y-4 sm:space-y-6 w-full max-w-xl mx-auto lg:mx-0">
    <div className="mb-4 sm:mb-6 md:mb-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
        How It <span className="text-primary">Works</span>
      </h2>
      <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
        Discover the power of our platform as you explore
      </p>
    </div>

    <div className="space-y-3 sm:space-y-4">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isActive = feature.stage === activeStage;
        const isVisible = feature.stage <= activeStage;

        return (
          <motion.div
            key={feature.id}
            initial={false}
            animate={{
              opacity: isVisible ? (isActive ? 1 : 0.4) : 0.2,
              scale: isActive ? 1.02 : 1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className={`relative p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
              isActive
                ? "border-primary bg-primary/15 shadow-xl shadow-primary/30"
                : isVisible
                ? "border-primary/30 bg-secondary/60 shadow-md"
                : "border-border/30 bg-secondary/20"
            }`}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <motion.div
                animate={{
                  scale: isActive ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: isActive ? Infinity : 0,
                  repeatDelay: 2,
                }}
                className={`p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-primary/50"
                    : isVisible
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
              <div className="flex-1">
                <h3
                  className={`text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-xs sm:text-sm leading-relaxed transition-opacity duration-300 ${
                    isActive
                      ? "text-foreground/90"
                      : "text-muted-foreground"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
              {isActive && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary shadow-lg shadow-primary/50 flex-shrink-0 mt-1 sm:mt-2"
                />
              )}
            </div>
            {index < features.length - 1 && isVisible && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isVisible ? "16px" : 0, opacity: isVisible ? 1 : 0 }}
                className="absolute left-[30px] sm:left-[35px] md:left-[43px] top-full w-0.5 bg-primary/30"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  </div>
);

// Individual Stage Section
const StageSection = ({
  feature,
  stageId,
  deviceLeft,
  sectionRef,
}: {
  feature: FeaturePoint;
  stageId: number;
  deviceLeft: boolean;
  sectionRef: React.RefObject<HTMLDivElement>;
}) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.7, 1], 
    [0.3, 1, 1, 0.3],
    { clamp: true }
  );
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.7, 1], 
    [0.95, 1, 1, 0.95],
    { clamp: true }
  );

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center py-12 sm:py-16 md:py-20 px-4 bg-background"
    >
      <div className="container mx-auto w-full max-w-7xl">
        <motion.div
          style={{ opacity, scale, willChange: 'transform, opacity', transform: 'translateZ(0)' }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 30,
            restDelta: 0.001 
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center"
        >
          {deviceLeft ? (
            <>
              <div className="flex items-center justify-center lg:col-span-1">
                <DeviceDisplay feature={feature} />
              </div>
              <div className="flex items-center justify-center lg:col-span-1">
                <DetailsDisplay activeStage={stageId} />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center lg:col-span-1 order-2 lg:order-1">
                <DetailsDisplay activeStage={stageId} />
              </div>
              <div className="flex items-center justify-center lg:col-span-1 order-1 lg:order-2">
                <DeviceDisplay feature={feature} />
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const AnimatedDeviceSection = () => {
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const stage4Ref = useRef<HTMLDivElement>(null);

  const stages = [
    { id: 1, feature: features[0], deviceLeft: true, ref: stage1Ref },
    { id: 2, feature: features[1], deviceLeft: false, ref: stage2Ref },
    { id: 3, feature: features[2], deviceLeft: true, ref: stage3Ref },
    { id: 4, feature: features[3], deviceLeft: false, ref: stage4Ref },
  ];

  return (
    <section className="relative bg-background">
      {stages.map((stage) => (
        <StageSection
          key={stage.id}
          feature={stage.feature}
          stageId={stage.id}
          deviceLeft={stage.deviceLeft}
          sectionRef={stage.ref}
        />
      ))}
    </section>
  );
};

export default AnimatedDeviceSection;