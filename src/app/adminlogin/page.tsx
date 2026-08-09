"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid email or password");
      }

      localStorage.setItem("admin_token", data.token || "mv_authenticated_token");
      if (data.user) {
        localStorage.setItem("admin_user", JSON.stringify(data.user));
      }
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-row font-sans select-none overflow-hidden">
      
      {/* Left side: Login Form */}
      <div className="w-full lg:w-[50%] flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-20 xl:px-28 py-12 relative z-10">

        <div className="max-w-md w-full mx-auto">
          {/* Header Branding */}
          <div className="mb-10 text-left">
            <h1 className="text-[28px] md:text-[34px] font-extrabold text-slate-900 tracking-tight leading-tight">
              MaxValue Management
            </h1>
            <p className="text-sm text-zinc-400 mt-2 font-medium">
              Welcome Back, Please login to your account
            </p>
          </div>

          {/* Error Notification */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2.5"
            >
              <AlertCircle className="w-4.5 h-4.5 text-rose-500 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Combined/Unified Box Input Container */}
            <div className="border border-zinc-200/90 rounded-xl bg-white overflow-hidden shadow-xs divide-y divide-zinc-200/90">
              
              {/* Email Block */}
              <div className="p-4 flex flex-col focus-within:bg-zinc-50/50 transition-colors">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@maxvaluecredits.in"
                  className="w-full text-sm font-semibold text-zinc-800 bg-transparent border-none outline-none mt-1.5 p-0 placeholder-zinc-300 focus:ring-0"
                />
              </div>

              {/* Password Block */}
              <div className="p-4 flex flex-col relative focus-within:bg-zinc-50/50 transition-colors">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-sm font-semibold text-zinc-800 bg-transparent border-none outline-none mt-1.5 p-0 pr-10 placeholder-zinc-300 focus:ring-0"
                />
                
                {/* Password Eye Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 bottom-4 text-zinc-400 hover:text-zinc-800 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>

            </div>

            {/* Checkbox and Forgot Password (Exactly aligned like screenshot) */}
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-zinc-350 bg-white text-[#147FC3] focus:ring-[#147FC3] w-4 h-4 cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              
              <span className="text-zinc-900 hover:text-[#147FC3] hover:underline transition-colors cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* Submit Button (Left-aligned & smaller exactly like screenshot) */}
            <div className="pt-4 text-left">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-amber-400 to-[#FCA038] hover:from-[#FCA038] hover:to-amber-400 text-white font-bold tracking-widest text-[11px] rounded-[4px] px-10 py-3.5 uppercase shadow-md transition-all duration-300 cursor-pointer disabled:opacity-70 active:scale-98"
              >
                {loading ? "Processing..." : "Login"}
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Right side: Split Screen Brand Image (京都伏見稲荷鳥居ゲート - Kyoto Fushimi Inari Torii Gates) */}
      <div 
        className="hidden lg:block lg:w-[50%] relative h-screen bg-slate-950"
        style={{
          clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      >
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80"
          alt="Kyoto Torii Pathway"
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        {/* Brand Logo Overlay in Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-4 text-white">
            {/* Geometric abstract logo mark (recreating the Spark shape) */}
            <svg 
              className="w-14 h-14 text-white drop-shadow-lg" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" />
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="10" y1="30" x2="90" y2="70" />
              <line x1="10" y1="70" x2="90" y2="30" />
            </svg>
            <span className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
              MaxValue
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
