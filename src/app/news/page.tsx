"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NewsArticle } from "@/data/newsData";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Newspaper, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Tag, 
  Sparkles,
  Search,
  Flame,
  ChevronRight,
  TrendingUp,
  Mail,
  FileText,
  AlertCircle
} from "lucide-react";

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dynamic API Fetching from Firestore
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setArticles(data);
          } else {
            setArticles([]);
          }
        } else {
          throw new Error("Failed to load news articles from server");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load live news feed");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const categories = [
    "All",
    "Expansion & Growth",
    "Digital Innovation",
    "Awards & Recognition",
    "Community & CSR",
    "Corporate Events",
    "Product Launch",
    "Press Release",
    "Financial Update"
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.author && article.author.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const secondaryHeadlines = filteredArticles.length > 1 ? filteredArticles.slice(1, 4) : [];
  const remainingArticles = filteredArticles.length > 4 
    ? filteredArticles.slice(4) 
    : (selectedCategory !== "All" || searchQuery !== "" ? filteredArticles.slice(1) : filteredArticles.slice(4));

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative min-h-screen bg-[#FDFCFB] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans antialiased">
      
      {/* Navbar */}
      <Navbar />

      {/* TOP EDITORIAL TICKER BAR */}
      <div className="w-full pt-20 md:pt-24 bg-zinc-950 text-white border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-2.5 flex flex-wrap items-center justify-between text-xs font-semibold gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#147FC3] text-[10px] font-black uppercase tracking-wider text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              PRESS ROOM
            </span>
            <span className="text-zinc-400 hidden sm:inline">{currentDate}</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 text-xs">
            <span className="hidden md:inline text-zinc-500">Official Media Hub of Max Value Credits & Investments Ltd.</span>
            <Link 
              href="/contact-us" 
              className="text-[#FCA038] hover:underline font-bold text-[11px] uppercase tracking-wider flex items-center gap-1"
            >
              <Mail className="w-3 h-3" /> Media Desk
            </Link>
          </div>
        </div>
      </div>

      {/* MODERN EDITORIAL HERO SECTION */}
      <section 
        className="relative w-full py-16 md:py-24 bg-zinc-900 text-white overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/branch-locater.png')" }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-zinc-950/80 z-0 pointer-events-none" />

        {/* Ambient glow effects */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 right-12 w-96 h-96 rounded-full bg-[#147FC3]/20 blur-[130px]" />
          <div className="absolute -bottom-10 left-12 w-80 h-80 rounded-full bg-[#FCA038]/15 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
          
          <span className="text-xs font-black uppercase tracking-widest text-[#FCA038] mb-3 flex items-center gap-2">
            <Newspaper className="w-4 h-4" /> MAX VALUE EDITORIAL & MEDIA DESK
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight max-w-4xl mb-4">
            Corporate News & <span className="text-[#FCA038]">Announcements</span>
          </h1>

          <div className="w-20 h-1.5 bg-[#FCA038] rounded-full mb-6" />

          <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
            Stay informed with official press announcements, branch milestones, financial innovation updates, and corporate growth stories across South India.
          </p>

          {/* Search bar */}
          <div className="w-full max-w-xl relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4.5 top-4" />
            <input 
              type="text" 
              placeholder="Search news releases, topics, or announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 text-zinc-900 text-sm outline-none shadow-2xl placeholder:text-zinc-400 font-bold focus:ring-2 focus:ring-[#147FC3] backdrop-blur-sm transition-all"
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

        </div>
      </section>

      {/* CATEGORY FILTER SWITCHER BAR */}
      <section className="sticky top-20 z-20 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between py-3 overflow-x-auto gap-2 scrollbar-none">
            <div className="flex items-center gap-2 shrink-0">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? "bg-[#147FC3] text-white shadow-sm shadow-[#147FC3]/25" 
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/90 hover:text-zinc-900"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-zinc-400 shrink-0 pl-4 border-l border-zinc-200">
              <TrendingUp className="w-3.5 h-3.5 text-[#147FC3]" />
              <span>{filteredArticles.length} Stories</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN MAGAZINE CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16">
        
        {loading ? (
          /* SKELETON LOADER */
          <div className="space-y-8 animate-pulse">
            <div className="w-full h-96 bg-zinc-200 rounded-3xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="h-64 bg-zinc-200 rounded-2xl" />
              <div className="h-64 bg-zinc-200 rounded-2xl" />
              <div className="h-64 bg-zinc-200 rounded-2xl" />
            </div>
          </div>
        ) : error ? (
          /* ERROR STATE */
          <div className="py-20 text-center text-rose-600 bg-rose-50 border border-rose-200 rounded-3xl p-8">
            <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-3" />
            <h3 className="text-lg font-black uppercase">{error}</h3>
            <p className="text-xs font-semibold text-rose-500 mt-1">Please refresh the page or check back shortly.</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          /* CLEAN EMPTY STATE (NO DEMO DATA) */
          <div className="py-24 text-center text-zinc-500 bg-white rounded-3xl border border-zinc-200/90 shadow-sm p-8">
            <Newspaper className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
            <h3 className="text-xl font-black text-zinc-800 uppercase tracking-tight">
              {searchQuery ? "No Articles Found" : "No News Articles Published Yet"}
            </h3>
            <p className="text-sm font-semibold text-zinc-400 mt-2 max-w-md mx-auto leading-relaxed">
              {searchQuery 
                ? `We couldn't find any press releases matching "${searchQuery}". Try searching with different keywords.`
                : "Stay tuned! Official press releases, branch inaugurations, and company announcements will appear here once published."}
            </p>
            {searchQuery && (
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="mt-6 px-6 py-2.5 bg-zinc-900 hover:bg-[#147FC3] text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* 1. SPOTLIGHT & TRENDING DUAL EDITORIAL ROW */}
            {selectedCategory === "All" && searchQuery === "" && featuredArticle && (
              <section className="space-y-8">
                
                {/* Section Header */}
                <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#FCA038] rounded-full" />
                    <h2 className="text-lg md:text-xl font-black uppercase text-zinc-950 tracking-tight">
                      Editor's Spotlight & Featured Story
                    </h2>
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
                    TOP STORY
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Lead Featured Article (8 Cols) */}
                  <div className="lg:col-span-8">
                    <Link 
                      href={`/news/${featuredArticle.id}`}
                      className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                        <img 
                          src={featuredArticle.bannerImage} 
                          alt={featuredArticle.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                        
                        {/* Top Category Badge */}
                        <span className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-[#147FC3] text-white text-xs font-black uppercase tracking-wider shadow-lg">
                          {featuredArticle.category}
                        </span>

                        {/* Bottom overlay text on mobile */}
                        <div className="absolute bottom-5 left-5 right-5 text-white">
                          <div className="flex items-center gap-3 text-xs font-bold text-zinc-200 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-[#FCA038]" />
                              {featuredArticle.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-zinc-300" />
                              {featuredArticle.readTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight uppercase leading-snug group-hover:text-[#147FC3] transition-colors mb-4">
                            {featuredArticle.title}
                          </h3>

                          <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed mb-6 line-clamp-3">
                            {featuredArticle.summary}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                            <User className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{featuredArticle.author || "Corporate Desk"}</span>
                          </div>

                          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#147FC3] group-hover:text-[#FCA038] group-hover:translate-x-1 transition-all">
                            Read Full Story <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Secondary Spotlight Stack (4 Cols) */}
                  <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="bg-zinc-950 text-white p-5 rounded-2xl flex items-center gap-2">
                      <Flame className="w-5 h-5 text-[#FCA038]" />
                      <span className="text-xs font-black uppercase tracking-wider">Trending Press Updates</span>
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                      {secondaryHeadlines.length > 0 ? (
                        secondaryHeadlines.map((secArticle) => (
                          <Link
                            key={secArticle.id}
                            href={`/news/${secArticle.id}`}
                            className="group flex items-start gap-4 p-4 bg-white rounded-2xl border border-zinc-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex-1"
                          >
                            <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-100 shrink-0 relative">
                              <img 
                                src={secArticle.bannerImage} 
                                alt={secArticle.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>

                            <div className="flex flex-col justify-between flex-1 h-full">
                              <div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-[#147FC3]">
                                  {secArticle.category}
                                </span>
                                <h4 className="text-xs font-extrabold text-zinc-900 uppercase line-clamp-2 leading-snug group-hover:text-[#147FC3] transition-colors mt-1">
                                  {secArticle.title}
                                </h4>
                              </div>

                              <div className="flex items-center gap-2 text-[10px] font-semibold text-zinc-400 mt-2">
                                <span>{secArticle.date}</span>
                                <span>•</span>
                                <span>{secArticle.readTime}</span>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-6 bg-white rounded-2xl border border-zinc-200 text-center text-xs text-zinc-400 font-medium">
                          Additional news releases will appear here as they are published.
                        </div>
                      )}
                    </div>
                  </div>

                </div>

              </section>
            )}

            {/* 2. NEWS FEED MAGAZINE GRID */}
            <section className="space-y-8">
              
              <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#147FC3] rounded-full" />
                  <h2 className="text-lg md:text-xl font-black uppercase text-zinc-950 tracking-tight">
                    {selectedCategory === "All" ? "All Corporate Publications" : `${selectedCategory} Articles`}
                  </h2>
                </div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
                  LATEST ARTICLES
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(selectedCategory === "All" && searchQuery === "" ? remainingArticles : filteredArticles).map((article, idx) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Link 
                      href={`/news/${article.id}`}
                      className="flex flex-col h-full bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer text-left justify-between"
                    >
                      <div>
                        {/* Image Frame */}
                        <div className="aspect-[16/10] overflow-hidden relative bg-zinc-100">
                          <img 
                            src={article.bannerImage} 
                            alt={article.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#147FC3] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                            {article.category}
                          </span>
                        </div>

                        {/* Text Details */}
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-[11px] font-bold text-zinc-400 mb-2.5">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#FCA038]" />
                              {article.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-zinc-400" />
                              {article.readTime}
                            </span>
                          </div>

                          <h3 className="text-base md:text-lg font-black text-zinc-900 tracking-tight uppercase leading-snug group-hover:text-[#147FC3] transition-colors mb-3 line-clamp-2">
                            {article.title}
                          </h3>

                          <p className="text-zinc-600 text-xs md:text-sm font-normal leading-relaxed line-clamp-3 mb-4">
                            {article.summary}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-0 border-t border-zinc-100 pt-4 mt-auto">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-zinc-400">
                            By {article.author || "Corporate Desk"}
                          </span>
                          
                          <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#147FC3] group-hover:text-[#FCA038] group-hover:translate-x-1 transition-all">
                            Read <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

            </section>
          </>
        )}

        {/* 3. PRESS INQUIRY & MEDIA CONTACT BANNER */}
        <section className="bg-gradient-to-br from-zinc-950 to-zinc-900 text-white rounded-3xl p-8 md:p-12 border border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#147FC3]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FCA038] text-xs font-black uppercase tracking-wider border border-white/10">
                <FileText className="w-3.5 h-3.5" /> MEDIA INQUIRIES & SPOKESPERSON DESK
              </span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Looking for Official Media Assets or Executive Statements?
              </h3>
              <p className="text-zinc-300 text-xs md:text-sm font-medium leading-relaxed max-w-2xl">
                Journalists, financial correspondents, and media representatives can reach our Corporate Communications desk for interview schedules, press kits, and verified corporate disclosures.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/contact-us"
                className="px-6 py-3.5 bg-[#147FC3] hover:bg-[#FCA038] text-white text-xs font-black uppercase tracking-wider rounded-2xl text-center transition-all duration-300 shadow-lg shadow-[#147FC3]/25 cursor-pointer"
              >
                Contact Corporate PR
              </Link>
              <Link
                href="/about-us"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider rounded-2xl text-center transition-all border border-white/15 cursor-pointer"
              >
                About Max Value
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
