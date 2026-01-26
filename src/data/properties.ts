// Import images
import pinnacle1 from '@/assets/pinnacle 1.jpeg';
import pinnacle2 from '@/assets/pinnacle 2.jpeg';
import pinnacle3 from '@/assets/pinnacle 3.jpeg';
import pinnacle4 from '@/assets/pinnacle 4.jpeg';
import pinnacle5 from '@/assets/pinnacle 5.jpeg';
import pinnacle6 from '@/assets/pinnacle 6.jpeg';
import pinnacleVideo from '@/assets/pinnacle video.mp4';
import dwar1 from '@/assets/dwar 1.jpeg';
import dwar2 from '@/assets/dwar 2.jpeg';
import dwar3 from '@/assets/dwar 3.jpeg';
import dwar4 from '@/assets/dwar 4.jpeg';
import dwar5 from '@/assets/dwar 5.jpeg';
import dwar6 from '@/assets/dwar 6.jpeg';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

/**
 * Nearby Location Configuration
 * 
 * Used to display travel times to fixed landmarks on the property detail page.
 * Shows 2 cards: "to DTU Entrance gate" and "to main market" (labels are constant)
 * 
 * Example usage:
 * nearbyLocations: {
 *   timeToEntranceGate: '2',  // Just the number (minutes)
 *   timeToMainMarket: '10'    // Just the number (minutes)
 * }
 * 
 * Only customize the TIME (in minutes), labels remain constant:
 * - First card always shows: "X min to DTU Entrance gate"
 * - Second card always shows: "X min to main market"
 * 
 * Default (if not specified): 2 min to DTU Entrance gate, 10 min to main market
 */
export interface NearbyLocation {
  timeToEntranceGate: string; // Time in minutes, e.g., '2', '5', '10'
  timeToMainMarket: string;   // Time in minutes, e.g., '10', '15', '20'
}

export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  nearbyLocations?: NearbyLocation; // Travel times to fixed locations
}

export interface PropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt: number;
}

export interface RoomPricing {
  singleSharing: number;
  doubleSharing: number;
}

export interface PropertyDetails {
  verificationStatus: 'verified' | 'pending' | 'unverified';
  securityDeposit: 'one-time' | 'monthly' | 'NA';
  messIncluded: 'included' | 'not-included' | 'optional';
}

export interface FlatDetails {
  flatmatesRequired: string; // e.g., '1-2', '1', '1-3', '2-4'
  currentFlatmates: number;
  brokerage: 'zero-brokerage' | 'brokerage-applicable';
  flatSize: '1BHK' | '2BHK' | '3BHK' | '4BHK' | '5BHK' | 'Studio';
}

export type BasicFacility = 
  | 'free-wifi' 
  | 'power-backup' 
  | 'elevator' 
  | 'ro-water' 
  | 'microwave' 
  | 'refrigerator' 
  | 'maid' 
  | 'common-room' 
  | 'tt-table' 
  | 'pool-table' 
  | 'washing-machine' 
  | 'cctv-security' 
  | 'terrace' 
  | 'mess';

export type RoomAmenity = 
  | 'air-conditioning' 
  | 'attached-washroom' 
  | 'geyser' 
  | 'separate-almirah' 
  | 'mattress' 
  | 'balcony-some' 
  | 'balcony-all';

