// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Building2,
//   Phone,
//   PhoneCall,
//   Tv,
//   X,
//   MapPin,
//   ChevronRight,
//   Send,
//   CheckCircle2,
//   QrCode,
//   Play
// } from "lucide-react";

// // Official WhatsApp SVG Component
// const WhatsAppIconSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.67-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.884 0-3.69-.507-5.263-1.468l-.377-.229-3.914 1.026 1.044-3.815-.248-.394A9.74 9.74 0 0 1 2.25 12c0-5.378 4.372-9.75 9.8-9.75 2.615 0 5.074 1.019 6.924 2.871A9.704 9.704 0 0 1 21.8 12c0 5.378-4.372 9.75-9.749 9.75m0-21.25C5.405.59 0 5.995 0 12.637c0 2.12.553 4.188 1.603 6.007L0 25.263l6.797-1.782a11.966 11.966 0 0 0 5.253 1.219c6.643 0 12.048-5.405 12.048-12.063C24.098 5.995 18.693.59 12.051.59z" />
//   </svg>
// );

// export default function FloatingWidgets() {
//   const [activePanel, setActivePanel] = useState<"branch" | "call" | "media" | null>(null);
//   const [callbackSubmitted, setCallbackSubmitted] = useState(false);
//   const [phoneInput, setPhoneInput] = useState("");
//   const [nameInput, setNameInput] = useState("");

//   const handleCallbackSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!phoneInput) return;
//     setCallbackSubmitted(true);
//     setTimeout(() => {
//       setCallbackSubmitted(false);
//       setPhoneInput("");
//       setNameInput("");
//       setActivePanel(null);
//     }, 3000);
//   };

//   const togglePanel = (panel: "branch" | "call" | "media") => {
//     setActivePanel(activePanel === panel ? null : panel);
//   };

//   return (
//     <>
//       {/* ------------------------------------------------------------- */}
//       {/* BOTTOM-LEFT: WHATSAPP FLOATING BUTTON (Number: 9207798759) */}
//       {/* ------------------------------------------------------------- */}
//       <div className="fixed bottom-6 left-6 z-50 flex items-center group">
//         <a
//           href="https://wa.me/919207798759?text=Hello%20MaxValue%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
//           target="_blank"
//           rel="noopener noreferrer"
//           className="relative flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
//           aria-label="Chat on WhatsApp with 9207798759"
//         >
//           {/* Pulsing online badge ring */}
//           <span className="absolute -top-1 -right-1 flex h-4 w-4">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white"></span>
//           </span>

//           <WhatsAppIconSVG className="w-7 h-7" />

//           {/* Persistent / Hover badge tag displaying the number */}
//           <div className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-300 ease-in-out whitespace-nowrap">
//             <div className="pr-2 flex flex-col text-left">
//               <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider leading-none">
//                 WhatsApp Us
//               </span>
//               <span className="text-xs font-extrabold tracking-wide text-white leading-tight">
//                 9207798759
//               </span>
//             </div>
//           </div>
//         </a>

//         {/* Tooltip for desktop accessibility */}
//         <div className="absolute left-16 bottom-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 bg-zinc-900 text-white text-xs px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap flex items-center gap-2">
//           <span>WhatsApp: <strong>9207798759</strong></span>
//         </div>
//       </div>


//       {/* ------------------------------------------------------------- */}
//       {/* RIGHT SIDE FIXED DOCK: BRANCH, GET A CALL, MEDIA */}
//       {/* ------------------------------------------------------------- */}
//       <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3 select-none">
        
