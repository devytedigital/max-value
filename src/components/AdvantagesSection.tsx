"use client";

import { motion } from "framer-motion";

// Custom SVG Icons matching your design screenshot
const QuickProcessingIcon = () => (
  <svg viewBox="0 0 100 100" className="w-14 h-14 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 36h12" strokeWidth="4" />
    <path d="M8 48h16" strokeWidth="4" />
    <path d="M14 60h10" strokeWidth="4" />
    <circle cx="56" cy="48" r="24" />
    <path d="M56 48V34" strokeWidth="3.5" />
    <path d="M56 48l12 6" strokeWidth="3.5" />
  </svg>
);

const CustomerRelationIcon = () => (
  <svg viewBox="0 0 100 100" className="w-14 h-14 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {/* Four people heads */}
    <circle cx="26" cy="22" r="3.5" />
    <circle cx="42" cy="22" r="3.5" />
    <circle cx="58" cy="22" r="3.5" />
    <circle cx="74" cy="22" r="3.5" />
    {/* Four people shoulders */}
    <path d="M19 34c0-3 3-5 7-5s7 2 7 5" />
    <path d="M35 34c0-3 3-5 7-5s7 2 7 5" />
    <path d="M51 34c0-3 3-5 7-5s7 2 7 5" />
    <path d="M67 34c0-3 3-5 7-5s7 2 7 5" />
    {/* Handshake */}
    <path d="M26 66h12l8-8h16l8 8h11" />
    <path d="M34 58c-2-2-5-2-7 0L20 65M58 50c2-2 5-2 7 0l8 7" />
    <path d="M42 58l5 5M58 58l-5 5" strokeWidth="2.5" />
  </svg>
);

const AttractiveInterestRateIcon = () => (
  <svg viewBox="0 0 100 100" className="w-14 h-14 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {/* Coin stacks */}
    <path d="M15 62c0 3.5 11 6.5 25 6.5s25-3 25-6.5" />
    <path d="M15 62v10c0 3.5 11 6.5 25 6.5s25-3 25-6.5V62" />
    <path d="M15 50v12c0 3.5 11 6.5 25 6.5s25-3 25-6.5V50" />
    <path d="M15 50c0 3.5 11 6.5 25 6.5s25-3 25-6.5" />
    {/* Upward percentage trend */}
    <path d="M46 14h24v24" strokeWidth="4" />
    <path d="M70 14L42 42" strokeWidth="4" />
    <circle cx="32" cy="22" r="5" />
    <circle cx="60" cy="44" r="5" />
  </svg>
);

const FastGrowingNbfcIcon = () => (
  <svg viewBox="0 0 100 100" className="w-14 h-14 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 16v64h64" strokeWidth="4" />
    <rect x="26" y="56" width="8" height="24" />
    <rect x="40" y="44" width="8" height="36" />
    <rect x="54" y="32" width="8" height="48" />
    <rect x="68" y="20" width="8" height="60" />
    <path d="M26 60l14-14 14-12 14-14" strokeWidth="4.5" className="stroke-[#FCA038]" />
    <path d="M58 20h10v10" strokeWidth="4" className="stroke-[#FCA038]" />
  </svg>
);

const ExperiencedEmployeesIcon = () => (
  <svg viewBox="0 0 100 100" className="w-14 h-14 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="50" cy="46" r="18" />
    <circle cx="50" cy="46" r="12" />
    <path d="M45 46l3.5 3.5L55 42" strokeWidth="2.5" />
    <path d="M42 63l-5 20l13-5l13 5l-5-20" />
    {/* Stars */}
    <path d="M50 12l2 4h4l-3 3l1 4l-4-2.5l-4 2.5l1-4l-3-3h4z" className="fill-[#FCA038] stroke-[#FCA038] stroke-[0.5]" />
    <path d="M24 22l2 4h4l-3 3l1 4l-4-2.5l-4 2.5l1-4l-3-3h4z" className="fill-[#FCA038] stroke-[#FCA038] stroke-[0.5]" />
    <path d="M76 22l2 4h4l-3 3l1 4l-4-2.5l-4 2.5l1-4l-3-3h4z" className="fill-[#FCA038] stroke-[#FCA038] stroke-[0.5]" />
  </svg>
);

export default function AdvantagesSection() {
  const advantages = [
    {
      icon: <QuickProcessingIcon />,
      label: "QUICK PROCESSING"
    },
    {
      icon: <CustomerRelationIcon />,
      label: "CUSTOMER RELATION"
    },
    {
      icon: <AttractiveInterestRateIcon />,
      label: "ATTRACTIVE INTEREST RATE"
    },
    {
      icon: <FastGrowingNbfcIcon />,
      label: "FAST GROWING NBFC"
    },
    {
      icon: <ExperiencedEmployeesIcon />,
      label: "EXPERIENCED EMPLOYEES"
    }
  ];

  return (
    <section className="relative w-full py-16 bg-white z-20 overflow-hidden">
      
      {/* 1. Header (Centered title) */}
      <div className="text-center max-w-3xl mx-auto mb-12 px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-black text-[#147FC3] tracking-tight leading-none"
        >
          MAXVALUE <br />
          <span className="text-[#FCA038] text-2xl md:text-3xl font-extrabold mt-2 block">
            Advantages
          </span>
        </motion.h2>
      </div>

      {/* 2. Horizontal Blue Bar containing the 5 cards */}
      <div className="w-full bg-[#147FC3] py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6">
          {advantages.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="w-[calc(50%-12px)] sm:w-[calc(33.33%-16px)] lg:w-[calc(20%-20px)] max-w-[190px] aspect-square border border-white/25 flex flex-col items-center justify-center p-5 gap-4 text-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:border-white/70 hover:bg-white/5"
            >
              <div className="flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-[10px] sm:text-xs font-black tracking-wider text-white leading-tight">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
