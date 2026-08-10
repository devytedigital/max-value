"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Upload,
  User,
  Mail,
  Calendar,
  Building,
  Building2,
  DollarSign,
  X,
  ArrowUpRight,
  Briefcase,
  ChevronRight,
  ChevronDown
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

const fallbackListings: JobListing[] = [
  {
    id: "customer-care-executive",
    title: "CUSTOMER CARE EXECUTIVE",
    department: "Customer Support & Operations",
    location: "Kochi / Thrissur / Regional Branches",
    type: "Full Time",
    experience: "0 - 3 Years",
    description: "We are looking for dedicated Customer Care Executives to handle customer inquiries, guide borrowers on our loan products, and deliver exceptional service standards.",
    requirements: [
      "Excellent communication skills in Malayalam and English (Tamil/Kannada is a plus)",
      "Basic computer proficiency and call handling etiquette",
      "Problem-solving mindset and customer-first approach"
    ]
  },
  {
    id: "branch-manager-gold-loan",
    title: "BRANCH MANAGER - GOLD LOAN",
    department: "Branch Sales & Operations",
    location: "Triprayar / Calicut / Regional Offices",
    type: "Full Time",
    experience: "3 - 6 Years",
    description: "Lead branch business growth, oversee gold valuation workflows, ensure audit and regulatory compliance, and build lasting customer relationships.",
    requirements: [
      "Prior experience in NBFC/Banking gold loan branch management",
      "Strong leadership and team management capabilities",
      "Sound understanding of gold valuation standards and KYC compliance"
    ]
  },
  {
    id: "relationship-officer-field",
    title: "RELATIONSHIP OFFICER - FIELD OPERATIONS",
    department: "Microfinance & Field Sales",
    location: "Multiple Locations (South India)",
    type: "Full Time",
    experience: "0 - 2 Years",
    description: "Responsible for field customer onboarding, loan application verification, relationship management, and maintaining customer portfolio quality.",
    requirements: [
      "Two-wheeler with valid driving license",
      "High motivation for field engagement and customer interaction",
      "Good interpersonal and documentation skills"
    ]
  },
  {
    id: "credit-assessment-executive",
    title: "CREDIT ASSESSMENT EXECUTIVE",
    department: "Risk Management & Underwriting",
    location: "Corporate Office, Thrissur",
    type: "Full Time",
    experience: "2 - 5 Years",
    description: "Evaluate creditworthiness of business and vehicle loan applicants, verify financial statements, and prepare detailed risk assessment reports.",
    requirements: [
      "Degree in Commerce, Finance, or related field",
      "Analytical mindset with experience in loan appraisal processes",
      "Proficiency in financial documentation and credit risk analysis"
    ]
  },
  {
    id: "it-support-administrator",
    title: "IT SUPPORT & SYSTEMS ADMINISTRATOR",
    department: "Information Technology",
    location: "Corporate Office, Kochi",
    type: "Full Time",
    experience: "1 - 4 Years",
    description: "Manage branch IT infrastructure, network connectivity, system security access, and provide technical assistance to regional offices.",
    requirements: [
      "Diploma or B.Tech in IT / Computer Science",
      "Hands-on experience in networking, hardware troubleshooting, and Windows Server",
      "Quick problem-solving skills for branch technical issues"
    ]
  }
];

