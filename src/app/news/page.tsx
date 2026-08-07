"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { newsArticles, NewsArticle } from "@/data/newsData";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Newspaper, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Tag, 
  Sparkles,
  Search
} from "lucide-react";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Expansion & Growth",
    "Digital Innovation",
    "Awards & Recognition",
    "Community & CSR",
    "Corporate Events",
    "Product Launch"
  ];

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = newsArticles[0];

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">
      
      {/* Navbar */}
      <Navbar />

      {/* TOP HERO BANNER SECTION */}
      <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 bg-[#147FC3] text-white overflow-hidden">
        {/* Background glow & grid effects */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-[#FCA038]/20 blur-[120px]" />
          <div className="absolute -top-10 left-10 w-72 h-72 rounded-full bg-white/5 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FCA038] text-xs font-extrabold uppercase tracking-wider mb-6">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Latest News & Press Releases</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight max-w-4xl mb-4">
            News & Corporate <span className="text-[#FCA038]">Updates</span>
          </h1>

          <div className="w-20 h-1.5 bg-[#FCA038] rounded-full mb-6" />

          <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
            Stay informed with official press announcements, financial insights, branch launch highlights, community initiatives, and milestone achievements from Max Value Credits & Investments Ltd.
          </p>

          {/* Search bar */}
          <div className="w-full max-w-md relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-3.5" />
            <input 
              type="text" 
              placeholder="Search news articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white text-zinc-900 text-sm outline-none shadow-lg placeholder:text-zinc-400 font-medium focus:ring-2 focus:ring-[#FCA038]"
            />
          </div>
        </div>
      </section>

      {/* FEATURED STORY BANNER */}
      {selectedCategory === "All" && searchQuery === "" && (
        <section className="relative w-full py-12 bg-zinc-50 border-b border-zinc-200/80">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-left mb-6">
              <span className="text-xs font-black uppercase text-[#FCA038] tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> FEATURED STORY
              </span>
            </div>

            <Link 
              href={`/news/${featuredArticle.id}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl overflow-hidden border border-zinc-200/90 shadow-md hover:shadow-xl transition-all duration-300 p-4 md:p-6 text-left cursor-pointer"
            >
              <div className="lg:col-span-7 aspect-[16/9] lg:aspect-[16/10] rounded-2xl overflow-hidden relative">
                <img 
                  src={featuredArticle.bannerImage} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#147FC3] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  {featuredArticle.category}
                </span>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between py-2">
                <div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#147FC3]" />
                      {featuredArticle.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#FCA038]" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight uppercase leading-snug group-hover:text-[#147FC3] transition-colors mb-4">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-zinc-600 text-xs md:text-sm leading-relaxed mb-6">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#147FC3] group-hover:text-[#FCA038] transition-colors">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* CATEGORY FILTER SWITCHER */}
      <section className="relative w-full pt-12 pb-6 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-start gap-2 overflow-x-auto pb-4 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "bg-[#147FC3] text-white shadow-md" 
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEWS ARTICLES GRID */}
      <section className="relative w-full py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {filteredArticles.length === 0 ? (
            <div className="py-16 text-center text-zinc-500">
              <Newspaper className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
              <p className="text-base font-bold">No news articles found matching your query.</p>
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="mt-3 text-xs font-bold text-[#147FC3] underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Link 
                    href={`/news/${article.id}`}
                    className="flex flex-col h-full bg-white rounded-2xl border border-zinc-200/90 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer text-left justify-between"
                  >
                    <div>
                      {/* Image container */}
                      <div className="aspect-[16/10] overflow-hidden relative bg-zinc-100">
                        <img 
                          src={article.bannerImage} 
                          alt={article.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#147FC3] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          {article.category}
                        </span>
                      </div>

                      {/* Content details */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-[11px] font-semibold text-zinc-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#147FC3]" />
                            {article.date}
                          </span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>

                        <h3 className="text-lg font-black text-zinc-900 tracking-tight uppercase leading-snug group-hover:text-[#147FC3] transition-colors mb-3 line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-zinc-600 text-xs leading-relaxed line-clamp-3 mb-4">
                          {article.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-0">
                      <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#147FC3] group-hover:text-[#FCA038] transition-colors">
                        <span>Read Full Story</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}