export type FlatAmenity = 
  | 'ac-rooms'
  | 'separate-almirah-flat'
  | 'mattress-pillows'
  | 'water-purifier'
  | 'modular-kitchen'
  | 'wifi'
  | 'study-table'
  | 'balcony'
  | 'common-sitting-area'
  | 'induction-stove'
  | 'blower'
  | 'fridge'
  | 'microwave'
  | 'washroom'
  | 'geyser';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  roomPricing?: RoomPricing;
  flatRent?: number;
  propertyDetails?: PropertyDetails;
  flatDetails?: FlatDetails;
  basicFacilities?: BasicFacility[];
  roomAmenities?: RoomAmenity[];
  flatAmenities?: FlatAmenity[];
  location: PropertyLocation;
  images: string[];
  video?: string;
  features: PropertyFeatures;
  amenities: string[];
  featuredAmenities?: string[]; // 2-3 key amenities to display on property card
  showDistanceToDTU?: boolean; // Whether to show distance to DTU on card (uses nearbyLocations.timeToEntranceGate)
  floorNumber?: number; // Floor number for Flat properties (e.g., 1, 2, 3)
  type: 'PG' | 'Flat';
  status: 'available' | 'not-available' | 'contact-owner';
  listedDate: string;
  ownerPhone: string;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Seaside Serenity Villa',
    description: 'Discover your own piece of paradise with the Seaside Serenity Villa. This stunning beachfront property offers an open floor plan, breathtaking ocean views from every room, and direct access to a pristine private beach.',
    price: 1250000,
    roomPricing: {
      singleSharing: 12000,
      doubleSharing: 8000
    },
    propertyDetails: {
      verificationStatus: 'verified',
      securityDeposit: 'one-time',
      messIncluded: 'included'
    },
    basicFacilities: [
      'free-wifi',
      'power-backup',
      'elevator',
      'ro-water',
      'microwave',
      'refrigerator',
      'maid',
      'common-room',
      'tt-table',
      'pool-table'
    ],
    roomAmenities: [
      'air-conditioning',
      'attached-washroom',
      'geyser',
      'separate-almirah',
      'mattress'
    ],
    featuredAmenities: ['free-wifi', 'power-backup', 'cctv-security'], // Displayed on property card
    showDistanceToDTU: true, // Show distance to DTU on card
    location: {
      address: 'Pinnacle PG, Opposite DTU Entrance Gate',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110041',
      coordinates: {
        lat: 28.74493656787088,
        lng: 77.1174521202472,
       
      },
      nearbyLocations: {
        timeToEntranceGate: '2',
        timeToMainMarket: '10'
      }
    },
    images: [
      pinnacle2,
      pinnacle2,
      pinnacle3,
      pinnacle4,
      pinnacle5,
      pinnacle6,
    ],
    video: pinnacleVideo,
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      yearBuilt: 2023
    },
    amenities: [
      'Expansive oceanfront terrace for outdoor entertaining',
      'Gourmet kitchen with top-of-the-line appliances',
      'Private beach access for morning strolls and sunset views',
      'Master suite with a spa-inspired bathroom and ocean-facing balcony',
      'Private garage and ample storage space',
      'Infinity pool with ocean views',
      'Smart home technology throughout',
      'High-end security system',
    ],
    type: 'PG',
    status: 'contact-owner',
    listedDate: '15/11/2024',
    ownerPhone: '+91 98765 43210',
  },
  {
    id: '2',
    title: 'Metropolitan Haven',
    description: 'Contemporary urban apartment in the heart of the city with skyline views and premium finishes throughout.',
    price: 650000,
    flatRent: 25000,
    flatDetails: {
      flatmatesRequired: '1-2',
      currentFlatmates: 1,
      brokerage: 'zero-brokerage',
      flatSize: '2BHK'
    },
    flatAmenities: [
      'ac-rooms',
      'separate-almirah-flat',
      'mattress-pillows',
      'water-purifier',
      'modular-kitchen',
      'wifi',
      'study-table',
      'balcony',
      'common-sitting-area',
      'induction-stove',
      'blower',
      'fridge',
      'microwave',
      'washroom',
      'geyser'
    ],
    featuredAmenities: ['wifi', 'power-backup'], // Featured amenities for card display
    showDistanceToDTU: true, // Show distance to DTU on card
    floorNumber: 3, // Floor number for Flat property
    location: {
      address: '157 W 57th St',
      city: 'Downtown',
      state: 'New York',
      zipCode: '10019',
      coordinates: {
        lat: 28.7441804,
        lng: 77.1170859
      },
      nearbyLocations: {
        timeToEntranceGate: '5',
        timeToMainMarket: '15'
      }
    },
    images: [
      dwar1,
      dwar2,
      dwar3,
      dwar4,
      dwar5,
      dwar6,
    ],
    video: '/dwar video.mp4',
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      yearBuilt: 2022
    },
    amenities: [
      'Modern kitchen',
      'City views',
      'Building amenities',
      'Concierge service',
      'Rooftop access',
      'Secured parking',
    ],
    type: 'Flat',
    status: 'available',
    listedDate: '20/10/2024',
    ownerPhone: '+91 98765 43211'
  },
];
