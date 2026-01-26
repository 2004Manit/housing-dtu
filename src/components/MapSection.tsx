import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapSectionProps {
  location: string;
  latitude?: number;
  longitude?: number;
}

export const MapSection = ({ location, latitude = 34.0259, longitude = -118.7798 }: MapSectionProps) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location)}&zoom=15`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold text-gradient">Location</h2>
        <Button
          onClick={() => window.open(directionsUrl, "_blank")}
          className="bg-primary hover:bg-primary/90"
        >
          <ExternalLink size={20} className="mr-2" />
          Get Directions
        </Button>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin size={20} className="text-primary" />
        <span className="text-lg">{location}</span>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative rounded-2xl overflow-hidden aspect-video border-2 border-border hover:border-primary transition-colors duration-300"
      >
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "15 min", description: "to Downtown" },
          { label: "5 min", description: "to Beach" },
          { label: "10 min", description: "to Airport" },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-secondary/50 rounded-lg p-4 text-center border border-border/50"
          >
            <div className="text-2xl font-bold text-primary">{item.label}</div>
            <div className="text-sm text-muted-foreground">{item.description}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
