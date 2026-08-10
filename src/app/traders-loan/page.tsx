// "use client";

// import { useState, cloneElement, ReactElement } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Phone,
//   Mail,
//   MapPin,
//   Clock,
//   Send,
//   CheckCircle2,
//   AlertCircle,
//   Briefcase,
//   ShieldCheck,
//   FileText,
//   TrendingUp,
//   Award,
//   ChevronDown,
//   ArrowRight,
//   ExternalLink,
//   User,
//   Percent,
//   MessageSquare,
//   Building2,
//   Store,
//   Sparkles,
//   Users
// } from "lucide-react";

// export default function TradersLoanPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     place: "",
//     enquiryFor: "Traders Loan",
//     comment: ""
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [whatsappUrl, setWhatsappUrl] = useState("");
//   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validate = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Full name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email address is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.replace(/\s+/g, ""))) {
//       newErrors.phone = "Please enter a valid phone number";
//     }

//     if (!formData.place.trim()) {
//       newErrors.place = "Place / City is required";
//     }

//     if (!formData.comment.trim()) {
//       newErrors.comment = "Please enter your query or comment";
//     } else if (formData.comment.trim().length < 10) {
//       newErrors.comment = "Comment must be at least 10 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setIsSubmitting(true);

//     const messageText =
//       `*NEW TRADERS LOAN ENQUIRY - MAXVALUE*
// ----------------------------------------
// 👤 *Name:* ${formData.name.trim()}
// 📧 *Email:* ${formData.email.trim()}
// 📞 *Phone:* ${formData.phone.trim()}
// 📍 *Place:* ${formData.place.trim()}
// 💼 *Enquiry For:* ${formData.enquiryFor}
// ----------------------------------------
// 📝 *Query Details:*
// ${formData.comment.trim()}
// ----------------------------------------
// Sent via MaxValue Credits Website`;

//     const targetWhatsAppNumber = "918891133443";
//     const encodedText = encodeURIComponent(messageText);
//     const url = `https://api.whatsapp.com/send?phone=${targetWhatsAppNumber}&text=${encodedText}`;

//     setWhatsappUrl(url);

//     setTimeout(() => {
//       setIsSubmitting(false);
//       setShowSuccess(true);
//       window.open(url, "_blank");
//     }, 600);
//   };

//   const toggleFaq = (index: number) => {
//     setOpenFaqIndex(openFaqIndex === index ? null : index);
//   };

//   const schemes = [
//     {
//       name: "Max Vanijya",
//       description: "An unsecured business loan designed for traders who need quick access to funds without providing collateral. Based on repayment performance, eligible customers may receive enhanced loan limits through subsequent loan cycles.",
//       bestFor: [
//         "Working capital",
//         "Stock purchases",
//         "Business expansion",
//         "Daily business operations"
//       ],
//       icon: <Store className="w-6 h-6 text-[#147FC3]" />
//     },
//     {
//       name: "Max Samrudhi",
//       description: "A partially secured Traders Loan backed by 50% gold collateral, offering higher loan eligibility while maintaining flexible financing options.",
//       bestFor: [
//         "Business growth",
//         "Inventory purchases",
//         "Equipment upgrades",
//         "Expansion plans"
//       ],
//       icon: <TrendingUp className="w-6 h-6 text-[#FCA038]" />
//     },
//     {
//       name: "Vyapari Kshema",
//       description: "A fully secured business loan backed by 100% eligible gold collateral, offering competitive interest rates and flexible loan amounts to support growing businesses.",
//       bestFor: [
//         "Established businesses",
//         "Large inventory purchases",
//         "Business expansion",
//         "Working capital requirements"
//       ],
//       icon: <Building2 className="w-6 h-6 text-[#147FC3]" />
//     },
//     {
//       name: "Mahila Kshema",
//       description: "A specially designed loan scheme for women entrepreneurs, supported by eligible gold collateral, helping women manage and expand their businesses with confidence.",
//       bestFor: [
//         "Women-owned businesses",
//         "Small business expansion",
//         "Business investments",
//         "Working capital"
//       ],
//       icon: <Sparkles className="w-6 h-6 text-[#FCA038]" />
//     }
//   ];

