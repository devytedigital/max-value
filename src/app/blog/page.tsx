// "use client";

// import { useState, useMemo } from "react";
// import Link from "next/link";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { blogPosts, blogCategories, BlogPost } from "@/data/blogData";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   BookOpen,
//   Calendar,
//   User,
//   Clock,
//   ArrowRight,
//   Tag,
//   Sparkles,
//   Search,
//   ChevronRight,
//   TrendingUp,
//   FileText,
//   ShieldCheck,
//   CheckCircle2,
//   Share2,
//   Flame,
//   Filter,
//   X
// } from "lucide-react";

// export default function BlogListingPage() {
//   const [selectedCategory, setSelectedCategory] = useState<string>("All");
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const filteredPosts = useMemo(() => {
//     return blogPosts.filter((post) => {
//       const matchesCategory =
//         selectedCategory === "All" || post.category === selectedCategory;
//       const q = searchQuery.trim().toLowerCase();
//       const matchesSearch =
//         q === "" ||
//         post.title.toLowerCase().includes(q) ||
//         post.summary.toLowerCase().includes(q) ||
//         post.category.toLowerCase().includes(q) ||
//         post.tags.some((tag) => tag.toLowerCase().includes(q)) ||
//         post.author.name.toLowerCase().includes(q);

//       return matchesCategory && matchesSearch;
//     });
//   }, [selectedCategory, searchQuery]);

//   const featuredPost = useMemo(() => {
//     return blogPosts.find((p) => p.isFeatured) || blogPosts[0];
//   }, []);

//   const regularPosts = useMemo(() => {
//     if (selectedCategory === "All" && searchQuery.trim() === "") {
//       return filteredPosts.filter((p) => p.id !== featuredPost.id);
//     }
//     return filteredPosts;
//   }, [filteredPosts, selectedCategory, searchQuery, featuredPost]);

//   const currentDate = new Date().toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <div className="relative min-h-screen bg-[#FDFCFB] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans antialiased">
//       {/* Top Navbar */}
//       <Navbar />


//       <main className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 space-y-12">
//         {/* HERO BANNER SECTION */}
//         <section className="relative rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white p-8 md:p-14 overflow-hidden border border-zinc-800 shadow-2xl">
//           {/* Background Glows */}
//           <div className="absolute top-0 right-0 w-96 h-96 bg-[#147FC3]/20 rounded-full blur-3xl pointer-events-none" />
//           <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FCA038]/15 rounded-full blur-3xl pointer-events-none" />

//           <div className="relative z-10 max-w-3xl space-y-6">
//             <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
//               <BookOpen className="w-4 h-4 text-[#FCA038]" />
//               <span className="text-xs font-black uppercase tracking-widest text-zinc-200">
//                 Knowledge & Wealth Center
//               </span>
//             </div>

//             <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase">
//               Financial Wisdom, <br />
//               <span className="bg-gradient-to-r from-[#147FC3] via-sky-400 to-[#FCA038] bg-clip-text text-transparent">
//                 Smart Credit & Growth
//               </span>
//             </h1>

//             <p className="text-zinc-300 text-sm md:text-base font-medium leading-relaxed">
//               Explore expert articles on gold loans, working capital management, personal savings, micro-enterprise empowerment, and modern NBFC financial solutions.
//             </p>

//             {/* Search Input Bar */}
//             <div className="relative max-w-xl">
//               <div className="relative flex items-center">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
//                 <input
//                   type="text"
//                   placeholder="Search articles by title, topic, author, or keyword..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-12 pr-10 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#147FC3] focus:bg-zinc-900/90 transition-all"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={() => setSearchQuery("")}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CATEGORY FILTER TABS */}
//         <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-2 scrollbar-none">
//           <span className="text-xs font-black uppercase tracking-wider text-zinc-500 mr-2 shrink-0 flex items-center gap-1">
//             <Filter className="w-3.5 h-3.5" /> Filter:
//           </span>
//           {blogCategories.map((cat) => {
//             const isActive = selectedCategory === cat;
//             return (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
//                   isActive
//                     ? "bg-[#147FC3] text-white shadow-lg shadow-[#147FC3]/25 scale-105"
//                     : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
//                 }`}
//               >
//                 {cat}
//               </button>
//             );
//           })}
//         </div>

//         {/* FEATURED ARTICLE SPOTLIGHT (only when browsing all and no active search query) */}
//         {selectedCategory === "All" && searchQuery.trim() === "" && featuredPost && (
//           <section className="space-y-4">
//             <div className="flex items-center justify-between">
//               <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#147FC3]">
//                 <Flame className="w-4 h-4 text-[#FCA038] animate-bounce" /> Featured Article Spotlight
//               </span>
//             </div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Link
//                 href={`/blog/${featuredPost.id}`}
//                 className="group relative block bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-xl hover:shadow-2xl transition-all duration-500"
//               >
//                 <div className="grid grid-cols-1 lg:grid-cols-12">
//                   {/* Banner Image */}
//                   <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[320px] overflow-hidden bg-zinc-900">
//                     <img
//                       src={featuredPost.bannerImage}
//                       alt={featuredPost.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent lg:hidden" />
//                     <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#147FC3] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
//                       {featuredPost.category}
//                     </span>
//                   </div>

//                   {/* Details Content */}
//                   <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-6">
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
//                         <span className="flex items-center gap-1.5">
//                           <Calendar className="w-3.5 h-3.5 text-[#147FC3]" /> {featuredPost.date}
//                         </span>
//                         <span>•</span>
//                         <span className="flex items-center gap-1.5">
//                           <Clock className="w-3.5 h-3.5 text-[#FCA038]" /> {featuredPost.readTime}
//                         </span>
//                       </div>

//                       <h2 className="text-xl md:text-2xl font-black text-zinc-950 group-hover:text-[#147FC3] transition-colors leading-tight">
//                         {featuredPost.title}
//                       </h2>

//                       <p className="text-zinc-600 text-xs md:text-sm leading-relaxed font-medium line-clamp-3">
//                         {featuredPost.summary}
//                       </p>
//                     </div>

//                     {/* Author & CTA Footer */}
//                     <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={featuredPost.author.avatar}
//                           alt={featuredPost.author.name}
//                           className="w-9 h-9 rounded-full object-cover border border-zinc-200"
//                         />
//                         <div>
//                           <p className="text-xs font-black text-zinc-900">{featuredPost.author.name}</p>
//                           <p className="text-[10px] font-semibold text-zinc-500">{featuredPost.author.role}</p>
//                         </div>
//                       </div>

//                       <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#147FC3] group-hover:text-[#FCA038] group-hover:translate-x-1 transition-all">
//                         Read <ArrowRight className="w-4 h-4" />
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           </section>
//         )}

//         {/* ARTICLES LISTING GRID */}
//         <section className="space-y-6 pt-4">
//           <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
//             <h3 className="text-lg font-black uppercase tracking-tight text-zinc-950 flex items-center gap-2">
//               <FileText className="w-5 h-5 text-[#147FC3]" />
//               {selectedCategory === "All" ? "All Financial Articles" : `${selectedCategory} Articles`}
//             </h3>
//             <span className="text-xs font-bold text-zinc-500">
//               Showing {regularPosts.length} article{regularPosts.length === 1 ? "" : "s"}
//             </span>
//           </div>

//           {regularPosts.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               <AnimatePresence mode="popLayout">
//                 {regularPosts.map((post, idx) => (
//                   <motion.div
//                     key={post.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     transition={{ duration: 0.4, delay: idx * 0.05 }}
//                   >
//                     <Link
//                       href={`/blog/${post.id}`}
//                       className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//                     >
//                       {/* Thumbnail Container */}
//                       <div className="relative h-52 w-full overflow-hidden bg-zinc-900">
//                         <img
//                           src={post.bannerImage}
//                           alt={post.title}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
//                         <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#147FC3] text-white text-[10px] font-black uppercase tracking-wider shadow">
//                           {post.category}
//                         </span>
//                       </div>

//                       {/* Card Content */}
//                       <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
//                         <div className="space-y-3">
//                           <div className="flex items-center gap-3 text-[11px] font-bold text-zinc-500">
//                             <span className="flex items-center gap-1">
//                               <Calendar className="w-3.5 h-3.5 text-[#147FC3]" /> {post.date}
//                             </span>
//                             <span>•</span>
//                             <span className="flex items-center gap-1">
//                               <Clock className="w-3.5 h-3.5 text-[#FCA038]" /> {post.readTime}
//                             </span>
//                           </div>

//                           <h4 className="text-base font-black text-zinc-950 group-hover:text-[#147FC3] transition-colors leading-snug line-clamp-2">
//                             {post.title}
//                           </h4>

//                           <p className="text-zinc-600 text-xs font-medium leading-relaxed line-clamp-3">
//                             {post.summary}
//                           </p>
//                         </div>

//                         {/* Author & Action */}
//                         <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-auto">
//                           <div className="flex items-center gap-2.5">
//                             <img
//                               src={post.author.avatar}
//                               alt={post.author.name}
//                               className="w-7 h-7 rounded-full object-cover border border-zinc-200"
//                             />
//                             <div>
//                               <p className="text-[11px] font-black text-zinc-900">{post.author.name}</p>
//                             </div>
//                           </div>

//                           <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#147FC3] group-hover:text-[#FCA038] group-hover:translate-x-1 transition-all">
//                             Read <ArrowRight className="w-3.5 h-3.5" />
//                           </span>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           ) : (
//             <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 space-y-4 max-w-lg mx-auto">
//               <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
//                 <Search className="w-6 h-6" />
//               </div>
//               <h4 className="text-lg font-black uppercase text-zinc-900">No Articles Found</h4>
//               <p className="text-xs font-medium text-zinc-600">
//                 No blog posts matched your search for &quot;{searchQuery}&quot; under the &quot;{selectedCategory}&quot; category.
//               </p>
//               <button
//                 onClick={() => {
//                   setSelectedCategory("All");
//                   setSearchQuery("");
//                 }}
//                 className="px-5 py-2.5 bg-[#147FC3] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#FCA038] transition-colors cursor-pointer"
//               >
//                 Reset Filters
//               </button>
//             </div>
//           )}
//         </section>

//         {/* CORPORATE INSIGHTS & PR BANNER */}
//         <section className="bg-gradient-to-br from-zinc-950 to-zinc-900 text-white rounded-3xl p-8 md:p-12 border border-zinc-800 shadow-xl relative overflow-hidden">
//           <div className="absolute right-0 top-0 w-96 h-96 bg-[#147FC3]/15 rounded-full blur-3xl pointer-events-none" />

//           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
//             <div className="lg:col-span-8 space-y-4">
//               <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FCA038] text-xs font-black uppercase tracking-wider border border-white/10">
//                 <FileText className="w-3.5 h-3.5" /> MAX VALUE CREDITS CORPORATE ADVISORY
//               </span>
//               <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
//                 Empowering Businesses & Families with Transparent Credit
//               </h3>
//               <p className="text-zinc-300 text-xs md:text-sm font-medium leading-relaxed max-w-2xl">
//                 Max Value Credits & Investments Ltd. is an RBI-registered NBFC offering Gold Loans, Microfinance, Traders Loans, and Personal Vehicle Loans across South India.
//               </p>
//             </div>

//             <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
//               <Link
//                 href="/gold-loan"
//                 className="px-6 py-3.5 bg-[#147FC3] hover:bg-[#FCA038] text-white text-xs font-black uppercase tracking-wider rounded-2xl text-center transition-all duration-300 shadow-lg shadow-[#147FC3]/25 cursor-pointer"
//               >
//                 Apply for Gold Loan
//               </Link>
//               <Link
//                 href="/contact-us"
//                 className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider rounded-2xl text-center transition-all border border-white/15 cursor-pointer"
//               >
//                 Contact Corporate PR
//               </Link>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogCategories, BlogPost } from "@/data/blogData";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Tag,
  Sparkles,
  Search,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Flame,
  Filter,
  X,
  AlertCircle
} from "lucide-react";

export default function BlogListingPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/blog");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setPosts(data);
          } else {
            setPosts([]);
          }
        } else {
          throw new Error("Failed to load blog posts from server");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load live blog feed");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(q))) ||
        (post.author && post.author.name.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, posts]);

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.isFeatured) || posts[0];
  }, [posts]);

  const regularPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    if (selectedCategory === "All" && searchQuery.trim() === "") {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, selectedCategory, searchQuery, featuredPost]);

  return (
    <div className="relative min-h-screen bg-[#FDFCFB] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans antialiased">
      {/* Top Navbar */}
      <Navbar />

      {/* FULL-SCREEN HERO BANNER — matches About Us / Media / News / Contact Us / Grievance banner style */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image — no color overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/blogbanner.png"
            alt="Max Value Blog Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle bottom darkening only, for text legibility — no color tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10" />
        </div>

        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#147FC3]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FCA038]/15 rounded-full blur-3xl" />
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
            <span className="text-[#FCA038] font-bold">Blog</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider uppercase text-white leading-none"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.5)" }}
            >
              BLOG
            </h1>

            <div className="w-20 h-1.5 bg-[#FCA038] rounded-full my-6" />

            <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl mb-8 font-normal">
              Explore expert articles on gold loans, working capital management, personal savings, micro-enterprise empowerment, and modern NBFC financial solutions.
            </p>

            {/* Search Input Bar */}
            <div className="w-full max-w-xl relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4.5 top-4" />
              <input
                type="text"
                placeholder="Search articles by title, topic, author, or keyword..."
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



        {/* Curved Bottom Wave Separator — matches About Us / Media / News / Contact Us / Grievance banner */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#FDFCFB] [clip-path:ellipse(65%_100%_at_50%_100%)] z-10" />
      </section>

      <main className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 space-y-12">

        {/* CATEGORY FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-2 scrollbar-none">
          <span className="text-xs font-black uppercase tracking-wider text-zinc-500 mr-2 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {blogCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#147FC3] text-white shadow-lg shadow-[#147FC3]/25 scale-105"
                    : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

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
        ) : posts.length === 0 ? (
          /* EMPTY STATE */
          <div className="py-16 bg-white rounded-3xl border border-zinc-200/90 shadow-sm p-8 text-center space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-[#147FC3]/10 text-[#147FC3] flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>

            <div className="max-w-xl mx-auto space-y-2">
              <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">
                {searchQuery ? "No Matching Articles Found" : "Max Value Blog is Live"}
              </h3>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                {searchQuery
                  ? `No publications found matching "${searchQuery}". Try selecting another category or resetting the search filter.`
                  : "All expert financial articles and updates will appear here dynamically as they are published by our writing team."}
              </p>
            </div>

            {searchQuery && (
              <button
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="px-6 py-2.5 bg-zinc-950 hover:bg-[#147FC3] text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* FEATURED ARTICLE SPOTLIGHT */}
            {selectedCategory === "All" && searchQuery.trim() === "" && featuredPost && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#147FC3]">
                    <Flame className="w-4 h-4 text-[#FCA038] animate-bounce" /> Featured Article Spotlight
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="group relative block bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-xl hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      {/* Banner Image */}
                      <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[320px] overflow-hidden bg-zinc-900">
                        <img
                          src={featuredPost.bannerImage}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent lg:hidden" />
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#147FC3] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                          {featuredPost.category}
                        </span>
                      </div>

                      {/* Details Content */}
                      <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#147FC3]" /> {featuredPost.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#FCA038]" /> {featuredPost.readTime}
                            </span>
                          </div>

                          <h2 className="text-xl md:text-2xl font-black text-zinc-950 group-hover:text-[#147FC3] transition-colors leading-tight">
                            {featuredPost.title}
                          </h2>

                          <p className="text-zinc-600 text-xs md:text-sm leading-relaxed font-medium line-clamp-3">
                            {featuredPost.summary}
                          </p>
                        </div>

                        {/* Author & CTA Footer */}
                        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {featuredPost.author && (
                              <>
                                <img
                                  src={featuredPost.author.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"}
                                  alt={featuredPost.author.name}
                                  className="w-9 h-9 rounded-full object-cover border border-zinc-200"
                                />
                                <div>
                                  <p className="text-xs font-black text-zinc-900">{featuredPost.author.name}</p>
                                  <p className="text-[10px] font-semibold text-zinc-500">{featuredPost.author.role}</p>
                                </div>
                              </>
                            )}
                          </div>

                          <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#147FC3] group-hover:text-[#FCA038] group-hover:translate-x-1 transition-all">
                            Read <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </section>
            )}

            {/* ARTICLES LISTING GRID */}
            <section className="space-y-6 pt-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <h3 className="text-lg font-black uppercase tracking-tight text-zinc-950 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#147FC3]" />
                  {selectedCategory === "All" ? "All Financial Articles" : `${selectedCategory} Articles`}
                </h3>
                <span className="text-xs font-bold text-zinc-500">
                  Showing {regularPosts.length} article{regularPosts.length === 1 ? "" : "s"}
                </span>
              </div>

              {regularPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {regularPosts.map((post, idx) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                      >
                        <Link
                          href={`/blog/${post.id}`}
                          className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                          {/* Thumbnail Container */}
                          <div className="relative h-52 w-full overflow-hidden bg-zinc-900">
                            <img
                              src={post.bannerImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#147FC3] text-white text-[10px] font-black uppercase tracking-wider shadow">
                              {post.category}
                            </span>
                          </div>

                          {/* Card Content */}
                          <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 text-[11px] font-bold text-zinc-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 text-[#147FC3]" /> {post.date}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-[#FCA038]" /> {post.readTime}
                                </span>
                              </div>

                              <h4 className="text-base font-black text-zinc-950 group-hover:text-[#147FC3] transition-colors leading-snug line-clamp-2">
                                {post.title}
                              </h4>

                              <p className="text-zinc-600 text-xs font-medium leading-relaxed line-clamp-3">
                                {post.summary}
                              </p>
                            </div>

                            {/* Author & Action */}
                            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-auto">
                              <div className="flex items-center gap-2.5">
                                {post.author && (
                                  <>
                                    <img
                                      src={post.author.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"}
                                      alt={post.author.name}
                                      className="w-7 h-7 rounded-full object-cover border border-zinc-200"
                                    />
                                    <div>
                                      <p className="text-[11px] font-black text-zinc-900">{post.author.name}</p>
                                    </div>
                                  </>
                                )}
                              </div>

                              <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#147FC3] group-hover:text-[#FCA038] group-hover:translate-x-1 transition-all">
                                Read <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 space-y-4 max-w-lg mx-auto">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black uppercase text-zinc-900">No Articles Found</h4>
                  <p className="text-xs font-medium text-zinc-600">
                    No blog posts matched your search for &quot;{searchQuery}&quot; under the &quot;{selectedCategory}&quot; category.
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
          </>
        )}

        {/* CORPORATE INSIGHTS & PR BANNER */}
        <section className="bg-gradient-to-br from-zinc-950 to-zinc-900 text-white rounded-3xl p-8 md:p-12 border border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#147FC3]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FCA038] text-xs font-black uppercase tracking-wider border border-white/10">
                <FileText className="w-3.5 h-3.5" /> MAX VALUE CREDITS CORPORATE ADVISORY
              </span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Empowering Businesses & Families with Transparent Credit
              </h3>
              <p className="text-zinc-300 text-xs md:text-sm font-medium leading-relaxed max-w-2xl">
                Max Value Credits & Investments Ltd. is an RBI-registered NBFC offering Gold Loans, Microfinance, Traders Loans, and Personal Vehicle Loans across South India.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/gold-loan"
                className="px-6 py-3.5 bg-[#147FC3] hover:bg-[#FCA038] text-white text-xs font-black uppercase tracking-wider rounded-2xl text-center transition-all duration-300 shadow-lg shadow-[#147FC3]/25 cursor-pointer"
              >
                Apply for Gold Loan
              </Link>
              <Link
                href="/contact-us"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider rounded-2xl text-center transition-all border border-white/15 cursor-pointer"
              >
                Contact Corporate PR
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