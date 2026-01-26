import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Track if page is scrolled for blur effect
      setIsScrolled(currentScrollY > 50);

      // Only hide/show navbar after scrolling past 50px to avoid flickering at the top
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
    window.location.reload();
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-gradient-to-br from-white/10 via-white/20 to-white/5 backdrop-blur-xl border-b border-white/10' 
            : ''
        }`}
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group" onClick={handleLinkClick}>
  <div 
    className="w-10 h-10 rounded-lg flex items-center justify-center p-1.5 backdrop-blur-sm border border-white/20"
    style={{
      background: 'linear-gradient(135deg, rgba(10, 93, 165, 0.95) 0%, rgba(8, 74, 132, 0.9) 100%)',
      boxShadow: '0 4px 16px rgba(10, 93, 165, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    }}
  >
    <Logo className="w-full h-full" />
  </div>
  <span className="text-xl font-bold text-white">
    Housing DTU
  </span>
</Link>

            {/* Desktop Navigation */}
           <div className="hidden [@media(min-width:1046px)]:flex items-center gap-12">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/properties" className="text-sm font-medium hover:text-primary transition-colors">
                Properties
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/services" className="text-sm font-medium hover:text-primary transition-colors">
                Services
              </Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden [@media(min-width:1046px)]:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                  <button
                    onClick={async () => {
                      await signOut();
                      window.location.reload();
                    }}
                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-br from-red-900 via-red-950 to-black text-white font-medium text-sm shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-800/60 overflow-hidden"
                    style={{
                      boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 4px 20px rgba(239, 68, 68, 0.4)'
                    }}
                  >
                    <span className="relative z-10">Sign Out</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/10 transition-all duration-300 pointer-events-none" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/auth"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-br from-blue-900 via-blue-950 to-black text-white font-medium text-sm shadow-lg shadow-blue-900/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-800/60 overflow-hidden"
                  style={{
                    boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 4px 20px rgba(37, 99, 235, 0.4)'
                  }}
                >
                  <span className="relative z-10">Sign In</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-300 pointer-events-none" />
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  className="[@media(min-width:1046px)]:hidden relative z-50 p-2 rounded-lg hover:bg-white/10 transition-colors"
  aria-label="Toggle menu"
>
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
           <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
  onClick={() => setIsMobileMenuOpen(false)}
  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 [@media(min-width:1046px)]:hidden"
/>

            {/* Slide-in Menu */}
            <motion.div
  initial={{ x: '100%' }}
  animate={{ x: 0 }}
  exit={{ x: '100%' }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
  className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-50 [@media(min-width:1046px)]:hidden shadow-2xl border-l border-white/10"
>
              <div className="flex flex-col h-full">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-2">
  <div 
    className="w-8 h-8 rounded-lg flex items-center justify-center p-1 backdrop-blur-sm border border-white/20"
    style={{
      background: 'linear-gradient(135deg, rgba(10, 93, 165, 0.95) 0%, rgba(8, 74, 132, 0.9) 100%)',
      boxShadow: '0 4px 16px rgba(10, 93, 165, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    }}
  >
    <Logo className="w-full h-full" />
  </div>
  <span className="text-lg font-bold text-white">Menu</span>
</div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* User Info Section (if logged in) */}
                {user && (
                  <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                    <p className="text-xs text-gray-400 mb-1">Signed in as</p>
                    <p className="text-sm text-white font-medium truncate">{user.email}</p>
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-6">
                  <div className="px-4 space-y-2">
                    <Link
                      to="/"
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <span className="text-sm font-medium">Home</span>
                    </Link>
                    <Link
                      to="/properties"
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <span className="text-sm font-medium">Properties</span>
                    </Link>
                    <Link
                      to="/about"
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <span className="text-sm font-medium">About Us</span>
                    </Link>
                    <Link
                      to="/services"
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <span className="text-sm font-medium">Services</span>
                    </Link>
                    <Link
                      to="/contact"
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <span className="text-sm font-medium">Contact</span>
                    </Link>
                  </div>
                </nav>

                {/* Auth Button at Bottom */}
                <div className="p-6 border-t border-white/10">
                  {user ? (
                    <button
                      onClick={handleSignOut}
                      className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-red-900 via-red-950 to-black text-white font-medium text-sm shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-800/60 overflow-hidden"
                      style={{
                        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 4px 20px rgba(239, 68, 68, 0.4)'
                      }}
                    >
                      <span className="relative z-10">Sign Out</span>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/10 transition-all duration-300 pointer-events-none" />
                    </button>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={handleLinkClick}
                      className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-blue-900 via-blue-950 to-black text-white font-medium text-sm shadow-lg shadow-blue-900/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-800/60 overflow-hidden"
                      style={{
                        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 4px 20px rgba(37, 99, 235, 0.4)'
                      }}
                    >
                      <span className="relative z-10">Sign In</span>
                      <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-300 pointer-events-none" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;