//   const whyChooseBenefits = [
//     {
//       title: "Multiple Loan Options",
//       description: "Choose from unsecured, partially secured, or fully secured loan schemes based on your business needs.",
//       icon: <Briefcase className="w-6 h-6 text-[#147FC3]" />
//     },
//     {
//       title: "Quick Loan Processing",
//       description: "Our streamlined application process helps eligible businesses access funds without unnecessary delays.",
//       icon: <TrendingUp className="w-6 h-6 text-[#FCA038]" />
//     },
//     {
//       title: "Flexible Loan Amounts",
//       description: "Loan amounts are available based on the selected scheme and customer eligibility, helping you finance both small and large business requirements.",
//       icon: <Percent className="w-6 h-6 text-[#147FC3]" />
//     },
//     {
//       title: "Simple Documentation",
//       description: "Basic KYC and business-related documents are generally required, making the application process quick and convenient.",
//       icon: <FileText className="w-6 h-6 text-[#FCA038]" />
//     },
//     {
//       title: "Transparent Loan Process",
//       description: "From loan assessment to approval, every step is explained clearly with transparent charges and repayment terms.",
//       icon: <ShieldCheck className="w-6 h-6 text-[#147FC3]" />
//     },
//     {
//       title: "Trusted Financial Partner",
//       description: "With years of lending experience and a strong branch network, Max Value continues to support traders and business owners across South India.",
//       icon: <Award className="w-6 h-6 text-[#FCA038]" />
//     }
//   ];

//   const faqs = [
//     {
//       question: "Who can apply for a Traders Loan?",
//       answer: "Traders, shop owners, and eligible small business owners with an established business may apply for a Traders Loan, subject to eligibility criteria, KYC verification, and business assessment."
//     },
//     {
//       question: "What types of Traders Loan are available?",
//       answer: "Max Value offers four Traders Loan schemes: Max Vanijya, Max Samrudhi, Vyapari Kshema, and Mahila Kshema, allowing customers to choose between unsecured and gold-backed loan options based on their business requirements."
//     },
//     {
//       question: "How much loan can I get?",
//       answer: "The eligible loan amount depends on the selected loan scheme, your business profile, repayment capacity, and collateral requirements where applicable."
//     },
//     {
//       question: "What documents are required?",
//       answer: "Applicants are generally required to submit valid KYC documents along with business-related documents as applicable. Additional documents may be requested during the verification process."
//     },
//     {
//       question: "How quickly is a Traders Loan processed?",
//       answer: "Once the required documents are verified and the application is approved, the loan is processed promptly, helping businesses access funds when they need them most."
//     },
//     {
//       question: "Can I use the loan for any business purpose?",
//       answer: "Yes. Traders Loans can typically be used for working capital, purchasing stock, expanding your business, upgrading equipment, managing cash flow, or other legitimate business expenses."
//     },
//     {
//       question: "Can I upgrade my loan amount in the future?",
//       answer: "Certain loan schemes, such as Max Vanijya, allow eligible customers to move to higher loan cycles based on repayment history and business verification."
//     },
//     {
//       question: "Why choose Max Value for a Traders Loan?",
//       answer: "Max Value offers multiple business loan options, transparent processing, competitive interest rates, flexible repayment options, and dedicated customer support, helping traders access reliable financial solutions for business growth"
//     }
//   ];

//   return (
//     <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans font-medium">

//       {/* Navbar & Top spacing */}
//       <Navbar />

//       {/* HERO SECTION */}
//       <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-44 lg:pb-28 bg-[#147FC3] text-white overflow-hidden">
//         {/* Background glow effects */}
//         <div className="absolute inset-0 pointer-events-none z-0">
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
//           <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-[#FCA038]/20 blur-[120px]" />
//           <div className="absolute -top-10 left-10 w-72 h-72 rounded-full bg-white/5 blur-[80px]" />
//         </div>

//         <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

//             {/* Left content (Text) */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               className="lg:col-span-7 text-left"
//             >
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FCA038] text-xs font-bold uppercase tracking-wider mb-6">
//                 <Briefcase className="w-3.5 h-3.5" />
//                 <span>Traders Loan</span>
//               </div>

//               <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-4">
//                 Business Finance That Helps <br />
//                 <span className="text-[#FCA038]">Your Trade Grow</span>
//               </h1>

//               <div className="w-20 h-1 bg-[#FCA038] rounded-full mb-6" />

//               <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
//                 Every business needs timely financial support to manage inventory, expand operations, purchase equipment, or handle working capital requirements. At Max Value Credits & Investments Ltd., our Traders Loan is designed to provide reliable financing solutions for traders, shop owners, and small business owners through flexible loan options that suit different business needs.
//               </p>

//               <div>
//                 <a
//                   href="#enquiry-section"
//                   className="inline-flex items-center gap-2 bg-[#FCA038] hover:bg-[#e08922] text-white font-extrabold text-xs py-3.5 px-7 rounded-lg transition-all shadow-md hover:shadow-lg uppercase tracking-wider active:scale-95 cursor-pointer"
//                 >
//                   Apply Now
//                   <Send className="w-3.5 h-3.5" />
//                 </a>
//               </div>
//             </motion.div>

