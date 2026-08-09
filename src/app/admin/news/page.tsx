"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Newspaper,
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

interface ContentBlock {
  type: "paragraph" | "heading" | "quote" | "list" | "image";
  text?: string;
  items?: string[];
  url?: string;
  caption?: string;
}

interface SupportingImage {
  url: string;
  caption: string;
}

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  summary: string;
  bannerImage: string;
  content: ContentBlock[];
  supportingImages: SupportingImage[];
  createdAt?: string;
}

const DEFAULT_CATEGORIES = [
  "Gold Loan Updates",
  "Branch Expansion",
  "Microfinance & CSR",
  "Business & Traders Credit",
  "Digital Innovation",
  "Financial Results & Growth",
  "Awards & Milestones",
  "Press Releases"
];

const CURATED_IMAGE_PRESETS = [
  {
    name: "Gold Loan & Valuation",
    url: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Branch Opening & Network",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Microfinance & Inclusion",
    url: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Digital Credit Portal",
    url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Traders & MSME Finance",
    url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Corporate Executive Board",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function AdminNewsPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

  // Form Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    summary: string;
    bannerImage: string;
    content: ContentBlock[];
    supportingImages: SupportingImage[];
  }>({
    title: "",
    category: "Gold Loan Updates",
    date: "",
    author: "Corporate Communications, Max Value Head Office",
    readTime: "3 min read",
    summary: "",
    bannerImage: "",
    content: [{ type: "paragraph", text: "" }],
    supportingImages: []
  });

  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [copiedBanner, setCopiedBanner] = useState(false);

  // Delete Confirmation Modal State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<NewsArticle | null>(null);

  // Toast notification state
  const [toasts, setToasts] = useState<{ id: number; text: string; type: "success" | "error" }[]>([]);

  // Auth check guard
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/adminlogin");
    }
  }, [router]);

  // Fetch articles from API
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/news");
      if (!response.ok) {
        throw new Error("Failed to fetch news articles");
      }
      const data = await response.json();
      setArticles(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to load news database");
      setLoading(false);
      showToast("Error loading news database", "error");
    }
  };

  useEffect(() => {
    fetchArticles();
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
    setCurrentArticle(null);
    setFormData({
      title: "",
      category: "Gold Loan Updates",
      date: getTodayFormattedDate(),
      author: "Corporate Communications, Max Value Head Office",
      readTime: "3 min read",
      summary: "",
      bannerImage: "",
      content: [
        { type: "paragraph", text: "" }
      ],
      supportingImages: []
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleOpenEditModal = (article: NewsArticle) => {
    setCurrentArticle(article);
    setFormData({
      title: article.title,
      category: article.category || "Gold Loan Updates",
      date: article.date || getTodayFormattedDate(),
      author: article.author || "Corporate Communications, Max Value Head Office",
      readTime: article.readTime || "3 min read",
      summary: article.summary,
      bannerImage: article.bannerImage,
      content: article.content && article.content.length > 0 
        ? JSON.parse(JSON.stringify(article.content)) 
        : [{ type: "paragraph", text: article.summary }],
      supportingImages: article.supportingImages && article.supportingImages.length > 0
        ? JSON.parse(JSON.stringify(article.supportingImages))
        : []
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
  const handleAddContentBlock = (type: "paragraph" | "heading" | "quote" | "list" | "image") => {
    setFormData((prev) => ({
      ...prev,
      content: [
        ...prev.content,
        type === "list" 
          ? { type: "list", items: [""] } 
          : type === "image"
          ? { type: "image", url: "", caption: "" }
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

  // Supporting Images Handlers
  const handleAddSupportingImage = () => {
    setFormData((prev) => ({
      ...prev,
      supportingImages: [...prev.supportingImages, { url: "", caption: "" }]
    }));
  };

  const handleRemoveSupportingImage = (index: number) => {
    setFormData((prev) => {
      const list = [...prev.supportingImages];
      list.splice(index, 1);
      return { ...prev, supportingImages: list };
    });
  };

  const handleSupportingImageChange = (index: number, field: "url" | "caption", val: string) => {
    setFormData((prev) => {
      const list = [...prev.supportingImages];
      list[index] = { ...list[index], [field]: val };
      return { ...prev, supportingImages: list };
    });
  };

  const handlePasteSupportingImageUrl = async (index: number) => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text && (text.startsWith("http://") || text.startsWith("https://") || text.startsWith("/"))) {
          handleSupportingImageChange(index, "url", text.trim());
          showToast("Image URL pasted!", "success");
        } else {
          showToast("Clipboard does not contain a valid image URL", "error");
        }
      }
    } catch (e) {
      showToast("Unable to read clipboard. Please paste manually.", "error");
    }
  };

  // Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const { title, category, date, author, readTime, summary, bannerImage, content, supportingImages } = formData;

    if (!title.trim() || !category.trim() || !summary.trim() || !bannerImage.trim()) {
      setFormError("Title, Category, Summary, and Banner Image URL are required.");
      return;
    }

    // Clean up empty content blocks
    const cleanedContent = content.filter((b) => {
      if (b.type === "list") {
        return (b.items && b.items.filter((i) => i.trim() !== "").length > 0);
      }
      if (b.type === "image") {
        return b.url && b.url.trim() !== "";
      }
      return b.text && b.text.trim() !== "";
    });

    // Clean up empty supporting images
    const cleanedSupportingImages = supportingImages.filter((img) => img.url.trim() !== "");

    try {
      setFormSubmitting(true);

      const payload = {
        title: title.trim(),
        category: category.trim(),
        date: date.trim() || getTodayFormattedDate(),
        author: author.trim() || "Corporate Communications, Max Value Head Office",
        readTime: readTime.trim() || "3 min read",
        summary: summary.trim(),
        bannerImage: bannerImage.trim(),
        content: cleanedContent.length > 0 ? cleanedContent : [{ type: "paragraph", text: summary.trim() }],
        supportingImages: cleanedSupportingImages
      };

      let response;
      if (currentArticle) {
        response = await fetch(`/api/news/${currentArticle.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save news article");
      }

      showToast(
        currentArticle ? "News article updated successfully!" : "New news article published successfully!",
        "success"
      );
      setModalOpen(false);
      fetchArticles();
    } catch (err: any) {
      setFormError(err.message || "Failed to submit form data");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleOpenDeleteModal = (article: NewsArticle) => {
    setArticleToDelete(article);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return;

    try {
      const response = await fetch(`/api/news/${articleToDelete.id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete news article");
      }

      showToast("News article deleted successfully!", "success");
      setDeleteConfirmOpen(false);
      setArticleToDelete(null);
      fetchArticles();
    } catch (err: any) {
      showToast(err.message || "Failed to delete news article", "error");
    }
  };

  // Filters
  const categoriesList = Array.from(
    new Set([...DEFAULT_CATEGORIES, ...articles.map((a) => a.category).filter(Boolean)])
  );

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.author && article.author.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategoryFilter === "All" || article.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-[#FCA038]/20 text-[#FCA038] font-bold text-[10px] tracking-wide">
              Max Value Credits & Investments Ltd.
            </span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">News & Press Releases</h1>
          <p className="text-sm text-zinc-500 font-medium mt-0.5">
            Publish official announcements, Gold Loan rate updates, branch inaugurations, and microfinance achievements.
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-950 hover:bg-[#147FC3] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-zinc-950/15 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Publish News Article
        </button>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#147FC3]/10 text-[#147FC3] flex items-center justify-center font-bold">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-400">Total Articles</p>
            <h3 className="text-2xl font-bold text-zinc-900">{articles.length}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FCA038]/15 text-[#FCA038] flex items-center justify-center font-bold">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-400">Active Categories</p>
            <h3 className="text-2xl font-bold text-zinc-900">{categoriesList.length}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-400">Corporate Hub</p>
            <h3 className="text-sm font-bold text-emerald-600">Max Value News Desk</h3>
          </div>
        </div>
      </div>

      {/* FILTER AND SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200/90 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by article headline, branch expansion, gold loans, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:bg-white focus:border-[#147FC3] outline-none font-bold text-zinc-700 placeholder:text-zinc-400 transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider hidden md:inline">
            Category:
          </span>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="w-full md:w-56 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none font-bold text-zinc-700 cursor-pointer focus:bg-white focus:border-[#147FC3] transition-all"
          >
            <option value="All">All Categories</option>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* ARTICLES TABLE/CARDS */}
      <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-[#147FC3] animate-spin" />
            <p className="text-xs font-bold text-zinc-400">Loading Max Value News Database...</p>
          </div>
        ) : error ? (
          <div className="p-16 text-center text-rose-500 font-bold text-sm">
            <AlertCircle className="w-10 h-10 mx-auto mb-2 text-rose-400" />
            {error}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-16 text-center text-zinc-400 font-bold text-sm flex flex-col items-center justify-center">
            <Newspaper className="w-12 h-12 mb-3 text-zinc-300" />
            No News Articles Found
            {searchTerm && <span className="text-xs font-normal text-zinc-400 mt-1">Try searching for Gold Loans, Branch Expansion, or Microfinance.</span>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-zinc-50 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200">
                <tr>
                  <th className="p-4 pl-6">Article Headline & Media</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Author / Desk</th>
                  <th className="p-4">Publish Date</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-zinc-50/50 transition-colors group">
                    
                    {/* Thumbnail & Title */}
                    <td className="p-4 pl-6 max-w-md">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200 relative">
                          <img
                            src={article.bannerImage}
                            alt={article.title}
                            className="w-full h-full object-cover"
                            onError={(e: any) => {
                              e.target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80";
                            }}
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-extrabold text-zinc-900 line-clamp-1 group-hover:text-[#147FC3] transition-colors uppercase">
                            {article.title}
                          </span>
                          <span className="text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                            {article.summary}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-bold mt-1">
                            ID: <span className="font-mono">{article.id}</span>
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#147FC3]/10 text-[#147FC3] text-xs font-bold whitespace-nowrap">
                        {article.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="p-4 font-bold text-zinc-700 text-xs">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        {article.author}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="p-4 text-xs font-semibold text-zinc-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#FCA038]" />
                        {article.date}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        
                        {/* View Live */}
                        <a
                          href={`/news/${article.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-[#147FC3] text-zinc-500 hover:text-[#147FC3] flex items-center justify-center transition-all bg-white"
                          title="View Live Article"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        {/* Edit */}
                        <button
                          onClick={() => handleOpenEditModal(article)}
                          className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-[#147FC3] text-zinc-500 hover:text-[#147FC3] flex items-center justify-center transition-all bg-white cursor-pointer"
                          title="Edit Article"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleOpenDeleteModal(article)}
                          className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-rose-500 text-zinc-500 hover:text-rose-500 flex items-center justify-center transition-all bg-white cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT ARTICLE DIALOG MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !formSubmitting && setModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/45 backdrop-blur-xs"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-150 flex items-center justify-between shrink-0 bg-zinc-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#147FC3]/10 text-[#147FC3] flex items-center justify-center">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-zinc-900 tracking-tight">
                      {currentArticle ? "EDIT NEWS ARTICLE" : "PUBLISH MAX VALUE ANNOUNCEMENT"}
                    </h3>
                    <p className="text-xs text-zinc-400 font-bold mt-0.5">
                      {currentArticle ? `Editing ID: ${currentArticle.id}` : "Publish a verified press update to the Max Value corporate news portal."}
                    </p>
                  </div>
                </div>
                <button
                  disabled={formSubmitting}
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Body Scroll Area */}
              <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {formError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {formError}
                  </div>
                )}

                {/* 1. MAIN BANNER IMAGE URL SETUP */}
                <div className="p-5 bg-zinc-50/80 border border-zinc-200/90 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-[#147FC3]" />
                      Main Banner Cover Image URL <span className="text-rose-500">*</span>
                    </label>

                    <button
                      type="button"
                      onClick={handlePasteBannerUrl}
                      className="px-3 py-1 bg-white hover:bg-[#147FC3] hover:text-white border border-zinc-200 rounded-lg text-[11px] font-bold text-zinc-700 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      {copiedBanner ? <Check className="w-3 h-3 text-emerald-500" /> : <Clipboard className="w-3 h-3" />}
                      <span>{copiedBanner ? "Pasted!" : "Paste from Clipboard"}</span>
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. https://images.unsplash.com/photo-... or /assets/gold-loan-inauguration.jpg"
                      value={formData.bannerImage}
                      onChange={(e) => setFormData(prev => ({ ...prev, bannerImage: e.target.value }))}
                      className="flex-1 px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 focus:border-[#147FC3] outline-none transition-all"
                    />
                    {formData.bannerImage && (
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, bannerImage: "" }))}
                        className="px-3 py-2 bg-zinc-150 hover:bg-rose-50 hover:text-rose-600 text-zinc-500 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Sample Presets Helper */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mr-1">
                      Max Value Presets:
                    </span>
                    {CURATED_IMAGE_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, bannerImage: preset.url }))}
                        className="px-2.5 py-1 bg-white hover:bg-[#147FC3] hover:text-white border border-zinc-200 rounded-lg text-[10px] font-bold text-zinc-600 transition-colors cursor-pointer"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>

                  {/* Live Banner Preview Card */}
                  {formData.bannerImage ? (
                    <div className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200 shadow-sm mt-2">
                      <img
                        src={formData.bannerImage}
                        alt="Banner Preview"
                        className="w-full h-full object-cover"
                        onError={(e: any) => {
                          e.target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Live Cover Preview
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-24 rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-400 text-xs font-semibold gap-1 bg-white">
                      <ImageIcon className="w-6 h-6 text-zinc-300" />
                      <span>Paste an image URL above to see a live banner preview</span>
                    </div>
                  )}
                </div>

                {/* 2. CORE DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Title */}
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      Article Headline / Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Max Value Expands Gold Loan & Microfinance Network with 25 New Branches Across Kerala & Tamil Nadu"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 focus:bg-white focus:border-[#147FC3] outline-none transition-all"
                    />
                  </div>

                  {/* Category */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      News Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 focus:bg-white focus:border-[#147FC3] outline-none transition-all cursor-pointer"
                    >
                      {categoriesList.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Author */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      Author / Department Desk
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Corporate Communications, Max Value Head Office"
                      value={formData.author}
                      onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 focus:bg-white focus:border-[#147FC3] outline-none transition-all"
                    />
                  </div>

                  {/* Publish Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      Publish Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. February 09, 2026"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 focus:bg-white focus:border-[#147FC3] outline-none transition-all"
                    />
                  </div>

                  {/* Read Time */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      Estimated Read Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3 min read"
                      value={formData.readTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                      className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 focus:bg-white focus:border-[#147FC3] outline-none transition-all"
                    />
                  </div>

                </div>

                {/* 3. SUMMARY EXCERPT */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Executive Summary / Lead Excerpt <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Max Value Credits & Investments Ltd. marks significant growth with new branch openings, bringing doorstep gold valuation and microfinance loans to over 100,000 customers..."
                    value={formData.summary}
                    onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                    className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 focus:bg-white focus:border-[#147FC3] outline-none transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* 4. FULL ARTICLE CONTENT BUILDER */}
                <div className="border-t border-zinc-150 pt-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-extrabold uppercase text-zinc-800 tracking-wider">
                        Article Content Builder
                      </h4>
                      <p className="text-[11px] text-zinc-400 font-semibold">
                        Add paragraphs, section headings, quotes, bullet lists, or inline photos.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock("paragraph")}
                        className="px-2.5 py-1 bg-zinc-100 hover:bg-[#147FC3] hover:text-white rounded-lg text-[11px] font-bold text-zinc-600 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <AlignLeft className="w-3 h-3" /> + Paragraph
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock("heading")}
                        className="px-2.5 py-1 bg-zinc-100 hover:bg-[#147FC3] hover:text-white rounded-lg text-[11px] font-bold text-zinc-600 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        + Heading
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock("quote")}
                        className="px-2.5 py-1 bg-zinc-100 hover:bg-[#147FC3] hover:text-white rounded-lg text-[11px] font-bold text-zinc-600 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Quote className="w-3 h-3" /> + Quote
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock("list")}
                        className="px-2.5 py-1 bg-zinc-100 hover:bg-[#147FC3] hover:text-white rounded-lg text-[11px] font-bold text-zinc-600 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <List className="w-3 h-3" /> + Bullet List
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock("image")}
                        className="px-2.5 py-1 bg-zinc-100 hover:bg-[#147FC3] hover:text-white rounded-lg text-[11px] font-bold text-zinc-600 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ImageIcon className="w-3 h-3" /> + Inline Photo
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {formData.content.map((block, bIdx) => (
                      <div key={bIdx} className="p-3.5 bg-zinc-50 border border-zinc-200/90 rounded-2xl space-y-2 relative group">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                            {block.type === "paragraph" && <AlignLeft className="w-3 h-3 text-[#147FC3]" />}
                            {block.type === "heading" && <span className="text-[#FCA038] font-black">H2</span>}
                            {block.type === "quote" && <Quote className="w-3 h-3 text-purple-500" />}
                            {block.type === "list" && <List className="w-3 h-3 text-emerald-500" />}
                            {block.type === "image" && <ImageIcon className="w-3 h-3 text-[#147FC3]" />}
                            {block.type} Block #{bIdx + 1}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => handleRemoveContentBlock(bIdx)}
                            className="text-zinc-400 hover:text-rose-600 transition-colors p-1 rounded-md cursor-pointer"
                            title="Remove Block"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {block.type === "list" ? (
                          <div className="space-y-2">
                            {(block.items || []).map((item, itemIdx) => (
                              <div key={itemIdx} className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#147FC3] shrink-0" />
                                <input
                                  type="text"
                                  placeholder="e.g. Doorstep Gold Loan appraisal within 3 minutes..."
                                  value={item}
                                  onChange={(e) => handleListItemChange(bIdx, itemIdx, e.target.value)}
                                  className="flex-1 px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3]"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveListItem(bIdx, itemIdx)}
                                  className="text-zinc-400 hover:text-rose-500 p-1 cursor-pointer"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => handleAddListItem(bIdx)}
                              className="text-[11px] font-bold text-[#147FC3] hover:underline flex items-center gap-1 cursor-pointer mt-1"
                            >
                              <PlusCircle className="w-3 h-3" /> Add point
                            </button>
                          </div>
                        ) : block.type === "image" ? (
                          <div className="space-y-2 bg-white p-3 rounded-xl border border-zinc-200">
                            <div className="flex gap-2 items-center">
                              <input
                                type="text"
                                placeholder="Paste inline image URL (e.g. branch counter, ceremony)..."
                                value={block.url || ""}
                                onChange={(e) => handleContentImageChange(bIdx, "url", e.target.value)}
                                className="flex-1 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-700 outline-none focus:border-[#147FC3]"
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Photo caption (e.g. Dignitaries and management at the branch opening ceremony)..."
                              value={block.caption || ""}
                              onChange={(e) => handleContentImageChange(bIdx, "caption", e.target.value)}
                              className="w-full px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-700 outline-none focus:border-[#147FC3]"
                            />
                            {block.url && (
                              <div className="w-32 h-20 rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200 relative mt-1">
                                <img src={block.url} alt="Inline preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                        ) : (
                          <textarea
                            rows={block.type === "heading" ? 1 : 3}
                            placeholder={
                              block.type === "heading"
                                ? "Subheading title (e.g. Accelerating Financial Inclusion Across South India)..."
                                : block.type === "quote"
                                ? "Notable quote (e.g. 'Our mission is to empower everyday families and traders with rapid, dignified credit')..."
                                : "Write paragraph text..."
                            }
                            value={block.text || ""}
                            onChange={(e) => handleContentBlockChange(bIdx, e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-medium text-zinc-700 outline-none focus:border-[#147FC3] transition-all resize-none leading-relaxed"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. SUPPORTING EVENT MEDIA GALLERY SETUP */}
                <div className="border-t border-zinc-150 pt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold uppercase text-zinc-800 tracking-wider flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-[#147FC3]" />
                        Event Media & Supporting Photos Setup (Optional)
                      </h4>
                      <p className="text-[11px] text-zinc-400 font-semibold">
                        Add event photos, press conferences, or branch launch gallery images.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddSupportingImage}
                      className="px-3 py-1.5 bg-[#147FC3]/10 hover:bg-[#147FC3] hover:text-white text-[#147FC3] rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      Add Photo
                    </button>
                  </div>

                  {formData.supportingImages.length === 0 ? (
                    <div className="p-4 bg-zinc-50 border border-dashed border-zinc-200 rounded-2xl text-center text-xs text-zinc-400 font-medium">
                      No supporting event photos added yet. Click "+ Add Photo" to attach gallery images.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.supportingImages.map((img, idx) => (
                        <div key={idx} className="p-3.5 bg-zinc-50 border border-zinc-200/90 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          
                          {/* Live Thumbnail Preview */}
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-200 shrink-0 border border-zinc-300 relative flex items-center justify-center">
                            {img.url ? (
                              <img
                                src={img.url}
                                alt={`Event photo ${idx + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e: any) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            ) : (
                              <ImageIcon className="w-6 h-6 text-zinc-400" />
                            )}
                          </div>

                          {/* Inputs */}
                          <div className="flex-1 space-y-2 w-full">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Paste Image URL (e.g. https://images.unsplash.com/...)"
                                value={img.url}
                                onChange={(e) => handleSupportingImageChange(idx, "url", e.target.value)}
                                className="flex-1 px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-medium text-zinc-700 outline-none focus:border-[#147FC3]"
                              />
                              <button
                                type="button"
                                onClick={() => handlePasteSupportingImageUrl(idx)}
                                className="px-2.5 py-1 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg text-[10px] font-bold text-zinc-600 transition-colors cursor-pointer"
                                title="Paste from clipboard"
                              >
                                Paste
                              </button>
                            </div>
                            <input
                              type="text"
                              placeholder="Photo caption (e.g. Ribbon-cutting ceremony at the new branch in Thrissur)..."
                              value={img.caption}
                              onChange={(e) => handleSupportingImageChange(idx, "caption", e.target.value)}
                              className="w-full px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-medium text-zinc-700 outline-none focus:border-[#147FC3]"
                            />
                          </div>

                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveSupportingImage(idx)}
                            className="w-8 h-8 rounded-lg border border-zinc-200 hover:bg-rose-50 text-zinc-400 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer shrink-0 self-end sm:self-center"
                            title="Remove Photo"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>

                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="pt-5 border-t border-zinc-150 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    disabled={formSubmitting}
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="px-6 py-2.5 bg-zinc-950 hover:bg-[#147FC3] text-white rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2 shadow-md shadow-zinc-950/10"
                  >
                    {formSubmitting && (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    )}
                    {currentArticle ? "Save Changes" : "Publish Announcement"}
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION DIALOG MODAL */}
      <AnimatePresence>
        {deleteConfirmOpen && articleToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmOpen(false)}
              className="absolute inset-0 bg-zinc-950/45 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-zinc-200 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-zinc-900 uppercase">Delete News Article?</h3>
              <p className="text-xs text-zinc-500 font-semibold mt-2 leading-relaxed">
                Are you sure you want to delete <strong className="text-zinc-800">"{articleToDelete.title}"</strong>?<br />
                This action is permanent and will remove the publication from the live public news website.
              </p>
              
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="px-4 py-2.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-600/10 cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST CONTAINER */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`flex items-center gap-2.5 px-4.5 py-3.5 rounded-xl text-xs font-bold text-white shadow-xl ${
                toast.type === "success" ? "bg-zinc-900" : "bg-rose-600"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-white shrink-0" />
              )}
              <span>{toast.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
