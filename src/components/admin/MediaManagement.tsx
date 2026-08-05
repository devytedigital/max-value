"use client";

import React, { useState } from "react";
import { ImageGalleryItem, VideoGalleryItem, DownloadItem } from "@/data/adminData";
import {
  Image as ImageIcon,
  Video,
  FileText,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Download,
  Calendar,
} from "lucide-react";
import CrudModal, { FormField } from "./CrudModal";

export type MediaSubTab = "images" | "videos" | "downloads";

interface MediaManagementProps {
  subTab: MediaSubTab;
  setSubTab: (tab: MediaSubTab) => void;
  images: ImageGalleryItem[];
  setImages: React.Dispatch<React.SetStateAction<ImageGalleryItem[]>>;
  videos: VideoGalleryItem[];
  setVideos: React.Dispatch<React.SetStateAction<VideoGalleryItem[]>>;
  downloads: DownloadItem[];
  setDownloads: React.Dispatch<React.SetStateAction<DownloadItem[]>>;
  searchTerm: string;
}

export default function MediaManagement({
  subTab,
  setSubTab,
  images,
  setImages,
  videos,
  setVideos,
  downloads,
  setDownloads,
  searchTerm,
}: MediaManagementProps) {
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Field configurations per subtab
  const imageFields: FormField[] = [
    { name: "title", label: "Image Title", type: "text", required: true, placeholder: "e.g. Annual Summit 2025" },
    { name: "category", label: "Category", type: "text", required: true, placeholder: "e.g. Events / CSR" },
    { name: "imageUrl", label: "Image URL", type: "text", required: true, placeholder: "Unsplash or asset URL" },
    { name: "date", label: "Event Date", type: "date", required: true },
    { name: "caption", label: "Caption / Description", type: "textarea", required: false },
  ];

  const videoFields: FormField[] = [
    { name: "title", label: "Video Title", type: "text", required: true, placeholder: "e.g. Customer Testimonials" },
    { name: "category", label: "Category", type: "text", required: true, placeholder: "e.g. Testimonials / Corporate" },
    { name: "videoUrl", label: "YouTube / Video Link", type: "text", required: true, placeholder: "https://www.youtube.com/watch?v=..." },
    { name: "thumbnailUrl", label: "Thumbnail Image URL", type: "text", required: true },
    { name: "duration", label: "Duration", type: "text", required: true, placeholder: "e.g. 03:45" },
    { name: "publishedDate", label: "Published Date", type: "date", required: true },
  ];

  const downloadFields: FormField[] = [
    { name: "title", label: "Document Title", type: "text", required: true, placeholder: "e.g. Annual Financial Report FY25" },
    { name: "category", label: "Category", type: "text", required: true, placeholder: "e.g. Financials / Forms / Notices" },
    { name: "fileType", label: "File Format", type: "select", options: ["PDF", "DOCX", "XLSX"], required: true },
    { name: "fileSize", label: "File Size", type: "text", required: true, placeholder: "e.g. 2.4 MB" },
    { name: "fileUrl", label: "Download URL / Link", type: "text", required: true, placeholder: "URL path to file" },
    { name: "uploadDate", label: "Upload Date", type: "date", required: true },
  ];

  // Open Handlers
  const handleOpenAdd = () => {
    const today = new Date().toISOString().split("T")[0];
    if (subTab === "images") {
      setFormData({
        title: "",
        category: "Events",
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        date: today,
        caption: "",
      });
    } else if (subTab === "videos") {
      setFormData({
        title: "",
        category: "Corporate",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        duration: "02:30",
        publishedDate: today,
      });
    } else {
      setFormData({
        title: "",
        category: "General",
        fileType: "PDF",
        fileSize: "1.5 MB",
        fileUrl: "#",
        uploadDate: today,
      });
    }
    setModalMode("add");
  };

  const handleOpenEdit = (item: any) => {
    setSelectedId(item.id);
    setFormData({ ...item });
    setModalMode("edit");
  };

  const handleOpenDelete = (item: any) => {
    setSelectedId(item.id);
    setFormData({ ...item });
    setModalMode("delete");
  };

  const handleSave = () => {
    if (subTab === "images") {
      if (modalMode === "add") {
        const newItem: ImageGalleryItem = {
          id: `img-${Date.now()}`,
          title: formData.title || "New Photo",
          category: formData.category || "Events",
          imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
          date: formData.date || new Date().toISOString().split("T")[0],
          caption: formData.caption || "",
        };
        setImages((prev) => [newItem, ...prev]);
      } else if (modalMode === "edit" && selectedId) {
        setImages((prev) => prev.map((item) => (item.id === selectedId ? { ...item, ...formData } : item)));
      }
    } else if (subTab === "videos") {
      if (modalMode === "add") {
        const newItem: VideoGalleryItem = {
          id: `vid-${Date.now()}`,
          title: formData.title || "New Video",
          category: formData.category || "General",
          videoUrl: formData.videoUrl || "#",
          thumbnailUrl: formData.thumbnailUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
          duration: formData.duration || "02:00",
          publishedDate: formData.publishedDate || new Date().toISOString().split("T")[0],
        };
        setVideos((prev) => [newItem, ...prev]);
      } else if (modalMode === "edit" && selectedId) {
        setVideos((prev) => prev.map((item) => (item.id === selectedId ? { ...item, ...formData } : item)));
      }
    } else {
      if (modalMode === "add") {
        const newItem: DownloadItem = {
          id: `dl-${Date.now()}`,
          title: formData.title || "New Document",
          category: formData.category || "General",
          fileType: formData.fileType || "PDF",
          fileSize: formData.fileSize || "1.0 MB",
          fileUrl: formData.fileUrl || "#",
          uploadDate: formData.uploadDate || new Date().toISOString().split("T")[0],
        };
        setDownloads((prev) => [newItem, ...prev]);
      } else if (modalMode === "edit" && selectedId) {
        setDownloads((prev) => prev.map((item) => (item.id === selectedId ? { ...item, ...formData } : item)));
      }
    }
    setModalMode(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      if (subTab === "images") setImages((prev) => prev.filter((i) => i.id !== selectedId));
      else if (subTab === "videos") setVideos((prev) => prev.filter((v) => v.id !== selectedId));
      else setDownloads((prev) => prev.filter((d) => d.id !== selectedId));
    }
    setModalMode(null);
  };

  // Filtered lists
  const filteredImages = images.filter(
    (i) => i.title.toLowerCase().includes(searchTerm.toLowerCase()) || i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredVideos = videos.filter(
    (v) => v.title.toLowerCase().includes(searchTerm.toLowerCase()) || v.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredDownloads = downloads.filter(
    (d) => d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Sub-nav Tabs */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              Media Center Management
            </h2>
            <p className="text-xs text-slate-500">
              Manage Image Galleries, Video Broadcasts, and Official Downloadable Documents.
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-[#147FC3] hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" /> Add {subTab === "images" ? "Image" : subTab === "videos" ? "Video" : "Document"}
          </button>
        </div>

        {/* Sub-tabs selector */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
          <button
            onClick={() => setSubTab("images")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === "images"
                ? "bg-[#147FC3] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Image Gallery ({images.length})
          </button>

          <button
            onClick={() => setSubTab("videos")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === "videos"
                ? "bg-[#147FC3] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Video className="w-4 h-4" /> Video Gallery ({videos.length})
          </button>

          <button
            onClick={() => setSubTab("downloads")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === "downloads"
                ? "bg-[#147FC3] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <FileText className="w-4 h-4" /> Downloads ({downloads.length})
          </button>
        </div>
      </div>

      {/* SUB-VIEW 1: IMAGE GALLERY */}
      {subTab === "images" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-4">
            Image Gallery Entries ({filteredImages.length})
          </h3>
          {filteredImages.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No images found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredImages.map((img) => (
                <div
                  key={img.id}
                  className="group relative bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                      {img.category}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{img.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{img.caption || "No caption."}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3" /> {img.date}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(img)}
                          className="p-1 rounded text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(img)}
                          className="p-1 rounded text-slate-600 hover:text-rose-600 hover:bg-rose-50"
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
        </div>
      )}

      {/* SUB-VIEW 2: VIDEO GALLERY */}
      {subTab === "videos" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-4">
            Video Gallery Entries ({filteredVideos.length})
          </h3>
          {filteredVideos.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No videos found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredVideos.map((vid) => (
                <div
                  key={vid.id}
                  className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all"
                >
                  <div className="aspect-video bg-slate-900 relative overflow-hidden">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-[#147FC3] flex items-center justify-center shadow-lg">
                        <Video className="w-5 h-5 ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 text-white font-mono text-[10px]">
                      {vid.duration}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold text-[#147FC3] uppercase tracking-wider block">
                      {vid.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{vid.title}</h4>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[10px] text-slate-400">
                      <span className="font-mono">{vid.publishedDate}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(vid)}
                          className="p-1 rounded text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(vid)}
                          className="p-1 rounded text-slate-600 hover:text-rose-600 hover:bg-rose-50"
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
        </div>
      )}

      {/* SUB-VIEW 3: DOWNLOADS */}
      {subTab === "downloads" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              Downloadable Files &amp; Forms ({filteredDownloads.length})
            </span>
          </div>
          {filteredDownloads.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No downloads available.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredDownloads.map((doc) => (
                <div key={doc.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-bold text-xs">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 font-mono">
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-semibold">{doc.fileType}</span>
                        <span>{doc.fileSize}</span>
                        <span>• Uploaded: {doc.uploadDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(doc)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                      title="Edit Document"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenDelete(doc)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                      title="Delete Document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CRUD Modal */}
      <CrudModal
        isOpen={modalMode !== null}
        onClose={() => setModalMode(null)}
        title={
          modalMode === "add"
            ? `Add New ${subTab === "images" ? "Image" : subTab === "videos" ? "Video" : "Document"}`
            : modalMode === "edit"
            ? `Edit ${subTab === "images" ? "Image" : subTab === "videos" ? "Video" : "Document"} Entry`
            : "Confirm Delete"
        }
        mode={modalMode || "add"}
        fields={subTab === "images" ? imageFields : subTab === "videos" ? videoFields : downloadFields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onConfirmDelete={handleConfirmDelete}
        deleteItemName={formData.title}
      />
    </div>
  );
}
