"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Headphones,
  User,
  ExternalLink
} from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    enquiry: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.whatsapp.replace(/\s+/g, ""))) {
      newErrors.whatsapp = "Please enter a valid WhatsApp number";
    }

    if (!formData.enquiry.trim()) {
      newErrors.enquiry = "Please enter your enquiry message";
    } else if (formData.enquiry.trim().length < 10) {
      newErrors.enquiry = "Enquiry message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const messageText =
      `*NEW ENQUIRY - MAXVALUE CREDITS*
----------------------------------------
👤 *Name:* ${formData.name.trim()}
📧 *Email:* ${formData.email.trim()}
📞 *Phone:* ${formData.phone.trim()}
💬 *WhatsApp:* ${formData.whatsapp.trim()}
----------------------------------------
📝 *Enquiry Details:*
${formData.enquiry.trim()}
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

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">

      {/* 3-Tier Navbar */}
      <Navbar />

      {/* SECTION 1: CONTACT BANNER */}
      <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32 bg-[#0c141c] text-white overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://maxvaluecredits.com/wp-content/uploads/2025/07/Landing-Page-1.jpg"
            alt="MaxValue Contact Banner"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c141c] via-[#0c141c]/90 to-[#147FC3]/40" />
        </div>

        {/* Ambient Grid & Glows */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-[#FCA038]/10 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start"
          >


            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-4">
              Contact <span className="text-[#FCA038]">Us</span>
            </h1>

            <div className="w-20 h-1 bg-[#FCA038] rounded-full mb-6" />

            <p className="text-zinc-300 text-sm md:text-base max-w-2xl leading-relaxed text-center md:text-left">
              Have questions about our financial products, gold loans, or investment plans? Get in touch with our dedicated support team today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION: CONTACT INFO & ENQUIRY FORM */}
      <section className="relative w-full py-16 md:py-24 bg-[#F8FAFC]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,127,195,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,127,195,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* COLUMN 1: CONTACT INFORMATION */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col gap-8"
            >
              <div>

                <h2 className="text-2xl md:text-3xl font-black text-[#147FC3] tracking-tight uppercase">
                  Get In Touch
                </h2>
                <p className="text-zinc-600 text-sm mt-2 leading-relaxed">
                  We are available to answer your calls, emails, or in-person visits during business hours.
                </p>
              </div>

              {/* Contact Information Cards */}
              <div className="flex flex-col gap-5">

                {/* Phone Card */}
                <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#147FC3]/10 text-[#147FC3] flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Phone Number
                    </h3>
                    <a
                      href="tel:04872422799"
                      className="text-lg font-extrabold text-zinc-900 hover:text-[#147FC3] transition-colors block"
                    >
                      0487 2422799
                    </a>
                    <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-zinc-500">
                      <Headphones className="w-3.5 h-3.5 text-[#FCA038]" />
                      <span>Toll Free: 1800 425 22799</span>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FCA038]/10 text-[#FCA038] flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Email Address
                    </h3>
                    <a
                      href="mailto:info@maxvaluecredits.com"
                      className="text-base font-extrabold text-[#147FC3] hover:underline transition-all block break-all"
                    >
                      info@maxvaluecredits.com
                    </a>
                    <p className="text-xs text-zinc-500 mt-1 font-medium">
                      Fast response within 24 business hours
                    </p>
                  </div>
                </div>

                {/* Address Card */}
                <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#147FC3]/10 text-[#147FC3] flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Corporate Office Address
                    </h3>
                    <div className="text-sm font-bold text-zinc-800 leading-relaxed">
                      Maxvalue Credits And Investments Ltd<br />
                      <span className="font-semibold text-zinc-600">
                        1st Floor, Cee Kay Plaza,<br />
                        Opp. Metropolitan Hospital, Koorkencherry,<br />
                        Thrissur, Kerala – 680007
                      </span>
                    </div>
                  </div>
                </div>

                {/* Working Hours Card */}
                <div className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#FCA038]" />
                    <div className="text-xs">
                      <span className="font-bold text-zinc-700 block">Working Hours</span>
                      <span className="text-zinc-500">Mon - Sat: 9:30 AM - 5:30 PM</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px] font-bold uppercase">
                    Open Now
                  </span>
                </div>

              </div>
            </motion.div>

            {/* COLUMN 2: ENQUIRY FORM */}
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

                  <h3 className="text-2xl font-black text-zinc-900 tracking-tight">
                    Send Us An Enquiry
                  </h3>
                  <p className="text-zinc-500 text-xs md:text-sm mt-1">
                    Fill in the details below. Submitting will automatically send your enquiry directly to our official WhatsApp support (<strong className="text-zinc-800">8714771854</strong>).
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
                        setFormData({ name: "", email: "", phone: "", whatsapp: "", enquiry: "" });
                      }}
                      className="text-xs font-bold text-zinc-500 hover:text-zinc-800 underline mt-2 cursor-pointer"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left" noValidate>

                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Name Field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center justify-between">
                          <span>Name <span className="text-rose-500">*</span></span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.name
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

                      {/* Email Field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center justify-between">
                          <span>Email <span className="text-rose-500">*</span></span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.email
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

                    {/* Row 2: Phone & WhatsApp */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Phone Field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center justify-between">
                          <span>Phone Number <span className="text-rose-500">*</span></span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="0487 2422799 or Mobile"
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.phone
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

                      {/* WhatsApp Field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center justify-between">
                          <span>WhatsApp Number <span className="text-rose-500">*</span></span>
                        </label>
                        <div className="relative">
                          <MessageSquare className="w-4 h-4 text-[#25D366] absolute left-3.5 top-3.5" />
                          <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            placeholder="WhatsApp mobile number"
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.whatsapp
                                ? "border-rose-400 ring-2 ring-rose-100"
                                : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                              }`}
                          />
                        </div>
                        {errors.whatsapp && (
                          <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3" /> {errors.whatsapp}
                          </span>
                        )}
                      </div>

                    </div>

                    {/* Enquiry Textarea */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center justify-between">
                        <span>Enquiry <span className="text-rose-500">*</span></span>
                      </label>
                      <textarea
                        name="enquiry"
                        rows={4}
                        value={formData.enquiry}
                        onChange={handleChange}
                        placeholder="Write your detailed enquiry here..."
                        className={`w-full p-4 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.enquiry
                            ? "border-rose-400 ring-2 ring-rose-100"
                            : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                          }`}
                      />
                      {errors.enquiry && (
                        <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3 h-3" /> {errors.enquiry}
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

                    <p className="text-[11px] text-zinc-400 text-center font-medium">
                      🔒 Your contact information is kept strictly confidential and secure.
                    </p>

                  </form>
                )}

              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Corporate Footer */}
      <Footer />

    </div>
  );
}
