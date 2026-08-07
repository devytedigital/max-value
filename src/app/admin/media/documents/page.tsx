"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FileText,
  Plus,
  Search,
  ExternalLink,
  Trash2,
  Edit2,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Download
} from "lucide-react";

export default function AdminDocumentsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<{ id: number; text: string; type: "success" | "error" }[]>([]);
  
  // Modal & form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    href: ""
  });
  const [submitting, setSubmitting] = useState(false);

  // Auth guard check
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/adminlogin");
    }
  }, [router]);

  // Load documents
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/documents");
      if (res.ok) {
        const data = await res.json();
        setDocuments(data);
      } else {
        showToast("Failed to load documents list from server", "error");
      }
    } catch (err: any) {
      showToast("Error connecting to database: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingDoc(null);
    setFormData({
      name: "",
      href: ""
    });
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (doc: any) => {
    setEditingDoc(doc);
    setFormData({
      name: doc.name,
      href: doc.href
    });
    setIsModalOpen(true);
  };

  // Handle Form submit (Create or Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast("Please enter a document title", "error");
      return;
    }
    if (!formData.href.trim()) {
      showToast("Please enter a Google Drive link", "error");
      return;
    }

    try {
      setSubmitting(true);
      const url = editingDoc 
        ? `/api/documents/${editingDoc.id}` 
        : "/api/documents";
      
      const method = editingDoc ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showToast(
          editingDoc ? "Document details updated successfully" : "New document added successfully",
          "success"
        );
        setIsModalOpen(false);
        fetchDocuments();
      } else {
        const errorData = await res.json();
        showToast(errorData.error || "An error occurred while saving the document", "error");
      }
    } catch (err: any) {
      showToast("Failed to connect to backend: " + err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Document item
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        showToast("Document deleted successfully", "success");
        fetchDocuments();
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to delete document", "error");
      }
    } catch (err: any) {
      showToast("Error connecting to server: " + err.message, "error");
    }
  };

  const filteredDocs = documents.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left pb-16 relative">
      
      {/* Toast Notification HUD */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className={`p-4 rounded-xl shadow-lg border text-xs font-bold flex items-center gap-2.5 max-w-sm pointer-events-auto bg-white ${
                toast.type === "success" 
                  ? "border-emerald-200 text-emerald-850 bg-emerald-50/90" 
                  : "border-red-200 text-red-850 bg-red-50/90"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{toast.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#147FC3]" />
            Corporate Documents Manager
          </h1>
          <p className="text-xs text-zinc-500 font-semibold mt-1">
            Publish and manage policies, guidelines, audit reports, and download files.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-[#147FC3] hover:bg-[#126fa8] text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer shadow-md active:scale-97 transition-all select-none"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Document
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-3xs">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold outline-none bg-zinc-50/40 focus:bg-white focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/10 transition-all"
          />
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-2xl border border-zinc-200/85 overflow-hidden shadow-3xs">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-zinc-500">
            <Loader2 className="w-8 h-8 text-[#147FC3] animate-spin" />
            <span className="text-xs font-bold mt-4 uppercase tracking-widest">Loading documents library...</span>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="py-20 text-center text-zinc-500">
            <FileText className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
            <h3 className="text-base font-bold text-zinc-800">No Documents Found</h3>
            <p className="text-xs text-zinc-400 font-semibold max-w-sm mx-auto mt-1">
              Add your first dynamic PDF or download file by clicking "Add Document" above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-[10.5px] font-black uppercase text-zinc-400 tracking-wider">
                  <th className="py-4 px-6 text-left">Document Title</th>
                  <th className="py-4 px-6 text-left">Drive Link</th>
                  <th className="py-4 px-6 text-center">Format</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs font-bold text-zinc-800">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-zinc-50/40 transition-colors">
                    <td className="py-3.5 px-6 text-left">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 border border-red-100/50 flex items-center justify-center">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-zinc-900 tracking-tight font-extrabold">{doc.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-left max-w-xs">
                      <span className="text-[10px] text-zinc-400 font-mono tracking-tight block truncate" title={doc.href}>
                        {doc.href}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[10px]">
                        {doc.type || "PDF Document"}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={doc.href}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-[#147FC3] transition-colors"
                          title="Open PDF"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleOpenEdit(doc)}
                          className="p-1.5 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-[#147FC3] transition-colors cursor-pointer"
                          title="Edit Document"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-1.5 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                          title="Delete Document"
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

      {/* Editor Modal Window */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[8000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col text-left"
            >
              {/* Modal header */}
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#147FC3]" />
                    {editingDoc ? "Edit Document Details" : "Add Corporate Document"}
                  </h3>
                  <p className="text-[10px] font-semibold text-zinc-500 mt-0.5">
                    {editingDoc ? "Update download link and policy configurations" : "Publish a viewable PDF link for the public Downloads page"}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 text-zinc-600 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-zinc-500">
                    Document Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Recovery Policy 2026-27"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 outline-none text-xs font-bold text-zinc-800 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/10 bg-zinc-50/40 focus:bg-white transition-all"
                  />
                </div>

                {/* Google Drive PDF URL */}
                <div className="space-y-1.5">
                  <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                    Google Drive PDF Link
                    <span title="Copy and paste the viewable shared link from your google drive.">
                      <HelpCircle className="w-3.5 h-3.5 text-zinc-400 cursor-help" />
                    </span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="e.g. https://drive.google.com/file/d/.../view"
                    value={formData.href}
                    onChange={(e) => setFormData((prev) => ({ ...prev, href: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 outline-none text-xs font-bold text-zinc-850 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/10 bg-zinc-50/40 focus:bg-white transition-all"
                  />
                  <p className="text-[9.5px] font-semibold text-zinc-400 leading-normal flex items-start gap-1 pt-1">
                    <span className="text-[#147FC3] font-bold">Tip:</span> Ensure you have set the file link sharing settings in Google Drive to "Anyone with the link can view".
                  </p>
                </div>

                {/* Form Actions */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-500 hover:bg-zinc-50 transition-colors cursor-pointer select-none"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 bg-[#147FC3] hover:bg-[#126fa8] text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-md active:scale-97 transition-all select-none disabled:opacity-50"
                  >
                    {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    {editingDoc ? "Update Document" : "Save Document"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
