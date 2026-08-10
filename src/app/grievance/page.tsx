// "use client";

// import { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion } from "framer-motion";
// import {
//   Phone,
//   Mail,
//   MapPin,
//   Clock,
//   Send,
//   CheckCircle2,
//   AlertCircle,
//   ShieldCheck,
//   FileText,
//   User,
//   MessageSquare,
//   Building,
//   CheckSquare,
//   ExternalLink
// } from "lucide-react";

// export default function GrievancePage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     state: "Kerala",
//     city: "Thrissur",
//     customCity: "",
//     message: "",
//     authorized: true
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [whatsappUrl, setWhatsappUrl] = useState("");

//   const stateOptions = [
//     "Kerala",
//     "Tamil Nadu",
//     "Karnataka",
//     "Andhra Pradesh",
//     "Telangana",
//     "Maharashtra",
//     "Other State"
//   ];

//   const cityOptionsByState: Record<string, string[]> = {
//     "Kerala": ["Thrissur", "Kochi / Ernakulam", "Thiruvananthapuram", "Kozhikode", "Palakkad", "Kannur", "Kottayam", "Malappuram", "Alappuzha", "Kollam", "Other City"],
//     "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Tirupur", "Other City"],
//     "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum", "Other City"],
//     "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Other City"],
//     "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Other City"],
//     "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Other City"],
//     "Other State": ["Other City"]
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     if (type === "checkbox") {
//       const checked = (e.target as HTMLInputElement).checked;
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }

//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validate = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (formData.phone.trim() && !/^\+?[0-9\s-]{8,15}$/.test(formData.phone.replace(/\s+/g, ""))) {
//       newErrors.phone = "Please enter a valid phone number";
//     }

//     if (!formData.message.trim()) {
//       newErrors.message = "Please describe your complaint or grievance";
//     }

//     if (!formData.authorized) {
//       newErrors.authorized = "Authorization consent is required to submit your grievance";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setIsSubmitting(true);

//     const chosenCity = formData.city === "Other City" && formData.customCity.trim()
//       ? formData.customCity.trim()
//       : formData.city;

//     const messageText =
//       `*COMPLAINT & GRIEVANCE REDRESSAL - MAXVALUE CREDITS*
// ----------------------------------------
// 👤 *Name:* ${formData.name.trim()}
// 📧 *Email:* ${formData.email.trim()}
// 📞 *Phone Number:* ${formData.phone.trim() || "Not provided"}
// 📍 *State:* ${formData.state}
// 🏙️ *City:* ${chosenCity}
// ----------------------------------------
// 📄 *Grievance Message:*
// ${formData.message.trim()}
// ----------------------------------------
// ✅ *Authorization:* Granted permission to communicate via Phone, Mobile, SMS, WhatsApp & Email.
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

//   return (
//     <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">

//       {/* 3-Tier Navbar */}
//       <Navbar />

//       {/* SECTION 1: GRIEVANCE BANNER */}
//       <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32 bg-[#0c141c] text-white overflow-hidden">
//         {/* Background Image with Dark Gradient Overlay */}
//         <div className="absolute inset-0 z-0">
//           <img
//             src="https://maxvaluecredits.com/wp-content/uploads/2025/07/Landing-Page-2.jpg"
//             alt="Grievance Banner"
//             className="w-full h-full object-cover opacity-25"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#0c141c] via-[#0c141c]/90 to-[#147FC3]/50" />
//         </div>

//         {/* Ambient Grid & Glows */}
//         <div className="absolute inset-0 pointer-events-none z-0">
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
//           <div className="absolute top-1/2 left-10 w-96 h-96 rounded-full bg-[#147FC3]/20 blur-[120px]" />
//         </div>

//         <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center md:text-left">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-col items-center md:items-start"
//           >


//             <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-4">
//               Grievance <span className="text-[#FCA038]">Redressal</span>
//             </h1>

//             <div className="w-20 h-1 bg-[#FCA038] rounded-full mb-6" />

