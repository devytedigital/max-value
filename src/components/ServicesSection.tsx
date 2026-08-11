"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Types for the services
interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function ServicesSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const services: ServiceItem[] = [
    {
      id: "vehicle",
      title: "Vehicle Loan",
      subtitle: "Fast Track Your Dream Drive",
      description: "Get on the road quickly with our hassle-free vehicle financing. Offering high loan-to-value options and swift processing times.",
      href: "/vehicle-loan#enquiry-section",
      icon: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-[#147FC3]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 55C15 50 18 45 25 43L35 32C38 29 42 28 47 28H73C77 28 80 30 82 33L88 43C92 45 95 50 95 55V68C95 70 93 72 91 72H83C83 67 79 63 74 63C69 63 65 67 65 72H35C35 67 31 63 26 63C21 63 17 67 17 72H9C7 72 5 70 5 68V55H15Z"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="26" cy="72" r="8" strokeWidth="3.5" fill="none" />
          <circle cx="74" cy="72" r="8" strokeWidth="3.5" fill="none" />
          <circle cx="75" cy="22" r="13" className="fill-[#FCA038]/10 stroke-[#FCA038]" strokeWidth="2.5" />
          <path d="M71 17H79M71 21H79M74 17C74 17 77 18 77 20.5C77 23 73.5 24.5 73.5 24.5H79M74.5 23.5L77.5 28.5" stroke="#FCA038" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: "business",
      title: "Business Loan",
      subtitle: "Capital to Scale Your Vision",
      description: "Empower your business with tailored funding. Perfect for expansion, buying stock, working capital, or infrastructure development.",
      href: "/business-loan#enquiry-section",
      icon: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-[#147FC3]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 75H32C35 75 38 73 40 70L56 46C58 43 61 41 65 41H84C87 41 89 43 89 46C89 49 87 51 84 51H70L65 54C62 57 60 61 60 65V75H85"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M15 65H5V85H15V65Z" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M50 26C50 19 42 13 42 13C42 13 34 19 34 26C30 28 28 33 28 38C28 46 34 51 42 51C50 51 56 46 56 38C56 33 54 28 50 26Z"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M34 26C37 27 47 27 50 26" strokeWidth="2.5" />
          <circle cx="39" cy="34" r="2" fill="#FCA038" />
          <path d="M37 41L47 31" stroke="#FCA038" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="45" cy="38" r="2" fill="#FCA038" />
        </svg>
      )
    },
    {
      id: "micro",
      title: "Micro Finance",
      subtitle: "Empowering Local Communities",
      description: "Supporting micro-entrepreneurs, self-help groups, and low-income individuals with vital capital and credit opportunities.",
      href: "/microfinance#enquiry-section",
      icon: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-[#147FC3]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 85H90" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="20" y="60" width="10" height="25" rx="2" strokeWidth="3" fill="none" />
          <rect x="38" y="45" width="10" height="40" rx="2" strokeWidth="3" fill="none" />
          <rect x="56" y="30" width="10" height="55" rx="2" strokeWidth="3" fill="none" />
          <rect x="74" y="15" width="10" height="70" rx="2" strokeWidth="3" fill="none" />
          <path d="M15 70C25 55 45 35 72 20" stroke="#FCA038" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M63 20H74V31" stroke="#FCA038" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="25" cy="46" r="3.5" className="fill-[#FCA038] stroke-[#FCA038]" />
          <circle cx="43" cy="30" r="3.5" className="fill-[#FCA038] stroke-[#FCA038]" />
          <circle cx="61" cy="18" r="3.5" className="fill-[#FCA038] stroke-[#FCA038]" />
        </svg>
      )
    },

    {
      id: "gold",
      title: "Gold Loan",
      subtitle: "Instant Value For Your Gold",
      description: "Convert your gold ornaments into instant funds with absolute safety. Get high valuation per gram, quick appraisal, and secure storage.",
      href: "/gold-loan#enquiry-section",
      icon: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-[#147FC3]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 70L24 55H56L44 70H12Z" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M56 55L48 70M12 70L20 82H52L44 70" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M44 70L56 55H88L76 70H44Z" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M88 55L80 70M44 70L52 82H84L76 70" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M28 45L40 30H72L60 45H28Z" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M72 30L64 45M28 45L36 57H68L60 45" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M48 10L50 14L54 15L50 16L48 20L46 16L42 15L46 14L48 10Z" fill="#FCA038" />
          <path d="M78 20L79 22L81 23L79 24L78 26L77 24L75 23L77 22L78 20Z" fill="#FCA038" />
          <path d="M22 28L23 30L25 31L23 32L22 34L21 32L19 31L21 30L22 28Z" fill="#FCA038" />
        </svg>
      )
    }
  ];

  // Group pages for mobile: 2x2 grid slides. We wrap around to keep it clean and fully populated.
  const mobilePages = [
    [services[0], services[1], services[2], services[3]],
    [services[2], services[3], services[0], services[1]],
  ];

  const totalPages = mobilePages.length; // 2 pages

  // Autoplay functionality for mobile carousel
  const startAutoplay = () => {
    stopAutoplay();
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 6000);
  };

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const paginate = (newDirection: number) => {
    stopAutoplay();
    setDirection(newDirection);
    setCurrentPage((prev) => {
      let nextPage = prev + newDirection;
      if (nextPage < 0) nextPage = totalPages - 1;
      if (nextPage >= totalPages) nextPage = 0;
      return nextPage;
    });
    startAutoplay();
  };

  // Animation variants for mobile carousel (smooth fade-in-out transition)
  const slideVariants: Variants = {
    enter: {
      opacity: 0,
      scale: 0.97
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 0.4, ease: "easeInOut" },
        scale: { duration: 0.4, ease: "easeInOut" }
      }
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      transition: {
        opacity: { duration: 0.3, ease: "easeInOut" },
        scale: { duration: 0.3, ease: "easeInOut" }
      }
    }
  };


  return (
    <section className="relative py-20 bg-transparent z-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#FCA038]/3 blur-[100px]" />
        <div className="absolute bottom-1/4 right-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#147FC3]/3 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 leading-tight"
          >
            Modern Credit Solutions <br />
            <span className="text-[#147FC3]">
              Tailored For Your Growth
            </span>
          </motion.h2>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP STATIC GRID (Lg screens: 2 rows, 3 columns layout, centered bottom) */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex flex-wrap justify-center gap-y-16 gap-x-20">
          {services.map((service, idx) => (
            <motion.div
              key={service.id + "-desktop"}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col items-center text-center w-[28%] max-w-[340px]"
            >
              {/* Circle Icon Container */}
              <Link
                href={service.href}
                className="w-20 h-20 bg-[#147FC3]/5 group-hover:bg-[#147FC3]/10 rounded-full flex items-center justify-center transition-all duration-350 ease-out mb-5 relative"
              >
                <span className="absolute inset-0 rounded-full border border-[#147FC3]/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                {service.icon}
              </Link>

              {/* Title */}
              <Link href={service.href}>
                <h3 className="text-xl font-extrabold text-zinc-900 tracking-tight transition-colors duration-300 group-hover:text-[#147FC3]">
                  {service.title}
                </h3>
              </Link>

              {/* Subtitle */}
              <p className="text-xs font-bold text-[#FCA038] mt-1.5 tracking-wider">
                {service.subtitle}
              </p>

              {/* Description */}
              <p className="text-zinc-500 text-sm leading-relaxed mt-3">
                {service.description}
              </p>

              {/* Enquiry Now Link */}
              <div className="mt-4">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-[#147FC3] group-hover:text-[#FCA038] transition-colors duration-300 cursor-pointer"
                >
                  Enquiry Now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* MOBILE AUTOMATIC CAROUSEL GRID (Md/Sm screens: 2 rows, 2 columns layout) */}
        {/* ========================================================================= */}
        <div className="lg:hidden block">

          {/* Carousel Viewport Container */}
          <div className="relative w-full flex items-center min-h-[300px] md:min-h-[310px]">

            {/* Sliding Track */}
            <div className="w-full px-4 overflow-visible relative">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={currentPage + "-mobile-slide"}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full grid grid-cols-2 gap-x-6 gap-y-8"
                >
                  {mobilePages[currentPage].map((service, idx) => (
                    <Link
                      key={service.id + "-mobile-" + idx}
                      href={service.href}
                      className="group flex flex-col items-center text-center px-2 py-2"
                    >
                      {/* Circle Icon Container */}
                      <div className="w-20 h-20 bg-[#147FC3]/5 group-hover:bg-[#147FC3]/10 rounded-full flex items-center justify-center transition-all duration-350 ease-out mb-4 relative">
                        <span className="absolute inset-0 rounded-full border border-[#147FC3]/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        {service.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-base md:text-lg font-extrabold text-zinc-900 tracking-tight transition-colors duration-300 group-hover:text-[#147FC3]">
                        {service.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-[10px] font-bold text-[#FCA038] mt-1 tracking-wider">
                        {service.subtitle}
                      </p>

                      {/* Enquiry Now Link */}
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-[#147FC3] group-hover:text-[#FCA038] transition-colors duration-300">
                          Enquiry Now
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex justify-center items-center gap-2.5 mt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  stopAutoplay();
                  setDirection(index > currentPage ? 1 : -1);
                  setCurrentPage(index);
                  startAutoplay();
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentPage
                  ? "w-8 bg-[#147FC3]"
                  : "w-2.5 bg-zinc-200 hover:bg-zinc-300"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

