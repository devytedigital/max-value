"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  ChevronRight,
  Filter,
  Flame,
  ArrowRight,
  Sparkles,
  Building2,
  Share2,
  X,
  Tag,
  CheckCircle2,
  Award,
  HeartHandshake
} from "lucide-react";

export interface Activity {
  id: string;
  title: string;
  category: "CSR & Community" | "Branch Celebrations" | "Financial Literacy" | "Employee Welfare" | "Awards & Accolades";
  date: string;
  location: string;
  bannerImage: string;
  gallery?: string[];
  summary: string;
  content: string;
  organizer: string;
  participantsCount?: string;
  tags: string[];
  isFeatured?: boolean;
}

const defaultActivities: Activity[] = [];

const categories = [
  "All",
  "CSR & Community",
  "Branch Celebrations",
  "Financial Literacy",
  "Employee Welfare",
  "Awards & Accolades"
];

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(defaultActivities);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true);
        const res = await fetch("/api/activities");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setActivities(data);
          }
        }
      } catch (err) {
        console.error("Could not fetch activities from API, using static default data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadActivities();
  }, []);

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchesCategory =
        selectedCategory === "All" || act.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        act.title.toLowerCase().includes(q) ||
        act.summary.toLowerCase().includes(q) ||
        act.location.toLowerCase().includes(q) ||
        act.category.toLowerCase().includes(q) ||
        (act.tags && act.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [activities, selectedCategory, searchQuery]);

  const featuredActivity = useMemo(() => {
    return filteredActivities.find((a) => a.isFeatured) || filteredActivities[0];
  }, [filteredActivities]);

  const gridActivities = useMemo(() => {
    if (!featuredActivity || selectedCategory !== "All" || searchQuery.trim() !== "") {
      return filteredActivities;
    }
    return filteredActivities.filter((a) => a.id !== featuredActivity.id);
  }, [filteredActivities, featuredActivity, selectedCategory, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[#FDFCFB] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans antialiased">
      {/* 3-Tier Navbar */}
      <Navbar />

      {/* FULL-SCREEN HERO BANNER — matching Blog and News page styling */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/mediabanner.png"
            alt="Max Value Activities Banner"
            className="w-full h-full object-cover object-center"
          />
          {/* Bottom darkening overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>

        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 right-12 w-96 h-96 rounded-full bg-[#147FC3]/20 blur-[130px]" />
          <div className="absolute -bottom-10 left-12 w-80 h-80 rounded-full bg-[#FCA038]/15 blur-[100px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 text-center flex flex-col items-center">
          {/* Breadcrumb Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-amber-300 mb-8 shadow-sm"
          >
            <span className="text-slate-200">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-200">Media</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-[#FCA038] font-bold">Activities</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#FCA038] mb-4 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4" /> Max Value Corporate CSR &amp; Community Engagement
            </span>

            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider uppercase text-white leading-none"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.5)" }}
            >
              ACTIVITIES &amp; EVENTS
            </h1>

            <div className="w-20 h-1.5 bg-[#FCA038] rounded-full my-6" />

            <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl mb-8 font-normal">
              Explore our CSR initiatives, financial literacy workshops, branch celebrations, employee wellness programs, and community outreach drives.
            </p>

            {/* Search Input Bar */}
            <div className="w-full max-w-xl relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4.5 top-4" />
              <input
                type="text"
                placeholder="Search activities by title, location, category, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/95 text-zinc-900 text-sm outline-none shadow-2xl placeholder:text-zinc-400 font-bold focus:ring-2 focus:ring-[#147FC3] backdrop-blur-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-3.5 text-xs font-bold text-zinc-400 hover:text-zinc-700 uppercase cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Curved Bottom Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#FDFCFB] [clip-path:ellipse(65%_100%_at_50%_100%)] z-10" />
      </section>

      {/* CATEGORY FILTER SWITCHER BAR */}
      <section className="sticky top-20 z-20 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between py-3 overflow-x-auto gap-2 scrollbar-none">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-500 mr-2 shrink-0 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#147FC3] text-white shadow-md shadow-[#147FC3]/25 scale-105"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/90 hover:text-zinc-900"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-zinc-400 shrink-0 pl-4 border-l border-zinc-200">
              <Building2 className="w-3.5 h-3.5 text-[#147FC3]" />
              <span>{filteredActivities.length} Activities Listed</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN ACTIVITIES CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16">
        {/* SPOTLIGHT FEATURED ACTIVITY (when browsing All and search is empty) */}
        {selectedCategory === "All" && searchQuery.trim() === "" && featuredActivity && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#147FC3]">
                <Flame className="w-4 h-4 text-[#FCA038] animate-bounce" /> Featured Activity Spotlight
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
                KEY COMMUNITY INITIATIVE
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                onClick={() => setSelectedActivity(featuredActivity)}
                className="group relative block bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Banner Image */}
                  <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[340px] overflow-hidden bg-zinc-900">
                    <img
                      src={featuredActivity.bannerImage}
                      alt={featuredActivity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent lg:hidden" />
                    <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#147FC3] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                      {featuredActivity.category}
                    </span>
                  </div>

                  {/* Details Content */}
                  <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-zinc-500">
                        <span className="flex items-center gap-1.5 text-[#147FC3]">
                          <Calendar className="w-3.5 h-3.5" /> {featuredActivity.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 text-[#FCA038]">
                          <MapPin className="w-3.5 h-3.5" /> {featuredActivity.location}
                        </span>
                      </div>

                      <h2 className="text-xl md:text-2xl font-black text-zinc-950 group-hover:text-[#147FC3] transition-colors leading-tight">
                        {featuredActivity.title}
                      </h2>

                      <p className="text-zinc-600 text-xs md:text-sm leading-relaxed font-medium line-clamp-3">
                        {featuredActivity.summary}
                      </p>
                    </div>

                    {/* Organizer & CTA */}
                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs font-bold text-zinc-700">
                          {featuredActivity.participantsCount || featuredActivity.organizer}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#147FC3] group-hover:text-[#FCA038] group-hover:translate-x-1 transition-all">
                        View Activity <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* ACTIVITIES LISTING GRID */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#147FC3] rounded-full" />
              <h2 className="text-lg md:text-xl font-black uppercase text-zinc-950 tracking-tight">
                {selectedCategory === "All" ? "All Corporate & CSR Activities" : `${selectedCategory} Activities`}
              </h2>
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
              EXPLORE EVENTS
            </span>
          </div>

          {gridActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {gridActivities.map((act, idx) => (
                  <motion.div
                    key={act.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <div
                      onClick={() => setSelectedActivity(act)}
                      className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      {/* Image Frame */}
                      <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                        <img
                          src={act.bannerImage}
                          alt={act.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#147FC3] text-white text-[10px] font-black uppercase tracking-wider shadow">
                          {act.category}
                        </span>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-zinc-500">
                            <span className="flex items-center gap-1 text-[#147FC3]">
                              <Calendar className="w-3.5 h-3.5" /> {act.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-[#FCA038]">
                              <MapPin className="w-3.5 h-3.5" /> {act.location}
                            </span>
                          </div>

                          <h3 className="text-base font-black text-zinc-950 group-hover:text-[#147FC3] transition-colors leading-snug line-clamp-2">
                            {act.title}
                          </h3>

                          <p className="text-zinc-600 text-xs font-medium leading-relaxed line-clamp-3">
                            {act.summary}
                          </p>
                        </div>

                        {/* Tag Pills & Action */}
                        <div className="pt-4 border-t border-zinc-100 flex flex-col gap-3 mt-auto">
                          {act.tags && (
                            <div className="flex flex-wrap gap-1.5">
                              {act.tags.slice(0, 3).map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[10px] font-semibold bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] font-bold text-zinc-500 truncate max-w-[150px]">
                              {act.organizer}
                            </span>

                            <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#147FC3] group-hover:text-[#FCA038] group-hover:translate-x-1 transition-all shrink-0">
                              Details <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black uppercase text-zinc-900">No Activities Found</h4>
              <p className="text-xs font-medium text-zinc-600">
                No activities matched your search for &quot;{searchQuery}&quot; under &quot;{selectedCategory}&quot;.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 bg-[#147FC3] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#FCA038] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* CORPORATE CSR & COMMUNITY OUTREACH BANNER */}
        <section className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-8 md:p-12 border border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#147FC3]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FCA038] text-xs font-black uppercase tracking-wider border border-white/10">
                <Award className="w-3.5 h-3.5" /> MAX VALUE CSR &amp; SUSTAINABILITY DESK
              </span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Building Stronger Communities Across South India
              </h3>
              <p className="text-zinc-300 text-xs md:text-sm font-medium leading-relaxed max-w-2xl">
                Max Value Credits &amp; Investments Ltd. integrates corporate social responsibility into everyday operations through tree plantation, blood donation, financial literacy workshops, and micro-entrepreneurship support.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/contact-us"
                className="px-6 py-3.5 bg-[#147FC3] hover:bg-[#FCA038] text-white text-xs font-black uppercase tracking-wider rounded-2xl text-center transition-all duration-300 shadow-lg shadow-[#147FC3]/25 cursor-pointer"
              >
                Partner For CSR
              </Link>
              <Link
                href="/branch-network"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider rounded-2xl text-center transition-all border border-white/15 cursor-pointer"
              >
                Find Nearest Branch
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* DETAIL MODAL FOR SELECTED ACTIVITY */}
      <AnimatePresence>
        {selectedActivity && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedActivity(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
            >
              {/* Header Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-900 shrink-0">
                <img
                  src={selectedActivity.bannerImage}
                  alt={selectedActivity.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="px-3 py-1 rounded-full bg-[#147FC3] text-white text-[10px] font-black uppercase tracking-wider mb-2 inline-block">
                    {selectedActivity.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-snug">
                    {selectedActivity.title}
                  </h2>
                </div>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left">
                {/* Meta details row */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-zinc-500 bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                  <div className="flex items-center gap-1.5 text-[#147FC3]">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedActivity.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#FCA038]">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedActivity.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-700">
                    <Users className="w-4 h-4" />
                    <span>{selectedActivity.participantsCount || selectedActivity.organizer}</span>
                  </div>
                </div>

                {/* Full Article Text */}
                <div className="space-y-4 text-zinc-700 text-sm leading-relaxed">
                  <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">Overview &amp; Impact</h4>
                  <p className="font-medium text-zinc-800 text-base leading-relaxed">
                    {selectedActivity.summary}
                  </p>
                  <p className="text-justify font-normal text-zinc-600">
                    {selectedActivity.content}
                  </p>
                </div>

                {/* Optional Photo Gallery */}
                {selectedActivity.gallery && selectedActivity.gallery.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">Event Gallery</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedActivity.gallery.map((img, i) => (
                        <div key={i} className="h-28 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
                          <img src={img} alt="Gallery item" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selectedActivity.tags && (
                  <div className="pt-4 border-t border-zinc-200 flex flex-wrap gap-2">
                    {selectedActivity.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-bold bg-sky-50 text-[#147FC3] border border-sky-200/80 px-3 py-1 rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between shrink-0">
                <span className="text-xs font-bold text-zinc-500">
                  Organized by: <strong className="text-zinc-900">{selectedActivity.organizer}</strong>
                </span>

                <button
                  onClick={() => setSelectedActivity(null)}
                  className="px-5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-[#147FC3] transition-colors cursor-pointer"
                >
                  Close Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
