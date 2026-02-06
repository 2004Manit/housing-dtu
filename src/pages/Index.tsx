import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import ServiceCard from "@/components/ServiceCard";
import FAQSection from "@/components/FAQSection";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import { PropertyFooter } from "@/components/PropertyFooter";
import { Home, TrendingUp, Shield, Sparkles, ArrowRight, Send, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import React from 'react';
import pinnacle2 from '@/assets/pinnacle 2.jpeg';
import dwar1 from '@/assets/dwar 1.jpeg';
import heroBuilding from "@/assets/hero-building.jpg";
import homePageBackground from "@/assets/home page background.avif";

import AnimatedDeviceSection from "@/components/AnimatedDeviceSection";
import VerifiedAnimationScene from "@/components/VerifiedAnimationScene";

// Add animation styles
const animationStyles = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes glassShimmer {
    0%, 100% {
      box-shadow: 0 8px 32px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1);
    }
    50% {
      box-shadow: 0 8px 40px rgba(236, 72, 153, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.15);
    }
  }

  @keyframes brightenForward {
    0% {
      filter: brightness(1);
    }
    33% {
      filter: brightness(1.3);
    }
    66% {
      filter: brightness(1.3);
    }
    100% {
      filter: brightness(1);
    }
  }

  @keyframes waveIn {
    0% {
      stroke-dashoffset: 2400;
      opacity: 0;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      stroke-dashoffset: 0;
      opacity: 0.4;
    }
  }

  @keyframes floatDevice {
    0%, 100% {
      transform: translateY(0px) rotateY(-15deg) rotateX(5deg);
    }
    50% {
      transform: translateY(0px) rotateY(-15deg) rotateX(5deg);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px) rotateY(-15deg) rotateX(5deg);
    }
    to {
      opacity: 1;
      transform: translateX(0) rotateY(-15deg) rotateX(5deg);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  
  .word-animate {
    display: inline-block;
    animation: slideInUp 0.6s ease-out forwards;
    margin-right: 0.3em;
  }
  
  .word-animate:nth-child(1) { animation-delay: 0.1s; }
  .word-animate:nth-child(2) { animation-delay: 0.2s; }
  .word-animate:nth-child(3) { animation-delay: 0.3s; }
  .word-animate:nth-child(4) { animation-delay: 0.4s; }
  .word-animate:nth-child(5) { animation-delay: 0.5s; }
  .word-animate:nth-child(6) { animation-delay: 0.6s; }
  .word-animate:nth-child(7) { animation-delay: 0.7s; }

  .device-frame {
    animation: slideInRight 1s ease-out forwards, floatDevice 6s ease-in-out infinite;
    animation-delay: 0s, 1s;
  }

  .device-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    animation: shimmer 3s infinite;
  }
