import Navbar from '@/components/Navbar';
import { PropertyFooter } from '@/components/PropertyFooter';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertCircle } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      console.log('📤 Submitting contact form...', formData);

      // Insert into Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }
        ])
        .select();

      if (error) {
        console.error('❌ Error submitting form:', error);
        throw error;
      }

      console.log('✅ Form submitted successfully:', data);

      // Show success message
      setShowSuccess(true);

      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

    } catch (err: any) {
      console.error('❌ Submission error:', err);
      setErrorMessage(err.message || 'Failed to submit. Please try again.');
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRetry = () => {
    setShowError(false);
    setErrorMessage('');
  };

  return (
    <>
    <Navbar/>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .contact-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1f35 0%, #2d1b3d 50%, #1f2937 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 1rem 2rem 1rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Animated gradient background */
        .contact-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(107, 114, 128, 0.1) 0%, transparent 50%);
          animation: gradientShift 15s ease infinite;
          will-change: transform;  
          pointer-events: none;
        }

        @keyframes gradientShift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(20px, -20px, 0) scale(1.1); }
        }

        /* Floating orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
          will-change: transform;  
          pointer-events: none;
        }

        .orb-1 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          top: 10%;
          left: 5%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 450px;
          height: 450px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          bottom: 10%;
          right: 5%;
          animation-delay: 7s;
        }

        .orb-3 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #6b7280, #4b5563);
          top: 50%;
          right: 20%;
          animation-delay: 14s;
        }

        @keyframes float {
          0%, 100% { transform: translate3d (0, 0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        /* Glass card container */
        .glass-container {
          position: relative;
          z-index: 10;
          max-width: 1000px;
          width: 100%;
          background: rgba(17, 24, 39, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          overflow: hidden;
          transform: translateZ(0); 
          will-change: contents;
        }

        .content-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          padding: 3rem;
          align-items: center;
        }

        /* Left side - Form */
        .form-section {
          animation: slideInLeft 0.8s ease-out;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .form-header {
          margin-bottom: 2rem;
        }

        .form-title {
          font-family: 'Manrope', sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .form-title .gradient-text {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .form-subtitle {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }

        /* Form styles */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 1rem 1.25rem;
          background: rgba(31, 41, 55, 0.6);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.3s ease;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          background: rgba(31, 41, 55, 0.8);
          border-color: rgba(96, 165, 250, 0.5);
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .submit-button {
          margin-top: 1rem;
          padding: 1.25rem 2.5rem;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border: none;
          border-radius: 50px;
          color: white;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 
            0 10px 30px rgba(59, 130, 246, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          position: relative;
          overflow: hidden;
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .submit-button:hover::before {
          left: 100%;
        }

        .submit-button:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 
            0 15px 40px rgba(59, 130, 246, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.2) inset;
        }

        .submit-button:active {
          transform: translateY(0);
        }

        /* Right side - 3D Illustration */
        .illustration-section {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: slideInRight 0.8s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* 3D Desktop/Computer illustration */
        .mail-illustration {
          position: relative;
          width: 100%;
          max-width: 450px;
          aspect-ratio: 1;
          perspective: 1200px;
          animation: floatIllustration 6s ease-in-out infinite;
          will-change: transform;
          transform: translateZ(0);
        }

        @keyframes floatIllustration {
          0%, 100% { transform: translate3d(0, 0, 0) rotateY(0deg); }
          50% { transform: translate3d(0, -15px, 0) rotateY(-3deg); }
        }

        /* Main desktop container */
        .envelope-3d {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
          will-change: transform;
        }

        .mail-illustration:hover .envelope-3d {
          transform: rotateY(-5deg) rotateX(2deg);
        }

        /* Monitor stand */
        .monitor-stand {
          position: absolute;
          bottom: 8%;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 40px;
          background: linear-gradient(180deg, #4a5568, #2d3748);
          border-radius: 0 0 20px 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .monitor-stand::before {
          content: '';
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 15px;
          background: linear-gradient(180deg, #4a5568, #2d3748);
          border-radius: 4px;
        }

        .monitor-base {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 15px;
          background: linear-gradient(180deg, #2d3748, #1a202c);
          border-radius: 8px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
        }

        /* Monitor screen container */
        .envelope-back {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translate(-50%, 0);
          width: 340px;
          height: 240px;
          background: linear-gradient(135deg, #2d3748, #1a202c);
          border-radius: 16px;
          padding: 12px;
          box-shadow: 
            0 25px 70px rgba(0, 0, 0, 0.4),
            0 0 0 2px rgba(255, 255, 255, 0.05) inset;
          transform-style: preserve-3d;
        }

        /* Screen */
        .screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          border-radius: 8px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 0 40px rgba(79, 70, 229, 0.3) inset,
            0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .screen::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.08));
        }

        /* Floating mail icon on screen */
        .envelope-flap {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 90px;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          animation: floatMail 3s ease-in-out infinite;
        }

        @keyframes floatMail {
          0%, 100% { transform: translate(-50%, -50%) translateZ(0); }
          50% { transform: translate(-50%, -50%) translateZ(0) translateY(-10px); }
        }

        /* Mail envelope flap triangle */
        .envelope-flap::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 0;
          border-left: 60px solid transparent;
          border-right: 60px solid transparent;
          border-top: 45px solid #e0f2fe;
          border-radius: 4px 4px 0 0;
        }

        .envelope-flap::after {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          border-radius: 2px;
        }

        /* Sidebar on screen */
        .letter {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 80%;
          background: rgba(31, 41, 55, 0.4);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Sidebar dots/icons */
        .letter-line {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .letter-line:nth-child(1) {
          background: linear-gradient(90deg, #fbbf24, #f59e0b);
          height: 10px;
        }

        .letter-line:nth-child(2) {
          height: 10px;
          border-radius: 50%;
          width: 10px;
          background: rgba(255, 255, 255, 0.3);
        }

        .letter-line:nth-child(3) {
          height: 10px;
          border-radius: 50%;
          width: 10px;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
        }

        /* Floating decorative elements */
        .deco-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          animation: floatDeco 4s ease-in-out infinite;
        }

        .deco-circle-1 {
          width: 60px;
          height: 60px;
          top: 10%;
          left: -10%;
          animation-delay: 0s;
        }

        .deco-circle-2 {
          width: 40px;
          height: 40px;
          bottom: 15%;
          right: -5%;
          animation-delay: 1.5s;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
        }

        .deco-circle-3 {
          width: 30px;
          height: 30px;
          top: 60%;
          left: 5%;
          animation-delay: 3s;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
        }

        @keyframes floatDeco {
          0%, 100% { transform: translateY(0) translateZ(0); }
          50% { transform: translateY(-15px) translateZ(0); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .content-wrapper {
            gap: 3rem;
            padding: 3rem;
          }

          .mail-illustration {
            max-width: 380px;
          }
        }

        @media (max-width: 968px) {
          .contact-page {
            padding: 10rem 1rem 2rem 1rem;
          }

          .content-wrapper {
            grid-template-columns: 1fr;
            padding: 2.5rem 2rem;
            gap: 3rem;
          }

          .illustration-section {
            order: -1;
            padding: 1rem 0;
          }

          .mail-illustration {
            max-width: 350px;
          }

          .envelope-back {
            width: 280px;
            height: 200px;
            padding: 10px;
          }

          .envelope-flap {
            width: 100px;
            height: 75px;
          }

          .envelope-flap::before {
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-top: 38px solid #e0f2fe;
          }

          .letter {
            width: 50px;
            padding: 10px 6px;
          }

          .monitor-stand {
            width: 85px;
            height: 35px;
          }

          .monitor-base {
            width: 140px;
            height: 13px;
          }

          .form-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .contact-page {
            padding: 9rem 1rem 2rem 1rem;
          }

          .glass-container {
            border-radius: 28px;
          }

          .content-wrapper {
            padding: 2rem 1.5rem;
          }

          .form-header {
            margin-bottom: 1.5rem;
          }

          .form-title {
            font-size: 2rem;
          }

          .form-subtitle {
            font-size: 1rem;
          }

          .contact-form {
            gap: 1.25rem;
          }

          .form-input,
          .form-textarea {
            padding: 0.875rem 1rem;
            font-size: 0.9375rem;
          }

          .submit-button {
            padding: 1.125rem 2rem;
            font-size: 0.9375rem;
          }
        }

        @media (max-width: 640px) {
          .contact-page {
            padding: 8rem 0.75rem 1.5rem 0.75rem;
          }

          .glass-container {
            backdrop-filter: blur(10px); 
            -webkit-backdrop-filter: blur(10px);
          }

          .content-wrapper {
            padding: 2rem 1.25rem;
            gap: 2rem;
          }

          .form-title {
            font-size: 1.75rem;
            margin-bottom: 0.75rem;
          }

          .form-subtitle {
            font-size: 0.9375rem;
          }

          .mail-illustration {
            max-width: 280px;
          }

          .envelope-back {
            width: 240px;
            height: 170px;
            padding: 8px;
          }

          .envelope-flap {
            width: 85px;
            height: 64px;
          }

          .envelope-flap::before {
            border-left: 42.5px solid transparent;
            border-right: 42.5px solid transparent;
            border-top: 32px solid #e0f2fe;
          }

          .envelope-flap::after {
            width: 24px;
            height: 2.5px;
          }

          .letter {
            width: 42px;
            padding: 8px 5px;
            gap: 10px;
          }

          .monitor-stand {
            width: 70px;
            height: 28px;
          }

          .monitor-stand::before {
            width: 24px;
            height: 12px;
          }

          .monitor-base {
            width: 110px;
            height: 12px;
          }

          .deco-circle-1 {
            width: 45px;
            height: 45px;
          }

          .deco-circle-2 {
            width: 32px;
            height: 32px;
          }

          .deco-circle-3 {
            width: 24px;
            height: 24px;
          }

          .orb-1,
          .orb-2,
          .orb-3 {
            filter: blur(40px);
            opacity: 0.3;
          }

          .orb-1 {
            width: 250px;
            height: 250px;
          }

          .orb-2 {
            width: 300px;
            height: 300px;
          }

          .orb-3 {
            width: 200px;
            height: 200px;
          }
        }

        @media (max-width: 480px) {
          .contact-page {
            padding: 7rem 0.5rem 1.5rem 0.5rem;
          }

          .glass-container {
            border-radius: 20px;
          }

          .content-wrapper {
            padding: 1.5rem 1rem;
            gap: 1.5rem;
          }

          .form-title {
            font-size: 1.5rem;
          }

          .form-subtitle {
            font-size: 0.875rem;
          }

          .form-group {
            gap: 0.375rem;
          }

          .form-label {
            font-size: 0.8125rem;
          }

          .form-input,
          .form-textarea {
            padding: 0.75rem 0.875rem;
            font-size: 0.875rem;
            border-radius: 10px;
          }

          .form-textarea {
            min-height: 100px;
          }

          .submit-button {
            padding: 1rem 1.75rem;
            font-size: 0.875rem;
            margin-top: 0.5rem;
          }

          .mail-illustration {
            max-width: 240px;
          }

          .envelope-back {
            width: 200px;
            height: 145px;
          }

          .envelope-flap {
            width: 70px;
            height: 53px;
          }

          .envelope-flap::before {
            border-left: 35px solid transparent;
            border-right: 35px solid transparent;
            border-top: 26.5px solid #e0f2fe;
          }
        }

        @media (max-width: 360px) {
          .glass-container {
            border-radius: 16px;
          }

          .content-wrapper {
            padding: 1.25rem 0.875rem;
          }

          .form-title {
            font-size: 1.375rem;
          }

          .mail-illustration {
            max-width: 200px;
          }
        }
      `}</style>

      <div className="contact-page">
        {/* Floating orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        {/* Main glass container */}
        <div className="glass-container">
          <div className="content-wrapper">
            
            {/* Left side - Contact Form */}
            <div className="form-section">
              <div className="form-header">
                <h1 className="form-title">
                  Get In <span className="gradient-text">Touch</span>
                </h1>
                <p className="form-subtitle">
                  Have a question or want to work together? Drop us a message and we'll get back to you shortly.
                </p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="123@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-input"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Right side - 3D Desktop/Monitor Illustration */}
            <div className="illustration-section">
              <div className="mail-illustration">
                <div className="envelope-3d">
                  {/* Decorative floating circles */}
                  <div className="deco-circle deco-circle-1"></div>
                  <div className="deco-circle deco-circle-2"></div>
                  <div className="deco-circle deco-circle-3"></div>

                  {/* Monitor/Desktop screen */}
                  <div className="envelope-back">
                    <div className="screen">
                      {/* Sidebar on screen */}
                      <div className="letter">
                        <div className="letter-line"></div>
                        <div className="letter-line"></div>
                        <div className="letter-line"></div>
                      </div>

                      {/* Floating mail icon */}
                      <div className="envelope-flap"></div>
                    </div>
                  </div>

                  {/* Monitor stand */}
                  <div className="monitor-stand"></div>
                  <div className="monitor-base"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Success Message - Fixed at bottom */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed bottom-4 sm:bottom-8 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-50 sm:max-w-md sm:w-full"
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-sm border border-green-400/30">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">
                      We have received your query, we will get back to you shortly!
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="flex-shrink-0 text-white hover:text-green-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message - Fixed at bottom */}
        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed bottom-4 sm:bottom-8 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-50 sm:max-w-md sm:w-full"
            >
              <div className="bg-gradient-to-r from-red-500 to-rose-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-sm border border-red-400/30">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm mb-2">
                      {errorMessage}
                    </p>
                    <button
                      onClick={handleRetry}
                      className="text-white text-xs font-medium bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                  <button
                    onClick={() => setShowError(false)}
                    className="flex-shrink-0 text-white hover:text-red-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <PropertyFooter/>
    </>
    
  );
};

export default ContactUsPage;