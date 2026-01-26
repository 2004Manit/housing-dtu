import { motion } from "framer-motion";
import { Home, Linkedin, Twitter, Instagram, Mail, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { useState } from "react";
import { LegalModals } from "@/components/LegalModals";
import { XIcon } from "@/components/XIcon";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/housing-dtu/", label: "LinkedIn" },
  { icon: XIcon, href: "https://x.com/HousingDTU", label: "X (Twitter)" },
  { icon: Instagram, href: "https://www.instagram.com/housingdtu/", label: "Instagram" },
 
];

const quickLinks = [
  { name: "Browse Properties", path: "/properties" },
  { name: "List Your Property", path: "/list-property" },
  { name: "Find Roommates", path: "/find-flatmate" },
  { name: "Contact Us", path: "/contact" },
];

export const PropertyFooter = () => {
  const { user } = useAuth();

  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <footer className="relative border-t border-border/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="flex items-center gap-2 sm:gap-3">
  <div 
    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 p-1.5 sm:p-2"
    style={{
      background: 'linear-gradient(135deg, rgba(10, 93, 165, 0.95) 0%, rgba(8, 74, 132, 0.9) 100%)',
      boxShadow: '0 4px 16px rgba(10, 93, 165, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    }}
  >
    <Logo className="w-full h-full" />
  </div>
  <span className="text-lg sm:text-xl font-display font-bold">
    Housing <span className="gradient-text">DTU</span>
  </span>
</div>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xs">
              Built by students, for students. Simplifying the search for PGs, flats, and roommates near DTU campus.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <a href="mailto:housingdtu@gmail.com" className="hover:text-primary transition-colors break-all">
                  housingdtu@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+918826871082" className="hover:text-primary transition-colors">
                    +91 8826871082
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm ml-5 sm:ml-6">
                  <a href="tel:+917973930880" className="hover:text-primary transition-colors">
                    +91 7973930880
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-3 sm:space-y-4"
          >
            <h4 className="font-display font-semibold text-foreground text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.path} 
                    className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1"
          >
            <h4 className="font-display font-semibold text-foreground text-sm sm:text-base">Connect With Us</h4>
            <div className="flex gap-1.5 sm:gap-2">
              {socialLinks.map((social, index) => (
                <Button
  key={index}
  variant="ghost"
  size="icon"
  className="hover:bg-primary/10 hover:text-primary w-8 h-8 sm:w-9 sm:h-9"
  asChild
>
  <a 
    href={social.href} 
    aria-label={social.label}
    target={social.href !== "#" ? "_blank" : undefined}
    rel={social.href !== "#" ? "noopener noreferrer" : undefined}
  >
    <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
  </a>
</Button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 sm:mt-8 md:mt-10 pt-6 sm:pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
        >
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © 2026 Housing DTU. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
  <button 
    onClick={() => setPrivacyOpen(true)} 
    className="hover:text-primary transition-colors cursor-pointer"
  >
    Privacy Policy
  </button>
  <button 
    onClick={() => setTermsOpen(true)} 
    className="hover:text-primary transition-colors cursor-pointer"
  >
    Terms of Service
  </button>
</div>
        </motion.div>

        {/* Admin Access Link - Only visible to admins */}
        {user?.app_metadata?.is_admin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/20 text-center"
          >
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 text-muted-foreground/50 hover:text-primary transition-all duration-300 text-xs sm:text-sm group px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-primary/5"
            >
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:text-primary transition-colors" />
              <span>Admin Dashboard</span>
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          </motion.div>
        )}
      </div>

      <LegalModals type="privacy" open={privacyOpen} onOpenChange={setPrivacyOpen} />
      <LegalModals type="terms" open={termsOpen} onOpenChange={setTermsOpen} />
    </footer>
  );
};