`;

// HeroCTAMoon styles
const heroCTAStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&display=swap');

  .hero-cta-moon {
    position: relative;
    width: 100%;
    min-height: 70vh;
    background: #0a0e13;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 1rem;
    isolation: isolate;
  }

  .moon-background {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: 
      radial-gradient(ellipse 600px 400px at 50% 100%, 
        rgba(16, 185, 129, 0.15) 0%,
        rgba(5, 150, 105, 0.08) 40%,
        transparent 70%
      ),
      radial-gradient(circle 800px at 50% 110%, 
        rgba(16, 185, 129, 0.12) 0%,
        rgba(4, 120, 87, 0.06) 35%,
        transparent 60%
      );
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .moon-texture {
    position: absolute;
    inset: 0;
    z-index: 2;
    background-image: 
      radial-gradient(circle at 30% 80%, rgba(16, 185, 129, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 70% 85%, rgba(16, 185, 129, 0.04) 0%, transparent 45%),
      radial-gradient(circle at 50% 90%, rgba(16, 185, 129, 0.05) 0%, transparent 40%);
    opacity: 0.6;
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .atmosphere {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(to top, 
      rgba(16, 185, 129, 0.08) 0%,
      rgba(16, 185, 129, 0.04) 30%,
      transparent 100%
    );
    z-index: 3;
    filter: blur(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.5;
  }

  .moonlight-rays {
    position: absolute;
    bottom: -30%;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 100%;
    background: 
      linear-gradient(to top, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
      conic-gradient(from 180deg at 50% 100%, 
        transparent 0deg,
        rgba(16, 185, 129, 0.03) 30deg,
        transparent 60deg,
        rgba(16, 185, 129, 0.03) 90deg,
        transparent 120deg,
        rgba(16, 185, 129, 0.03) 150deg,
        transparent 180deg
      );
    z-index: 2;
    opacity: 0.3;
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .stars {
    position: absolute;
    inset: 0;
    z-index: 4;
  }

  .star {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: twinkle 3s ease-in-out infinite;
  }

  .star.tiny {
    width: 1px;
    height: 1px;
    opacity: 0.4;
  }

  .star.small {
    width: 2px;
    height: 2px;
    opacity: 0.6;
  }

  .star.medium {
    width: 3px;
    height: 3px;
    opacity: 0.8;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
  }

  .star.large {
    width: 4px;
    height: 4px;
    opacity: 0.9;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }

  .star:nth-child(1) { top: 8%; left: 12%; animation-delay: 0s; }
  .star:nth-child(2) { top: 15%; left: 78%; animation-delay: 0.4s; }
  .star:nth-child(3) { top: 22%; left: 25%; animation-delay: 0.9s; }
  .star:nth-child(4) { top: 12%; left: 55%; animation-delay: 1.3s; }
  .star:nth-child(5) { top: 35%; left: 68%; animation-delay: 1.8s; }
  .star:nth-child(6) { top: 28%; left: 35%; animation-delay: 0.6s; }
  .star:nth-child(7) { top: 18%; left: 88%; animation-delay: 1.1s; }
  .star:nth-child(8) { top: 40%; left: 8%; animation-delay: 1.6s; }
  .star:nth-child(9) { top: 10%; left: 45%; animation-delay: 0.2s; }
  .star:nth-child(10) { top: 32%; left: 52%; animation-delay: 2.1s; }
  .star:nth-child(11) { top: 25%; left: 18%; animation-delay: 1.4s; }
  .star:nth-child(12) { top: 38%; left: 82%; animation-delay: 0.5s; }
  .star:nth-child(13) { top: 6%; left: 40%; animation-delay: 1.9s; }
  .star:nth-child(14) { top: 30%; left: 62%; animation-delay: 0.3s; }
  .star:nth-child(15) { top: 20%; left: 92%; animation-delay: 2.3s; }
  .star:nth-child(16) { top: 42%; left: 15%; animation-delay: 0.8s; }
  .star:nth-child(17) { top: 14%; left: 70%; animation-delay: 1.5s; }
  .star:nth-child(18) { top: 36%; left: 40%; animation-delay: 0.7s; }
  .star:nth-child(19) { top: 26%; left: 95%; animation-delay: 2.0s; }
  .star:nth-child(20) { top: 44%; left: 28%; animation-delay: 1.2s; }

  .shooting-star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
    opacity: 0;
    z-index: 5;
  }

  .hero-cta-moon:has(.cta-button:hover) .shooting-star {
    animation: shoot 1.5s ease-out;
  }

  @keyframes shoot {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-150px, 100px);
    }
  }

  .shooting-star:nth-child(21) {
    top: 10%;
    right: 20%;
    animation-delay: 0.3s;
  }

  .shooting-star:nth-child(22) {
    top: 25%;
    right: 40%;
    animation-delay: 0.7s;
  }

  .content-wrapper {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 64rem;
    margin: 0 auto;
  }

  .main-heading {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    color: #ffffff;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  }

  .subtitle {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: #94a3b8;
    line-height: 1.6;
    margin-bottom: 3rem;
    font-weight: 400;
    text-shadow: 0 1px 10px rgba(0, 0, 0, 0.5);
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-wrapper {
    position: relative;
    display: inline-block;
  }

  .button-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent 70%);
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0;
    transition: opacity 0.6s ease;
    z-index: 2;
    pointer-events: none;
  }

  .cta-button {
    position: relative;
    z-index: 3;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem 2.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #ffffff;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 4px 20px rgba(16, 185, 129, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
      0 10px 40px rgba(16, 185, 129, 0.2);
  }

  .cta-button::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50px;
    padding: 2px;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.5), rgba(5, 150, 105, 0.5));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .cta-button:hover::before {
    opacity: 1;
  }

  .cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 8px 30px rgba(16, 185, 129, 0.6),
      0 0 0 1px rgba(255, 255, 255, 0.2) inset,
      0 15px 60px rgba(16, 185, 129, 0.4);
  }

  .cta-button:active {
    transform: translateY(-1px);
  }

  .arrow {
    display: inline-block;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 1.3rem;
  }

  .cta-button:hover .arrow {
    transform: translateX(5px);
  }

  .hero-cta-moon:has(.cta-button:hover) .moon-background {
    background: 
      radial-gradient(ellipse 700px 500px at 50% 100%, 
        rgba(16, 185, 129, 0.35) 0%,
        rgba(5, 150, 105, 0.20) 40%,
        rgba(4, 120, 87, 0.08) 70%,
        transparent 85%
      ),
      radial-gradient(circle 900px at 50% 110%, 
        rgba(16, 185, 129, 0.25) 0%,
        rgba(4, 120, 87, 0.12) 35%,
        transparent 65%
      );
    filter: brightness(1.3);
  }

  .hero-cta-moon:has(.cta-button:hover) .moon-texture {
    opacity: 1;
  }

  .hero-cta-moon:has(.cta-button:hover) .atmosphere {
    background: linear-gradient(to top, 
      rgba(16, 185, 129, 0.18) 0%,
      rgba(16, 185, 129, 0.10) 30%,
      rgba(16, 185, 129, 0.04) 60%,
      transparent 100%
    );
    filter: blur(40px);
    opacity: 0.9;
  }

  .hero-cta-moon:has(.cta-button:hover) .moonlight-rays {
    opacity: 0.7;
  }

  .hero-cta-moon:has(.cta-button:hover) .button-glow {
    opacity: 1;
  }

  .vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(10, 14, 19, 0.4) 100%);
    z-index: 8;
    pointer-events: none;
  }

  .grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.03;
    z-index: 9;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    .hero-cta-moon {
      min-height: 60vh;
      padding: 3rem 1.5rem;
    }

    .cta-button {
      padding: 1rem 2rem;
      font-size: 1rem;
    }

    .button-glow {
      width: 150px;
      height: 150px;
    }
  }
`;

