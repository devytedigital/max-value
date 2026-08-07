"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon,
  Loader2,
  Calendar,
  Tag,
  X,
  Maximize2
} from "lucide-react";

export default function GalleryDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = typeof (params as any).then === "function" ? use(params as Promise<{ id: string }>) : (params as { id: string });
  const galleryId = resolvedParams?.id;

  const [currentGallery, setCurrentGallery] = useState<any>(null);
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [dragDirection, setDragDirection] = useState(0); // -1 = left, 1 = right

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

        const resList = await fetch("/api/media");
        if (resList.ok) {
          const dataList = await resList.json();
          setAlbums(dataList);
        }
      } catch (error) {
        console.error("Failed to load gallery details:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [galleryId]);

  // Robustly resolve images array
  const imagesList: { url: string; caption: string }[] = currentGallery?.images && currentGallery.images.length > 0 
    ? currentGallery.images 
    : currentGallery 
      ? [{ url: currentGallery.image, caption: "Cover Photo" }]
      : [];

  // Disable body scroll when lightbox is active
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen || imagesList.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, imagesList.length]);

  const handleNext = () => {
    if (imagesList.length === 0) return;
    setDragDirection(1);
    setCurrentIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrev = () => {
    if (imagesList.length === 0) return;
    setDragDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Find next/prev albums
  const currentAlbumIndex = albums.findIndex(item => item.id === currentGallery?.id);
  const prevAlbum = currentAlbumIndex !== -1 ? albums[(currentAlbumIndex - 1 + albums.length) % albums.length] : null;
  const nextAlbum = currentAlbumIndex !== -1 ? albums[(currentAlbumIndex + 1) % albums.length] : null;

  const slideVariants: any = {
    enter: (direction: number) => ({
      x: direction > 0 ? 250 : -250,
      opacity: 0,
      scale: 0.97
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 250 : -250,
      opacity: 0,
      scale: 0.97,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-950 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">
        <Navbar />
        <main className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 bg-transparent flex-1" />
        <Footer />
      </div>
    );
  }

  if (!currentGallery) {
    return (
      <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-950 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">
        <Navbar />
        <main className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 bg-transparent flex flex-col items-center justify-center min-h-[60vh]">
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

  const renderPhotoGrid = () => {
    const len = imagesList.length;

    // Premium 5-Image Mosaic Grid
    if (len === 5) {
      return (
        <div className="w-full flex flex-col gap-1.5 sm:gap-2 md:gap-2.5">
          {/* Row 1: 2 Photos (1st is col-span-2, 2nd is col-span-1) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 md:gap-2.5 h-auto sm:h-[350px] md:h-[450px]">
            {/* Card 1: Wide Featured Cover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                setCurrentIndex(0);
                setLightboxOpen(true);
              }}
              className="sm:col-span-2 relative overflow-hidden border border-zinc-200/40 bg-zinc-50 shadow-3xs cursor-pointer group active:scale-99 transition-all h-[220px] sm:h-full"
            >
              <img src={imagesList[0].url} className="w-full h-full object-cover" alt="" loading="lazy" />
              {/* Fullscreen Trigger */}
              <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-zinc-950 shadow-sm">
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </motion.div>

            {/* Card 2: Tall Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              onClick={() => {
                setCurrentIndex(1);
                setLightboxOpen(true);
              }}
              className="sm:col-span-1 relative overflow-hidden border border-zinc-200/40 bg-zinc-50 shadow-3xs cursor-pointer group active:scale-99 transition-all h-[220px] sm:h-full"
            >
              <img src={imagesList[1].url} className="w-full h-full object-cover" alt="" loading="lazy" />
              {/* Fullscreen Trigger */}
              <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-zinc-950 shadow-sm">
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </motion.div>
          </div>

          {/* Row 2: 3 Photos (Equal columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 md:gap-2.5 h-auto sm:h-[250px] md:h-[350px]">
            {imagesList.slice(2, 5).map((img, idx) => {
              const actualIdx = idx + 2;
              return (
                <motion.div
                  key={actualIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: actualIdx * 0.05 }}
                  onClick={() => {
                    setCurrentIndex(actualIdx);
                    setLightboxOpen(true);
                  }}
                  className="relative overflow-hidden border border-zinc-200/40 bg-zinc-50 shadow-3xs cursor-pointer group active:scale-99 transition-all h-[180px] sm:h-full"
                >
                  <img src={img.url} className="w-full h-full object-cover" alt="" loading="lazy" />
                  {/* Fullscreen Trigger */}
                  <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-zinc-950 shadow-sm">
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      );
    }

    // Premium 10-Image Mosaic Grid
    if (len === 10) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-1.5 sm:gap-2 md:gap-2.5 h-auto md:h-[700px]">
          {/* Top Row: 2 large landscape cards */}
          {imagesList.slice(0, 2).map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => {
                setCurrentIndex(idx);
                setLightboxOpen(true);
              }}
              className="md:col-span-2 md:row-span-1 relative overflow-hidden border border-zinc-200/40 bg-zinc-50 shadow-3xs cursor-pointer group active:scale-99 transition-all h-[180px] sm:h-[230px] md:h-full"
            >
              <img src={img.url} className="w-full h-full object-cover" alt="" loading="lazy" />
              {/* Fullscreen Trigger */}
              <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-zinc-955 shadow-sm">
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </motion.div>
          ))}

          {/* Next 8 smaller cards in 2 rows of 4 columns */}
          {imagesList.slice(2, 10).map((img, idx) => {
            const actualIdx = idx + 2;
            return (
              <motion.div
                key={actualIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: actualIdx * 0.05 }}
                onClick={() => {
                  setCurrentIndex(actualIdx);
                  setLightboxOpen(true);
                }}
                className="md:col-span-1 md:row-span-1 relative overflow-hidden border border-zinc-200/40 bg-zinc-50 shadow-3xs cursor-pointer group active:scale-99 transition-all h-[130px] sm:h-[180px] md:h-full"
              >
                <img src={img.url} className="w-full h-full object-cover" alt="" loading="lazy" />
                {/* Fullscreen Trigger */}
                <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-zinc-950 shadow-sm">
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    }

    // Default Masonry Grid Fallback
    return (
      <div className="columns-1 sm:columns-2 md:columns-3 gap-1.5 sm:gap-2 md:gap-2.5 [column-fill:_balance]">
        {imagesList.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onClick={() => {
              setCurrentIndex(idx);
              setLightboxOpen(true);
            }}
            className="break-inside-avoid mb-1.5 sm:mb-2 md:mb-2.5 relative overflow-hidden border border-zinc-200/40 bg-zinc-50 shadow-3xs cursor-pointer group active:scale-99 transition-all"
          >
            <img
              src={img.url}
              alt={img.caption || `Photo ${idx + 1}`}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            {/* Fullscreen Trigger */}
            <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-zinc-955 shadow-sm">
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-950 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans flex flex-col justify-between">
      
      {/* Navbar */}
      <Navbar />

      <main className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 bg-transparent flex-1">
        
        {/* TOP HEADER SECTION */}
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 mb-8 pt-8">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-850 tracking-wide leading-tight text-left">
            {currentGallery.title}
          </h1>
        </div>

        {/* PHOTO ALBUM GRID - TOUCHING LEFT & RIGHT MARGINS */}
        <div className="w-full max-w-none px-0 sm:px-1.5 md:px-3">
          {renderPhotoGrid()}
        </div>

      </main>

      {/* FULLSCREEN LIGHTBOX SLIDESHOW WITH SWIPE AND BOTTOM THUMBNAIL TRACK */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/98 backdrop-blur-md z-[9999] flex flex-col justify-between py-6 select-none"
          >
            
            {/* Top Close bar */}
            <div className="w-full px-6 flex items-center justify-between text-white shrink-0">
              <div className="text-left">
                <h4 className="text-xs md:text-sm font-bold truncate max-w-xs md:max-w-md">{currentGallery.title}</h4>
                <p className="text-[10px] text-zinc-400 mt-0.5 font-semibold">Photo {currentIndex + 1} of {imagesList.length}</p>
              </div>

              <button
                onClick={() => setLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-zinc-950 flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-white/15"
                title="Close Fullscreen (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle Main Viewport Stage with Swipe controls */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden px-4 md:px-16 my-4">
              
              {/* Left Arrow Trigger */}
              <button
                onClick={handlePrev}
                className="absolute left-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer z-20 active:scale-95 hidden sm:flex"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Immersive Photo Stage */}
              <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center">
                <AnimatePresence initial={false} custom={dragDirection} mode="popLayout">
                  <motion.div
                    key={currentIndex}
                    custom={dragDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.5}
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                  >
                    <img
                      src={imagesList[currentIndex]?.url}
                      alt={imagesList[currentIndex]?.caption || `Photo ${currentIndex + 1}`}
                      className="max-w-full max-h-full object-contain rounded-2xl drop-shadow-2xl select-none pointer-events-none"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Arrow Trigger */}
              <button
                onClick={handleNext}
                className="absolute right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer z-20 active:scale-95 hidden sm:flex"
                title="Next (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Bottom Panel: Description + Horizontal scrollable previews */}
            <div className="w-full shrink-0 flex flex-col items-center justify-center gap-3">
              
              {/* Photo Caption text */}
              {imagesList[currentIndex]?.caption ? (
                <p className="text-white text-xs md:text-sm font-semibold max-w-xl text-center leading-relaxed px-6 drop-shadow-md line-clamp-2">
                  {imagesList[currentIndex].caption}
                </p>
              ) : (
                <div className="h-4" />
              )}

              {/* Horizontal Scrollable preview track */}
              <div className="w-full max-w-4xl mx-auto px-6">
                <div className="flex items-center gap-2.5 overflow-x-auto py-2.5 justify-start sm:justify-center scrollbar-thin scrollbar-thumb-white/20">
                  {imagesList.map((img, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setDragDirection(idx > currentIndex ? 1 : -1);
                          setCurrentIndex(idx);
                        }}
                        className={`relative h-12 md:h-14 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          isActive 
                            ? "border-[#147FC3] ring-4 ring-[#147FC3]/15 scale-102 shadow-md" 
                            : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                        }`}
                      >
                        <img 
                          src={img.url} 
                          className="w-full h-full object-cover select-none pointer-events-none" 
                          alt="" 
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />

    </div>
  );
}
