import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  Home, 
  IndianRupee, 
  MessageCircle, 
  ShieldCheck, 
  UtensilsCrossed,
  MapPin,
  Image as ImageIcon,
  Video,
  Sparkles,
  Wind,
  ArrowLeft
} from "lucide-react";

const PropertyListingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showContent, setShowContent] = useState(false);
  
  // Get form data from navigation state
  const formData = location.state?.formData;
  const coordinates = location.state?.coordinates;

  useEffect(() => {
    // If no form data, redirect back
    if (!formData) {
      navigate('/list-property');
      return;
    }
    
    // Show content after animation delay
    setTimeout(() => setShowContent(true), 800);
  }, [formData, navigate]);

  if (!formData) return null;

  // Get facility and amenity labels
  const getFacilityLabels = (ids: string[]) => {
    const facilityMap: Record<string, string> = {
      'free-wifi': 'Free WiFi',
      'power-backup': 'Power Backup',
      'elevator': 'Elevator/Lift',
      'ro-water': 'RO Water',
      'microwave': 'Microwave',
      'refrigerator': 'Refrigerator',
      'maid': 'Maid Service',
      'common-room': 'Common Room',
      'tt-table': 'TT Table',
      'pool-table': 'Pool Table',
      'washing-machine': 'Washing Machine',
      'cctv-security': '24×7 CCTV',
      'terrace': 'Terrace',
      'mess': 'Mess',
    };
    return ids.map(id => facilityMap[id] || id);
  };

  const getAmenityLabels = (ids: string[]) => {
    const amenityMap: Record<string, string> = {
      'air-conditioning': 'Air Conditioning',
      'attached-washroom': 'Attached Washroom',
      'geyser': 'Geyser',
      'separate-almirah': 'Separate Almirah',
      'mattress': 'Mattress',
      'balcony-some': 'Balcony (Some Rooms)',
      'balcony-all': 'Balcony (All Rooms)',
    };
    return ids.map(id => amenityMap[id] || id);
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Back Button - RESPONSIVE */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-50">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => navigate('/')}
          className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group p-2 sm:p-3"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="hidden sm:inline text-base sm:text-lg">Back to Home</span>
        </Button>
      </div>

      {/* Main Content - RESPONSIVE PADDING */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-16 sm:py-20 max-w-5xl relative z-10">
        
        {/* Success Animation - RESPONSIVE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          {/* Animated Checkmark - RESPONSIVE */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full mb-6 sm:mb-7 md:mb-8 relative"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(52, 211, 153, 0.3) 100%)',
              border: '3px solid rgba(16, 185, 129, 0.5)',
              boxShadow: '0 0 60px rgba(16, 185, 129, 0.4)',
            }}
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Check className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-green-400" strokeWidth={3} />
            </motion.div>
            
            {/* Ripple Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-400"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-400"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Title - RESPONSIVE */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4"
          >
            Property Request Submitted Successfully! 🎉
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4"
          >
            Your property listing has been submitted for review. Our admin team will verify the details and approve your listing shortly. You'll be notified once it's live!
          </motion.p>
        </motion.div>

        {/* Property Summary */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-5 md:space-y-6"
          >
            {/* Summary Header - RESPONSIVE */}
            <div className="text-center mb-6 sm:mb-7 md:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 px-4">Property Summary</h2>
              <p className="text-white/60 text-sm sm:text-base px-4">Review the details you've submitted</p>
            </div>

            {/* Property Details Card - RESPONSIVE PADDING */}
            <div 
              className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
              }}
            >
              {/* Basic Info - RESPONSIVE */}
              <div className="border-b border-white/10 pb-4 sm:pb-5 md:pb-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Basic Information</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-white/50 text-xs sm:text-sm mb-1">Property Name</p>
                    <p className="text-white font-medium text-sm sm:text-base break-words">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs sm:text-sm mb-1">Property Type</p>
                    <p className="text-white font-medium text-sm sm:text-base">PG (Paying Guest)</p>
                  </div>
                </div>
              </div>

              {/* Pricing - RESPONSIVE */}
              <div className="border-b border-white/10 pb-4 sm:pb-5 md:pb-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Pricing Details</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-white/50 text-xs sm:text-sm mb-1">Single Sharing</p>
                    <p className="text-white font-medium text-base sm:text-lg">₹{formData.singleSharingPrice}/month</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs sm:text-sm mb-1">Double Sharing</p>
                    <p className="text-white font-medium text-base sm:text-lg">₹{formData.doubleSharingPrice}/month</p>
                  </div>
                </div>
              </div>

              {/* Contact & Additional Info - RESPONSIVE */}
              <div className="border-b border-white/10 pb-4 sm:pb-5 md:pb-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Contact & Details</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-white/50 text-xs sm:text-sm mb-1">WhatsApp Number</p>
                    <p className="text-white font-medium text-sm sm:text-base">+91 {formData.whatsappNumber}</p>
                  </div>
                  {formData.description && (
                    <div>
                      <p className="text-white/50 text-xs sm:text-sm mb-1">Description</p>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed break-words">{formData.description}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-white/50 text-xs sm:text-sm mb-1">Security Deposit</p>
                      <p className="text-white font-medium text-sm sm:text-base capitalize">
                        {formData.securityDeposit === 'one-time' ? 'One Time' : 
                         formData.securityDeposit === 'monthly' ? 'Monthly' : 'Not Applicable'}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs sm:text-sm mb-1">Mess</p>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {formData.mess === 'included' ? 'Included in Rent' : 'Not Included in Rent'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facilities - RESPONSIVE */}
              <div className="border-b border-white/10 pb-4 sm:pb-5 md:pb-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">PG Facilities</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {getFacilityLabels(formData.selectedFacilities).map((facility, index) => (
                    <span 
                      key={index}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/10 text-white/90 text-xs sm:text-sm border border-white/20"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities - RESPONSIVE */}
              <div className="border-b border-white/10 pb-4 sm:pb-5 md:pb-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Room Amenities</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {getAmenityLabels(formData.selectedAmenities).map((amenity, index) => (
                    <span 
                      key={index}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/10 text-white/90 text-xs sm:text-sm border border-white/20"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Media - RESPONSIVE */}
              <div className="border-b border-white/10 pb-4 sm:pb-5 md:pb-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Media Files</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-white/50 text-xs sm:text-sm mb-2 sm:mb-3">Images ({formData.images.length})</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                      {formData.images.slice(0, 6).map((image, index) => (
                        <div 
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/20"
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Property ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {formData.video && (
                    <div>
                      <p className="text-white/50 text-xs sm:text-sm mb-2 sm:mb-3">Video</p>
                      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/20">
                        <Video className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-medium text-sm sm:text-base truncate">{formData.video.name}</p>
                          <p className="text-white/50 text-xs">Video uploaded successfully</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Location - RESPONSIVE */}
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Location</h3>
                </div>
                <div>
                  <p className="text-white/80 text-sm sm:text-base mb-2 break-words">{formData.location}</p>
                  {coordinates && (
                    <p className="text-white/50 text-xs sm:text-sm font-mono break-all">
                      Coordinates: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Next Steps - RESPONSIVE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-green-500/30 bg-green-500/10"
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">What happens next?</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-white/80 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Our admin team will review your listing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>You'll receive a notification once your property is approved</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Your listing will be visible to thousands of potential tenants</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Interested tenants will contact you directly via WhatsApp</span>
                </li>
              </ul>
            </motion.div>

            {/* Action Buttons - RESPONSIVE */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-7 md:pt-8">
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-400 text-white hover:shadow-lg hover:shadow-green-500/50 transition-all text-sm sm:text-base py-5 sm:py-6 px-6 sm:px-8"
              >
                Go to Home
              </Button>
              <Button
                onClick={() => navigate('/properties')}
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all text-sm sm:text-base py-5 sm:py-6 px-6 sm:px-8"
              >
                Browse Properties
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PropertyListingSuccess;