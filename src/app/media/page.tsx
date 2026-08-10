// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion, AnimatePresence } from "framer-motion";
// import { Download, FileText, Image as ImageIcon, PlayCircle, X, ArrowRight, Loader2 } from "lucide-react";

// export default function MediaPage() {
//   const [activeTab, setActiveTab] = useState<"image" | "video" | "download">("image");
//   const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
//   const [galleryItems, setGalleryItems] = useState<any[]>([]);
//   const [videoItems, setVideoItems] = useState<any[]>([]);
//   const [documentItems, setDocumentItems] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadData() {
//       try {
//         setLoading(true);
//         const [resMedia, resVideos, resDocs] = await Promise.all([
//           fetch("/api/media"),
//           fetch("/api/videos"),
//           fetch("/api/documents")
//         ]);

//         if (resMedia.ok) {
//           const mediaData = await resMedia.json();
//           setGalleryItems(mediaData);
//         }

//         if (resVideos.ok) {
//           const videoData = await resVideos.json();
//           setVideoItems(videoData);
//         }

//         if (resDocs.ok) {
//           const docData = await resDocs.json();
//           setDocumentItems(docData);
//         }
//       } catch (error) {
//         console.error("Failed to load media elements:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadData();
//   }, []);

//   const tabs = [
//     {
//       id: "image" as const,
//       label: "Image Gallery",
//       icon: (isActive: boolean) => <ImageIcon className={`h-4.5 w-4.5 transition-colors ${isActive ? "text-[#FCA038]" : "text-zinc-500"}`} />,
//     },
//     {
//       id: "video" as const,
//       label: "Video Gallery",
//       icon: (isActive: boolean) => <PlayCircle className={`h-4.5 w-4.5 transition-colors ${isActive ? "text-[#FCA038]" : "text-zinc-500"}`} />,
//     },
//     {
//       id: "download" as const,
//       label: "Downloads",
//       icon: (isActive: boolean) => <Download className={`h-4.5 w-4.5 transition-colors ${isActive ? "text-[#FCA038]" : "text-zinc-500"}`} />,
//     },
//   ];

//   return (
//     <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-950 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">

//       {/* 3-Tier Navbar */}
//       <Navbar />

//       {/* MEDIA HERO BANNER SECTION */}
//       <section className="relative w-full pt-20 md:pt-24 lg:pt-24 bg-transparent overflow-hidden">
//         <div className="max-w-[1440px] mx-auto px-4 md:px-6 pt-4 pb-4">
//           <motion.div
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-zinc-200/80 bg-zinc-900"
//           >
//             <img
//               src="/mediabanner.png"
//               alt="MaxValue Media Gallery Banner"
//               className="w-full h-auto object-cover min-h-[160px] sm:min-h-[220px] md:min-h-[300px] max-h-[480px]"
//             />
//           </motion.div>
//         </div>
//       </section>

//       <main className="relative w-full pt-6 pb-16 md:pt-8 md:pb-24 lg:pt-10 bg-transparent">

//         {/* Modern Segmented Control Tab Switcher */}
//         <div className="flex justify-center mb-16 px-6">
//           <div className="inline-flex p-1 bg-zinc-100 rounded-full border border-zinc-200/60 shadow-inner relative flex-wrap sm:flex-nowrap justify-center max-w-full">
//             {tabs.map((tab) => {
//               const isActive = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`relative px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-colors duration-300 z-10 ${isActive ? "text-white" : "text-zinc-550 hover:text-zinc-900"
//                     }`}
//                 >
//                   {isActive && (
//                     <motion.div
//                       layoutId="activeTabPill"
//                       className="absolute inset-0 bg-[#147FC3] rounded-full -z-10 shadow-sm"
//                       transition={{ type: "spring", stiffness: 380, damping: 30 }}
//                     />
//                   )}
//                   {tab.icon(isActive)}
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Tab Content Area */}
//         <div className="max-w-[1440px] mx-auto px-4 md:px-6">
//           <AnimatePresence mode="wait">

