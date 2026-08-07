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
  AlertCircle
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
    <div className="relative min-h-screen bg-white text-zinc-900 overflow-x-hidden selection:bg-[#147FC3] selection:text-white font-sans">

      {/* Navbar */}
      <Navbar />

      {/* TOP HERO BANNER SECTION */}
      <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 bg-[#147FC3] text-white overflow-hidden">
        {/* Background glow & grid effects */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-[#FCA038]/20 blur-[120px]" />
          <div className="absolute -top-10 left-10 w-72 h-72 rounded-full bg-white/5 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FCA038] text-xs font-extrabold uppercase tracking-wider mb-6">
            <Building2 className="w-3.5 h-3.5" />
            <span>Branch Locator</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight max-w-4xl mb-4">
            Find A Branch <span className="text-[#FCA038]">Near You</span>
          </h1>

          <div className="w-20 h-1.5 bg-[#FCA038] rounded-full mb-6" />

          <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl">
            Locate your nearest Max Value branch office across South India. Select your State and District below and click Search to view full branch details and contact information.
          </p>
        </div>
      </section>

      {/* SEARCH CONTROLS SECTION */}
      <section className="relative w-full py-12 bg-zinc-50 border-b border-zinc-200/80">
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
      <section className="relative w-full py-16 bg-white min-h-[400px]">
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
                    className="bg-white rounded-2xl border border-zinc-200/90 shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 flex flex-col justify-between group hover:border-[#147FC3]/40 relative overflow-hidden"
                  >
                    {/* Top Accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#147FC3] to-[#FCA038]" />

                    <div>
                      {/* Branch Name */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#147FC3]/10 text-[#147FC3] flex items-center justify-center shrink-0">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase text-[#FCA038] tracking-wider block">
                            BRANCH NAME
                          </span>
                          <h3 className="text-lg font-black text-zinc-950 uppercase tracking-tight group-hover:text-[#147FC3] transition-colors">
                            {branch.name}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-3.5 text-xs text-zinc-700">
                        {/* Address */}
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-[#147FC3] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-zinc-900 block">Address:</span>
                            <span className="text-zinc-600">{branch.address}</span>
                          </div>
                        </div>

                        {/* Landmark */}
                        <div className="flex items-start gap-2.5">
                          <Navigation className="w-4 h-4 text-[#FCA038] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-zinc-900 block">Landmark:</span>
                            <span className="text-zinc-600">{branch.landmark}</span>
                          </div>
                        </div>

                        {/* PIN Code */}
                        <div className="flex items-center gap-2.5">
                          <span className="w-4 h-4 rounded-full bg-zinc-100 text-zinc-600 font-extrabold text-[9px] flex items-center justify-center shrink-0">
                            PIN
                          </span>
                          <div>
                            <span className="font-bold text-zinc-900">PIN Code: </span>
                            <span className="text-zinc-700 font-mono font-bold">{branch.pinCode}</span>
                          </div>
                        </div>

                        {/* Phone & Mobile */}
                        <div className="grid grid-cols-1 gap-2 pt-2 border-t border-zinc-100">
                          <div className="flex items-center gap-2.5">
                            <Phone className="w-3.5 h-3.5 text-[#147FC3] shrink-0" />
                            <div>
                              <span className="font-bold text-zinc-900">Phone: </span>
                              <a href={`tel:${branch.phone}`} className="text-[#147FC3] font-semibold hover:underline">
                                {branch.phone}
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <Smartphone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <div>
                              <span className="font-bold text-zinc-900">Mobile: </span>
                              <a href={`tel:${branch.mobile}`} className="text-emerald-700 font-semibold hover:underline">
                                {branch.mobile}
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-2.5 pt-2 border-t border-zinc-100">
                          <Mail className="w-3.5 h-3.5 text-[#FCA038] shrink-0" />
                          <div className="truncate">
                            <span className="font-bold text-zinc-900">Email: </span>
                            <a href={`mailto:${branch.email}`} className="text-[#147FC3] font-semibold hover:underline truncate">
                              {branch.email}
                            </a>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-2.5">
                          <Compass className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-zinc-900 block">Location:</span>
                            <span className="text-zinc-600">{branch.location}</span>
                          </div>
                        </div>

                        {/* Working Hours */}
                        <div className="flex items-center gap-2.5 pt-2 border-t border-zinc-100 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/50">
                          <Clock className="w-3.5 h-3.5 text-[#FCA038] shrink-0" />
                          <div>
                            <span className="font-extrabold text-zinc-900">Working Hours: </span>
                            <span className="text-zinc-800 font-bold">{branch.workingHours}</span>
                          </div>
                        </div>

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
