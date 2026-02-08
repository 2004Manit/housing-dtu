import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NearbyLocation {
  timeToEntranceGate: string;
  timeToMainMarket: string;
}

interface GoogleMapSectionProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  city: string;
  state: string;
  propertyName: string;
  nearbyLocations?: NearbyLocation;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1rem'
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: false,
  fullscreenControl: true,

};

export const GoogleMapSection = ({
  coordinates,
  address,
  city,
  state,
  propertyName,
  nearbyLocations
}: GoogleMapSectionProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<boolean>(false);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setIsLoading(false);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Handle Maps API loading errors gracefully
  const onLoadError = useCallback((error: Error) => {
    console.error('Google Maps failed to load:', error.message);
    setLoadError(true);
    setIsLoading(false);
  }, []);

  // Function to open Google Maps directions
  const handleGetDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
    window.open(directionsUrl, '_blank');
  };

  // Function to open in Google Maps
  const handleOpenInMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
    window.open(mapsUrl, '_blank');
  };

  const fullAddress = `${address}, ${city}, ${state}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: '#8BC6E0' }}>Location & Map</h2>
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin size={20} className="mt-1 flex-shrink-0" style={{ color: '#8BC6E0' }} />
            <span className="text-sm sm:text-base lg:text-lg">{fullAddress}</span>
          </div>
        </div>

        <div className="flex gap-3">
          {/* <Button
            onClick={handleOpenInMaps}
            variant="outline"
            className="gap-2"
          >
            <MapPin className="w-4 h-4" />
            View in Maps
          </Button> */}
          <Button
            onClick={handleGetDirections}
            className="bg-primary hover:bg-primary/90 gap-2"
          >
            <Navigation className="w-4 h-4" />
            Get Directions
          </Button>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative rounded-2xl overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-300 aspect-video"
      >
        {isLoading && !loadError && (
          <div className="absolute inset-0 bg-card/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center space-y-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}

        {/* Fallback UI when Maps fails to load */}
        {loadError ? (
          <div className="w-full h-full min-h-[300px] bg-card/50 backdrop-blur-sm flex items-center justify-center rounded-2xl border border-border">
            <div className="text-center space-y-4 p-6 max-w-md">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Map Unavailable</h3>
                <p className="text-sm text-muted-foreground mb-1">{propertyName}</p>
                <p className="text-xs text-muted-foreground">{fullAddress}</p>
              </div>
              <Button
                onClick={handleGetDirections}
                className="bg-primary hover:bg-primary/90 gap-2"
              >
                <Navigation className="w-4 h-4" />
                Open in Google Maps
              </Button>
            </div>
          </div>
        ) : (
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            loadingElement={<div className="w-full h-full bg-card animate-pulse aspect-video" />}
            onError={onLoadError}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={coordinates}
              zoom={15}
              options={mapOptions}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              <Marker
                position={coordinates}
                title={propertyName}
              />
            </GoogleMap>
          </LoadScript>
        )}
      </motion.div>

      {/* Nearby Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            time: `${nearbyLocations?.timeToEntranceGate || '2'} min`,
            label: 'to DTU Entrance gate'
          },
          {
            time: `${nearbyLocations?.timeToMainMarket || '10'} min`,
            label: 'to main market'
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-card/50 backdrop-blur-sm rounded-xl p-5 text-center border border-border/50 hover:border-primary/50 transition-all duration-300"
          >
            <Clock className={`w-6 h-6 mx-auto mb-2 ${idx === 0 ? 'text-blue-400' : 'text-purple-400'}`} />
            <div className="text-2xl font-bold text-primary mb-1">{item.time}</div>
            <div className="text-sm text-muted-foreground">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