//             <p className="text-zinc-300 text-sm md:text-base max-w-2xl leading-relaxed text-center md:text-left">
//               We value your trust and satisfaction. Submit your feedback or formal complaint directly to our Nodal Grievance Desk.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* SECTION 2: COMPLAINTS & GRIEVANCE REDRESSAL STATEMENT */}
//       <section className="relative w-full py-12 bg-[#147FC3] text-white">
//         <div className="max-w-7xl mx-auto px-6 md:px-8">
//           <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/20 shadow-xl text-left">
//             <div className="flex items-center gap-3 mb-3">
//               <FileText className="w-6 h-6 text-[#FCA038]" />
//               <h2 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">
//                 Complaints and Grievance Redressal
//               </h2>
//             </div>
//             <p className="text-white/90 text-sm md:text-base leading-relaxed text-justify">
//               MaxValue Credits and Investment Limited is committed to providing the best possible services to its customers. Customers may contact us for information about our products and services or to register any complaints or grievances. If you are not satisfied with our services or products, you can submit your complaint using the form below.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* SECTION 3: GRIEVANCE CONTENT & FORM */}
//       <section className="relative w-full py-16 md:py-24 bg-transparent">
//         {/* Subtle background grid */}
//         <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,127,195,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,127,195,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
//         </div>

//         <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

//             {/* COLUMN 1: GRIEVANCE CONTACT INFORMATION */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="lg:col-span-5 flex flex-col gap-8 text-left"
//             >
//               <div>

//                 <h2 className="text-2xl md:text-3xl font-black text-[#147FC3] tracking-tight uppercase">
//                   Get In Touch
//                 </h2>
//                 <p className="text-zinc-600 text-sm mt-2 leading-relaxed">
//                   Our grievance officer will promptly review your submitted complaint and resolve issues within standard regulatory turnaround times.
//                 </p>
//               </div>

//               {/* Information Cards */}
//               <div className="flex flex-col gap-5">

//                 {/* Phone Card */}
//                 <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-[#147FC3]/10 text-[#147FC3] flex items-center justify-center shrink-0">
//                     <Phone className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
//                       Phone Number
//                     </h3>
//                     <a
//                       href="tel:04872422799"
//                       className="text-lg font-extrabold text-zinc-900 hover:text-[#147FC3] transition-colors block"
//                     >
//                       0487 2422799
//                     </a>
//                   </div>
//                 </div>

//                 {/* Email Card */}
//                 <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-[#FCA038]/10 text-[#FCA038] flex items-center justify-center shrink-0">
//                     <Mail className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
//                       Grievance Email Address
//                     </h3>
//                     <a
//                       href="mailto:grievances@maxvaluecredits.com"
//                       className="text-base font-extrabold text-[#147FC3] hover:underline transition-all block break-all"
//                     >
//                       grievances@maxvaluecredits.com
//                     </a>
//                     <p className="text-xs text-zinc-500 mt-1 font-medium">
//                       Dedicated portal for registered complaints
//                     </p>
//                   </div>
//                 </div>

//                 {/* Address Card */}
//                 <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-[#147FC3]/10 text-[#147FC3] flex items-center justify-center shrink-0">
//                     <MapPin className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
//                       Registered Corporate Address
//                     </h3>
//                     <div className="text-sm font-bold text-zinc-800 leading-relaxed">
//                       Maxvalue Credits And Investments Ltd<br />
//                       <span className="font-semibold text-zinc-600">
//                         1st Floor, Cee Kay Plaza,<br />
//                         Opp. Metropolitan Hospital, Koorkencherry,<br />
//                         Thrissur, Kerala – 680007
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Fair Practice Assurance Box */}
//                 <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
//                   <ShieldCheck className="w-5 h-5 text-[#FCA038] shrink-0 mt-0.5" />
//                   <div className="text-xs text-amber-900 leading-relaxed">
//                     <strong className="font-bold block mb-1">Fair Practices & Escalation Policy</strong>
//                     All complaints submitted are logged into our official tracking mechanism. If unresolved within 14 business days, your case is escalated to our Nodal Grievance Redressal Officer.
//                   </div>
//                 </div>

//               </div>
//             </motion.div>

//             {/* COLUMN 2: GRIEVANCE FORM */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.15 }}
//               className="lg:col-span-7"
//             >
//               <div className="bg-white rounded-2xl shadow-xl border border-zinc-200/90 p-8 md:p-10 relative overflow-hidden">

//                 {/* Decorative Top Accent Bar */}
//                 <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FCA038] via-[#147FC3] to-[#FCA038]" />

//                 <div className="mb-8 text-left">

