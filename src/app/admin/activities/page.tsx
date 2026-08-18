"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "@/components/ImageUpload";
import {
  Calendar,
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  MapPin,
  Users,
  Award,
  Tag,
  Flame
} from "lucide-react";

interface Activity {
  id: string;
  title: string;
  category: "CSR & Community" | "Branch Celebrations" | "Financial Literacy" | "Employee Welfare" | "Awards & Accolades";
  date: string;
  location: string;
  bannerImage: string;
  summary: string;
  content: string;
  organizer: string;
  participantsCount?: string;
  tags: string[];
  isFeatured?: boolean;
  createdAt?: string;
}

export default function ActivitiesAdmin() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  
  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"CSR & Community" | "Branch Celebrations" | "Financial Literacy" | "Employee Welfare" | "Awards & Accolades">("CSR & Community");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [participantsCount, setParticipantsCount] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  // Status / Feedback state
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Delete confirm state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Date parsing & formatting helper functions
  const parseToDateInputFormat = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const formatToReadableDate = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3 && parts[0].length === 4) {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    }
    return dateStr;
  };

  const extractDigits = (val: string) => {
    if (!val) return "";
    const match = val.match(/\d+/);
    return match ? match[0] : "";
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/activities");
      if (res.ok) {
        const data = await res.json();
        setActivities(data);
      } else {
        showToast("Failed to fetch activities list", "error");
      }
    } catch (err: any) {
      showToast("Error loading activities: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("CSR & Community");
    setDate("");
    setLocation("");
    setBannerImage("");
    setSummary("");
    setContent("");
    setOrganizer("");
    setParticipantsCount("");
    setTagsInput("");
    setIsFeatured(false);
    setEditingActivity(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleOpenEdit = (act: Activity) => {
    setEditingActivity(act);
    setTitle(act.title);
    setCategory(act.category);
    setDate(parseToDateInputFormat(act.date) || act.date);
    setLocation(act.location || "");
    setBannerImage(act.bannerImage);
    setSummary(act.summary);
    setContent(act.content || "");
    setOrganizer(act.organizer || "");
    setParticipantsCount(extractDigits(act.participantsCount || ""));
    setTagsInput(act.tags ? act.tags.join(", ") : "");
    setIsFeatured(!!act.isFeatured);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category || !date.trim() || !bannerImage.trim() || !summary.trim()) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    try {
      setActionLoading(true);
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: title.trim(),
        category,
        date: formatToReadableDate(date.trim()),
        location: location.trim() || "South India",
        bannerImage: bannerImage.trim(),
        summary: summary.trim(),
        content: content.trim() || summary.trim(),
        organizer: organizer.trim() || "Max Value Credits",
        participantsCount: participantsCount ? `${participantsCount} Volunteers` : "",
        tags,
        isFeatured
      };

      const url = editingActivity ? `/api/activities/${editingActivity.id}` : "/api/activities";
      const method = editingActivity ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast(
          editingActivity ? "Activity details updated successfully" : "New activity created successfully",
          "success"
        );
        setIsFormOpen(false);
        resetForm();
        fetchActivities();
      } else {
        const errorData = await res.json();
        showToast(errorData.error || "Failed to save activity details", "error");
      }
    } catch (err: any) {
      showToast("Error saving activity: " + err.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setActionLoading(true);
      const res = await fetch(`/api/activities/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        showToast("Activity deleted successfully", "success");
        setDeleteConfirmId(null);
        fetchActivities();
      } else {
        showToast("Failed to delete activity", "error");
      }
    } catch (err: any) {
      showToast("Error deleting activity: " + err.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Filters
  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (act.tags && act.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = selectedCategory === "All" || act.category === selectedCategory;

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
            <Calendar className="w-5 h-5 text-[#147FC3]" />
            Activities Management
          </h2>
          <p className="text-zinc-500 text-xs mt-1 font-medium">
            Manage company initiatives, CSR drives, branch celebrations, financial literacy, and awards events.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 bg-[#147FC3] hover:bg-[#0e6198] text-white font-bold text-xs py-3 px-5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Activity</span>
        </button>
      </div>

      {/* Filters & Search Controls */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-200/60">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search by title, location, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] transition-colors"
          />
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2">
          {["All", "CSR & Community", "Branch Celebrations", "Financial Literacy", "Employee Welfare", "Awards & Accolades"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#147FC3] text-white shadow-xs"
                  : "bg-white text-zinc-650 hover:bg-zinc-100 border border-zinc-200/70"
              }`}
            >
              {cat === "All" ? "All Categories" : cat}
            </button>
          ))}
        </div>

      </div>

      {/* Activities Grid Display */}
      {loading ? (
        <div className="w-full py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-[#147FC3] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-zinc-500 font-bold">Loading activities list...</p>
        </div>
      ) : filteredActivities.length === 0 ? (
        <div className="w-full py-16 bg-white rounded-2xl border border-zinc-250 text-center flex flex-col items-center justify-center gap-3">
          <Calendar className="w-8 h-8 text-zinc-300" />
          <div>
            <h4 className="text-sm font-bold text-zinc-700">No Activities Found</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Try searching with a different keyword or category.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Profile Card Top */}
              <div>
                {/* Banner Image Preview */}
                <div className="relative w-full h-40 bg-zinc-100 overflow-hidden">
                  <img
                    src={act.bannerImage || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&h=300&q=80"}
                    alt={act.title}
                    className="w-full h-full object-cover"
                  />
                  {act.isFeatured && (
                    <span className="absolute top-3 left-3 bg-[#FCA038] text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-md flex items-center gap-1">
                      <Flame className="w-3 h-3 text-white fill-white animate-pulse" />
                      Featured
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-zinc-900/70 text-white text-[9px] font-bold px-2 py-1 rounded backdrop-blur-xs">
                    {act.category}
                  </span>
                </div>

                <div className="p-5 space-y-3.5">
                  {/* Meta details */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-bold text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#147FC3]" />
                      {act.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      {act.location}
                    </span>
                  </div>

                  {/* Title Info */}
                  <h4 className="font-extrabold text-zinc-900 text-sm line-clamp-2 leading-snug">{act.title}</h4>
                  
                  {/* Summary Text */}
                  <p className="text-zinc-650 text-xs line-clamp-3 leading-relaxed text-justify">
                    {act.summary}
                  </p>

                  {/* Tags & Organizer */}
                  <div className="pt-1.5 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-wide">
                      By: <strong className="text-[#147FC3]">{act.organizer || "Max Value"}</strong>
                    </span>
                    {act.participantsCount && (
                      <span className="text-[9px] font-bold text-zinc-400">
                        {act.participantsCount}
                      </span>
                    )}
                  </div>

                  {/* Highlights Tags */}
                  {act.tags && act.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1.5">
                      {act.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-bold bg-zinc-50 border border-zinc-200 text-zinc-450 rounded px-1.5 py-0.5 flex items-center gap-0.5"
                        >
                          <Tag className="w-2.5 h-2.5 text-[#147FC3]/70" />
                          {tag}
                        </span>
                      ))}
                      {act.tags.length > 3 && (
                        <span className="text-[9px] text-zinc-400 font-bold self-center">
                          +{act.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="bg-zinc-50/70 border-t border-zinc-100 px-5 py-3 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(act)}
                  className="p-2 border border-zinc-200 hover:border-[#147FC3]/40 hover:bg-[#147FC3]/5 text-zinc-500 hover:text-[#147FC3] rounded-lg transition-colors cursor-pointer"
                  title="Edit Activity Details"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(act.id)}
                  className="p-2 border border-zinc-200 hover:border-rose-300 hover:bg-rose-50 text-zinc-500 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                  title="Delete Activity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
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
                <h4 className="font-black text-zinc-900 text-sm">Delete Activity Log?</h4>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                  This action is permanent and cannot be undone. This activity will be removed from the live page immediately.
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
                  {actionLoading ? "Deleting..." : "Delete Activity"}
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
                    {editingActivity ? "Edit Activity Record" : "Add Activity Log"}
                  </h3>
                  <p className="text-zinc-400 text-[10px] mt-0.5 font-medium">
                    Provide banner photos, event details, summary descriptions, and tags.
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
              <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1 animate-none">
                
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                    Activity Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Green South India Drive"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors"
                  />
                </div>

                {/* Category & Date Grid */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                      Category Group <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors"
                    >
                      <option value="CSR & Community">CSR & Community</option>
                      <option value="Branch Celebrations">Branch Celebrations</option>
                      <option value="Financial Literacy">Financial Literacy</option>
                      <option value="Employee Welfare">Employee Welfare</option>
                      <option value="Awards & Accolades">Awards & Accolades</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                      Event Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors"
                    />
                  </div>

                </div>

                {/* Location & Organizer Grid */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Location */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                      Location / Region
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Thrissur, Kerala"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Organizer */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                      Organizer Team
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Max Value CSR Foundation"
                      value={organizer}
                      onChange={(e) => setOrganizer(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors"
                    />
                  </div>

                </div>

                {/* Image Upload Component */}
                <div className="py-1">
                  <ImageUpload
                    value={bannerImage}
                    onChange={(url) => setBannerImage(url)}
                    label="Banner Image Photo"
                    required
                    placeholder="Upload banner image photo or paste Cloudinary URL..."
                  />
                </div>

                {/* Participants & Tags Grid */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Participants Count */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                      Participants Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 500"
                      value={participantsCount}
                      onChange={(e) => setParticipantsCount(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Featured Status */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide block mb-1">
                      Featured Status
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsFeatured(!isFeatured)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        isFeatured 
                          ? "bg-amber-500/10 text-amber-700 border-amber-500/40" 
                          : "bg-zinc-50 text-zinc-450 border-zinc-200 hover:bg-zinc-100"
                      }`}
                    >
                      {isFeatured ? "Featured Activity" : "Standard Activity"}
                    </button>
                  </div>

                </div>

                {/* Tags Tags */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                    Tag Badges (Comma Separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CSR, Sustainability, Community"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors"
                  />
                  <p className="text-[9px] text-zinc-400 font-semibold">
                    Separate tags with commas. E.g. "CSR, Healthcare, Regional"
                  </p>
                </div>

                {/* Summary text */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide">
                    Short Summary Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide a brief one-paragraph summary of the activity for cards..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Full biography/content text */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wide flex items-center justify-between">
                    <span>Detailed Content Paragraphs</span>
                    <span className="text-[9px] text-zinc-400 lowercase font-medium italic">(Optional - defaults to summary)</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Provide detailed paragraphs about the activity, timeline, achievements, and impact..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
                      <span>Saving Activity...</span>
                    </>
                  ) : (
                    <>
                      <span>Save Activity</span>
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