//             {/* Right content (Image representation) */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.15 }}
//               className="lg:col-span-5 relative"
//             >
//               <div className="relative mx-auto max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
//                 <img
//                   src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop"
//                   alt="Business Finance That Helps Your Trade Grow"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#147FC3]/40 to-transparent" />
//               </div>

//               {/* Floating badges */}
//               <div className="absolute -bottom-6 -left-6 bg-white text-zinc-900 rounded-xl p-4 shadow-xl border border-zinc-100 flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
//                   <CheckCircle2 className="w-5 h-5" />
//                 </div>
//                 <div className="text-left">
//                   <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Multiple Schemes</p>
//                   <p className="text-xs font-black text-zinc-800">Unsecured & Gold-Backed</p>
//                 </div>
//               </div>
//             </motion.div>

//           </div>
//         </div>
//       </section>

//       {/* CORE VALUE INTRODUCTION STATEMENT */}
//       <section className="relative w-full py-16 md:py-24 bg-transparent">
//         <div className="max-w-7xl mx-auto px-6 md:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

//             <div className="lg:col-span-5 text-left">
//               <span className="text-xs font-black tracking-widest text-[#FCA038] uppercase">MAXVALUE CREDITS</span>
//               <h2 className="text-3xl md:text-4xl font-black text-[#147FC3] tracking-tight uppercase mt-2">
//                 Traders Loan
//               </h2>
//               <div className="w-16 h-1 bg-[#147FC3] rounded-full mt-4" />
//             </div>

//             <div className="lg:col-span-7 text-left text-zinc-600 text-sm md:text-base leading-relaxed flex flex-col gap-6">
//               <p>
//                 Whether you're looking for an unsecured business loan or a loan backed by gold collateral, Max Value offers multiple Traders Loan schemes with competitive interest rates, transparent processing, and quick approvals. Our experienced team works closely with you to recommend the right loan based on your business requirements and eligibility.
//               </p>
//               <p className="font-semibold text-zinc-800">
//                 With simple documentation, customer-friendly service, and a trusted branch network, we help businesses access the financial support they need to grow with confidence.
//               </p>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* CHOOSE THE RIGHT TRADERS LOAN FOR YOUR BUSINESS (SCHEMES GRID) */}
//       <section className="relative w-full py-16 md:py-24 bg-transparent">
//         <div className="max-w-7xl mx-auto px-6 md:px-8">

//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight uppercase">
//               Choose the Right Traders Loan for Your Business
//             </h2>
//             <div className="w-16 h-1 bg-[#FCA038] mx-auto mt-4 mb-2" />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {schemes.map((scheme, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className="bg-white p-8 md:p-10 rounded-2xl border border-zinc-200/90 shadow-lg flex flex-col text-left justify-between group hover:border-[#147FC3]/40 transition-all duration-300"
//               >
//                 <div>
//                   <div className="flex items-center gap-4 mb-5">
//                     <div className="w-12 h-12 rounded-xl bg-[#147FC3]/10 flex items-center justify-center shrink-0">
//                       {scheme.icon}
//                     </div>
//                     <h3 className="text-xl md:text-2xl font-black text-zinc-900 tracking-tight group-hover:text-[#147FC3] transition-colors">
//                       {scheme.name}
//                     </h3>
//                   </div>

//                   <p className="text-zinc-600 text-xs md:text-sm leading-relaxed mb-6">
//                     {scheme.description}
//                   </p>
//                 </div>

//                 <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-150">
//                   <p className="text-xs font-black uppercase text-[#FCA038] tracking-wider mb-3">
//                     Best for:
//                   </p>
//                   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-zinc-700">
//                     {scheme.bestFor.map((item, itemIdx) => (
//                       <li key={itemIdx} className="flex items-center gap-2">
//                         <CheckCircle2 className="w-3.5 h-3.5 text-[#147FC3] shrink-0" />
//                         <span>{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//         </div>
//       </section>

//       {/* WHY CHOOSE MAX VALUE TRADERS LOAN (VISUAL GRID) */}
//       <section className="relative w-full py-16 md:py-24 bg-transparent">
//         {/* Subtle grid background */}
//         <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,127,195,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,127,195,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
//         </div>

//         <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