//             {/* IMAGE GALLERY CONTENT */}
//             {activeTab === "image" && (
//               <motion.div
//                 key="image-gallery"
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -15 }}
//                 transition={{ duration: 0.4 }}
//                 className="w-full flex justify-center"
//               >
//                 {loading ? (
//                   <div className="py-20 flex flex-col items-center justify-center">
//                     <Loader2 className="w-8 h-8 text-[#147FC3] animate-spin" />
//                     <span className="text-xs font-bold text-zinc-500 mt-4 uppercase tracking-widest">Loading Media Gallery...</span>
//                   </div>
//                 ) : galleryItems.length === 0 ? (
//                   <div className="py-20 text-center">
//                     <ImageIcon className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
//                     <h3 className="text-lg font-bold text-zinc-950">No Albums Found</h3>
//                     <p className="text-xs text-zinc-500 font-semibold max-w-sm mx-auto mt-1">
//                       Check back later, or add albums via the administrator console.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
//                     {galleryItems.map((item) => (
//                       <Link
//                         key={item.id}
//                         href={`/media/gallery/${item.id}`}
//                         className="flex flex-col bg-transparent group cursor-pointer text-left"
//                       >
//                         <div className="w-full aspect-[16/10] overflow-hidden relative border border-zinc-200/80 bg-zinc-50 shadow-xs hover:shadow-md transition-all duration-300">
//                           <img
//                             src={item.image}
//                             alt={item.title}
//                             className="w-full h-full object-cover"
//                             loading="lazy"
//                           />
//                         </div>
//                         {/* Details */}
//                         <div className="pt-4 text-left">
//                           <h3 className="text-[13px] md:text-[14px] font-extrabold text-zinc-900 tracking-wider uppercase leading-snug group-hover:text-[#147FC3] transition-colors line-clamp-2">
//                             {item.title}
//                           </h3>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </motion.div>
//             )}

//             {/* VIDEO GALLERY CONTENT */}
//             {activeTab === "video" && (
//               <motion.div
//                 key="video-gallery"
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -15 }}
//                 transition={{ duration: 0.4 }}
//                 className="w-full text-center"
//               >
//                 {videoItems.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center text-zinc-500 py-16">
//                     <PlayCircle className="w-12 h-12 text-zinc-300 mb-4" />
//                     <h3 className="text-base font-bold text-zinc-800">No Videos Uploaded</h3>
//                     <p className="text-xs text-zinc-400 font-semibold max-w-xs mt-1 leading-normal">
//                       Check back later for new corporate films, CSR videos, and event streams.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
//                     {videoItems.map((item) => (
//                       <div
//                         key={item.id}
//                         className="flex flex-col bg-transparent text-left"
//                       >
//                         <div className="w-full aspect-[16/10] overflow-hidden relative border border-zinc-200/80 bg-zinc-50 shadow-xs hover:shadow-md transition-shadow duration-300">
//                           {item.videoUrl.includes("youtube") || item.videoUrl.includes("youtu.be") || item.videoUrl.includes("/embed/") ? (
//                             <iframe
//                               src={item.videoUrl}
//                               title={item.title}
//                               frameBorder="0"
//                               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                               allowFullScreen
//                               className="w-full h-full"
//                             />
//                           ) : (
//                             <video
//                               src={item.videoUrl}
//                               controls
//                               className="w-full h-full object-cover"
//                             />
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </motion.div>
//             )}

