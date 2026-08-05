"use client";

import React, { useState } from "react";
import { ServiceItem } from "@/data/adminData";
import { Plus, Edit2, Trash2, Briefcase, CheckCircle2 } from "lucide-react";
import CrudModal, { FormField } from "./CrudModal";

interface ServicesManagementProps {
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  searchTerm: string;
}

export default function ServicesManagement({
  services,
  setServices,
  searchTerm,
}: ServicesManagementProps) {
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const fields: FormField[] = [
    { name: "name", label: "Service Name", type: "text", required: true, placeholder: "e.g. Gold Loan" },
    { name: "category", label: "Category", type: "text", required: true, placeholder: "e.g. Secured Lending" },
    { name: "interestRate", label: "Interest Rate (p.a.)", type: "text", required: true, placeholder: "e.g. 8.9% p.a." },
    { name: "maxTenure", label: "Max Tenure", type: "text", required: true, placeholder: "e.g. 12 Months" },
    { name: "description", label: "Service Description", type: "textarea", required: true, placeholder: "Overview of terms & features..." },
    { name: "status", label: "Status", type: "select", options: ["Active", "Draft"], required: true },
  ];

  const filtered = services.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      category: "Personal / Business Finance",
      interestRate: "9.9% p.a.",
      maxTenure: "24 Months",
      description: "",
      status: "Active",
      iconName: "Briefcase",
    });
    setModalMode("add");
  };

  const handleOpenEdit = (item: ServiceItem) => {
    setSelectedId(item.id);
    setFormData({ ...item });
    setModalMode("edit");
  };

  const handleOpenDelete = (item: ServiceItem) => {
    setSelectedId(item.id);
    setFormData({ ...item });
    setModalMode("delete");
  };

  const handleSave = () => {
    if (modalMode === "add") {
      const newItem: ServiceItem = {
        id: `srv-${Date.now()}`,
        name: formData.name || "New Service",
        category: formData.category || "General Credit",
        interestRate: formData.interestRate || "10.0% p.a.",
        maxTenure: formData.maxTenure || "12 Months",
        description: formData.description || "",
        status: formData.status || "Active",
        iconName: "Briefcase",
      };
      setServices((prev) => [newItem, ...prev]);
    } else if (modalMode === "edit" && selectedId) {
      setServices((prev) =>
        prev.map((item) => (item.id === selectedId ? { ...item, ...formData } : item))
      );
    }
    setModalMode(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      setServices((prev) => prev.filter((item) => item.id !== selectedId));
    }
    setModalMode(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            Our Services Management
          </h2>
          <p className="text-xs text-slate-500">
            Create and edit MaxValue financial loan products, interest parameters, and marketing descriptions.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#147FC3] hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Loan Service
        </button>
      </div>

      {/* Table List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">
            Loan Products ({filtered.length})
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Active financial product offerings
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Briefcase className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs font-medium">No services match your search term.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Service Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Interest Rate</th>
                  <th className="py-3.5 px-4">Max Tenure</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-sky-100 text-[#147FC3] flex items-center justify-center font-bold text-xs shrink-0">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block text-xs">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-slate-400 max-w-xs truncate block">
                            {item.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{item.category}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">{item.interestRate}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">{item.maxTenure}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
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
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(item)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Service"
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
            ? "Add New Loan Service"
            : modalMode === "edit"
            ? "Edit Loan Service Details"
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
