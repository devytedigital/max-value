"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Count up Counter component for stats
const Counter = ({ value, suffix = "", duration = 1.8 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 16); // limit to ~60fps

    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-black text-zinc-950 tracking-tight">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default function AboutStatsSection() {
  return (
    <section className="relative w-full z-20 flex flex-col justify-between min-h-[calc(100vh-76px)] lg:min-h-[calc(100vh-128px)] bg-white overflow-hidden">

      {/* 1. TOP BLOCK: Corporate Info with split layout (Text Left, Image Right) */}
      <div
        className="relative w-full flex-grow flex items-center py-16 md:py-20 px-6 md:px-8"
        style={{
          // Subtle logo watermark
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 5 L45 25 L25 45 L5 25 Z' fill='none' stroke='%23147fc3' stroke-width='1.5' stroke-opacity='0.015'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Left Column: Heading and Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center text-left"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#147FC3] tracking-tight mb-6">
              Maxvalue Credits & <br className="hidden md:block" />
              Investments Ltd
            </h2>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed text-justify max-w-xl">
              MAXVALUE Credits & Investments Ltd. is an innovative venture providing high quality financial services to the common man. The team behind this venture draws from various walks of life having longstanding experience and expertise in different areas of financial services. Our products are designed to keep a long and enriching relationship with our valued customers. Our vision is to become one of the best providers of superior financial services to common man and to build their trust and confidence in the most professional manner.
            </p>
          </motion.div>

          {/* Right Column: Premium Framed Image (using public/happy-client.png) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-lg mx-auto lg:max-w-none flex items-center justify-center"
          >
            {/* Background design accents for the image */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#FCA038]/5 blur-lg pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#147FC3]/5 blur-xl pointer-events-none" />

            <div className="relative overflow-hidden bg-white rounded-none">
              <img
                src="/happy-client.png"
                alt="Our Happy Clients at MaxValue"
                className="w-full h-auto max-h-[320px] object-cover rounded-none"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* 2. BOTTOM STATS BAR: Branches & Customers matching your clean minimal top-bordered style */}
      <div className="w-full py-12 px-6 bg-zinc-50/20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

          {/* Stat 1: Branches (Clean design without dividing line) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col text-left pt-5"
          >
            <div className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight leading-none">
              <Counter value={150} suffix=" +" />
            </div>
            <span className="text-sm font-black text-[#147FC3] uppercase tracking-widest mt-3 mb-2 block">
              BRANCHES
            </span>
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-sm font-medium">
              Branches nationwide delivering professional credit accessibility to local communities.
            </p>
          </motion.div>

          {/* Stat 2: Customers (Clean design without dividing line) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col text-left pt-5"
          >
            <div className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight leading-none">
              <Counter value={1000000} suffix=" +" />
            </div>
            <span className="text-sm font-black text-[#FCA038] uppercase tracking-widest mt-3 mb-2 block">
              HAPPY CUSTOMERS
            </span>
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-sm font-medium">
              Valued customers building their financial trust, dreams, and wealth portfolios daily.
            </p>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