//                   <h3 className="text-2xl font-black text-zinc-900 tracking-tight">
//                     Submit Your Grievance
//                   </h3>
//                   <p className="text-zinc-500 text-xs md:text-sm mt-1">
//                     Please provide full context of your complaint. Submitting will compile and transmit your grievance directly to our WhatsApp Redressal line (<strong className="text-zinc-800">8891133443</strong>).
//                   </p>
//                 </div>

//                 {showSuccess ? (
//                   <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center flex flex-col items-center gap-4 my-6">
//                     <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
//                       <CheckCircle2 className="w-8 h-8" />
//                     </div>
//                     <div>
//                       <h4 className="text-lg font-bold text-emerald-900">
//                         Grievance Compiled Successfully!
//                       </h4>
//                       <p className="text-xs text-emerald-700 mt-1 max-w-md">
//                         Your complaint report is ready. If WhatsApp did not open automatically, please click the button below to send your details to 8891133443.
//                       </p>
//                     </div>

//                     <a
//                       href={whatsappUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="mt-2 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer"
//                     >
//                       <MessageSquare className="w-4 h-4 fill-white" />
//                       <span>Send Grievance via WhatsApp (8891133443)</span>
//                       <ExternalLink className="w-3.5 h-3.5" />
//                     </a>

//                     <button
//                       onClick={() => {
//                         setShowSuccess(false);
//                         setFormData({
//                           name: "",
//                           email: "",
//                           phone: "",
//                           state: "Kerala",
//                           city: "Thrissur",
//                           customCity: "",
//                           message: "",
//                           authorized: true
//                         });
//                       }}
//                       className="text-xs font-bold text-zinc-500 hover:text-zinc-800 underline mt-2 cursor-pointer"
//                     >
//                       Submit Another Grievance
//                     </button>
//                   </div>
//                 ) : (
//                   <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left" noValidate>

//                     {/* Row 1: Name & Email */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                       {/* Name * */}
//                       <div className="flex flex-col gap-2">
//                         <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center justify-between">
//                           <span>Name <span className="text-rose-500">*</span></span>
//                         </label>
//                         <div className="relative">
//                           <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
//                           <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             placeholder="Your full name"
//                             className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.name
//                                 ? "border-rose-400 ring-2 ring-rose-100"
//                                 : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
//                               }`}
//                           />
//                         </div>
//                         {errors.name && (
//                           <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
//                             <AlertCircle className="w-3 h-3" /> {errors.name}
//                           </span>
//                         )}
//                       </div>

//                       {/* Email * */}
//                       <div className="flex flex-col gap-2">
//                         <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center justify-between">
//                           <span>Email <span className="text-rose-500">*</span></span>
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
//                                 ? "border-rose-400 ring-2 ring-rose-100"
//                                 : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
//                               }`}
//                           />
//                         </div>
//                         {errors.email && (
//                           <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
//                             <AlertCircle className="w-3 h-3" /> {errors.email}
//                           </span>
//                         )}
//                       </div>

//                     </div>

//                     {/* Row 2: Phone Number & Select State */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                       {/* Phone Number */}
//                       <div className="flex flex-col gap-2">
//                         <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
//                           Phone Number
//                         </label>
//                         <div className="relative">
//                           <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
//                           <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             placeholder="Contact number"
//                             className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.phone
//                                 ? "border-rose-400 ring-2 ring-rose-100"
//                                 : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
//                               }`}
//                           />
//                         </div>
//                         {errors.phone && (
//                           <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
//                             <AlertCircle className="w-3 h-3" /> {errors.phone}
//                           </span>
//                         )}
//                       </div>

//                       {/* Select State */}
//                       <div className="flex flex-col gap-2">
//                         <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
//                           Select State
//                         </label>
//                         <div className="relative">
//                           <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
//                           <select
//                             name="state"
//                             value={formData.state}
//                             onChange={(e) => {
//                               handleChange(e);
//                               const cities = cityOptionsByState[e.target.value] || ["Other City"];
//                               setFormData(prev => ({ ...prev, state: e.target.value, city: cities[0] }));
//                             }}
//                             className="w-full pl-10 pr-8 py-3 rounded-lg border border-zinc-300 text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20 appearance-none font-medium cursor-pointer"
//                           >
//                             {stateOptions.map(st => (
//                               <option key={st} value={st}>{st}</option>
//                             ))}
//                           </select>
//                           <div className="absolute right-3.5 top-4 pointer-events-none text-zinc-400 text-xs">
//                             ▼
//                           </div>
//                         </div>
//                       </div>

