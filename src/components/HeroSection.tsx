"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, ShieldCheck, Pause, Play } from "lucide-react";
import Image from "next/image";

const SLIDES = [
  {
    id: 0,
   
    heading: (
      <>
         <span className="text-[#FCA038] drop-shadow-[0_2px_12px_rgba(252,160,56,0.4)]"></span> <span className="bg-gradient-to-r from-sky-400 via-sky-200 to-[#FCA038] bg-clip-text text-transparent">Maximum Value for Your Gold</span>
      </>
    ),
    primaryCta: { text: "Explore Services", href: "#services" },
    secondaryCta: { text: "Locate Branch", href: "/branch-network" }
  },
  {
    id: 1,
  
    heading: (
      <>
           <span className="text-[#FCA038] drop-shadow-[0_2px_12px_rgba(252,160,56,0.4)]"></span> <span className="bg-gradient-to-r from-sky-400 via-sky-200 to-[#FCA038] bg-clip-text text-transparent">Invest in Your Dreams Wisely</span>
      </>
    ),
    primaryCta: { text: "Apply For Loan", href: "/contact-us" },
    secondaryCta: { text: "Learn About Us", href: "/about-us" }
  }
];

const SLIDE_DURATION = 5000;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Continuous auto-advance — runs indefinitely, no pausing, no hover interruption
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((slide) => (slide + 1) % SLIDES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  const slideVariants: Variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      transition: {
        duration: 0.35,
        ease: "easeInOut"
      }
    })
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  const activeSlideData = SLIDES[currentSlide];

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 text-white z-20">
      {/* Background Video */}
    <video
  ref={videoRef}
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
>
  <source src="https://res.cloudinary.com/ckam7yhu/video/upload/f_auto,q_auto/v1788166004/maxvalue.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 w-full pt-28 pb-20 md:pt-36 md:pb-24 flex flex-col justify-between min-h-screen">
        <div className="my-auto max-w-4xl w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-start gap-6 w-full"
            >
              {/* Category / Brand Badge */}
              <motion.div variants={itemVariants}>
               
              </motion.div>
  

              {/* Main Heading */}
              {/* <motion.h1
                variants={itemVariants}
                className="w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] text-white pr-16 sm:pr-0"
              >
                {activeSlideData.heading}
              </motion.h1> */}
<motion.h1
  variants={itemVariants}
  className="w-full whitespace-nowrap text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] text-white"
>
  {activeSlideData.heading}
</motion.h1>

              {/* Subtitle / Description */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed"
              >
              </motion.p>

              {/* Call-to-Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                {activeSlideData.primaryCta.href.startsWith("#") ? (
                  <a
                    href={activeSlideData.primaryCta.href}
                    className="inline-flex items-center gap-2.5 bg-[#FCA038] hover:bg-[#e08922] text-zinc-950 font-bold text-sm md:text-base px-7 py-3.5 rounded-full shadow-lg shadow-[#FCA038]/25 hover:shadow-[#FCA038]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>{activeSlideData.primaryCta.text}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    href={activeSlideData.primaryCta.href}
                    className="inline-flex items-center gap-2.5 bg-[#FCA038] hover:bg-[#e08922] text-zinc-950 font-bold text-sm md:text-base px-7 py-3.5 rounded-full shadow-lg shadow-[#FCA038]/25 hover:shadow-[#FCA038]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>{activeSlideData.primaryCta.text}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                <Link
                  href={activeSlideData.secondaryCta.href}
                  className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-semibold text-sm md:text-base px-7 py-3.5 rounded-full shadow-md hover:border-white/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>{activeSlideData.secondaryCta.text}</span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Certification Badges Bottom-Right */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute bottom-6 right-6 md:bottom-8 md:right-12 z-30"
        >
          <div className="bg-zinc-950/40 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-4 transition-all duration-300 hover:bg-zinc-950/60 hover:border-white/20">
            <div className="flex flex-col items-start">
              <span className="text-[9px] font-bold tracking-widest text-[#FCA038] uppercase">Certified</span>
              <span className="text-[10px] font-bold tracking-wider text-zinc-300 uppercase">Excellence</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-8 sm:w-20 sm:h-10">
                <Image
                  src="https://res.cloudinary.com/ckam7yhu/image/upload/f_auto,q_auto/v1788164583/Aprlogo.png"
                  alt="Great Place to Work Certification"
                  fill
                  priority
                  sizes="(max-width: 640px) 64px, 80px"
                  className="object-contain object-center"
                />
              </div>
              <div className="relative w-16 h-8 sm:w-20 sm:h-10">
                <Image
                  src="https://res.cloudinary.com/ckam7yhu/image/upload/f_auto,q_auto/v1788164687/ISOlogo.png"
                  alt="ISO 9001:2015 Certification"
                  fill
                  priority
                  sizes="(max-width: 640px) 64px, 80px"
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}