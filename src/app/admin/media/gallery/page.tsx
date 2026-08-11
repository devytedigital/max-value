"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { getCookie } from "@/lib/cookies";
import {
  Image as ImageIcon,
  Search,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Tag,
  X,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Link2,
  FileText
} from "lucide-react";

interface SubImage {
  url: string;
  caption: string;
}

interface MediaAlbum {
  id: string;
  category: string;
  title: string;
  date: string;
  description: string;
  image: string; // cover
  images: SubImage[];
}

export default function AdminMediaGalleryPage() {
  const router = useRouter();
  const [albums, setAlbums] = useState<MediaAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

  // Form Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState<MediaAlbum | null>(null); // null = Create, otherwise Edit
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    date: "",
    images: [] as SubImage[]
  });
  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Delete Confirmation Modal State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState<MediaAlbum | null>(null);

  // Toast notification state
  const [toasts, setToasts] = useState<{ id: number; text: string; type: "success" | "error" }[]>([]);
  const [gridLimit, setGridLimit] = useState<"5" | "10">("5");

  const changeGridLimit = (limit: "5" | "10") => {
    setGridLimit(limit);
    const count = parseInt(limit, 10);
    setFormData((prev) => {
      let list = [...prev.images];
      if (list.length < count) {
        while (list.length < count) {
          list.push({ url: "", caption: "" });
        }
      } else if (list.length > count) {
        list = list.slice(0, count);
      }
      return {
        ...prev,
        images: list
      };
    });
  };

  // Auth check guard
  useEffect(() => {
    const token = getCookie("admin_token");
    if (!token) {
      router.push("/adminlogin");
    }
  }, [router]);

  // Fetch albums from API
  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/media");
      if (!response.ok) {
        throw new Error("Failed to fetch media database");
      }
      const data = await response.json();
      setAlbums(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to load media database");
      setLoading(false);
      showToast("Error loading media database", "error");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleOpenCreateModal = () => {
    setCurrentAlbum(null);
    setGridLimit("5");
    setFormData({
      title: "",
      category: "Gallery",
      description: "",
      image: "",
      date: "",
      images: Array(5).fill(null).map(() => ({ url: "", caption: "" }))
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleOpenEditModal = (album: MediaAlbum) => {
    setCurrentAlbum(album);
    const len = album.images?.length || 0;
    const limit = len === 10 ? "10" : "5";
    setGridLimit(limit);

    const expectedCount = parseInt(limit, 10);
    let imagesArr = album.images && album.images.length > 0 ? [...album.images] : [];
    if (imagesArr.length < expectedCount) {
      while (imagesArr.length < expectedCount) {
        imagesArr.push({ url: "", caption: "" });
      }
    } else if (imagesArr.length > expectedCount) {
      imagesArr = imagesArr.slice(0, expectedCount);
    }

    setFormData({
      title: album.title,
      category: album.category || "Gallery",
      description: album.description || "",
      image: album.image,
      date: album.date || "",
      images: imagesArr
    });
    setFormError("");
    setModalOpen(true);
  };

  // Sub-images array handlers
  const handleAddImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { url: "", caption: "" }]
    }));
  };

  const handleRemoveImageField = (index: number) => {
    setFormData((prev) => {
      const list = [...prev.images];
      list.splice(index, 1);
      return {
        ...prev,
        images: list.length > 0 ? list : [{ url: "", caption: "" }]
      };
    });
  };

  const handleImageChange = (index: number, field: keyof SubImage, val: string) => {
    setFormData((prev) => {
      const list = [...prev.images];
      list[index] = {
        ...list[index],
        [field]: val
      };
      return {
        ...prev,
        images: list
      };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const { title, image, images } = formData;
    if (!title.trim() || !image.trim()) {
      setFormError("Program Name and Cover Image URL are required.");
      return;
    }

    // Clean up empty image rows
    const cleanImages = images.filter(img => img.url.trim() !== "");

    const expectedCount = parseInt(gridLimit, 10);
    if (cleanImages.length !== expectedCount) {
      setFormError(`Please enter all ${expectedCount} image URLs required for this layout.`);
      return;
    }

    setFormSubmitting(true);
    try {
      const isEdit = !!currentAlbum;
      const url = isEdit ? `/api/media/${currentAlbum.id}` : "/api/media";
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        ...formData,
        images: cleanImages
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save media album");
      }

      showToast(isEdit ? "Media album updated successfully" : "Media album created successfully", "success");
      setModalOpen(false);
      fetchAlbums();
    } catch (err: any) {
      setFormError(err.message || "Something went wrong saving the media album");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete handlers
  const handleOpenDeleteConfirm = (album: MediaAlbum) => {
    setAlbumToDelete(album);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteAlbum = async () => {
    if (!albumToDelete) return;
    try {
      const response = await fetch(`/api/media/${albumToDelete.id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete media album from database");
      }

      showToast("Media album deleted successfully", "success");
      setDeleteConfirmOpen(false);
      setAlbumToDelete(null);
      fetchAlbums();
    } catch (err: any) {
      showToast(err.message || "Failed to delete media album", "error");
    }
  };

  // Filters & Search
  const uniqueCategories = ["All", ...Array.from(new Set(albums.map((a) => a.category)))];

  const filteredAlbums = albums.filter((album) => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategoryFilter === "All" || album.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 text-left pb-16">
      
      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[#147FC3]" />
            Photo Gallery Management
          </h1>
          <p className="text-xs text-zinc-500 font-semibold mt-1">
            Create, update, and manage your photo albums and galleries. Paste URLs of images from Cloudinary or external sources.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 bg-[#147FC3] hover:bg-[#0f6aa5] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-[#147FC3]/10 hover:shadow-[#147FC3]/25 active:scale-98 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create Album
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-3xs flex flex-col md:flex-row items-center gap-4">
        
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search albums by title, description or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-250 text-xs font-semibold outline-none bg-zinc-50/40 focus:bg-white focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/10 transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-zinc-500 whitespace-nowrap">Category:</span>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="w-full md:w-48 pl-3 pr-8 py-2.5 rounded-xl border border-zinc-250 text-xs font-bold outline-none bg-zinc-50/40 focus:bg-white focus:border-[#147FC3] appearance-none cursor-pointer"
          >
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Albums Grid */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-3xs p-12 flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-zinc-200 border-t-[#147FC3] animate-spin" />
          <span className="text-xs font-bold text-zinc-500 mt-4 uppercase tracking-widest">Loading albums database...</span>
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-3xs p-12 text-center">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900">Failed to Load Media Albums</h3>
          <p className="text-xs text-zinc-500 font-medium max-w-md mx-auto mt-2">{error}</p>
          <button
            onClick={fetchAlbums}
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#147FC3] hover:underline"
          >
            Retry Fetching Data
          </button>
        </div>
      ) : filteredAlbums.length === 0 ? (
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-3xs p-12 text-center">
          <ImageIcon className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900">No Albums Found</h3>
          <p className="text-xs text-zinc-500 font-medium max-w-sm mx-auto mt-1">
            Try adjusting your search query, or create a brand new album using the button above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlbums.map((album) => (
            <div
              key={album.id}
              className="bg-white border border-zinc-200/90 rounded-2xl overflow-hidden shadow-3xs flex flex-col justify-between group"
            >
              {/* Cover image area */}
              <div className="w-full aspect-[16/10] overflow-hidden relative bg-zinc-100 border-b border-zinc-150">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    <Tag className="w-3 h-3 text-[#FCA038]" />
                    {album.category}
                  </span>
                </div>
                
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {album.images?.length || 0} Photos
                  </span>
                </div>
              </div>

              {/* Details & description */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-zinc-455 text-[10.5px] font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    {album.date}
                  </div>
                  <h3 className="text-base font-extrabold text-zinc-900 mt-2 tracking-tight line-clamp-2 leading-snug">
                    {album.title}
                  </h3>
                  <p className="text-zinc-500 text-xs font-semibold leading-relaxed mt-2.5 line-clamp-3">
                    {album.description}
                  </p>
                </div>

                {/* Actions row */}
                <div className="flex items-center justify-between border-t border-zinc-100 pt-4 mt-5">
                  <span className="text-[10px] font-bold text-zinc-400 font-mono select-none">
                    slug: {album.id}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(album)}
                      className="p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-[#147FC3] transition-colors cursor-pointer"
                      title="Edit Album"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenDeleteConfirm(album)}
                      className="p-2 rounded-lg border border-zinc-200 text-zinc-650 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
                      title="Delete Album"
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

      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-xs font-bold text-slate-900 transition-all animate-slide-in ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200/80 text-emerald-800"
                : "bg-rose-50 border-rose-200/80 text-rose-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            {toast.text}
          </div>
        ))}
      </div>

      {/* CREATE & EDIT FORM DIALOG */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => !formSubmitting && setModalOpen(false)}
              className="fixed inset-0 bg-black cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl relative z-10 border border-zinc-200 overflow-hidden text-left"
            >
              {/* Header */}
              <div className="px-6 py-4.5 border-b border-zinc-150 flex justify-between items-center bg-zinc-50/70">
                <div>
                  <h3 className="text-lg font-extrabold text-zinc-900 tracking-tight">
                    {currentAlbum ? "Edit Media Album" : "Create New Media Album"}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-semibold mt-0.5">
                    {currentAlbum ? `Editing document id: ${currentAlbum.id}` : "Generate a new gallery showcase item."}
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  disabled={formSubmitting}
                  className="p-1.5 rounded-full hover:bg-zinc-200 transition-colors text-zinc-400 hover:text-zinc-700 cursor-pointer disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {formError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200/80 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Program Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-650">
                      Program Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Specialized Workshop Conducted For Top Performers"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-250 text-xs font-semibold outline-none focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/10 transition-all"
                    />
                  </div>

                  {/* Cover Image Upload */}
                  <div className="flex flex-col gap-1.5">
                    <ImageUpload
                      value={formData.image}
                      onChange={(url) => setFormData({ ...formData, image: url })}
                      label="Cover Image"
                      required
                      placeholder="Upload cover image from device..."
                      allowUrl={false}
                    />
                  </div>

                  {/* Grid Layout Limit Selector */}
                  <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-650">
                      Grid Layout Limit <span className="text-zinc-400 font-semibold">(Tailored Grid Optimization)</span>
                    </label>
                    <select
                      value={gridLimit}
                      onChange={(e) => changeGridLimit(e.target.value as "5" | "10")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-250 text-xs font-bold outline-none bg-zinc-50/40 focus:bg-white focus:border-[#147FC3] cursor-pointer"
                    >
                      <option value="5">5 Photos Grid (Symmetric Layout)</option>
                      <option value="10">10 Photos Grid (Symmetric Layout)</option>
                    </select>
                  </div>
                </div>

                {/* Sub-Images Array paste-URL block */}
                <div className="border-t border-zinc-150 pt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900">
                        Album Photo Gallery Lists
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-semibold mt-0.5">
                        Add secondary image URLs for the slideshow detail page.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {formData.images.map((img, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 bg-zinc-50/50 p-4 rounded-xl border border-zinc-150"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-zinc-405 select-none px-1.5 py-0.5 rounded-md bg-zinc-100 shrink-0">
                            Photo #{index + 1}
                          </span>
                        </div>

                        {/* Image Upload Input */}
                        <div className="w-full">
                          <ImageUpload
                            value={img.url}
                            onChange={(url) => handleImageChange(index, "url", url)}
                            placeholder="Choose image file from device..."
                            allowUrl={false}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </form>

              {/* Action Buttons */}
              <div className="px-6 py-4 border-t border-zinc-150 flex items-center justify-end gap-3.5 bg-zinc-50/70">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={formSubmitting}
                  className="px-4 py-2 rounded-xl border border-zinc-250 hover:bg-zinc-50 text-zinc-655 font-extrabold text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  disabled={formSubmitting}
                  className="px-4 py-2 rounded-xl bg-[#147FC3] hover:bg-[#0f6aa5] text-white font-extrabold text-xs transition-colors shadow-md shadow-[#147FC3]/15 cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
                >
                  {formSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border border-white border-t-transparent animate-spin" />
                      Saving Album...
                    </>
                  ) : (
                    "Save Album"
                  )}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONFIRM DELETE MODAL */}
      <AnimatePresence>
        {deleteConfirmOpen && albumToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmOpen(false)}
              className="fixed inset-0 bg-black cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative z-10 border border-zinc-200 text-left"
            >
              <h3 className="text-lg font-extrabold text-zinc-900 tracking-tight">Delete Media Album</h3>
              <p className="text-xs text-zinc-500 font-semibold mt-2.5 leading-relaxed">
                Are you absolutely sure you want to delete the album <span className="font-bold text-zinc-900">"{albumToDelete.title}"</span>? This action is permanent and cannot be undone.
              </p>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-255 hover:bg-zinc-50 text-zinc-655 font-extrabold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAlbum}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition-colors cursor-pointer shadow-md shadow-rose-600/10"
                >
                  Delete Permanently
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
