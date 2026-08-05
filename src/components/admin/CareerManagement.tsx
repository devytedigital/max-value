"use client";

import React, { useState } from "react";
import { CareerItem } from "@/data/adminData";
import { Plus, Edit2, Trash2, Briefcase, MapPin, Users, CheckCircle2, XCircle } from "lucide-react";
import CrudModal, { FormField } from "./CrudModal";

interface CareerManagementProps {
  careers: CareerItem[];
  setCareers: React.Dispatch<React.SetStateAction<CareerItem[]>>;
  searchTerm: string;
}

export default function CareerManagement({
  careers,
  setCareers,
  searchTerm,
}: CareerManagementProps) {
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const fields: FormField[] = [
    { name: "title", label: "Job Title", type: "text", required: true, placeholder: "e.g. Branch Manager" },
    { name: "department", label: "Department", type: "text", required: true, placeholder: "e.g. Operations / Credit" },
    { name: "location", label: "Location", type: "text", required: true, placeholder: "e.g. Kochi, Kerala" },
    { name: "type", label: "Employment Type", type: "select", options: ["Full-time", "Part-time", "Contract"], required: true },
    { name: "experience", label: "Experience Required", type: "text", required: true, placeholder: "e.g. 2 - 4 Years" },
    { name: "deadline", label: "Application Deadline", type: "date", required: true },
    { name: "status", label: "Status", type: "select", options: ["Open", "Closed"], required: true },
    { name: "description", label: "Job Description", type: "textarea", required: false },
  ];

  const filtered = careers.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({
      title: "",
      department: "Branch Operations",
      location: "Thrissur, Kerala",
      type: "Full-time",
      experience: "2 - 5 Years",
      deadline: "2026-10-30",
      status: "Open",
      applicantsCount: 0,
      description: "",
    });
    setModalMode("add");
  };

  const handleOpenEdit = (item: CareerItem) => {
    setSelectedId(item.id);
    setFormData({ ...item });
    setModalMode("edit");
  };

  const handleOpenDelete = (item: CareerItem) => {
    setSelectedId(item.id);
    setFormData({ ...item });
    setModalMode("delete");
  };

  const handleSave = () => {
    if (modalMode === "add") {
      const newItem: CareerItem = {
        id: `car-${Date.now()}`,
        title: formData.title || "New Position",
        department: formData.department || "General",
        location: formData.location || "Kerala",
        type: formData.type || "Full-time",
        experience: formData.experience || "1 - 3 Years",
        deadline: formData.deadline || "2026-12-31",
        applicantsCount: 0,
        status: formData.status || "Open",
        description: formData.description || "",
      };
      setCareers((prev) => [newItem, ...prev]);
    } else if (modalMode === "edit" && selectedId) {
      setCareers((prev) =>
        prev.map((item) => (item.id === selectedId ? { ...item, ...formData } : item))
      );
    }
    setModalMode(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      setCareers((prev) => prev.filter((item) => item.id !== selectedId));
    }
    setModalMode(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            Career &amp; Recruitment Management
          </h2>
          <p className="text-xs text-slate-500">
            Publish job openings, set deadlines, track application counts, and control vacancy status.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#147FC3] hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Post Job Vacancy
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">
            Career Openings ({filtered.length})
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Briefcase className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs font-medium">No job postings found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Job Title &amp; Dept</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Type &amp; Exp</th>
                  <th className="py-3.5 px-4">Deadline</th>
                  <th className="py-3.5 px-4">Applicants</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block text-xs">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase">
                            {item.department}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block">{item.type}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.experience}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-600">{item.deadline}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                        <Users className="w-3 h-3 text-[#147FC3]" /> {item.applicantsCount || 0}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.status === "Open"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-rose-100 text-rose-800 border border-rose-200"
                        }`}
                      >
                        {item.status === "Open" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                          title="Edit Position"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(item)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                          title="Delete Position"
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
            ? "Post New Job Opening"
            : modalMode === "edit"
            ? "Edit Job Posting"
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
