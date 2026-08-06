"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock validation trigger
    setTimeout(() => {
      if (email.trim() === "admin@gmail.com" && password === "12345678") {
        alert("Authentication successful! (Ready for custom admin routing)");
        setLoading(false);
      } else {
        setError("Invalid email or password. Please use admin@gmail.com / 12345678");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      
      {/* Light Theme Corporate Colored Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Return to Website Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/" 
          className="text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1 cursor-pointer"
        >
          ← Return to Website
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-xl relative z-10"
      >
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#147FC3] to-[#FCA038] text-white shadow-lg mb-4">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            MaxValue <span className="text-[#147FC3]">Admin</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-550 mt-2 font-medium">
            Console Login & Authentication
          </p>
        </div>

        {/* Demo Credentials Box (Yellow Accent Theme) */}
        <div className="mb-6 p-4 bg-amber-50/50 border border-amber-100 rounded-2xl">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
            Demo Credentials
          </span>
          <div className="flex justify-between items-center text-xs">
            <span className="font-mono text-zinc-700">admin@gmail.com</span>
            <span className="font-mono text-zinc-600 font-bold">12345678</span>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs flex items-center gap-2.5"
          >
            <AlertCircle className="w-4.5 h-4.5 text-rose-500 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-2 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-2 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-800 cursor-pointer transition-colors"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#147FC3] to-[#FCA038] hover:from-[#FCA038] hover:to-[#147FC3] text-white font-bold rounded-xl text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              <>
                Sign In to Console <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