//             {/* DOWNLOADS CONTENT */}
//             {activeTab === "download" && (
//               <motion.div
//                 key="downloads-list"
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -15 }}
//                 transition={{ duration: 0.4 }}
//                 className="w-full text-center"
//               >
//                 {documentItems.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center text-zinc-500 py-16">
//                     <FileText className="w-12 h-12 text-zinc-300 mb-4" />
//                     <h3 className="text-base font-bold text-zinc-800">No Documents Uploaded</h3>
//                     <p className="text-xs text-zinc-400 font-semibold max-w-xs mt-1 leading-normal">
//                       Check back later for dynamic guidelines, policies, and file downloads.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
//                     {documentItems.map((doc) => (
//                       <div
//                         key={doc.id}
//                         className="flex items-center justify-between p-5 bg-zinc-50 border border-zinc-200/60 rounded-2xl shadow-xs hover:bg-zinc-100/50 hover:border-zinc-300 transition-all"
//                       >
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 rounded-xl bg-red-50 text-red-500 border border-red-100">
//                             <FileText className="h-6 w-6" />
//                           </div>
//                           <div className="text-left">
//                             <h4 className="text-[14px] md:text-[15px] font-bold text-zinc-900">
//                               {doc.name}
//                             </h4>
//                             <span className="text-[11px] font-semibold text-zinc-500 mt-1 block">
//                               {doc.type || "PDF Document"} • {doc.size || "Drive Link"}
//                             </span>
//                           </div>
//                         </div>

//                         <a
//                           href={doc.href}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="p-3 rounded-full text-zinc-550 hover:text-white bg-white hover:bg-[#147FC3] border border-zinc-200 hover:border-[#147FC3] transition-all duration-300 cursor-pointer shadow-xs"
//                           title="Download Document"
//                         >
//                           <Download className="h-4.5 w-4.5" />
//                         </a>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </motion.div>
//             )}

//           </AnimatePresence>
//         </div>

//       </main>

//       {/* Video Playback Modal */}
//       <AnimatePresence>
//         {activeVideoUrl && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
//           >
//             <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
//               <button
//                 onClick={() => setActiveVideoUrl(null)}
//                 className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/95 text-white hover:text-[#FCA038] z-20 cursor-pointer transition-colors"
//               >
//                 <X className="h-5 w-5" />
//               </button>

//               {activeVideoUrl.includes("youtube") || activeVideoUrl.includes("youtu.be") || activeVideoUrl.includes("/embed/") ? (
//                 <iframe
//                   src={activeVideoUrl}
//                   title="YouTube video player"
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                   allowFullScreen
//                   className="w-full h-full"
//                 />
//               ) : (
//                 <video
//                   src={activeVideoUrl}
//                   controls
//                   autoPlay
//                   className="w-full h-full object-contain"
//                 />
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Footer */}
//       <Footer />

