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
                
                {/* Floating details badge card */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 md:bottom-3 md:left-3 md:right-3 bg-white/95 backdrop-blur-xs border border-zinc-100 shadow-md rounded-xl md:rounded-2xl py-2 px-2.5 md:py-3 md:px-4 text-center z-10">
                  <h4 className="text-[11px] md:text-[14px] font-bold text-zinc-900 tracking-tight leading-tight">
                    {director.name}
                  </h4>
                  <span className="text-[9px] md:text-[11px] font-medium text-zinc-500 mt-1 md:mt-1.5 block leading-tight">
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
