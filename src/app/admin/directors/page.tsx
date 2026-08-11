"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "@/components/ImageUpload";
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  PlusCircle,
  Trash,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ShieldCheck,
  Briefcase
} from "lucide-react";

interface Director {
  id: string;
  name: string;
  role: string;
  category: "Executive" | "Independent";
  image: string;
  bio: string;
  highlights?: string[];
  order?: number;
  createdAt?: string;
}

export default function DirectorsAdmin() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDirector, setEditingDirector] = useState<Director | null>(null);
  
  // Form fields
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState<"Executive" | "Independent">("Executive");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [highlightsInput, setHighlightsInput] = useState("");
  const [order, setOrder] = useState<number>(999);

  // Status / Feedback state
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Delete confirm state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetchDirectors();
  }, []);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchDirectors = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/directors");
      if (res.ok) {
        const data = await res.json();
        setDirectors(data);
      } else {
        showToast("Failed to fetch board of directors list", "error");
      }
    } catch (err: any) {
      showToast("Error loading directors: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setRole("");
    setCategory("Executive");
    setImage("");
    setBio("");
    setHighlightsInput("");
    setOrder(999);
    setEditingDirector(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleOpenEdit = (director: Director) => {
    setEditingDirector(director);
    setName(director.name);
    setRole(director.role);
    setCategory(director.category);
    setImage(director.image);
    setBio(director.bio);
    setHighlightsInput(director.highlights ? director.highlights.join(", ") : "");
    setOrder(director.order ?? 999);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !image.trim() || !bio.trim()) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    try {
      setActionLoading(true);
      const highlights = highlightsInput
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean);

      const payload = {
        name: name.trim(),
        role: role.trim(),
        category,
        image: image.trim(),
        bio: bio.trim(),
        highlights,
        order: Number(order)
      };

      const url = editingDirector ? `/api/directors/${editingDirector.id}` : "/api/directors";
      const method = editingDirector ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast(
          editingDirector ? "Director details updated successfully" : "New director created successfully",
          "success"
        );
        setIsFormOpen(false);
        resetForm();
        fetchDirectors();
      } else {
        const errorData = await res.json();
        showToast(errorData.error || "Failed to save director details", "error");
      }
    } catch (err: any) {
      showToast("Error saving director details: " + err.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setActionLoading(true);
      const res = await fetch(`/api/directors/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        showToast("Director deleted successfully", "success");
        setDeleteConfirmId(null);
        fetchDirectors();
      } else {
        showToast("Failed to delete director", "error");
      }
    } catch (err: any) {
      showToast("Error deleting director: " + err.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Filters
  const filteredDirectors = directors.filter((director) => {
    const matchesSearch =
      director.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      director.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      director.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || director.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full space-y-6">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-xl shadow-xl border text-sm font-semibold tracking-wide ${
              toast.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-250"
                : "bg-rose-50 text-rose-800 border-rose-250"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-[#147FC3]" />
            Board of Directors
          </h2>
          <p className="text-zinc-500 text-xs mt-1 font-medium">
            Create, update, order, and manage profiles for Executive and Independent directors.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 bg-[#147FC3] hover:bg-[#0e6198] text-white font-bold text-xs py-3 px-5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Director</span>
        </button>
      </div>

      {/* Filters & Search Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-200/60">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search by name, role, bio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] transition-colors"
          />
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2">
          {["All", "Executive", "Independent"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#147FC3] text-white shadow-xs"
                  : "bg-white text-zinc-650 hover:bg-zinc-100 border border-zinc-200/70"
              }`}
            >
              {cat} Board
            </button>
          ))}
        </div>

      </div>

      {/* Directors Grid Display */}
      {loading ? (
        <div className="w-full py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-[#147FC3] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-zinc-500 font-bold">Loading leadership board...</p>
        </div>
      ) : filteredDirectors.length === 0 ? (
        <div className="w-full py-16 bg-white rounded-2xl border border-zinc-250 text-center flex flex-col items-center justify-center gap-3">
          <Users className="w-8 h-8 text-zinc-300" />
          <div>
            <h4 className="text-sm font-bold text-zinc-700">No Directors Found</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Try searching with a different keyword or category.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDirectors.map((director) => (
            <div
              key={director.id}
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Profile Card Top */}
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-4">
                  {/* Photo Preview */}
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-zinc-200 shrink-0 bg-zinc-50">
                    <img
                      src={director.image || "/directors/manoj.png"}
                      alt={director.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  
                  {/* Title Info */}
                  <div>
                    <h4 className="font-bold text-zinc-900 text-sm line-clamp-1">{director.name}</h4>
                    <p className="text-xs text-[#147FC3] font-bold mt-0.5">{director.role}</p>
                    <span className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                      director.category === "Executive"
                        ? "bg-zinc-100 text-zinc-700 border border-zinc-200"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}>
                      {director.category} Board
                    </span>
                  </div>
                </div>

                {/* Bio text */}
                <p className="text-zinc-600 text-xs line-clamp-4 leading-relaxed text-justify">
                  {director.bio}
                </p>

                {/* Highlights tags */}
                {director.highlights && director.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {director.highlights.slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-semibold bg-zinc-50 border border-zinc-200 text-zinc-500 rounded px-2 py-0.5"
                      >
                        {h}
                      </span>
                    ))}
                    {director.highlights.length > 3 && (
                      <span className="text-[9px] text-zinc-400 font-bold self-center">
                        +{director.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="bg-zinc-50/70 border-t border-zinc-100 px-5 py-3.5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-400">
                  Order Index: <strong className="text-zinc-750">{director.order ?? 999}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(director)}
                    className="p-2 border border-zinc-200 hover:border-[#147FC3]/40 hover:bg-[#147FC3]/5 text-zinc-500 hover:text-[#147FC3] rounded-lg transition-colors cursor-pointer"
                    title="Edit Member Profile"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(director.id)}
                    className="p-2 border border-zinc-200 hover:border-rose-300 hover:bg-rose-50 text-zinc-500 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                    title="Delete Member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setDeleteConfirmId(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-zinc-200 p-6 flex flex-col items-center text-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-zinc-900 text-sm">Delete Director Profile?</h4>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                  This action is permanent and cannot be undone. This profile will be deleted from the live board instantly.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full mt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  disabled={actionLoading}
                  className="py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-650 font-bold text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
                  disabled={actionLoading}
                  className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center"
                >
                  {actionLoading ? "Deleting..." : "Delete Profile"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Editor Drawer / Modal Overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-40 flex justify-end">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setIsFormOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="relative w-full max-w-lg bg-white h-full shadow-2xl border-l border-zinc-200 overflow-y-auto z-10 flex flex-col justify-between"
            >
              
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/50 sticky top-0 z-10 backdrop-blur-sm">
                <div>
                  <h3 className="font-black text-zinc-900 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#FCA038]" />
                    {editingDirector ? "Edit Director Profile" : "Add Board Director"}
                  </h3>
                  <p className="text-zinc-400 text-[10px] mt-0.5 font-medium">
                    Provide profile photos, titles, roles, categories, and bio paragraphs.
                  </p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-1.5 border border-zinc-200 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-zinc-500" />
                </button>
              </div>

              {/* Drawer Form Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1">
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mr. Manoj V B"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors"
                  />
                </div>

                {/* Role */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                    Role / Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chairman & Managing Director"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors"
                  />
                </div>

                {/* Category & Order Grid */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                      Category Board <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors"
                    >
                      <option value="Executive">Executive</option>
                      <option value="Independent">Independent</option>
                    </select>
                  </div>

                  {/* Order Sort Index */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                      Display Order Index <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 1"
                      value={order}
                      onChange={(e) => setOrder(Number(e.target.value))}
                      required
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors"
                    />
                  </div>

                </div>

                {/* Image Upload Component */}
                <div className="py-1">
                  <ImageUpload
                    value={image}
                    onChange={(url) => setImage(url)}
                    label="Director Profile Photo"
                    required
                    placeholder="Upload profile photo or paste Cloudinary URL..."
                  />
                </div>

                {/* Highlights Tags */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                    Profile Highlight Badges (Comma Separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Global Serial Entrepreneur, CMD - Hykon India Ltd, Published Author"
                    value={highlightsInput}
                    onChange={(e) => setHighlightsInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors"
                  />
                  <p className="text-[9px] text-zinc-400 font-semibold">
                    Separate brief highlights tags with commas. E.g. "Global Entrepreneur, Retired Banker"
                  </p>
                </div>

                {/* Bio text */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                    Detailed Biography <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Describe the member's background, education, achievements, and other active positions..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors resize-none leading-relaxed"
                  />
                </div>

              </form>

              {/* Drawer Footer Actions */}
              <div className="px-6 py-4 border-t border-zinc-250 bg-zinc-50 flex items-center justify-between sticky bottom-0 z-10">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  disabled={actionLoading}
                  className="px-4 py-2.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-650 font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={actionLoading}
                  className="px-5 py-2.5 bg-[#147FC3] hover:bg-[#0e6198] text-white font-bold text-xs rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {actionLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <>
                      <span>Save Director</span>
                    </>
                  )}
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
