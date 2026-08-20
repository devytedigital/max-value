"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, collection, getDocs, setDoc } from "firebase/firestore";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  Clock,
  ArrowUpRight,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Download,
  Building,
  UserCheck,
  Activity,
  Coins,
  BookOpen,
  Newspaper,
  Briefcase,
  ShieldCheck,
  GitBranch
} from "lucide-react";

export default function AdminDashboard() {
  // Gold Rate States
  const [goldRate, setGoldRate] = useState<string>("");
  const [rateLoading, setRateLoading] = useState(false);
  const [rateSaving, setRateSaving] = useState(false);
  const [rateError, setRateError] = useState("");
  const [rateSuccess, setRateSuccess] = useState(false);
  const [rateLastUpdated, setRateLastUpdated] = useState("");
  const [goldRateHistory, setGoldRateHistory] = useState<any[]>([]);

  // Database Counts
  const [counts, setCounts] = useState({
    branches: 0,
    jobs: 0,
    blogs: 0,
    news: 0,
    activities: 0,
    directors: 0,
    leaders: 0,
    media: 0,
    videos: 0,
    documents: 0,
    admins: 0
  });
  const [loadingDb, setLoadingDb] = useState(true);
  const [allContent, setAllContent] = useState<any[]>([]);

  // Load Gold Rate and History in real-time
  useEffect(() => {
    setRateLoading(true);
    const docRef = doc(db, "blogs", "gold-rate-settings");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.rate) {
          setGoldRate(data.rate.toString());
          setRateLastUpdated(data.lastUpdated || "");
        }
        if (Array.isArray(data.history)) {
          setGoldRateHistory(data.history);
        }
      }
      setRateLoading(false);
    }, (err) => {
      setRateLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSaveGoldRate = async () => {
    if (!goldRate || isNaN(Number(goldRate))) {
      setRateError("Please enter a valid numeric gold rate.");
      return;
    }
    try {
      setRateSaving(true);
      setRateError("");
      setRateSuccess(false);
      const res = await fetch("/api/gold-rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rate: Number(goldRate), updatedBy: "Admin Portal" })
      });
      if (res.ok) {
        const data = await res.json();
        setRateSuccess(true);
        setRateLastUpdated(data.lastUpdated || new Date().toISOString());
        setTimeout(() => setRateSuccess(false), 3000);
      } else {
        const data = await res.json();
        setRateError(data.error || "Failed to update gold rate");
      }
    } catch (err: any) {
      setRateError(err.message || "Failed to contact database");
    } finally {
      setRateSaving(false);
    }
  };

  // Fetch all database records in parallel for stats and logs
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  useEffect(() => {
    async function fetchDatabaseContent() {
      try {
        setLoadingDb(true);
        const collectionsList = [
          { name: "branches", type: "Branch" },
          { name: "jobs", type: "Job Opening" },
          { name: "blogs", type: "Blog Post" },
          { name: "news", type: "News Release" },
          { name: "activities", type: "CSR Activity" },
          { name: "directors", type: "Board Director" },
          { name: "leaders", type: "Corporate Leader" },
          { name: "media", type: "Photo Album" },
          { name: "videos", type: "Video Album" },
          { name: "documents", type: "Document" },
          { name: "admins", type: "Administrator" }
        ];

        const countsObj = {
          branches: 0,
          jobs: 0,
          blogs: 0,
          news: 0,
          activities: 0,
          directors: 0,
          leaders: 0,
          media: 0,
          videos: 0,
          documents: 0,
          admins: 0
        };

        let tempAllContent: any[] = [];

        await Promise.all(
          collectionsList.map(async (colInfo) => {
            const colRef = collection(db, colInfo.name);
            const querySnapshot = await getDocs(colRef);
            
            let count = 0;
            querySnapshot.forEach((docSnap) => {
              // Skip system files
              if (colInfo.name === "blogs" && (docSnap.id === "gold-rate-settings" || docSnap.id === "admin-checklist")) {
                return;
              }
              count++;
              const data = docSnap.data();
              tempAllContent.push({
                id: docSnap.id,
                name: data.name || data.title || data.fileName || docSnap.id,
                type: colInfo.type,
                collection: colInfo.name,
                date: data.date || data.createdAt || data.lastLogin || null,
                createdAt: data.createdAt || null,
                details: data
              });
            });

            (countsObj as any)[colInfo.name] = count;
          })
        );

        setCounts(countsObj);

        // Sort dynamically by date descending
        tempAllContent.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : (a.date ? new Date(a.date).getTime() : 0);
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : (b.date ? new Date(b.date).getTime() : 0);
          return dateB - dateA;
        });

        setAllContent(tempAllContent);
      } catch (err) {
        console.error("Error loading database collections:", err);
      } finally {
        setLoadingDb(false);
      }
    }

    fetchDatabaseContent();
  }, [refreshTrigger]);

  // Calculate unique states count
  const statesCount = Array.from(new Set(
    allContent
      .filter(c => c.collection === "branches")
      .map(c => c.details?.state)
      .filter(Boolean)
  )).length;

  // Dynamic system logs generated from the 10 most recent content entries
  const systemLogs = allContent.slice(0, 10).map((item) => {
    const timeStr = item.createdAt 
      ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : (item.date ? new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A");
    
    const dateStr = item.createdAt 
      ? new Date(item.createdAt).toLocaleDateString() 
      : (item.date ? new Date(item.date).toLocaleDateString() : "");

    let message = "";
    let type = "Action";
    
    if (item.collection === "branches") {
      message = `New branch ${item.name} was registered at ${item.details.district || ""}, ${item.details.state || ""}.`;
      type = "Branch";
    } else if (item.collection === "jobs") {
      message = `New career posting: ${item.name} (${item.details.department || ""}) is now open for applicants.`;
      type = "Branch";
    } else if (item.collection === "blogs") {
      message = `New blog post "${item.name}" was published under category "${item.details.category || ""}".`;
      type = "Action";
    } else if (item.collection === "news") {
      message = `Official news release "${item.name}" was posted.`;
      type = "Action";
    } else if (item.collection === "activities") {
      message = `CSR Activity "${item.name}" was logged by ${item.details.organizer || "Max Value"}.`;
      type = "Branch";
    } else if (item.collection === "admins") {
      message = `Admin user ${item.name} (${item.details.role || "Admin"}) joined the management portal.`;
      type = "Security";
    } else {
      message = `New document/asset "${item.name}" was uploaded under ${item.type}.`;
      type = "System";
    }

    return {
      time: `${dateStr} ${timeStr}`,
      type,
      message
    };
  });

  // Fallback logs if DB is empty
  const activeLogs = systemLogs.length > 0 ? systemLogs : [
    { time: "Today", type: "System", message: "Database is loaded and synced with Firestore." }
  ];

  return (
    <div className="space-y-8 select-none font-sans">
      
      {/* STATS SECTION / CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Active Branches */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between group transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Active Branches</span>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">{loadingDb ? "..." : counts.branches}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-[#147FC3]">
              <GitBranch className="w-5 h-5" />
            </div>
          </div>
          
          <div className="mt-4 flex items-end justify-between">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {statesCount} States
              </span>
              <span className="text-[10px] font-semibold text-zinc-450">represented</span>
            </div>
            <Link href="/admin/branches" className="text-[10px] font-bold text-[#147FC3] hover:underline">
              Manage
            </Link>
          </div>
        </motion.div>

        {/* Open Careers */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between group transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Open Positions</span>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">{loadingDb ? "..." : counts.jobs}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#FCA038]">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                Active Hiring
              </span>
              <span className="text-[10px] font-semibold text-zinc-455">careers portal</span>
            </div>
            <Link href="/admin/careers" className="text-[10px] font-bold text-[#147FC3] hover:underline">
              Manage
            </Link>
          </div>
        </motion.div>

        {/* Blogs & News */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between group transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Blogs & News</span>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">{loadingDb ? "..." : (counts.blogs + counts.news)}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {counts.blogs} Blogs | {counts.news} News
              </span>
            </div>
            <div className="flex gap-2">
              <Link href="/admin/blog" className="text-[10px] font-bold text-[#147FC3] hover:underline">
                Blogs
              </Link>
              <Link href="/admin/news" className="text-[10px] font-bold text-[#147FC3] hover:underline">
                News
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Admin Team */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between group transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">System Admins</span>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">{loadingDb ? "..." : counts.admins}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                Console Access
              </span>
              <span className="text-[10px] font-semibold text-zinc-455">staff roles</span>
            </div>
            <Link href="/admin/admins" className="text-[10px] font-bold text-[#147FC3] hover:underline">
              Manage
            </Link>
          </div>
        </motion.div>

      </section>

      {/* DYNAMIC TWO-COLUMN MIDDLE SECTION */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Left Column: Live Gold Rate Editor & History Widget */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3.5">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Coins className="w-5 h-5 text-[#FCA038]" />
              Live Gold Rate Editor
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/50 uppercase">
              Per Gram
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-zinc-400">Current Rate (₹ / Gram)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-zinc-500">₹</span>
                <input
                  type="number"
                  value={goldRate}
                  onChange={(e) => setGoldRate(e.target.value)}
                  disabled={rateLoading || rateSaving}
                  placeholder="7250"
                  className="w-full pl-7 pr-3 py-2 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 focus:ring-2 focus:ring-[#147FC3]/40 outline-none"
                />
              </div>
            </div>

            {rateError && (
              <p className="text-[10px] font-bold text-rose-600 flex items-center gap-1 text-left">
                <AlertCircle className="w-3.5 h-3.5" /> {rateError}
              </p>
            )}

            {rateSuccess && (
              <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 text-left">
                <CheckCircle2 className="w-3.5 h-3.5" /> Gold rate updated successfully!
              </p>
            )}

            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-455 border-t border-zinc-50 pt-3">
              <span>Last updated: {rateLastUpdated ? new Date(rateLastUpdated).toLocaleTimeString() : "N/A"}</span>
              <button
                type="button"
                onClick={handleSaveGoldRate}
                disabled={rateLoading || rateSaving || !goldRate}
                className="px-4 py-2 bg-[#147FC3] hover:bg-[#FCA038] text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors disabled:bg-zinc-350 cursor-pointer"
              >
                {rateSaving ? "Saving..." : "Save Rate"}
              </button>
            </div>

            {/* Dynamic 10 Gold Rate History List */}
            <div className="mt-5 border-t border-zinc-100 pt-5">
              <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-3 text-left">
                Recent Gold Rates
              </h4>
              {goldRateHistory.length === 0 ? (
                <p className="text-[11px] font-semibold text-zinc-400 text-center py-4 bg-zinc-50 rounded-xl border border-zinc-150">
                  No gold rate history recorded yet.
                </p>
              ) : (
                <div className="max-h-64 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                  {goldRateHistory.map((h, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-[11px] bg-zinc-50 hover:bg-zinc-100 p-2.5 rounded-lg border border-zinc-150 transition-colors text-left"
                    >
                      <span className="font-extrabold text-zinc-800">₹{h.rate} / g</span>
                      <div className="text-right flex flex-col items-end">
                        <span className="text-[9px] font-semibold text-zinc-450">
                          {h.date ? new Date(h.date).toLocaleDateString() : ""}{" "}
                          {h.date
                            ? new Date(h.date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </span>
                        <span className="text-[8px] font-black text-zinc-400 uppercase mt-0.5">
                          By {h.updatedBy || "Admin"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Stacked Quick Admin Actions + Live Operation Logs Ticker */}
        <div className="flex flex-col gap-6">
          
          {/* Quick Operations panel */}
          <div className="bg-slate-955 p-6 rounded-2xl border border-slate-900 text-white flex flex-col text-left">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
              <h3 className="text-xs font-bold text-amber-450 uppercase tracking-widest">
                Quick Admin Actions
              </h3>
              <button
                onClick={() => setRefreshTrigger(prev => prev + 1)}
                className="p-1.5 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
                title="Refresh database totals"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingDb ? "animate-spin" : ""}`} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Link 
                href="/admin/media/documents"
                className="p-3 bg-slate-900 border border-slate-850 hover:bg-slate-850 rounded-xl flex flex-col gap-2 text-left cursor-pointer transition-colors font-sans"
              >
                <Download className="w-4.5 h-4.5 text-sky-400" />
                <span className="text-[10px] font-bold">Financial Docs</span>
              </Link>

              <button 
                onClick={() => setRefreshTrigger(prev => prev + 1)}
                className="p-3 bg-slate-900 border border-slate-855 hover:bg-slate-850 rounded-xl flex flex-col gap-2 text-left cursor-pointer transition-colors"
              >
                <RefreshCw className="w-4.5 h-4.5 text-emerald-400" />
                <span className="text-[10px] font-bold">Sync Ledger</span>
              </button>

              <Link 
                href="/admin/branches"
                className="p-3 bg-slate-900 border border-slate-850 hover:bg-slate-850 rounded-xl flex flex-col gap-2 text-left cursor-pointer transition-colors font-sans"
              >
                <Building className="w-4.5 h-4.5 text-amber-400" />
                <span className="text-[10px] font-bold">Valuations</span>
              </Link>

              <Link 
                href="/admin/admins"
                className="p-3 bg-slate-900 border border-slate-850 hover:bg-slate-850 rounded-xl flex flex-col gap-2 text-left cursor-pointer transition-colors font-sans"
              >
                <UserCheck className="w-4.5 h-4.5 text-[#147FC3]" />
                <span className="text-[10px] font-bold">Admin Team</span>
              </Link>
            </div>
          </div>

          {/* Live Operation Logs Ticker Widget */}
          <div className="bg-white rounded-2xl border border-zinc-200/80 p-6 shadow-xs flex flex-col flex-1">
            <div className="flex justify-between items-center mb-5 border-b border-zinc-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-500" />
                Live Operation Logs Ticker
              </h3>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-3.5 max-h-64 overflow-y-auto">
              {activeLogs.map((log, index) => (
                <div key={index} className="flex gap-4 items-start text-xs font-semibold text-left">
                  <span className="font-mono text-zinc-400 shrink-0 w-28">{log.time}</span>
                  <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-wider shrink-0 w-18 text-center ${
                    log.type === "Security"
                      ? "bg-rose-50 text-rose-600 border border-rose-100/50"
                      : log.type === "Branch"
                      ? "bg-sky-50 text-sky-600 border border-sky-100/50"
                      : log.type === "System"
                      ? "bg-amber-50 text-amber-600 border border-amber-100/50"
                      : "bg-zinc-100 text-zinc-550 border border-zinc-200/50"
                  }`}>
                    {log.type}
                  </span>
                  <p className="text-zinc-650 flex-1 leading-normal">{log.message}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