//         {/* =========================================================== */}
//         {/* 1. BRANCH BUTTON (Tab on Right Edge) */}
//         {/* =========================================================== */}
//         <div className="relative flex items-center">
//           <button
//             onClick={() => togglePanel("branch")}
//             className={`flex items-center gap-2.5 bg-gradient-to-l from-[#FCA038] to-[#F58220] hover:from-[#f3952a] hover:to-[#e57615] text-white px-3.5 py-3 rounded-l-2xl shadow-xl transition-all duration-300 transform hover:-translate-x-1 cursor-pointer ${
//               activePanel === "branch" ? "translate-x-0 shadow-2xl ring-2 ring-orange-300" : ""
//             }`}
//             title="Branch Network"
//           >
//             <div className="p-1 bg-white/20 rounded-lg">
//               <Building2 className="w-5 h-5 text-white" />
//             </div>
//             <span className="font-extrabold text-xs tracking-wide uppercase hidden sm:inline-block">
//               Branches
//             </span>
//           </button>

//           {/* Branch Expandable Popover Card */}
//           <AnimatePresence>
//             {activePanel === "branch" && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20, scale: 0.95 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 exit={{ opacity: 0, x: 20, scale: 0.95 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute right-16 top-0 w-80 bg-white rounded-2xl shadow-2xl border border-amber-100 p-5 text-zinc-800 z-50"
//               >
//                 <div className="flex justify-between items-center pb-3 border-b border-zinc-100 mb-4">
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-5 h-5 text-[#FCA038]" />
//                     <h3 className="font-extrabold text-sm text-zinc-900 uppercase tracking-wide">
//                       Branch Network
//                     </h3>
//                   </div>
//                   <button
//                     onClick={() => setActivePanel(null)}
//                     className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>

//                 <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
//                   Locate any of our <strong>100+ branches</strong> across Kerala and Karnataka for gold loans, business loans & financial support.
//                 </p>

//                 {/* QR Code section matching screenshot design */}
//                 <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 flex items-center gap-3 mb-4">
//                   <div className="w-16 h-16 bg-white p-1.5 rounded-lg shadow-sm border border-amber-200 shrink-0 flex items-center justify-center">
//                     <QrCode className="w-12 h-12 text-[#147FC3]" />
//                   </div>
//                   <div className="text-left">
//                     <span className="text-[10px] font-bold uppercase text-[#FCA038] tracking-wider block">
//                       Scan QR Code
//                     </span>
//                     <span className="text-xs font-bold text-zinc-800 leading-snug block">
//                       Find Nearby MaxValue Branches instantly on mobile
//                     </span>
//                   </div>
//                 </div>

//                 <Link
//                   href="/branch-network"
//                   onClick={() => setActivePanel(null)}
//                   className="w-full flex items-center justify-center gap-2 bg-[#147FC3] hover:bg-[#0f67a0] text-white py-2.5 px-4 rounded-xl font-extrabold text-xs tracking-wider transition-colors shadow-md group"
//                 >
//                   <span>EXPLORE BRANCH NETWORK</span>
//                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>


//         {/* =========================================================== */}
//         {/* 2. GET A CALL BUTTON – 1800 425 22799 */}
//         {/* =========================================================== */}
//         <div className="relative flex items-center">
//           <button
//             onClick={() => togglePanel("call")}
//             className={`relative group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#FCA038] to-[#F58220] hover:from-[#f3952a] hover:to-[#e57615] text-white rounded-l-2xl shadow-xl transition-all duration-300 transform hover:-translate-x-1 cursor-pointer mr-0 ${
//               activePanel === "call" ? "ring-2 ring-orange-300" : ""
//             }`}
//             title="Get a Call - 1800 425 22799"
//           >
//             {/* Handset Icon */}
//             <PhoneCall className="w-5 h-5 text-white animate-pulse" />

//             {/* Hover Tooltip showing Toll Free Number */}
//             <div className="absolute right-14 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 bg-zinc-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap flex items-center gap-2">
//               <span className="text-[#FCA038] font-bold">Toll Free:</span>
//               <span className="font-extrabold">1800 425 22799</span>
//             </div>
//           </button>

//           {/* Get a Call Popover Card */}
//           <AnimatePresence>
//             {activePanel === "call" && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20, scale: 0.95 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 exit={{ opacity: 0, x: 20, scale: 0.95 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute right-16 top-0 w-80 bg-white rounded-2xl shadow-2xl border border-amber-100 p-5 text-zinc-800 z-50"
//               >
//                 <div className="flex justify-between items-center pb-3 border-b border-zinc-100 mb-4">
//                   <div className="flex items-center gap-2">
//                     <Phone className="w-5 h-5 text-[#FCA038]" />
//                     <h3 className="font-extrabold text-sm text-zinc-900 uppercase tracking-wide">
//                       Get a Call
//                     </h3>
//                   </div>
//                   <button
//                     onClick={() => setActivePanel(null)}
//                     className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Toll Free Direct Call Link Box */}
//                 <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 mb-4 text-center">
//                   <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider block mb-1">
//                     Toll Free Customer Care
//                   </span>
//                   <a
//                     href="tel:180042522799"
//                     className="text-lg font-black text-[#147FC3] hover:text-[#0f67a0] tracking-wide inline-flex items-center gap-1.5 transition-colors"
//                   >
//                     <PhoneCall className="w-4 h-4 text-[#FCA038]" />
//                     1800 425 22799
//                   </a>
//                   <span className="text-[10px] text-zinc-500 block mt-1">
//                     Mon - Sat: 9:30 AM - 5:30 PM
//                   </span>
//                 </div>

//                 {/* Request Callback Form */}
//                 {callbackSubmitted ? (
//                   <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center flex flex-col items-center gap-2">
//                     <CheckCircle2 className="w-8 h-8 text-emerald-600" />
//                     <span className="text-xs font-bold">Callback Requested!</span>
//                     <span className="text-[11px] text-emerald-700">
//                       Our customer service representative will call you shortly.
//                     </span>
//                   </div>
//                 ) : (
//                   <form onSubmit={handleCallbackSubmit} className="flex flex-col gap-2.5">
//                     <span className="text-xs font-bold text-zinc-700">
//                       Or request a call back:
//                     </span>
//                     <input
//                       type="text"
//                       placeholder="Your Name"
//                       value={nameInput}
//                       onChange={(e) => setNameInput(e.target.value)}
//                       required
//                       className="w-full text-xs px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA038]"
//                     />
//                     <input
//                       type="tel"
//                       placeholder="Phone Number"
//                       value={phoneInput}
//                       onChange={(e) => setPhoneInput(e.target.value)}
//                       required
//                       className="w-full text-xs px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA038]"
//                     />
//                     <button
//                       type="submit"
//                       className="w-full flex items-center justify-center gap-2 bg-[#FCA038] hover:bg-[#e58e2b] text-white py-2.5 rounded-xl font-bold text-xs tracking-wider transition-colors shadow-md cursor-pointer"
//                     >
//                       <Send className="w-3.5 h-3.5" />
//                       <span>REQUEST CALLBACK</span>
//                     </button>
//                   </form>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>


//         {/* =========================================================== */}
//         {/* 3. MEDIA BUTTON */}
//         {/* =========================================================== */}
//         <div className="relative flex items-center">
//           <button
//             onClick={() => togglePanel("media")}
//             className={`relative group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#FCA038] to-[#F58220] hover:from-[#f3952a] hover:to-[#e57615] text-white rounded-l-2xl shadow-xl transition-all duration-300 transform hover:-translate-x-1 cursor-pointer ${
//               activePanel === "media" ? "ring-2 ring-orange-300" : ""
//             }`}
//             title="Media & News"
//           >
//             {/* TV / Video Icon matching standard media button */}
//             <Tv className="w-5 h-5 text-white" />

//             {/* Hover Tooltip */}
//             <div className="absolute right-14 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 bg-zinc-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
//               <span>Media & Gallery</span>
//             </div>
//           </button>

//           {/* Media Popover Card */}
//           <AnimatePresence>
//             {activePanel === "media" && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20, scale: 0.95 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 exit={{ opacity: 0, x: 20, scale: 0.95 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute right-16 top-0 w-80 bg-white rounded-2xl shadow-2xl border border-amber-100 p-5 text-zinc-800 z-50"
//               >
//                 <div className="flex justify-between items-center pb-3 border-b border-zinc-100 mb-4">
//                   <div className="flex items-center gap-2">
//                     <Tv className="w-5 h-5 text-[#FCA038]" />
//                     <h3 className="font-extrabold text-sm text-zinc-900 uppercase tracking-wide">
//                       Media Center
//                     </h3>
//                   </div>
//                   <button
//                     onClick={() => setActivePanel(null)}
//                     className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Media highlight card */}
//                 <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-3.5 rounded-xl mb-4 relative overflow-hidden group">
//                   <div className="absolute right-2 top-2 opacity-20">
//                     <Play className="w-12 h-12 text-white" />
//                   </div>
//                   <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1">
//                     Featured Video  
//                   </span>
//                   <p className="text-xs font-bold leading-snug mb-2">
//                     7th Anniversary - Director Message & Highlights
//                   </p>
//                   <Link
//                     href="/media"
//                     onClick={() => setActivePanel(null)}
//                     className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-300 hover:text-white transition-colors"
//                   >
//                     <span>Watch Video</span>
//                     <ChevronRight className="w-3.5 h-3.5" />
//                   </Link>
//                 </div>

//                 <Link
//                   href="/media"
//                   onClick={() => setActivePanel(null)}
//                   className="w-full flex items-center justify-center gap-2 bg-[#FCA038] hover:bg-[#e58e2b] text-white py-2.5 px-4 rounded-xl font-extrabold text-xs tracking-wider transition-colors shadow-md group"
//                 >
//                   <span>VIEW ALL MEDIA & PRESS</span>
//                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//       </div>
//     </>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Phone,
  PhoneCall,
  Tv,
  X,
  MapPin,
  ChevronRight,
  Send,
  CheckCircle2,
  QrCode,
  Play
} from "lucide-react";

