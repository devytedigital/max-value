"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Image as ImageIcon, Loader2, Calendar, Tag } from "lucide-react";

export default function GalleryDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = typeof (params as any).then === "function" ? use(params as Promise<{ id: string }>) : (params as { id: string });
  const galleryId = resolvedParams?.id;

  const [currentGallery, setCurrentGallery] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!galleryId) return;
    async function loadData() {
      try {
        setLoading(true);
        const resSingle = await fetch(`/api/media/${galleryId}`);
        if (resSingle.ok) {
          const dataSingle = await resSingle.json();
          setCurrentGallery(dataSingle);
        }
      } catch (error) {
        console.error("Failed to load gallery details:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [galleryId]);

  // Robustly extract all gallery images
  const extractImages = (): { url: string; caption?: string }[] => {
    let list: { url: string; caption?: string }[] = [];

    if (currentGallery?.images && Array.isArray(currentGallery.images) && currentGallery.images.length > 0) {
      list = currentGallery.images.map((item: any) =>
        typeof item === "string"
          ? { url: item, caption: "" }
          : { url: item.url || item.image || "", caption: item.caption || "" }
      ).filter((img: { url: string; caption?: string }) => Boolean(img.url));
    }

    if (currentGallery?.image && !list.some((img: { url: string; caption?: string }) => img.url === currentGallery.image)) {
      list.unshift({ url: currentGallery.image, caption: currentGallery.title || "Cover Photo" });
    }

    return list;
  };

  const imagesList = extractImages();

  // Keyboard navigation
  useEffect(() => {
    if (imagesList.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [imagesList.length]);

  const handleNext = () => {
    if (imagesList.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrev = () => {
    if (imagesList.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-950 font-sans flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20">
          <Loader2 className="w-8 h-8 text-[#147FC3] animate-spin" />
          <span className="text-xs font-bold text-zinc-500 mt-4 uppercase tracking-widest">
            Loading Gallery...
          </span>
        </main>
        <Footer />
      </div>
    );
  }

  if (!currentGallery) {
    return (
      <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-950 font-sans flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20">
          <ImageIcon className="w-12 h-12 text-zinc-300 mb-4" />
          <h3 className="text-lg font-bold text-zinc-950">Gallery Album Not Found</h3>
          <p className="text-xs text-zinc-500 font-semibold mt-1">
            The requested gallery album does not exist.
          </p>
          <Link href="/media" className="mt-6 text-xs font-bold text-[#147FC3] hover:underline">
            Back to Media Gallery
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-950 font-sans flex flex-col justify-between selection:bg-[#147FC3] selection:text-white">
      {/* 3-Tier Navbar */}
      <Navbar />

      <main className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 bg-transparent flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Top Bar Navigation */}
          <div className="mb-6">
            <Link
              href="/media"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-[#147FC3] hover:text-[#FCA038] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Media Gallery
            </Link>
          </div>

          {/* Album Title Header */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              {currentGallery.title}
            </h1>
            {currentGallery.date && (
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-zinc-500 mt-2">
                <Calendar className="w-3.5 h-3.5 text-[#FCA038]" />
                <span>{currentGallery.date}</span>
                {currentGallery.category && (
                  <>
                    <span className="text-zinc-300">•</span>
                    <Tag className="w-3.5 h-3.5 text-[#147FC3]" />
                    <span>{currentGallery.category}</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* MAIN IMAGE DISPLAY (Large central view) */}
          <div className="relative w-full max-w-5xl mx-auto bg-zinc-900/90 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/80 flex items-center justify-center h-[340px] sm:h-[460px] md:h-[540px] lg:h-[600px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={imagesList[currentIndex]?.url}
                alt={imagesList[currentIndex]?.caption || currentGallery.title}
                initial={{ opacity: 0.75, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.75, scale: 0.99 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full object-contain select-none bg-black/95"
              />
            </AnimatePresence>
          </div>

          {/* THUMBNAILS ROW & LEFT/RIGHT ARROW NAVIGATION CONTROLS */}
          <div className="w-full max-w-5xl mx-auto mt-6 md:mt-8 flex items-center justify-center gap-2 sm:gap-4 md:gap-6 select-none">
            
            {/* Left Navigation Arrow Button */}
            <button
              onClick={handlePrev}
              className="p-2 sm:p-3 rounded-lg text-zinc-700 hover:text-black hover:bg-zinc-200/70 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Previous Image"
              title="Previous Image"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 sm:w-8 sm:h-8 fill-zinc-700 hover:fill-zinc-950 transition-colors"
              >
                <polygon points="16,4 6,12 16,20" />
              </svg>
            </button>

            {/* Thumbnails Row */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4 overflow-x-auto py-2 px-2 max-w-full scrollbar-thin">
              {imagesList.map((img, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-16 h-12 sm:w-20 sm:h-15 md:w-24 md:h-18 shrink-0 overflow-hidden transition-all cursor-pointer rounded-sm ${
                      isActive
                        ? "border-2 border-zinc-950 shadow-lg scale-105"
                        : "border border-zinc-300 opacity-60 hover:opacity-100 hover:border-zinc-500"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.caption || `Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover select-none"
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Navigation Arrow Button */}
            <button
              onClick={handleNext}
              className="p-2 sm:p-3 rounded-lg text-zinc-700 hover:text-black hover:bg-zinc-200/70 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Next Image"
              title="Next Image"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 sm:w-8 sm:h-8 fill-zinc-700 hover:fill-zinc-950 transition-colors"
              >
                <polygon points="8,4 18,12 8,20" />
              </svg>
            </button>

          </div>

          {/* Photo Counter and Optional Caption */}
          <div className="text-center mt-4">
            <span className="text-xs md:text-sm font-semibold text-zinc-500">
              {currentIndex + 1} of {imagesList.length}
            </span>
            {imagesList[currentIndex]?.caption && (
              <p className="text-xs md:text-sm font-bold text-zinc-800 mt-1">
                {imagesList[currentIndex].caption}
              </p>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
