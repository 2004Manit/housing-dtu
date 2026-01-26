import { motion } from 'framer-motion';

const ServiceCard = ({ icon: Icon, title, description, index = 0 }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -5,
      }}
      transition={{ duration: 0.2 }}
      className="relative group h-full"
      data-testid={`service-card-${index}`}
    >
      {/* Animated gradient border - Changed to blue */}
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"
      />
      
      <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-5 md:p-6 h-full">
        {/* Icon with animation - Changed to blue gradient */}
        <div className="mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Icon size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;