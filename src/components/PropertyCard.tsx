import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wifi, Battery, MoveUp, Droplets, Microwave, Refrigerator,
  UserCheck, Users, CircleDot, WashingMachine, Camera, Home,
  UtensilsCrossed, Wind, DoorOpen, Flame, Archive, BedDouble,
  ChevronLeft, ChevronRight
} from "lucide-react";

interface PropertyCardProps {
  id: string;
  image: string;
  images?: string[];
  title: string;
  description: string;
  location: string;
  featuredAmenities?: string[];
  distanceToDTU?: string;
  floorNumber?: number;
  flatSize?: string;
  status: 'available' | 'not-available' | 'contact-owner';
  type: 'PG' | 'Flat';
  singleSharingPrice?: number;
  doubleSharingPrice?: number;
  monthlyRent?: number;
}

// Status configuration with colors and labels
const statusConfig = {
  'available': {
    label: 'Available',
    className: 'bg-green-500/10 text-green-600 border-green-500/20',
    dotColor: 'bg-green-500'
  },
  'not-available': {
    label: 'Not Available',
    className: 'bg-red-500/10 text-red-600 border-red-500/20',
    dotColor: 'bg-red-500'
  },
  'contact-owner': {
    label: 'Contact Owner',
    className: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    dotColor: 'bg-amber-500'
  }
};

// Amenity icons mapping
const amenityIcons: Record<string, any> = {
  'free-wifi': Wifi,
  'wifi': Wifi,
  'power-backup': Battery,
  'elevator': MoveUp,
  'ro-water': Droplets,
  'microwave': Microwave,
  'refrigerator': Refrigerator,
  'maid': UserCheck,
  'common-room': Users,
  'tt-table': CircleDot,
  'pool-table': CircleDot,
  'washing-machine': WashingMachine,
  'cctv-security': Camera,
  'terrace': Home,
  'mess': UtensilsCrossed,
  'air-conditioning': Wind,
  'attached-washroom': DoorOpen,
  'geyser': Flame,
  'separate-almirah': Archive,
  'mattress': BedDouble,
  'balcony-some': Home,
  'balcony-all': Home,
};

// Amenity labels mapping
const amenityLabels: Record<string, string> = {
  'free-wifi': 'Free WiFi',
  'wifi': 'WiFi',
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
  'air-conditioning': 'Air Conditioning',
  'attached-washroom': 'Attached Washroom',
  'geyser': 'Geyser',
  'separate-almirah': 'Separate Almirah',
  'mattress': 'Mattress',
  'balcony-some': 'Balcony (in rooms)',
  'balcony-all': 'Common Balcony',
};

