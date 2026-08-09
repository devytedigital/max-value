// "use client";

// import { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronRight, Award, ShieldCheck, Users, Briefcase, Sparkles, Building2, Quote } from "lucide-react";

// interface Director {
//   id: string;
//   name: string;
//   role: string;
//   category: "Executive" | "Independent";
//   image: string;
//   bio: string;
//   highlights?: string[];
// }

// const directors: Director[] = [
//   {
//     id: "manoj",
//     name: "Mr. Manoj V B",
//     role: "Chairman & Managing Director",
//     category: "Executive",
//     image: "/directors/manoj.png",
//     bio: "Mr. Manoj V B is an MBA business man deeply involved in Maxvalue Credits & Investments Ltd. and has been instrumental in the success of the group. He is a real entrepreneur, Visionary and pioneer, and the Chairman and Managing Director of Maxvalue Credits and Investments Ltd. His other engagements include: 1. Managing Director of Universal Trading LLC, UAE; 2. Chairman and Managing Director of Dream City Properties LLC, UAE; 3. Managing Director of Dubai Properties; 4. Paramount Diamond & Research Institute of Advanced Studies and Research Inc, USA while has a Medical College in Nepal; 5. Managing Partner of Allied Agencies of Chemicals and United Pharmaceuticals, India. He started his career with the Orient Industrial Gas Corporation (OIGC) Air Products, Gujarat, output process Aqua processing plant. Later worked for Siemens International, a leading equipment solutions provider from the US, Air Products and Allied Forces, as well as TTI Corporation, an aluminum composite Manufacturing Company operating in Transportation, Defense and Industrial Business. Along with overall business leadership and recognition for his outstanding contributions to business field and writing in December 2012, he was conferred the Best Director award by the Sharjah Book Festival for his book \"Mannuthinirangugaly\" (Whisper of Earth). He has also received numerous other appreciations and recommendations, including the VIVA Excellence Award 17 from US Navy, on multiple occasions.",
//     highlights: ["Sharjah Book Festival Awardee", "US Navy VIVA Excellence Award", "Global Serial Entrepreneur"],
//   },
//   {
//     id: "christo",
//     name: "Christo George",
//     role: "Director",
//     category: "Executive",
//     image: "/directors/christo.png",
//     bio: "Christo George, Chairman & Managing Director of Hykon India Ltd. is an engineer in Electronics and Electrical. Immediately after his graduation, he started a Small Scale Industry – Hykon Electronic Systems. Christo George is also the Managing Director of Hykon India District Pvt. Ltd. (a company that specializes in organic farming and eco-friendly tea plantation). He is also a Founder and Director of Max Value Credits and Investment Ltd.",
//     highlights: ["CMD - Hykon India Ltd", "Electrical & Electronics Engineer", "Pioneer in Renewable & SSI"],
//   },
//   {
//     id: "nandhakumar",
//     name: "K. Nandhakumar",
//     role: "Director",
//     category: "Executive",
//     image: "/directors/nandhakumar.png",
//     bio: "K Nandhakumar, Director, is a journalist by profession and is popular for his write-ups/columns in various print media. He also has a diploma in journalism. He has a flair for writing and currently the executive editor of Real India Magazine. He is also associated with many social organizations. He started his career as a journalist in Hindu, working for Kerala for many years. He worked in the editorial team of Deepika weekly. Afterward, he became the editor of Indian Express (Indian Express Newspaper) (Malayalam Edition). He has published books and written standard journalism articles, including film and literature commentary.",
//     highlights: ["Executive Editor - Real India", "Veteran Journalist (The Hindu, Indian Express)", "Published Author & Media Specialist"],
//   },
//   {
//     id: "roy",
//     name: "Mr. Roy Johnson",
//     role: "Director",
//     category: "Executive",
//     image: "/directors/roy.png",
//     bio: "Mr. Roy Johnson, Director of Maxvalue Credits and Investments, is engaged in the business of manufacturing, import and exports. His business spans across the country and abroad. For the last 20 years, he has held the position as the CMD / Chairman and Managing Director of Total Cards and Transforms Electronics. He focuses on both manufacturing and trading of cards and electronics. He is a powerful entrepreneur who expanded his business empire when standard options failed. He has rich experience in manufacturing and exports and is a prominent persona in business & commerce.",
//     highlights: ["CMD - Total Cards Electronics", "20+ Yrs International Trade", "Manufacturing & Import/Export Veteran"],
//   },
//   {
//     id: "gopinathan",
//     name: "Dr. V.K. Gopinathan",
//     role: "Director",
//     category: "Executive",
//     image: "/directors/gopinathan.png",
//     bio: "Dr. V.K. Gopinathan is the Director of Max Value Credits and Investments, and is the Founder Chairman and General Superintendent of Metropolitan Hospital, Thrissur, Kerala. He served as the Former Chairman of Indian Red Cross Association, Kerala State Branch. Dr. Gopinathan holds the position of Founder Director of Metro Laboratories Thrissur, the first human ovary bank/tissue bank in Trichur district. Furthermore, he is the proprietor of Metrix Cable TV Network, one of the leading digital TV and broadband internet providers in Thrissur. Master from University, he is a Chair Person of Carborand Service Technocrats.",
//     highlights: ["Founder - Metropolitan Hospital", "Former Chairman - Red Cross Kerala", "Proprietor - Metrix Cable TV"],
//   },
//   {
//     id: "parameswaran",
//     name: "Mr. P.N. Parameswaran",
//     role: "Independent Director",
//     category: "Independent",
//     image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&h=600&q=80",
//     bio: "Mr. P.N. Parameswaran retired from Canara Bank as Senior General Manager. He has extensive experience in Banking, Retail Banking, Rural Banking, General Credit, Agriculture Credit, Industrial Credit, Infrastructure Banking, Exports, Imports, and other foreign exchange businesses, etc.",
//     highlights: ["Retired Sr. General Manager - Canara Bank", "Banking & Forex Expert", "35+ Yrs Financial Leadership"],
//   },
//   {
//     id: "sarala",
//     name: "Mrs. Sarala Devi Muraleedharan",
//     role: "Independent Director",
//     category: "Independent",
//     image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=600&q=80",
//     bio: "Mrs. Sarala Devi Muraleedharan is a retired Deputy General Manager of Canara Bank and has over 35 years of experience in Banking and Finance. Her core experience covers General Banking, Retail Services, Micro-funding of Products, Loans and Advances to MSME Sector, Priority Banking products, etc.",
//     highlights: ["Retired DGM - Canara Bank", "35+ Yrs Banking & Finance", "MSME & Micro-funding Specialist"],
//   },
//   {
//     id: "prasanna",
//     name: "Mr. Prasannakumar S",
//     role: "Independent Director",
//     category: "Independent",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80",
//     bio: "Mr. Prasannakumar S has overall 35 years of diversified professional experience in various industries and managed top echelon, as well as Member of Board level, just below the Board Level in the Middle East. Key areas are Strategic Business planning and Control, Strategic Executive and Capital Control, Working capital management, Budgeting and Budgetary control, Business Evaluation, Merger and Acquisition operations and Marketing management. Also covers Risk Valuation and Bank Risk management, Capital Structuring, Financial Restructuring, Financial analysis, Internal Audit, Performance evaluation, Business process re-engineering. He has gained experience in industries such as Retail Trading (wholesale/ retail), General Distribution, Food and Hospitality, Real Estate development, Software/ IT Development, Manufacturing and Hotel project, Management Consultancy and Short terms. Visiting Faculty for GRE/GMAT, SAT/ACT, NMAT, SNAP, CAT/XAT training programs for PGDM level and Senior executive level.",
//     highlights: ["35+ Yrs Middle East & Global C-Suite", "Strategic M&A & Corporate Restructuring", "Visiting Executive Faculty"],
//   },
// ];

