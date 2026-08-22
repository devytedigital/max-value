// "use client";

// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import Link from "next/link";
// import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, ShieldCheck, Pause, Play } from "lucide-react";

// const SLIDES = [
//   {
//     id: 0,
//     tag: "MAXVALUE CREDITS & INVESTMENTS",
//     badgeIcon: Sparkles,
//     heading: (
//       <>
//         Compound your <span className="text-[#FCA038] drop-shadow-[0_2px_12px_rgba(252,160,56,0.4)]">growth</span>, multiply your <span className="bg-gradient-to-r from-sky-400 via-sky-200 to-[#FCA038] bg-clip-text text-transparent">possibilities</span>
//       </>
//     ),
//     primaryCta: { text: "Explore Services", href: "#services" },
//     secondaryCta: { text: "Locate Branch", href: "/branch-network" }
//   },
//   {
//     id: 1,
//     tag: "SMART FINANCIAL FREEDOM",
//     badgeIcon: ShieldCheck,
//     heading: (
//       <>
//         <span className="text-[#FCA038] drop-shadow-[0_2px_12px_rgba(252,160,56,0.4)]">Prosperity</span> is the product of <span className="bg-gradient-to-r from-amber-200 via-[#FCA038] to-orange-300 bg-clip-text text-transparent">wise decisions</span>
//       </>
//     ),
//     primaryCta: { text: "Apply For Loan", href: "/contact-us" },
//     secondaryCta: { text: "Learn About Us", href: "/about-us" }
//   }
// ];

// const SLIDE_DURATION = 2000; 

// export default function HeroSection() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const [isPaused, setIsPaused] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   // Auto slide interval logic with progress filling
//   useEffect(() => {
//     if (isPaused) return;

//     const intervalTime = 50; // update progress every 50ms
//     const step = (intervalTime / SLIDE_DURATION) * 100;

//     const timer = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           setDirection(1);
//           setCurrentSlide((slide) => (slide + 1) % SLIDES.length);
//           return 0;
//         }
//         return prev + step;
//       });
//     }, intervalTime);

//     return () => clearInterval(timer);
//   }, [isPaused, currentSlide]);

//   const handleNext = () => {
//     setDirection(1);
//     setProgress(0);
//     setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
//   };

//   const handlePrev = () => {
//     setDirection(-1);
//     setProgress(0);
//     setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
//   };

//   const goToSlide = (index: number) => {
//     if (index === currentSlide) return;
//     setDirection(index > currentSlide ? 1 : -1);
//     setProgress(0);
//     setCurrentSlide(index);
//   };

//   const slideVariants: Variants = {
//     initial: (dir: number) => ({
//       x: dir > 0 ? 60 : -60,
//       opacity: 0,
//       filter: "blur(6px)"
//     }),
//     animate: {
//       x: 0,
//       opacity: 1,
//       filter: "blur(0px)",
//       transition: {
//         duration: 0.75,
//         ease: "easeOut",
//         staggerChildren: 0.12,
//         delayChildren: 0.1
//       }
//     },
//     exit: (dir: number) => ({
//       x: dir > 0 ? -50 : 50,
//       opacity: 0,
//       filter: "blur(4px)",
//       transition: {
//         duration: 0.45,
//         ease: "easeInOut"
//       }
//     })
//   };

//   const itemVariants: Variants = {
//     initial: { opacity: 0, y: 24 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   const activeSlideData = SLIDES[currentSlide];
//   const BadgeIcon = activeSlideData.badgeIcon;

//   return (
//     <div
//       className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 text-white z-20"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       {/* Background Video */}
//       <video
//         ref={videoRef}
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0 scale-105 transform duration-1000"
//       >
//         <source src="/maxvalue.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Layered Gradient & Ambient Glow Overlays */}
//       <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-zinc-950/40 z-10" />
//       <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/50 to-transparent z-10" />

//       {/* Brand Color Glow Accents */}
//       <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#147FC3]/25 rounded-full blur-[140px] pointer-events-none z-10" />
//       <div className="absolute bottom-1/4 right-1/6 w-[30rem] h-[30rem] bg-[#FCA038]/15 rounded-full blur-[160px] pointer-events-none z-10" />

