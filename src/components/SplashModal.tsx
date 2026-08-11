"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Globe,
  ChevronDown
} from "lucide-react";

// Custom SVG Icons since brand icons are removed in newer Lucide versions
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface SplashModalProps {
  onComplete?: () => void;
}

export default function SplashModal({ onComplete }: SplashModalProps) {
  const [showSplash, setShowSplash] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartY = useRef(0);
  const lenis = useLenis();

  // Check if visitor has already seen the splash screen
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
    lenis?.scrollTo(0, { immediate: true, force: true });

    const hasSeen = localStorage.getItem("maxValueSplashDismissed");
    if (!hasSeen) {
      setShowSplash(true);
      document.body.style.overflow = "hidden"; // lock background scroll
    } else {
      onComplete?.();
    }
    return () => {
      document.body.style.overflow = "unset"; // restore scroll on unmount
    };
  }, [onComplete, lenis]);

  const handleDismiss = () => {
    localStorage.setItem("maxValueSplashDismissed", "true");

    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    lenis?.scrollTo(0, { immediate: true, force: true });

    setShowSplash(false);
    onComplete?.();

    // Wait for the exit animation (800ms) to complete before restoring scroll.
    // This absorbs any remaining scroll wheel momentum while overflow is still locked.
    setTimeout(() => {
      document.body.style.overflow = "unset";
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
      lenis?.scrollTo(0, { immediate: true, force: true });
    }, 800);
  };

  const changeSlide = (direction: "up" | "down") => {
    if (isAnimating) return;

    if (direction === "down") {
      if (currentSlide < 2) {
        setIsAnimating(true);
        setCurrentSlide((prev) => prev + 1);
        setTimeout(() => setIsAnimating(false), 800);
      } else if (currentSlide === 2) {
        handleDismiss();
      }
    } else if (direction === "up" && currentSlide > 0) {
      setIsAnimating(true);
      setCurrentSlide((prev) => prev - 1);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 30) {
      changeSlide("down");
    } else if (e.deltaY < -30) {
      changeSlide("up");
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (deltaY > 50) {
      changeSlide("down");
    } else if (deltaY < -50) {
      changeSlide("up");
    }
  };

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col justify-center overflow-hidden font-sans select-none"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Accent Glows (mainly white, slightly use yellow/blue) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#FCA038]/5 blur-[80px]" />
            <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#147FC3]/4 blur-[100px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,127,195,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,127,195,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          </div>

          {/* Right Side Pagination Dots */}
          <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentSlide(idx);
                    setTimeout(() => setIsAnimating(false), 800);
                  }
                }}
                className={`w-3 h-3 rounded-full border transition-all duration-300 ${currentSlide === idx
                  ? "bg-[#147FC3] border-[#147FC3] scale-125 shadow-sm"
                  : "bg-transparent border-zinc-300 hover:border-[#147FC3]"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>


          {/* Slides Track */}
          <div
            className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{ transform: `translateY(-${currentSlide * 100}%)` }}
          >
            {/* SLIDE 1: Welcome Screen */}
            <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 relative">
              <div className="max-w-2xl flex flex-col items-center">
                <h1 className="text-xl md:text-2xl font-semibold text-zinc-900 tracking-tight leading-tight">
                  Welcome to <br />
                  <span className="text-[#147FC3]">MaxValue Credits & Investments LTD</span>
                </h1>
              </div>
            </div>

            {/* SLIDE 2: Explore Our Services */}
            <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 bg-zinc-50/50">
              <div className="max-w-4xl flex flex-col items-center">
                <span className="text-xs font-semibold text-[#FCA038] tracking-widest mb-3">Our Offerings</span>
                <h2 className="text-xl md:text-2xl font-semibold text-zinc-950 mb-10">
                  Explore Our Services
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mb-12">
                  {[
                    {
                      icon: <TrendingUp className="h-6 w-6 text-[#147FC3]" />,
                      title: "Credit Facilities",
                      desc: "Structured business and personal loans designed with friendly terms to expand your horizons."
                    },
                    {
                      icon: <ShieldCheck className="h-6 w-6 text-[#FCA038]" />,
                      title: "Wealth Management",
                      desc: "Strategic portfolio advisory to secure capital preservation and passive long-term growth."
                    },
                    {
                      icon: <Sparkles className="h-6 w-6 text-[#147FC3]" />,
                      title: "Investment Plans",
                      desc: "Fixed and compounding investment tools optimized to achieve targeted financial milestones."
                    }
                  ].map((service, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all duration-300"
                    >
                      <div className="h-12 w-12 rounded-xl bg-zinc-50 flex items-center justify-center mb-4">
                        {service.icon}
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 mb-2">{service.title}</h3>
                      <p className="text-zinc-500 text-xs leading-relaxed">{service.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Scroll button removed */}
              </div>
            </div>

            {/* SLIDE 3: Social & Get Started */}
            <div className="w-full h-full flex flex-col items-center justify-center text-center px-6">
              <div className="max-w-xl flex flex-col items-center">
                <span className="text-xs font-semibold text-[#147FC3] tracking-widest mb-3">Connect With Us</span>
                <h2 className="text-xl md:text-2xl font-semibold text-zinc-950 mb-6">
                  Let's Stay in Touch
                </h2>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-8">
                  Get absolute insights into the financial markets, credit offerings, and special investment terms by following our social channels.
                </p>

                {/* Social media icons showcase (Blue main, hover Yellow) */}
                <div className="flex gap-5 mb-12">
                  {[
                    { icon: <TwitterIcon className="h-5 w-5" />, url: "https://twitter.com" },
                    { icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com" },
                    { icon: <Facebook className="h-5 w-5" />, url: "https://facebook.com" },
                    { icon: <Instagram className="h-5 w-5" />, url: "https://instagram.com" },
                    { icon: <YoutubeIcon className="h-5 w-5" />, url: "https://youtube.com" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full border border-zinc-200 flex items-center justify-center text-[#147FC3] hover:text-[#FCA038] hover:border-[#FCA038] hover:bg-zinc-50 transition-all shadow-sm active:scale-95"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                {/* Enter Button removed: scroll down to enter website */}
              </div>
            </div>
          </div>

          {/* Bottom Footer Info Removed */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
