"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Image as ImageIcon,
  Video,
  FileText,
  Building2,
  Newspaper,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Coins,
} from "lucide-react";

export type AdminTab =
  | "dashboard"
  | "board"
  | "services"
  | "media-images"
  | "media-videos"
  | "media-downloads"
  | "career"
  | "news"
  | "branches";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const [mediaOpen, setMediaOpen] = useState(
    activeTab.startsWith("media-")
  );

  useEffect(() => {
    if (activeTab.startsWith("media-")) {
      setMediaOpen(true);
    }
  }, [activeTab]);

  const handleSelect = (tab: AdminTab) => {
    setActiveTab(tab);
    onCloseMobile();
  };

  const isMediaActive = activeTab.startsWith("media-");

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 w-64 bg-slate-900 text-slate-300 flex flex-col z-50 transition-transform duration-300 ease-in-out border-r border-slate-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Logo & Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#147FC3] to-sky-400 text-white flex items-center justify-center font-black text-sm shadow-md shadow-sky-500/20">
              MV
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block leading-none">
                MaxValue
              </span>
              <span className="text-[10px] text-sky-400 font-semibold tracking-wider uppercase block mt-1">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Menu Scroll Area */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700">
          <div className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
            Main Management
          </div>

          {/* Dashboard Overview */}
          <button
            onClick={() => handleSelect("dashboard")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-[#147FC3] text-white shadow-md shadow-sky-600/30"
                : "hover:bg-slate-800 hover:text-white text-slate-400"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          {/* Board of Directors */}
          <button
            onClick={() => handleSelect("board")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "board"
                ? "bg-[#147FC3] text-white shadow-md shadow-sky-600/30"
                : "hover:bg-slate-800 hover:text-white text-slate-400"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Board of Directors</span>
          </button>

          {/* Our Services */}
          <button
            onClick={() => handleSelect("services")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "services"
                ? "bg-[#147FC3] text-white shadow-md shadow-sky-600/30"
                : "hover:bg-slate-800 hover:text-white text-slate-400"
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Our Services</span>
          </button>

          {/* Media Sub-menu Parent */}
          <div>
            <button
              onClick={() => setMediaOpen(!mediaOpen)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isMediaActive && !mediaOpen
                  ? "bg-[#147FC3]/20 text-sky-400 border border-sky-500/30"
                  : "hover:bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4" />
                <span>Media Module</span>
              </div>
              {mediaOpen ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Sub-items */}
            {mediaOpen && (
              <div className="mt-1 pl-4 space-y-1 border-l-2 border-slate-800 ml-5">
                <button
                  onClick={() => handleSelect("media-images")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === "media-images"
                      ? "bg-[#147FC3] text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Image Gallery</span>
                </button>

                <button
                  onClick={() => handleSelect("media-videos")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === "media-videos"
                      ? "bg-[#147FC3] text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video Gallery</span>
                </button>

                <button
                  onClick={() => handleSelect("media-downloads")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === "media-downloads"
                      ? "bg-[#147FC3] text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Downloads</span>
                </button>
              </div>
            )}
          </div>

          <div className="px-3 pt-4 pb-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
            Content &amp; Operations
          </div>

          {/* Career */}
          <button
            onClick={() => handleSelect("career")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "career"
                ? "bg-[#147FC3] text-white shadow-md shadow-sky-600/30"
                : "hover:bg-slate-800 hover:text-white text-slate-400"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Career</span>
          </button>

          {/* News */}
          <button
            onClick={() => handleSelect("news")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "news"
                ? "bg-[#147FC3] text-white shadow-md shadow-sky-600/30"
                : "hover:bg-slate-800 hover:text-white text-slate-400"
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>News &amp; Media</span>
          </button>

          {/* Branch Network */}
          <button
            onClick={() => handleSelect("branches")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "branches"
                ? "bg-[#147FC3] text-white shadow-md shadow-sky-600/30"
                : "hover:bg-slate-800 hover:text-white text-slate-400"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Branch Network</span>
          </button>
        </nav>

        {/* Footer Widget */}
        <div className="p-4 border-t border-slate-800 shrink-0">
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Frontend Mock Mode
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Changes reflect immediately in local UI state. API backend integration ready.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
