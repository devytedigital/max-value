"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Check,
  Plus,
  RefreshCw,
  Sparkles,
  Download,
  Building,
  UserCheck,
  TrendingDown,
  Activity
} from "lucide-react";

// Mock Applications Data
const initialApplications = [
  { id: "APP-2026-9042", name: "Ramanathan Iyer", type: "Gold Loan", amount: "₹4,50,000", date: "2026-08-06", status: "Pending", phone: "+91 98401 23456", branch: "Chennai Central", score: 780 },
  { id: "APP-2026-9041", name: "Priya Sharma", type: "Business Loan", amount: "₹25,00,000", date: "2026-08-05", status: "Under Review", phone: "+91 99302 98765", branch: "Mumbai Fort", score: 720 },
  { id: "APP-2026-9040", name: "Karan Johar Ltd", type: "Traders Loan", amount: "₹12,00,000", date: "2026-08-05", status: "Approved", phone: "+91 97204 55443", branch: "Delhi Karol Bagh", score: 810 },
  { id: "APP-2026-9039", name: "Anjali Menon", type: "Gold Loan", amount: "₹1,80,000", date: "2026-08-04", status: "Approved", phone: "+91 94471 22334", branch: "Kochi MG Road", score: 795 },
  { id: "APP-2026-9038", name: "Rajesh Kumar", type: "Vehicle Loan", amount: "₹8,50,000", date: "2026-08-04", status: "Pending", phone: "+91 91234 56789", branch: "Bangalore Indiranagar", score: 680 },
  { id: "APP-2026-9037", name: "Sita Devi Self-Help Group", type: "Microfinance", amount: "₹3,00,000", date: "2026-08-03", status: "Rejected", phone: "+91 90088 11223", branch: "Madurai Rural", score: 590 },
  { id: "APP-2026-9036", name: "Vikram Malhotra", type: "Business Loan", amount: "₹18,50,000", date: "2026-08-02", status: "Under Review", phone: "+91 98112 00998", branch: "Kolkata Salt Lake", score: 715 },
  { id: "APP-2026-9035", name: "Baldev Singh", type: "Traders Loan", amount: "₹6,00,000", date: "2026-08-01", status: "Approved", phone: "+91 95011 88776", branch: "Amritsar GT Road", score: 760 },
];

// Mock Chart Data for Monthly Loans (Jan - Jun 2026)
const chartData = [
  { month: "Jan", disbursed: 320, collected: 290 },
  { month: "Feb", disbursed: 380, collected: 340 },
  { month: "Mar", disbursed: 450, collected: 410 },
  { month: "Apr", disbursed: 410, collected: 395 },
  { month: "May", disbursed: 520, collected: 480 },
  { month: "Jun", disbursed: 610, collected: 590 },
];

