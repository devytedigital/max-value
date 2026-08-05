"use client";

import React, { useState } from "react";
import { NewsItem } from "@/data/adminData";
import { Plus, Edit2, Trash2, Newspaper, Star, CheckCircle2 } from "lucide-react";
import CrudModal, { FormField } from "./CrudModal";

interface NewsManagementProps {
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  searchTerm: string;
}

export default function NewsManagement({
  news,
  setNews,
  searchTerm,
}: NewsManagementProps) {
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const fields: FormField[] = [
    { name: "title", label: "Article Title", type: "text", required: true, placeholder: "e.g. MaxValue Opens 10 New Branches" },
    { name: "category", label: "Category", type: "text", required: true, placeholder: "e.g. Corporate Expansion / Press Release" },
    { name: "author", label: "Author / Source", type: "text", required: true, placeholder: "e.g. Corporate Communications" },
    { name: "publishedDate", label: "Publish Date", type: "date", required: true },
    { name: "imageUrl", label: "Cover Image URL", type: "text", required: true },
    { name: "excerpt", label: "Short Excerpt", type: "textarea", required: true },
    { name: "isFeatured", label: "Featured Article", type: "checkbox", placeholder: "Display on Home/News Highlight" },
    { name: "status", label: "Status", type: "select", options: ["Published", "Draft"], required: true },
  ];

  const filtered = news.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({
      title: "",
      category: "Press Release",
      author: "Corporate PR",
      publishedDate: new Date().toISOString().split("T")[0],
      imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
      excerpt: "",
      isFeatured: false,
      status: "Published",
    });
    setModalMode("add");
  };

  const handleOpenEdit = (item: NewsItem) => {
    setSelectedId(item.id);
    setFormData({ ...item });
    setModalMode("edit");
  };

  const handleOpenDelete = (item: NewsItem) => {
    setSelectedId(item.id);
    setFormData({ ...item });
    setModalMode("delete");
  };

  const handleSave = () => {
    if (modalMode === "add") {
      const newItem: NewsItem = {
        id: `news-${Date.now()}`,
        title: formData.title || "New Announcement",
        category: formData.category || "General",
        publishedDate: formData.publishedDate || new Date().toISOString().split("T")[0],
        author: formData.author || "Admin",
        excerpt: formData.excerpt || "",
        content: formData.excerpt || "",
        imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
        isFeatured: Boolean(formData.isFeatured),
        status: formData.status || "Published",
      };
      setNews((prev) => [newItem, ...prev]);
    } else if (modalMode === "edit" && selectedId) {
      setNews((prev) =>
        prev.map((item) => (item.id === selectedId ? { ...item, ...formData } : item))
      );
    }
    setModalMode(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      setNews((prev) => prev.filter((item) => item.id !== selectedId));
    }
    setModalMode(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            News &amp; Announcements Management
          </h2>
          <p className="text-xs text-slate-500">
            Publish press releases, corporate announcements, and featured news highlights.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#147FC3] hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Create News Article
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">
            News Articles ({filtered.length})
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Newspaper className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs font-medium">No news articles found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Article Info</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Publish Date</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-12 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block text-xs line-clamp-1">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-slate-400 line-clamp-1">
                            {item.excerpt}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{item.category}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">{item.author}</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-600">{item.publishedDate}</td>
                    <td className="py-3.5 px-4">
                      {item.isFeatured ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <Star className="w-3 h-3 text-amber-600 fill-amber-500" /> Featured
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px]">Standard</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.status === "Published"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" /> {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                          title="Edit Article"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(item)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Modal */}
      <CrudModal
        isOpen={modalMode !== null}
        onClose={() => setModalMode(null)}
        title={
          modalMode === "add"
            ? "Create News Article"
            : modalMode === "edit"
            ? "Edit News Details"
            : "Confirm Deletion"
        }
        mode={modalMode || "add"}
        fields={fields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onConfirmDelete={handleConfirmDelete}
        deleteItemName={formData.title}
      />
    </div>
  );
}
