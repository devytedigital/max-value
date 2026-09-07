"use client";

import { useState, useEffect, useRef } from "react";

// Count up Counter component optimized with requestAnimationFrame
const Counter = ({ value, suffix = "", duration = 1.6 }: { value: number; suffix?: string; duration?: number }) => {
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
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-black text-zinc-950 tracking-tight">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default function AboutStatsSection() {
  return (
    <section className="relative w-full z-20 flex flex-col justify-between min-h-[calc(100vh-76px)] lg:min-h-[calc(100vh-128px)] bg-transparent overflow-hidden">

      {/* 1. TOP BLOCK: Corporate Info with split layout (Text Left, Image Right) */}
      <div
        className="relative w-full flex-grow flex items-center py-16 md:py-20 px-6 md:px-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 5 L45 25 L25 45 L5 25 Z' fill='none' stroke='%23147fc3' stroke-width='1.5' stroke-opacity='0.015'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Left Column: Heading and Text */}
          <div className="flex flex-col justify-center text-left">
            <h2 className="text-3xl md:text-4xl font-black text-[#147FC3] tracking-tight mb-6">
              Maxvalue Credits & <br className="hidden md:block" />
              Investments Ltd
            </h2>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed text-justify max-w-xl">
              MAXVALUE Credits & Investments Ltd. is an innovative venture providing high quality financial services to the common man. The team behind this venture draws from various walks of life having longstanding experience and expertise in different areas of financial services. Our products are designed to keep a long and enriching relationship with our valued customers. Our vision is to become one of the best providers of superior financial services to common man and to build their trust and confidence in the most professional manner.
            </p>
          </div>

          {/* Right Column: Premium Framed Image */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none flex items-center justify-center">
            <div className="relative overflow-hidden bg-white rounded-none shadow-sm">
              <img
                src="https://res.cloudinary.com/ckam7yhu/image/upload/f_auto,q_auto/v1788164624/happy-client.png"
                alt="Our Happy Clients at MaxValue"
                className="w-full h-auto max-h-[320px] object-cover rounded-none"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 2. BOTTOM STATS BAR */}
      <div className="w-full py-12 px-6 bg-zinc-50/20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

          {/* Stat 1: Branches */}
          <div className="flex flex-col text-left pt-5">
            <div className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight leading-none">
              <Counter value={150} suffix=" +" />
            </div>
            <span className="text-sm font-black text-[#147FC3] tracking-widest mt-3 mb-2 block">
              Branches
            </span>
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-sm font-medium">
              Branches nationwide delivering professional credit accessibility to local communities.
            </p>
          </div>

          {/* Stat 2: Customers */}
          <div className="flex flex-col text-left pt-5">
            <div className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight leading-none">
              <Counter value={1000000} suffix=" +" />
            </div>
            <span className="text-sm font-black text-[#FCA038] tracking-widest mt-3 mb-2 block">
              Happy Customers
            </span>
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-sm font-medium">
              Valued customers building their financial trust, dreams, and wealth portfolios daily.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
