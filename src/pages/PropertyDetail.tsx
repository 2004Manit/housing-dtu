import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, DollarSign, IndianRupee, Calendar, Phone, MessageCircle } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PropertyGallery } from "@/components/PropertyGallery";
import { PropertyInfo } from "@/components/PropertyInfo";
import { Testimonials } from "@/components/Testimonials";
import { VideoSection } from "@/components/VideoSection";
import { GoogleMapSection } from "@/components/GoogleMapSection";
import { PropertyFooter } from "@/components/PropertyFooter";
// import { properties } from "@/data/properties";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";

const PropertyDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  // State for property data
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        console.log('🔄 Fetching property ID:', id);

        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', parseInt(id)) // ID is a number in database
          .single(); // Fetch single property

        if (error) {
          console.error('❌ Error fetching property:', error);
          throw error;
        }

        if (!data) {
          console.error('❌ Property not found');
          navigate("/404");
          return;
        }
        console.log('✅ Fetched property:', data);

        // Transform to match component format
        const transformedProperty = {
          id: data.id.toString(),
          title: data.title,
          description: data.description,
          type: data.type,
          status: data.status,
          
          images: data.images || [],
          
          location: {
            address: data.location_address,
            city: data.location_city,
            state: data.location_state,
            coordinates: {
              lat: data.location_lat,
              lng: data.location_lng,
            },
            nearbyLocations: {
              timeToEntranceGate: data.time_to_entrance_gate,
              timeToMainMarket: data.time_to_main_market,
            },
          },
                    featuredAmenities: data.featured_amenities || [],
          showDistanceToDTU: data.show_distance_to_dtu,
          floorNumber: data.floor_number,
          
          flatDetails: data.type === 'Flat' ? {
            flatSize: data.flat_size,
            currentFlatmates: data.current_flatmates,
            flatmatesRequired: data.flatmates_required,
            brokerage: data.brokerage,
          } : undefined,
          
          ownerPhone: data.owner_phone,
          listedDate: data.listed_date,
          
          roomPricing: data.type === 'PG' ? {
            singleSharing: data.room_pricing_single,
            doubleSharing: data.room_pricing_double,
          } : undefined,
          flatRent: data.type === 'Flat' ? data.flat_rent : undefined,
          
          basicFacilities: data.basic_facilities || [],
          roomAmenities: data.room_amenities || [],
          flatAmenities: data.flat_amenities || [],
          
          video: data.video,
          
          propertyDetails: {
            securityDeposit: data.security_deposit,
            messIncluded: data.mess_included,
            verificationStatus: data.verification_status,
          },
           features: {
            bedrooms: null, // Not in current schema
            bathrooms: null,
            area: null,
          },
          
          amenities: [], // Combined list if needed
        };

        setProperty(transformedProperty);
        setError(null);

      } catch (err) {
        console.error('❌ Error in fetchProperty:', err);
        setError(err.message || 'Failed to fetch property');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id, navigate]);

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Property Expert",
      rating: 5,
      comment:
        "This stunning property represents exceptional value. The attention to detail and quality of finishes is absolutely remarkable. A rare find in today's market.",
    },
    {
      name: "David Chen",
      role: "Real Estate Consultant",
      rating: 5,
      comment:
        "An architectural gem that seamlessly blends style and functionality. The thoughtful design creates an unparalleled living experience.",
    },
  ];

  const userTestimonials = [
    {
      name: "Emily Rodriguez",
      role: "Current Tenant",
      rating: 5,
      comment:
        "Living here has been a dream come true. The modern amenities and thoughtful design make everyday living a luxury experience.",
    },
    {
      name: "Michael Thompson",
      role: "Previous Owner",
      rating: 5,
      comment:
        "This property exceeded all our expectations. The quality of construction and peaceful ambiance created countless memories for our family. Highly recommend!",
    },
  ];

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">❌ {error}</p>
          <Button onClick={() => navigate('/properties')}>
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  // Handle property not found
  if (!property) {
    return null;
  }

  return (
    <div ref={containerRef} className="min-h-screen relative">
      {/* CSS-Only Animated Gradient Blobs Background - Lava Lamp Effect */}
      <style>{`
        @keyframes blob1 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-15vw, 15vh, 0) scale(1.05);
          }
        }

        @keyframes blob2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(12vw, -18vh, 0) scale(1.08);
          }
        }

        @keyframes blob3 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(15vw, 10vh, 0) scale(1.05);
          }
        }

        @keyframes navbarGlow {
          0%, 100% {
            box-shadow: 0 4px 20px rgba(139, 92, 246, 0.08);
          }
          50% {
            box-shadow: 0 4px 24px rgba(139, 92, 246, 0.12);
          }
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        html {
          scroll-behavior: smooth;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.67;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          perspective: 1000px;
        }

        .blob1 {
          top: -10%;
          left: -10%;
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, #A78BFA 0%, #8B5CF6 100%);
          animation: blob1 25s ease-in-out infinite;
        }

        .blob2 {
          top: -10%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #F472B6 0%, #EC4899 100%);
          animation: blob2 28s ease-in-out infinite;
          animation-delay: -8s;
        }

        .blob3 {
          bottom: -10%;
          left: 50%;
          width: 650px;
          height: 650px;
          background: radial-gradient(circle, #60A5FA 0%, #3B82F6 100%);
          animation: blob3 30s ease-in-out infinite;
          animation-delay: -15s;
        }

        .content-overlay {
          position: relative;
          z-index: 1;
        }

        .animated-navbar {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(12px) saturate(150%);
          -webkit-backdrop-filter: blur(12px) saturate(150%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          animation: navbarGlow 3s ease-in-out infinite;
          will-change: box-shadow;
        }

        .navbar-button {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .navbar-button:hover {
          transform: translateY(-1px);
        }
      `}</style>

      <div className="fixed inset-0 bg-[#0a0a12] overflow-hidden pointer-events-none -z-10">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
        {/* Glassmorphism overlay for sophisticated look */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Header Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-40 animated-navbar content-overlay"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/properties")}
            className="hover:bg-primary/20 navbar-button"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Listings
          </Button>
        </div>
      </motion.header>

      {/* Main Content */}