//       {/* Modern Grid Pattern Overlay */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-10" />

//       {/* Main Content Container */}
//       <div className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 w-full pt-28 pb-20 md:pt-36 md:pb-24 flex flex-col justify-between min-h-screen">
//         <div className="my-auto max-w-4xl">
//           <AnimatePresence mode="wait" custom={direction}>
//             <motion.div
//               key={currentSlide}
//               custom={direction}
//               variants={slideVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               className="flex flex-col items-start gap-6"
//             >
//               {/* Category / Brand Badge */}
//               <motion.div variants={itemVariants}>
//                 <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-inner">
//                   <BadgeIcon className="w-4 h-4 text-[#FCA038] animate-pulse" />
//                   <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-200">
//                     {activeSlideData.tag}
//                   </span>
//                 </div>
//               </motion.div>

//               {/* Main Heading */}
//               <motion.h1
//                 variants={itemVariants}
//                 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
//               >
//                 {activeSlideData.heading}
//               </motion.h1>

//               {/* Subtitle / Description */}
//               <motion.p
//                 variants={itemVariants}
//                 className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed"
//               >
//               </motion.p>

//               {/* Call-to-Action Buttons */}
//               <motion.div
//                 variants={itemVariants}
//                 className="flex flex-wrap items-center gap-4 pt-4"
//               >
//                 {activeSlideData.primaryCta.href.startsWith("#") ? (
//                   <a
//                     href={activeSlideData.primaryCta.href}
//                     className="inline-flex items-center gap-2.5 bg-[#FCA038] hover:bg-[#e08922] text-zinc-950 font-bold text-sm md:text-base px-7 py-3.5 rounded-full shadow-lg shadow-[#FCA038]/25 hover:shadow-[#FCA038]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
//                   >
//                     <span>{activeSlideData.primaryCta.text}</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </a>
//                 ) : (
//                   <Link
//                     href={activeSlideData.primaryCta.href}
//                     className="inline-flex items-center gap-2.5 bg-[#FCA038] hover:bg-[#e08922] text-zinc-950 font-bold text-sm md:text-base px-7 py-3.5 rounded-full shadow-lg shadow-[#FCA038]/25 hover:shadow-[#FCA038]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
//                   >
//                     <span>{activeSlideData.primaryCta.text}</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </Link>
//                 )}

//                 <Link
//                   href={activeSlideData.secondaryCta.href}
//                   className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-semibold text-sm md:text-base px-7 py-3.5 rounded-full shadow-md hover:border-white/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
//                 >
//                   <span>{activeSlideData.secondaryCta.text}</span>
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

        
//       </div>
//     </div>
//   );
// }


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

const SLIDE_DURATION = 3000;

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
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      filter: "blur(6px)"
    }),
    animate: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.75,
        ease: "easeOut",
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      filter: "blur(4px)",
      transition: {
        duration: 0.45,
        ease: "easeInOut"
      }
    })
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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
  <source src="/maxvalue.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 w-full pt-28 pb-20 md:pt-36 md:pb-24 flex flex-col justify-between min-h-screen">
        <div className="my-auto max-w-4xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-start gap-6"
            >
              {/* Category / Brand Badge */}
              <motion.div variants={itemVariants}>
               
              </motion.div>
  

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
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
                        {/* Logos */}
<motion.div
  variants={itemVariants}
  className="flex items-center gap-3 sm:gap-5 md:gap-6 mb-3"
>
  <div className="relative w-20 h-10 sm:w-28 sm:h-14 md:w-36 md:h-16">
    <Image
      src="/Aprlogo.png"
      alt="Logo 1"
      fill
      priority
      sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 144px"
      className="object-contain object-left"
    />
  </div>

  <div className="relative w-20 h-10 sm:w-28 sm:h-14 md:w-36 md:h-16">
    <Image
      src="/ISOlogo.png"
      alt="Logo 2"
      fill
      priority
      sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 144px"
      className="object-contain object-left"
    />
  </div>
</motion.div>  
            </motion.div>
            
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}