"use client";

import { useState, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { newsArticles, NewsArticle } from "@/data/newsData";
import { motion } from "framer-motion";
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
  MessageSquare
} from "lucide-react";

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = typeof (params as any).then === "function" ? use(params as Promise<{ id: string }>) : (params as { id: string });
  const articleId = resolvedParams?.id;
  const article = newsArticles.find((item) => item.id === articleId) || newsArticles[0];

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Related articles (excluding current)
  const relatedArticles = newsArticles.filter(item => item.id !== article.id).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">
      
      {/* Navbar */}
      <Navbar />

      <main className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 bg-white">
        
        {/* HEADER & ARTICLE INTRO */}
        <article className="max-w-4xl mx-auto px-6 md:px-8 text-left">
          
          {/* Back link */}
          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-zinc-500 hover:text-[#147FC3] transition-colors mb-8 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All News</span>
          </Link>

          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#147FC3] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              <Tag className="w-3.5 h-3.5" />
              {article.category}
            </span>

            <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500">
              <Calendar className="w-3.5 h-3.5 text-[#147FC3]" />
              {article.date}
            </span>

            <span className="text-zinc-300">•</span>

            <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500">
              <Clock className="w-3.5 h-3.5 text-[#FCA038]" />
              {article.readTime}
            </span>

            <span className="text-zinc-300">•</span>

            <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500">
              <User className="w-3.5 h-3.5 text-zinc-400" />
              {article.author}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase leading-tight mb-6">
            {article.title}
          </h1>

          {/* Summary Lead Box */}
          <div className="p-6 bg-amber-50/60 border-l-4 border-[#FCA038] rounded-r-2xl mb-8">
            <p className="text-zinc-800 text-sm md:text-base font-semibold leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* FEATURED BANNER IMAGE */}
          <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-zinc-200 shadow-xl mb-10 bg-zinc-950 relative">
            <img 
              src={article.bannerImage} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* ARTICLE BODY CONTENT (NEWSPAPER STYLE) */}
          <div className="prose prose-lg max-w-none text-zinc-700 space-y-6 text-sm md:text-base leading-relaxed font-sans">
            {article.content.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p key={index} className="text-zinc-700 text-base md:text-lg leading-relaxed">
                    {block.text}
                  </p>
                );
              }

              if (block.type === "heading") {
                return (
                  <h2 key={index} className="text-xl md:text-2xl font-black text-zinc-900 tracking-tight uppercase mt-10 mb-4 border-b border-zinc-200/80 pb-2">
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "quote") {
                return (
                  <blockquote key={index} className="my-8 p-6 md:p-8 bg-[#147FC3]/5 border-l-4 border-[#147FC3] rounded-r-2xl text-zinc-900 font-serif italic text-base md:text-lg leading-relaxed">
                    "{block.text}"
                  </blockquote>
                );
              }

              if (block.type === "list" && block.items) {
                return (
                  <ul key={index} className="my-6 space-y-3 font-medium text-zinc-800">
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#147FC3] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return null;
            })}
          </div>

          {/* SUPPORTING GALLERY IMAGES */}
          {article.supportingImages && article.supportingImages.length > 0 && (
            <div className="mt-12 pt-8 border-t border-zinc-200">
              <h3 className="text-xs font-black uppercase text-zinc-400 tracking-wider mb-6 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-[#147FC3]" />
                Event Photos & Press Media
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {article.supportingImages.map((img, idx) => (
                  <div key={idx} className="flex flex-col bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img 
                        src={img.url} 
                        alt={img.caption} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 text-xs text-zinc-600 font-medium">
                      {img.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SHARE & ACTION BAR */}
          <div className="mt-12 pt-8 border-t border-zinc-200 flex items-center justify-between">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 hover:bg-[#147FC3] text-zinc-700 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? "Link Copied!" : "Share Article"}</span>
            </button>

            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#147FC3] hover:text-[#FCA038] transition-colors uppercase tracking-wider"
            >
              <span>More Press Releases</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </article>

        {/* RELATED ARTICLES SECTION */}
        {relatedArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-16 border-t border-zinc-200">
            <div className="text-left mb-10">
              <span className="text-xs font-black uppercase text-[#FCA038] tracking-widest">KEEP READING</span>
              <h3 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tight mt-1">
                Related Press Stories
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.id}`}
                  className="flex flex-col bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-100 relative">
                    <img 
                      src={rel.bannerImage} 
                      alt={rel.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        {rel.category}
                      </span>
                      <h4 className="text-base font-black text-zinc-900 tracking-tight uppercase leading-snug mt-1 group-hover:text-[#147FC3] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400 font-semibold">
                      <span>{rel.date}</span>
                      <span className="text-[#147FC3] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read →
                      </span>
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
