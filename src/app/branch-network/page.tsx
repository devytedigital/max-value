"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { stateDistrictMap, branchDatabase, Branch } from "@/data/branchData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MapPin,
  Phone,
  Smartphone,
  Mail,
  Clock,
  Search,
  Compass,
  CheckCircle2,
  Navigation,
  AlertCircle,
  Map,
  ChevronRight,
  ChevronDown
} from "lucide-react";

export default function BranchNetworkPage() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  // Dynamic API states
  const [allBranches, setAllBranches] = useState<Branch[]>([]);
  const [apiLoading, setApiLoading] = useState(true);

  useEffect(() => {
    const fetchBranchesFromApi = async () => {
      try {
        const response = await fetch("/api/branches");
        if (response.ok) {
          const data = await response.json();
          setAllBranches(data);
        } else {
          setAllBranches(branchDatabase); // fallback
        }
      } catch (err) {
        setAllBranches(branchDatabase); // fallback
      } finally {
        setApiLoading(false);
      }
    };
    fetchBranchesFromApi();
  }, []);

  // Rule: Do NOT display any branches before Search button is clicked
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Branch[]>([]);

  const states = Object.keys(stateDistrictMap);
  const availableDistricts = selectedState ? stateDistrictMap[selectedState] || [] : [];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedDistrict(""); // Reset district when state changes
    setHasSearched(false); // Reset search results
    setSearchResults([]);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setHasSearched(false);
    setSearchResults([]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState) return;

    // Use dynamic branches, fallback to static if not loaded yet
    const sourceDb = allBranches.length > 0 ? allBranches : branchDatabase;

    const filtered = sourceDb.filter((b) => {
      const matchState = b.state === selectedState;
      const matchDistrict = selectedDistrict === "" || b.district === selectedDistrict;
      return matchState && matchDistrict;
    });

    setSearchResults(filtered);
    setHasSearched(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans font-medium">

      {/* Navbar */}
      <Navbar />

      {/* FULL-SCREEN HERO BANNER — matches About Us / Board of Directors banner style */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image — no color overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/branch-locater.png"
            alt="Branch Network Background"
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
            <span className="text-[#FCA038] font-bold">Branch Network</span>
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
              BRANCH NETWORK
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

      {/* SEARCH CONTROLS SECTION */}
      <section className="relative w-full py-12 bg-transparent border-b border-zinc-200/80">
        <div className="max-w-4xl mx-auto px-6 md:px-8">

          <form onSubmit={handleSearch} className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-zinc-200/90 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              {/* Select State */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                  Select State <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Compass className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <select
                    value={selectedState}
                    onChange={handleStateChange}
                    className="w-full pl-10 pr-8 py-3.5 rounded-xl border border-zinc-300 text-sm transition-all outline-none bg-zinc-50/50 focus:bg-white focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20 appearance-none font-bold text-zinc-800 cursor-pointer"
                  >
                    <option value="">-- Choose State --</option>
                    {states.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-4 pointer-events-none text-zinc-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Select District */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                  Select District
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    disabled={!selectedState}
                    className={`w-full pl-10 pr-8 py-3.5 rounded-xl border text-sm transition-all outline-none appearance-none font-bold text-zinc-800 cursor-pointer ${!selectedState
                        ? "bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed"
                        : "bg-zinc-50/50 focus:bg-white border-zinc-300 focus:border-[#147FC3] focus:ring-2 focus:ring-[#147FC3]/20"
                      }`}
                  >
                    <option value="">
                      {!selectedState ? "Select a State First" : "-- All Districts --"}
                    </option>
                    {availableDistricts.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-4 pointer-events-none text-zinc-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={!selectedState}
              className={`w-full font-black text-sm py-4 px-6 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer active:scale-[0.99] ${!selectedState
                  ? "bg-zinc-300 text-zinc-500 cursor-not-allowed shadow-none"
                  : "bg-[#147FC3] hover:bg-[#0f68a3] active:bg-[#FCA038] text-white hover:shadow-lg"
                }`}
            >
              <Search className="w-4 h-4" />
              <span>Search Branch Network</span>
            </button>
          </form>

        </div>
      </section>

      {/* RESULTS DISPLAY SECTION */}
      <section className="relative w-full py-16 bg-transparent min-h-[400px]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {!hasSearched ? (
            /* BEFORE SEARCH: DISPLAY INSTRUCTION PROMPT */
            <div className="py-16 px-6 text-center max-w-md mx-auto flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-[#FCA038] border border-amber-200 flex items-center justify-center mb-4">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
                Search For Branches
              </h3>
              <p className="text-zinc-500 text-xs md:text-sm mt-2 leading-relaxed">
                Select your State and District from the dropdowns above and click <strong>Search Branch Network</strong> to view branch locations.
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            /* SEARCH CONDUCTED BUT NO MATCHES FOUND */
            <div className="py-16 text-center text-zinc-500 max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-zinc-800">No Branches Found</h3>
              <p className="text-xs text-zinc-500 mt-1">
                No matching branch locations found for {selectedDistrict ? `${selectedDistrict}, ` : ""}{selectedState}. Please try selecting a different district.
              </p>
            </div>
          ) : (
            /* SEARCH RESULTS GRID */
            <div>
              <div className="text-left mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
                <div>
                  <span className="text-xs font-black uppercase text-[#FCA038] tracking-widest block">
                    SEARCH RESULTS
                  </span>
                  <h2 className="text-2xl font-black text-zinc-900 uppercase tracking-tight mt-0.5">
                    Found {searchResults.length} Branch{searchResults.length > 1 ? "es" : ""} in {selectedState} {selectedDistrict ? `(${selectedDistrict})` : ""}
                  </h2>
                </div>

                <span className="text-xs font-bold text-zinc-400">
                  Showing official Max Value branch offices
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {searchResults.map((branch) => (
                  <motion.div
                    key={branch.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl border border-zinc-200/90 shadow-md hover:shadow-xl transition-all duration-300 p-5 md:p-6 flex flex-col h-full justify-between group relative overflow-hidden"
                  >
                    <div className="flex flex-col flex-1 justify-between gap-4">

                      {/* Main fields Grid (adapted from Jeremy insurance card) */}
                      <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-left flex-1">
                        
                        {/* Branch Name */}
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-zinc-400 tracking-wider block">
                            Branch Name
                          </span>
                          <span className="text-[13px] font-extrabold text-zinc-900 mt-1.5 leading-snug tracking-tight">
                            {branch.name}
                          </span>
                        </div>

                        {/* Region/District & State */}
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-zinc-400 tracking-wider block">
                            City / District
                          </span>
                          <span className="text-[13px] font-extrabold text-zinc-900 mt-1.5 leading-snug tracking-tight">
                            {branch.district}, {branch.state}
                          </span>
                        </div>

                        {/* Landmark */}
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-zinc-400 tracking-wider block">
                            Landmark
                          </span>
                          <span className="text-xs font-semibold text-zinc-700 mt-1.5 leading-snug">
                            {branch.landmark}
                          </span>
                        </div>

                        {/* PIN Code */}
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-zinc-400 tracking-wider block">
                            Pin Code
                          </span>
                          <span className="text-xs font-semibold text-zinc-700 mt-1.5 font-mono">
                            {branch.pinCode}
                          </span>
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-zinc-400 tracking-wider block">
                            Landline Phone
                          </span>
                          <a 
                            href={`tel:${branch.phone}`} 
                            className="text-xs font-extrabold text-[#147FC3] hover:text-[#147FC3]/80 hover:underline mt-1.5 transition-colors"
                          >
                            {branch.phone}
                          </a>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-bold text-zinc-400 tracking-wider block">
                            Email Address
                          </span>
                          <a 
                            href={`mailto:${branch.email}`} 
                            className="text-xs font-extrabold text-[#147FC3] hover:text-[#147FC3]/80 hover:underline mt-1.5 truncate block transition-colors"
                            title={branch.email}
                          >
                            {branch.email}
                          </a>
                        </div>

                      </div>

                      {/* Full-width address cell (adapted from Vehicle info) */}
                      <div className="border-t border-zinc-100 pt-4 text-left">
                        <span className="text-[10px] font-bold text-zinc-400 tracking-wider block">
                          Office Address
                        </span>
                        <p className="text-[11px] font-semibold text-zinc-500 mt-1.5 leading-relaxed">
                          {branch.address}
                        </p>
                        
                        {/* Underlined Blue View Google Map Link */}
                        {branch.location && (
                          <a
                            href={branch.location}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#147FC3] hover:underline font-extrabold text-xs inline-flex items-center gap-1.5 mt-3 transition-all duration-200 group/map"
                          >
                            <Compass className="w-3.5 h-3.5 group-hover/map:rotate-45 transition-transform duration-300" />
                            View Google Map
                          </a>
                        )}
                      </div>

                      {/* Bottom button: Call Branch using mobile number */}
                      <div className="pt-2">
                        <a
                          href={`tel:${branch.mobile}`}
                          className="w-full py-3.5 bg-zinc-900 hover:bg-[#147FC3] text-white rounded-2xl text-center text-xs font-extrabold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 cursor-pointer shadow-lg shadow-zinc-900/10 hover:shadow-[#147FC3]/20 hover:-translate-y-0.5"
                        >
                          <Phone className="w-4 h-4 text-white" />
                          Call Branch: {branch.mobile}
                        </a>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}
