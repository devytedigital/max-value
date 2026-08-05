"use client";

import React, { useState } from "react";
import { DirectorItem } from "@/data/adminData";
import { Plus, Edit2, Trash2, User, Search, ShieldCheck, CheckCircle2 } from "lucide-react";
import CrudModal, { FormField } from "./CrudModal";

interface BoardManagementProps {
  directors: DirectorItem[];
  setDirectors: React.Dispatch<React.SetStateAction<DirectorItem[]>>;
  searchTerm: string;
}

export default function BoardManagement({
  directors,
  setDirectors,
  searchTerm,
}: BoardManagementProps) {
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const fields: FormField[] = [
    { name: "name", label: "Director Full Name", type: "text", required: true, placeholder: "e.g. Manoj V Raman" },
    { name: "role", label: "Designation / Role", type: "text", required: true, placeholder: "e.g. Chairman & Managing Director" },
    { name: "image", label: "Profile Image URL", type: "text", required: true, placeholder: "/director-portrait.png or Unsplash URL" },
    { name: "bio", label: "Short Biography", type: "textarea", required: false, placeholder: "Key achievements, experience..." },
    { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"], required: true },
  ];

  const filtered = directors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      role: "",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=750&q=80",
      bio: "",
      status: "Active",
    });
    setModalMode("add");
  };

  const handleOpenEdit = (item: DirectorItem) => {
    setSelectedId(item.id);
    setFormData({ ...item });
    setModalMode("edit");
  };

  const handleOpenDelete = (item: DirectorItem) => {
    setSelectedId(item.id);
    setFormData({ ...item });
    setModalMode("delete");
  };

  const handleSave = () => {
    if (modalMode === "add") {
      const newItem: DirectorItem = {
        id: `dir-${Date.now()}`,
        name: formData.name || "Unnamed Director",
        role: formData.role || "Director",
        image: formData.image || "/director-portrait.png",
        bio: formData.bio || "",
        status: formData.status || "Active",
        order: directors.length + 1,
      };
      setDirectors((prev) => [newItem, ...prev]);
    } else if (modalMode === "edit" && selectedId) {
      setDirectors((prev) =>
        prev.map((item) => (item.id === selectedId ? { ...item, ...formData } : item))
      );
    }
    setModalMode(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      setDirectors((prev) => prev.filter((item) => item.id !== selectedId));
    }
    setModalMode(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            Board of Directors Management
          </h2>
          <p className="text-xs text-slate-500">
            Configure executive board profiles, titles, photos, and visibility status.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#147FC3] hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Board Director
        </button>
      </div>

      {/* Directors Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">
            Directors List ({filtered.length})
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Showing all configured leadership profiles
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <User className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs font-medium">No board members match your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Director Profile</th>
                  <th className="py-3.5 px-4">Designation</th>
                  <th className="py-3.5 px-4">Bio / Summary</th>
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
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block text-xs">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ID: {item.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{item.role}</td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                      {item.bio || "No summary provided."}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.status === "Active"
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
                          className="p-1.5 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-colors cursor-pointer"
                          title="Edit Director"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(item)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Director"
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

      {/* CRUD Modal */}
      <CrudModal
        isOpen={modalMode !== null}
        onClose={() => setModalMode(null)}
        title={
          modalMode === "add"
            ? "Add New Director Profile"
            : modalMode === "edit"
            ? "Edit Director Details"
            : "Confirm Deletion"
        }
        mode={modalMode || "add"}
        fields={fields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onConfirmDelete={handleConfirmDelete}
        deleteItemName={formData.name}
      />
    </div>
  );
}