// Official WhatsApp SVG Component
const WhatsAppIconSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.67-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.884 0-3.69-.507-5.263-1.468l-.377-.229-3.914 1.026 1.044-3.815-.248-.394A9.74 9.74 0 0 1 2.25 12c0-5.378 4.372-9.75 9.8-9.75 2.615 0 5.074 1.019 6.924 2.871A9.704 9.704 0 0 1 21.8 12c0 5.378-4.372 9.75-9.749 9.75m0-21.25C5.405.59 0 5.995 0 12.637c0 2.12.553 4.188 1.603 6.007L0 25.263l6.797-1.782a11.966 11.966 0 0 0 5.253 1.219c6.643 0 12.048-5.405 12.048-12.063C24.098 5.995 18.693.59 12.051.59z" />
  </svg>
);

export default function FloatingWidgets() {
  const [activePanel, setActivePanel] = useState<"branch" | "call" | "media" | null>(null);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [nameInput, setNameInput] = useState("");

 const handleCallbackSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!phoneInput) return;

  const message = `Hello MaxValue Team, I would like to request a callback.\nName: ${nameInput}\nPhone: ${phoneInput}`;
  const whatsappUrl = `https://wa.me/918891133443?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  setCallbackSubmitted(true);
  setTimeout(() => {
    setCallbackSubmitted(false);
    setPhoneInput("");
    setNameInput("");
    setActivePanel(null);
  }, 3000);
};

  const togglePanel = (panel: "branch" | "call" | "media") => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* BOTTOM-LEFT: WHATSAPP FLOATING BUTTON (Number: 9207798759) */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center group">
        <a
          href="https://wa.me/8891133443?text=Hello%20MaxValue%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
          aria-label="Chat on WhatsApp with 8891133443"
        >
          {/* Pulsing online badge ring */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white"></span>
          </span>

          <WhatsAppIconSVG className="w-7 h-7" />

          {/* Persistent / Hover badge tag displaying the number */}
          <div className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-300 ease-in-out whitespace-nowrap">
            <div className="pr-2 flex flex-col text-left">
              <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider leading-none">
                WhatsApp Us
              </span>
              
            </div>
          </div>
        </a>

       
      </div>


      {/* ------------------------------------------------------------- */}
      {/* RIGHT SIDE FIXED DOCK: BRANCH, GET A CALL, MEDIA */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3 select-none">

        {/* =========================================================== */}
        {/* 1. BRANCH BUTTON — icon-only, expands on hover */}
        {/* =========================================================== */}
        <div className="relative flex items-center">
          <button
            onClick={() => togglePanel("branch")}
            className={`group/branch flex items-center h-12 pl-3 pr-3 bg-gradient-to-l from-[#FCA038] to-[#F58220] hover:from-[#f3952a] hover:to-[#e57615] text-white rounded-l-2xl shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-x-1 cursor-pointer overflow-hidden ${
              activePanel === "branch" ? "translate-x-0 shadow-2xl ring-2 ring-orange-300" : ""
            }`}
            title="Branch Network"
          >
            <div className="p-1 bg-white/20 rounded-lg shrink-0">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out max-w-0 group-hover/branch:max-w-[100px] ${
                activePanel === "branch" ? "max-w-[100px]" : ""
              }`}
            >
              <span className="pl-2 font-extrabold text-xs tracking-wide uppercase">
                Branches
              </span>
            </span>
          </button>

          {/* Branch Expandable Popover Card */}
          <AnimatePresence>
            {activePanel === "branch" && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-16 top-0 w-80 bg-white rounded-2xl shadow-2xl border border-amber-100 p-5 text-zinc-800 z-50"
              >
                <div className="flex justify-between items-center pb-3 border-b border-zinc-100 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#FCA038]" />
                    <h3 className="font-extrabold text-sm text-zinc-900 uppercase tracking-wide">
                      Branch Network
                    </h3>
                  </div>
                  <button
                    onClick={() => setActivePanel(null)}
                    className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
                  Locate any of our <strong>100+ branches</strong> across Kerala and Karnataka for gold loans, business loans & financial support.
                </p>

                {/* QR Code section matching screenshot design */}
               
                <Link
                  href="/branch-network"
                  onClick={() => setActivePanel(null)}
                  className="w-full flex items-center justify-center gap-2 bg-[#147FC3] hover:bg-[#0f67a0] text-white py-2.5 px-4 rounded-xl font-extrabold text-xs tracking-wider transition-colors shadow-md group"
                >
                  <span>EXPLORE BRANCH NETWORK</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


       
        <div className="relative flex items-center">
          <button
            onClick={() => togglePanel("call")}
            className={`group/call flex items-center h-12 pl-3 pr-3 bg-gradient-to-br from-[#FCA038] to-[#F58220] hover:from-[#f3952a] hover:to-[#e57615] text-white rounded-l-2xl shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-x-1 cursor-pointer overflow-hidden ${
              activePanel === "call" ? "ring-2 ring-orange-300" : ""
            }`}
            title="Get a Call - 1800 425 22799"
          >
            <PhoneCall className="w-5 h-5 text-white animate-pulse shrink-0" />
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out max-w-0 group-hover/call:max-w-[100px] ${
                activePanel === "call" ? "max-w-[100px]" : ""
              }`}
            >
              <span className="pl-2 font-extrabold text-xs tracking-wide uppercase">
                Get a Call
              </span>
            </span>
          </button>

          {/* Get a Call Popover Card */}
          <AnimatePresence>
            {activePanel === "call" && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-16 top-0 w-80 bg-white rounded-2xl shadow-2xl border border-amber-100 p-5 text-zinc-800 z-50"
              >
                <div className="flex justify-between items-center pb-3 border-b border-zinc-100 mb-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#FCA038]" />
                    <h3 className="font-extrabold text-sm text-zinc-900 uppercase tracking-wide">
                      Get a Call
                    </h3>
                  </div>
                  <button
                    onClick={() => setActivePanel(null)}
                    className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Toll Free Direct Call Link Box */}
                <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 mb-4 text-center">
                  <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider block mb-1">
                    Toll Free Customer Care
                  </span>
                  <a
                    href="tel:180042522799"
                    className="text-lg font-black text-[#147FC3] hover:text-[#0f67a0] tracking-wide inline-flex items-center gap-1.5 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-[#FCA038]" />
                    1800 425 22799
                  </a>
                  <span className="text-[10px] text-zinc-500 block mt-1">
                    Mon - Sat: 9:30 AM - 5:30 PM
                  </span>
                </div>

                {/* Request Callback Form */}
                {callbackSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    <span className="text-xs font-bold">Callback Requested!</span>
                    <span className="text-[11px] text-emerald-700">
                      Our customer service representative will call you shortly.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="flex flex-col gap-2.5">
                    <span className="text-xs font-bold text-zinc-700">
                      Or request a call back:
                    </span>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA038]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA038]"
                    />
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#FCA038] hover:bg-[#e58e2b] text-white py-2.5 rounded-xl font-bold text-xs tracking-wider transition-colors shadow-md cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>REQUEST CALLBACK</span>
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>


        {/* =========================================================== */}
        {/* 3. MEDIA BUTTON — icon-only, expands on hover */}
        {/* =========================================================== */}
        <div className="relative flex items-center">
          <button
            onClick={() => togglePanel("media")}
            className={`group/media flex items-center h-12 pl-3 pr-3 bg-gradient-to-br from-[#FCA038] to-[#F58220] hover:from-[#f3952a] hover:to-[#e57615] text-white rounded-l-2xl shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-x-1 cursor-pointer overflow-hidden ${
              activePanel === "media" ? "ring-2 ring-orange-300" : ""
            }`}
            title="Media & News"
          >
            <Tv className="w-5 h-5 text-white shrink-0" />
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out max-w-0 group-hover/media:max-w-[90px] ${
                activePanel === "media" ? "max-w-[90px]" : ""
              }`}
            >
              <span className="pl-2 font-extrabold text-xs tracking-wide uppercase">
                Media
              </span>
            </span>
          </button>

          {/* Media Popover Card */}
          <AnimatePresence>
            {activePanel === "media" && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-16 top-0 w-80 bg-white rounded-2xl shadow-2xl border border-amber-100 p-5 text-zinc-800 z-50"
              >
                <div className="flex justify-between items-center pb-3 border-b border-zinc-100 mb-4">
                  <div className="flex items-center gap-2">
                    <Tv className="w-5 h-5 text-[#FCA038]" />
                    <h3 className="font-extrabold text-sm text-zinc-900 uppercase tracking-wide">
                      Media Center
                    </h3>
                  </div>
                  <button
                    onClick={() => setActivePanel(null)}
                    className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Media highlight card */}
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-3.5 rounded-xl mb-4 relative overflow-hidden group">
                  <div className="absolute right-2 top-2 opacity-20">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1">
                    Featured Video
                  </span>
                  <p className="text-xs font-bold leading-snug mb-2">
                    7th Anniversary - Director Message & Highlights
                  </p>
                  <Link
                    href="/media"
                    onClick={() => setActivePanel(null)}
                    className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-300 hover:text-white transition-colors"
                  >
                    <span>Watch Video</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <Link
                  href="/media"
                  onClick={() => setActivePanel(null)}
                  className="w-full flex items-center justify-center gap-2 bg-[#FCA038] hover:bg-[#e58e2b] text-white py-2.5 px-4 rounded-xl font-extrabold text-xs tracking-wider transition-colors shadow-md group"
                >
                  <span>VIEW ALL MEDIA & PRESS</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </>
  );
}