export default function AdminDashboard() {
  const [applications, setApplications] = useState(initialApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedApp, setSelectedApp] = useState<typeof initialApplications[0] | null>(null);
  const [checklist, setChecklist] = useState([
    { id: 1, task: "Audit Delhi branch gold appraisals", done: false },
    { id: 2, task: "Review high-value Traders Loan applications (>₹20L)", done: true },
    { id: 3, task: "Disburse pending approved Gold Loans", done: false },
    { id: 4, task: "Sync daily transaction ledgers with Firebase", done: false },
  ]);
  const [newTask, setNewTask] = useState("");
  
  // Custom interactive SVG chart states
  const [hoveredDataIndex, setHoveredDataIndex] = useState<number | null>(null);

  // System Logs Ticker
  const [systemLogs, setSystemLogs] = useState([
    { time: "09:14 AM", type: "Security", message: "Admin login successful from IP 192.168.1.48" },
    { time: "09:05 AM", type: "Action", message: "Disbursement payout of ₹1,80,000 generated for APP-2026-9039" },
    { time: "08:34 AM", type: "Branch", message: "Kochi branch uploaded gold valuation ledger for verification" },
    { time: "07:50 AM", type: "System", message: "Firebase database synchronized with core banking ledger" },
  ]);

  // Actions handlers
  const handleToggleTask = (id: number) => {
    setChecklist(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setChecklist(prev => [...prev, { id: Date.now(), task: newTask, done: false }]);
    setNewTask("");
  };

  const handleUpdateStatus = (appId: string, newStatus: string) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app));
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
    }
    
    // Add log
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSystemLogs(prev => [
      { time: timestamp, type: "Action", message: `Application ${appId} status updated to ${newStatus}` },
      ...prev
    ]);
  };

  const handleDeleteApp = (appId: string) => {
    setApplications(prev => prev.filter(app => app.id !== appId));
    setSelectedApp(null);
    
    // Add log
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSystemLogs(prev => [
      { time: timestamp, type: "Action", message: `Application ${appId} was deleted by Admin` },
      ...prev
    ]);
  };

  // Filter & Search Logic
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.branch.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTab === "All") return matchesSearch;
    if (selectedTab === "Pending") return matchesSearch && (app.status === "Pending" || app.status === "Under Review");
    return matchesSearch && app.type === selectedTab;
  });

  // SVG Chart calculation parameters
  const chartHeight = 220;
  const chartWidth = 500;
  const maxVal = 700;
  const pointsDisbursed = chartData.map((d, index) => {
    const x = (index / (chartData.length - 1)) * chartWidth;
    const y = chartHeight - (d.disbursed / maxVal) * chartHeight;
    return `${x},${y}`;
  }).join(" ");

  const pointsCollected = chartData.map((d, index) => {
    const x = (index / (chartData.length - 1)) * chartWidth;
    const y = chartHeight - (d.collected / maxVal) * chartHeight;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="space-y-8 select-none">
      
      {/* STATS SECTION / CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Total Portfolio Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between group transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Total Portfolio</span>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">₹42.85 Cr</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-[#147FC3]">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          
          {/* Sparkline mini chart preview */}
          <div className="mt-4 flex items-end justify-between">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                +12.4%
              </span>
              <span className="text-[10px] font-semibold text-zinc-450">vs last month</span>
            </div>
            {/* Embedded SVG sparkline */}
            <svg className="w-20 h-8 text-emerald-500 overflow-visible" viewBox="0 0 100 30" fill="none">
              <path
                d="M0,25 Q15,20 30,22 T60,10 T90,5 L100,2"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Active Borrowers Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between group transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Active Borrowers</span>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">12,450</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#FCA038]">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col gap-1.5 w-full">
              {/* Simplified micro-progress bar distribution */}
              <div className="flex justify-between text-[9px] font-bold text-zinc-550">
                <span>Gold: 66%</span>
                <span>Biz: 25%</span>
                <span>Other: 9%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-100 rounded-full flex overflow-hidden">
                <div className="bg-[#147FC3] h-full" style={{ width: "66%" }} />
                <div className="bg-[#FCA038] h-full" style={{ width: "25%" }} />
                <div className="bg-zinc-400 h-full" style={{ width: "9%" }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pending Approvals Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between group transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Pending Approvals</span>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">34 Cases</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 relative">
              <Clock className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white animate-ping" />
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                Requires Action
              </span>
              <span className="text-[10px] font-semibold text-zinc-450">7 urgent cases</span>
            </div>
            <span className="text-xs font-bold text-[#147FC3] hover:underline cursor-pointer flex items-center gap-0.5">
              View
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </motion.div>

        {/* Collection rate Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between group transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Collection Rate</span>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">98.42%</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                +0.18%
              </span>
              <span className="text-[10px] font-semibold text-zinc-455">vs target</span>
            </div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase">Target 98.00%</span>
          </div>
        </motion.div>

      </section>

      {/* CHARTS & ANALYTICS WRAPPER */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Custom SVG Line Chart for Disbursements & Collections (2/3 width) */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs xl:col-span-2 flex flex-col justify-between relative">
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Volume Statistics (₹ Lakhs)
              </h3>
              <span className="text-[10px] sm:text-xs text-zinc-400 font-semibold mt-1">
                Disbursements vs Repayments Over Time
              </span>
            </div>

            {/* Chart Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#147FC3] rounded-full" />
                <span className="text-zinc-600">Disbursed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#FCA038] rounded-full" />
                <span className="text-zinc-600">Repaid</span>
              </div>
            </div>
          </div>

          {/* Interactive SVG Chart Canvas */}
          <div className="relative h-60 w-full mt-4 flex items-end justify-center">
            
            {/* Y Axis Guide Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] font-bold text-zinc-400/80 pr-2">
              <div className="w-full border-b border-zinc-100 flex justify-between pb-1">
                <span>₹600L</span>
              </div>
              <div className="w-full border-b border-zinc-100 flex justify-between pb-1">
                <span>₹400L</span>
              </div>
              <div className="w-full border-b border-zinc-100 flex justify-between pb-1">
                <span>₹200L</span>
              </div>
              <div className="w-full border-b border-zinc-100 flex justify-between pb-1">
                <span>₹0</span>
              </div>
            </div>

            {/* Main SVG Plot */}
            <svg 
              className="w-[90%] h-[80%] z-10 overflow-visible" 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              preserveAspectRatio="none"
            >
              {/* Disbursed Area/Line Path */}
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#147FC3" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#147FC3" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FCA038" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#FCA038" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area path - Disbursed */}
              <path
                d={`M0,${chartHeight} L${pointsDisbursed} L${chartWidth},${chartHeight} Z`}
                fill="url(#blueGrad)"
              />

              {/* Area path - Collected */}
              <path
                d={`M0,${chartHeight} L${pointsCollected} L${chartWidth},${chartHeight} Z`}
                fill="url(#orangeGrad)"
              />

              {/* Stroke path - Disbursed */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                d={`M${pointsDisbursed}`}
                stroke="#147FC3"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Stroke path - Collected */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                d={`M${pointsCollected}`}
                stroke="#FCA038"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Interactive nodes */}
              {chartData.map((d, index) => {
                const x = (index / (chartData.length - 1)) * chartWidth;
                const yDisb = chartHeight - (d.disbursed / maxVal) * chartHeight;
                const yColl = chartHeight - (d.collected / maxVal) * chartHeight;
                const isHovered = hoveredDataIndex === index;

                return (
                  <g key={d.month} className="cursor-pointer">
                    {/* Hover Trigger Box */}
                    <rect
                      x={x - 20}
                      y={0}
                      width={40}
                      height={chartHeight}
                      fill="transparent"
                      onMouseEnter={() => setHoveredDataIndex(index)}
                      onMouseLeave={() => setHoveredDataIndex(null)}
                    />

                    {/* Nodes on Disbursed line */}
                    <circle
                      cx={x}
                      cy={yDisb}
                      r={isHovered ? 6 : 4}
                      fill="#147FC3"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition-all duration-150"
                    />

                    {/* Nodes on Collected line */}
                    <circle
                      cx={x}
                      cy={yColl}
                      r={isHovered ? 6 : 4}
                      fill="#FCA038"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition-all duration-150"
                    />

                    {/* Hover column marker line */}
                    {isHovered && (
                      <line
                        x1={x}
                        y1={0}
                        x2={x}
                        y2={chartHeight}
                        stroke="#147FC3"
                        strokeDasharray="4 4"
                        strokeWidth="1.5"
                        className="pointer-events-none"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
            
            {/* Tooltip Overlay */}
            <AnimatePresence>
              {hoveredDataIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute bottom-16 bg-slate-955/90 text-white rounded-xl p-3 shadow-xl z-20 border border-slate-800 text-[10px] sm:text-xs font-semibold leading-relaxed pointer-events-none"
                  style={{
                    left: `${(hoveredDataIndex / (chartData.length - 1)) * 75 + 10}%`
                  }}
                >
                  <p className="text-amber-400 font-bold border-b border-white/10 pb-1 mb-1.5 uppercase tracking-wide">
                    {chartData[hoveredDataIndex].month} Summary
                  </p>
                  <p className="flex justify-between gap-4">
                    <span>Disbursed:</span> 
                    <span className="font-bold font-mono">₹{chartData[hoveredDataIndex].disbursed}L</span>
                  </p>
                  <p className="flex justify-between gap-4 mt-0.5">
                    <span>Repaid:</span> 
                    <span className="font-bold font-mono">₹{chartData[hoveredDataIndex].collected}L</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* X Axis Labels */}
          <div className="flex justify-between text-[10px] font-extrabold text-zinc-550 px-6 mt-4">
            {chartData.map((d) => (
              <span key={d.month}>{d.month}</span>
            ))}
          </div>

        </div>

        {/* Dynamic Branch network breakdown & system tasks Checklist (1/3 width) */}
        <div className="space-y-6">
          
          {/* Quick Checklist Section */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs flex flex-col justify-between">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5 mb-4">
              <FileText className="w-4 h-4 text-[#147FC3]" />
              Checklist Tasks
            </h3>

            <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Add daily operations task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-zinc-700 outline-none focus:border-[#147FC3]"
              />
              <button
                type="submit"
                className="w-8.5 h-8.5 bg-[#147FC3] text-white rounded-xl flex items-center justify-center hover:bg-sky-600 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleTask(item.id)}
                  className={`p-2.5 border rounded-xl flex items-center gap-3 cursor-pointer select-none transition-all duration-205 ${
                    item.done
                      ? "bg-zinc-50/50 border-zinc-150 text-zinc-400"
                      : "bg-white border-zinc-200 hover:border-zinc-350 text-zinc-750"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                      item.done ? "bg-[#147FC3] text-white" : "border border-zinc-300"
                    }`}
                  >
                    {item.done && <Check className="w-3 h-3" />}
                  </div>
                  <span className={`text-[11px] sm:text-xs font-semibold flex-1 ${item.done ? "line-through" : ""}`}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Operations panel */}
          <div className="bg-slate-955 p-6 rounded-2xl border border-slate-900 text-white flex flex-col">
            <h3 className="text-xs font-bold text-amber-450 uppercase tracking-widest mb-4">
              Quick Admin Actions
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => alert("Generating monthly PDF audit report...")}
                className="p-3 bg-slate-900 border border-slate-850 hover:bg-slate-850 rounded-xl flex flex-col gap-2 text-left cursor-pointer transition-colors"
              >
                <Download className="w-4.5 h-4.5 text-sky-400" />
                <span className="text-[10px] font-bold">Audit PDF</span>
              </button>

              <button 
                onClick={() => alert("Initiating sync with Firebase firestore ledgers...")}
                className="p-3 bg-slate-900 border border-slate-855 hover:bg-slate-850 rounded-xl flex flex-col gap-2 text-left cursor-pointer transition-colors"
              >
                <RefreshCw className="w-4.5 h-4.5 text-emerald-400" />
                <span className="text-[10px] font-bold">Sync Ledger</span>
              </button>

              <button 
                onClick={() => alert("Checking gold valuations across all network branches...")}
                className="p-3 bg-slate-900 border border-slate-850 hover:bg-slate-850 rounded-xl flex flex-col gap-2 text-left cursor-pointer transition-colors"
              >
                <Building className="w-4.5 h-4.5 text-amber-400" />
                <span className="text-[10px] font-bold">Valuations</span>
              </button>

              <button 
                onClick={() => alert("Initiating customer KYC automated vetting...")}
                className="p-3 bg-slate-900 border border-slate-850 hover:bg-slate-850 rounded-xl flex flex-col gap-2 text-left cursor-pointer transition-colors"
              >
                <UserCheck className="w-4.5 h-4.5 text-[#147FC3]" />
                <span className="text-[10px] font-bold">Verify KYC</span>
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* APPLICATIONS TABLE SECTION & DETAILS SPLIT SCREEN */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Table layout (2/3 width) */}
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs xl:col-span-2 overflow-hidden flex flex-col">
          
          {/* Header toolbar */}
          <div className="p-6 border-b border-zinc-150/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex flex-col">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                <FileText className="w-4.5 h-4.5 text-[#147FC3]" />
                Loan Application Pool
              </h3>
              <span className="text-[10px] sm:text-xs text-zinc-450 font-medium mt-1">
                Real-time portal applications queue
              </span>
            </div>

            {/* Toolbar search */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-xl max-w-64">
                <Search className="w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Filter name, ID, branch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs font-semibold text-zinc-650 placeholder-zinc-400 p-0 focus:ring-0 w-36"
                />
              </div>
            </div>

          </div>

          {/* Filtering pills */}
          <div className="px-6 py-3 border-b border-zinc-100 flex gap-2 overflow-x-auto bg-zinc-50/30">
            {["All", "Gold Loan", "Business Loan", "Traders Loan", "Vehicle Loan", "Microfinance", "Pending"].map((tabName) => (
              <button
                key={tabName}
                onClick={() => setSelectedTab(tabName)}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap cursor-pointer transition-colors ${
                  selectedTab === tabName
                    ? "bg-[#147FC3] border-[#147FC3] text-white shadow-sm"
                    : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                }`}
              >
                {tabName}
              </button>
            ))}
          </div>

          {/* The Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-150 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  <th className="py-4 px-6">ID & Client</th>
                  <th className="py-4 px-4">Loan Type</th>
                  <th className="py-4 px-4 text-right">Requested</th>
                  <th className="py-4 px-4">Branch</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-center">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-400 font-semibold">
                      No applications match the active filters
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={`hover:bg-zinc-50/50 transition-colors cursor-pointer group ${
                        selectedApp?.id === app.id ? "bg-sky-50/15" : ""
                      }`}
                    >
                      <td className="py-4.5 px-6 flex flex-col">
                        <span className="font-extrabold text-zinc-800 group-hover:text-[#147FC3] transition-colors">{app.name}</span>
                        <span className="text-[10px] text-zinc-400 font-mono mt-0.5">{app.id}</span>
                      </td>
                      <td className="py-4.5 px-4 font-semibold text-zinc-750">
                        {app.type}
                      </td>
                      <td className="py-4.5 px-4 font-bold text-zinc-800 text-right font-mono">
                        {app.amount}
                      </td>
                      <td className="py-4.5 px-4 font-semibold text-zinc-500 text-xs">
                        {app.branch}
                      </td>
                      <td className="py-4.5 px-4">
                        <span
                          className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide inline-flex items-center gap-1 ${
                            app.status === "Approved"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : app.status === "Pending"
                              ? "bg-amber-50 text-amber-700 border border-amber-100"
                              : app.status === "Under Review"
                              ? "bg-sky-50 text-sky-700 border border-sky-100"
                              : "bg-rose-50 text-rose-700 border border-rose-100"
                          }`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${
                              app.status === "Approved"
                                ? "bg-emerald-500"
                                : app.status === "Pending"
                                ? "bg-amber-400"
                                : app.status === "Under Review"
                                ? "bg-sky-500"
                                : "bg-rose-500"
                            }`}
                          />
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4.5 px-6 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedApp(app);
                          }}
                          className="w-7 h-7 rounded-lg border border-zinc-205 hover:border-zinc-350 hover:bg-zinc-50 flex items-center justify-center text-zinc-400 hover:text-zinc-700 cursor-pointer transition-colors mx-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* Detail drawer / context actions (1/3 width) */}
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs overflow-hidden flex flex-col sticky top-6">
          <div className="p-6 border-b border-zinc-150/70 bg-zinc-50/50">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
              Detail Panel
            </h3>
            <span className="text-[10px] sm:text-xs text-zinc-450 font-medium mt-1">
              Actions & Credit verification stats
            </span>
          </div>

          <AnimatePresence mode="wait">
            {selectedApp ? (
              <motion.div
                key={selectedApp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="p-6 space-y-6"
              >
                {/* Header overview */}
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-zinc-800 leading-tight">{selectedApp.name}</span>
                    <span className="text-[10px] text-zinc-400 font-mono mt-1">{selectedApp.id}</span>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                      selectedApp.status === "Approved"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : selectedApp.status === "Pending"
                        ? "bg-amber-50 text-amber-600 border-amber-100"
                        : selectedApp.status === "Under Review"
                        ? "bg-sky-50 text-sky-600 border-sky-100"
                        : "bg-rose-50 text-rose-600 border-rose-105"
                    }`}
                  >
                    {selectedApp.status}
                  </span>
                </div>

                {/* Details layout matrix */}
                <div className="grid grid-cols-2 gap-4 border-y border-zinc-100 py-4.5 text-xs">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Loan Type</span>
                    <span className="font-semibold text-zinc-700 mt-1">{selectedApp.type}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Requested</span>
                    <span className="font-bold text-[#147FC3] mt-1 font-mono">{selectedApp.amount}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Mobile contact</span>
                    <span className="font-semibold text-zinc-700 mt-1">{selectedApp.phone}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Branch Source</span>
                    <span className="font-semibold text-zinc-700 mt-1">{selectedApp.branch}</span>
                  </div>
                </div>

                {/* Credit Rating Simulation widget */}
                <div className="p-4 bg-zinc-50 border border-zinc-150 rounded-2xl flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-zinc-500">CIBIL Bureau Score</span>
                    <span className={`font-extrabold text-sm ${
                      selectedApp.score >= 750
                        ? "text-emerald-600"
                        : selectedApp.score >= 680
                        ? "text-amber-500"
                        : "text-rose-500"
                    }`}>
                      {selectedApp.score}
                    </span>
                  </div>

                  {/* Progress bar gauge */}
                  <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        selectedApp.score >= 750
                          ? "bg-emerald-500"
                          : selectedApp.score >= 680
                          ? "bg-amber-400"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${(selectedApp.score / 900) * 100}%` }}
                    />
                  </div>

                  <span className="text-[10px] font-semibold text-zinc-450 leading-relaxed">
                    {selectedApp.score >= 750
                      ? "Score qualifies for instant pre-approvals under MaxValue fast-track credit schemes."
                      : selectedApp.score >= 680
                      ? "Moderate credit score. Underwriter verification of additional collaterals recommended."
                      : "High risk profile. Requires manual override signature from operations director."}
                  </span>
                </div>

                {/* State update actions */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block mb-1">
                    Administrative Directives
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(selectedApp.id, "Approved")}
                      disabled={selectedApp.status === "Approved"}
                      className="flex-1 py-2.5 px-3 bg-emerald-650 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </button>
                    
                    <button
                      onClick={() => handleUpdateStatus(selectedApp.id, "Under Review")}
                      disabled={selectedApp.status === "Under Review" || selectedApp.status === "Approved"}
                      className="flex-1 py-2.5 px-3 bg-sky-500 hover:bg-sky-650 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Clock className="w-4 h-4" />
                      Review
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(selectedApp.id, "Rejected")}
                      disabled={selectedApp.status === "Rejected" || selectedApp.status === "Approved"}
                      className="flex-1 py-2 px-3 bg-rose-50 border border-rose-250 hover:bg-rose-100 disabled:opacity-50 text-rose-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>

                    <button
                      onClick={() => handleDeleteApp(selectedApp.id)}
                      className="py-2 px-3.5 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:text-rose-600 rounded-xl text-xs font-bold text-zinc-500 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="p-12 text-center text-zinc-400 font-semibold flex flex-col items-center justify-center gap-3">
                <AlertCircle className="w-8 h-8 text-zinc-300" />
                <span className="text-xs">Select an application row to view details & credit score logs</span>
              </div>
            )}
          </AnimatePresence>
        </div>

      </section>

      {/* OPERATIONS LOG TICKER / CHRONOLOGICAL SYSTEM LOGS */}
      <section className="bg-white rounded-2xl border border-zinc-200/80 p-6 shadow-xs flex flex-col">
        <div className="flex justify-between items-center mb-5 border-b border-zinc-100 pb-3">
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-500" />
            Live Operation Logs Ticker
          </h3>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="space-y-3.5 max-h-48 overflow-y-auto">
          {systemLogs.map((log, index) => (
            <div key={index} className="flex gap-4 items-start text-xs font-semibold">
              <span className="font-mono text-zinc-400 shrink-0 w-16">{log.time}</span>
              <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-wider shrink-0 w-18 text-center ${
                log.type === "Security"
                  ? "bg-rose-50 text-rose-600 border border-rose-100/50"
                  : log.type === "Action"
                  ? "bg-sky-50 text-sky-600 border border-sky-100/50"
                  : log.type === "Branch"
                  ? "bg-amber-50 text-amber-600 border border-amber-100/50"
                  : "bg-zinc-105 text-zinc-550 border border-zinc-200/50"
              }`}>
                {log.type}
              </span>
              <p className="text-zinc-650 flex-1 leading-normal">{log.message}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
