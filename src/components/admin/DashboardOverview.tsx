"use client";

import React from "react";
import {
  Users,
  Briefcase,
  Image as ImageIcon,
  Video,
  FileText,
  Building2,
  Newspaper,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { AdminTab } from "./AdminSidebar";

interface DashboardOverviewProps {
  counts: {
    directors: number;
    services: number;
    images: number;
    videos: number;
    downloads: number;
    careers: number;
    news: number;
    branches: number;
  };
  setActiveTab: (tab: AdminTab) => void;
  onOpenAddModal: (tab: AdminTab) => void;
}

export default function DashboardOverview({
  counts,
  setActiveTab,
  onOpenAddModal,
}: DashboardOverviewProps) {
  const statCards = [
    {
      title: "Board of Directors",
      count: counts.directors,
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      tab: "board" as AdminTab,
      subtitle: "Active leadership members",
    },
    {
      title: "Our Services",
      count: counts.services,
      icon: Briefcase,
      color: "from-amber-500 to-orange-600",
      tab: "services" as AdminTab,
      subtitle: "Loans & credit offerings",
    },
    {
      title: "Media Assets",
      count: counts.images + counts.videos + counts.downloads,
      icon: ImageIcon,
      color: "from-emerald-500 to-teal-600",
      tab: "media-images" as AdminTab,
      subtitle: `${counts.images} Photos, ${counts.videos} Videos, ${counts.downloads} Files`,
    },
    {
      title: "Career Postings",
      count: counts.careers,
      icon: Briefcase,
      color: "from-purple-500 to-pink-600",
      tab: "career" as AdminTab,
      subtitle: "Open recruitment listings",
    },
    {
      title: "News & Releases",
      count: counts.news,
      icon: Newspaper,
      color: "from-sky-500 to-blue-600",
      tab: "news" as AdminTab,
      subtitle: "Published announcements",
    },
    {
      title: "Branch Network",
      count: counts.branches,
      icon: Building2,
      color: "from-[#147FC3] to-cyan-600",
      tab: "branches" as AdminTab,
      subtitle: "Operational branch offices",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#105E92] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-sky-200 border border-white/15">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Admin Console Ready
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome to MaxValue Control Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            Manage corporate leadership, loan products, media galleries, recruitment notices, press releases, and branch networks with full live CRUD UI.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => setActiveTab(card.tab)}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 block">
                    {card.title}
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 block">
                    {card.count}
                  </span>
                </div>
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-md`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium text-[11px]">
                  {card.subtitle}
                </span>
                <span className="text-[#147FC3] font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  Manage <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Action Shortcuts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between">
            <span>Quick Create Actions</span>
            <Plus className="w-4 h-4 text-slate-400" />
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onOpenAddModal("board")}
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" /> Add Board Member
              </span>
              <Plus className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => onOpenAddModal("services")}
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-600" /> Add New Loan Service
              </span>
              <Plus className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => onOpenAddModal("career")}
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600" /> Post Job Opening
              </span>
              <Plus className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => onOpenAddModal("branches")}
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#147FC3]" /> Register New Branch
              </span>
              <Plus className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Activity Log Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#147FC3]" /> System Audit &amp; Activity Stream
            </h3>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              Live Mock Log
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-slate-800">Board Director member profile edited</p>
                <p className="text-[11px] text-slate-500">Manoj V Raman status updated to Active</p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Just now</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-slate-800">New Image Gallery upload</p>
                <p className="text-[11px] text-slate-500">Annual Leadership Summit 2025 added</p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">15m ago</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-slate-800">Branch Network updated</p>
                <p className="text-[11px] text-slate-500">KOCHI INFOPARK operational hours configured</p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">1h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
