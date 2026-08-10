"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import {
  BookOpen,
  Search,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  User,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Image as ImageIcon,
  PlusCircle,
  Trash,
  Tag,
  Sparkles,
  AlignLeft,
  Quote,
  List,
  Clipboard,
  Camera,
  Check,
  Building2,
  Coins
} from "lucide-react";

interface BlogContentBlock {
  type: "paragraph" | "heading" | "quote" | "list" | "image" | "callout";
  text?: string;
  items?: string[];
  url?: string;
  caption?: string;
  title?: string;
}

interface Author {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: Author;
  readTime: string;
  summary: string;
  bannerImage: string;
  tags: string[];
  content: BlogContentBlock[];
  isFeatured?: boolean;
  createdAt?: string;
}

const DEFAULT_CATEGORIES = [
  "Gold Loan Insights",
  "Financial Literacy",
  "MSME & Traders",
  "Personal Finance",
  "Corporate Growth",
];

const CURATED_IMAGE_PRESETS = [
  {
    name: "Gold Loan insights",
    url: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Financial Literacy / Calculator",
    url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "MSME & Traders Workspace",
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Rural Livelihood / Group Study",
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Digital FinTech Services",
    url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Commercial Fleet / Transport",
    url: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

  // Form Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    date: string;
    readTime: string;
    summary: string;
    bannerImage: string;
    isFeatured: boolean;
    author: Author;
    tagsInput: string;
    content: BlogContentBlock[];
  }>({
    title: "",
    category: "Gold Loan Insights",
    date: "",
    readTime: "5 min read",
    summary: "",
    bannerImage: "",
    isFeatured: false,
    author: {
      name: "Ramesh K. Nair",
      role: "Chief Financial Analyst",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
      bio: "Ramesh has over 18 years of experience in retail NBFC lending, wealth management, and gold-collateralized micro-financing."
    },
    tagsInput: "Gold Loan, Financial Tips",
    content: [{ type: "paragraph", text: "" }]
  });

  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [copiedBanner, setCopiedBanner] = useState(false);

  // Delete Confirmation Modal State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  // Toast notification state
  const [toasts, setToasts] = useState<{ id: number; text: string; type: "success" | "error" }[]>([]);

  // Auth check guard
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/adminlogin");
    }
  }, [router]);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blog");
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to load blog database");
      setLoading(false);
      showToast("Error loading blog database", "error");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const getTodayFormattedDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleOpenCreateModal = () => {
    setCurrentPost(null);
    setFormData({
      title: "",
      category: "Gold Loan Insights",
      date: getTodayFormattedDate(),
      readTime: "5 min read",
      summary: "",
      bannerImage: "",
      isFeatured: false,
      author: {
        name: "Ramesh K. Nair",
        role: "Chief Financial Analyst",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
        bio: "Ramesh has over 18 years of experience in retail NBFC lending, wealth management, and gold-collateralized micro-financing."
      },
      tagsInput: "Gold Loan, Financial Tips",
      content: [
        { type: "paragraph", text: "" }
      ]
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleOpenEditModal = (post: BlogPost) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      category: post.category || "Gold Loan Insights",
      date: post.date || getTodayFormattedDate(),
      readTime: post.readTime || "5 min read",
      summary: post.summary,
      bannerImage: post.bannerImage,
      isFeatured: !!post.isFeatured,
      author: {
        name: post.author?.name || "Ramesh K. Nair",
        role: post.author?.role || "Chief Financial Analyst",
        avatar: post.author?.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
        bio: post.author?.bio || ""
      },
      tagsInput: post.tags ? post.tags.join(", ") : "",
      content: post.content && post.content.length > 0 
        ? JSON.parse(JSON.stringify(post.content)) 
        : [{ type: "paragraph", text: post.summary }]
    });
    setFormError("");
    setModalOpen(true);
  };

  // Clipboard Paste Helper for Banner
  const handlePasteBannerUrl = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text && (text.startsWith("http://") || text.startsWith("https://") || text.startsWith("/"))) {
          setFormData((prev) => ({ ...prev, bannerImage: text.trim() }));
          setCopiedBanner(true);
          setTimeout(() => setCopiedBanner(false), 2000);
        } else {
          showToast("Clipboard does not contain a valid image URL", "error");
        }
      }
    } catch (e) {
      showToast("Unable to read clipboard. Please paste manually.", "error");
    }
  };

  // Content Block Handlers
  const handleAddContentBlock = (type: "paragraph" | "heading" | "quote" | "list" | "image" | "callout") => {
    setFormData((prev) => ({
      ...prev,
      content: [
        ...prev.content,
        type === "list" 
          ? { type: "list", items: [""] } 
          : type === "image"
          ? { type: "image", url: "", caption: "" }
          : type === "callout"
          ? { type: "callout", text: "", title: "" }
          : { type, text: "" }
      ]
    }));
  };

  const handleRemoveContentBlock = (index: number) => {
    setFormData((prev) => {
      const list = [...prev.content];
      list.splice(index, 1);
      return {
        ...prev,
        content: list.length > 0 ? list : [{ type: "paragraph", text: "" }]
      };
    });
  };

  const handleContentBlockChange = (index: number, val: string) => {
    setFormData((prev) => {
      const list = [...prev.content];
      list[index] = { ...list[index], text: val };
      return { ...prev, content: list };
    });
  };

  const handleContentCalloutTitleChange = (index: number, val: string) => {
    setFormData((prev) => {
      const list = [...prev.content];
      list[index] = { ...list[index], title: val };
      return { ...prev, content: list };
    });
  };

  const handleContentImageChange = (index: number, field: "url" | "caption", val: string) => {
    setFormData((prev) => {
      const list = [...prev.content];
      list[index] = { ...list[index], [field]: val };
      return { ...prev, content: list };
    });
  };

  // List Item Handlers
  const handleAddListItem = (blockIndex: number) => {
    setFormData((prev) => {
      const list = [...prev.content];
      const items = list[blockIndex].items || [];
      list[blockIndex] = { ...list[blockIndex], items: [...items, ""] };
      return { ...prev, content: list };
    });
  };

  const handleRemoveListItem = (blockIndex: number, itemIndex: number) => {
    setFormData((prev) => {
      const list = [...prev.content];
      const items = [...(list[blockIndex].items || [])];
      items.splice(itemIndex, 1);
      list[blockIndex] = { ...list[blockIndex], items: items.length > 0 ? items : [""] };
      return { ...prev, content: list };
    });
  };

  const handleListItemChange = (blockIndex: number, itemIndex: number, val: string) => {
    setFormData((prev) => {
      const list = [...prev.content];
      const items = [...(list[blockIndex].items || [])];
      items[itemIndex] = val;
      list[blockIndex] = { ...list[blockIndex], items };
      return { ...prev, content: list };
    });
  };

  // Submit Handler (Create or Update)
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    const { title, category, summary, bannerImage, author } = formData;
    if (!title.trim() || !category || !summary.trim() || !bannerImage.trim()) {
      setFormError("Title, Category, Summary, and Banner Image URL are required fields.");
      return;
    }

    if (!author.name.trim() || !author.role.trim()) {
      setFormError("Author Name and Role are required fields.");
      return;
    }

    setFormSubmitting(true);

    // Process tags
    const tags = formData.tagsInput
      ? formData.tagsInput.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
      : [];

    const payload = {
      title: formData.title,
      category: formData.category,
      date: formData.date,
      readTime: formData.readTime,
      summary: formData.summary,
      bannerImage: formData.bannerImage,
      isFeatured: formData.isFeatured,
      author: formData.author,
      tags,
      content: formData.content
    };

    try {
      const url = currentPost ? `/api/blog/${currentPost.id}` : "/api/blog";
      const method = currentPost ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save blog post");
      }

      await fetchBlogs();
      setModalOpen(false);
      showToast(currentPost ? "Blog post updated successfully!" : "New blog post published successfully!");
    } catch (err: any) {
      setFormError(err.message || "Something went wrong saving the post.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete Action
  const handleOpenDeleteConfirm = (post: BlogPost) => {
    setPostToDelete(post);
    setDeleteConfirmOpen(true);
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      const response = await fetch(`/api/blog/${postToDelete.id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog post");
      }

      setPosts((prev) => prev.filter((p) => p.id !== postToDelete.id));
      setDeleteConfirmOpen(false);
      setPostToDelete(null);
      showToast("Blog post deleted successfully.");
    } catch (err: any) {
      showToast(err.message || "Failed to delete post", "error");
      setDeleteConfirmOpen(false);
    }
  };

  // Filter and Search Logic
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.author?.name && post.author.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategoryFilter === "All" || post.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification HUD */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className={`px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-white text-xs font-bold border ${
                toast.type === "success"
                  ? "bg-zinc-950 border-emerald-500/35 text-emerald-400"
                  : "bg-rose-950 border-rose-500/35 text-rose-400"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              )}
              <span>{toast.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-black uppercase text-zinc-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#147FC3]" /> Blog Insights Manager
          </h2>
          <p className="text-xs font-semibold text-zinc-500">
            Publish financial wisdom, quick tips, and microfinance success stories dynamically to the Max Value blog.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#147FC3] hover:bg-[#FCA038] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Blog Post
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search */}
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4.5 top-3.5" />
          <input
            type="text"
            placeholder="Search articles by title, author, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-zinc-200 text-sm outline-none text-zinc-800 focus:ring-2 focus:ring-[#147FC3]/40 focus:border-[#147FC3] transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="md:col-span-4">
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-700 font-semibold focus:ring-2 focus:ring-[#147FC3]/40 focus:border-[#147FC3] outline-none transition-all cursor-pointer"
          >
            <option value="All">All Categories</option>
            {DEFAULT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* CountHUD */}
        <div className="md:col-span-2 text-right text-xs font-bold text-zinc-400">
          {filteredPosts.length} Articles Listed
        </div>
      </div>

      {/* Blogs Database Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 bg-zinc-200 rounded-2xl" />
          ))}
        </div>
      ) : error ? (
        <div className="p-8 text-center text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto mb-2" />
          <h4 className="font-bold text-sm uppercase">Failed to load blogs</h4>
          <p className="text-xs text-rose-500 mt-1">{error}</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200/90 shadow-sm max-w-md mx-auto space-y-4">
          <BookOpen className="w-12 h-12 text-zinc-300 mx-auto" />
          <div className="space-y-1">
            <h4 className="text-base font-black uppercase text-zinc-800">No blog posts found</h4>
            <p className="text-xs font-medium text-zinc-500">
              Create your first blog post to share financial insights with your website visitors.
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 bg-[#147FC3] hover:bg-[#FCA038] text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Banner Image */}
              <div className="relative h-44 w-full bg-zinc-950 overflow-hidden">
                <img
                  src={post.bannerImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  onError={(e: any) => {
                    e.target.src = "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#147FC3] text-white text-[9px] font-black uppercase">
                  {post.category}
                </span>
                
                {post.isFeatured && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#FCA038] text-white text-[9px] font-black uppercase flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Featured
                  </span>
                )}
              </div>

              {/* Info Area */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#147FC3]" /> {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FCA038]" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-zinc-900 line-clamp-2 leading-snug uppercase group-hover:text-[#147FC3] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-zinc-500 text-xs font-semibold line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {post.author?.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full object-cover border border-zinc-200"
                        onError={(e: any) => {
                          e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200";
                        }}
                      />
                    ) : (
                      <User className="w-4 h-4 text-zinc-400" />
                    )}
                    <span className="text-[10px] font-black text-zinc-700">{post.author?.name || "Corporate"}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(post)}
                      className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-600 hover:text-[#147FC3] transition-colors cursor-pointer"
                      title="Edit Article"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    
                    <a
                      href={`/blog/${post.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-600 hover:text-[#FCA038] transition-colors"
                      title="View Article on Site"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleOpenDeleteConfirm(post)}
                      className="p-2 hover:bg-rose-50 rounded-lg text-zinc-600 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FORM MODAL (CREATE / EDIT) */}
      <AnimatePresence>
        {modalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/45 backdrop-blur-xs"
            onClick={() => !formSubmitting && setModalOpen(false)}
          >
            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col"
            >
              {/* Modal Head */}
              <div className="p-6 border-b border-zinc-200 flex items-center justify-between shrink-0 bg-zinc-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#147FC3]/10 text-[#147FC3] flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase text-zinc-900 tracking-tight">
                      {currentPost ? "Modify Blog Post" : "Publish New Blog Post"}
                    </h3>
                    <p className="text-[10px] font-semibold text-zinc-500">
                      Fill in the metadata and structure content blocks below.
                    </p>
                  </div>
                </div>

                <button
                  disabled={formSubmitting}
                  onClick={() => setModalOpen(false)}
                  className="p-2 hover:bg-zinc-200/80 rounded-full text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable form) */}
              <form onSubmit={handleSubmitForm} className="flex-1 overflow-y-auto p-6 space-y-6" style={{ maxHeight: "calc(90vh - 120px)" }}>
                
                {formError && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-700 text-xs font-bold">
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Grid Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-black uppercase text-zinc-700">Article Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. 5 Smart Tips to Leverage Gold Loans for Your Business"
                      className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-[#147FC3]/40 focus:border-[#147FC3] transition-all"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-zinc-700">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-sm text-zinc-700 font-semibold outline-none focus:ring-2 focus:ring-[#147FC3]/40 focus:border-[#147FC3] cursor-pointer"
                    >
                      {DEFAULT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-zinc-700">Publish Date (Display Only)</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                      placeholder="e.g. August 10, 2026"
                      className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-[#147FC3]/40"
                    />
                  </div>

                  {/* Read Time */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-zinc-700">Estimate Read Time</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData((prev) => ({ ...prev, readTime: e.target.value }))}
                      placeholder="e.g. 5 min read"
                      className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-[#147FC3]/40"
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-zinc-700">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={formData.tagsInput}
                      onChange={(e) => setFormData((prev) => ({ ...prev, tagsInput: e.target.value }))}
                      placeholder="e.g. Gold Loan, Savings, NBFC, Business Credit"
                      className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-sm text-zinc-800 outline-none"
                    />
                  </div>

                  {/* Banner Image Cloudinary Uploader */}
                  <div className="md:col-span-2">
                    <ImageUpload
                      value={formData.bannerImage}
                      onChange={(url) => setFormData((prev) => ({ ...prev, bannerImage: url }))}
                      label="Banner Cover Image"
                      required
                    />
                  </div>
                    
                    {/* Presets Grid */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase text-zinc-400 block">Preset Banner Images</span>
                      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                        {CURATED_IMAGE_PRESETS.map((preset) => (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, bannerImage: preset.url }))}
                            className={`relative aspect-[16/10] bg-zinc-900 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                              formData.bannerImage === preset.url ? "border-[#147FC3] scale-98" : "border-transparent opacity-80 hover:opacity-100"
                            }`}
                            title={preset.name}
                          >
                            <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-1">
                              <span className="text-[7px] text-white font-extrabold uppercase leading-tight text-center">{preset.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                  {/* Summary */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-black uppercase text-zinc-700">Short Summary *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.summary}
                      onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                      placeholder="Provide a concise 2-3 sentence overview that appears in listings..."
                      className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-[#147FC3]/40"
                    />
                  </div>

                  {/* Featured Flag */}
                  <div className="md:col-span-2 flex items-center gap-3 py-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                      className="w-4.5 h-4.5 border-zinc-300 rounded text-[#147FC3] focus:ring-[#147FC3]/40 cursor-pointer"
                    />
                    <label htmlFor="isFeatured" className="text-xs font-black uppercase text-zinc-700 cursor-pointer select-none">
                      Mark as Featured Article (Highlight at the top of the blog page)
                    </label>
                  </div>
                </div>

                {/* Author Block */}
                <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200/80 space-y-4">
                  <span className="text-xs font-black uppercase text-[#147FC3] tracking-wider block border-b border-zinc-200 pb-2">
                    Author Profile
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Author Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700">Author Name</label>
                      <input
                        type="text"
                        required
                        value={formData.author.name}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          author: { ...prev.author, name: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-zinc-200 rounded-xl text-sm bg-white text-zinc-800"
                      />
                    </div>

                    {/* Author Role */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700">Author Role / Designation</label>
                      <input
                        type="text"
                        required
                        value={formData.author.role}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          author: { ...prev.author, role: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-zinc-200 rounded-xl text-sm bg-white text-zinc-800"
                      />
                    </div>

                    {/* Author Avatar Cloudinary Uploader */}
                    <div className="sm:col-span-2">
                      <ImageUpload
                        value={formData.author.avatar}
                        onChange={(url) => setFormData((prev) => ({
                          ...prev,
                          author: { ...prev.author, avatar: url }
                        }))}
                        label="Author Avatar Image"
                      />
                    </div>

                    {/* Author Bio */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-zinc-700">Author Bio</label>
                      <textarea
                        rows={2}
                        value={formData.author.bio}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          author: { ...prev.author, bio: e.target.value }
                        }))}
                        placeholder="Short paragraph about the author..."
                        className="w-full px-4 py-2 border border-zinc-200 rounded-xl text-sm bg-white text-zinc-800"
                      />
                    </div>
                  </div>
                </div>

                {/* DYNAMIC ARTICLE CONTENT BLOCK BUILDER */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                    <span className="text-xs font-black uppercase text-zinc-700 tracking-wider">
                      Article Content Layout Blocks
                    </span>
                    <span className="text-[10px] font-black uppercase text-zinc-400">
                      {formData.content.length} Blocks Created
                    </span>
                  </div>

                  {/* Render content blocks */}
                  <div className="space-y-4">
                    {formData.content.map((block, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl border border-zinc-200/90 shadow-xs overflow-hidden flex flex-col md:flex-row"
                      >
                        {/* Block Type Indicator Sidebar */}
                        <div className="p-3 bg-zinc-50 border-r border-zinc-100 flex md:flex-col items-center justify-between md:justify-center gap-2 shrink-0 w-full md:w-32 text-center">
                          <span className="text-[10px] font-black uppercase text-zinc-400 block tracking-wider">
                            Block {index + 1}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border tracking-wider ${
                            block.type === "paragraph"
                              ? "bg-zinc-100 border-zinc-300 text-zinc-700"
                              : block.type === "heading"
                              ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                              : block.type === "quote"
                              ? "bg-amber-50 border-amber-200 text-amber-700"
                              : block.type === "callout"
                              ? "bg-sky-50 border-sky-200 text-sky-700"
                              : block.type === "list"
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                              : "bg-purple-50 border-purple-200 text-purple-700"
                          }`}>
                            {block.type}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => handleRemoveContentBlock(index)}
                            className="p-1 hover:bg-rose-50 text-zinc-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                            title="Remove Content Block"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Block Content Inputs */}
                        <div className="p-4 flex-1 space-y-3">
                          {/* Standard Texts: Paragraph, Heading, Quote */}
                          {(block.type === "paragraph" || block.type === "heading" || block.type === "quote") && (
                            <textarea
                              rows={block.type === "paragraph" ? 4 : 2}
                              required
                              value={block.text || ""}
                              onChange={(e) => handleContentBlockChange(index, e.target.value)}
                              placeholder={`Enter the content block ${block.type} text here...`}
                              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm text-zinc-800 outline-none"
                            />
                          )}

                          {/* Callout */}
                          {block.type === "callout" && (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={block.title || ""}
                                onChange={(e) => handleContentCalloutTitleChange(index, e.target.value)}
                                placeholder="Callout Header Title (e.g. Pro Tip, Key Note)"
                                className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm font-bold text-[#147FC3]"
                              />
                              <textarea
                                rows={2}
                                required
                                value={block.text || ""}
                                onChange={(e) => handleContentBlockChange(index, e.target.value)}
                                placeholder="Callout text body contents..."
                                className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm text-zinc-800"
                              />
                            </div>
                          )}

                          {/* Image Block */}
                          {block.type === "image" && (
                            <div className="space-y-2">
                              <ImageUpload
                                value={block.url || ""}
                                onChange={(url) => handleContentImageChange(index, "url", url)}
                                label="Block Image"
                                required
                              />
                              <input
                                type="text"
                                value={block.caption || ""}
                                onChange={(e) => handleContentImageChange(index, "caption", e.target.value)}
                                placeholder="Optional image caption / attribution"
                                className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs"
                              />
                            </div>
                          )}

                          {/* List Block */}
                          {block.type === "list" && block.items && (
                            <div className="space-y-2">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase block">Bullet List Items</span>
                              <div className="space-y-2">
                                {block.items.map((item, itemIdx) => (
                                  <div key={itemIdx} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#147FC3] shrink-0" />
                                    <input
                                      type="text"
                                      required
                                      value={item}
                                      onChange={(e) => handleListItemChange(index, itemIdx, e.target.value)}
                                      placeholder={`Bullet item ${itemIdx + 1}`}
                                      className="flex-1 px-3 py-1.5 border border-zinc-200 rounded-lg text-sm text-zinc-800 outline-none"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveListItem(index, itemIdx)}
                                      className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-zinc-50 rounded"
                                      disabled={block.items!.length <= 1}
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <button
                                type="button"
                                onClick={() => handleAddListItem(index)}
                                className="text-[10px] font-black uppercase text-[#147FC3] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                              >
                                <PlusCircle className="w-3 h-3" /> Add List Item
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add block trigger panel */}
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-dashed border-zinc-300 text-center space-y-3">
                    <span className="text-[11px] font-black uppercase text-zinc-500 block tracking-wider">
                      Add Content Block Element
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock("paragraph")}
                        className="px-3 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-700 cursor-pointer shadow-xs"
                      >
                        Paragraph
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock("heading")}
                        className="px-3 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-700 cursor-pointer shadow-xs"
                      >
                        Heading
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock("quote")}
                        className="px-3 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-700 cursor-pointer shadow-xs"
                      >
                        Block Quote
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock("callout")}
                        className="px-3 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-700 cursor-pointer shadow-xs"
                      >
                        Callout / Box
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock("list")}
                        className="px-3 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-700 cursor-pointer shadow-xs"
                      >
                        Bullet List
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock("image")}
                        className="px-3 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-700 cursor-pointer shadow-xs"
                      >
                        Inline Image
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modal footer controls inside form */}
                <div className="pt-6 border-t border-zinc-200 flex items-center justify-end gap-3 shrink-0 bg-white">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 border border-zinc-200 hover:bg-zinc-50 rounded-xl text-xs font-bold text-zinc-700 uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="px-5 py-2.5 bg-zinc-950 hover:bg-[#147FC3] text-white text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer disabled:bg-zinc-400 transition-colors flex items-center gap-1.5"
                  >
                    {formSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...
                      </>
                    ) : currentPost ? (
                      "Save Updates"
                    ) : (
                      "Publish Article"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION DIALOG */}
      <AnimatePresence>
        {deleteConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 border border-zinc-200 space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-black uppercase text-zinc-900">Confirm Deletion</h4>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                  Are you sure you want to delete <span className="font-bold text-zinc-800">&quot;{postToDelete?.title}&quot;</span>? This action is permanent and will instantly remove the article from the website.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-100">
                <button
                  onClick={() => {
                    setDeleteConfirmOpen(false);
                    setPostToDelete(null);
                  }}
                  className="px-4 py-2 border border-zinc-200 hover:bg-zinc-50 text-xs font-bold uppercase text-zinc-700 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePost}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase rounded-lg cursor-pointer transition-colors"
                >
                  Delete Post
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