//                     </div>

//                     {/* Row 3: Select City */}
//                     <div className="flex flex-col gap-2">
//                       <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
//                         Select City
//                       </label>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div className="relative">
//                           <Building className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
//                           <select
//                             name="city"
//                             value={formData.city}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-8 py-3 rounded-lg border border-zinc-300 text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20 appearance-none font-medium cursor-pointer"
//                           >
//                             {(cityOptionsByState[formData.state] || ["Other City"]).map(c => (
//                               <option key={c} value={c}>{c}</option>
//                             ))}
//                           </select>
//                           <div className="absolute right-3.5 top-4 pointer-events-none text-zinc-400 text-xs">
//                             ▼
//                           </div>
//                         </div>

//                         {formData.city === "Other City" && (
//                           <input
//                             type="text"
//                             name="customCity"
//                             value={formData.customCity}
//                             onChange={handleChange}
//                             placeholder="Enter your city name"
//                             className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
//                           />
//                         )}
//                       </div>
//                     </div>

//                     {/* Message */}
//                     <div className="flex flex-col gap-2">
//                       <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center justify-between">
//                         <span>Message <span className="text-rose-500">*</span></span>
//                       </label>
//                       <textarea
//                         name="message"
//                         rows={4}
//                         value={formData.message}
//                         onChange={handleChange}
//                         placeholder="Please describe your complaint or grievance in detail..."
//                         className={`w-full p-4 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.message
//                             ? "border-rose-400 ring-2 ring-rose-100"
//                             : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
//                           }`}
//                       />
//                       {errors.message && (
//                         <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
//                           <AlertCircle className="w-3 h-3" /> {errors.message}
//                         </span>
//                       )}
//                     </div>

//                     {/* Authorization Statement Box */}
//                     <div className={`p-4 rounded-xl border transition-all ${errors.authorized ? "bg-rose-50 border-rose-300" : "bg-zinc-50 border-zinc-200"
//                       }`}>
//                       <label className="flex items-start gap-3 cursor-pointer select-none">
//                         <input
//                           type="checkbox"
//                           name="authorized"
//                           checked={formData.authorized}
//                           onChange={handleChange}
//                           className="mt-1 w-4 h-4 text-[#147FC3] rounded border-zinc-300 focus:ring-[#147FC3] cursor-pointer"
//                         />
//                         <span className="text-xs text-zinc-600 leading-relaxed">
//                           By choosing the options, I authorize MaxValue Credits and Investment Limited (including its Agents/Representatives) to communicate with me regarding their product offerings, promotions, and services through Telephone, Mobile, SMS, WhatsApp, and Email.
//                         </span>
//                       </label>
//                       {errors.authorized && (
//                         <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-2">
//                           <AlertCircle className="w-3 h-3" /> {errors.authorized}
//                         </span>
//                       )}
//                     </div>

//                     {/* Send Message Button */}
//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="w-full bg-[#147FC3] hover:bg-[#0f68a3] active:bg-[#FCA038] text-white font-extrabold text-sm py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider group active:scale-[0.99]"
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           <span>Sending Grievance via WhatsApp...</span>
//                         </>
//                       ) : (
//                         <>
//                           <span>Send Message</span>
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

//       {/* Corporate Footer */}
//       <Footer />

//     </div>
//   );
// }


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
  ShieldCheck,
  FileText,
  User,
  MessageSquare,
  Building,
  CheckSquare,
  ExternalLink,
  ChevronRight,
  ChevronDown
} from "lucide-react";

