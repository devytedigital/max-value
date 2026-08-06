"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function BoardOfDirectorsPage() {
  const directors = [
    {
      name: "Manoj V Raman",
      role: "Chairman & Managing Director",
      image: "/director-portrait.png",
    },
    {
      name: "K. Nandhakumar",
      role: "Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=750&q=80",
    },
    {
      name: "Christo George",
      role: "Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=750&q=80",
    },
    {
      name: "Roy Johnson",
      role: "Whole-time Director",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=750&q=80",
    },
    {
      name: "Dr. V.K. Gopinathan",
      role: "Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=750&q=80",
    },
    {
      name: "P.N. Parameswaran",
      role: "Independent Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&h=750&q=80",
    },
    {
      name: "M. Saraladevi",
      role: "Independent Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=750&q=80",
    },
    {
      name: "Prasannakumar S",
      role: "Independent Director",
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&h=750&q=80",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#faf9f6] text-zinc-950 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">

      {/* 3-Tier Navbar */}
      <Navbar />

      {/* Meet the Team Section */}
      <section className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Header block */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-normal tracking-tight text-zinc-900 font-serif leading-tight"
            >
              Meet the team that makes the <span className="italic font-serif">magic</span> happen
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs md:text-sm text-zinc-500 mt-5 leading-relaxed font-medium"
            >
              Meet the Board of Directors and members of management who constitute the leadership team at MaxValue Credits and Investments Ltd.
            </motion.p>
          </div>

          {/* Unified Responsive Grid (2 columns on mobile, 4 columns on desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full">
            {directors.map((director, index) => (
              <motion.div
                key={director.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative w-full aspect-[4/5] overflow-hidden rounded-[24px] border border-zinc-200/80 bg-zinc-50 shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer"
              >
                <img
                  src={director.image}
                  alt={director.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Default Dark Gradient (Ensures white text readability before hover) */}
                <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500 z-10" />

                {/* Hover Colored Gradient Overlay (Alternating Yellow and Blue Fog) */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 ${index % 2 === 0
                      ? "from-[#FCA038]/95 via-[#FCA038]/40"
                      : "from-[#147FC3]/95 via-[#147FC3]/40"
                    }`}
                />

                {/* Name and Title Text (Directly on card bottom, left-aligned) */}
                <div className="absolute bottom-5 left-5 right-5 z-20 text-left">
                  <h4 className="text-sm md:text-base font-extrabold text-white tracking-wide leading-tight">
                    {director.name}
                  </h4>
                  <span className={`text-[10px] md:text-[12px] font-semibold mt-1 block leading-tight transition-colors duration-500 ${index % 2 === 0
                      ? "text-[#faf9f6]/90 group-hover:text-amber-100"
                      : "text-[#faf9f6]/90 group-hover:text-sky-100"
                    }`}>
                    {director.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}
