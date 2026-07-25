"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface EventVideo {
  id: string;
  title: string;
  label: string;
  youtubeId: string;
}

export default function EventsSection() {
  const videos: EventVideo[] = [
    {
      id: "director-message",
      title: "7th Anniversary - Director Message",
      label: "7th Anniversary - Director Message",
      youtubeId: "96bw8SH7ebg"
    },
    {
      id: "aikya",
      title: "AIKYA 2023 - Annual Family Meet",
      label: "AIKYA 2023 - Annual Family Meet",
      youtubeId: "vY1XZwTHuhU"
    },
    {
      id: "enthusia",
      title: "Enthusia 2023 - Corporate Motivational Meet",
      label: "Enthusia 2023 - Corporate Motivational Meet",
      youtubeId: "phyi9GIoryU"
    }
  ];

  const [activeVideo, setActiveVideo] = useState<EventVideo>(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectVideo = (video: EventVideo) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-white z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Heading */}
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-[#147FC3] tracking-tight mb-12"
        >
          Events
        </motion.h2>

        {/* Main Grid: Left Column (Director Message Card), Right Column (Video + Playlist) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Director Message Card (lg:span-4) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col"
          >
            <div 
              onClick={() => handleSelectVideo(videos[0])}
              className="relative flex-grow min-h-[300px] lg:min-h-0 rounded-2xl overflow-hidden cursor-pointer shadow-md border border-zinc-100"
            >
              {/* Background Director Image */}
              <img 
                src="/director-portrait.png" 
                alt="7th Anniversary - Director Message"
                className="absolute inset-0 w-full h-full object-cover select-none"
              />

              {/* Dark Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Bottom-left Text Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight italic tracking-wide drop-shadow-md">
                  7th Anniversary - <br />
                  Director Message
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Video Player & Playlist (lg:span-8) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8 bg-zinc-50 rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-zinc-100 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
              
              {/* Sub-Column 1: Video Player Container (md:span-7 or 8) */}
              <div className="md:col-span-8 flex flex-col justify-center">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg border border-zinc-200">
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=${isPlaying ? 1 : 0}&rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Sub-Column 2: Playlist Bullets (md:span-4 or 5) */}
              <div className="md:col-span-4 flex flex-col justify-center py-4">
                <ul className="space-y-6">
                  {videos.map((video) => {
                    const isActive = activeVideo.id === video.id;
                    return (
                      <li 
                        key={video.id}
                        onClick={() => handleSelectVideo(video)}
                        className={`flex items-start gap-3 cursor-pointer group transition-all duration-300`}
                      >
                        {/* Dot indicator matching the orange in user screenshot */}
                        <span 
                          className={`w-3.5 h-3.5 rounded-full mt-1.5 shrink-0 transition-all duration-300 ${
                            isActive 
                              ? "bg-[#FCA038] scale-125 shadow-md shadow-[#FCA038]/50" 
                              : "bg-zinc-300 group-hover:bg-[#FCA038]/60 group-hover:scale-110"
                          }`}
                        />
                        <span 
                          className={`text-sm font-bold leading-snug transition-colors duration-300 ${
                            isActive 
                              ? "text-[#147FC3] font-black" 
                              : "text-zinc-600 group-hover:text-[#147FC3]"
                          }`}
                        >
                          {video.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