//           <div className="text-center max-w-2xl mx-auto mb-16">
//             <h2 className="text-2xl md:text-4xl font-black text-zinc-955 tracking-tight uppercase">
//               Why Choose Max Value Traders Loan?
//             </h2>
//             <div className="w-16 h-1 bg-[#FCA038] mx-auto mt-4 mb-2" />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {whyChooseBenefits.map((benefit, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.05 }}
//                 className="bg-[#ECEAE7]/70 p-10 md:p-12 rounded-3xl flex flex-col items-center text-center group transition-colors duration-300 hover:bg-[#ECEAE7]"
//               >
//                 <div className="relative w-16 h-16 flex items-center justify-center mb-6">
//                   {/* Ambient Glow */}
//                   <div className={`absolute inset-0 m-auto w-10 h-10 rounded-full blur-[20px] opacity-45 transition-all duration-500 group-hover:blur-[24px] group-hover:scale-110 ${idx % 2 === 0 ? "bg-[#FCA038]" : "bg-[#147FC3]"
//                     }`} />
//                   {/* Cloned Icon */}
//                   <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
//                     {cloneElement(benefit.icon as ReactElement<any>, { className: "w-8 h-8 text-[#0c141c]", strokeWidth: 2.25 })}
//                   </div>
//                 </div>
//                 <h3 className="text-base md:text-lg font-black text-zinc-900 mb-3 tracking-tight group-hover:text-[#147FC3] transition-colors">
//                   {benefit.title}
//                 </h3>
//                 <p className="text-zinc-550 text-xs md:text-sm leading-relaxed max-w-[280px]">
//                   {benefit.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>

//         </div>
//       </section>

//       {/* FREQUENTLY ASKED QUESTIONS */}
//       <section className="relative w-full py-16 md:py-24 bg-transparent">
//         <div className="max-w-4xl mx-auto px-6 md:px-8">

//           <div className="text-center mb-16 flex flex-col items-center">
//             <h2 className="text-3xl md:text-5xl font-light text-zinc-900 tracking-tight leading-tight">
//               Frequently <br />
//               <span className="font-bold">Asked </span>
//               <span className="italic font-serif text-[#147FC3]">Questions</span>
//             </h2>
//           </div>

//           <div className="flex flex-col border-t border-zinc-200/80">
//             {faqs.map((faq, index) => {
//               const isOpen = openFaqIndex === index;
//               return (
//                 <div
//                   key={index}
//                   className="border-b border-zinc-200/80 text-left"
//                 >
//                   <button
//                     onClick={() => toggleFaq(index)}
//                     className="w-full py-6 md:py-8 flex items-center justify-between text-left font-bold text-base md:text-lg text-zinc-900 hover:text-[#147FC3] transition-colors cursor-pointer select-none group"
//                   >
//                     <span className="pr-4">{faq.question}</span>
//                     <ArrowRight className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 group-hover:text-[#147FC3] ${isOpen ? "-rotate-45 text-[#147FC3]" : ""}`} />
//                   </button>

//                   <AnimatePresence initial={false}>
//                     {isOpen && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.25, ease: "easeInOut" }}
//                         className="overflow-hidden"
//                       >
//                         <div className="pb-6 text-zinc-500 text-xs md:text-sm leading-relaxed max-w-3xl">
//                           {faq.answer}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })}
//           </div>

//         </div>
//       </section>

//       {/* QUICK ENQUIRY SECTION */}
//       <section id="enquiry-section" className="relative w-full py-16 md:py-24 bg-transparent">
//         <div className="max-w-7xl mx-auto px-6 md:px-8">

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

//             {/* Left Representative Image */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="lg:col-span-5 relative"
//             >
//               <div className="relative mx-auto max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-200 shadow-2xl">
//                 <img
//                   src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop"
//                   alt="Traders Loan Representative Support"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
//                 <div className="absolute bottom-6 left-6 right-6 text-white text-left">
//                   <p className="text-xs font-black uppercase text-[#FCA038] tracking-widest mb-1">Direct Assistance</p>
//                   <h4 className="text-lg font-black tracking-tight">Need assistance right now?</h4>
//                   <p className="text-xs text-white/80 mt-1 leading-relaxed">Submit the form to talk with our traders loan representative via WhatsApp for faster disbursement.</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Right Enquiry Form */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.15 }}
//               className="lg:col-span-7"
//             >
//               <div className="bg-white rounded-2xl shadow-xl border border-zinc-200/90 p-8 md:p-10 relative overflow-hidden">

//                 {/* Decorative Top Accent Bar */}
//                 <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#147FC3] via-[#FCA038] to-[#147FC3]" />

//                 <div className="mb-8 text-left">
//                   <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#147FC3] uppercase mb-1">
//                     <MessageSquare className="w-4 h-4 text-[#FCA038]" />
//                     QUICK ENQUIRY FORM
//                   </div>
//                   <h3 className="text-2xl font-black text-zinc-900 tracking-tight">
//                     Enquire About Traders Loan
//                   </h3>
//                   <p className="text-zinc-500 text-xs md:text-sm mt-1">
//                     Fill in the details below. Submitting will open your official WhatsApp support chat (<strong className="text-zinc-800">8891133443</strong>).
//                   </p>
//                 </div>