// export default function BoardOfDirectorsPage() {
//   const [activeTab, setActiveTab] = useState<"All" | "Executive" | "Independent">("All");

//   const filteredDirectors = directors.filter((director) => {
//     if (activeTab === "All") return true;
//     return director.category === activeTab;
//   });

//   const cmd = directors[0];

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#147FC3] selection:text-white">
//       {/* 3-Tier Navbar */}
//       <Navbar />

//       {/* Prominent High-Impact Hero Banner */}
//       <section className="relative w-full min-h-[70vh] lg:min-h-[75vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
//         {/* Background Boardroom Image with Rich Blue & Yellow Glow Overlays */}
//         <div className="absolute inset-0 z-0">
//           <img
//             src="/board-hero-bg.png"
//             alt="Board of Directors Banner"
//             className="w-full h-full object-cover object-center opacity-40 scale-105 transform filter contrast-125"
//           />
//           {/* Deep Navy/Royal Blue Gradient Fog */}
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-[#0a274c]/85 to-slate-950/90" />
//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#147FC3]/30 via-transparent to-transparent" />
//           {/* Soft Amber Accent Fog */}
//           <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[#FCA038]/10 blur-[120px] rounded-full pointer-events-none" />
//         </div>

//         {/* Decorative Grid Lines */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none" />

//         {/* Hero Content */}
//         <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 text-center flex flex-col items-center">
          
//           {/* Breadcrumb Pill */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-amber-300 mb-6 shadow-sm"
//           >
//             <span className="text-slate-300">Home</span>
//             <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
//             <span className="text-slate-300">About Us</span>
//             <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
//             <span className="text-[#FCA038] font-bold">Board of Directors</span>
//           </motion.div>

//           {/* Styled Logo Color Title Box */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//             className="relative inline-block mb-6"
//           >
//             <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#147FC3] via-[#FCA038] to-[#147FC3] opacity-60 blur-md animate-pulse" />
//             <div className="relative bg-slate-900/90 border-2 border-white/30 backdrop-blur-xl rounded-xl px-8 sm:px-14 py-6 sm:py-8 shadow-2xl">
//               <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-wider uppercase text-white leading-none">
//                 BOARD OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCA038] to-amber-300">DIRECTORS</span>
//               </h1>
//             </div>
//           </motion.div>

          


//         </div>

//         {/* Curved Bottom Wave Separator */}
//         <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-50 [clip-path:ellipse(65%_100%_at_50%_100%)] z-10" />
//       </section>

//       {/* Main Content Area */}
//       <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">

      

//         {/* Section 2: Interactive Filter Header */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-[#147FC3] tracking-tight">
//               Meet The Leadership Team
//             </h2>
//             <p className="text-slate-600 text-sm font-medium mt-1">
//               Explore profiles of our Executive and Independent Board Directors.
//             </p>
//           </div>

         
//         </div>

//         {/* Section 3: Directors Grid Stack */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -15 }}
//             transition={{ duration: 0.4 }}
//             className="space-y-6 sm:space-y-8"
//           >
//             {filteredDirectors.map((director, index) => {
//               const isEven = index % 2 === 0;

//               return (
//                 <motion.div
//                   key={director.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-40px" }}
//                   transition={{ duration: 0.4, delay: index * 0.05 }}
//                   className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group hover:border-[#147FC3]/40"
//                 >
//                   <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-8">
                    
//                     {/* Left Avatar Container */}
//                     <div className="shrink-0 flex flex-col items-center justify-center">
//                       <div className="relative">
//                         {/* Ring Glow Accent */}
//                         <div
//                           className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr transition-opacity duration-500 opacity-60 group-hover:opacity-100 blur-xs ${
//                             director.category === "Executive"
//                               ? "from-[#147FC3] via-sky-400 to-[#FCA038]"
//                               : "from-[#FCA038] via-amber-400 to-[#147FC3]"
//                           }`}
//                         />
//                         <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white bg-slate-100 shadow-md">
//                           <img
//                             src={director.image}
//                             alt={director.name}
//                             className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
//                             loading="lazy"
//                           />
//                         </div>
//                       </div>

//                       {/* Category Badge Pill */}
//                       <span
//                         className={`mt-4 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-2xs border ${
//                           director.category === "Executive"
//                             ? "bg-[#147FC3]/10 text-[#147FC3] border-[#147FC3]/30"
//                             : "bg-[#FCA038]/15 text-amber-800 border-[#FCA038]/40"
//                         }`}
//                       >
//                         {director.role}
//                       </span>
//                     </div>

//                     {/* Right Info & Detailed Bio Container */}
//                     <div className="flex-1 bg-slate-50 group-hover:bg-[#f4f7fc] transition-colors duration-300 rounded-xl p-5 sm:p-6 border border-slate-200/80 flex flex-col justify-between">
//                       <div>
//                         {/* Header Row */}
//                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200">
//                           <div>
//                             <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#147FC3] transition-colors duration-300">
//                               {director.name}
//                             </h3>
//                             <p className="text-xs font-semibold text-slate-500 mt-0.5">
//                               {director.category} Board Member
//                             </p>
//                           </div>

//                           <div className="flex items-center gap-1.5 self-start sm:self-auto">
//                             <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FCA038]" />
//                             <span className="text-xs font-semibold text-slate-600">MaxValue Credits</span>
//                           </div>
//                         </div>

//                         {/* Full Detailed Paragraph Bio */}
//                         <p className="text-slate-700 text-xs sm:text-sm md:text-[15px] leading-relaxed text-justify font-normal">
//                           {director.bio}
//                         </p>
//                       </div>

//                       {/* Optional Highlight Tags */}
//                       {director.highlights && (
//                         <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap gap-2">
//                           {director.highlights.map((h, i) => (
//                             <span
//                               key={i}
//                               className="text-[11px] font-medium bg-white text-slate-700 border border-slate-300/80 px-2.5 py-1 rounded-md shadow-2xs flex items-center gap-1"
//                             >
//                               <span className="w-1.5 h-1.5 rounded-full bg-[#147FC3]" />
//                               {h}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                     </div>

//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </AnimatePresence>

//         {/* Section 4: Governance & Integrity Banner */}
//         <section className="mt-20 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0a274c] to-slate-900 p-8 sm:p-12 text-white relative overflow-hidden border border-white/10 shadow-xl">
//           <div className="absolute top-0 right-0 w-80 h-80 bg-[#147FC3]/20 blur-[90px] rounded-full pointer-events-none" />
//           <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FCA038]/15 blur-[90px] rounded-full pointer-events-none" />

//           <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#FCA038]">
//               <Building2 className="w-3.5 h-3.5 text-[#FCA038]" /> Institutional Integrity & Governance
//             </div>
//             <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
//               Guided by Transparency, Driven by Value
//             </h3>
//             <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
//               Our Board of Directors enforces stringent oversight, compliance with Reserve Bank of India standards, and ethical leadership to safeguard stakeholder value.
//             </p>
//           </div>
//         </section>

//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Award, ShieldCheck, Users, Briefcase, Sparkles, Building2, Quote } from "lucide-react";

interface Director {
  id: string;
  name: string;
  role: string;
  category: "Executive" | "Independent";
  image: string;
  bio: string;
  highlights?: string[];
}

const directors: Director[] = [
  {
    id: "manoj",
    name: "Mr. Manoj V B",
    role: "Chairman & Managing Director",
    category: "Executive",
    image: "/directors/manoj.png",
    bio: "Mr. Manoj V B is an MBA business man deeply involved in Maxvalue Credits & Investments Ltd. and has been instrumental in the success of the group. He is a real entrepreneur, Visionary and pioneer, and the Chairman and Managing Director of Maxvalue Credits and Investments Ltd. His other engagements include: 1. Managing Director of Universal Trading LLC, UAE; 2. Chairman and Managing Director of Dream City Properties LLC, UAE; 3. Managing Director of Dubai Properties; 4. Paramount Diamond & Research Institute of Advanced Studies and Research Inc, USA while has a Medical College in Nepal; 5. Managing Partner of Allied Agencies of Chemicals and United Pharmaceuticals, India. He started his career with the Orient Industrial Gas Corporation (OIGC) Air Products, Gujarat, output process Aqua processing plant. Later worked for Siemens International, a leading equipment solutions provider from the US, Air Products and Allied Forces, as well as TTI Corporation, an aluminum composite Manufacturing Company operating in Transportation, Defense and Industrial Business. Along with overall business leadership and recognition for his outstanding contributions to business field and writing in December 2012, he was conferred the Best Director award by the Sharjah Book Festival for his book \"Mannuthinirangugaly\" (Whisper of Earth). He has also received numerous other appreciations and recommendations, including the VIVA Excellence Award 17 from US Navy, on multiple occasions.",
    highlights: ["Sharjah Book Festival Awardee", "US Navy VIVA Excellence Award", "Global Serial Entrepreneur"],
  },
  {
    id: "christo",
    name: "Christo George",
    role: "Director",
    category: "Executive",
    image: "/directors/christo.png",
    bio: "Christo George, Chairman & Managing Director of Hykon India Ltd. is an engineer in Electronics and Electrical. Immediately after his graduation, he started a Small Scale Industry – Hykon Electronic Systems. Christo George is also the Managing Director of Hykon India District Pvt. Ltd. (a company that specializes in organic farming and eco-friendly tea plantation). He is also a Founder and Director of Max Value Credits and Investment Ltd.",
    highlights: ["CMD - Hykon India Ltd", "Electrical & Electronics Engineer", "Pioneer in Renewable & SSI"],
  },
  {
    id: "nandhakumar",
    name: "K. Nandhakumar",
    role: "Director",
    category: "Executive",
    image: "/directors/nandhakumar.png",
    bio: "K Nandhakumar, Director, is a journalist by profession and is popular for his write-ups/columns in various print media. He also has a diploma in journalism. He has a flair for writing and currently the executive editor of Real India Magazine. He is also associated with many social organizations. He started his career as a journalist in Hindu, working for Kerala for many years. He worked in the editorial team of Deepika weekly. Afterward, he became the editor of Indian Express (Indian Express Newspaper) (Malayalam Edition). He has published books and written standard journalism articles, including film and literature commentary.",
    highlights: ["Executive Editor - Real India", "Veteran Journalist (The Hindu, Indian Express)", "Published Author & Media Specialist"],
  },
  {
    id: "roy",
    name: "Mr. Roy Johnson",
    role: "Director",
    category: "Executive",
    image: "/directors/roy.png",
    bio: "Mr. Roy Johnson, Director of Maxvalue Credits and Investments, is engaged in the business of manufacturing, import and exports. His business spans across the country and abroad. For the last 20 years, he has held the position as the CMD / Chairman and Managing Director of Total Cards and Transforms Electronics. He focuses on both manufacturing and trading of cards and electronics. He is a powerful entrepreneur who expanded his business empire when standard options failed. He has rich experience in manufacturing and exports and is a prominent persona in business & commerce.",
    highlights: ["CMD - Total Cards Electronics", "20+ Yrs International Trade", "Manufacturing & Import/Export Veteran"],
  },
  {
    id: "gopinathan",
    name: "Dr. V.K. Gopinathan",
    role: "Director",
    category: "Executive",
    image: "/directors/gopinathan.png",
    bio: "Dr. V.K. Gopinathan is the Director of Max Value Credits and Investments, and is the Founder Chairman and General Superintendent of Metropolitan Hospital, Thrissur, Kerala. He served as the Former Chairman of Indian Red Cross Association, Kerala State Branch. Dr. Gopinathan holds the position of Founder Director of Metro Laboratories Thrissur, the first human ovary bank/tissue bank in Trichur district. Furthermore, he is the proprietor of Metrix Cable TV Network, one of the leading digital TV and broadband internet providers in Thrissur. Master from University, he is a Chair Person of Carborand Service Technocrats.",
    highlights: ["Founder - Metropolitan Hospital", "Former Chairman - Red Cross Kerala", "Proprietor - Metrix Cable TV"],
  },
  {
    id: "parameswaran",
    name: "Mr. P.N. Parameswaran",
    role: "Independent Director",
    category: "Independent",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&h=600&q=80",
    bio: "Mr. P.N. Parameswaran retired from Canara Bank as Senior General Manager. He has extensive experience in Banking, Retail Banking, Rural Banking, General Credit, Agriculture Credit, Industrial Credit, Infrastructure Banking, Exports, Imports, and other foreign exchange businesses, etc.",
    highlights: ["Retired Sr. General Manager - Canara Bank", "Banking & Forex Expert", "35+ Yrs Financial Leadership"],
  },
  {
    id: "sarala",
    name: "Mrs. Sarala Devi Muraleedharan",
    role: "Independent Director",
    category: "Independent",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=600&q=80",
    bio: "Mrs. Sarala Devi Muraleedharan is a retired Deputy General Manager of Canara Bank and has over 35 years of experience in Banking and Finance. Her core experience covers General Banking, Retail Services, Micro-funding of Products, Loans and Advances to MSME Sector, Priority Banking products, etc.",
    highlights: ["Retired DGM - Canara Bank", "35+ Yrs Banking & Finance", "MSME & Micro-funding Specialist"],
  },
  {
    id: "prasanna",
    name: "Mr. Prasannakumar S",
    role: "Independent Director",
    category: "Independent",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80",
    bio: "Mr. Prasannakumar S has overall 35 years of diversified professional experience in various industries and managed top echelon, as well as Member of Board level, just below the Board Level in the Middle East. Key areas are Strategic Business planning and Control, Strategic Executive and Capital Control, Working capital management, Budgeting and Budgetary control, Business Evaluation, Merger and Acquisition operations and Marketing management. Also covers Risk Valuation and Bank Risk management, Capital Structuring, Financial Restructuring, Financial analysis, Internal Audit, Performance evaluation, Business process re-engineering. He has gained experience in industries such as Retail Trading (wholesale/ retail), General Distribution, Food and Hospitality, Real Estate development, Software/ IT Development, Manufacturing and Hotel project, Management Consultancy and Short terms. Visiting Faculty for GRE/GMAT, SAT/ACT, NMAT, SNAP, CAT/XAT training programs for PGDM level and Senior executive level.",
    highlights: ["35+ Yrs Middle East & Global C-Suite", "Strategic M&A & Corporate Restructuring", "Visiting Executive Faculty"],
  },
];

export default function BoardOfDirectorsPage() {
  const [activeTab, setActiveTab] = useState<"All" | "Executive" | "Independent">("All");

  const filteredDirectors = directors.filter((director) => {
    if (activeTab === "All") return true;
    return director.category === activeTab;
  });

  const cmd = directors[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#147FC3] selection:text-white">
      {/* 3-Tier Navbar */}
      <Navbar />

      {/* Full-Screen Hero Banner — image only, no color overlay */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image — no gradient/color overlay on top */}
        <div className="absolute inset-0 z-0">
          <img
            src="/board-hero-bg.png"
            alt="Board of Directors Banner"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle bottom darkening only, purely for text legibility — no blue tint */}
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
            <span className="text-slate-200">About Us</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-[#FCA038] font-bold">Board of Directors</span>
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
              BOARD OF DIRECTORS
            </h1>
          </motion.div>

        </div>

        {/* Curved Bottom Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-50 [clip-path:ellipse(65%_100%_at_50%_100%)] z-10" />
      </section>

      {/* Main Content Area */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">

        {/* Section 2: Interactive Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#147FC3] tracking-tight">
              Meet The Leadership Team
            </h2>
            <p className="text-slate-600 text-sm font-medium mt-1">
              Explore profiles of our Executive and Independent Board Directors.
            </p>
          </div>

        </div>

        {/* Section 3: Directors Grid Stack */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 sm:space-y-8"
          >
            {filteredDirectors.map((director, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={director.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group hover:border-[#147FC3]/40"
                >
                  <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-8">

                    {/* Left Avatar Container */}
                    <div className="shrink-0 flex flex-col items-center justify-center">
                      <div className="relative">
                        {/* Ring Glow Accent */}
                        <div
                          className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr transition-opacity duration-500 opacity-60 group-hover:opacity-100 blur-xs ${
                            director.category === "Executive"
                              ? "from-[#147FC3] via-sky-400 to-[#FCA038]"
                              : "from-[#FCA038] via-amber-400 to-[#147FC3]"
                          }`}
                        />
                        <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white bg-slate-100 shadow-md">
                          <img
                            src={director.image}
                            alt={director.name}
                            className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Category Badge Pill */}
                      <span
                        className={`mt-4 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-2xs border ${
                          director.category === "Executive"
                            ? "bg-[#147FC3]/10 text-[#147FC3] border-[#147FC3]/30"
                            : "bg-[#FCA038]/15 text-amber-800 border-[#FCA038]/40"
                        }`}
                      >
                        {director.role}
                      </span>
                    </div>

                    {/* Right Info & Detailed Bio Container */}
                    <div className="flex-1 bg-slate-50 group-hover:bg-[#f4f7fc] transition-colors duration-300 rounded-xl p-5 sm:p-6 border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#147FC3] transition-colors duration-300">
                              {director.name}
                            </h3>
                            <p className="text-xs font-semibold text-slate-500 mt-0.5">
                              {director.category} Board Member
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 self-start sm:self-auto">
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FCA038]" />
                            <span className="text-xs font-semibold text-slate-600">MaxValue Credits</span>
                          </div>
                        </div>

                        {/* Full Detailed Paragraph Bio */}
                        <p className="text-slate-700 text-xs sm:text-sm md:text-[15px] leading-relaxed text-justify font-normal">
                          {director.bio}
                        </p>
                      </div>

                      {/* Optional Highlight Tags */}
                      {director.highlights && (
                        <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap gap-2">
                          {director.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-medium bg-white text-slate-700 border border-slate-300/80 px-2.5 py-1 rounded-md shadow-2xs flex items-center gap-1"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#147FC3]" />
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Section 4: Governance & Integrity Banner */}
        <section className="mt-20 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0a274c] to-slate-900 p-8 sm:p-12 text-white relative overflow-hidden border border-white/10 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#147FC3]/20 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FCA038]/15 blur-[90px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#FCA038]">
              <Building2 className="w-3.5 h-3.5 text-[#FCA038]" /> Institutional Integrity & Governance
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Guided by Transparency, Driven by Value
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Our Board of Directors enforces stringent oversight, compliance with Reserve Bank of India standards, and ethical leadership to safeguard stakeholder value.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}