export default function GrievancePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "Kerala",
    city: "Thrissur",
    customCity: "",
    message: "",
    authorized: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const stateOptions = [
    "Kerala",
    "Tamil Nadu",
    "Karnataka",
    "Andhra Pradesh",
    "Telangana",
    "Maharashtra",
    "Other State"
  ];

  const cityOptionsByState: Record<string, string[]> = {
    "Kerala": ["Thrissur", "Kochi / Ernakulam", "Thiruvananthapuram", "Kozhikode", "Palakkad", "Kannur", "Kottayam", "Malappuram", "Alappuzha", "Kollam", "Other City"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Tirupur", "Other City"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum", "Other City"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Other City"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Other City"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Other City"],
    "Other State": ["Other City"]
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone.trim() && !/^\+?[0-9\s-]{8,15}$/.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please describe your complaint or grievance";
    }

    if (!formData.authorized) {
      newErrors.authorized = "Authorization consent is required to submit your grievance";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const chosenCity = formData.city === "Other City" && formData.customCity.trim()
      ? formData.customCity.trim()
      : formData.city;

    const messageText =
      `*COMPLAINT & GRIEVANCE REDRESSAL - MAXVALUE CREDITS*
----------------------------------------
👤 *Name:* ${formData.name.trim()}
📧 *Email:* ${formData.email.trim()}
📞 *Phone Number:* ${formData.phone.trim() || "Not provided"}
📍 *State:* ${formData.state}
🏙️ *City:* ${chosenCity}
----------------------------------------
📄 *Grievance Message:*
${formData.message.trim()}
----------------------------------------
✅ *Authorization:* Granted permission to communicate via Phone, Mobile, SMS, WhatsApp & Email.
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

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">

      {/* 3-Tier Navbar */}
      <Navbar />

      {/* FULL-SCREEN HERO BANNER — matches About Us / Media / News / Contact Us banner style */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image — no color overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/contact2.png"
            alt="Grievance Redressal Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle bottom darkening only, for text legibility — no color tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/10" />
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
            <span className="text-[#FCA038] font-bold">Grievance Redressal</span>
          </motion.div>

          {/* Clean text directly over the image — no box, no background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider uppercase text-white leading-none"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.5)" }}
            >
              GRIEVANCE REDRESSAL
            </h1>

            <div className="w-20 h-1.5 bg-[#FCA038] rounded-full my-6" />

            <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl font-normal">
              We value your trust and satisfaction. Submit your feedback or formal complaint directly to our Nodal Grievance Desk.
            </p>
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

        {/* Curved Bottom Wave Separator — matches About Us / Media / News / Contact Us banner */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#FAF9F6] [clip-path:ellipse(65%_100%_at_50%_100%)] z-10" />
      </section>

      {/* SECTION 2: COMPLAINTS & GRIEVANCE REDRESSAL STATEMENT */}
      <section className="relative w-full py-12 bg-[#147FC3] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/20 shadow-xl text-left">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-[#FCA038]" />
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">
                Complaints and Grievance Redressal
              </h2>
            </div>
            <p className="text-white/90 text-sm md:text-base leading-relaxed text-justify">
              MaxValue Credits and Investment Limited is committed to providing the best possible services to its customers. Customers may contact us for information about our products and services or to register any complaints or grievances. If you are not satisfied with our services or products, you can submit your complaint using the form below.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: GRIEVANCE CONTENT & FORM */}
      <section className="relative w-full py-16 md:py-24 bg-transparent">
        {/* Subtle background grid */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,127,195,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,127,195,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* COLUMN 1: GRIEVANCE CONTACT INFORMATION */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col gap-8 text-left"
            >
              <div>

                <h2 className="text-2xl md:text-3xl font-black text-[#147FC3] tracking-tight uppercase">
                  Get In Touch
                </h2>
                <p className="text-zinc-600 text-sm mt-2 leading-relaxed">
                  Our grievance officer will promptly review your submitted complaint and resolve issues within standard regulatory turnaround times.
                </p>
              </div>

              {/* Information Cards */}
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
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FCA038]/10 text-[#FCA038] flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Grievance Email Address
                    </h3>
                    <a
                      href="mailto:grievances@maxvaluecredits.com"
                      className="text-base font-extrabold text-[#147FC3] hover:underline transition-all block break-all"
                    >
                      grievances@maxvaluecredits.com
                    </a>
                    <p className="text-xs text-zinc-500 mt-1 font-medium">
                      Dedicated portal for registered complaints
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
                      Registered Corporate Address
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

                {/* Fair Practice Assurance Box */}
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#FCA038] shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <strong className="font-bold block mb-1">Fair Practices & Escalation Policy</strong>
                    All complaints submitted are logged into our official tracking mechanism. If unresolved within 14 business days, your case is escalated to our Nodal Grievance Redressal Officer.
                  </div>
                </div>

              </div>
            </motion.div>

            {/* COLUMN 2: GRIEVANCE FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-zinc-200/90 p-8 md:p-10 relative overflow-hidden">

                {/* Decorative Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FCA038] via-[#147FC3] to-[#FCA038]" />

                <div className="mb-8 text-left">

                  <h3 className="text-2xl font-black text-zinc-900 tracking-tight">
                    Submit Your Grievance
                  </h3>
                  <p className="text-zinc-500 text-xs md:text-sm mt-1">
                    Please provide full context of your complaint. Submitting will compile and transmit your grievance directly to our WhatsApp Redressal line .
                  </p>
                </div>

                {showSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center flex flex-col items-center gap-4 my-6">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-emerald-900">
                        Grievance Compiled Successfully!
                      </h4>
                      <p className="text-xs text-emerald-700 mt-1 max-w-md">
                        Your complaint report is ready. If WhatsApp did not open automatically, please click the button below to send your details to 8891133443.
                      </p>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Send Grievance via WhatsApp (8891133443)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => {
                        setShowSuccess(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          state: "Kerala",
                          city: "Thrissur",
                          customCity: "",
                          message: "",
                          authorized: true
                        });
                      }}
                      className="text-xs font-bold text-zinc-500 hover:text-zinc-800 underline mt-2 cursor-pointer"
                    >
                      Submit Another Grievance
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left" noValidate>

                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Name * */}
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
                            placeholder="Your full name"
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

                      {/* Email * */}
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

                    {/* Row 2: Phone Number & Select State */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Phone Number */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Contact number"
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

                      {/* Select State */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                          Select State
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                          <select
                            name="state"
                            value={formData.state}
                            onChange={(e) => {
                              handleChange(e);
                              const cities = cityOptionsByState[e.target.value] || ["Other City"];
                              setFormData(prev => ({ ...prev, state: e.target.value, city: cities[0] }));
                            }}
                            className="w-full pl-10 pr-8 py-3 rounded-lg border border-zinc-300 text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20 appearance-none font-medium cursor-pointer"
                          >
                            {stateOptions.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                          <div className="absolute right-3.5 top-4 pointer-events-none text-zinc-400 text-xs">
                            ▼
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Row 3: Select City */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                        Select City
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <Building className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full pl-10 pr-8 py-3 rounded-lg border border-zinc-300 text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20 appearance-none font-medium cursor-pointer"
                          >
                            {(cityOptionsByState[formData.state] || ["Other City"]).map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                          <div className="absolute right-3.5 top-4 pointer-events-none text-zinc-400 text-xs">
                            ▼
                          </div>
                        </div>

                        {formData.city === "Other City" && (
                          <input
                            type="text"
                            name="customCity"
                            value={formData.customCity}
                            onChange={handleChange}
                            placeholder="Enter your city name"
                            className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                          />
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center justify-between">
                        <span>Message <span className="text-rose-500">*</span></span>
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe your complaint or grievance in detail..."
                        className={`w-full p-4 rounded-lg border text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white ${errors.message
                            ? "border-rose-400 ring-2 ring-rose-100"
                            : "border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                          }`}
                      />
                      {errors.message && (
                        <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Authorization Statement Box */}
                    <div className={`p-4 rounded-xl border transition-all ${errors.authorized ? "bg-rose-50 border-rose-300" : "bg-zinc-50 border-zinc-200"
                      }`}>
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          name="authorized"
                          checked={formData.authorized}
                          onChange={handleChange}
                          className="mt-1 w-4 h-4 text-[#147FC3] rounded border-zinc-300 focus:ring-[#147FC3] cursor-pointer"
                        />
                        <span className="text-xs text-zinc-600 leading-relaxed">
                          By choosing the options, I authorize MaxValue Credits and Investment Limited (including its Agents/Representatives) to communicate with me regarding their product offerings, promotions, and services through Telephone, Mobile, SMS, WhatsApp, and Email.
                        </span>
                      </label>
                      {errors.authorized && (
                        <span className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-2">
                          <AlertCircle className="w-3 h-3" /> {errors.authorized}
                        </span>
                      )}
                    </div>

                    {/* Send Message Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#147FC3] hover:bg-[#0f68a3] active:bg-[#FCA038] text-white font-extrabold text-sm py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider group active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Grievance via WhatsApp...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
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

      {/* Corporate Footer */}
      <Footer />

    </div>
  );
}