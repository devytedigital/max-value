"use client";

import React, { useState } from "react";
import { BranchItem } from "@/data/adminData";
import { Plus, Edit2, Trash2, Building2, MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import CrudModal, { FormField } from "./CrudModal";

interface BranchManagementProps {
  branches: BranchItem[];
  setBranches: React.Dispatch<React.SetStateAction<BranchItem[]>>;
  searchTerm: string;
}

export default function BranchManagement({
  branches,
  setBranches,
  searchTerm,
}: BranchManagementProps) {
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [selectedState, setSelectedState] = useState<string>("All");

  const stateOptions = ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh"];

  const fields: FormField[] = [
    { name: "name", label: "Branch Name", type: "text", required: true, placeholder: "e.g. KOCHI INFOPARK" },
    { name: "code", label: "Branch Code", type: "text", required: true, placeholder: "e.g. MV-KL-008" },
    { name: "state", label: "State", type: "select", options: stateOptions, required: true },
    { name: "district", label: "District", type: "text", required: true, placeholder: "e.g. Ernakulam" },
    { name: "address", label: "Full Address", type: "textarea", required: true, placeholder: "Building No, Street, City" },
    { name: "pinCode", label: "Pin Code", type: "text", required: true, placeholder: "e.g. 682030" },
    { name: "phone", label: "Phone Number", type: "text", required: true, placeholder: "e.g. 0484 2985100" },
    { name: "email", label: "Email Address", type: "text", required: true, placeholder: "e.g. kochi@maxvaluecredits.com" },
    { name: "workingHours", label: "Working Hours", type: "text", required: true, placeholder: "e.g. 9:30 AM to 5:30 PM" },
    { name: "status", label: "Status", type: "select", options: ["Operational", "Maintenance"], required: true },
  ];

  const filtered = branches.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === "All" || b.state === selectedState;
    return matchesSearch && matchesState;
  });

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      code: `MV-BR-${Math.floor(100 + Math.random() * 900)}`,
      state: "Kerala",
      district: "Thrissur",
      address: "",
      landmark: "",
      pinCode: "680001",
      phone: "0487 2400000",
      email: "branch@maxvaluecredits.com",
      workingHours: "9:30 AM to 5:30 PM",
      status: "Operational",
    });
    setModalMode("add");
  };

  const handleOpenEdit = (item: BranchItem) => {
    setSelectedId(item.id);
    setFormData({ ...item });
    setModalMode("edit");
  };

  const handleOpenDelete = (item: BranchItem) => {
    setSelectedId(item.id);
    setFormData({ ...item });
    setModalMode("delete");
  };

  const handleSave = () => {
    if (modalMode === "add") {
      const newItem: BranchItem = {
        id: `br-${Date.now()}`,
        name: formData.name || "NEW BRANCH",
        code: formData.code || `MV-BR-${Date.now()}`,
        state: formData.state || "Kerala",
        district: formData.district || "Thrissur",
        address: formData.address || "",
        landmark: formData.landmark || "",
        pinCode: formData.pinCode || "",
        phone: formData.phone || "",
        email: formData.email || "",
        workingHours: formData.workingHours || "9:30 AM to 5:30 PM",
        status: formData.status || "Operational",
      };
      setBranches((prev) => [newItem, ...prev]);
    } else if (modalMode === "edit" && selectedId) {
      setBranches((prev) =>
        prev.map((item) => (item.id === selectedId ? { ...item, ...formData } : item))
      );
    }
    setModalMode(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      setBranches((prev) => prev.filter((item) => item.id !== selectedId));
    }
    setModalMode(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            Branch Network Management
          </h2>
          <p className="text-xs text-slate-500">
            Register new branch locations, update working hours, contact info, and state mappings.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#147FC3] hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Branch Office
        </button>
      </div>

      {/* State Filter bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedState("All")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedState === "All"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          All States ({branches.length})
        </button>
        {stateOptions.map((st) => {
          const count = branches.filter((b) => b.state === st).length;
          return (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedState === st
                  ? "bg-[#147FC3] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">
            Branches List ({filtered.length})
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Building2 className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs font-medium">No branches found in this filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Branch Name &amp; Code</th>
                  <th className="py-3.5 px-4">State &amp; District</th>
                  <th className="py-3.5 px-4">Address</th>
                  <th className="py-3.5 px-4">Contact</th>
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
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block text-xs">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {item.code}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      <div>{item.district}</div>
                      <span className="text-[10px] text-slate-500 font-normal">{item.state}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                      {item.address} (PIN: {item.pinCode})
                    </td>
                    <td className="py-3.5 px-4 space-y-0.5">
                      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-700">
                        <Phone className="w-3 h-3 text-slate-400" /> {item.phone}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-slate-500">
                        <Mail className="w-3 h-3 text-slate-400" /> {item.email}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.status === "Operational"
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
                          className="p-1.5 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                          title="Edit Branch"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(item)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                          title="Delete Branch"
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
            ? "Register New Branch Office"
            : modalMode === "edit"
            ? "Edit Branch Office Details"
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