export default function CareerPage() {
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [loadingJobs, setLoadingJobs] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>("CUSTOMER CARE EXECUTIVE");

  const [formData, setFormData] = useState({
    jobAppliedFor: "CUSTOMER CARE EXECUTIVE",
    name: "",
    email: "",
    dob: "",
    state: "",
    city: "",
    experienceMonths: "",
    industry: "",
    employer: "",
    ctc: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoadingJobs(true);
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setJobListings(data);
          } else {
            setJobListings(fallbackListings);
          }
        } else {
          setJobListings(fallbackListings);
        }
      } catch (e) {
        setJobListings(fallbackListings);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  // Lock body scroll when drawer is open to prevent background scrolling
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const openApplyDrawer = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    setFormData((prev) => ({ ...prev, jobAppliedFor: jobTitle }));
    setIsDrawerOpen(true);
    setShowSuccess(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validExtensions = ["pdf", "doc", "docx"];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (!fileExtension || !validExtensions.includes(fileExtension)) {
        setResumeError("Please upload a valid PDF, DOC, or DOCX file");
        setResumeFile(null);
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setResumeError("File size should not exceed 10MB");
        setResumeFile(null);
        return;
      }

      setResumeError("");
      setResumeFile(file);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name (as per Aadhaar) is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "Date of Birth (dd-mm-yyyy) is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Current Location (State) is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Current City is required";
    }

    if (!formData.experienceMonths.trim()) {
      newErrors.experienceMonths = "Total Work Experience is required";
    }

    if (!formData.industry.trim()) {
      newErrors.industry = "Current Industry is required";
    }

    if (!formData.employer.trim()) {
      newErrors.employer = "Current Employer is required";
    }

    if (!formData.ctc.trim()) {
      newErrors.ctc = "Current Annual CTC is required";
    }

    if (!resumeFile) {
      setResumeError("Please upload your resume (PDF, DOC, or DOCX)");
      newErrors.resume = "Resume file required";
    } else {
      setResumeError("");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && !resumeError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const fileName = resumeFile ? resumeFile.name : "Not Provided";
    const fileSize = resumeFile ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB` : "";

    const messageText = `*NEW JOB APPLICATION - MAXVALUE CAREERS*
----------------------------------------
💼 *Job Applied For:* ${formData.jobAppliedFor}
👤 *Name (as per Aadhaar):* ${formData.name.trim()}
📧 *Email:* ${formData.email.trim()}
📅 *Date of Birth:* ${formData.dob.trim()}
📍 *Current Location (State):* ${formData.state.trim()}
🏙️ *Current City:* ${formData.city.trim()}
⌛ *Total Work Experience (Months):* ${formData.experienceMonths.trim()}
🏢 *Current Industry:* ${formData.industry.trim()}
👔 *Current Employer:* ${formData.employer.trim()}
💰 *Current Annual CTC:* ${formData.ctc.trim()}
📄 *Uploaded Resume:* ${fileName} (${fileSize})
----------------------------------------
Sent via MaxValue Careers Portal`;

    const targetWhatsAppNumber = "918891133443";
    const encodedText = encodeURIComponent(messageText);
    const url = `https://api.whatsapp.com/send?phone=${targetWhatsAppNumber}&text=${encodedText}`;

    setWhatsappUrl(url);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      window.open(url, "_blank");
    }, 600);
  };

  // Filter job listings (all jobs shown since filter bar is removed)
  const filteredJobs = jobListings;

  // Find active job details to show in drawer
  const activeJob = jobListings.find((j) => j.title === selectedJobTitle);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">
      {/* Navbar */}
      <Navbar />

      {/* FULL-SCREEN HERO BANNER — matches About Us banner style */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image — no color overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/careerbanner.png"
            alt="Career Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle bottom darkening only, for text legibility — no color tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 text-center flex flex-col items-center">

          {/* Breadcrumb Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-amber-300 mb-8 shadow-sm"
          >
            <span className="text-slate-200">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-[#FCA038] font-bold">Career</span>
          </motion.div>

          {/* Clean text directly over the image — no box, no background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider uppercase text-white leading-none"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.5)" }}
            >
              CAREERS
            </h1>
          </motion.div>

        </div>

        {/* Scroll Down Arrow Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/80 cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
        >
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/70">Scroll Down</span>
          <ChevronDown className="w-5 h-5 text-[#FCA038]" />
        </motion.div>

        {/* Curved Bottom Wave Separator — matches About Us banner */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#FAF9F6] [clip-path:ellipse(65%_100%_at_50%_100%)] z-10" />
      </section>

      {/* Ambient soft glow matching corporate brand colours */}
      <div className="absolute top-[100vh] right-0 w-[600px] h-[600px] rounded-full bg-radial from-[#FCA038]/8 via-[#147FC3]/4 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Main Content Area - Aligned margins/padding matching other pages */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-28 md:pt-28 md:pb-32 relative z-10">
        {/* We're Hiring badge using corporate gold accent */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center px-4.5 py-1.5 rounded-full border border-[#FCA038] text-xs font-semibold text-[#FCA038] mb-6 select-none bg-[#FCA038]/5 backdrop-blur-xs shadow-2xs"
        >
          We&apos;re hiring!
        </motion.div>

        {/* Hero Headers */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-905 mb-6 leading-[1.05]"
        >
          Be part of our mission
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-600 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 font-medium"
        >
          We&apos;re looking for passionate people to join us on our mission. We value
          flat hierarchies, clear communication, and full ownership and responsibility.
        </motion.p>



        {/* Job Listings List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-0"
        >
          {loadingJobs ? (
            <div className="py-20 text-center flex flex-col items-center justify-center gap-4">
              <div className="w-8 h-8 border-3 border-[#147FC3] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-bold text-zinc-500">Loading open listings...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="py-20 text-center border-t border-zinc-200">
              <p className="text-base font-bold text-zinc-500">
                No job postings found under this category.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="border-t border-zinc-200 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group transition-all duration-300 hover:bg-[#147FC3]/[0.01] rounded-xl px-4 -mx-4"
              >
                {/* Left job text info */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-900 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-zinc-550 text-sm md:text-base mt-2 max-w-2xl leading-relaxed font-medium">
                    {job.description}
                  </p>

                  {/* Metadata Badges */}
                  <div className="flex flex-wrap gap-2.5 mt-4">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-zinc-200 text-[11px] font-semibold text-zinc-755 bg-white shadow-2xs select-none">
                      <MapPin className="w-3.5 h-3.5 text-[#147FC3]" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-zinc-200 text-[11px] font-semibold text-zinc-755 bg-white shadow-2xs select-none">
                      <Clock className="w-3.5 h-3.5 text-[#147FC3]" />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-zinc-200 text-[11px] font-semibold text-zinc-755 bg-white shadow-2xs select-none">
                      <Briefcase className="w-3.5 h-3.5 text-[#147FC3]" />
                      {job.experience}
                    </span>
                  </div>
                </div>

                {/* Right apply links */}
                <div className="shrink-0 flex items-center md:self-center">
                  <button
                    onClick={() => openApplyDrawer(job.title)}
                    className="inline-flex items-center gap-1 text-base md:text-lg font-bold text-zinc-900 hover:text-[#147FC3] transition-colors cursor-pointer group/btn self-start"
                  >
                    Apply
                    <ArrowUpRight className="w-4.5 h-4.5 text-[#147FC3] transition-transform duration-350 ease-out group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </button>
                </div>
              </div>
            ))
          )}
          {/* Bottom border to close the list */}
          <div className="border-t border-zinc-200" />
        </motion.div>
      </main>

      {/* Slide-Over Drawer Application Form */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Sliding Panel */}
            <motion.div
              data-lenis-prevent
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full sm:max-w-2xl bg-[#FAF9F6] shadow-2xl z-50 flex flex-col h-full border-l border-zinc-200"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-200 bg-white flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 leading-tight">
                    Apply for Position
                  </h2>
                  <p className="text-zinc-550 text-xs mt-1 font-medium">
                    Applying for:{" "}
                    <span className="font-bold text-zinc-900">
                      {formData.jobAppliedFor}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all cursor-pointer shadow-2xs"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {/* Role specifications card */}
                {activeJob && (
                  <div className="p-5 bg-white border border-zinc-200 rounded-2xl shadow-3xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 select-none">
                      Role Overview
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed mb-4 font-medium">
                      {activeJob.description}
                    </p>

                    {activeJob.requirements && activeJob.requirements.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 select-none">
                          Key Requirements
                        </h4>
                        <ul className="space-y-1.5">
                          {activeJob.requirements.map((req, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs text-zinc-600 font-medium"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#FCA038] shrink-0 mt-0.5" />
                              <span className="leading-tight">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {showSuccess ? (
                  <div className="bg-white border border-zinc-200 rounded-2xl p-8 text-center flex flex-col items-center gap-5 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-[#147FC3] text-white flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-tight">
                        Application Compiled!
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-500 mt-2 max-w-md font-medium leading-relaxed">
                        All details for <strong>{formData.jobAppliedFor}</strong> have been
                        formatted. Click the button below to send your application details
                        and attach your resume directly via WhatsApp.
                      </p>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer uppercase tracking-wider"
                    >
                      <Send className="w-4 h-4 fill-white text-white" />
                      <span>Send via WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        setShowSuccess(false);
                        setResumeFile(null);
                      }}
                      className="text-xs font-bold text-zinc-500 hover:text-zinc-900 underline mt-2 cursor-pointer"
                    >
                      Apply For Another Position
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Job Position Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 select-none">
                        Job Applied For <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <select
                          name="jobAppliedFor"
                          value={formData.jobAppliedFor}
                          onChange={(e) => {
                            handleChange(e);
                            setSelectedJobTitle(e.target.value);
                          }}
                          className="w-full pl-10 pr-8 py-3 rounded-xl border border-zinc-200 text-sm transition-all outline-none bg-white focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] appearance-none font-bold text-zinc-800 cursor-pointer shadow-3xs"
                        >
                          {jobListings.map((job) => (
                            <option key={job.id} value={job.title}>
                              {job.title}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-4.5 pointer-events-none text-zinc-400 text-[10px]">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 select-none">
                        Name (as per Aadhaar) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white shadow-3xs ${
                            errors.name
                              ? "border-rose-300 ring-1 ring-rose-100 focus:border-rose-500 focus:ring-rose-500"
                              : "border-zinc-200 focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] text-zinc-800 font-semibold"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <span className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 select-none">
                        Email <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white shadow-3xs ${
                            errors.email
                              ? "border-rose-300 ring-1 ring-rose-100 focus:border-rose-500 focus:ring-rose-500"
                              : "border-zinc-200 focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] text-zinc-800 font-semibold"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <span className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 select-none">
                        Date of Birth (dd-mm-yyyy) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          placeholder="DD-MM-YYYY (e.g. 15-08-1995)"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white shadow-3xs ${
                            errors.dob
                              ? "border-rose-300 ring-1 ring-rose-100 focus:border-rose-500 focus:ring-rose-500"
                              : "border-zinc-200 focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] text-zinc-800 font-semibold"
                          }`}
                        />
                      </div>
                      {errors.dob && (
                        <span className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.dob}
                        </span>
                      )}
                    </div>

                    {/* Location: State & City */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* State */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 select-none">
                          State <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="e.g. Kerala"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white shadow-3xs ${
                              errors.state
                                ? "border-rose-300 ring-1 ring-rose-100 focus:border-rose-500 focus:ring-rose-500"
                                : "border-zinc-200 focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] text-zinc-800 font-semibold"
                            }`}
                          />
                        </div>
                        {errors.state && (
                          <span className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.state}
                          </span>
                        )}
                      </div>

                      {/* City */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 select-none">
                          City <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="e.g. Kochi"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white shadow-3xs ${
                              errors.city
                                ? "border-rose-300 ring-1 ring-rose-100 focus:border-rose-500 focus:ring-rose-500"
                                : "border-zinc-200 focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] text-zinc-800 font-semibold"
                            }`}
                          />
                        </div>
                        {errors.city && (
                          <span className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Experience in months & Industry */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Experience (months) */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 select-none">
                          Experience (months) <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Clock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input
                            type="number"
                            name="experienceMonths"
                            value={formData.experienceMonths}
                            onChange={handleChange}
                            placeholder="e.g. 24"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white shadow-3xs ${
                              errors.experienceMonths
                                ? "border-rose-300 ring-1 ring-rose-100 focus:border-rose-500 focus:ring-rose-500"
                                : "border-zinc-200 focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] text-zinc-800 font-semibold"
                            }`}
                          />
                        </div>
                        {errors.experienceMonths && (
                          <span className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.experienceMonths}
                          </span>
                        )}
                      </div>

                      {/* Industry */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 select-none">
                          Current Industry <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Building className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            placeholder="e.g. Banking / NBFC"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white shadow-3xs ${
                              errors.industry
                                ? "border-rose-300 ring-1 ring-rose-100 focus:border-rose-500 focus:ring-rose-500"
                                : "border-zinc-200 focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] text-zinc-800 font-semibold"
                            }`}
                          />
                        </div>
                        {errors.industry && (
                          <span className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.industry}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Employer & CTC */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Employer */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 select-none">
                          Current Employer <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Briefcase className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            name="employer"
                            value={formData.employer}
                            onChange={handleChange}
                            placeholder="e.g. Company Name"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white shadow-3xs ${
                              errors.employer
                                ? "border-rose-300 ring-1 ring-rose-100 focus:border-rose-500 focus:ring-rose-500"
                                : "border-zinc-200 focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] text-zinc-800 font-semibold"
                            }`}
                          />
                        </div>
                        {errors.employer && (
                          <span className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.employer}
                          </span>
                        )}
                      </div>

                      {/* CTC */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 select-none">
                          Current Annual CTC <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <DollarSign className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            name="ctc"
                            value={formData.ctc}
                            onChange={handleChange}
                            placeholder="e.g. 3.5 Lakhs"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white shadow-3xs ${
                              errors.ctc
                                ? "border-rose-300 ring-1 ring-rose-100 focus:border-rose-500 focus:ring-rose-500"
                                : "border-zinc-200 focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] text-zinc-800 font-semibold"
                            }`}
                          />
                        </div>
                        {errors.ctc && (
                          <span className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.ctc}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 select-none">
                        Upload Resume (PDF, DOC, DOCX) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative border-2 border-dashed border-zinc-200 hover:border-[#147FC3] rounded-2xl p-6 bg-white transition-all text-center flex flex-col items-center justify-center cursor-pointer group shadow-3xs">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />

                        <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-100 text-[#147FC3] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-3xs">
                          <Upload className="w-5 h-5" />
                        </div>

                        {resumeFile ? (
                          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs bg-emerald-50/50 px-4 py-2 rounded-xl border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>
                              Selected: {resumeFile.name} (
                              {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </span>
                          </div>
                        ) : (
                          <>
                            <p className="text-xs font-bold text-zinc-800">
                              Click to browse or drop your resume here
                            </p>
                            <p className="text-[10px] text-zinc-400 mt-1">
                              Supports PDF, DOC, DOCX (Max 10MB)
                            </p>
                          </>
                        )}
                      </div>

                      {resumeError && (
                        <span className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3.5 h-3.5" /> {resumeError}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#147FC3] hover:bg-[#0f68a3] active:bg-[#FCA038] text-white font-bold text-xs py-4 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider group active:scale-[0.99] mt-2 select-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Preparing Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit via WhatsApp</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