// Counter Component with animation
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * (end - startValue) + startValue);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={counterRef}>
      {count}{suffix}
    </div>
  );
};

// HeroCTAMoon Component
const HeroCTAMoon = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const section = e.currentTarget;
    const rect = section.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const yPercent = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    const moonBg = section.querySelector('.moon-background') as HTMLElement;
    const stars = section.querySelectorAll('.star');

    if (moonBg) {
      moonBg.style.transform = `translate(${xPercent * 15}px, ${yPercent * 15}px)`;
    }

    stars.forEach((star, index) => {
      const speed = (index % 4 + 1) * 1.5;
      (star as HTMLElement).style.transform = `translate(${xPercent * speed}px, ${yPercent * speed}px)`;
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const section = e.currentTarget;
    const moonBg = section.querySelector('.moon-background') as HTMLElement;
    const stars = section.querySelectorAll('.star');

    if (moonBg) {
      moonBg.style.transform = 'translate(0, 0)';
    }

    stars.forEach(star => {
      (star as HTMLElement).style.transform = 'translate(0, 0)';
    });
  };

  return (
    <section
      className="hero-cta-moon"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="moon-background"></div>
      <div className="moon-texture"></div>
      <div className="moonlight-rays"></div>
      <div className="atmosphere"></div>

      <div className="stars">
        <div className="star tiny"></div>
        <div className="star small"></div>
        <div className="star medium"></div>
        <div className="star small"></div>
        <div className="star tiny"></div>
        <div className="star large"></div>
        <div className="star small"></div>
        <div className="star tiny"></div>
        <div className="star medium"></div>
        <div className="star large"></div>
        <div className="star small"></div>
        <div className="star tiny"></div>
        <div className="star medium"></div>
        <div className="star small"></div>
        <div className="star tiny"></div>
        <div className="star small"></div>
        <div className="star medium"></div>
        <div className="star tiny"></div>
        <div className="star small"></div>
        <div className="star tiny"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      <div className="content-wrapper">
        <h2 className="main-heading">
          Find Your Perfect Home Near DTU Campus !
        </h2>
        <p className="subtitle">
          Browse verified PGs, flats, and connect with flatmates in minutes.
        </p>

        <div className="cta-wrapper">
          <div className="button-glow"></div>

          <Link to="/properties" className="cta-button" style={{ textDecoration: 'none' }}>
            Start Your Search
            <span className="arrow">→</span>
          </Link>

        </div>
      </div>

      <div className="vignette"></div>
      <div className="grain"></div>
    </section>
  );
};

