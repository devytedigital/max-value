"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { newsArticles as fallbackNewsArticles, NewsArticle } from "@/data/newsData";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  CheckCircle2, 
  Newspaper,
  Tag,
  ArrowRight,
  Bookmark,
  MessageSquare,
  Sparkles,
  Link2,
  ExternalLink,
  ChevronRight,
  Quote,
  Eye,
  Building2,
  Phone
} from "lucide-react";

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = typeof (params as any)?.then === "function" 
    ? use(params as Promise<{ id: string }>) 
    : (params as { id: string });
  const articleId = resolvedParams?.id;

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        setError("");

        // 1. Fetch the target article
        const res = await fetch(`/api/news/${articleId}`);
        if (res.ok) {
          const data = await res.json();
          setArticle(data);
        } else {
          // Fallback to static seed
          const fallback = fallbackNewsArticles.find((item) => item.id === articleId);
          if (fallback) {
            setArticle(fallback);
          } else {
            setError("News article not found");
          }
        }

        // 2. Fetch related articles
        const listRes = await fetch("/api/news");
        if (listRes.ok) {
          const listData = await listRes.json();
          if (Array.isArray(listData) && listData.length > 0) {
            setRelatedArticles(listData.filter((item: any) => item.id !== articleId).slice(0, 3));
          } else {
            setRelatedArticles(fallbackNewsArticles.filter((item) => item.id !== articleId).slice(0, 3));
          }
        } else {
          setRelatedArticles(fallbackNewsArticles.filter((item) => item.id !== articleId).slice(0, 3));
        }
      } catch (err: any) {
        const fallback = fallbackNewsArticles.find((item) => item.id === articleId);
        if (fallback) {
          setArticle(fallback);
          setRelatedArticles(fallbackNewsArticles.filter((item) => item.id !== articleId).slice(0, 3));
        } else {
          setError(err.message || "Failed to load article");
        }
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchArticleData();
    }
  }, [articleId]);

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Read this article on Max Value: ${article?.title || ""}\n`);
      window.open(`https://api.whatsapp.com/send?text=${text}${url}`, "_blank");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFCFB] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans antialiased">
      
      {/* Navbar */}
      <Navbar />

      <main className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 bg-transparent">
        
        {loading ? (
          /* SKELETON LOADER */
          <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-6 animate-pulse">
            <div className="h-6 w-36 bg-zinc-200 rounded-full" />
            <div className="h-12 w-full bg-zinc-200 rounded-2xl" />
            <div className="h-4 w-1/2 bg-zinc-200 rounded-md" />
            <div className="aspect-[16/9] w-full bg-zinc-200 rounded-3xl" />
            <div className="space-y-3 pt-6">
              <div className="h-4 bg-zinc-200 rounded-md w-full" />
              <div className="h-4 bg-zinc-200 rounded-md w-5/6" />
              <div className="h-4 bg-zinc-200 rounded-md w-4/6" />
            </div>
          </div>
        ) : error || !article ? (
          /* NOT FOUND / ERROR STATE */
          <div className="max-w-xl mx-auto px-6 py-20 text-center space-y-6 bg-white rounded-3xl border border-zinc-200 shadow-sm p-8">
            <Newspaper className="w-16 h-16 text-zinc-300 mx-auto" />
            <h2 className="text-2xl font-black text-zinc-900 uppercase">Article Not Found</h2>
            <p className="text-sm font-semibold text-zinc-500">
              The news article you are looking for might have been moved, updated, or unpublished.
            </p>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#147FC3] hover:bg-zinc-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to News Feed
            </Link>
          </div>
        ) : (
          /* ARTICLE EDITORIAL CONTENT */
          <article className="max-w-4xl mx-auto px-6 md:px-8 text-left">
            
            {/* BREADCRUMB & BACK LINK */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Link 
                href="/news" 
                className="inline-flex items-center gap-2 text-xs md:text-sm font-black text-zinc-500 hover:text-[#147FC3] transition-colors group cursor-pointer uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>All Press Releases</span>
              </Link>

              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-zinc-400">
                <span>News</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#147FC3]">{article.category}</span>
              </div>
            </div>

            {/* CATEGORY & METADATA BAR */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#147FC3] text-white text-xs font-black uppercase tracking-wider shadow-sm">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>

              <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
                <Calendar className="w-3.5 h-3.5 text-[#FCA038]" />
                {article.date}
              </span>

              <span className="text-zinc-300">•</span>

              <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                {article.readTime || "3 min read"}
              </span>

              <span className="text-zinc-300">•</span>

              <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
                <User className="w-3.5 h-3.5 text-zinc-400" />
                {article.author || "Corporate Desk"}
              </span>
            </div>

            {/* ARTICLE HEADLINE */}
            <h1 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase leading-tight mb-8">
              {article.title}
            </h1>

            {/* AUTHOR / SOCIAL SHARE BAR */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-zinc-200/90 mb-8 bg-zinc-50/70 rounded-2xl px-5">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#147FC3] text-white font-black text-sm flex items-center justify-center shadow-sm">
                  {article.author ? article.author.charAt(0).toUpperCase() : "M"}
                </div>
                <div>
                  <h4 className="text-xs font-black text-zinc-900 uppercase">
                    {article.author || "Corporate Communications Desk"}
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-semibold">
                    Max Value Credits & Investments Ltd.
                  </p>
                </div>
              </div>

              {/* Share actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-zinc-200 hover:border-[#147FC3] text-zinc-700 hover:text-[#147FC3] text-xs font-bold transition-all shadow-xs cursor-pointer"
                  title="Copy Article Link"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span>{copied ? "Link Copied!" : "Copy Link"}</span>
                </button>

                <button
                  onClick={handleWhatsAppShare}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  title="Share via WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>
              </div>

            </div>

            {/* SUMMARY LEAD BOX */}
            <div className="p-6 md:p-8 bg-amber-50/70 border-l-4 border-[#FCA038] rounded-r-3xl mb-10 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FCA038] mb-2 block">
                EXECUTIVE SUMMARY
              </span>
              <p className="text-zinc-800 text-base md:text-lg font-semibold leading-relaxed">
                {article.summary}
              </p>
            </div>

            {/* FEATURED BANNER IMAGE */}
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-zinc-200 shadow-xl mb-12 bg-zinc-950 relative">
              <img 
                src={article.bannerImage} 
                alt={article.title} 
                className="w-full h-full object-cover"
                onError={(e: any) => {
                  e.target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";
                }}
              />
            </div>

            {/* ARTICLE BODY CONTENT (MAGAZINE EDITORIAL) */}
            <div className="space-y-6 text-zinc-700 text-base md:text-lg leading-relaxed font-sans font-normal">
              {Array.isArray(article.content) && article.content.map((block, index) => {
                if (block.type === "paragraph") {
                  return (
                    <p key={index} className="text-zinc-750 text-base md:text-lg leading-relaxed">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "heading") {
                  return (
                    <h2 key={index} className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight uppercase mt-10 mb-4 border-b border-zinc-200 pb-2.5 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#147FC3]" />
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote key={index} className="my-8 p-6 md:p-8 bg-[#147FC3]/5 border-l-4 border-[#147FC3] rounded-r-3xl text-zinc-900 font-serif italic text-base md:text-xl leading-relaxed relative">
                      <Quote className="w-8 h-8 text-[#147FC3]/20 absolute right-6 top-6" />
                      "{block.text}"
                    </blockquote>
                  );
                }

                if (block.type === "list" && block.items) {
                  return (
                    <div key={index} className="my-6 p-6 bg-zinc-50 border border-zinc-200/90 rounded-2xl space-y-3">
                      <span className="text-xs font-black uppercase text-zinc-400 tracking-wider block">
                        KEY HIGHLIGHTS
                      </span>
                      <ul className="space-y-3 font-semibold text-zinc-800 text-sm md:text-base">
                        {block.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#147FC3] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                return null;
              })}
            </div>

            {/* SUPPORTING GALLERY IMAGES */}
            {article.supportingImages && article.supportingImages.length > 0 && (
              <div className="mt-14 pt-10 border-t border-zinc-200">
                <h3 className="text-xs font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-[#147FC3]" />
                  Event Photos & Press Media Coverage
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {article.supportingImages.map((img, idx) => (
                    <div key={idx} className="flex flex-col bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm group">
                      <div className="aspect-[16/10] overflow-hidden bg-zinc-100 relative">
                        <img 
                          src={img.url} 
                          alt={img.caption || `Supporting image ${idx + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {img.caption && (
                        <div className="p-4 text-xs font-semibold text-zinc-600 bg-zinc-50 border-t border-zinc-100">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BOTTOM ARTICLE ACTIONS */}
            <div className="mt-14 pt-8 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-[#147FC3] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-zinc-950/10"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? "Link Copied!" : "Share Press Release"}</span>
              </button>

              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-xs font-black text-[#147FC3] hover:text-[#FCA038] transition-colors uppercase tracking-wider"
              >
                <span>View More Press Releases</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </article>
        )}

        {/* RELATED ARTICLES SECTION */}
        {relatedArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-16 border-t border-zinc-200">
            <div className="text-left mb-10 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-[#FCA038] tracking-widest">
                  EXPLORE MORE
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tight mt-1">
                  Related Press Announcements
                </h3>
              </div>

              <Link
                href="/news"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#147FC3] hover:text-[#FCA038] transition-colors"
              >
                All News <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.id}`}
                  className="flex flex-col bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-100 relative">
                    <img 
                      src={rel.bannerImage} 
                      alt={rel.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#147FC3] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 mb-2">
                        <Calendar className="w-3 h-3 text-[#FCA038]" />
                        <span>{rel.date}</span>
                        <span>•</span>
                        <span>{rel.readTime}</span>
                      </div>
                      
                      <h4 className="text-base font-black text-zinc-900 tracking-tight uppercase leading-snug group-hover:text-[#147FC3] transition-colors line-clamp-2 mb-3">
                        {rel.title}
                      </h4>

                      <p className="text-zinc-600 text-xs font-normal leading-relaxed line-clamp-2">
                        {rel.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#147FC3] group-hover:text-[#FCA038]">
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
