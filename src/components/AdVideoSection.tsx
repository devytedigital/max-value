"use client";

import { motion } from "framer-motion";
import { QrCode, Play, ShieldCheck, Zap, Smartphone, Sparkles, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";

export default function AdVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-transparent z-20 overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#147FC3]/5 blur-[120px]" />
        <div className="absolute bottom-0 right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#FCA038]/5 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight"
          >
            Experience <span className="text-[#147FC3]">MaxValue</span> in Action
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-600 text-sm md:text-base mt-3 leading-relaxed"
          >
            Watch our official commercial video to explore our financial solutions, and scan the QR code for quick payment and digital access.
          </motion.p>
        </div>

        {/* Main Content Grid: Video Player (Left 7 cols) & Dedicated QR Code Space (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT: Video Player Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="relative flex-1 w-full rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-200/80 shadow-2xl group min-h-[320px] md:min-h-[420px] flex items-center justify-center">
              
              {/* HTML5 Video Element */}
              <video
                ref={videoRef}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover rounded-3xl"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/maxvalue ads.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Custom Play Overlay Button (Visible before playing) */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-black/20"
                >
                  <div className="w-20 h-20 rounded-full bg-[#147FC3] text-white flex items-center justify-center shadow-2xl shadow-[#147FC3]/50 transition-all duration-300 transform group-hover:scale-110 border-2 border-white/40">
                    <Play className="w-8 h-8 fill-white translate-x-0.5" />
                  </div>
                  <span className="text-white text-xs font-extrabold uppercase tracking-widest mt-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                    Watch Commercial
                  </span>
                </div>
              )}

              {/* Corner Badge */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="bg-[#147FC3]/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 shadow-md">
                  Official Ad
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Dedicated QR Code Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="h-full rounded-3xl bg-white/90 backdrop-blur-xl border border-zinc-200/90 shadow-xl p-6 md:p-8 flex flex-col items-center text-center justify-between relative overflow-hidden group">
              
              {/* Subtle top decoration gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#147FC3] via-[#FCA038] to-[#147FC3]" />

              {/* Card Header */}
              <div className="w-full mb-6">
                <div className="inline-flex items-center gap-1.5 text-[#FCA038] text-xs font-bold uppercase tracking-wider mb-1">
                  <QrCode className="w-4 h-4" />
                  Quick Scan & Connect
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-zinc-900 tracking-tight">
                  Instant Payment & Digital Access
                </h3>
                <p className="text-zinc-500 text-xs md:text-sm mt-1">
                  Scan the QR code with any mobile camera or UPI app for fast digital services.
                </p>
              </div>

              {/* QR Code Container with Scanner Frame Styling */}
              <div className="relative my-2 p-4 bg-gradient-to-b from-zinc-50 to-zinc-100 rounded-2xl border border-zinc-200 shadow-inner group-hover:border-[#147FC3]/40 transition-colors duration-300">
                {/* Scanner Frame Corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#147FC3] rounded-tl-sm" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#147FC3] rounded-tr-sm" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#147FC3] rounded-bl-sm" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#147FC3] rounded-br-sm" />

                {/* QR Code Image */}
                <div className="w-44 h-44 md:w-52 md:h-52 relative overflow-hidden rounded-xl bg-white p-2 shadow-sm">
                  <img
                    src="/qr-code-pay.jpg"
                    alt="MaxValue Quick Scan QR Code"
                    className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Feature Highlights Grid */}
              <div className="w-full grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-zinc-100">
                <div className="flex flex-col items-center">
                  <Zap className="w-4 h-4 text-[#FCA038] mb-1" />
                  <span className="text-[10px] font-bold text-zinc-700">Instant</span>
                </div>
                <div className="flex flex-col items-center border-x border-zinc-100">
                  <ShieldCheck className="w-4 h-4 text-[#147FC3] mb-1" />
                  <span className="text-[10px] font-bold text-zinc-700">Secure</span>
                </div>
                <div className="flex flex-col items-center">
                  <Smartphone className="w-4 h-4 text-[#FCA038] mb-1" />
                  <span className="text-[10px] font-bold text-zinc-700">UPI / Mobile</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
