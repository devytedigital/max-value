"use client";

import { useState, cloneElement, ReactElement } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Car,
  ShieldCheck,
  FileText,
  TrendingUp,
  Award,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  User,
  Percent,
  MessageSquare
} from "lucide-react";

export default function VehicleLoanPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    enquiryFor: "Vehicle Loan",
    comment: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.place.trim()) {
      newErrors.place = "Place / City is required";
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "Please enter your query or comment";
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = "Comment must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const messageText = 
`*NEW VEHICLE LOAN ENQUIRY - MAXVALUE*
----------------------------------------
👤 *Name:* ${formData.name.trim()}
📧 *Email:* ${formData.email.trim()}
📞 *Phone:* ${formData.phone.trim()}
📍 *Place:* ${formData.place.trim()}
💼 *Enquiry For:* ${formData.enquiryFor}
----------------------------------------
📝 *Query Details:*
${formData.comment.trim()}
----------------------------------------
Sent via MaxValue Credits Website`;

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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const benefits = [
    {
      title: "Quick Loan Processing",
      description: "Complete your application with ease and receive prompt loan processing, helping you purchase your vehicle without unnecessary delays.",
      icon: <TrendingUp className="w-6 h-6 text-[#147FC3]" />
    },
    {
      title: "Finance for New & Used Vehicles",
      description: "Whether you're buying a brand-new vehicle or a well-maintained pre-owned one, our Vehicle Loan offers financing solutions to suit your requirements.",
      icon: <Car className="w-6 h-6 text-[#FCA038]" />
    },
    {
      title: "Flexible Repayment Options",
      description: "Choose repayment plans that fit your monthly budget, making loan repayment convenient and stress-free.",
      icon: <Percent className="w-6 h-6 text-[#147FC3]" />
    },
    {
      title: "Simple Documentation",
      description: "Enjoy a hassle-free application process with basic KYC and income-related documents, making it easier to get started.",
      icon: <FileText className="w-6 h-6 text-[#FCA038]" />
    },
    {
      title: "Transparent Loan Process",
      description: "From loan application to approval, we ensure complete transparency with clear communication on eligibility, repayment terms, and applicable charges.",
      icon: <ShieldCheck className="w-6 h-6 text-[#147FC3]" />
    },
    {
      title: "Trusted Financial Partner",
      description: "With years of lending experience and a growing presence across South India, Max Value is committed to helping customers achieve their vehicle ownership goals with confidence.",
      icon: <Award className="w-6 h-6 text-[#FCA038]" />
    }
  ];

  const faqs = [
    {
      question: "Who can apply for a Vehicle Loan?",
      answer: "Salaried employees, self-employed professionals, business owners, and other eligible applicants who meet our lending criteria can apply for a Vehicle Loan, subject to KYC verification and credit assessment."
    },
    {
      question: "Can I get a loan for both new and used vehicles?",
      answer: "Yes. Max Value offers Vehicle Loan solutions for eligible new and pre-owned vehicles, subject to our loan policies and eligibility criteria."
    },
    {
      question: "How much loan can I get?",
      answer: "The eligible loan amount depends on factors such as the vehicle's value, your repayment capacity, income, and overall eligibility as determined during the loan assessment process."
    },
    {
      question: "What documents are required to apply for a Vehicle Loan?",
      answer: "Applicants generally need valid KYC documents, proof of identity, address proof, income documents, and vehicle-related documents. Additional documents may be requested based on the loan application."
    },
    {
      question: "How quickly is a Vehicle Loan processed?",
      answer: "Once all required documents are submitted and successfully verified, your application is processed promptly to help you purchase your vehicle as quickly as possible."
    },
    {
      question: "Can I repay my Vehicle Loan before the loan tenure ends?",
      answer: "Yes. Early repayment options may be available depending on the terms and conditions of your loan agreement. Please contact your nearest Max Value branch for more information."
    },
    {
      question: "Are there any hidden charges?",
      answer: "No. Max Value follows a transparent lending process, and all applicable charges, fees, and repayment terms are clearly communicated before loan disbursement."
    },
    {
      question: "Why choose Max Value for your Vehicle Loan?",
      answer: "Max Value combines quick processing, transparent loan terms, flexible repayment options, and dedicated customer support to make financing your next vehicle simple and convenient."
    }
  ];

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">
      
      {/* Navbar & Top spacing */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-44 lg:pb-28 bg-[#147FC3] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-[#FCA038]/20 blur-[120px]" />
          <div className="absolute -top-10 left-10 w-72 h-72 rounded-full bg-white/5 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left content (Text) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FCA038] text-xs font-bold uppercase tracking-wider mb-6">
                <Car className="w-3.5 h-3.5" />
                <span>Vehicle Loan</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-4">
                Drive Your Dreams Forward with a <br />
                <span className="text-[#FCA038]">Max Value Vehicle Loan</span>
              </h1>

              <div className="w-20 h-1 bg-[#FCA038] rounded-full mb-6" />

              <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
                Owning a vehicle is more than a convenience—it's an investment in your lifestyle, business, and future. Whether you're planning to purchase a two-wheeler for daily commuting or a four-wheeler for personal or commercial use, Max Value Credits & Investments Ltd. offers Vehicle Loans designed to make ownership easier and more affordable.
              </p>

              <div>
                <a 
                  href="#enquiry-section" 
                  className="inline-flex items-center gap-2 bg-[#FCA038] hover:bg-[#e08922] text-white font-extrabold text-xs py-3.5 px-7 rounded-lg transition-all shadow-md hover:shadow-lg uppercase tracking-wider active:scale-95 cursor-pointer"
                >
                  Apply Now
                  <Send className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Right content (Image representation) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop" 
                  alt="Drive Your Dreams Forward with a Max Value Vehicle Loan" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#147FC3]/40 to-transparent" />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -bottom-6 -left-6 bg-white text-zinc-900 rounded-xl p-4 shadow-xl border border-zinc-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Quick Approval</p>
                  <p className="text-xs font-black text-zinc-800">New & Used Vehicles</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CORE VALUE INTRODUCTION STATEMENT */}
      <section className="relative w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5 text-left">
              <span className="text-xs font-black tracking-widest text-[#FCA038] uppercase">MAXVALUE CREDITS</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#147FC3] tracking-tight uppercase mt-2">
                Vehicle Loan
              </h2>
              <div className="w-16 h-1 bg-[#147FC3] rounded-full mt-4" />
            </div>

            <div className="lg:col-span-7 text-left text-zinc-600 text-sm md:text-base leading-relaxed flex flex-col gap-6">
              <p>
                Our Vehicle Loan provides quick financial assistance with a simple application process, transparent terms, and flexible repayment options. Whether you're buying your first vehicle or upgrading to a new one, our experienced team is here to help you choose the right financing solution for your needs.
              </p>
              <p className="font-semibold text-zinc-800">
                With customer-focused service and a trusted branch network across South India, Max Value makes your journey to vehicle ownership smooth, reliable, and hassle-free.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE MAX VALUE (VISUAL GRID) */}
      <section className="relative w-full py-16 md:py-24 bg-white">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,127,195,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,127,195,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-zinc-955 tracking-tight uppercase">
              Why Choose Max Value Vehicle Loan?
            </h2>
            <div className="w-16 h-1 bg-[#FCA038] mx-auto mt-4 mb-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-[#ECEAE7]/70 p-10 md:p-12 rounded-3xl flex flex-col items-center text-center group transition-colors duration-300 hover:bg-[#ECEAE7]"
              >
                <div className="relative w-16 h-16 flex items-center justify-center mb-6">
                  {/* Ambient Glow */}
                  <div className={`absolute inset-0 m-auto w-10 h-10 rounded-full blur-[20px] opacity-45 transition-all duration-500 group-hover:blur-[24px] group-hover:scale-110 ${
                    idx % 2 === 0 ? "bg-[#FCA038]" : "bg-[#147FC3]"
                  }`} />
                  {/* Cloned Icon */}
                  <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                    {cloneElement(benefit.icon as ReactElement<any>, { className: "w-8 h-8 text-[#0c141c]", strokeWidth: 2.25 })}
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-black text-zinc-900 mb-3 tracking-tight group-hover:text-[#147FC3] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-zinc-550 text-xs md:text-sm leading-relaxed max-w-[280px]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="relative w-full py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-light text-zinc-900 tracking-tight leading-tight">
              Frequently <br />
              <span className="font-bold">Asked </span>
              <span className="italic font-serif text-[#147FC3]">Questions</span>
            </h2>
          </div>

          <div className="flex flex-col border-t border-zinc-200/80">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="border-b border-zinc-200/80 text-left"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-6 md:py-8 flex items-center justify-between text-left font-bold text-base md:text-lg text-zinc-900 hover:text-[#147FC3] transition-colors cursor-pointer select-none group"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <ArrowRight className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 group-hover:text-[#147FC3] ${isOpen ? "-rotate-45 text-[#147FC3]" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 text-zinc-500 text-xs md:text-sm leading-relaxed max-w-3xl">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* QUICK ENQUIRY SECTION */}
      <section id="enquiry-section" className="relative w-full py-16 md:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Representative Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-200 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop" 
                  alt="Vehicle Loan Representative Support" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <p className="text-xs font-black uppercase text-[#FCA038] tracking-widest mb-1">Direct Assistance</p>
                  <h4 className="text-lg font-black tracking-tight">Need assistance right now?</h4>
                  <p className="text-xs text-white/80 mt-1 leading-relaxed">Submit the form to talk with our vehicle loan representative via WhatsApp for faster disbursement.</p>
                </div>
              </div>
            </motion.div>

            {/* Right Enquiry Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-zinc-200/90 p-8 md:p-10 relative overflow-hidden">
                
                {/* Decorative Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#147FC3] via-[#FCA038] to-[#147FC3]" />

                <div className="mb-8 text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#147FC3] uppercase mb-1">
                    <MessageSquare className="w-4 h-4 text-[#FCA038]" />
                    QUICK ENQUIRY FORM
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 tracking-tight">
                    Enquire About Vehicle Loan
                  </h3>
                  <p className="text-zinc-500 text-xs md:text-sm mt-1">
                    Fill in the details below. Submitting will open your official WhatsApp support chat (<strong className="text-zinc-800">8714771854</strong>).
                  </p>
                </div>

                {showSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center flex flex-col items-center gap-4 my-6">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-emerald-900">
                        Redirecting to WhatsApp!
                      </h4>
                      <p className="text-xs text-emerald-700 mt-1 max-w-md">
                        Your enquiry details have been compiled. If WhatsApp didn't open automatically, please click the button below to complete sending your message.
                      </p>
                    </div>

                    <a 
                      href={whatsappUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Open WhatsApp Chat (8714771854)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button 
                      onClick={() => {
                        setShowSuccess(false);
                        setFormData({ name: "", email: "", phone: "", place: "", enquiryFor: "Vehicle Loan", comment: "" });
                      }}
                      className="text-xs font-bold text-zinc-500 hover:text-zinc-800 underline mt-2 cursor-pointer"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left" noValidate>
                    
                    {/* Row 1: Name & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                          Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
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

                      {/* Phone */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your mobile number"
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
                              errors.phone 
                                ? "border-rose-400 ring-2 ring-rose-100" 
                                : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3" /> {errors.phone}
                          </span>
                        )}
                      </div>

                    </div>

                    {/* Row 2: Email & Place */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
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

                      {/* Place */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                          Place / City <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input 
                            type="text" 
                            name="place"
                            value={formData.place}
                            onChange={handleChange}
                            placeholder="Enter your location"
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
                              errors.place 
                                ? "border-rose-400 ring-2 ring-rose-100" 
                                : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                            }`}
                          />
                        </div>
                        {errors.place && (
                          <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3" /> {errors.place}
                          </span>
                        )}
                      </div>

                    </div>

                    {/* Enquiry For Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                        Enquiry For
                      </label>
                      <div className="relative">
                        <Car className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <select 
                          name="enquiryFor"
                          value={formData.enquiryFor}
                          onChange={handleChange}
                          className="w-full pl-10 pr-8 py-3 rounded-lg border border-zinc-300 text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20 appearance-none font-medium cursor-pointer"
                        >
                          <option value="Vehicle Loan">Vehicle Loan</option>
                          <option value="Gold Loan">Gold Loan</option>
                          <option value="Business Loan">Business Loan</option>
                          <option value="Microfinance">Microfinance</option>
                          <option value="Money Transfer">Money Transfer</option>
                        </select>
                        <div className="absolute right-3.5 top-4 pointer-events-none text-zinc-400 text-xs">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Query / Comments */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                        Query / Comment <span className="text-rose-500">*</span>
                      </label>
                      <textarea 
                        name="comment"
                        rows={4}
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="Write your detailed inquiry here..."
                        className={`w-full p-4 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${
                          errors.comment 
                            ? "border-rose-400 ring-2 ring-rose-100" 
                            : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                        }`}
                      />
                      {errors.comment && (
                        <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3 h-3" /> {errors.comment}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#147FC3] hover:bg-[#0f68a3] active:bg-[#FCA038] text-white font-extrabold text-sm py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider group active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Opening WhatsApp...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Enquiry Via WhatsApp</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                  </form>
                )}

              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}