// Color mappings
const amenityColors: Record<string, { bg: string; text: string }> = {
  'free-wifi': { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  'wifi': { bg: 'bg-indigo-500/10', text: 'text-indigo-400' },
  'power-backup': { bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
  'elevator': { bg: 'bg-purple-500/10', text: 'text-purple-400' },
  'ro-water': { bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
  'microwave': { bg: 'bg-orange-500/10', text: 'text-orange-400' },
  'refrigerator': { bg: 'bg-sky-500/10', text: 'text-sky-400' },
  'maid': { bg: 'bg-pink-500/10', text: 'text-pink-400' },
  'common-room': { bg: 'bg-indigo-500/10', text: 'text-indigo-400' },
  'tt-table': { bg: 'bg-green-500/10', text: 'text-green-400' },
  'pool-table': { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  'washing-machine': { bg: 'bg-violet-500/10', text: 'text-violet-400' },
  'cctv-security': { bg: 'bg-red-500/10', text: 'text-red-400' },
  'terrace': { bg: 'bg-teal-500/10', text: 'text-teal-400' },
  'mess': { bg: 'bg-amber-500/10', text: 'text-amber-400' },
  'air-conditioning': { bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
  'attached-washroom': { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  'geyser': { bg: 'bg-orange-500/10', text: 'text-orange-400' },
  'separate-almirah': { bg: 'bg-purple-500/10', text: 'text-purple-400' },
  'mattress': { bg: 'bg-pink-500/10', text: 'text-pink-400' },
  'balcony-some': { bg: 'bg-green-500/10', text: 'text-green-400' },
  'balcony-all': { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
};

const PropertyCard = ({
  id,
  image,
  images = [],
  title,
  description,
  location,
  featuredAmenities = [],
  distanceToDTU,
  floorNumber,
  flatSize,
  status,
  type,
  singleSharingPrice,
  doubleSharingPrice,
  monthlyRent,
}: PropertyCardProps) => {
  const statusInfo = statusConfig[status];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const imageArray = images.length > 0 ? images : [image];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageArray.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  // Touch swipe handlers for mobile/tablet
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentImageIndex < imageArray.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
    if (isRightSwipe && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <Link to={`/property-detail/${id}`} className="block">
      <Card className="overflow-hidden bg-gradient-card border-border hover:border-primary/50 transition-all duration-500 group shadow-lg hover:shadow-2xl hover:shadow-primary/20 cursor-pointer">

        {/* MOBILE LAYOUT (Below 768px) - Vertical Card */}
        <div className="md:hidden">
          {/* Image Section - Top */}
          <div
            className="relative w-full h-52 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Image Slider Container */}
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {imageArray.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${title} - ${index + 1}`}
                  className="w-full h-full object-cover object-center flex-shrink-0"
                  style={{ minWidth: '100%' }}
                />
              ))}
            </div>



            {/* Progress Dots - Only show if multiple images */}
            {imageArray.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {imageArray.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => handleDotClick(e, index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${index === currentImageIndex
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/75'
                      }`}
                  />
                ))}
              </div>
            )}

            {/* Property Type Badge - Top Left */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary/95 backdrop-blur-sm text-primary-foreground border-0 px-3 py-1.5 font-semibold text-xs shadow-lg">
                {type}
              </Badge>
            </div>
          </div>

          {/* Content Section - Bottom */}
          <CardContent className="p-5">

            {/* Title and Status Row */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-xl font-bold line-clamp-1 flex-1" style={{ color: '#8BC6E0' }}>
                {title}
              </h3>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border shrink-0 ${statusInfo.className}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotColor} animate-pulse`}></span>
                <span className="text-[10px] font-semibold whitespace-nowrap">{statusInfo.label}</span>
              </div>
            </div>

            {/* Location */}
            <p className="text-sm mb-3 line-clamp-1" style={{ color: '#8BC6E0' }}>
              {location}
            </p>

            {/* Description */}
            {/* <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed mb-4">
              {description}
            </p> */}

            {/* Pricing Section */}
            <div className="mb-4 pb-4 border-b border-border/50">
              {type === 'PG' ? (
                <div className="grid grid-cols-2 gap-3">
                  {/* Single Sharing */}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Single Sharing</p>
                    {singleSharingPrice && singleSharingPrice > 1 ? (
                      <>
                        <p className="text-lg font-bold text-primary">
                          ₹{singleSharingPrice.toLocaleString('en-IN')}
                        </p>
                        <p className="text-[10px] text-muted-foreground">per month</p>
                      </>
                    ) : singleSharingPrice === 1 ? (
                      <p className="text-sm font-semibold text-yellow-400">Contact Owner</p>
                    ) : (
                      <p className="text-sm font-semibold text-red-400">Not Available</p>
                    )}
                  </div>

                  {/* Double Sharing */}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Double Sharing</p>
                    {doubleSharingPrice && doubleSharingPrice > 1 ? (
                      <>
                        <p className="text-lg font-bold text-primary">
                          ₹{doubleSharingPrice.toLocaleString('en-IN')}
                        </p>
                        <p className="text-[10px] text-muted-foreground">per month</p>
                      </>
                    ) : doubleSharingPrice === 1 ? (
                      <p className="text-sm font-semibold text-yellow-400">Contact Owner</p>
                    ) : (
                      <p className="text-sm font-semibold text-red-400">Not Available</p>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {/* Flat Pricing */}
                  {monthlyRent && monthlyRent > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-medium">Monthly Rent</p>
                      <p className="text-2xl font-bold text-primary">
                        ₹{monthlyRent.toLocaleString('en-IN')}
                      </p>
                      <p className="text-[10px] text-muted-foreground">per month</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Featured Amenities Section */}
            {(featuredAmenities.length > 0 || distanceToDTU || (type === 'Flat' && (floorNumber || flatSize))) && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {/* Distance to DTU - Always green */}
                  {distanceToDTU && (
                    <div className="flex items-center gap-1.5 bg-green-500/10 px-2.5 py-1.5 rounded-lg text-xs border border-green-500/20">
                      <span className="text-green-600 font-semibold">{distanceToDTU} mins to DTU</span>
                    </div>
                  )}

                  {/* Floor Number - Only for Flats */}
                  {type === 'Flat' && floorNumber && (
                    <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-lg text-xs border border-border/30">
                      <span className="text-foreground font-medium">
                        {floorNumber}{floorNumber === 1 ? 'st' : floorNumber === 2 ? 'nd' : floorNumber === 3 ? 'rd' : 'th'} Floor
                      </span>
                    </div>
                  )}

                  {/* BHK Size - Only for Flats */}
                  {type === 'Flat' && flatSize && (
                    <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-lg text-xs border border-border/30">
                      <span className="text-foreground font-medium">{flatSize}</span>
                    </div>
                  )}

                  {/* Regular Amenities - Show max 3 on mobile */}
                  {featuredAmenities.slice(0, 3).map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity];
                    const label = amenityLabels[amenity] || amenity.replace(/-/g, ' ');
                    const colors = amenityColors[amenity] || { bg: 'bg-muted/50', text: 'text-foreground' };

                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-1.5 ${colors.bg} px-2.5 py-1.5 rounded-lg text-xs border border-border/30`}
                      >
                        {IconComponent && <IconComponent className={`w-3.5 h-3.5 ${colors.text}`} />}
                        <span className={`${colors.text} font-medium`}>{label}</span>
                      </div>
                    );
                  })}

                  {/* "And More" indicator */}
                  {featuredAmenities.length > 3 && (
                    <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-lg text-xs border border-border/30">
                      <span className="text-muted-foreground font-semibold">+{featuredAmenities.length - 3} more</span>
                    </div>
                  )}
                </div>

                {/* View all amenities link */}
                <div className="mt-2">
                  <span className="text-[10px] text-primary/60 group-hover:text-primary transition-colors duration-300">
                    View all amenities →
                  </span>
                </div>
              </div>
            )}

            {/* Click to view details */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="text-xs text-primary/70 group-hover:text-primary transition-colors duration-300 font-medium text-center">
                Click to view full details →
              </div>
            </div>

          </CardContent>
        </div>

        {/* DESKTOP/TABLET LAYOUT (768px and above) - Horizontal Card */}
        <div className="hidden md:flex h-full">
          {/* Left Section - Image with Carousel */}
          <div
            className="relative md:w-[340px] lg:w-[380px] h-64 overflow-hidden shrink-0"
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
          >
            {/* Image Slider Container */}
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {imageArray.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${title} - ${index + 1}`}
                  className="w-full h-full object-cover object-center flex-shrink-0"
                  style={{ minWidth: '100%' }}
                />
              ))}
            </div>

            {/* Navigation Arrows - Only show if multiple images and hovering */}
            {imageArray.length > 1 && isHoveringImage && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-all duration-200 backdrop-blur-sm z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-all duration-200 backdrop-blur-sm z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Progress Dots - Only show if multiple images and hovering */}
            {imageArray.length > 1 && isHoveringImage && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {imageArray.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => handleDotClick(e, index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${index === currentImageIndex
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/75'
                      }`}
                  />
                ))}
              </div>
            )}

            {/* Property Type Badge - Top Left of Image */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary/95 backdrop-blur-sm text-primary-foreground border-0 px-4 py-1.5 font-semibold text-sm shadow-lg">
                {type}
              </Badge>
            </div>
          </div>

          {/* Middle Section - Content */}
          <CardContent className="flex-1 p-5 md:p-6 flex flex-col">
            {/* Title and Status Row */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-xl md:text-2xl font-bold line-clamp-1 flex-1" style={{ color: '#8BC6E0' }}>{title}</h3>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border shrink-0 ${statusInfo.className}`}>
                <span className={`w-2 h-2 rounded-full ${statusInfo.dotColor} animate-pulse`}></span>
                <span className="text-xs font-semibold whitespace-nowrap">{statusInfo.label}</span>
              </div>
            </div>

            {/* Location */}
            <p className="text-sm mb-3 line-clamp-1" style={{ color: '#8BC6E0' }}>{location}</p>

            {/* Description */}
            <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed mb-4">
              {description}
            </p>

            {/* Featured Amenities Section */}
            <div className="flex-1 flex flex-col justify-end">
              {(featuredAmenities.length > 0 || distanceToDTU || (type === 'Flat' && (floorNumber || flatSize))) && (
                <div className="space-y-2 pt-4 border-t border-border/50">
                  <div className="flex flex-wrap gap-2">
                    {/* Distance to DTU - Always green */}
                    {distanceToDTU && (
                      <div className="flex items-center gap-1.5 bg-green-500/10 px-3 py-1.5 rounded-lg text-xs border border-green-500/20">
                        <span className="text-green-600 font-semibold">{distanceToDTU} mins to DTU</span>
                      </div>
                    )}

                    {/* Floor Number - Only for Flats */}
                    {type === 'Flat' && floorNumber && (
                      <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-lg text-xs border border-border/30">
                        <span className="text-foreground font-medium">{floorNumber}{floorNumber === 1 ? 'st' : floorNumber === 2 ? 'nd' : floorNumber === 3 ? 'rd' : 'th'} Floor</span>
                      </div>
                    )}

                    {/* BHK Size - Only for Flats */}
                    {type === 'Flat' && flatSize && (
                      <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-lg text-xs border border-border/30">
                        <span className="text-foreground font-medium">{flatSize}</span>
                      </div>
                    )}

                    {/* Regular Amenities */}
                    {featuredAmenities.slice(0, 4).map((amenity, index) => {
                      const IconComponent = amenityIcons[amenity];
                      const label = amenityLabels[amenity] || amenity.replace(/-/g, ' ');
                      const colors = amenityColors[amenity] || { bg: 'bg-muted/50', text: 'text-foreground' };

                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-1.5 ${colors.bg} px-3 py-1.5 rounded-lg text-xs border border-border/30`}
                        >
                          {IconComponent && <IconComponent className={`w-3.5 h-3.5 ${colors.text}`} />}
                          <span className={`${colors.text} font-medium`}>{label}</span>
                        </div>
                      );
                    })}

                    {/* "And More" indicator */}
                    {featuredAmenities.length > 4 && (
                      <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-lg text-xs border border-border/30">
                        <span className="text-muted-foreground font-semibold">+{featuredAmenities.length - 4} more</span>
                      </div>
                    )}
                  </div>
                  {/* More link */}
                  <div className="mt-2">
                    <span className="text-[10px] text-primary/60 group-hover:text-primary transition-colors duration-300">View all amenities →</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          {/* Right Section - Pricing */}
          <div className="md:w-[180px] lg:w-[200px] shrink-0 bg-gradient-to-br from-primary/5 to-primary/10 border-l border-border/50 p-5 md:p-6 flex flex-col items-center justify-center">
            <div className="text-center space-y-3">
              {type === 'PG' ? (
                <>
                  {/* PG Pricing */}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Single Sharing</p>
                    {singleSharingPrice && singleSharingPrice > 1 ? (
                      <>
                        <p className="text-xl md:text-2xl font-bold text-primary">₹{singleSharingPrice.toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-muted-foreground">per month</p>
                      </>
                    ) : singleSharingPrice === 1 ? (
                      <p className="text-sm font-semibold text-yellow-400">Contact Owner</p>
                    ) : (
                      <p className="text-sm font-semibold text-red-400">Not Available</p>
                    )}
                  </div>
                  <div className="space-y-1 pt-3 border-t border-border/30">
                    <p className="text-xs text-muted-foreground font-medium">Double Sharing</p>
                    {doubleSharingPrice && doubleSharingPrice > 1 ? (
                      <>
                        <p className="text-xl md:text-2xl font-bold text-primary">₹{doubleSharingPrice.toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-muted-foreground">per month</p>
                      </>
                    ) : doubleSharingPrice === 1 ? (
                      <p className="text-sm font-semibold text-yellow-400">Contact Owner</p>
                    ) : (
                      <p className="text-sm font-semibold text-red-400">Not Available</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Flat Pricing */}
                  {monthlyRent && monthlyRent > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-medium">Monthly Rent</p>
                      <p className="text-2xl md:text-3xl font-bold text-primary">₹{monthlyRent.toLocaleString('en-IN')}</p>
                      <p className="text-[10px] text-muted-foreground">per month</p>
                    </div>
                  )}
                </>
              )}

              {/* View Details Link */}
              <div className="pt-4">
                <div className="text-xs text-primary/70 group-hover:text-primary transition-colors duration-300 font-medium">
                  Click to view details →
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default PropertyCard;