<main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-20 content-overlay">
  {/* Property Header */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-4 sm:space-y-6"
  >
    <div>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-2"
        style={{ color: '#8BC6E0' }}
      >
        {property.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="text-base sm:text-lg text-muted-foreground"
      >
        {property.location.address}
      </motion.p>
    </div>
  </motion.div>

  {/* Gallery & Pricing Section - Two Column Layout on Desktop */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
    {/* Left Column - Gallery, Description & Info */}
    <div className="lg:col-span-8 space-y-8 sm:space-y-12">
      {/* Gallery */}
      <PropertyGallery images={property.images} propertyName={property.title} />

      {/* Room Pricing Cards */}
      {property.roomPricing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Single Sharing Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-2 border-purple-500/20 rounded-xl p-4 sm:p-6 hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Single Sharing</p>
                {property.roomPricing.singleSharing && property.roomPricing.singleSharing > 0 ? (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400">
                      ₹{property.roomPricing.singleSharing.toLocaleString()}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <span className="text-base sm:text-xl font-semibold text-red-400">Not Available</span>
                )}
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </div>
            </div>
          </motion.div>

          {/* Double Sharing Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-2 border-pink-500/20 rounded-xl p-4 sm:p-6 hover:border-pink-500/40 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Double Sharing</p>
                {property.roomPricing.doubleSharing && property.roomPricing.doubleSharing > 0 ? (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-400">
                      ₹{property.roomPricing.doubleSharing.toLocaleString()}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <span className="text-base sm:text-xl font-semibold text-red-400">Not Available</span>
                )}
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Flat Rent Card */}
      {property.flatRent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-600/5 border-2 border-blue-500/20 rounded-xl p-4 sm:p-6 hover:border-blue-500/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Rent for the Flat</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-blue-400">₹{property.flatRent.toLocaleString()}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">/month</span>
                </div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: '#8BC6E0' }}>Description</h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {property.description}
        </p>
      </motion.div>

      {/* MOBILE ONLY: Contact Card (shows before Property Info on mobile) */}
      <div className="lg:hidden">
        {user ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-500/5 via-card to-pink-500/5 border-2 border-purple-500/20 rounded-2xl p-5 sm:p-6 space-y-4 sm:space-y-6 hover:border-purple-500/40 transition-all duration-300 shadow-lg"
          >
            {/* Header */}
            <div className="text-center pb-3 sm:pb-4 border-b border-border/50">
              <h3 className="text-lg sm:text-xl font-bold text-gradient mb-1">Contact Details</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Get in touch directly</p>
            </div>

            {/* Listed Date */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-0.5 sm:mb-1">Listed On</p>
                <p className="text-base sm:text-lg font-bold text-blue-400">{property.listedDate}</p>
              </div>
            </div>

            {/* Owner Phone */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-0.5 sm:mb-1">Phone Number</p>
                <p className="text-base sm:text-lg font-bold text-green-400">{property.ownerPhone}</p>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Button 
              onClick={() => {
                const phone = property.ownerPhone.replace(/[^0-9]/g, '');
                const message = encodeURIComponent(
                  `Hi, I came across your property "${property.title}" on Housing DTU and would like to know more details. Is it still available?`
                );
                window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm sm:text-base py-5 sm:py-6 rounded-xl shadow-lg hover:shadow-green-500/50 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              WhatsApp
            </Button>

            {/* Additional Info */}
            <div className="pt-3 sm:pt-4 border-t border-border/50 space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-muted-foreground">Property Type</span>
                <span className="text-xs sm:text-sm font-semibold text-purple-400">{property.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-muted-foreground">Availability</span>
                <span className={`text-xs sm:text-sm font-semibold capitalize ${
                  property.status === 'available' ? 'text-green-400' :
                  property.status === 'not-available' ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {property.status === 'contact-owner' ? 'Contact Owner' : property.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-500/5 via-card to-pink-500/5 border-2 border-purple-500/20 rounded-2xl p-5 sm:p-6 relative overflow-hidden"
          >
            <div className="backdrop-blur-md bg-black/40 absolute inset-0 flex items-center justify-center rounded-2xl">
              <div className="text-center p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Sign in to View Contact Details</h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-xs mx-auto mb-3 sm:mb-4">
                  Create an account or sign in to view the owner's contact information
                </p>
                <Button
                  onClick={() => navigate(`/auth?returnUrl=${encodeURIComponent(location.pathname)}`)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-sm sm:text-base"
                >
                  Sign In to Continue
                </Button>
              </div>
            </div>
            <div className="blur-sm pointer-events-none">
              <div className="text-center pb-4 border-b border-border/50">
                <h3 className="text-lg sm:text-xl font-bold mb-1">Contact Owner</h3>
              </div>
              <div className="space-y-4 mt-6">
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Listed on</p>
                  <p className="text-lg font-semibold">••/••/••••</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Owner Phone</p>
                  <p className="text-lg font-semibold">+•• ••••• •••••</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Property Info */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <PropertyInfo
          bedrooms={property.features.bedrooms}
          bathrooms={property.features.bathrooms}
          area={property.features.area}
          location={`${property.location.city}, ${property.location.state}`}
          amenities={property.amenities}
          propertyDetails={property.propertyDetails}
          flatDetails={property.flatDetails}
          basicFacilities={property.basicFacilities}
          roomAmenities={property.roomAmenities}
          flatAmenities={property.flatAmenities}
          propertyType={property.type}
        />
      </motion.div>
    </div>

    {/* Right Column - Sticky Contact Card (DESKTOP ONLY) */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="hidden lg:block lg:col-span-4"
    >
      {user ? (
        <motion.div 
          className="sticky top-24 bg-gradient-to-br from-purple-500/5 via-card to-pink-500/5 border-2 border-purple-500/20 rounded-2xl p-8 space-y-6 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/10"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="text-center pb-4 border-b border-border/50">
            <motion.h3 
              className="text-xl font-bold text-gradient mb-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Contact Details
            </motion.h3>
            <p className="text-sm text-muted-foreground">Get in touch directly</p>
          </div>

          {/* Listed Date */}
          <motion.div 
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Listed On</p>
              <p className="text-lg font-bold text-blue-400">{property.listedDate}</p>
            </div>
          </motion.div>

          {/* Owner Phone */}
          <motion.div 
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Phone Number</p>
              <p className="text-lg font-bold text-green-400">{property.ownerPhone}</p>
            </div>
          </motion.div>

          {/* WhatsApp Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={() => {
                const phone = property.ownerPhone.replace(/[^0-9]/g, '');
                const message = encodeURIComponent(
                  `Hi, I came across your property "${property.title}" on Housing DTU and would like to know more details. Is it still available?`
                );
                window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-base py-6 rounded-xl shadow-lg hover:shadow-green-500/50 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            className="pt-4 border-t border-border/50 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Property Type</span>
              <span className="text-sm font-semibold text-purple-400">{property.type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Availability</span>
              <span className={`text-sm font-semibold capitalize ${
                property.status === 'available' ? 'text-green-400' :
                property.status === 'not-available' ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {property.status === 'contact-owner' ? 'Contact Owner' : property.status.replace('-', ' ')}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          className="sticky top-24 bg-gradient-to-br from-purple-500/5 via-card to-pink-500/5 border-2 border-purple-500/20 rounded-2xl p-8 relative overflow-hidden"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 backdrop-blur-md bg-black/40 z-10 flex items-center justify-center rounded-2xl">
            <div className="text-center p-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Sign in to View Contact Details</h3>
                <p className="text-sm text-gray-300 max-w-xs mx-auto">
                  Create an account or sign in to view the owner's contact information
                </p>
                <Button
                  onClick={() => navigate(`/auth?returnUrl=${encodeURIComponent(location.pathname)}`)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold mt-4"
                >
                  Sign In to Continue
                </Button>
              </motion.div>
            </div>
          </div>
          <div className="blur-sm pointer-events-none">
            <div className="text-center pb-4 border-b border-border/50">
              <h3 className="text-xl font-bold mb-1">Contact Owner</h3>
            </div>
            <div className="space-y-4 mt-6">
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Listed on</p>
                <p className="text-lg font-semibold">••/••/••••</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Owner Phone</p>
                <p className="text-lg font-semibold">+•• ••••• •••••</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  </div>

  {/* Video Section */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="w-full max-w-4xl mx-auto lg:max-w-none lg:mx-0 lg:w-[65%]"
  >
    <VideoSection videoUrl={property.video || ''} />
  </motion.div>

  {/* Map Section */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="w-full max-w-4xl mx-auto lg:max-w-none lg:mx-0 lg:w-[65%]"
  >
    <GoogleMapSection
      coordinates={property.location.coordinates}
      address={property.location.address}
      city={property.location.city}
      state={property.location.state}
      propertyName={property.title}
      nearbyLocations={property.location.nearbyLocations}
    />
  </motion.div>
</main>

      {/* Footer */}
      <div className="relative z-10">
        <PropertyFooter />
      </div>
    </div>
  );
};

export default PropertyDetail;
