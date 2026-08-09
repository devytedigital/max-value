"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Search,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  User,
  X,
  CheckCircle2,
  AlertCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  ShieldAlert,
  Key,
  Filter,
  Check,
  Sparkles,
  Users
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  createdAt?: string;
  lastLogin?: string | null;
}

const ROLES = [
  {
    name: "Super Admin",
    description: "Full master administrative control across all website and system modules.",
    color: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    name: "Branch Admin",
    description: "Manages branch network, contact directories, and loan inquiry routing.",
    color: "bg-blue-50 text-[#147FC3] border-blue-200"
  },
  {
    name: "Content Manager",
    description: "Publishes corporate news, press releases, media galleries, and career openings.",
    color: "bg-amber-50 text-[#FCA038] border-amber-200"
  },
  {
    name: "Editor",
    description: "Can edit announcements and draft articles with limited privileges.",
    color: "bg-zinc-100 text-zinc-700 border-zinc-200"
  }
];

export default function AdminUsersPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("All");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Branch Admin",
    status: "Active" as "Active" | "Inactive",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Delete Confirmation Modal State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);

  // Toast notification state
  const [toasts, setToasts] = useState<{ id: number; text: string; type: "success" | "error" }[]>([]);

  // Auth guard check
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/adminlogin");
    }
  }, [router]);

  // Fetch admin users from API
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/admins");
      if (!response.ok) {
        throw new Error("Failed to fetch admin users from database");
      }
      const data = await response.json();
      setAdmins(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to load admin accounts");
      setLoading(false);
      showToast("Error loading administrators", "error");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleOpenCreateModal = () => {
    setCurrentAdmin(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "Branch Admin",
      status: "Active",
    });
    setShowPassword(false);
    setFormError("");
    setModalOpen(true);
  };

  const handleOpenEditModal = (admin: AdminUser) => {
    setCurrentAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "", // Left blank unless resetting
      role: admin.role || "Branch Admin",
      status: admin.status || "Active",
    });
    setShowPassword(false);
    setFormError("");
    setModalOpen(true);
  };

  // Submit Handler (Create & Update)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const { name, email, password, role, status } = formData;

    if (!name.trim() || !email.trim()) {
      setFormError("Full Name and Email Address are required.");
      return;
    }

    if (!currentAdmin && !password.trim()) {
      setFormError("Password is required when creating a new administrator.");
      return;
    }

    if (password.trim() && password.trim().length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setFormSubmitting(true);

      const payload: any = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
        status,
      };

      if (password.trim()) {
        payload.password = password.trim();
      }

      let response;
      if (currentAdmin) {
        response = await fetch(`/api/admins/${currentAdmin.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch("/api/admins", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save administrator account");
      }

      showToast(
        currentAdmin ? "Admin account updated successfully!" : "New administrator added successfully!",
        "success"
      );
      setModalOpen(false);
      fetchAdmins();
    } catch (err: any) {
      setFormError(err.message || "Failed to submit form data");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Status Toggle
  const handleToggleStatus = async (admin: AdminUser) => {
    const newStatus = admin.status === "Active" ? "Inactive" : "Active";
    try {
      const response = await fetch(`/api/admins/${admin.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to change account status");
      }

      showToast(`Admin status changed to ${newStatus}`, "success");
      fetchAdmins();
    } catch (err: any) {
      showToast(err.message || "Failed to update status", "error");
    }
  };

  // Delete Handler
  const handleOpenDeleteModal = (admin: AdminUser) => {
    if (admin.id === "super-admin" && admins.length === 1) {
      showToast("Cannot delete the primary root Super Admin account.", "error");
      return;
    }
    setAdminToDelete(admin);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!adminToDelete) return;

    try {
      const response = await fetch(`/api/admins/${adminToDelete.id}`, {
        method: "DELETE",
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "Failed to delete admin account");
      }

      showToast("Administrator removed successfully!", "success");
      setDeleteConfirmOpen(false);
      setAdminToDelete(null);
      fetchAdmins();
    } catch (err: any) {
      showToast(err.message || "Failed to delete administrator", "error");
    }
  };

  // Format Date Helper
  const formatDate = (isoString?: string | null) => {
    if (!isoString) return "Never";
    try {
      return new Date(isoString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return isoString;
    }
  };

  // Filtered List
  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRoleFilter === "All" || admin.role === selectedRoleFilter;
    const matchesStatus = selectedStatusFilter === "All" || admin.status === selectedStatusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const superAdminCount = admins.filter((a) => a.role === "Super Admin").length;
  const activeCount = admins.filter((a) => a.status === "Active").length;

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-[#147FC3]/15 text-[#147FC3] font-black text-[10px] uppercase tracking-wider">
              Access Control & Security
            </span>
          </div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">ADMIN USERS MANAGEMENT</h1>
          <p className="text-sm text-zinc-500 font-semibold mt-0.5">
            Add new administrators, assign security roles, and manage access permissions for the Max Value management console.
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-950 hover:bg-[#147FC3] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-zinc-950/15 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New Administrator
        </button>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#147FC3]/10 text-[#147FC3] flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Administrators</p>
            <h3 className="text-2xl font-black text-zinc-900">{admins.length}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Super Admins</p>
            <h3 className="text-2xl font-black text-zinc-900">{superAdminCount}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Active Status</p>
            <h3 className="text-2xl font-black text-zinc-900">{activeCount} / {admins.length} Active</h3>
          </div>
        </div>
      </div>

      {/* FILTER AND SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200/90 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by administrator name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:bg-white focus:border-[#147FC3] outline-none font-bold text-zinc-700 placeholder:text-zinc-400 transition-all"
          />
        </div>

        {/* Role Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider hidden md:inline">
            Role:
          </span>
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="w-full md:w-44 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none font-bold text-zinc-700 cursor-pointer focus:bg-white focus:border-[#147FC3] transition-all"
          >
            <option value="All">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Branch Admin">Branch Admin</option>
            <option value="Content Manager">Content Manager</option>
            <option value="Editor">Editor</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider hidden md:inline">
            Status:
          </span>
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="w-full md:w-36 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none font-bold text-zinc-700 cursor-pointer focus:bg-white focus:border-[#147FC3] transition-all"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

      </div>

      {/* ADMIN USERS TABLE */}
      <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-[#147FC3] animate-spin" />
            <p className="text-xs font-bold text-zinc-400">Loading Administrator Accounts...</p>
          </div>
        ) : error ? (
          <div className="p-16 text-center text-rose-500 font-bold text-sm">
            <AlertCircle className="w-10 h-10 mx-auto mb-2 text-rose-400" />
            {error}
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="p-16 text-center text-zinc-400 font-bold text-sm flex flex-col items-center justify-center">
            <ShieldAlert className="w-12 h-12 mb-3 text-zinc-300" />
            No Administrators Found
            {searchTerm && <span className="text-xs font-normal text-zinc-400 mt-1">Try adjusting your search query.</span>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-zinc-50 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200">
                <tr>
                  <th className="p-4 pl-6">Administrator Name & Email</th>
                  <th className="p-4">Access Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4">Last Login</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredAdmins.map((admin) => {
                  const roleStyle = ROLES.find((r) => r.name === admin.role)?.color || "bg-zinc-100 text-zinc-700 border-zinc-200";
                  const initials = admin.name
                    ? admin.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()
                    : "AD";

                  return (
                    <tr key={admin.id} className="hover:bg-zinc-50/50 transition-colors group">
                      
                      {/* Name, Email & Avatar */}
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                            {initials}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-extrabold text-zinc-900 group-hover:text-[#147FC3] transition-colors">
                              {admin.name}
                            </span>
                            <span className="text-xs text-zinc-500 font-medium flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-zinc-400" />
                              {admin.email}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400 mt-0.5">
                              ID: {admin.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black border ${roleStyle}`}>
                          {admin.role}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleStatus(admin)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            admin.status === "Active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-zinc-100 text-zinc-500 border border-zinc-200 hover:bg-zinc-200"
                          }`}
                          title="Click to toggle status"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${admin.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"}`} />
                          {admin.status}
                        </button>
                      </td>

                      {/* Created Date */}
                      <td className="p-4 text-xs font-medium text-zinc-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          {formatDate(admin.createdAt)}
                        </div>
                      </td>

                      {/* Last Login */}
                      <td className="p-4 text-xs font-medium text-zinc-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#FCA038]" />
                          {formatDate(admin.lastLogin)}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Edit */}
                          <button
                            onClick={() => handleOpenEditModal(admin)}
                            className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-[#147FC3] text-zinc-500 hover:text-[#147FC3] flex items-center justify-center transition-all bg-white cursor-pointer"
                            title="Edit Admin Account"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleOpenDeleteModal(admin)}
                            disabled={admin.id === "super-admin" && admins.length === 1}
                            className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-rose-500 text-zinc-500 hover:text-rose-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all bg-white cursor-pointer"
                            title="Delete Admin Account"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT ADMIN MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !formSubmitting && setModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/45 backdrop-blur-xs"
            />

            {/* Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-150 flex items-center justify-between shrink-0 bg-zinc-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#147FC3]/10 text-[#147FC3] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-zinc-900 tracking-tight">
                      {currentAdmin ? "EDIT ADMINISTRATOR" : "CREATE NEW ADMINISTRATOR"}
                    </h3>
                    <p className="text-xs text-zinc-400 font-bold mt-0.5">
                      {currentAdmin ? `Configuring ID: ${currentAdmin.id}` : "Register an official staff or manager administrator account."}
                    </p>
                  </div>
                </div>
                <button
                  disabled={formSubmitting}
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
                
                {formError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {formError}
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar, Priya Sundaram"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 focus:bg-white focus:border-[#147FC3] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Official Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      disabled={!!currentAdmin}
                      placeholder="e.g. branch.manager@maxvaluecredits.in"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 focus:bg-white focus:border-[#147FC3] outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                    <span>
                      {currentAdmin ? "Reset Password (Leave blank to keep existing)" : "Password"} <span className="text-rose-500">{!currentAdmin && "*"}</span>
                    </span>
                    <span className="text-[10px] text-zinc-400 font-normal">Min. 6 characters</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={currentAdmin ? "Enter new password if resetting..." : "Create secure password"}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full pl-10 pr-10 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 focus:bg-white focus:border-[#147FC3] outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-700 cursor-pointer p-0.5"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Access Role & Permissions <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 focus:bg-white focus:border-[#147FC3] outline-none transition-all cursor-pointer"
                  >
                    <option value="Super Admin">Super Admin (Full Master Control)</option>
                    <option value="Branch Admin">Branch Admin (Branch Network & Inquiries)</option>
                    <option value="Content Manager">Content Manager (News, Media, Careers)</option>
                    <option value="Editor">Editor (Editorial Updates)</option>
                  </select>
                </div>

                {/* Status Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Account Status
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, status: "Active" }))}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        formData.status === "Active"
                          ? "bg-emerald-50 border-emerald-400 text-emerald-700 shadow-xs"
                          : "border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" /> Active
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, status: "Inactive" }))}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        formData.status === "Inactive"
                          ? "bg-zinc-200 border-zinc-400 text-zinc-800 shadow-xs"
                          : "border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                      }`}
                    >
                      <X className="w-3.5 h-3.5" /> Inactive
                    </button>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-zinc-150 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    disabled={formSubmitting}
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="px-6 py-2.5 bg-zinc-950 hover:bg-[#147FC3] text-white rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2 shadow-md shadow-zinc-950/10"
                  >
                    {formSubmitting && (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    )}
                    {currentAdmin ? "Save Changes" : "Create Administrator"}
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteConfirmOpen && adminToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmOpen(false)}
              className="absolute inset-0 bg-zinc-950/45 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-zinc-200 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-zinc-900 uppercase">Delete Administrator Account?</h3>
              <p className="text-xs text-zinc-500 font-semibold mt-2 leading-relaxed">
                Are you sure you want to revoke access for <strong className="text-zinc-800">"{adminToDelete.name}"</strong> ({adminToDelete.email})?<br />
                This will immediately disable their login access to the administration dashboard.
              </p>
              
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="px-4 py-2.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-600/10 cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST CONTAINER */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`flex items-center gap-2.5 px-4.5 py-3.5 rounded-xl text-xs font-bold text-white shadow-xl ${
                toast.type === "success" ? "bg-zinc-900" : "bg-rose-600"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-white shrink-0" />
              )}
              <span>{toast.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