const Index = () => {
  const [showVerifiedAnimation, setShowVerifiedAnimation] = useState(false);
  const verifiedSectionRef = useRef<HTMLDivElement>(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isCTAVisible, setIsCTAVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Video refs for autoplay fix
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCTAVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    return () => {
      statsObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowVerifiedAnimation(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (verifiedSectionRef.current) {
      observer.observe(verifiedSectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Force play hero video on mount (mobile autoplay fix)
  useEffect(() => {
    const playHeroVideo = async () => {
      if (heroVideoRef.current) {
        try {
          // Ensure video is muted (required for autoplay on mobile)
          heroVideoRef.current.muted = true;
          await heroVideoRef.current.play();
        } catch (error) {
          console.log('Hero video autoplay prevented:', error);
          // Retry after a short delay
          setTimeout(() => {
            heroVideoRef.current?.play().catch(() => { });
          }, 500);
        }
      }
    };

    // Check if this is first visit (splash is showing)
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      // First visit - delay video autoplay until after splash completes (4.5s)
      const timer = setTimeout(() => {
        playHeroVideo();
      }, 4600); // Slight delay after splash fade (4.5s splash + 100ms buffer)

      return () => clearTimeout(timer);
    } else {
      // Returning visit - autoplay immediately
      playHeroVideo();
    }
  }, []);

  // Force play videos #2 and #3 when they enter viewport (mobile autoplay fix)
  useEffect(() => {
    const playVideo = async (videoElement: HTMLVideoElement) => {
      try {
        // Upgrade to full load for better performance
        videoElement.preload = 'auto';
        videoElement.muted = true;
        await videoElement.play();
      } catch (error) {
        console.log('Video autoplay prevented:', error);
        // Retry after a short delay
        setTimeout(() => {
          videoElement.play().catch(() => { });
        }, 500);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLVideoElement) {
            playVideo(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '200px'  // Start loading 200px before entering viewport
      }
    );

    if (video1Ref.current) {
      observer.observe(video1Ref.current);
    }
    if (video2Ref.current) {
      observer.observe(video2Ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 200, suffix: "+", label: "Happy Customers" },
    { value: 10, suffix: "k+", label: "Properties For Clients" },
    { value: 16, suffix: "+", label: "Years of Experience" },
  ];

  const services = [
    {
      icon: Home,
      title: "Find Your Dream Home",
      description: "Explore our curated selection of exceptional homes and investment properties across prime locations.",
    },
    {
      icon: TrendingUp,
      title: "Unlock Property Value",
      description: "Selling your property? We'll maximize your return with our expert valuation and marketing services.",
    },
    {
      icon: Shield,
      title: "Effortless Property Management",
      description: "Let us handle the stress of property ownership with comprehensive management solutions.",
    },
    {
      icon: Sparkles,
      title: "Smart Investments, Informed Decisions",
      description: "Make confident investment choices with our data-driven insights and market analysis.",
    },
  ];

  const featuredProperties = [
    {
      id: "1",
      image: pinnacle2,
      title: "Seaside Serenity Villa",
      description: "Discover your own piece of paradise with the Seaside Serenity Villa. This stunning beachfront property offers an open floor plan, breathtaking ocean views from every room, and direct access to a pristine private beach.",
      location: "Pinnacle PG, Opposite DTU Entrance Gate",
      status: 'contact-owner' as const,
      type: 'PG' as const,
      featuredAmenities: ['free-wifi', 'power-backup', 'cctv-security'],
      distanceToDTU: '2',
    },
    {
      id: "2",
      image: dwar1,
      title: "Metropolitan Haven",
      description: "Contemporary urban apartment in the heart of the city with skyline views and premium finishes throughout.",
      location: "157 W 57th St",
      status: 'available' as const,
      type: 'Flat' as const,
      featuredAmenities: ['wifi', 'power-backup'],
      distanceToDTU: '5',
      floorNumber: 3,
      flatSize: '2BHK',
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <style>{animationStyles}</style>
      <style>{heroCTAStyles}</style>
      <Navbar />

      {/* Hero Section - FIXED FOR MOBILE */}
      <section className="relative pt-20 sm:pt-24 md:pt-32 pb-0 overflow-hidden min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex items-center">
        <div className="absolute inset-0">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            onLoadedData={() => {
              // Force play when video data is loaded (mobile fix)
              heroVideoRef.current?.play().catch(() => { });
            }}
            className="w-full h-full object-cover brightness-[1.2]"
            style={{
              transform: 'scale(1.02)',
              transformOrigin: 'center center',
              WebkitFontSmoothing: 'antialiased',

            }}
          >
            <source src="https://res.cloudinary.com/dgof5pmgh/video/upload/f_auto,q_auto/v1770218824/best-video-new_djmplw.mp4" type="video/mp4" />
          </video>


        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/15 to-background/50"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5.75xl font-bold mb-7 sm:mb-6 leading-tight">
                <span className="word-animate">Student</span>
                <span className="word-animate">Housing,</span>
                <br />
                <span className="word-animate"><span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Simplified</span></span>
                <span className="word-animate">by</span>
                {/* <span className="word-animate"></span> */}
                <span className="word-animate">Housing DTU</span>
              </h1>
              {/* <p className="text-xs sm:text-sm text-muted-foreground mb-5 sm:mb-7 animate-fade-in-up stagger-1">
                Your journey to finding the perfect property begins here. Explore our curated listings to find the home that matches your dreams.
              </p> */}
              <div className="flex flex-wrap gap-3 sm:gap-4 animate-fade-in-up stagger-2">
                <Button
                  variant="hero"
                  size="sm"
                  asChild
                  className="rounded-md hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/50 border-0 text-sm sm:text-base"
                >
                  <Link to="/properties">Browse Properties</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-md hover:scale-105 transition-all duration-300 bg-white/10 hover:bg-white/20 border-white/30 hover:border-white/50 backdrop-blur-sm text-white shadow-lg text-sm sm:text-base"
                >
                  <a href="/About">
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video + Content Section - FIXED FOR MOBILE */}
      <section className="relative py-16 sm:py-24 md:py-40 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center max-w-6xl mx-auto">
            <div className="flex justify-center items-center order-2 lg:order-1">
              <div
                className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[550px]"
                style={{
                  perspective: '1500px',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden animate-fade-in-up"
                  style={{
                    transformStyle: 'preserve-3d',
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.3)',
                    border: '1px solid rgba(34, 211, 238, 0.4)',
                    boxShadow: `
                      0 0 20px rgba(34, 211, 238, 0.3),
                      0 0 40px rgba(34, 211, 238, 0.2),
                      0 0 60px rgba(6, 182, 212, 0.15),
                      inset 0 0 15px rgba(34, 211, 238, 0.05),
                      0 15px 40px -10px rgba(0, 0, 0, 0.8)
                    `
                  }}
                >
                  <div className="relative bg-black" style={{ aspectRatio: '16/10' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5 z-10 pointer-events-none"></div>

                    <video
                      ref={video1Ref}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      disablePictureInPicture
                      onLoadedData={() => {
                        // Force play when video data is loaded (mobile fix)
                        video1Ref.current?.play().catch(() => { });
                      }}
                      controlsList="nodownload nofullscreen noremoteplayback"
                      className="w-full h-full object-cover pointer-events-none"
                      style={{ pointerEvents: 'none' }}
                    >
                      <source src="https://res.cloudinary.com/dgof5pmgh/video/upload/f_auto,q_auto/v1770192266/uploaded-video1_mninnu.mp4" type="video/mp4" />
                    </video>

                    <div className="device-shine"></div>
                  </div>

                  <div
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, transparent 50%, rgba(6, 182, 212, 0.08) 100%)'
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in-up order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Your Perfect Property, Simplified
              </h2>

              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg text-blue-300/90 leading-relaxed">
                    Instant access to trusted listings near DTU
                  </p>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg text-blue-300/90 leading-relaxed">
                    Direct owner contact - no middlemen, no commission
                  </p>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg text-blue-300/90 leading-relaxed">
                    Search, compare, and move in hassle-free
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Verified Properties Section - FIXED FOR MOBILE */}
      <section ref={verifiedSectionRef} className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-purple-900/5"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center max-w-7xl mx-auto">

            {/* Animation on top for mobile, right for desktop */}
            <div className="flex justify-center items-center order-1 lg:order-2 w-full">
              <div className="flex items-center justify-center w-full">
                <div className="max-w-[200px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[500px]">
                  <div className="aspect-square">
                    {showVerifiedAnimation && <VerifiedAnimationScene />}
                  </div>
                </div>
              </div>
            </div>

            {/* Text content below animation on mobile, left on desktop */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:pr-12 order-2 lg:order-1">
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight">
                  Every Property.
                  <br />
                  <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-transparent bg-clip-text">
                    100% Verified.
                  </span>
                </h2>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                  <div className="h-1 w-10 sm:w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                </div>
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light max-w-xl">
                Trust is everything. That's why every listing on our platform goes through rigorous verification to ensure authenticity and quality.
              </p>

              <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-1">Owner Verified</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Direct contact with verified property owners</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-1">Photos Verified</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Authentic images of actual properties</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-1">Details Verified</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Accurate pricing and amenity information</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Animated Device Section */}
      <AnimatedDeviceSection />

      {/* Featured Properties Section - List Your Property - FIXED FOR MOBILE */}
      <section className="relative py-16 sm:py-24 md:py-40 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center max-w-6xl mx-auto">

            <div className="flex justify-center items-center">
              <div
                className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[550px]"
                style={{
                  perspective: '1500px',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden animate-fade-in-up"
                  style={{
                    transformStyle: 'preserve-3d',
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.3)',
                    border: '1px solid rgba(34, 211, 238, 0.4)',
                    boxShadow: `
                      0 0 20px rgba(34, 211, 238, 0.3),
                      0 0 40px rgba(34, 211, 238, 0.2),
                      0 0 60px rgba(6, 182, 212, 0.15),
                      inset 0 0 15px rgba(34, 211, 238, 0.05),
                      0 15px 40px -10px rgba(0, 0, 0, 0.8)
                    `
                  }}
                >
                  <div className="relative bg-black" style={{ aspectRatio: '16/10' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5 z-10 pointer-events-none"></div>

                    <video
                      ref={video2Ref}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      disablePictureInPicture
                      onLoadedData={() => {
                        // Force play when video data is loaded (mobile fix)
                        video2Ref.current?.play().catch(() => { });
                      }}
                      controlsList="nodownload nofullscreen noremoteplayback"
                      className="w-full h-full object-cover pointer-events-none"
                      style={{ pointerEvents: 'none' }}
                    >
                      <source src="https://res.cloudinary.com/dgof5pmgh/video/upload/f_auto,q_auto/v1770192261/uploaded-video2_ebkbac.mp4" type="video/mp4" />
                    </video>

                    <div className="device-shine"></div>
                  </div>

                  <div
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, transparent 50%, rgba(6, 182, 212, 0.08) 100%)'
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8 md:space-y-10 animate-fade-in-up">
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  List Your Property in Seconds
                </h2>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 hover:bg-white/10 transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                      Zero commission - keep 100% of your earnings
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 hover:bg-white/10 transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                      Reach thousands of verified students and professionals
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 hover:bg-white/10 transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                      Full control over who you connect with
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dual Action Cards Section */}
      <section ref={ctaRef} className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20"></div>

        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-2xl" style={{ willChange: 'opacity', transform: 'translateZ(0)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/15 rounded-full blur-2xl" style={{ willChange: 'opacity', transform: 'translateZ(0)' }}></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto items-stretch">

            <div
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-5 sm:p-6 md:p-7 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 animate-fade-in-up"
              style={{ animation: 'fadeInScale 0.6s ease-out forwards', willChange: 'transform', transform: 'translateZ(0)', contain: 'layout style paint' }}
            >
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>

              <div className="relative z-10">
                <div className="mb-4 sm:mb-5">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 mb-3">
                    <Home className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                    Find Your Perfect Space
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    Looking for a PG, flat, or apartment near DTU? Browse through our curated collection of properties tailored for students and professionals.
                  </p>
                </div>

                <ul className="space-y-2 mb-5 sm:mb-6">
                  <li className="flex items-start text-white/70 text-xs sm:text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>PGs with all amenities near DTU</span>
                  </li>
                  <li className="flex items-start text-white/70 text-xs sm:text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>Affordable flats</span>
                  </li>
                  <li className="flex items-start text-white/70 text-xs sm:text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>Properties within walking distance</span>
                  </li>
                </ul>

                <Button
                  variant="hero"
                  size="lg"
                  asChild
                  className="w-full group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/20 text-sm sm:text-base"
                >
                  <Link to="/properties">
                    Browse Properties <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </Button>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-5 sm:p-6 md:p-7 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 animate-fade-in-up"
              style={{ animation: 'fadeInScale 0.6s ease-out forwards 0.2s', willChange: 'transform', transform: 'translateZ(0)', contain: 'layout style paint' }}
            >
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>

              <div className="relative z-10">
                <div className="mb-4 sm:mb-5">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 mb-3">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                    List Your PG or Flat
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    Have a property to rent out? Don't worry, we've got you covered! Reach out to thousands of potential tenants with ease.
                  </p>
                </div>

                <ul className="space-y-2 mb-5 sm:mb-6">
                  <li className="flex items-start text-white/70 text-xs sm:text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>Quick and easy listing process</span>
                  </li>
                  <li className="flex items-start text-white/70 text-xs sm:text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>Reach verified students & professionals</span>
                  </li>
                  <li className="flex items-start text-white/70 text-xs sm:text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>Zero commission</span>
                  </li>
                </ul>

                <Button
                  variant="hero"
                  size="lg"
                  asChild
                  className="w-full group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/20 text-sm sm:text-base"
                >
                  <Link to="/list-property">
                    List Your Property <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </Button>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <TestimonialsMarquee />

      {/* FAQ Section */}
      <FAQSection />

      {/* Hero CTA Moon Section */}
      <HeroCTAMoon />

      {/* Footer */}
      <PropertyFooter />
    </div>
  );
};

export default Index;
