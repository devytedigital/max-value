"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Search,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Clock,
  X,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Trash,
  FileText
} from "lucide-react";

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

export default function AdminCareersPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("All");

  // Form Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<JobListing | null>(null); // null means Create, otherwise Edit
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full Time",
    experience: "",
    description: "",
    requirements: [""]
  });
  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Delete Confirmation Modal State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<JobListing | null>(null);

  // Toast notification state
  const [toasts, setToasts] = useState<{ id: number; text: string; type: "success" | "error" }[]>([]);

  // Auth check guard
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/adminlogin");
    }
  }, [router]);

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/jobs");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs database");
      }
      const data = await response.json();
      setJobs(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to load jobs database");
      setLoading(false);
      showToast("Error loading jobs database", "error");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleOpenCreateModal = () => {
    setCurrentJob(null);
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "Full Time",
      experience: "",
      description: "",
      requirements: [""]
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleOpenEditModal = (job: JobListing) => {
    setCurrentJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements.length > 0 ? [...job.requirements] : [""]
    });
    setFormError("");
    setModalOpen(true);
  };

  // Requirements Dynamic List handlers
  const handleAddRequirementField = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""]
    }));
  };

  const handleRemoveRequirementField = (index: number) => {
    setFormData((prev) => {
      const list = [...prev.requirements];
      list.splice(index, 1);
      return {
        ...prev,
        requirements: list.length > 0 ? list : [""]
      };
    });
  };

  const handleRequirementChange = (index: number, val: string) => {
    setFormData((prev) => {
      const list = [...prev.requirements];
      list[index] = val;
      return {
        ...prev,
        requirements: list
      };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const { title, department, location, type, experience, description, requirements } = formData;

    // Filter out blank requirements
    const cleanedRequirements = requirements.map((r) => r.trim()).filter((r) => r !== "");

    // Validation
    if (!title.trim() || !department.trim() || !location.trim() || !type.trim() || !experience.trim() || !description.trim()) {
      setFormError("All fields except requirements are mandatory.");
      return;
    }

    if (cleanedRequirements.length === 0) {
      setFormError("Please add at least one job requirement specification.");
      return;
    }

    try {
      setFormSubmitting(true);

      const payload = {
        title: title.trim(),
        department: department.trim(),
        location: location.trim(),
        type: type.trim(),
        experience: experience.trim(),
        description: description.trim(),
        requirements: cleanedRequirements
      };

      let response;
      if (currentJob) {
        // Edit mode
        response = await fetch(`/api/jobs/${currentJob.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        // Create mode
        response = await fetch("/api/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process job listing");
      }

      showToast(
        currentJob ? "Job listing updated successfully!" : "New job listing created successfully!",
        "success"
      );
      setModalOpen(false);
      fetchJobs();
    } catch (err: any) {
      setFormError(err.message || "Failed to submit form data");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleOpenDeleteModal = (job: JobListing) => {
    setJobToDelete(job);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!jobToDelete) return;

    try {
      const response = await fetch(`/api/jobs/${jobToDelete.id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete job listing");
      }

      showToast("Job listing deleted successfully!", "success");
      setDeleteConfirmOpen(false);
      setJobToDelete(null);
      fetchJobs();
    } catch (err: any) {
      showToast(err.message || "Failed to delete job listing", "error");
    }
  };

  // Filters
  const uniqueDepartments = Array.from(new Set(jobs.map((j) => j.department)));

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDeptFilter === "All" || job.department === selectedDeptFilter;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">CAREER OPPORTUNITIES</h1>
          <p className="text-sm text-zinc-500 font-semibold mt-1">
            Manage public job postings, specifications, requirements, and locations.
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-950 hover:bg-[#147FC3] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-zinc-950/15"
        >
          <Plus className="w-4 h-4" />
          Add Job Position
        </button>
      </div>

      {/* FILTER AND SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200/90 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by job title, department, or region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:bg-white focus:border-[#147FC3] outline-none font-bold text-zinc-700 placeholder:text-zinc-400 transition-all"
          />
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider hidden md:inline">
            Department:
          </span>
          <select
            value={selectedDeptFilter}
            onChange={(e) => setSelectedDeptFilter(e.target.value)}
            className="w-full md:w-56 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none font-bold text-zinc-700 cursor-pointer focus:bg-white focus:border-[#147FC3] transition-all"
          >
            <option value="All">All Departments</option>
            {uniqueDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* JOBS CONTENT TABLE/LIST */}
      <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-[#147FC3] animate-spin" />
            <p className="text-xs font-bold text-zinc-400">Loading Job Database...</p>
          </div>
        ) : error ? (
          <div className="p-16 text-center text-rose-500 font-bold text-sm">
            <AlertCircle className="w-10 h-10 mx-auto mb-2 text-rose-400" />
            {error}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-16 text-center text-zinc-400 font-bold text-sm flex flex-col items-center justify-center">
            <Briefcase className="w-12 h-12 mb-3 text-zinc-300" />
            No Job Listings Found
            {searchTerm && <span className="text-xs font-normal text-zinc-400 mt-1">Try refining search parameters.</span>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-zinc-50 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200">
                <tr>
                  <th className="p-4 pl-6">Job Position Details</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Experience</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-zinc-50/50 transition-colors group">
                    
                    {/* Title / Type */}
                    <td className="p-4 pl-6 max-w-xs sm:max-w-sm">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-zinc-900 uppercase group-hover:text-[#147FC3] transition-colors">
                          {job.title}
                        </span>
                        <span className="inline-flex items-center gap-1.5 mt-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                            {job.type}
                          </span>
                        </span>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="p-4 font-bold text-zinc-700">
                      {job.department}
                    </td>

                    {/* Location */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-650 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-[#147FC3] shrink-0" />
                        {job.location}
                      </div>
                    </td>

                    {/* Experience */}
                    <td className="p-4 font-bold text-zinc-600 font-mono text-xs">
                      {job.experience}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2.5">
                        
                        {/* Edit */}
                        <button
                          onClick={() => handleOpenEditModal(job)}
                          className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-[#147FC3] text-zinc-500 hover:text-[#147FC3] flex items-center justify-center transition-all bg-white"
                          title="Edit Listing"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleOpenDeleteModal(job)}
                          className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-rose-500 text-zinc-500 hover:text-rose-500 flex items-center justify-center transition-all bg-white"
                          title="Delete Listing"
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

      {/* ADD/EDIT JOB DIALOG MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !formSubmitting && setModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-xs"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-150 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#147FC3]/10 text-[#147FC3] flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-zinc-900 tracking-tight">
                      {currentJob ? "EDIT JOB LISTING" : "ADD NEW JOB LISTING"}
                    </h3>
                    <p className="text-xs text-zinc-400 font-bold mt-0.5">
                      {currentJob ? `Editing parameters of ID: ${currentJob.id}` : "Publish a new career position."}
                    </p>
                  </div>
                </div>
                <button
                  disabled={formSubmitting}
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Body Scroll area */}
              <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                
                {formError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider">
                      Job Position Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CUSTOMER CARE EXECUTIVE"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 focus:bg-white focus:border-[#147FC3] outline-none transition-all"
                    />
                  </div>

                  {/* Department */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider">
                      Department <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Operations / Customer Service"
                      value={formData.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 focus:bg-white focus:border-[#147FC3] outline-none transition-all"
                    />
                  </div>

                  {/* Location */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider">
                      Job Location <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kochi / Thrissur / Regional"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 focus:bg-white focus:border-[#147FC3] outline-none transition-all"
                    />
                  </div>

                  {/* Experience */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider">
                      Experience Required <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 0 - 3 Years"
                      value={formData.experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 focus:bg-white focus:border-[#147FC3] outline-none transition-all"
                    />
                  </div>

                  {/* Job Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider">
                      Employment Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 focus:bg-white focus:border-[#147FC3] outline-none transition-all cursor-pointer"
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-455 uppercase tracking-wider">
                    Role Description Summary <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide a general overview of core roles, tasks, and branch duties..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-650 focus:bg-white focus:border-[#147FC3] outline-none transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Dynamic Requirements List */}
                <div className="flex flex-col gap-2.5 border-t border-zinc-100 pt-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider">
                      Candidate Requirements & Specifications <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAddRequirementField}
                      className="text-xs font-extrabold text-[#147FC3] hover:underline flex items-center gap-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      Add Point
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-zinc-150 text-zinc-500 font-extrabold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          placeholder="e.g. Excellent communication skills, graduation details, driving license..."
                          value={req}
                          onChange={(e) => handleRequirementChange(idx, e.target.value)}
                          className="flex-1 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-650 focus:bg-white focus:border-[#147FC3] outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveRequirementField(idx)}
                          className="w-8 h-8 rounded-lg hover:bg-rose-50 text-zinc-400 hover:text-rose-600 flex items-center justify-center transition-colors shrink-0 border border-zinc-150"
                          title="Remove Point"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons inside Scroll view if needed, but we overlay buttons at footer */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    disabled={formSubmitting}
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="px-5 py-2.5 bg-zinc-950 hover:bg-[#147FC3] text-white rounded-xl text-xs font-bold transition-all disabled:opacity-60 flex items-center gap-2"
                  >
                    {formSubmitting && <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />}
                    {currentJob ? "Save Changes" : "Create Position"}
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION DIALOG MODAL */}
      <AnimatePresence>
        {deleteConfirmOpen && jobToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmOpen(false)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-xs"
            />

            {/* Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-zinc-200 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-zinc-900 uppercase">Delete Job Position Listing?</h3>
              <p className="text-xs text-zinc-500 font-semibold mt-2 leading-relaxed">
                Are you sure you want to delete the job position <strong className="text-zinc-800">"{jobToDelete.title}"</strong>?<br />
                This action is permanent and will remove the job opening from the public Careers locator page.
              </p>
              
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="px-4 py-2.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-xl text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-600/10"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST NOTIFICATION CONTAINER */}
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
                <CheckCircle2 className="w-4 h-4 text-emerald-450 shrink-0" />
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
