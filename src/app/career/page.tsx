"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Upload,
  User,
  Mail,
  Calendar,
  Building,
  Building2,
  DollarSign,
  ChevronRight,
  X,
  Sparkles,
  ExternalLink,
  Award,
  Users
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

export default function CareerPage() {
  const jobListings: JobListing[] = [
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

  const [selectedJobTitle, setSelectedJobTitle] = useState<string>("CUSTOMER CARE EXECUTIVE");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const formSectionRef = useRef<HTMLDivElement>(null);

  const openApplyModal = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    setFormData(prev => ({ ...prev, jobAppliedFor: jobTitle }));
    setIsModalOpen(true);
    setShowSuccess(false);
    
    // Scroll to form if modal or in-page form
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
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

    const messageText = 
`*NEW JOB APPLICATION - MAXVALUE CAREERS*
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

    const targetWhatsAppNumber = "918714771854";
    const encodedText = encodeURIComponent(messageText);
    const url = `https://api.whatsapp.com/send?phone=${targetWhatsAppNumber}&text=${encodedText}`;

    setWhatsappUrl(url);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      window.open(url, "_blank");
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">
      
      {/* Navbar */}
      <Navbar />

      {/* TOP HERO BANNER SECTION */}
      <section className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 bg-[#147FC3] text-white overflow-hidden">
        {/* Background glow & grid effects */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-[#FCA038]/20 blur-[120px]" />
          <div className="absolute -top-10 left-10 w-72 h-72 rounded-full bg-white/5 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FCA038] text-xs font-extrabold uppercase tracking-wider mb-6">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Careers At Max Value</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight mb-4">
                Build Your Career With <br />
                <span className="text-[#FCA038]">Max Value</span>
              </h1>

              <div className="w-20 h-1.5 bg-[#FCA038] rounded-full mb-6" />

              <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                Join a dynamic, fast-growing financial institution committed to empowering individuals, small businesses, and communities across South India. Explore rewarding opportunities to shape your future with us.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="#job-listings-section" 
                  className="inline-flex items-center gap-2 bg-[#FCA038] hover:bg-[#e08922] text-white font-extrabold text-xs py-3.5 px-7 rounded-lg transition-all shadow-md hover:shadow-lg uppercase tracking-wider active:scale-95 cursor-pointer"
                >
                  Explore Openings
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a 
                  href="#application-form-section" 
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-extrabold text-xs py-3.5 px-7 rounded-lg transition-all uppercase tracking-wider cursor-pointer"
                >
                  Apply Directly
                </a>
              </div>
            </motion.div>

            {/* Right Banner Graphic/Photo */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" 
                  alt="Career Opportunities at Max Value" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#147FC3]/60 via-transparent to-transparent" />
              </div>

              {/* Floating feature badge */}
              <div className="absolute -bottom-6 -left-6 bg-white text-zinc-900 rounded-xl p-4 shadow-xl border border-zinc-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#FCA038] flex items-center justify-center font-black">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Work Environment</p>
                  <p className="text-xs font-black text-zinc-800">Growth & Leadership Focus</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* JOB LISTINGS SECTION */}
      <section id="job-listings-section" className="relative w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-[#FCA038] uppercase">CURRENT OPENINGS</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#147FC3] tracking-tight uppercase mt-2">
              Explore Job Opportunities
            </h2>
            <div className="w-16 h-1 bg-[#FCA038] mx-auto mt-4 mb-3" />
            <p className="text-zinc-500 text-xs md:text-sm">
              Click "Apply Now" on any open position to complete your application.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
            {jobListings.map((job) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-zinc-200/90 shadow-sm hover:shadow-md transition-all p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-left group hover:border-[#147FC3]/40"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#147FC3]/10 text-[#147FC3] text-[11px] font-bold uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-[#FCA038] border border-amber-200/60 text-[11px] font-bold uppercase tracking-wider">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-zinc-900 tracking-tight uppercase group-hover:text-[#147FC3] transition-colors">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-500 mt-2 mb-4">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#147FC3]" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#FCA038]" />
                      Experience: {job.experience}
                    </span>
                  </div>

                  <p className="text-zinc-600 text-xs md:text-sm leading-relaxed mb-4">
                    {job.description}
                  </p>

                  <div className="space-y-1">
                    {job.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 lg:self-center">
                  <button
                    onClick={() => openApplyModal(job.title)}
                    className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#147FC3] hover:bg-[#0f68a3] active:bg-[#FCA038] text-white font-extrabold text-xs py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer uppercase tracking-wider"
                  >
                    <span>Apply Now</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* APPLICATION FORM SECTION */}
      <section id="application-form-section" ref={formSectionRef} className="relative w-full py-16 md:py-24 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          
          <div className="bg-white rounded-3xl shadow-xl border border-zinc-200/90 p-8 md:p-12 relative overflow-hidden text-left">
            
            {/* Top Gold Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#147FC3] via-[#FCA038] to-[#147FC3]" />

            <div className="mb-10 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#147FC3] uppercase mb-1">
                <FileText className="w-4 h-4 text-[#FCA038]" />
                CAREER APPLICATION
              </div>
              <h2 className="text-3xl font-black text-zinc-900 tracking-tight uppercase">
                APPLY FOR JOB
              </h2>
              <p className="text-zinc-500 text-xs md:text-sm mt-1">
                Fill in the details below. Submitting will compile all form fields and redirect you to WhatsApp for direct processing.
              </p>
            </div>

            {showSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center flex flex-col items-center gap-4 my-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-emerald-900 uppercase">
                    Redirecting to WhatsApp!
                  </h3>
                  <p className="text-xs md:text-sm text-emerald-700 mt-2 max-w-md">
                    All application details for <strong>{formData.jobAppliedFor}</strong> have been formatted. Click the button below to complete sending your application via WhatsApp.
                  </p>
                </div>

                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer uppercase tracking-wider"
                >
                  <Send className="w-4 h-4 fill-white" />
                  <span>Send Job Application Via WhatsApp</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button 
                  onClick={() => {
                    setShowSuccess(false);
                    setResumeFile(null);
                  }}
                  className="text-xs font-bold text-zinc-500 hover:text-zinc-900 underline mt-3 cursor-pointer"
                >
                  Apply For Another Position
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                
                {/* 1. Job Applied For (Pre-filled / Selectable) */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                    Job Applied For <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <select 
                      name="jobAppliedFor"
                      value={formData.jobAppliedFor}
                      onChange={handleChange}
                      className="w-full pl-10 pr-8 py-3 rounded-xl border border-zinc-300 text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20 appearance-none font-bold text-zinc-800 cursor-pointer"
                    >
                      <option value="CUSTOMER CARE EXECUTIVE">CUSTOMER CARE EXECUTIVE</option>
                      <option value="BRANCH MANAGER - GOLD LOAN">BRANCH MANAGER - GOLD LOAN</option>
                      <option value="RELATIONSHIP OFFICER - FIELD OPERATIONS">RELATIONSHIP OFFICER - FIELD OPERATIONS</option>
                      <option value="CREDIT ASSESSMENT EXECUTIVE">CREDIT ASSESSMENT EXECUTIVE</option>
                      <option value="IT SUPPORT & SYSTEMS ADMINISTRATOR">IT SUPPORT & SYSTEMS ADMINISTRATOR</option>
                    </select>
                    <div className="absolute right-3.5 top-4 pointer-events-none text-zinc-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* 2. Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name (as per Aadhaar) */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                      Name (as per Aadhaar) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name as on Aadhaar"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
                          errors.name 
                            ? "border-rose-400 ring-2 ring-rose-100" 
                            : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
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
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
                          errors.email 
                            ? "border-rose-400 ring-2 ring-rose-100" 
                            : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </span>
                    )}
                  </div>

                </div>

                {/* 3. Date of Birth & State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Date of Birth */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
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
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
                          errors.dob 
                            ? "border-rose-400 ring-2 ring-rose-100" 
                            : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                        }`}
                      />
                    </div>
                    {errors.dob && (
                      <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" /> {errors.dob}
                      </span>
                    )}
                  </div>

                  {/* Current Location (State) */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                      Current Location (State) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                      <input 
                        type="text" 
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="e.g. Kerala, Tamil Nadu, Karnataka"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
                          errors.state 
                            ? "border-rose-400 ring-2 ring-rose-100" 
                            : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                        }`}
                      />
                    </div>
                    {errors.state && (
                      <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" /> {errors.state}
                      </span>
                    )}
                  </div>

                </div>

                {/* 4. Current City & Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Current City */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                      Current City <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Kochi, Thrissur, Bangalore"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
                          errors.city 
                            ? "border-rose-400 ring-2 ring-rose-100" 
                            : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                        }`}
                      />
                    </div>
                    {errors.city && (
                      <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" /> {errors.city}
                      </span>
                    )}
                  </div>

                  {/* Total Work Experience (in months) */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                      Total Work Experience (in months) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                      <input 
                        type="number" 
                        name="experienceMonths"
                        value={formData.experienceMonths}
                        onChange={handleChange}
                        placeholder="e.g. 24 (0 for fresher)"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
                          errors.experienceMonths 
                            ? "border-rose-400 ring-2 ring-rose-100" 
                            : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                        }`}
                      />
                    </div>
                    {errors.experienceMonths && (
                      <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" /> {errors.experienceMonths}
                      </span>
                    )}
                  </div>

                </div>

                {/* 5. Current Industry & Current Employer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Current Industry */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                      Current Industry <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                      <input 
                        type="text" 
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        placeholder="e.g. Banking / NBFC / Telecom / Retail"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
                          errors.industry 
                            ? "border-rose-400 ring-2 ring-rose-100" 
                            : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                        }`}
                      />
                    </div>
                    {errors.industry && (
                      <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" /> {errors.industry}
                      </span>
                    )}
                  </div>

                  {/* Current Employer */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                      Current Employer <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                      <input 
                        type="text" 
                        name="employer"
                        value={formData.employer}
                        onChange={handleChange}
                        placeholder="e.g. Current Company Name or N/A"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
                          errors.employer 
                            ? "border-rose-400 ring-2 ring-rose-100" 
                            : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                        }`}
                      />
                    </div>
                    {errors.employer && (
                      <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" /> {errors.employer}
                      </span>
                    )}
                  </div>

                </div>

                {/* 6. Current Annual CTC */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                    Current Annual CTC <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                    <input 
                      type="text" 
                      name="ctc"
                      value={formData.ctc}
                      onChange={handleChange}
                      placeholder="e.g. ₹3,50,000 / annum (or Fresher)"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
                        errors.ctc 
                          ? "border-rose-400 ring-2 ring-rose-100" 
                          : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                      }`}
                    />
                  </div>
                  {errors.ctc && (
                    <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" /> {errors.ctc}
                    </span>
                  )}
                </div>

                {/* 7. Upload Resume (PDF, DOC, or DOCX files only) */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                    Upload Resume (PDF, DOC, or DOCX files only) <span className="text-rose-500">*</span>
                  </label>
                  
                  <div className="relative border-2 border-dashed border-zinc-300 hover:border-[#147FC3] rounded-2xl p-6 bg-zinc-50/50 hover:bg-white transition-all text-center flex flex-col items-center justify-center cursor-pointer group">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    <div className="w-12 h-12 rounded-full bg-amber-50 text-[#FCA038] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>

                    {resumeFile ? (
                      <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Selected: {resumeFile.name} ({(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-bold text-zinc-800">
                          Click to browse or drop your resume here
                        </p>
                        <p className="text-xs text-zinc-400 mt-1">
                          Supports PDF, DOC, DOCX (Max 10MB)
                        </p>
                      </>
                    )}
                  </div>

                  {resumeError && (
                    <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" /> {resumeError}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#147FC3] hover:bg-[#0f68a3] active:bg-[#FCA038] text-white font-black text-sm py-4 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider group active:scale-[0.99] mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application Via WhatsApp</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}
