import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title: string;
}

export const Testimonials = ({ testimonials, title }: TestimonialsProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star
        key={idx}
        size={20}
        className={idx < rating ? "fill-accent text-accent" : "text-muted"}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-semibold text-white">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden group hover:border-primary transition-all duration-300 hover:-translate-y-2 card-glow"
          >
            {/* Quote Icon */}
            <div className="absolute -top-4 -right-4 text-primary/10 group-hover:text-primary/20 transition-colors">
              <Quote size={120} />
            </div>

            <div className="relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-4">{renderStars(testimonial.rating)}</div>

              {/* Comment */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
