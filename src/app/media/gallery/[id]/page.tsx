"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { galleryItems } from "@/data/galleryData";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Image as ImageIcon,
  Calendar,
  Tag,
  Grid
} from "lucide-react";

export default function GalleryDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = typeof (params as any).then === "function" ? use(params as Promise<{ id: string }>) : (params as { id: string });
  const galleryId = resolvedParams?.id;
  const gallery = galleryItems.find((item) => item.id === galleryId);

  if (!gallery) {
    // Fallback to first if not found or display clean fallback
  }

  const currentGallery = gallery || galleryItems[0];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-sliding interval (3.5 seconds)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentGallery.images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, currentGallery.images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGallery.images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentGallery.images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + currentGallery.images.length) % currentGallery.images.length);
  };

  // Find next/prev albums
  const currentAlbumIndex = galleryItems.findIndex(item => item.id === currentGallery.id);
  const prevAlbum = galleryItems[(currentAlbumIndex - 1 + galleryItems.length) % galleryItems.length];
  const nextAlbum = galleryItems[(currentAlbumIndex + 1) % galleryItems.length];

  return (
    <div className="relative min-h-screen bg-white text-zinc-950 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">
      
      {/* Navbar */}
      <Navbar />

      <main className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 bg-white">
        
        {/* TOP NAVIGATION & HEADER SECTION */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
          
          <Link 
            href="/media" 
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-zinc-500 hover:text-[#147FC3] transition-colors mb-6 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Media Gallery</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-left border-b border-zinc-200/80 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#147FC3]/10 text-[#147FC3] text-xs font-bold uppercase tracking-wider">
                  <Tag className="w-3.5 h-3.5" />
                  {currentGallery.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-zinc-400 text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  {currentGallery.date}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight uppercase leading-tight">
                {currentGallery.title}
              </h1>

              <p className="text-zinc-600 text-xs md:text-sm leading-relaxed mt-3 max-w-3xl">
                {currentGallery.description}
              </p>
            </div>

            {/* Slider Controls Top Summary */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 text-zinc-700 text-xs font-bold hover:bg-zinc-50 hover:text-[#147FC3] transition-all cursor-pointer shadow-xs"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#FCA038]" />
                    <span>Pause Slideshow</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#147FC3]" />
                    <span>Auto Play</span>
                  </>
                )}
              </button>

              <div className="px-3.5 py-1.5 bg-zinc-100 border border-zinc-200 rounded-full text-xs font-bold text-zinc-700">
                {currentIndex + 1} / {currentGallery.images.length}
              </div>
            </div>

          </div>

        </div>

        {/* FEATURED STAGE CAROUSEL */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[620px] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-200/90 shadow-2xl group">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={currentGallery.images[currentIndex].url} 
                  alt={currentGallery.images[currentIndex].caption} 
                  className="w-full h-full object-cover"
                />
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              </motion.div>
            </AnimatePresence>

            {/* Left & Right Arrow Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white text-white hover:text-zinc-900 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer active:scale-95 z-20 opacity-90 group-hover:opacity-100"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white text-white hover:text-zinc-900 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer active:scale-95 z-20 opacity-90 group-hover:opacity-100"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Caption Overlay at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-white text-sm md:text-base font-bold drop-shadow-md">
                  {currentGallery.images[currentIndex].caption}
                </p>
                <p className="text-white/60 text-xs mt-0.5">
                  Photo {currentIndex + 1} of {currentGallery.images.length} • {currentGallery.title}
                </p>
              </div>

              {/* Progress Indicator dots */}
              <div className="flex items-center gap-2">
                {currentGallery.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex 
                        ? "w-8 bg-[#FCA038]" 
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* THUMBNAIL PREVIEWS STRIP */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4 text-left">
              <span className="text-xs font-black uppercase text-zinc-400 tracking-wider flex items-center gap-2">
                <Grid className="w-4 h-4 text-[#147FC3]" />
                Gallery Thumbnails
              </span>
              <span className="text-xs text-zinc-500">
                Click any thumbnail to preview
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
              {currentGallery.images.map((img, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer text-left group ${
                      isActive 
                        ? "border-[#147FC3] ring-4 ring-[#147FC3]/20 scale-[1.02] shadow-md" 
                        : "border-zinc-200 opacity-70 hover:opacity-100 hover:border-zinc-400"
                    }`}
                  >
                    <img 
                      src={img.url} 
                      alt={img.caption} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-[#147FC3]/20 border border-white/40 rounded-xl" />
                    )}
                    <span className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-bold text-white backdrop-blur-xs">
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* OTHER GALLERIES NAVIGATION */}
          <div className="mt-20 pt-10 border-t border-zinc-200/80">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              
              <Link 
                href={`/media/gallery/${prevAlbum.id}`}
                className="w-full sm:w-auto flex items-center gap-4 p-4 rounded-2xl border border-zinc-200 hover:border-[#147FC3] bg-zinc-50/60 hover:bg-white transition-all duration-300 group cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 group-hover:bg-[#147FC3] group-hover:text-white transition-colors shrink-0">
                  <ChevronLeft className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Previous Album</span>
                  <span className="text-xs font-bold text-zinc-800 group-hover:text-[#147FC3] transition-colors line-clamp-1">
                    {prevAlbum.title}
                  </span>
                </div>
              </Link>

              <Link 
                href="/media"
                className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-[#147FC3] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                All Photo Albums
              </Link>

              <Link 
                href={`/media/gallery/${nextAlbum.id}`}
                className="w-full sm:w-auto flex items-center justify-end gap-4 p-4 rounded-2xl border border-zinc-200 hover:border-[#147FC3] bg-zinc-50/60 hover:bg-white transition-all duration-300 group cursor-pointer text-right"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Next Album</span>
                  <span className="text-xs font-bold text-zinc-800 group-hover:text-[#147FC3] transition-colors line-clamp-1">
                    {nextAlbum.title}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 group-hover:bg-[#147FC3] group-hover:text-white transition-colors shrink-0">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>

            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
