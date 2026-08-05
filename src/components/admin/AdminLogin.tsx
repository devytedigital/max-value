"use client";

import React, { useState } from "react";
import { Lock, Mail, ShieldCheck, KeyRound, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface AdminLoginProps {
  onSuccess: () => void;
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email.trim() === "admin@gmail.com" && password === "12345678") {
        onSuccess();
      } else {
        setError("Invalid credentials! Please use admin@gmail.com / 12345678");
        setLoading(false);
      }
    }, 600);
  };

  const handleQuickFill = () => {
    setEmail("admin@gmail.com");
    setPassword("12345678");
    setError("");
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10"
      >
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#147FC3] to-sky-400 text-white shadow-lg shadow-sky-500/20 mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            MaxValue <span className="text-[#147FC3]">Admin</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
            Authorized Portal Access & Content Management
          </p>
        </div>

        {/* Quick Demo Credentials Badge */}
        <div className="mb-6 p-3.5 bg-slate-800/80 border border-slate-700/80 rounded-2xl flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" /> Demo Credentials:
            </span>
            <p className="text-slate-300 font-mono text-[11px]">
              admin@gmail.com | 12345678
            </p>
          </div>
          <button
            type="button"
            onClick={handleQuickFill}
            className="px-3 py-1.5 bg-[#147FC3]/20 hover:bg-[#147FC3]/40 text-sky-300 hover:text-white rounded-xl text-[11px] font-semibold border border-sky-500/30 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" /> Auto Fill
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-300 text-xs flex items-center gap-2.5"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-slate-700 bg-slate-900 text-[#147FC3] focus:ring-offset-slate-900 focus:ring-[#147FC3]"
              />
              <span>Remember session</span>
            </label>
            <span className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#147FC3] to-sky-600 hover:from-sky-600 hover:to-[#147FC3] text-white font-semibold rounded-xl text-sm shadow-lg shadow-sky-600/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Authenticating...
              </span>
            ) : (
              <>
                Sign In to Dashboard <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> MaxValue Credits Admin System v2.4 (Frontend Prototype)
          </p>
        </div>
      </motion.div>
    </div>
  );
}