//                 {showSuccess ? (
//                   <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center flex flex-col items-center gap-4 my-6">
//                     <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
//                       <CheckCircle2 className="w-8 h-8" />
//                     </div>
//                     <div>
//                       <h4 className="text-lg font-bold text-emerald-900">
//                         Redirecting to WhatsApp!
//                       </h4>
//                       <p className="text-xs text-emerald-700 mt-1 max-w-md">
//                         Your enquiry details have been compiled. If WhatsApp didn't open automatically, please click the button below to complete sending your message.
//                       </p>
//                     </div>

//                     <a
//                       href={whatsappUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="mt-2 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer"
//                     >
//                       <MessageSquare className="w-4 h-4 fill-white" />
//                       <span>Open WhatsApp Chat (8891133443)</span>
//                       <ExternalLink className="w-3.5 h-3.5" />
//                     </a>

//                     <button
//                       onClick={() => {
//                         setShowSuccess(false);
//                         setFormData({ name: "", email: "", phone: "", place: "", enquiryFor: "Traders Loan", comment: "" });
//                       }}
//                       className="text-xs font-bold text-zinc-500 hover:text-zinc-800 underline mt-2 cursor-pointer"
//                     >
//                       Send Another Enquiry
//                     </button>
//                   </div>
//                 ) : (
//                   <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left" noValidate>

//                     {/* Row 1: Name & Phone */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                       {/* Name */}
//                       <div className="flex flex-col gap-2">
//                         <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
//                           Name <span className="text-rose-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
//                           <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             placeholder="Enter your full name"
//                             className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.name
//                               ? "border-rose-400 ring-2 ring-rose-100"
//                               : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
//                               }`}
//                           />
//                         </div>
//                         {errors.name && (
//                           <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
//                             <AlertCircle className="w-3 h-3" /> {errors.name}
//                           </span>
//                         )}
//                       </div>

//                       {/* Phone */}
//                       <div className="flex flex-col gap-2">
//                         <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
//                           Phone Number <span className="text-rose-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
//                           <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             placeholder="Enter your mobile number"
//                             className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.phone
//                               ? "border-rose-400 ring-2 ring-rose-100"
//                               : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
//                               }`}
//                           />
//                         </div>
//                         {errors.phone && (
//                           <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
//                             <AlertCircle className="w-3 h-3" /> {errors.phone}
//                           </span>
//                         )}
//                       </div>

//                     </div>

//                     {/* Row 2: Email & Place */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                       {/* Email */}
//                       <div className="flex flex-col gap-2">
//                         <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
//                           Email Address <span className="text-rose-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
//                           <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="name@example.com"
//                             className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.email
//                               ? "border-rose-400 ring-2 ring-rose-100"
//                               : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
//                               }`}
//                           />
//                         </div>
//                         {errors.email && (
//                           <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
//                             <AlertCircle className="w-3 h-3" /> {errors.email}
//                           </span>
//                         )}
//                       </div>

//                       {/* Place */}
//                       <div className="flex flex-col gap-2">
//                         <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
//                           Place / City <span className="text-rose-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
//                           <input
//                             type="text"
//                             name="place"
//                             value={formData.place}
//                             onChange={handleChange}
//                             placeholder="Enter your location"
//                             className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.place
//                               ? "border-rose-400 ring-2 ring-rose-100"
//                               : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
//                               }`}
//                           />
//                         </div>
//                         {errors.place && (
//                           <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
//                             <AlertCircle className="w-3 h-3" /> {errors.place}
//                           </span>
//                         )}
//                       </div>

//                     </div>

//                     {/* Enquiry For Dropdown */}
//                     <div className="flex flex-col gap-2">
//                       <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
//                         Enquiry For
//                       </label>
//                       <div className="relative">
//                         <Briefcase className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
//                         <select
//                           name="enquiryFor"
//                           value={formData.enquiryFor}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-8 py-3 rounded-lg border border-zinc-300 text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20 appearance-none font-medium cursor-pointer"
//                         >
//                           <option value="Traders Loan">Traders Loan</option>
//                           <option value="Business Loan">Business Loan</option>
//                           <option value="Gold Loan">Gold Loan</option>
//                           <option value="Vehicle Loan">Vehicle Loan</option>
//                           <option value="Microfinance">Microfinance</option>
//                         </select>
//                         <div className="absolute right-3.5 top-4 pointer-events-none text-zinc-400 text-xs">
//                           ▼
//                         </div>
//                       </div>
//                     </div>

