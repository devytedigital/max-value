"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import AboutStatsSection from "@/components/AboutStatsSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import EventsSection from "@/components/EventsSection";
import AdVideoSection from "@/components/AdVideoSection";

// Dynamically import client-only SplashModal with SSR disabled to prevent hydration mismatches
const SplashModal = dynamic(() => import("@/components/SplashModal"), { ssr: false });

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white">
      {/* Splash Modal overlay for new users */}
      <SplashModal />

      {/* Ambient background grids & glows (mainly white, slightly use yellow/blue) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,127,195,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,127,195,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FCA038]/5 blur-[150px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#147FC3]/5 blur-[150px]" />
      </div>

      <Navbar />

      {/* Hero Section with Video Background and Animated Text Slides */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* About & Stats Section */}
      <AboutStatsSection />

      {/* Advantages Section */}
      <AdvantagesSection />

      {/* Events Section */}
      <EventsSection />

      {/* Commercial Video & QR Code Section */}
      <AdVideoSection />

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
