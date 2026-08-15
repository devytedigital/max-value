"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Building2, ShieldCheck, Award, Briefcase, Users, Sparkles } from "lucide-react";

interface Leader {
  id: string;
  name: string;
  role: string;
  category: "Executive Management" | "Operational Leadership" | "Strategic Advisors";
  image: string;
  bio: string;
  highlights?: string[];
}

const leadersData: Leader[] = [
  {
    id: "manoj",
    name: "Mr. Manoj V B",
    role: "Chairman & Managing Director",
    category: "Executive Management",
    image: "/directors/manoj.png",
    bio: "Mr. Manoj V B is an MBA business leader and serial entrepreneur who has been instrumental in founding and steering Maxvalue Credits & Investments Ltd. Under his leadership, the organization has expanded across multi-state branch networks, delivering high-impact financial inclusion and robust governance. He serves as CMD across international operations and has been recognized with honors including the Sharjah Book Festival Best Director Award and the US Navy VIVA Excellence Award.",
    highlights: ["CMD - MaxValue Group", "Global Business Leader", "Sharjah Book Festival & US Navy Awardee"],
  },
  {
    id: "bijimon",
    name: "Mr. K. R. Bijimon",
    role: "Chief Operating Officer",
    category: "Executive Management",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&h=600&q=80",
    bio: "With over 25 years of domain expertise in retail financial services, credit underwriting, and operational scaling, Mr. Bijimon oversees core business operations and branch expansion strategies at MaxValue Credits. His focus centers on streamlining loan origination, enhancing customer satisfaction, and building resilient field teams.",
    highlights: ["25+ Yrs Retail Finance Expertise", "Branch Expansion Architect", "Operational Excellence Specialist"],
  },
  {
    id: "sangeetha",
    name: "Mrs. Sangeetha R.",
    role: "Chief Financial Officer & Head of Treasury",
    category: "Executive Management",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=600&q=80",
    bio: "A Fellow Chartered Accountant (FCA) with over two decades of financial strategy, capital structuring, risk management, and regulatory compliance leadership. Mrs. Sangeetha leads corporate treasury, financial reporting, credit rating relations, and fund management for MaxValue.",
    highlights: ["Fellow Chartered Accountant (FCA)", "Treasury & Capital Structuring", "Regulatory Financial Compliance"],
  },
  {
    id: "suresh",
    name: "Mr. Suresh Kumar Nair",
    role: "Head of Credit & Risk Management",
    category: "Operational Leadership",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80",
    bio: "A veteran risk practitioner with extensive experience across retail credit underwriting, portfolio asset quality monitoring, and RBI compliance. Mr. Suresh ensures that MaxValue maintains robust credit risk appraisal mechanisms while supporting sustainable loan book growth.",
    highlights: ["Portfolio Risk Control", "RBI Regulatory Compliance", "Credit Appraisal Pioneer"],
  },
  {
    id: "rajesh",
    name: "Mr. Rajesh V. Menon",
    role: "Chief Technology Officer",
    category: "Operational Leadership",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=600&q=80",
    bio: "Spearheading MaxValue's digital transformation roadmap, Mr. Rajesh manages core banking integration, cloud architecture, secure customer onboarding systems, and mobile payment infrastructure to provide seamless digital lending experiences.",
    highlights: ["FinTech Architecture Leader", "Core Banking Integration", "Digital Platform Innovator"],
  },
  {
    id: "deepa",
    name: "Mrs. Deepa Radhakrishnan",
    role: "Head of Human Resources & Talent Development",
    category: "Operational Leadership",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=600&q=80",
    bio: "Driving talent acquisition, leadership development, and employee engagement across MaxValue's branch network. Mrs. Deepa brings 18+ years of organizational development experience in fostering customer-centric workplace culture and high-performing teams.",
    highlights: ["18+ Yrs HR Leadership", "Organizational Development", "Talent Growth & Culture"],
  },
  {
    id: "anand",
    name: "Mr. Anand R. Pillai",
    role: "Senior Strategic Advisor - Retail Lending",
    category: "Strategic Advisors",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=600&q=80",
    bio: "Former General Manager of a leading public sector bank, Mr. Anand provides strategic direction on product diversification, priority sector lending, microfinance partnerships, and long-term asset-liability management.",
    highlights: ["Former Sr. Banking Executive", "Strategic Asset Growth", "Financial Policy Advisor"],
  },
];