//                     {/* Query / Comments */}
//                     <div className="flex flex-col gap-2">
//                       <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
//                         Query / Comment <span className="text-rose-500">*</span>
//                       </label>
//                       <textarea
//                         name="comment"
//                         rows={4}
//                         value={formData.comment}
//                         onChange={handleChange}
//                         placeholder="Write your detailed inquiry here..."
//                         className={`w-full p-4 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.comment
//                           ? "border-rose-400 ring-2 ring-rose-100"
//                           : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
//                           }`}
//                       />
//                       {errors.comment && (
//                         <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
//                           <AlertCircle className="w-3 h-3" /> {errors.comment}
//                         </span>
//                       )}
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="w-full bg-[#147FC3] hover:bg-[#0f68a3] active:bg-[#FCA038] text-white font-extrabold text-sm py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider group active:scale-[0.99]"
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           <span>Opening WhatsApp...</span>
//                         </>
//                       ) : (
//                         <>
//                           <span>Submit Enquiry Via WhatsApp</span>
//                           <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                         </>
//                       )}
//                     </button>

//                   </form>
//                 )}

//               </div>
//             </motion.div>

//           </div>

//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />

//     </div>
//   );
// }


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
  Briefcase,
  ShieldCheck,
  FileText,
  TrendingUp,
  Award,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  User,
  Percent,
  MessageSquare,
  Building2,
  Store,
  Sparkles,
  Users
} from "lucide-react";