//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Image as ImageIcon, PlayCircle, X, ArrowRight, ChevronRight, ChevronDown, Loader2 } from "lucide-react";

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<"image" | "video" | "download">("image");
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [videoItems, setVideoItems] = useState<any[]>([]);
  const [documentItems, setDocumentItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [resMedia, resVideos, resDocs] = await Promise.all([
          fetch("/api/media"),
          fetch("/api/videos"),
          fetch("/api/documents")
        ]);

        if (resMedia.ok) {
          const mediaData = await resMedia.json();
          setGalleryItems(mediaData);
        }

        if (resVideos.ok) {
          const videoData = await resVideos.json();
          setVideoItems(videoData);
        }

        if (resDocs.ok) {
          const docData = await resDocs.json();
          setDocumentItems(docData);
        }
      } catch (error) {
        console.error("Failed to load media elements:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-950 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">

      {/* 3-Tier Navbar */}
      <Navbar />

      {/* FULL-SCREEN HERO BANNER — matches About Us / Board of Directors banner style */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image — no color overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/mediabanner.png"
            alt="Media Gallery Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle bottom darkening only, for text legibility — no color tint */}
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
            <span className="text-[#FCA038] font-bold">Media</span>
          </motion.div>

          {/* Clean text directly over the image — no box, no background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider uppercase text-white leading-none"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.5)" }}
            >
              MEDIA
            </h1>
          </motion.div>

        </div>

        {/* Scroll Down Arrow Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/80 cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
        >
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/70">Scroll Down</span>
          <ChevronDown className="w-5 h-5 text-[#FCA038]" />
        </motion.div>

        {/* Curved Bottom Wave Separator — matches About Us / Board of Directors banner */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#FAF9F6] [clip-path:ellipse(65%_100%_at_50%_100%)] z-10" />
      </section>

      <main className="relative w-full pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28 bg-transparent">

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
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <AnimatePresence mode="wait">

            {/* IMAGE GALLERY CONTENT */}
            {activeTab === "image" && (
              <motion.div
                key="image-gallery"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full flex justify-center"
              >
                {loading ? (
                  <div className="py-20 flex flex-col items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[#147FC3] animate-spin" />
                    <span className="text-xs font-bold text-zinc-500 mt-4 uppercase tracking-widest">Loading Media Gallery...</span>
                  </div>
                ) : galleryItems.length === 0 ? (
                  <div className="py-20 text-center">
                    <ImageIcon className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-zinc-950">No Albums Found</h3>
                    <p className="text-xs text-zinc-500 font-semibold max-w-sm mx-auto mt-1">
                      Check back later, or add albums via the administrator console.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {galleryItems.map((item) => (
                      <Link
                        key={item.id}
                        href={`/media/gallery/${item.id}`}
                        className="flex flex-col bg-transparent group cursor-pointer text-left"
                      >
                        <div className="w-full aspect-[16/10] overflow-hidden relative border border-zinc-200/80 bg-zinc-50 shadow-xs hover:shadow-md transition-all duration-300">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        {/* Details */}
                        <div className="pt-4 text-left">
                          <h3 className="text-[13px] md:text-[14px] font-extrabold text-zinc-900 tracking-wider uppercase leading-snug group-hover:text-[#147FC3] transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
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
                className="w-full text-center"
              >
                {videoItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-zinc-500 py-16">
                    <PlayCircle className="w-12 h-12 text-zinc-300 mb-4" />
                    <h3 className="text-base font-bold text-zinc-800">No Videos Uploaded</h3>
                    <p className="text-xs text-zinc-400 font-semibold max-w-xs mt-1 leading-normal">
                      Check back later for new corporate films, CSR videos, and event streams.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
                    {videoItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col bg-transparent text-left"
                      >
                        <div className="w-full aspect-[16/10] overflow-hidden relative border border-zinc-200/80 bg-zinc-50 shadow-xs hover:shadow-md transition-shadow duration-300">
                          {item.videoUrl.includes("youtube") || item.videoUrl.includes("youtu.be") || item.videoUrl.includes("/embed/") ? (
                            <iframe
                              src={item.videoUrl}
                              title={item.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          ) : (
                            <video
                              src={item.videoUrl}
                              controls
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                className="w-full text-center"
              >
                {documentItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-zinc-500 py-16">
                    <FileText className="w-12 h-12 text-zinc-300 mb-4" />
                    <h3 className="text-base font-bold text-zinc-800">No Documents Uploaded</h3>
                    <p className="text-xs text-zinc-400 font-semibold max-w-xs mt-1 leading-normal">
                      Check back later for dynamic guidelines, policies, and file downloads.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
                    {documentItems.map((doc) => (
                      <div
                        key={doc.id}
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
                              {doc.type || "PDF Document"} • {doc.size || "Drive Link"}
                            </span>
                          </div>
                        </div>

                        <a
                          href={doc.href}
                          target="_blank"
                          rel="noreferrer"
                          className="p-3 rounded-full text-zinc-550 hover:text-white bg-white hover:bg-[#147FC3] border border-zinc-200 hover:border-[#147FC3] transition-all duration-300 cursor-pointer shadow-xs"
                          title="Download Document"
                        >
                          <Download className="h-4.5 w-4.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
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

              {activeVideoUrl.includes("youtube") || activeVideoUrl.includes("youtu.be") || activeVideoUrl.includes("/embed/") ? (
                <iframe
                  src={activeVideoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video
                  src={activeVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />

    </div>
  );
}