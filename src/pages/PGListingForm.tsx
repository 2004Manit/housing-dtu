import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Autocomplete from "react-google-autocomplete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/lib/supabase";
import { uploadImages, uploadVideo } from "@/lib/supabaseHelpers";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  Home,
  IndianRupee,
  MessageCircle,
  FileText,
  ShieldCheck,
  UtensilsCrossed,
  Wifi,
  Battery,
  MoveUp,
  Droplets,
  Microwave,
  Refrigerator,
  UserCheck,
  Users,
  CircleDot,
  WashingMachine,
  Camera,
  Wind,
  DoorOpen,
  Flame,
  Archive,
  BedDouble,
  MapPin,
  Video,
  Image as ImageIcon,
  Sparkles,
  X,
  Navigation,
  AlertTriangle
} from "lucide-react";

// PG Facilities and Amenities from properties.ts
const basicFacilities = [
  { id: 'free-wifi', label: 'Free WiFi', icon: Wifi, color: { bg: 'bg-blue-500/10', text: 'text-blue-400' } },
  { id: 'power-backup', label: 'Power Backup', icon: Battery, color: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' } },
  { id: 'elevator', label: 'Elevator/Lift', icon: MoveUp, color: { bg: 'bg-purple-500/10', text: 'text-purple-400' } },
  { id: 'ro-water', label: 'RO Water', icon: Droplets, color: { bg: 'bg-cyan-500/10', text: 'text-cyan-400' } },
  { id: 'microwave', label: 'Microwave', icon: Microwave, color: { bg: 'bg-orange-500/10', text: 'text-orange-400' } },
  { id: 'refrigerator', label: 'Refrigerator', icon: Refrigerator, color: { bg: 'bg-sky-500/10', text: 'text-sky-400' } },
  { id: 'maid', label: 'Maid Service', icon: UserCheck, color: { bg: 'bg-pink-500/10', text: 'text-pink-400' } },
  { id: 'common-room', label: 'Common Room', icon: Users, color: { bg: 'bg-indigo-500/10', text: 'text-indigo-400' } },
  { id: 'tt-table', label: 'TT Table', icon: CircleDot, color: { bg: 'bg-green-500/10', text: 'text-green-400' } },
  { id: 'pool-table', label: 'Pool Table', icon: CircleDot, color: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' } },
  { id: 'washing-machine', label: 'Washing Machine', icon: WashingMachine, color: { bg: 'bg-violet-500/10', text: 'text-violet-400' } },
  { id: 'cctv-security', label: '24×7 CCTV', icon: Camera, color: { bg: 'bg-red-500/10', text: 'text-red-400' } },
  { id: 'terrace', label: 'Terrace', icon: Home, color: { bg: 'bg-teal-500/10', text: 'text-teal-400' } },
  { id: 'mess', label: 'Mess', icon: UtensilsCrossed, color: { bg: 'bg-amber-500/10', text: 'text-amber-400' } },
];

const roomAmenities = [
  { id: 'air-conditioning', label: 'Air Conditioning', icon: Wind, color: { bg: 'bg-cyan-500/10', text: 'text-cyan-400' } },
  { id: 'attached-washroom', label: 'Attached Washroom', icon: DoorOpen, color: { bg: 'bg-blue-500/10', text: 'text-blue-400' } },
  { id: 'geyser', label: 'Geyser', icon: Flame, color: { bg: 'bg-orange-500/10', text: 'text-orange-400' } },
  { id: 'separate-almirah', label: 'Separate Almirah', icon: Archive, color: { bg: 'bg-purple-500/10', text: 'text-purple-400' } },
  { id: 'mattress', label: 'Mattress', icon: BedDouble, color: { bg: 'bg-pink-500/10', text: 'text-pink-400' } },
  { id: 'balcony-some', label: 'Balcony (Some Rooms)', icon: Home, color: { bg: 'bg-green-500/10', text: 'text-green-400' } },
  { id: 'balcony-all', label: 'Balcony (All Rooms)', icon: Home, color: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' } },
];

const PGListingForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    singleSharingPrice: '',
    doubleSharingPrice: '',
    whatsappNumber: '',
    description: '',
    securityDeposit: '',
    mess: '',
    selectedFacilities: [] as string[],
    selectedAmenities: [] as string[],
    images: [] as File[],
    video: null as File | null,
    location: '',
  });

  // Location state
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [locationMethod, setLocationMethod] = useState<'none' | 'current' | 'search'>('none');
  const [tempSearchQuery, setTempSearchQuery] = useState('');
  
  // Confirmation dialog state
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error state
  const [errors, setErrors] = useState({
    name: '',
    singleSharingPrice: '',
    doubleSharingPrice: '',
    whatsappNumber: '',
    securityDeposit: '',
    mess: '',
    facilities: '',
    amenities: '',
    images: '',
  });

  // Reset component state on mount to ensure consistent behavior across navigation paths
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Reset all state to initial values
    setCurrentStep(0);
    setShowConfirmDialog(false);
    setLocationError('');
    setIsLoadingLocation(false);
    
    // This ensures animations trigger properly regardless of navigation path
    return () => {
      // Cleanup
      setShowConfirmDialog(false);
    };
  }, []);

  const steps = [
    { id: 0, title: "Basic Info", icon: Home },
    { id: 1, title: "Pricing", icon: IndianRupee },
    { id: 2, title: "Contact & Details", icon: MessageCircle },
    { id: 3, title: "Facilities", icon: Sparkles },
    { id: 4, title: "Amenities", icon: Wind },
    { id: 5, title: "Media & Location", icon: MapPin },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const validateStep = (step: number): boolean => {
    const newErrors = { ...errors };
    let isValid = true;

    // Clear previous errors for current step
    switch (step) {
      case 0:
        newErrors.name = '';
        if (!formData.name.trim()) {
          newErrors.name = 'Please add name of your PG';
          isValid = false;
        }
        break;
      case 1:
        newErrors.singleSharingPrice = '';
        newErrors.doubleSharingPrice = '';
        if (!formData.singleSharingPrice) {
          newErrors.singleSharingPrice = 'Price can\'t be empty';
          isValid = false;
        }
        if (!formData.doubleSharingPrice) {
          newErrors.doubleSharingPrice = 'Price can\'t be empty';
          isValid = false;
        }
        break;
      case 2:
        newErrors.whatsappNumber = '';
        newErrors.securityDeposit = '';
        newErrors.mess = '';
        if (formData.whatsappNumber.length !== 10) {
          newErrors.whatsappNumber = 'Invalid number. Must be 10 digits';
          isValid = false;
        }
        if (!formData.securityDeposit) {
          newErrors.securityDeposit = 'Please select at least one option';
          isValid = false;
        }
        if (!formData.mess) {
          newErrors.mess = 'Please select at least one option';
          isValid = false;
        }
        break;
      case 3:
        newErrors.facilities = '';
        if (formData.selectedFacilities.length === 0) {
          newErrors.facilities = 'Please select at least one facility';
          isValid = false;
        }
        break;
      case 4:
        newErrors.amenities = '';
        if (formData.selectedAmenities.length === 0) {
          newErrors.amenities = 'Please select at least one amenity';
          isValid = false;
        }
        break;
      case 5:
        newErrors.images = '';
        if (formData.images.length === 0) {
          newErrors.images = 'Please add at least one picture';
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFacilityToggle = (facilityId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedFacilities: prev.selectedFacilities.includes(facilityId)
        ? prev.selectedFacilities.filter(id => id !== facilityId)
        : [...prev.selectedFacilities, facilityId]
    }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenityId)
        ? prev.selectedAmenities.filter(id => id !== amenityId)
        : [...prev.selectedAmenities, amenityId]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      const remainingSlots = 6 - formData.images.length;
      const imagesToAdd = newImages.slice(0, remainingSlots);
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imagesToAdd]
      }));
    }
  };

  const handleImageRemove = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  // const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFormData(prev => ({
  //       ...prev,
  //       video: e.target.files![0]
  //     }));
  //   }
  // };


  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const maxSizeMB = 50; // 50 MB limit
    const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
    
    if (fileSizeMB > maxSizeMB) {
      // Show error toast
      toast({
        variant: "destructive",
        title: "Video Too Large",
        description: `Video size is ${fileSizeMB.toFixed(1)} MB. Maximum allowed is ${maxSizeMB} MB. Please compress or use a smaller video.`,
      });
      // Clear the file input
      e.target.value = '';
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      video: file
    }));
  }
};

  const handleVideoRemove = () => {
    setFormData(prev => ({
      ...prev,
      video: null
    }));
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError('');
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCoordinates({ lat, lng });
        
        // Set location method to 'current' immediately when we get coordinates
        setLocationMethod('current');
        
        // Reverse geocode to get address
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBT6_M1nyhJomGsJi-owJkDJTRa0KngcDE`
          );
          const data = await response.json();
          if (data.results && data.results[0]) {
            setFormData(prev => ({ ...prev, location: data.results[0].formatted_address }));
          } else {
            // Set a default location string with coordinates if no address found
            setFormData(prev => ({ ...prev, location: `Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}` }));
          }
        } catch (error) {
          console.error('Error getting address:', error);
          // Set coordinates as location if reverse geocoding fails
          setFormData(prev => ({ ...prev, location: `Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}` }));
        }
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationError('Unable to retrieve your location. Please search manually.');
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const removeCurrentLocation = () => {
    setFormData(prev => ({ ...prev, location: '' }));
    setCoordinates(null);
    setLocationMethod('none');
    setLocationError('');
  };

  const confirmSearchLocation = () => {
    if (tempSearchQuery.trim()) {
      setFormData(prev => ({ ...prev, location: tempSearchQuery }));
      setLocationMethod('search');
      // Note: coordinates may be null if manually entered without selecting from autocomplete
    }
  };

  const removeSearchLocation = () => {
    setFormData(prev => ({ ...prev, location: '' }));
    setCoordinates(null);
    setLocationMethod('none');
    setTempSearchQuery('');
  };

  const handleSubmitClick = () => {
    // Validate the last step before showing confirmation dialog
    if (validateStep(currentStep)) {
      setShowConfirmDialog(true);
    }
  };

  // const handleConfirmSubmit = () => {
  //   const submissionData = {
  //     ...formData,
  //     coordinates: coordinates, // Include lat/lng for backend
  //   };
  //   console.log('Form submitted:', submissionData);
    
  //   // Navigate to success page with form data
  //   navigate('/property-listing-success', {
  //     state: {
  //       formData: formData,
  //       coordinates: coordinates
  //     }
  //   });
  // };

  const handleConfirmSubmit = async () => {
  // Start loading state
  setIsSubmitting(true);
  
  try {
    // Step 1: Check if user is logged in
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to submit a property.",
      });
      setIsSubmitting(false);
      return;
    }

    console.log('Starting submission for user:', user.id);

    // Step 2: Upload images to Supabase Storage
    console.log('Uploading images...');
    const imageUrls = await uploadImages(formData.images, user.id, 'PG');
    console.log('Images uploaded:', imageUrls);

    // Step 3: Upload video (if exists)
    let videoUrl = null;
    if (formData.video) {
      console.log('Uploading video...');
      videoUrl = await uploadVideo(formData.video, user.id, 'PG');
      console.log('Video uploaded:', videoUrl);
    }

    // Step 4: Prepare data for database
    const submissionData = {
      // System fields
      user_id: user.id,
      submission_type: 'PG',
      status: 'pending',

      // Basic info
      property_name: formData.name,
      description: formData.description || null,
      whatsapp_number: formData.whatsappNumber,

      // PG-specific pricing
      single_sharing_price: parseFloat(formData.singleSharingPrice),
      double_sharing_price: parseFloat(formData.doubleSharingPrice),
      security_deposit: formData.securityDeposit,
      mess_availability: formData.mess,

      // Facilities and Amenities
      selected_facilities: formData.selectedFacilities,
      selected_amenities: formData.selectedAmenities,

      // Media
      image_urls: imageUrls,
      video_url: videoUrl,

      // Location
      location_address: formData.location,
      location_coordinates: coordinates ? {
        lat: coordinates.lat,
        lng: coordinates.lng
      } : null,

      // Timestamps
      submitted_at: new Date().toISOString(),
    };

    console.log('Inserting to database:', submissionData);

    // Step 5: Insert to database
    const { data, error } = await supabase
      .from('property_submissions')
      .insert(submissionData)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Submission successful:', data);

    // Step 6: Show success message
    toast({
      title: "🎉 Submission Successful!",
      description: "Your PG listing has been submitted for review.",
    });

    // Step 7: Close dialog and navigate to success page
    setShowConfirmDialog(false);
    navigate('/property-listing-success', {
      state: {
        formData: formData,
        coordinates: coordinates,
        submissionId: data.id
      }
    });

  } catch (error) {
    console.error('Submission error:', error);
    
    // Show error message
    toast({
      variant: "destructive",
      title: "Submission Failed",
      description: "Something went wrong. Please try again.",
    });
    
    // Keep dialog open and stop loading
    setIsSubmitting(false);
  }
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
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/20 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
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

     {/* Back Button */}
<div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-50">
  <Button
    variant="ghost"
    size="lg"
    onClick={() => navigate(-1)}
    className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group p-2 sm:p-3"
  >
    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
    <span className="hidden sm:inline text-base sm:text-lg">Back</span>
  </Button>
</div>

{/* Main Content */}
<div className="container mx-auto px-3 sm:px-4 md:px-6 py-16 sm:py-20 max-w-4xl relative z-10">
        
        {/* Header */}
<motion.div 
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-center mb-8 sm:mb-12"
>
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", duration: 0.6 }}
    className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl mb-4 sm:mb-6"
    style={{
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.2) 100%)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
    }}
  >
    <Home className="w-8 h-8 sm:w-10 sm:h-10 text-green-300" />
  </motion.div>
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
    List Your PG
  </h1>
  <p className="text-white/70 text-sm sm:text-base md:text-lg px-4">
    Let's get your property listed in just a few steps!
  </p>
</motion.div>

        {/* Progress Bar */}
        {/* Progress Bar */}
<motion.div 
  initial={{ opacity: 0, scaleX: 0 }}
  animate={{ opacity: 1, scaleX: 1 }}
  className="mb-8 sm:mb-12"
>
  <div className="flex items-center justify-between mb-3 sm:mb-4">
    {steps.map((step, index) => (
      <div key={step.id} className="flex flex-col items-center flex-1">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1 sm:mb-2 transition-all duration-300 ${
            index <= currentStep
              ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
              : 'bg-white/10 text-white/50'
          }`}
        >
          {index < currentStep ? (
            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </motion.div>
        <span className={`hidden sm:block text-xs text-center ${
          index <= currentStep ? 'text-white' : 'text-white/50'
        }`}>
          {step.title}
        </span>
      </div>
    ))}
  </div>
  <div className="w-full h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
    <motion.div
      className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
    />
  </div>
