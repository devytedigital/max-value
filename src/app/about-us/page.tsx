"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function AboutUsPage() {
  const values = [
    {
      title: "BE INNOVATIVE WITH OUR PRODUCTS",
      desc: "Never missing a beat in what is happening in the world of financial services, or how the needs of consumers of financial services are evolving, our team is constantly innovating and perfecting our range of products on offer, to make sure our customers get the best bang for their buck.",
    },
    {
      title: "OFFER UNPARALLELED QUALITY SERVICES",
      desc: "Every step in our business processes have been optimized and vetted to give our clients the best experience, and we're always working to ensure our services are hassle-free and efficient.",
    },
    {
      title: "ALWAYS LOOK OUT FOR THE COMMON MAN",
      desc: "We are firm believers in the power of the common man and their aspirations, and at MaxValue, we toil to keep their best interests at heart in everything we do.",
    },
    {
      title: "PROVIDE HOLISTIC COUNSEL",
      desc: "Featuring a team combining exhaustive and varied experiences in the field of financial services, we work diligently to provide our patrons a bird's eye view of their financial performance.",
    },
    {
      title: "SUPPORT OUR CUSTOMERS FOR LIFE",
      desc: "At MaxValue, we make customers for life. They are our best ambassadors, and we value them and their support in our everyday functions.",
    },
  ];

  // Document download section muted as requested
  // const documents = [
  //   { name: "Interest Policy", href: "#" },
  //   { name: "Privacy Policy", href: "#" },
  //   { name: "Fair Practices Code", href: "#" },
  //   { name: "Recovery Policy", href: "#" },
  //   { name: "Charges", href: "#" },
  // ];

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-950 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">
      {/* 3-Tier Navbar */}
      <Navbar />

      {/* FULL-SCREEN HERO BANNER — matches Board of Directors banner style */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image — no color overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/ckam7yhu/image/upload/f_auto,q_auto/v1788164583/abouthero.png"
            alt="About Us Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle bottom darkening only, for text legibility — no color tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 text-center flex flex-col items-center">
          {/* Clean text directly over the image — no box, no background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider uppercase text-white leading-none"
              style={{
                textShadow:
                  "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              ABOUT US
            </h1>
          </motion.div>
        </div>

        {/* Curved Bottom Wave Separator — matches Board of Directors banner */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#FAF9F6] [clip-path:ellipse(65%_100%_at_50%_100%)] z-10" />
      </section>

      {/* SECTION 1: TRUST & DEPENDABILITY */}
      <section className="relative w-full pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28 bg-transparent">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,127,195,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,127,195,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start text-left"
          >
            <h2 className="text-[#147FC3] font-black text-2xl md:text-3xl lg:text-4xl tracking-tight uppercase leading-snug mb-6">
              BE CELEBRATED FOR OUR TRUST AND DEPENDABILITY
            </h2>
            <p className="text-zinc-700 text-sm md:text-base leading-relaxed text-justify mb-10 max-w-4xl">
              MAXVALUE Credits & Investments Ltd. is an innovative venture
              providing high quality financial services to the common man. The
              team behind this venture draws from various walks of life having
              longstanding experience and expertise in different areas of
              financial services. Our products are designed to keep a long and
              enriching relationship with our valued customers. Our vision is
              to become one of the best providers of superior financial
              services to common man and to build their trust and confidence
              in the most professional manner.
            </p>

            {/* Aligned 30th Logo and Corporate Highlights */}
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-8 w-full">
              {/* 30th Logo with mix-blend-multiply for transparent blending */}
              <div className="relative w-44 sm:w-52 shrink-0 select-none mix-blend-multiply">
                <img
                  src="https://res.cloudinary.com/ckam7yhu/image/upload/v1788428040/about_page_30years_badge.png"
                  alt="30 Years of Excellence"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Highlights List */}
              <div className="flex flex-col gap-5 text-left border-l border-zinc-200 pl-6 sm:pl-8 flex-1">
                <div className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FCA038] mt-1.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-black text-[#147FC3] tracking-wide uppercase">
                      30 Years of Legacy
                    </h4>
                    <p className="text-zinc-600 text-xs sm:text-sm mt-0.5">
                      Empowering communities with trusted financial solutions
                      since inception.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FCA038] mt-1.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-black text-[#147FC3] tracking-wide uppercase">
                      Deep Regional Presence
                    </h4>
                    <p className="text-zinc-600 text-xs sm:text-sm mt-0.5">
                      Serving thousands of happy clients across Kerala, Tamilnadu, Karnataka, and Andhra Pradesh.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: MISSION & VISION */}
      <section className="w-full py-20 md:py-24 bg-[#0c141c] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#147FC3]/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Mission Content */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col justify-start text-left hover:border-[#FCA038]/40 transition-colors"
            >
              <h3 className="text-white font-black text-xl md:text-2xl tracking-wide uppercase border-l-4 border-[#FCA038] pl-4 mb-4">
                Our Mission
              </h3>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed text-justify">
                Maxvalue Credits and Investments Ltd. strives to enable our
                patrons to achieve financial freedom to fulfill their dreams, by
                empowering them with our subject matter expertise in the domain of
                non-banking financial services, backed by our global scale.
              </p>
            </motion.div>

            {/* Vision Content */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col justify-start text-left hover:border-[#FCA038]/40 transition-colors"
            >
              <h3 className="text-white font-black text-xl md:text-2xl tracking-wide uppercase border-l-4 border-[#FCA038] pl-4 mb-4">
                Our Vision
              </h3>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed text-justify">
                Be the preferred first choice partner in non-banking financial
                services for people and businesses globally.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR VALUES */}
      <section className="relative w-full py-20 md:py-24 overflow-hidden">
        {/* Teamwork background image */}
        <img
          src="https://res.cloudinary.com/ckam7yhu/image/upload/f_auto,q_auto/v1788164705/values-bg.jpg"
          alt="Our Values"
          className="absolute inset-0 w-full h-full object-cover select-none"
        />
        {/* Dark warm overlay */}
        <div className="absolute inset-0 bg-[#3c1d0c]/85 md:bg-black/80 z-0" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white font-black text-3xl md:text-4xl tracking-tight mb-16 text-left"
          >
            Our Values
          </motion.h2>

          {/* Responsive grid of values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex gap-4 items-start text-left"
              >
                {/* Arrow Icon in circle */}
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#147FC3] shrink-0 shadow-md">
                  <ArrowRight className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="text-white font-black text-sm md:text-base tracking-wide uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed text-justify max-w-xl">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: POLICY DOWNLOADS (MUTED AS REQUESTED) */}
      {/*
      <section className="relative w-full py-16 md:py-20 bg-transparent">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#147FC3_0%,transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
            {documents.map((doc, idx) => (
              <motion.a
                key={idx}
                href={doc.href}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-md group-hover:shadow-lg transition-all duration-300 flex items-center justify-center text-[#FCA038] group-hover:scale-105 border border-zinc-100">
                  <Download className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] md:text-xs font-black tracking-wider text-zinc-950 uppercase mt-4 group-hover:text-[#147FC3] transition-colors text-center max-w-[130px] leading-tight">
                  {doc.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
