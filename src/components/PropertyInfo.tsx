import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Wallet, UtensilsCrossed, Wifi, Battery, MoveUp, Droplets, Microwave, Refrigerator, UserCheck, Users, CircleDot, WashingMachine, Camera, Home, Wind, DoorOpen, Flame, Archive, BedDouble, UserPlus, UsersRound, BadgeDollarSign, Maximize2, Armchair, Droplet, ChefHat, RouterIcon, BookOpen, PanelTop, CookingPot, Fan } from "lucide-react";
import { PropertyDetails, BasicFacility, RoomAmenity, FlatDetails, FlatAmenity } from "@/data/properties";
import { TypewriterDisclaimer } from "./TypewriterDisclaimer";

interface PropertyInfoProps {
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  amenities: string[];
  propertyDetails?: PropertyDetails;
  flatDetails?: FlatDetails;
  basicFacilities?: BasicFacility[];
  roomAmenities?: RoomAmenity[];
  flatAmenities?: FlatAmenity[];
  propertyType?: string; // 👈 ADD THIS


}

export const PropertyInfo = ({
  bedrooms,
  bathrooms,
  area,
  location,
  amenities,
  propertyDetails,
  flatDetails,
  basicFacilities,
  roomAmenities,
  flatAmenities,
  propertyType,
}: PropertyInfoProps) => {
  // Icon and label mappings for facilities and amenities
  const facilityIcons: Record<BasicFacility, any> = {
    'free-wifi': Wifi,
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
  };

  const facilityLabels: Record<BasicFacility, string> = {
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

  const amenityIcons: Record<RoomAmenity, any> = {
    'air-conditioning': Wind,
    'attached-washroom': DoorOpen,
    'geyser': Flame,
    'separate-almirah': Archive,
    'mattress': BedDouble,
    'balcony-some': Home,
    'balcony-all': Home,
  };

  const amenityLabels: Record<RoomAmenity, string> = {
    'air-conditioning': 'Air Conditioning',
    'attached-washroom': 'Attached Washroom',
    'geyser': 'Geyser',
    'separate-almirah': 'Separate Almirah',
    'mattress': 'Mattress',
    'balcony-some': 'Balcony (in rooms)',
    'balcony-all': 'Common Balcony',
  };

  // Color mappings for visual variety
  const facilityColors: Record<BasicFacility, { bg: string; text: string }> = {
    'free-wifi': { bg: 'bg-blue-500/10', text: 'text-blue-400' },
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
  };

  const amenityColors: Record<RoomAmenity, { bg: string; text: string }> = {
    'air-conditioning': { bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
    'attached-washroom': { bg: 'bg-blue-500/10', text: 'text-blue-400' },
    'geyser': { bg: 'bg-orange-500/10', text: 'text-orange-400' },
    'separate-almirah': { bg: 'bg-purple-500/10', text: 'text-purple-400' },
    'mattress': { bg: 'bg-pink-500/10', text: 'text-pink-400' },
    'balcony-some': { bg: 'bg-green-500/10', text: 'text-green-400' },
    'balcony-all': { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  };

  // Flat amenities configuration
  const flatAmenityIcons: Record<FlatAmenity, any> = {
    'ac-rooms': Wind,
    'separate-almirah-flat': Archive,
    'mattress-pillows': BedDouble,
    'water-purifier': Droplet,
    'modular-kitchen': ChefHat,
    'wifi': Wifi,
    'study-table': BookOpen,
    'balcony': PanelTop,
    'common-sitting-area': Armchair,
    'induction-stove': CookingPot,
    'blower': Fan,
    'fridge': Refrigerator,
    'microwave': Microwave,
    'washroom': DoorOpen,
    'geyser': Flame,
  };

  const flatAmenityLabels: Record<FlatAmenity, string> = {
    'ac-rooms': 'AC Rooms',
    'separate-almirah-flat': 'Separate Almirah',
    'mattress-pillows': 'Mattress & Pillows',
    'water-purifier': 'Water Purifier',
    'modular-kitchen': 'Modular Kitchen',
    'wifi': 'WiFi',
    'study-table': 'Study Table',
    'balcony': 'Balcony',
    'common-sitting-area': 'Common Sitting Area',
    'induction-stove': 'Induction Stove',
    'blower': 'Blower',
    'fridge': 'Fridge',
    'microwave': 'Microwave',
    'washroom': 'Washroom',
    'geyser': 'Geyser',
  };

  const flatAmenityColors: Record<FlatAmenity, { bg: string; text: string }> = {
    'ac-rooms': { bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
    'separate-almirah-flat': { bg: 'bg-purple-500/10', text: 'text-purple-400' },
    'mattress-pillows': { bg: 'bg-pink-500/10', text: 'text-pink-400' },
    'water-purifier': { bg: 'bg-blue-500/10', text: 'text-blue-400' },
    'modular-kitchen': { bg: 'bg-orange-500/10', text: 'text-orange-400' },
    'wifi': { bg: 'bg-indigo-500/10', text: 'text-indigo-400' },
    'study-table': { bg: 'bg-green-500/10', text: 'text-green-400' },
    'balcony': { bg: 'bg-teal-500/10', text: 'text-teal-400' },
    'common-sitting-area': { bg: 'bg-violet-500/10', text: 'text-violet-400' },
    'induction-stove': { bg: 'bg-red-500/10', text: 'text-red-400' },
    'blower': { bg: 'bg-sky-500/10', text: 'text-sky-400' },
    'fridge': { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
    'microwave': { bg: 'bg-amber-500/10', text: 'text-amber-400' },
    'washroom': { bg: 'bg-slate-500/10', text: 'text-slate-400' },
    'geyser': { bg: 'bg-rose-500/10', text: 'text-rose-400' },
  };

  // Get color and display text based on property details
  const getStatusColor = () => {
    if (!propertyDetails) return 'from-gray-500/10 to-gray-600/5';
    switch (propertyDetails.verificationStatus) {
      case 'verified': return 'from-green-500/10 to-green-600/5';
      case 'pending': return 'from-yellow-500/10 to-yellow-600/5';
      case 'unverified': return 'from-red-500/10 to-red-600/5';
      default: return 'from-gray-500/10 to-gray-600/5';
    }
  };

  const getStatusBorderColor = () => {
    if (!propertyDetails) return 'border-gray-500/20';
    switch (propertyDetails.verificationStatus) {
      case 'verified': return 'border-green-500/20 hover:border-green-500/40';
      case 'pending': return 'border-yellow-500/20 hover:border-yellow-500/40';
      case 'unverified': return 'border-red-500/20 hover:border-red-500/40';
      default: return 'border-gray-500/20';
    }
  };

  const getStatusTextColor = () => {
    if (!propertyDetails) return 'text-gray-400';
    switch (propertyDetails.verificationStatus) {
      case 'verified': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'unverified': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIconBg = () => {
    if (!propertyDetails) return 'bg-gray-500/20';
    switch (propertyDetails.verificationStatus) {
      case 'verified': return 'bg-green-500/20';
      case 'pending': return 'bg-yellow-500/20';
      case 'unverified': return 'bg-red-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const getDepositText = () => {
    if (!propertyDetails) return 'NA';
    switch (propertyDetails.securityDeposit) {
      case 'one-time': return 'One Time';
      case 'monthly': return 'Monthly';
      case 'NA': return 'NA';
      default: return 'NA';
    }
  };

  const getMessText = () => {
    if (!propertyDetails) return 'Not Included in rent';
    switch (propertyDetails.messIncluded) {
      case 'included': return 'Included in rent';
      case 'not-included': return 'Not Included in rent';
      case 'optional': return 'Optional';
      default: return 'Not Included in rent';
    }
  };

  const stats = propertyDetails ? [
    {
      icon: ShieldCheck,
      label: "Status",
      value: propertyDetails.verificationStatus.charAt(0).toUpperCase() + propertyDetails.verificationStatus.slice(1),
      gradient: getStatusColor(),
      borderColor: getStatusBorderColor(),
      textColor: getStatusTextColor(),
      iconBg: getStatusIconBg()
    },
    {
      icon: Wallet,
      label: "Security Deposit",
      value: getDepositText(),
      gradient: 'from-blue-500/10 to-blue-600/5',
      borderColor: 'border-blue-500/20 hover:border-blue-500/40',
      textColor: 'text-blue-400',
      iconBg: 'bg-blue-500/20'
    },
    {
      icon: UtensilsCrossed,
      label: "Mess",
      value: getMessText(),
      gradient: 'from-orange-500/10 to-orange-600/5',
      borderColor: 'border-orange-500/20 hover:border-orange-500/40',
      textColor: 'text-orange-400',
      iconBg: 'bg-orange-500/20'
    },
  ] : [];

  // Flat details stats (4 cards for flats)
  const flatStats = flatDetails ? [
    {
      icon: UserPlus,
      label: "Flatmates Required",
      value: flatDetails.flatmatesRequired,
      gradient: 'from-purple-500/10 to-purple-600/5',
      borderColor: 'border-purple-500/20 hover:border-purple-500/40',
      textColor: 'text-purple-400',
      iconBg: 'bg-purple-500/20'
    },
    {
      icon: UsersRound,
      label: "Current Flatmates",
      value: flatDetails.currentFlatmates.toString(),
      gradient: 'from-blue-500/10 to-blue-600/5',
      borderColor: 'border-blue-500/20 hover:border-blue-500/40',
      textColor: 'text-blue-400',
      iconBg: 'bg-blue-500/20'
    },
    {
      icon: BadgeDollarSign,
      label: "Brokerage",
      value: flatDetails.brokerage === 'zero-brokerage' ? 'Zero Brokerage' : 'Brokerage Applicable',
      gradient: flatDetails.brokerage === 'zero-brokerage' ? 'from-green-500/10 to-green-600/5' : 'from-orange-500/10 to-orange-600/5',
      borderColor: flatDetails.brokerage === 'zero-brokerage' ? 'border-green-500/20 hover:border-green-500/40' : 'border-orange-500/20 hover:border-orange-500/40',
      textColor: flatDetails.brokerage === 'zero-brokerage' ? 'text-green-400' : 'text-orange-400',
      iconBg: flatDetails.brokerage === 'zero-brokerage' ? 'bg-green-500/20' : 'bg-orange-500/20'
    },
    {
      icon: Maximize2,
      label: "Flat Size",
      value: flatDetails.flatSize,
      gradient: 'from-pink-500/10 to-pink-600/5',
      borderColor: 'border-pink-500/20 hover:border-pink-500/40',
      textColor: 'text-pink-400',
      iconBg: 'bg-pink-500/20'
    },
  ] : [];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Property Stats (PG) */}
      {propertyDetails && propertyType === 'PG' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`bg-gradient-to-br ${stat.gradient} border-2 ${stat.borderColor} rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-300`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                <div className={`p-2 sm:p-3 ${stat.iconBg} rounded-lg`}>
                  <stat.icon className={stat.textColor} size={20} />
                </div>
                <div className="text-center sm:text-left">
                  <div className={`text-xl sm:text-2xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Flat Stats (Flats) */}
      {flatDetails && propertyType === 'Flat' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4"
        >
          {flatStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`bg-gradient-to-br ${stat.gradient} border-2 ${stat.borderColor} rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-300`}
            >
              <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
                <div className={`p-2 sm:p-3 ${stat.iconBg} rounded-lg`}>
                  <stat.icon className={stat.textColor} size={20} />
                </div>
                <div>
                  <div className={`text-xl sm:text-2xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </div>
                  {stat.label !== "Brokerage" && (
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Basic Facilities */}
      {basicFacilities && basicFacilities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#8BC6E0' }}>Basic Facilities</h3>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-4">
            {basicFacilities.map((facility, idx) => {
              const Icon = facilityIcons[facility];
              const colors = facilityColors[facility];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card rounded-lg border border-border hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.bg} rounded-full flex items-center justify-center`}>
                    <Icon className={colors.text} size={20} />
                  </div>
                  <span className="text-xs sm:text-sm text-center font-medium text-foreground leading-tight">{facilityLabels[facility]}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Room Amenities */}
      {roomAmenities && roomAmenities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#8BC6E0' }}>Room Amenities</h3>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-4">
            {roomAmenities.map((amenity, idx) => {
              const Icon = amenityIcons[amenity];
              const colors = amenityColors[amenity];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card rounded-lg border border-border hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.bg} rounded-full flex items-center justify-center`}>
                    <Icon className={colors.text} size={20} />
                  </div>
                  <span className="text-xs sm:text-sm text-center font-medium text-foreground leading-tight">{amenityLabels[amenity]}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* All Flat Amenities */}
      {flatAmenities && flatAmenities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#8BC6E0' }}>All Flat Amenities</h3>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-4">
            {flatAmenities.map((amenity, idx) => {
              const Icon = flatAmenityIcons[amenity];
              const colors = flatAmenityColors[amenity];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card rounded-lg border border-border hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.bg} rounded-full flex items-center justify-center`}>
                    <Icon className={colors.text} size={20} />
                  </div>
                  <span className="text-xs sm:text-sm text-center font-medium text-foreground leading-tight">{flatAmenityLabels[amenity]}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Disclaimer Note */}
      <TypewriterDisclaimer
        text="Please note: Prices and features are listed as per the last update. For the most current information, please contact the owner."
      />
    </div>
  );
};