export default function TradersLoanPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    enquiryFor: "Traders Loan",
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
      `*NEW TRADERS LOAN ENQUIRY - MAXVALUE*
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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const schemes = [
    {
      name: "Max Vanijya",
      description: "An unsecured business loan designed for traders who need quick access to funds without providing collateral. Based on repayment performance, eligible customers may receive enhanced loan limits through subsequent loan cycles.",
      bestFor: [
        "Working capital",
        "Stock purchases",
        "Business expansion",
        "Daily business operations"
      ],
      icon: <Store className="w-6 h-6 text-[#147FC3]" />
    },
    {
      name: "Max Samrudhi",
      description: "A partially secured Traders Loan backed by 50% gold collateral, offering higher loan eligibility while maintaining flexible financing options.",
      bestFor: [
        "Business growth",
        "Inventory purchases",
        "Equipment upgrades",
        "Expansion plans"
      ],
      icon: <TrendingUp className="w-6 h-6 text-[#FCA038]" />
    },
    {
      name: "Vyapari Kshema",
      description: "A fully secured business loan backed by 100% eligible gold collateral, offering competitive interest rates and flexible loan amounts to support growing businesses.",
      bestFor: [
        "Established businesses",
        "Large inventory purchases",
        "Business expansion",
        "Working capital requirements"
      ],
      icon: <Building2 className="w-6 h-6 text-[#147FC3]" />
    },
    {
      name: "Mahila Kshema",
      description: "A specially designed loan scheme for women entrepreneurs, supported by eligible gold collateral, helping women manage and expand their businesses with confidence.",
      bestFor: [
        "Women-owned businesses",
        "Small business expansion",
        "Business investments",
        "Working capital"
      ],
      icon: <Sparkles className="w-6 h-6 text-[#FCA038]" />
    }
  ];

  const benefits = [
    {
      title: "Multiple Loan Options",
      description: "Choose from unsecured, partially secured, or fully secured loan schemes based on your business needs.",
      icon: <Briefcase className="w-6 h-6 text-[#147FC3]" />
    },
    {
      title: "Quick Loan Processing",
      description: "Our streamlined application process helps eligible businesses access funds without unnecessary delays.",
      icon: <TrendingUp className="w-6 h-6 text-[#FCA038]" />
    },
    {
      title: "Secure & Transparent Process",
      description: "From loan assessment to approval, every step is explained clearly with transparent charges and repayment terms.",
      icon: <ShieldCheck className="w-6 h-6 text-[#147FC3]" />
    },
    {
      title: "Simple Documentation",
      description: "Basic KYC and business-related documents are generally required, making the application process quick and convenient.",
      icon: <FileText className="w-6 h-6 text-[#FCA038]" />
    },
    {
      title: "Flexible Loan Amounts",
      description: "Loan amounts are available based on the selected scheme and customer eligibility, helping you finance both small and large business requirements.",
      icon: <Percent className="w-6 h-6 text-[#147FC3]" />
    },
    {
      title: "Trusted Financial Partner",
      description: "With years of lending experience and a strong branch network, Max Value continues to support traders and business owners across South India.",
      icon: <Award className="w-6 h-6 text-[#FCA038]" />
    }
  ];

  const faqs = [
    {
      question: "Who can apply for a Traders Loan?",
      answer: "Traders, shop owners, and eligible small business owners with an established business may apply for a Traders Loan, subject to eligibility criteria, KYC verification, and business assessment."
    },
    {
      question: "What types of Traders Loan are available?",
      answer: "Max Value offers four Traders Loan schemes: Max Vanijya, Max Samrudhi, Vyapari Kshema, and Mahila Kshema, allowing customers to choose between unsecured and gold-backed loan options based on their business requirements."
    },
    {
      question: "How much loan can I get?",
      answer: "The eligible loan amount depends on the selected loan scheme, your business profile, repayment capacity, and collateral requirements where applicable."
    },
    {
      question: "What documents are required?",
      answer: "Applicants are generally required to submit valid KYC documents along with business-related documents as applicable. Additional documents may be requested during the verification process."
    },
    {
      question: "How quickly is a Traders Loan processed?",
      answer: "Once the required documents are verified and the application is approved, the loan is processed promptly, helping businesses access funds when they need them most."
    },
    {
      question: "Can I use the loan for any business purpose?",
      answer: "Yes. Traders Loans can typically be used for working capital, purchasing stock, expanding your business, upgrading equipment, managing cash flow, or other legitimate business expenses."
    },
    {
      question: "Can I upgrade my loan amount in the future?",
      answer: "Certain loan schemes, such as Max Vanijya, allow eligible customers to move to higher loan cycles based on repayment history and business verification."
    },
    {
      question: "Why choose Max Value for a Traders Loan?",
      answer: "Max Value offers multiple business loan options, transparent processing, competitive interest rates, flexible repayment options, and dedicated customer support, helping traders access reliable financial solutions for business growth."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">

      {/* Navbar & Top spacing */}
      <Navbar />

      {/* HERO SECTION - BUSINESS FINANCE THAT HELPS YOUR TRADE GROW */}
      <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-44 lg:pb-28 bg-white text-zinc-900 border-b border-zinc-200/80 overflow-hidden">
        {/* Background ambient glow effects */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,127,195,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,127,195,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-[#147FC3]/5 blur-[120px]" />
          <div className="absolute -top-10 left-10 w-72 h-72 rounded-full bg-[#FCA038]/5 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left content (Text - Black & Dark Zinc) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 text-left"
            >
              

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black uppercase leading-tight mb-4">
                Business finance that helps <br />
                <span className="text-[#147FC3]">your trade grow</span>
              </h1>

              <div className="w-20 h-1.5 bg-[#FCA038] rounded-full mb-6" />

              <p className="text-zinc-700 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
                Every business needs timely financial support to manage inventory, expand operations, purchase equipment, or handle working capital requirements. At Max Value Credits & Investments Ltd., our Traders Loan is designed to provide reliable financing solutions for traders, shop owners, and small business owners through flexible loan options that suit different business needs.
              </p>

              {/* Quick Facts Indicator */}
              <div className="inline-block bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 shadow-xs">
                <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold">Loan Schemes</p>
                <p className="text-xl font-black text-[#147FC3] mt-0.5">
                  Unsecured <span className="text-xs text-zinc-500 font-medium">& Gold-Backed</span>
                </p>
              </div>

              <div>
                <a
                  href="#enquiry-section"
                  className="inline-flex items-center gap-2 bg-[#147FC3] hover:bg-[#0f68a3] text-white font-extrabold text-xs py-3.5 px-7 rounded-lg transition-all shadow-md hover:shadow-lg uppercase tracking-wider active:scale-95 cursor-pointer"
                >
                  Apply Now
                  <Send className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Right content (tradersloanbanner.png from public folder) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto w-full max-w-[580px] rounded-2xl overflow-hidden border-2 border-slate-200/80 shadow-xl bg-white group">
                <img
                  src="/businessbanner.png"
                  alt="MaxValue Traders Loan Banner"
                  className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 left-4 sm:left-6 bg-white text-zinc-900 rounded-xl p-4 shadow-xl border border-zinc-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Multiple Schemes</p>
                  <p className="text-xs font-black text-zinc-900">Unsecured & Gold-Backed</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CORE VALUE INTRODUCTION STATEMENT */}
      <section className="relative w-full py-16 md:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            <div className="lg:col-span-5 text-left">
              <span className="text-xs font-black tracking-widest text-[#FCA038] uppercase">MAXVALUE CREDITS</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#147FC3] tracking-tight uppercase mt-2">
                Financing Built For Business
              </h2>
              <div className="w-16 h-1 bg-[#147FC3] rounded-full mt-4" />
            </div>

            <div className="lg:col-span-7 text-left text-zinc-600 text-sm md:text-base leading-relaxed flex flex-col gap-6">
              <p>
                Whether you're looking for an unsecured business loan or a loan backed by gold collateral, Max Value offers multiple Traders Loan schemes with competitive interest rates, transparent processing, and quick approvals. Our experienced team works closely with you to recommend the right loan based on your business requirements and eligibility.
              </p>
              <p>
                From day-to-day working capital to larger inventory and expansion needs, each scheme is structured to match a different stage of your business journey, so you can choose the option that fits best without unnecessary complexity.
              </p>
              <p className="font-semibold text-zinc-800">
                With simple documentation, customer-friendly service, and a trusted branch network, we help businesses access the financial support they need to grow with confidence.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* PROMOTIONAL ADS / FEATURED BANNER SECTION */}
      <section className="relative w-full py-6 md:py-10 bg-transparent">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-xl overflow-hidden shadow-xl border border-slate-200/80 bg-white group"
          >
            <img
              src="/adsbusiness.jpg"
              alt="MaxValue Traders Loan Special Promotion & Ad"
              className="w-full h-auto object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* CHOOSE THE RIGHT TRADERS LOAN FOR YOUR BUSINESS (SCHEMES GRID) */}
      <section className="relative w-full py-16 md:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight uppercase">
              Choose the Right Traders Loan for Your Business
            </h2>
            <div className="w-16 h-1 bg-[#FCA038] mx-auto mt-4 mb-2" />
            <p className="text-zinc-500 text-xs md:text-sm">
              Four schemes, each built for a different stage of your business — pick the one that fits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {schemes.map((scheme, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 md:p-10 rounded-2xl border border-zinc-200/90 shadow-lg flex flex-col text-left justify-between group hover:border-[#147FC3]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#147FC3]/10 flex items-center justify-center shrink-0">
                      {scheme.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-zinc-900 tracking-tight group-hover:text-[#147FC3] transition-colors">
                      {scheme.name}
                    </h3>
                  </div>

                  <p className="text-zinc-600 text-xs md:text-sm leading-relaxed mb-6">
                    {scheme.description}
                  </p>
                </div>

                <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-150">
                  <p className="text-xs font-black uppercase text-[#FCA038] tracking-wider mb-3">
                    Best for:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-zinc-700">
                    {scheme.bestFor.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#147FC3] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE MAX VALUE (VISUAL GRID) */}
      <section className="relative w-full py-16 md:py-24 bg-transparent">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,127,195,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,127,195,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-zinc-955 tracking-tight uppercase">
              Why Choose Max Value Traders Loan?
            </h2>
            <div className="w-16 h-1 bg-[#FCA038] mx-auto mt-4 mb-2" />
            <p className="text-zinc-500 text-xs md:text-sm">
              We provide financing options designed to suit your business, giving you greater convenience, reliability, and peace of mind.
            </p>
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
                  <div className={`absolute inset-0 m-auto w-10 h-10 rounded-full blur-[20px] opacity-45 transition-all duration-500 group-hover:blur-[24px] group-hover:scale-110 ${idx % 2 === 0 ? "bg-[#FCA038]" : "bg-[#147FC3]"
                    }`} />
                  {/* Cloned Icon with custom class */}
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
      <section className="relative w-full py-16 md:py-24 bg-transparent">
        <div className="max-w-4xl mx-auto px-6 md:px-8">

          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-light text-zinc-900 tracking-tight leading-tight">
              Frequently <br />
              <span className="font-bold">asked </span>
              <span className="italic font-serif text-[#147FC3]">questions</span>
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm mt-4 max-w-sm">
              Got questions about our Traders Loan? Here are answers to the most common queries.
            </p>
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
      <section id="enquiry-section" className="relative w-full py-16 md:py-24 bg-transparent">
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
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop"
                  alt="Customer Care Support representative"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <p className="text-xs font-black uppercase text-[#FCA038] tracking-widest mb-1">Direct Assistance</p>
                  <h4 className="text-lg font-black tracking-tight">Need assistance right now?</h4>
                  <p className="text-xs text-white/80 mt-1 leading-relaxed">Submit the form to talk with our traders loan representative via WhatsApp for faster disbursement.</p>
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
                    Enquire About Traders Loan
                  </h3>
                  <p className="text-zinc-500 text-xs md:text-sm mt-1">
                    Fill in the details below. Submitting will open your official WhatsApp support chat (<strong className="text-zinc-800">8891133443</strong>).
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
                      <span>Open WhatsApp Chat (8891133443)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => {
                        setShowSuccess(false);
                        setFormData({ name: "", email: "", phone: "", place: "", enquiryFor: "Traders Loan", comment: "" });
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
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.place
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
                        <Briefcase className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <select
                          name="enquiryFor"
                          value={formData.enquiryFor}
                          onChange={handleChange}
                          className="w-full pl-10 pr-8 py-3 rounded-lg border border-zinc-300 text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20 appearance-none font-medium cursor-pointer"
                        >
                          <option value="Traders Loan">Traders Loan</option>
                          <option value="Business Loan">Business Loan</option>
                          <option value="Gold Loan">Gold Loan</option>
                          <option value="Vehicle Loan">Vehicle Loan</option>
                          <option value="Microfinance">Microfinance</option>
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
                        className={`w-full p-4 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.comment
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