</motion.div>

       {/* Form Steps */}
<AnimatePresence mode="wait">
  <motion.div
    key={currentStep}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 mb-6 sm:mb-8"
    style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
    }}
  >
            {/* Step 0: Basic Info */}
{currentStep === 0 && (
  <div className="space-y-4 sm:space-y-6">
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 px-2">What's the name of your PG?</h2>
      <p className="text-white/60 text-sm sm:text-base px-4">Give your property a catchy name</p>
    </div>
    <div>
      <label className="text-white/80 text-xs sm:text-sm font-medium mb-2 block">PG Name</label>
      <Input
        type="text"
        placeholder="e.g., Pinnacle PG, Sunrise Heights..."
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="bg-white/5 border-white/20 text-white placeholder:text-white/40 text-base sm:text-lg py-4 sm:py-6 focus:border-blue-400 focus:ring-blue-400"
      />
      {errors.name && (
        <p className="text-red-500 text-xs sm:text-sm mt-2">{errors.name}</p>
      )}
    </div>
  </div>
)}

           {/* Step 1: Pricing */}
{currentStep === 1 && (
  <div className="space-y-4 sm:space-y-6">
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 px-2">Let's talk pricing</h2>
      <p className="text-white/60 text-sm sm:text-base px-4">If a room is not available, then enter 0.</p>
    </div>
    <div className="space-y-4 sm:space-y-6">
      <div>
        <label className="text-white/80 text-xs sm:text-sm font-medium mb-2 block flex items-center gap-2">
          <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4" />
          Single Sharing Room Price
        </label>
        <div className="relative">
          <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/60 text-base sm:text-lg font-semibold">₹</span>
          <Input
            type="number"
            placeholder="e.g. 12000"
            value={formData.singleSharingPrice}
            onChange={(e) => setFormData({ ...formData, singleSharingPrice: e.target.value })}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 text-base sm:text-lg py-4 sm:py-6 pl-8 sm:pl-10 focus:border-green-400 focus:ring-green-400"
          />
        </div>
        {errors.singleSharingPrice && (
          <p className="text-red-500 text-xs sm:text-sm mt-2">{errors.singleSharingPrice}</p>
        )}
      </div>
      <div>
        <label className="text-white/80 text-xs sm:text-sm font-medium mb-2 block flex items-center gap-2">
          <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4" />
          Double Sharing Room Price (Per Person)
        </label>
        <div className="relative">
          <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/60 text-base sm:text-lg font-semibold">₹</span>
          <Input
            type="number"
            placeholder="e.g. 8000"
            value={formData.doubleSharingPrice}
            onChange={(e) => setFormData({ ...formData, doubleSharingPrice: e.target.value })}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 text-base sm:text-lg py-4 sm:py-6 pl-8 sm:pl-10 focus:border-green-400 focus:ring-green-400"
          />
        </div>
        {errors.doubleSharingPrice && (
          <p className="text-red-500 text-xs sm:text-sm mt-2">{errors.doubleSharingPrice}</p>
        )}
      </div>
    </div>
  </div>
)}

            {/* Step 2: Contact & Details */}
{currentStep === 2 && (
  <div className="space-y-4 sm:space-y-6">
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 px-2">Contact & Additional Info</h2>
      <p className="text-white/60 text-sm sm:text-base px-4">Help tenants reach you easily</p>
    </div>
    <div className="space-y-4 sm:space-y-6">
      <div>
        <label className="text-white/80 text-xs sm:text-sm font-medium mb-2 block flex items-center gap-2">
          <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
          WhatsApp Number
        </label>
        <Input
          type="tel"
          placeholder="9876543210"
          value={formData.whatsappNumber}
          onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value.replace(/\D/g, '') })}
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 text-base sm:text-lg py-4 sm:py-6 focus:border-blue-400 focus:ring-blue-400"
          maxLength={10}
        />
        {errors.whatsappNumber && (
          <p className="text-red-500 text-xs sm:text-sm mt-2">{errors.whatsappNumber}</p>
        )}
      </div>
      <div>
        <label className="text-white/80 text-xs sm:text-sm font-medium mb-2 block flex items-center gap-2">
          <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
          Description <span className="text-white/40 text-xs">(Optional)</span>
        </label>
        <Textarea
          placeholder="Tell us more about your PG..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 text-sm sm:text-base md:text-lg min-h-24 sm:min-h-32 focus:border-green-400 focus:ring-green-400"
        />
      </div>
      <div>
        <label className="text-white/80 text-xs sm:text-sm font-medium mb-2 block flex items-center gap-2">
          <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
          Security Deposit
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {['one-time', 'monthly', 'NA'].map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormData({ ...formData, securityDeposit: option })}
              className={`py-3 sm:py-4 px-2 sm:px-4 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm md:text-base transition-all ${
                formData.securityDeposit === option
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {option === 'one-time' ? 'One Time' : option === 'monthly' ? 'Monthly' : 'NA'}
            </motion.button>
          ))}
        </div>
        {errors.securityDeposit && (
          <p className="text-red-500 text-xs sm:text-sm mt-2">{errors.securityDeposit}</p>
        )}
      </div>
      <div>
        <label className="text-white/80 text-xs sm:text-sm font-medium mb-2 block flex items-center gap-2">
          <UtensilsCrossed className="w-3 h-3 sm:w-4 sm:h-4" />
          Mess
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {['included', 'not-included'].map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormData({ ...formData, mess: option })}
              className={`py-3 sm:py-4 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm md:text-base transition-all ${
                formData.mess === option
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {option === 'included' ? 'Included in Rent' : 'Not Included in Rent'}
            </motion.button>
          ))}
        </div>
        {errors.mess && (
          <p className="text-red-500 text-xs sm:text-sm mt-2">{errors.mess}</p>
        )}
      </div>
    </div>
  </div>
)}

           {/* Step 3: Basic Facilities */}
{currentStep === 3 && (
  <div className="space-y-4 sm:space-y-6">
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 px-2">Basic PG Facilities ✨</h2>
      <p className="text-white/60 text-sm sm:text-base px-4">Select all the facilities your PG offers</p>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4">
      {basicFacilities.map((facility) => {
        const Icon = facility.icon;
        const isSelected = formData.selectedFacilities.includes(facility.id);
        return (
          <motion.button
            key={facility.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFacilityToggle(facility.id)}
            className={`relative p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
              isSelected
                ? `${facility.color.bg} border-2 ${facility.color.text.replace('text-', 'border-')}`
                : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${
                isSelected ? facility.color.bg : 'bg-white/10'
              }`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isSelected ? facility.color.text : 'text-white/60'}`} />
              </div>
              <span className={`text-xs sm:text-sm font-medium leading-tight ${isSelected ? 'text-white' : 'text-white/70'}`}>
                {facility.label}
              </span>
            </div>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 sm:top-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center"
              >
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
    {errors.facilities && (
      <p className="text-red-500 text-xs sm:text-sm mt-4 text-center">{errors.facilities}</p>
    )}
  </div>
)}

            {/* Step 4: Room Amenities */}
{currentStep === 4 && (
  <div className="space-y-4 sm:space-y-6">
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 px-2">Room Amenities 🛏️</h2>
      <p className="text-white/60 text-sm sm:text-base px-4">What amenities do the rooms have?</p>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4">
      {roomAmenities.map((amenity) => {
        const Icon = amenity.icon;
        const isSelected = formData.selectedAmenities.includes(amenity.id);
        return (
          <motion.button
            key={amenity.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAmenityToggle(amenity.id)}
            className={`relative p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
              isSelected
                ? `${amenity.color.bg} border-2 ${amenity.color.text.replace('text-', 'border-')}`
                : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${
                isSelected ? amenity.color.bg : 'bg-white/10'
              }`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isSelected ? amenity.color.text : 'text-white/60'}`} />
              </div>
              <span className={`text-xs sm:text-sm font-medium leading-tight ${isSelected ? 'text-white' : 'text-white/70'}`}>
                {amenity.label}
              </span>
            </div>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 sm:top-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center"
              >
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
    {errors.amenities && (
      <p className="text-red-500 text-xs sm:text-sm mt-4 text-center">{errors.amenities}</p>
    )}
  </div>
)}

            
                        {/* Step 5: Media & Location */}
{currentStep === 5 && (
  <div className="space-y-4 sm:space-y-6">
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 px-2">Almost There! 📸</h2>
      <p className="text-white/60 text-sm sm:text-base px-4">Add photos, location, and video</p>
    </div>
    <div className="space-y-4 sm:space-y-6">
      {/* Images Upload */}
      <div>
        <label className="text-white/80 text-xs sm:text-sm font-medium mb-2 sm:mb-3 block flex items-center gap-2">
          <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          Property Images <span className="text-white/40 text-xs">(Max 6)</span>
        </label>
        <div className="border-2 border-dashed border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center hover:border-green-400 transition-colors cursor-pointer bg-white/5">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
            disabled={formData.images.length >= 6}
          />
          
          {formData.images.length === 0 ? (
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-white/70 mb-2 text-sm sm:text-base">Click to upload images</p>
              <p className="text-white/40 text-xs sm:text-sm">Upload multiple photos of your PG (Max 6)</p>
            </label>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {/* Image Previews Grid - Keep 3 columns */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-white/10 border border-white/20">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleImageRemove(index);
                      }}
                      className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Upload More Button */}
              {formData.images.length < 6 && (
                <label htmlFor="image-upload" className="cursor-pointer inline-block">
                  <div className="flex items-center justify-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-medium">
                      Add more images ({formData.images.length}/6)
                    </span>
                  </div>
                </label>
              )}
              
              {formData.images.length >= 6 && (
                <p className="text-yellow-400 text-xs sm:text-sm">Maximum 6 images reached</p>
              )}
            </div>
          )}
        </div>
        {errors.images && (
          <p className="text-red-500 text-xs sm:text-sm mt-2">{errors.images}</p>
        )}
      </div>

      {/* Location - MOVED UP */}
      <div>
        <label className="text-white/80 text-xs sm:text-sm font-medium mb-2 sm:mb-3 block flex items-center gap-2">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
          Property Location
        </label>
        
        {/* Fixed height container */}
        <div className="min-h-[180px] sm:min-h-[200px] transition-all duration-300 ease-out">
          {/* Current Location Button */}
          <div className="mb-3 sm:mb-4">
            <Button
              type="button"
              onClick={getCurrentLocation}
              disabled={isLoadingLocation || locationMethod === 'current' || locationMethod === 'search'}
              className="w-full bg-green-500/20 border-2 border-green-500/50 text-green-300 hover:bg-green-500/30 hover:border-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm py-4 sm:py-5"
            >
              <Navigation className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${isLoadingLocation ? 'animate-spin' : ''}`} />
              {isLoadingLocation ? 'Getting Your Location...' : 'Use Current Location'}
            </Button>
            
            {/* Success Message */}
            <AnimatePresence mode="wait">
              {locationMethod === 'current' && formData.location && (
                <motion.div
                  key="current-location-success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-2 sm:mt-3 p-2 sm:p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                >
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-green-300 text-xs sm:text-sm font-medium">Location detected successfully</p>
                      <p className="text-green-200/70 text-[10px] sm:text-xs mt-1 break-words">{formData.location}</p>
                    </div>
                    <button
                      onClick={removeCurrentLocation}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 hover:border-red-500 flex items-center justify-center transition-all flex-shrink-0"
                      title="Remove location"
                    >
                      <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Location Error */}
          {locationError && (
            <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-xs sm:text-sm">{locationError}</p>
            </div>
          )}

          {/* Divider */}
          <AnimatePresence mode="wait">
            {locationMethod !== 'current' && (
              <motion.div 
                key="divider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4"
              >
                <div className="flex-1 h-px bg-white/20"></div>
                <span className="text-white/40 text-xs sm:text-sm">OR</span>
                <div className="flex-1 h-px bg-white/20"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Google Places Autocomplete - STACK ON MOBILE */}
          <AnimatePresence mode="wait">
            {locationMethod !== 'current' && (
              <motion.div 
                key="search-input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 sm:space-y-0 sm:flex sm:gap-2"
              >
                <div className="flex-1 relative">
                  <Autocomplete
                    apiKey="AIzaSyBT6_M1nyhJomGsJi-owJkDJTRa0KngcDE"
                    onPlaceSelected={(place) => {
                      if (place && place.formatted_address) {
                        setTempSearchQuery(place.formatted_address);
                        setFormData(prev => ({ 
                          ...prev, 
                          location: place.formatted_address 
                        }));
                        if (place.geometry && place.geometry.location) {
                          setCoordinates({
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                          });
                        }
                        setLocationMethod('search');
                        setLocationError('');
                      }
                    }}
                    onChange={(e: any) => {
                      setTempSearchQuery(e.target.value);
                      if (locationMethod === 'search') {
                        setCoordinates(null);
                        setLocationMethod('none');
                      }
                    }}
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: "in" },
                    }}
                    className="w-full bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-6 px-3 sm:px-4 pr-10 sm:pr-12 rounded-lg sm:rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/50 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Search for your property address..."
                    value={tempSearchQuery}
                    disabled={locationMethod === 'search'}
                  />
                  <MapPin className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/40 pointer-events-none" />
                </div>
                {locationMethod !== 'search' ? (
                  <Button
                    type="button"
                    onClick={confirmSearchLocation}
                    disabled={!tempSearchQuery.trim()}
                    className="w-full sm:w-auto bg-green-500/20 border-2 border-green-500/50 text-green-300 hover:bg-green-500/30 hover:border-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 sm:py-4 text-sm sm:text-base"
                  >
                    Enter
                  </Button>
                ) : (
                  <button
                    onClick={removeSearchLocation}
                    className="w-full sm:w-12 h-10 sm:h-12 rounded-lg bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500/40 hover:border-red-500 flex items-center justify-center transition-all"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Location Confirmation */}
          <AnimatePresence mode="wait">
            {locationMethod === 'search' && coordinates && formData.location && (
              <motion.div
                key="search-location-success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-3 sm:mt-4 p-3 sm:p-4 bg-green-500/10 border-2 border-green-500/40 rounded-xl"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-green-300 text-xs sm:text-sm font-semibold mb-1">✓ Location Added Successfully</p>
                    <p className="text-green-200/80 text-xs sm:text-sm leading-relaxed mb-2 break-words">{formData.location}</p>
                    <p className="text-green-200/40 text-[10px] sm:text-xs font-mono">
                      Coordinates: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <p className="text-white/40 text-xs sm:text-sm mt-2 sm:mt-3">
            💡 Use current location for accuracy or search for your property address
          </p>
        </div>
      </div>

      {/* Video Upload */}
      <div>
        <label className="text-white/80 text-xs sm:text-sm font-medium mb-2 sm:mb-3 block flex items-center gap-2">
          <Video className="w-3 h-3 sm:w-4 sm:h-4" />
          Property Video <span className="text-white/40 text-xs">(Optional, Max 50 MB)</span>
        </label>
        <div className="border-2 border-dashed border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center hover:border-green-400 transition-colors cursor-pointer bg-white/5">
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
            id="video-upload"
            disabled={formData.video !== null}
          />
          
          {!formData.video ? (
            <label htmlFor="video-upload" className="cursor-pointer">
              <Video className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-white/70 mb-2 text-sm sm:text-base">Click to upload video</p>
              <p className="text-white/40 text-xs sm:text-sm">Upload a video tour of your PG (Max 50 MB)</p>
            </label>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {/* Video Preview */}
              <div className="relative">
                <div className="rounded-lg overflow-hidden bg-black border border-white/20">
                  <video
                    src={URL.createObjectURL(formData.video)}
                    controls
                    className="w-full max-h-48 sm:max-h-64 mx-auto"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleVideoRemove();
                  }}
                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              
              <p className="text-green-400 text-xs sm:text-sm font-medium break-all px-2">
                {formData.video.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)}
          </motion.div>
        </AnimatePresence>

       {/* Navigation Buttons */}
<div className="flex items-center justify-between gap-3 sm:gap-4">
  <Button
    onClick={handlePrevious}
    disabled={currentStep === 0}
    variant="outline"
    size="lg"
    className="bg-white/5 border-white/20 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-5 sm:py-6 px-4 sm:px-6"
  >
    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
    <span className="hidden xs:inline">Previous</span>
    <span className="xs:hidden">Prev</span>
  </Button>

  {currentStep === steps.length - 1 ? (
    <Button
      onClick={handleSubmitClick}
      size="lg"
      className="bg-gradient-to-r from-green-500 to-emerald-400 text-white hover:shadow-lg hover:shadow-green-500/50 transition-all text-sm sm:text-base py-5 sm:py-6 px-4 sm:px-6"
    >
      <span className="hidden xs:inline">Submit Listing</span>
      <span className="xs:hidden">Submit</span>
      <Check className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
    </Button>
  ) : (
    <Button
      onClick={handleNext}
      size="lg"
      className="bg-gradient-to-r from-green-500 to-emerald-400 text-white hover:shadow-lg hover:shadow-green-500/50 transition-all text-sm sm:text-base py-5 sm:py-6 px-4 sm:px-6"
    >
      <span className="hidden xs:inline">Next Step</span>
      <span className="xs:hidden">Next</span>
      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
    </Button>
  )}
</div>

        {/* Fun Encouragement Message */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
  className="text-center mt-6 sm:mt-8"
>
  <p className="text-white/50 text-xs sm:text-sm px-4">
    {currentStep === 0 && "🎉 Let's get started!"}
    {currentStep === 1 && "💰 Perfect! Let's set the right price"}
    {currentStep === 2 && "📞 Great! Help tenants connect with you"}
    {currentStep === 3 && "✨ Awesome! Show off your facilities"}
    {currentStep === 4 && "🛏️ Looking good! Room amenities next"}
    {currentStep === 5 && "🎊 Final step! You're almost done"}
  </p>
</motion.div>

          {/* ADD THIS NEW CODE BELOW ↓ */}
        
      {/* Loading Overlay - Shows when submitting */}
<AnimatePresence>
  {isSubmitting && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 max-w-[90vw] sm:max-w-none"
    >
      <div 
        className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 20px 60px rgba(16, 185, 129, 0.6)',
        }}
      >
        {/* Spinning Loader */}
        <svg 
          className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25"
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        
        {/* Loading Text */}
        <div className="flex flex-col">
          <p className="text-white font-bold text-sm sm:text-base md:text-lg">Submitting Your Property...</p>
          <p className="text-white/90 text-xs sm:text-sm hidden sm:block">Please wait, uploading images and data</p>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      </div>

      {/* Confirmation Dialog */}
<AlertDialog 
  open={showConfirmDialog} 
  onOpenChange={setShowConfirmDialog}
>
  <AlertDialogContent 
    key={showConfirmDialog ? 'dialog-open' : 'dialog-closed'}
    className="bg-gradient-to-br from-gray-900 to-gray-800 border-white/20 text-white max-w-[90vw] sm:max-w-md mx-auto animate-in fade-in-0 zoom-in-95 duration-300 ease-out"
  >
    <AlertDialogHeader>
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
        className="flex items-center justify-center mb-3 sm:mb-4"
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
        </div>
      </motion.div>
      <AlertDialogTitle className="text-lg sm:text-xl md:text-2xl text-center text-white px-2">
        Ready to Submit Your Property?
      </AlertDialogTitle>
      <AlertDialogDescription className="text-center text-white/70 text-xs sm:text-sm md:text-base px-2">
        Please review all the details carefully before submitting. Once submitted, your property listing will be sent to our admin team for approval. Are you sure you want to proceed?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3">
      <AlertDialogCancel className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white m-0 text-sm sm:text-base py-2 sm:py-3">
        Keep Editing
      </AlertDialogCancel>
      <AlertDialogAction 
        onClick={handleConfirmSubmit}
        disabled={isSubmitting}
        className="bg-gradient-to-r from-green-500 to-emerald-400 text-white hover:shadow-lg hover:shadow-green-500/50 m-0 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-2 sm:py-3"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          "Yes, Submit Property"
        )}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </div>
  );
};

export default PGListingForm;