export default function LeadersPage() {
  const [activeTab, setActiveTab] = useState<
    "All" | "Executive Management" | "Operational Leadership" | "Strategic Advisors"
  >("All");
  const [leadersList, setLeadersList] = useState<Leader[]>(leadersData);

  useEffect(() => {
    async function loadLeaders() {
      try {
        const response = await fetch("/api/leaders");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setLeadersList(data);
          }
        }
      } catch (err) {
        console.error("Could not fetch leaders via API, using fallback data:", err);
      }
    }
    loadLeaders();
  }, []);

  const filteredLeaders = leadersList.filter((leader) => {
    if (activeTab === "All") return true;
    return leader.category === activeTab;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#147FC3] selection:text-white">
      {/* 3-Tier Navbar */}
      <Navbar />

      {/* Full-Screen Hero Banner — matching Board of Directors page style */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image — no gradient/color overlay on top */}
        <div className="absolute inset-0 z-0">
          <img
            src="/board-hero-bg.png"
            alt="Leadership Banner"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle bottom darkening only, purely for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 text-center flex flex-col items-center">
          {/* Breadcrumb Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-amber-300 mb-8 shadow-sm"
          >
            <span className="text-slate-200">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-200">About Us</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-[#FCA038] font-bold">Leaders</span>
          </motion.div>

          {/* Clean text directly over the image — no box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider uppercase text-white leading-none"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.5)" }}
            >
              OUR LEADERS
            </h1>
          </motion.div>
        </div>

        {/* Curved Bottom Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-50 [clip-path:ellipse(65%_100%_at_50%_100%)] z-10" />
      </section>

      {/* Main Content Area */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        {/* Section 2: Interactive Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#147FC3] tracking-tight">
              Executive & Operational Leaders
            </h2>
            <p className="text-slate-600 text-sm font-medium mt-1">
              Explore the dedicated leaders, executives, and strategists steering MaxValue Credits forward.
            </p>
          </div>

         
        </div>

        {/* Section 3: Leaders Grid Stack */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 sm:space-y-8"
          >
            {filteredLeaders.map((leader, index) => {
              return (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group hover:border-[#147FC3]/40"
                >
                  <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-8">
                    {/* Left Avatar Container */}
                    <div className="shrink-0 flex flex-col items-center justify-center">
                      <div className="relative">
                        {/* Ring Glow Accent */}
                        <div
                          className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr transition-opacity duration-500 opacity-60 group-hover:opacity-100 blur-xs ${
                            leader.category === "Executive Management"
                              ? "from-[#147FC3] via-sky-400 to-[#FCA038]"
                              : leader.category === "Operational Leadership"
                              ? "from-[#FCA038] via-amber-400 to-[#147FC3]"
                              : "from-sky-500 via-indigo-500 to-amber-500"
                          }`}
                        />
                        <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white bg-slate-100 shadow-md">
                          <img
                            src={leader.image}
                            alt={leader.name}
                            className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Role Badge Pill */}
                      <span
                        className={`mt-4 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-2xs border text-center ${
                          leader.category === "Executive Management"
                            ? "bg-[#147FC3]/10 text-[#147FC3] border-[#147FC3]/30"
                            : leader.category === "Operational Leadership"
                            ? "bg-[#FCA038]/15 text-amber-800 border-[#FCA038]/40"
                            : "bg-sky-50 text-sky-800 border-sky-200"
                        }`}
                      >
                        {leader.role}
                      </span>
                    </div>

                    {/* Right Info & Detailed Bio Container */}
                    <div className="flex-1 bg-slate-50 group-hover:bg-[#f4f7fc] transition-colors duration-300 rounded-xl p-5 sm:p-6 border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#147FC3] transition-colors duration-300">
                              {leader.name}
                            </h3>
                            <p className="text-xs font-semibold text-slate-500 mt-0.5">
                              {leader.category}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 self-start sm:self-auto">
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FCA038]" />
                            <span className="text-xs font-semibold text-slate-600">MaxValue Credits</span>
                          </div>
                        </div>

                        {/* Full Detailed Bio */}
                        <p className="text-slate-700 text-xs sm:text-sm md:text-[15px] leading-relaxed text-justify font-normal">
                          {leader.bio}
                        </p>
                      </div>

                      {/* Optional Highlight Tags */}
                      {leader.highlights && (
                        <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap gap-2">
                          {leader.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-medium bg-white text-slate-700 border border-slate-300/80 px-2.5 py-1 rounded-md shadow-2xs flex items-center gap-1"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#147FC3]" />
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Section 4: Leadership & Excellence Banner */}
        <section className="mt-20 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0a274c] to-slate-900 p-8 sm:p-12 text-white relative overflow-hidden border border-white/10 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#147FC3]/20 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FCA038]/15 blur-[90px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#FCA038]">
              <Building2 className="w-3.5 h-3.5 text-[#FCA038]" /> Operational Leadership & Vision
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Empowered Leadership, Unmatched Customer Trust
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Our executive and operational leadership team combines decades of industry experience, financial discipline, and tech innovation to power your financial growth.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
