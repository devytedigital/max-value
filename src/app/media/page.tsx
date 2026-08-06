"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { galleryItems } from "@/data/galleryData";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Image as ImageIcon, PlayCircle, X, ArrowRight } from "lucide-react";

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<"image" | "video" | "download">("image");
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const videos = [
    {
      category: "Corporate Video",
      title: "MaxValue Corporate Film 2026",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-people-meeting-around-table-26036-large.mp4",
    },
    {
      category: "Client Success",
      title: "Gold Loan Processing Customer Story",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-gold-bars-close-up-40540-large.mp4",
    },
    {
      category: "Annual Meet",
      title: "Annual General Meet Highlights",
      thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-people-meeting-around-table-26036-large.mp4",
    },
    {
      category: "Highlights",
      title: "Inauguration Ceremony Summary",
      thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-gold-bars-close-up-40540-large.mp4",
    },
    {
      category: "CSR Video",
      title: "Community Outreach Highlights",
      thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-people-meeting-around-table-26036-large.mp4",
    },
    {
      category: "Product Guide",
      title: "Gold Loan Application Process Guide",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-gold-bars-close-up-40540-large.mp4",
    },
    {
      category: "Event Stream",
      title: "TARANG 2025 Event Recap Stream",
      thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-people-meeting-around-table-26036-large.mp4",
    },
    {
      category: "Training Seminar",
      title: "Customer Relations Management Seminar",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-people-meeting-around-table-26036-large.mp4",
    },
  ];

  const downloads = [
    { name: "Interest Policy", type: "PDF Document", size: "1.2 MB", href: "#" },
    { name: "Privacy Policy", type: "PDF Document", size: "845 KB", href: "#" },
    { name: "Fair Practices Code", type: "PDF Document", size: "2.1 MB", href: "#" },
    { name: "Recovery Policy", type: "PDF Document", size: "1.5 MB", href: "#" },
    { name: "Charges & Fees Structure", type: "PDF Document", size: "620 KB", href: "#" },
  ];

  const tabs = [
    {
      id: "image" as const,
      label: "Image Gallery",
      icon: (isActive: boolean) => <ImageIcon className={`h-4.5 w-4.5 transition-colors ${isActive ? "text-[#FCA038]" : "text-zinc-500"}`} />,
    },
    {
      id: "video" as const,
      label: "Video Gallery",
      icon: (isActive: boolean) => <PlayCircle className={`h-4.5 w-4.5 transition-colors ${isActive ? "text-[#FCA038]" : "text-zinc-500"}`} />,
    },
    {
      id: "download" as const,
      label: "Downloads",
      icon: (isActive: boolean) => <Download className={`h-4.5 w-4.5 transition-colors ${isActive ? "text-[#FCA038]" : "text-zinc-500"}`} />,
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-zinc-950 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">

      {/* 3-Tier Navbar */}
      <Navbar />

      <main className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 bg-white">

        {/* Modern Segmented Control Tab Switcher */}
        <div className="flex justify-center mb-16 px-6">
          <div className="inline-flex p-1 bg-zinc-100 rounded-full border border-zinc-200/60 shadow-inner relative flex-wrap sm:flex-nowrap justify-center max-w-full">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-colors duration-300 z-10 ${isActive ? "text-white" : "text-zinc-550 hover:text-zinc-900"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-[#147FC3] rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {tab.icon(isActive)}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">

            {/* IMAGE GALLERY CONTENT */}
            {activeTab === "image" && (
              <motion.div
                key="image-gallery"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 w-full"
              >
                {galleryItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/media/gallery/${item.id}`}
                    className="flex flex-col bg-transparent group cursor-pointer text-left"
                  >
                    <div className="w-full aspect-[16/10] overflow-hidden relative border border-zinc-200/80 bg-zinc-50 shadow-xs hover:shadow-xl transition-all duration-300 rounded-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Hover Overlay Badge */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                          View Gallery ({item.images.length} Photos) <ArrowRight className="w-3.5 h-3.5 text-[#FCA038]" />
                        </span>
                      </div>
                    </div>
                    {/* Details */}
                    <div className="pt-4 text-left">
                      <span className="text-[11px] font-semibold text-zinc-500 tracking-wider uppercase">
                        {item.category}
                      </span>
                      <h3 className="text-[13px] md:text-[14px] font-extrabold text-zinc-900 mt-1.5 tracking-wider uppercase leading-snug group-hover:text-[#147FC3] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}

            {/* VIDEO GALLERY CONTENT */}
            {activeTab === "video" && (
              <motion.div
                key="video-gallery"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 w-full"
              >
                {videos.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => setActiveVideoUrl(item.videoUrl)}
                    className="flex flex-col bg-transparent cursor-pointer group text-left"
                  >
                    <div className="w-full aspect-[16/10] overflow-hidden relative border border-zinc-200/80 bg-zinc-50 shadow-xs hover:shadow-md transition-shadow duration-300 rounded-xl">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/45 transition-colors duration-300">
                        <PlayCircle className="h-12 w-12 text-white drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    </div>
                    {/* Left-aligned details */}
                    <div className="pt-4 text-left">
                      <span className="text-[11px] font-semibold text-zinc-500 tracking-wider uppercase">
                        {item.category}
                      </span>
                      <h3 className="text-[13px] md:text-[14px] font-extrabold text-zinc-900 mt-1.5 tracking-wider uppercase leading-snug group-hover:text-[#147FC3] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* DOWNLOADS CONTENT */}
            {activeTab === "download" && (
              <motion.div
                key="downloads-list"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto"
              >
                {downloads.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between p-5 bg-zinc-50 border border-zinc-200/60 rounded-2xl shadow-xs hover:bg-zinc-100/50 hover:border-zinc-300 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-red-50 text-red-500 border border-red-100">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-[14px] md:text-[15px] font-bold text-zinc-900">
                          {doc.name}
                        </h4>
                        <span className="text-[11px] font-semibold text-zinc-500 mt-1 block">
                          {doc.type} • {doc.size}
                        </span>
                      </div>
                    </div>

                    <a
                      href={doc.href}
                      className="p-3 rounded-full text-zinc-500 hover:text-white bg-white hover:bg-[#147FC3] border border-zinc-200 hover:border-[#147FC3] transition-all duration-300 cursor-pointer shadow-xs"
                      title="Download Document"
                    >
                      <Download className="h-4.5 w-4.5" />
                    </a>
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>

      {/* Video Playback Modal */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/95 text-white hover:text-[#FCA038] z-20 cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <video
                src={activeVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />

    </div>
  );
}
