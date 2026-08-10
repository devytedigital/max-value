"use client";

import { useState, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPostById, getRelatedBlogPosts, BlogPost } from "@/data/blogData";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  CheckCircle2,
  Tag,
  ArrowRight,
  ChevronRight,
  Quote,
  Link2,
  FileText,
  AlertCircle,
  Sparkles,
  Building2,
  BookOpen
} from "lucide-react";

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams =
    typeof (params as any)?.then === "function"
      ? use(params as Promise<{ id: string }>)
      : (params as { id: string });

  const articleId = resolvedParams?.id;
  const post: BlogPost | undefined = getBlogPostById(articleId);
  const relatedPosts: BlogPost[] = getRelatedBlogPosts(articleId);

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(
        `Read this insightful financial article on Max Value Credits: ${post?.title || ""}\n`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}${url}`, "_blank");
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] text-zinc-900 font-sans">
        <Navbar />
        <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black uppercase text-zinc-900">Article Not Found</h1>
          <p className="text-sm font-medium text-zinc-600">
            The blog post you are looking for does not exist or may have been moved.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#147FC3] text-white text-xs font-black uppercase tracking-wider rounded-2xl hover:bg-[#FCA038] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Blog Listing
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#FDFCFB] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans antialiased">
      {/* Top Navbar */}
      <Navbar />

      <main className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-10">
          {/* BREADCRUMB & BACK BUTTON */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
              <Link href="/" className="hover:text-[#147FC3] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <Link href="/blog" className="hover:text-[#147FC3] transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-900 font-extrabold line-clamp-1 max-w-[200px] sm:max-w-xs">
                {post.title}
              </span>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-full text-xs font-black uppercase tracking-wider text-zinc-700 transition-colors shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#147FC3]" /> All Articles
            </Link>
          </div>

          {/* ARTICLE HEADER */}
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-[#147FC3] text-white text-[11px] font-black uppercase tracking-wider shadow">
                {post.category}
              </span>
              <span className="text-xs font-bold text-zinc-400">•</span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
                <Calendar className="w-3.5 h-3.5 text-[#147FC3]" /> {post.date}
              </span>
              <span className="text-xs font-bold text-zinc-400">•</span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
                <Clock className="w-3.5 h-3.5 text-[#FCA038]" /> {post.readTime}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-base md:text-lg font-medium text-zinc-600 leading-relaxed border-l-4 border-[#147FC3] pl-4">
              {post.summary}
            </p>

            {/* AUTHOR META & SHARE BAR */}
            <div className="py-4 border-y border-zinc-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#147FC3]"
                />
                <div>
                  <h4 className="text-sm font-black text-zinc-900">{post.author.name}</h4>
                  <p className="text-xs font-semibold text-zinc-500">{post.author.role}</p>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 transition-colors shadow-sm cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Copied!
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4 text-[#147FC3]" /> Copy Link
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppShare}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
                >
                  <Share2 className="w-4 h-4" /> Share on WhatsApp
                </button>
              </div>
            </div>
          </header>

          {/* FEATURED BANNER IMAGE */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 max-h-[480px]">
            <img
              src={post.bannerImage}
              alt={post.title}
              className="w-full h-full object-cover min-h-[300px]"
            />
          </div>

          {/* ARTICLE CONTENT BODY */}
          <article className="space-y-8 text-zinc-800 font-sans leading-relaxed text-base">
            {post.content.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p key={index} className="text-zinc-700 text-base md:text-lg font-normal leading-relaxed">
                    {block.text}
                  </p>
                );
              }

              if (block.type === "heading") {
                return (
                  <h3
                    key={index}
                    className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight pt-4 border-l-4 border-[#147FC3] pl-3"
                  >
                    {block.text}
                  </h3>
                );
              }

              if (block.type === "callout") {
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-sky-50 via-white to-amber-50 rounded-2xl p-6 border-l-4 border-[#147FC3] shadow-sm space-y-2"
                  >
                    {block.title && (
                      <h4 className="text-sm font-black uppercase tracking-wider text-[#147FC3] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#FCA038]" /> {block.title}
                      </h4>
                    )}
                    <p className="text-zinc-800 text-sm font-semibold leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                );
              }

              if (block.type === "quote") {
                return (
                  <blockquote
                    key={index}
                    className="relative bg-zinc-950 text-white rounded-3xl p-8 border border-zinc-800 shadow-xl space-y-3"
                  >
                    <Quote className="w-8 h-8 text-[#FCA038] opacity-80" />
                    <p className="text-lg md:text-xl font-bold italic leading-relaxed text-zinc-100">
                      &quot;{block.text}&quot;
                    </p>
                  </blockquote>
                );
              }

              if (block.type === "list" && block.items) {
                return (
                  <ul key={index} className="space-y-3 py-2">
                    {block.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm md:text-base font-medium text-zinc-700">
                        <CheckCircle2 className="w-5 h-5 text-[#147FC3] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === "image" && block.url) {
                return (
                  <figure key={index} className="space-y-2 py-4">
                    <img
                      src={block.url}
                      alt={block.caption || "Blog image"}
                      className="w-full rounded-2xl border border-zinc-200 shadow-md max-h-[400px] object-cover"
                    />
                    {block.caption && (
                      <figcaption className="text-center text-xs font-medium text-zinc-500 italic">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              return null;
            })}
          </article>

          {/* TAGS FOOTER */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-zinc-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase text-zinc-500 flex items-center gap-1.5 mr-2">
                <Tag className="w-3.5 h-3.5 text-[#147FC3]" /> Topics:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold rounded-full transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* AUTHOR BIO BOX */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-3xl p-6 md:p-8 border border-zinc-800 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#147FC3] shrink-0"
            />
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FCA038]">
                WRITTEN BY AUTHOR
              </span>
              <h4 className="text-lg font-black">{post.author.name}</h4>
              <p className="text-xs font-semibold text-[#147FC3]">{post.author.role}</p>
              {post.author.bio && (
                <p className="text-xs font-medium text-zinc-300 leading-relaxed pt-1">
                  {post.author.bio}
                </p>
              )}
            </div>
          </div>

          {/* RELATED ARTICLES SECTION */}
          {relatedPosts.length > 0 && (
            <section className="pt-10 border-t border-zinc-200 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-950 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#147FC3]" /> Recommended Articles
                </h3>
                <Link
                  href="/blog"
                  className="text-xs font-black uppercase text-[#147FC3] hover:text-[#FCA038] transition-colors flex items-center gap-1"
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative h-40 w-full bg-zinc-900 overflow-hidden">
                      <img
                        src={rel.bannerImage}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#147FC3] text-white text-[9px] font-black uppercase">
                        {rel.category}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-zinc-500 block">
                          {rel.date} • {rel.readTime}
                        </span>
                        <h4 className="text-xs font-black text-zinc-900 group-hover:text-[#147FC3] transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase text-[#147FC3] group-hover:text-[#FCA038] transition-colors">
                        Read Story <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
