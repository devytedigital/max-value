"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import AboutStatsSection from "@/components/AboutStatsSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import EventsSection from "@/components/EventsSection";

// Dynamically import client-only SplashModal with SSR disabled to prevent hydration mismatches
const SplashModal = dynamic(() => import("@/components/SplashModal"), { ssr: false });

export default function Home() {
  // Hero Banner Slider Settings
  const [activeSlide, setActiveSlide] = useState(0);
  const heroImages = [
    "https://maxvaluecredits.com/wp-content/uploads/2025/07/Landing-Page-1.jpg",
    "https://maxvaluecredits.com/wp-content/uploads/2025/07/Landing-Page-2.jpg",
    "https://maxvaluecredits.com/wp-content/uploads/2025/07/Landing-Page-3.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white">
      {/* Splash Modal overlay for new users */}
      <SplashModal />

      {/* Ambient background grids & glows (mainly white, slightly use yellow/blue) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,127,195,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,127,195,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FCA038]/5 blur-[150px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#147FC3]/5 blur-[150px]" />
      </div>

      <Navbar />

      {/* Hero Section */}
      {/* Auto-Playing Hero Image Banner Slider */}
      <div className="relative w-full overflow-hidden h-screen bg-white z-20 group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeSlide}
            src={heroImages[activeSlide]}
            alt={`MaxValue Banner ${activeSlide + 1}`}
            className="w-full h-full object-cover select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>

      {/* Services Section */}
      <ServicesSection />

      {/* About & Stats Section */}
      <AboutStatsSection />

      {/* Advantages Section */}
      <AdvantagesSection />

      {/* Events Section */}
      <EventsSection />

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
