import { useState, useRef, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { PropertyFooter } from "@/components/PropertyFooter";
import { Button } from "@/components/ui/button";
import { motion, useInView } from 'framer-motion';
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSearchBar from '@/components/AnimatedSearchBar';
import { supabase } from "@/lib/supabase";
import HeroSection from '@/components/HeroSection';

// AnimateOnScroll Component
const AnimateOnScroll = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

const Properties = () => {
  // Filter and Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]); // ['PG', 'Flat'] or empty
  const [sortBy, setSortBy] = useState("last-listed");

  // Data States
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties from Supabase
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        console.log('🔄 Fetching properties from Supabase...');

        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .in('status', ['available', 'contact-owner', 'not-available'])
          .order('created_at', { ascending: false });

        if (error) {
          console.error('❌ Error fetching properties:', error);
          throw error;
        }

        console.log('✅ Fetched properties:', data);

        // Transform database data
        const transformedProperties = data.map(property => ({
          id: property.id.toString(),
          title: property.title,
          description: property.description,
          type: property.type,
          status: property.status,
          images: property.images || [],
          location: {
            address: property.location_address,
            city: property.location_city,
            state: property.location_state,
            coordinates: {
              lat: property.location_lat,
              lng: property.location_lng,
            },
            nearbyLocations: {
              timeToEntranceGate: property.time_to_entrance_gate,
              timeToMainMarket: property.time_to_main_market,
            },
          },
          featuredAmenities: property.featured_amenities || [],
          showDistanceToDTU: property.show_distance_to_dtu,
          floorNumber: property.floor_number,
          flatDetails: property.type === 'Flat' ? {
            flatSize: property.flat_size,
          } : undefined,
          ownerPhone: property.owner_phone,
          listedDate: property.listed_date,
          roomPricing: property.type === 'PG' ? {
            singleSharing: property.room_pricing_single,
            doubleSharing: property.room_pricing_double,
          } : undefined,
          flatRent: property.type === 'Flat' ? property.flat_rent : undefined,
          basicFacilities: property.basic_facilities || [],
          roomAmenities: property.room_amenities || [],
          flatAmenities: property.flat_amenities || [],
          video: property.video,
          propertyDetails: {
            securityDeposit: property.security_deposit,
            messIncluded: property.mess_included,
          },
        }));

        setProperties(transformedProperties);
        setError(null);

      } catch (err) {
        console.error('❌ Error in fetchProperties:', err);
        setError(err.message || 'Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Helper function to get property price for sorting
  const getPropertyPrice = (property) => {
    if (property.type === 'PG') {
      const single = property.roomPricing?.singleSharing || 0;
      const double = property.roomPricing?.doubleSharing || 0;

      // If both available, use double sharing
      if (double > 0) return double;
      // If only single available, use single
      if (single > 0) return single;
      // If both are 0 or null, return 0 (will be sorted to end)
      return 0;
    } else if (property.type === 'Flat') {
      return property.flatRent || 0;
    }
    return 0;
  };

  // Filtered and Sorted Properties (memoized for performance)
  const filteredAndSortedProperties = useMemo(() => {
    let result = [...properties];

    // 1. Filter by search query (contains matching, case-insensitive)
    if (searchQuery.trim()) {
      result = result.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Filter by type (PG/Flat checkboxes)
    if (selectedTypes.length > 0) {
      result = result.filter(property => selectedTypes.includes(property.type));
    }

    // 3. Sort by selected option
    switch (sortBy) {
      case 'last-listed':
        // Already sorted by created_at desc from database
        break;

      case 'nearest-dtu':
        result.sort((a, b) => {
          const timeA = a.location.nearbyLocations?.timeToEntranceGate;
          const timeB = b.location.nearbyLocations?.timeToEntranceGate;

          // If both have time, sort ascending
          if (timeA && timeB) {
            return parseInt(timeA) - parseInt(timeB);
          }
          // If only A has time, A comes first
          if (timeA && !timeB) return -1;
          // If only B has time, B comes first
          if (!timeA && timeB) return 1;
          // If both null/empty, maintain order
          return 0;
        });
        break;

      case 'price-high-low':
        result.sort((a, b) => {
          const priceA = getPropertyPrice(a);
          const priceB = getPropertyPrice(b);

          // Properties with price 0 go to the end
          if (priceA === 0 && priceB === 0) return 0;
          if (priceA === 0) return 1;
          if (priceB === 0) return -1;

          return priceB - priceA; // High to low
        });
        break;

      case 'price-low-high':
        result.sort((a, b) => {
          const priceA = getPropertyPrice(a);
          const priceB = getPropertyPrice(b);

          // Properties with price 0 go to the end
          if (priceA === 0 && priceB === 0) return 0;
          if (priceA === 0) return 1;
          if (priceB === 0) return -1;

          return priceA - priceB; // Low to high
        });
        break;

      default:
        break;
    }

    return result;
  }, [properties, searchQuery, selectedTypes, sortBy]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      <Navbar />

      {/* HERO SECTION */}
      <HeroSection />

      {/* Looking for Flatmate/Roommate Section */}
      <section className="relative py-6 sm:py-8 md:py-10 overflow-hidden" style={{ backgroundColor: '#000000' }}>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <AnimateOnScroll delay={0.01}>
            <div className="max-w-3xl mx-auto">
              <div
                className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-700 to-blue-700 border border-purple-400/30 p-5 sm:p-6 md:p-8 shadow-xl"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>

                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/20 border border-white/40 mb-3 sm:mb-4">
                    <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 px-2">
                    Looking for a Flatmate or Roommate?
                  </h2>

                  <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5 max-w-xl mx-auto px-2">
                    Find the perfect flatmate to share your space! Connect with verified students and professionals looking for accommodation near DTU.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-5 px-2">
                    <div className="flex items-center gap-1.5 text-white/90 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      <span>Verified Profiles</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/90 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      <span>Easy Connect</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/90 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      <span>Hassle Free Listing</span>
                    </div>
                  </div>

                  <Button
                    variant="hero"
                    size="default"
                    asChild
                    className="hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
                  >
                    <Link to="/flatmate-type-selection">
                      Click Here
                    </Link>
                  </Button>
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70"></div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="relative py-6 sm:py-8" style={{ backgroundColor: '#000000' }}>
        <div className="container mx-auto px-4 sm:px-6">
          <AnimateOnScroll delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <AnimatedSearchBar
                onSearchChange={setSearchQuery}
                onTypeChange={setSelectedTypes}
                onSortChange={setSortBy}
                searchValue={searchQuery}
                selectedTypes={selectedTypes}
                sortBy={sortBy}
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Properties Grid */}
      <div className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12 sm:py-16 md:py-20">
              <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground">Loading properties...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12 sm:py-16 md:py-20 px-4">
              <p className="text-red-400 text-base sm:text-lg mb-4">❌ {error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          )}

          {/* Empty State - No Results */}
          {!loading && !error && filteredAndSortedProperties.length === 0 && (
            <div className="text-center py-12 sm:py-16 md:py-20 px-4">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">No Properties Found</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                {searchQuery || selectedTypes.length > 0
                  ? "Try adjusting your search or filters"
                  : "Check back soon for new listings!"}
              </p>
              {(searchQuery || selectedTypes.length > 0) && (
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTypes([]);
                    setSortBy("last-listed");
                  }}
                  variant="outline"
                  className="text-sm sm:text-base"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          )}

          {/* Properties Grid */}
          {!loading && !error && filteredAndSortedProperties.length > 0 && (
            <>
              {/* Results Count */}
              <div className="mb-4 sm:mb-6 text-center px-4">
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  Showing <span className="text-primary font-semibold">{filteredAndSortedProperties.length}</span> {filteredAndSortedProperties.length === 1 ? 'property' : 'properties'}
                  {searchQuery && <span> matching "<span className="text-foreground font-medium">{searchQuery}</span>"</span>}
                  {selectedTypes.length > 0 && <span> • Type: <span className="text-foreground font-medium">{selectedTypes.join(', ')}</span></span>}
                </p>
              </div>

              {/* Property Cards */}
              <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
                {filteredAndSortedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    id={property.id}
                    image={property.images[0]}
                    images={property.images}
                    title={property.title}
                    description={property.description}
                    location={property.location.address}
                    featuredAmenities={property.featuredAmenities}
                    distanceToDTU={property.showDistanceToDTU ? property.location.nearbyLocations?.timeToEntranceGate : undefined}
                    floorNumber={property.floorNumber}
                    flatSize={property.flatDetails?.flatSize}
                    status={property.status}
                    type={property.type}
                    singleSharingPrice={property.roomPricing?.singleSharing}
                    doubleSharingPrice={property.roomPricing?.doubleSharing}
                    monthlyRent={property.flatRent}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <PropertyFooter />
    </div>
  );
};

export default Properties;