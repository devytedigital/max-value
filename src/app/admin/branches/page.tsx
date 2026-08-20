"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Search,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Clock,
  X,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ExternalLink,
  Map,
  Filter
} from "lucide-react";
import { stateDistrictMap } from "@/data/branchData";

interface Branch {
  id: string;
  name: string;
  state: string;
  district: string;
  address: string;
  landmark: string;
  pinCode: string;
  phone: string;
  mobile: string;
  email: string;
  location: string;
  workingHours: string;
}

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStateFilter, setSelectedStateFilter] = useState("All");

  // Form Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null); // null means "Create mode", otherwise "Edit mode"
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    district: "",
    address: "",
    landmark: "",
    pinCode: "",
    phone: "",
    mobile: "",
    email: "",
    location: "",
    workingHours: "9:30 AM - 5:30 PM (Mon-Sat)"
  });
  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Delete Confirmation Modal State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);

  // Toast notification state
  const [toasts, setToasts] = useState<{ id: number; text: string; type: "success" | "error" }[]>([]);

  // Fetch branches from API
  const fetchBranches = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/branches");
      if (!response.ok) {
        throw new Error("Failed to fetch branches");
      }
      const data = await response.json();
      setBranches(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to load branches database");
      setLoading(false);
      showToast("Error loading branch database", "error");
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleOpenCreateModal = () => {
    setCurrentBranch(null);
    setFormData({
      name: "",
      state: "Kerala", // default state
      district: "", // default district empty for manual text input entry
      address: "",
      landmark: "",
      pinCode: "",
      phone: "",
      mobile: "",
      email: "",
      location: "",
      workingHours: "9:30 AM - 5:30 PM (Mon-Sat)"
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleOpenEditModal = (branch: Branch) => {
    setCurrentBranch(branch);
    setFormData({
      name: branch.name,
      state: branch.state,
      district: branch.district,
      address: branch.address,
      landmark: branch.landmark,
      pinCode: branch.pinCode,
      phone: branch.phone,
      mobile: branch.mobile,
      email: branch.email,
      location: branch.location,
      workingHours: branch.workingHours
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateVal = e.target.value;
    setFormData((prev) => ({
      ...prev,
      state: stateVal,
      district: "" // Let admin enter the district manually
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const {
      name,
      state,
      district,
      address,
      landmark,
      pinCode,
      phone,
      mobile,
      email,
      location,
      workingHours
    } = formData;

    if (
      !name.trim() ||
      !state.trim() ||
      !district.trim() ||
      !address.trim() ||
      !pinCode.trim() ||
      !phone.trim() ||
      !mobile.trim() ||
      !workingHours.trim()
    ) {
      setFormError("Branch Name, State, District, Address, PIN Code, Phone, Mobile, and Working Hours are required.");
      return;
    }

    if (email.trim() && !email.includes("@")) {
      setFormError("Invalid email address. The email field must include an '@' character.");
      return;
    }

    if (location.trim() && !location.startsWith("http://") && !location.startsWith("https://")) {
      setFormError("Invalid Google Maps URL. The Location field must be a valid link starting with 'http://' or 'https://'.");
      return;
    }

    try {
      setFormSubmitting(true);
      const isEdit = !!currentBranch;
      const url = isEdit ? `/api/branches/${currentBranch.id}` : "/api/branches";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to save branch");
      }

      await fetchBranches(); // Refresh list
      setModalOpen(false);
      showToast(
        isEdit ? `Branch "${name.toUpperCase()}" updated successfully` : `Branch "${name.toUpperCase()}" created successfully`,
        "success"
      );
    } catch (err: any) {
      setFormError(err.message || "Failed to process request");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleOpenDeleteConfirm = (branch: Branch) => {
    setBranchToDelete(branch);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteBranch = async () => {
    if (!branchToDelete) return;
    try {
      const response = await fetch(`/api/branches/${branchToDelete.id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete branch");
      }

      await fetchBranches(); // Refresh list
      setDeleteConfirmOpen(false);
      showToast(`Branch "${branchToDelete.name}" was deleted`, "success");
      setBranchToDelete(null);
    } catch (err: any) {
      showToast(err.message || "Failed to delete branch", "error");
    }
  };

  // Filter and search computation
  const filteredBranches = branches.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.pinCode.includes(searchTerm);

    const matchesState =
      selectedStateFilter === "All" || b.state.toLowerCase() === selectedStateFilter.toLowerCase();

    return matchesSearch && matchesState;
  });

  // KPI calculations
  const totalBranches = branches.length;
  const countKerala = branches.filter((b) => b.state === "Kerala").length;
  const countTN = branches.filter((b) => b.state === "Tamil Nadu").length;
  const countKarnataka = branches.filter((b) => b.state === "Karnataka").length;
  const countAP = branches.filter((b) => b.state === "Andhra Pradesh").length;

  return (
    <div className="space-y-8 select-none relative">
      
      {/* TOAST SYSTEM POPUP */}
      <div className="fixed bottom-6 right-6 z-55 flex flex-col gap-2 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className={`p-4 rounded-xl shadow-xl flex items-center gap-3 border pointer-events-auto text-xs font-semibold ${
                t.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-150"
                  : "bg-rose-50 text-rose-800 border-rose-150"
              }`}
            >
              {t.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span>{t.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* METRICS / STATS SECTION */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Branches */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Branches</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-slate-900">{totalBranches}</span>
            <span className="text-[10px] text-[#147FC3] font-bold uppercase">Active</span>
          </div>
        </div>

        {/* Kerala */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Kerala network</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-slate-900">{countKerala}</span>
            <span className="text-[9px] text-zinc-450 font-bold">({totalBranches ? Math.round((countKerala / totalBranches) * 100) : 0}%)</span>
          </div>
        </div>

        {/* Tamil Nadu */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Tamil Nadu</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-slate-900">{countTN}</span>
            <span className="text-[9px] text-zinc-455 font-bold">({totalBranches ? Math.round((countTN / totalBranches) * 100) : 0}%)</span>
          </div>
        </div>

        {/* Karnataka */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Karnataka</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-slate-900">{countKarnataka}</span>
            <span className="text-[9px] text-zinc-450 font-bold">({totalBranches ? Math.round((countKarnataka / totalBranches) * 100) : 0}%)</span>
          </div>
        </div>

        {/* Andhra Pradesh */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Andhra Pradesh</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-slate-900">{countAP}</span>
            <span className="text-[9px] text-zinc-450 font-bold">({totalBranches ? Math.round((countAP / totalBranches) * 100) : 0}%)</span>
          </div>
        </div>

      </section>

      {/* SEARCH AND CONTROL TOOLBAR */}
      <section className="bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="flex flex-1 items-center gap-3 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl max-w-md">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search branch name, town, address, PIN code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-xs font-semibold text-zinc-700 placeholder-zinc-450 p-0 focus:ring-0 w-full"
          />
        </div>

        {/* State filter & Add button */}
        <div className="flex items-center gap-3">
          
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl">
            <Filter className="w-3.5 h-3.5 text-zinc-505" />
            <select
              value={selectedStateFilter}
              onChange={(e) => setSelectedStateFilter(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-bold text-zinc-600 p-0 pr-6 focus:ring-0 cursor-pointer"
            >
              <option value="All">All States</option>
              <option value="Kerala">Kerala</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
            </select>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="bg-gradient-to-r from-amber-400 to-[#FCA038] hover:from-[#FCA038] hover:to-amber-400 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-500/10 cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            Add Branch
          </button>

        </div>

      </section>

      {/* CORE BRANCH LIST TABLE */}
      <section className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs overflow-hidden">
        
        {loading ? (
          <div className="py-24 text-center text-zinc-450 font-semibold flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#147FC3] border-t-transparent animate-spin" />
            <span className="text-xs uppercase tracking-widest mt-1">Retrieving network database...</span>
          </div>
        ) : error ? (
          <div className="py-16 text-center text-rose-500 font-semibold flex flex-col items-center justify-center gap-2">
            <AlertCircle className="w-8 h-8 text-rose-450" />
            <span className="text-xs">{error}</span>
            <button onClick={fetchBranches} className="mt-3 text-xs text-[#147FC3] hover:underline font-bold">
              Retry Connection
            </button>
          </div>
        ) : filteredBranches.length === 0 ? (
          <div className="py-20 text-center text-zinc-400 font-semibold flex flex-col items-center justify-center gap-2.5">
            <Building2 className="w-8 h-8 text-zinc-350" />
            <span className="text-xs">No branches match your active search filters.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-150 text-[10px] font-bold text-zinc-450 uppercase tracking-widest">
                  <th className="py-4 px-6">Branch Details</th>
                  <th className="py-4 px-4">State & District</th>
                  <th className="py-4 px-4">Contact Info</th>
                  <th className="py-4 px-4">Hours</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs font-semibold text-zinc-700">
                {filteredBranches.map((branch) => (
                  <tr key={branch.id} className="hover:bg-zinc-50/50 transition-colors">
                    
                    {/* Details: Name, Address, Location Link */}
                    <td className="py-4 px-6 flex flex-col max-w-sm">
                      <span className="font-extrabold text-zinc-900 text-sm tracking-tight">{branch.name}</span>
                      <span className="text-zinc-500 font-medium text-xs mt-1 leading-normal">{branch.address}</span>
                      {branch.landmark && (
                        <span className="text-[10px] text-amber-600 font-medium mt-0.5">Lnd: {branch.landmark}</span>
                      )}
                      {branch.location && (
                        <a
                          href={branch.location}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-[#147FC3] hover:underline font-bold flex items-center gap-0.5 mt-1.5"
                        >
                          <MapPin className="w-3 h-3" />
                          View GPS Map Coordinates
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </td>

                    {/* State & District */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-800">{branch.district}</span>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase mt-1 tracking-wider">{branch.state}</span>
                      </div>
                    </td>

                    {/* Contact details */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 text-[11px]">
                        {branch.mobile && (
                          <span className="flex items-center gap-1.5 text-zinc-705">
                            <Phone className="w-3 h-3 text-zinc-400" />
                            {branch.mobile}
                          </span>
                        )}
                        {branch.phone && (
                          <span className="flex items-center gap-1.5 text-zinc-550">
                            <Building2 className="w-3 h-3 text-zinc-350" />
                            {branch.phone}
                          </span>
                        )}
                        {branch.email && (
                          <span className="flex items-center gap-1.5 text-zinc-550">
                            <Mail className="w-3 h-3 text-zinc-355" />
                            {branch.email}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Working Hours */}
                    <td className="py-4 px-4 font-medium text-zinc-500 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-450 shrink-0" />
                        <span>{branch.workingHours}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        
                        <button
                          onClick={() => handleOpenEditModal(branch)}
                          className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-zinc-355 hover:bg-zinc-50 flex items-center justify-center text-zinc-500 hover:text-[#147FC3] cursor-pointer transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        
                        <button
                          onClick={() => handleOpenDeleteConfirm(branch)}
                          className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-rose-300 hover:bg-rose-50/50 flex items-center justify-center text-zinc-500 hover:text-rose-600 cursor-pointer transition-colors"
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

      </section>

      {/* CREATE & EDIT FORM MODAL OVERLAY */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl relative overflow-hidden z-50 flex flex-col max-h-[90vh]"
            >
              
              {/* Modal Header */}
              <div className="p-6 border-b border-zinc-150 flex items-center justify-between bg-zinc-50">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-[#147FC3]/10 flex items-center justify-center text-[#147FC3]">
                    <Building2 className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    {currentBranch ? `Edit Branch: ${currentBranch.name}` : "Create New Branch Location"}
                  </h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 hover:text-zinc-705 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Form Scroll Area */}
              <form onSubmit={handleSubmitForm} className="flex-1 overflow-y-auto p-6 space-y-4">
                
                {formError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4.5 h-4.5 text-rose-500 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Form fields grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Name field (Required) */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Branch Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. KOLLAM MAIN"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white"
                    />
                  </div>

                  {/* State Select (Required) */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      State <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleStateChange}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white appearance-none cursor-pointer"
                      >
                        {Object.keys(stateDistrictMap).map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* District Text Input (Required) */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      District <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      required
                      placeholder="e.g. Kasaragod"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white"
                    />
                  </div>

                  {/* Address Textarea (Required) */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Address Details <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={2.5}
                      placeholder="e.g. Ground Floor, Plaza Arcade, Main Road"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white resize-none"
                    />
                  </div>

                  {/* Landmark */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Landmark
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      placeholder="e.g. Opposite Bus Station (Optional)"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white"
                    />
                  </div>

                  {/* PIN Code (Required) */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      PIN Code <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      required
                      placeholder="e.g. 691578"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      className="bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white"
                    />
                  </div>

                  {/* Mobile contact (Required) */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      required
                      placeholder="e.g. +91 94471 22334"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white"
                    />
                  </div>

                  {/* Phone contact */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Landline Phone <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      required
                      placeholder="e.g. 0474 - 2512345"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-755 outline-none focus:border-[#147FC3] focus:bg-white"
                    />
                  </div>

                  {/* Email address */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. chathannur@maxvaluecredits.com (Optional)"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white"
                    />
                  </div>

                  {/* Working Hours */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Working Hours <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="workingHours"
                      required
                      placeholder="e.g. 9:30 AM - 5:30 PM (Mon-Sat)"
                      value={formData.workingHours}
                      onChange={handleInputChange}
                      className="bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white"
                    />
                  </div>

                  {/* Location Coordinate maps Link */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Google Maps URL Link
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. https://maps.google.com/... (Optional)"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3] focus:bg-white"
                    />
                  </div>

                </div>

                {/* Submit Actions Footer inside form */}
                <div className="pt-4 border-t border-zinc-150 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-500 hover:bg-zinc-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="bg-gradient-to-r from-amber-400 to-[#FCA038] hover:from-[#FCA038] hover:to-amber-400 text-white text-xs font-bold px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-500/10 cursor-pointer disabled:opacity-50"
                  >
                    {formSubmitting ? "Saving..." : currentBranch ? "Save Changes" : "Create Branch"}
                  </button>
                </div>

              </form>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION DIALOG MODAL */}
      <AnimatePresence>
        {deleteConfirmOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmOpen(false)}
              className="absolute inset-0 bg-black"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl relative overflow-hidden z-50 p-6 flex flex-col gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">
                    Confirm Deletion
                  </h4>
                  <p className="text-xs font-semibold text-zinc-550 mt-2 leading-relaxed">
                    Are you sure you want to delete the branch location **{branchToDelete?.name}** in {branchToDelete?.district}, {branchToDelete?.state}? This action is irreversible and the branch will immediately disappear from the locator.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 mt-3 pt-3 border-t border-zinc-150">
                <button
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="px-4 py-2 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-500 hover:bg-zinc-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteBranch}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-colors"
                >
                  Delete Branch
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
