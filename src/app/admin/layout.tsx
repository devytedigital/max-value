"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  GitBranch,
  Activity,
  Settings,
  LogOut,
  Home,
  Menu,
  X,
  Bell,
  Search,
  User,
  Clock,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New Gold Loan application submitted", time: "5 mins ago", unread: true },
    { id: 2, text: "System backup completed successfully", time: "1 hour ago", unread: true },
    { id: 3, text: "High-value Business Loan approved", time: "2 hours ago", unread: false },
  ]);

  // Handle Authentication verification
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      // Redirect to login if not authenticated
      router.push("/adminlogin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Breadcrumbs/Page title resolver
  const getPageTitle = () => {
    switch (pathname) {
      case "/admin":
        return "Dashboard Overview";
      case "/admin/branches":
        return "Branch Management";
      case "/admin/logs":
        return "System Activity Logs";
      case "/admin/settings":
        return "Security & Settings";
      default:
        return "Management Console";
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Applications", href: "/admin/applications", icon: FileText, badge: "34" },
    { name: "Branch Network", href: "/admin/branches", icon: GitBranch },
    { name: "System Logs", href: "/admin/logs", icon: Activity },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/adminlogin");
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Close menus on page transition
  useEffect(() => {
    setIsMobileOpen(false);
    setShowNotifications(false);
  }, [pathname]);

  // Loading skeleton screen while verification takes place
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center font-sans select-none text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Logo animation */}
          <div className="flex items-center gap-3 relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 to-[#FCA038] flex items-center justify-center shadow-lg shadow-amber-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-wider">MaxValue</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-40 h-1 bg-slate-800 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-[#147FC3]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest mt-1">
              Verifying credentials...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div 
      className="min-h-screen lg:h-screen lg:overflow-hidden bg-zinc-50/70 font-sans text-zinc-800 flex flex-row relative select-none"
      data-lenis-prevent
    >
      
      {/* BACKGROUND DECORATIVE ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,127,195,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,127,195,0.015)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-70" />
        <div className="absolute top-[-20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[#147FC3]/3 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-[#FCA038]/3 blur-[120px]" />
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-72 h-screen bg-slate-950 border-r border-slate-900 flex-col fixed left-0 top-0 bottom-0 z-20 text-slate-300">
        
        {/* Branding header */}
        <div className="h-20 px-8 flex items-center gap-3.5 border-b border-slate-900">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-400 to-[#FCA038] flex items-center justify-center shadow-md">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-white tracking-wide leading-none">MaxValue</span>
            <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest mt-1">Management Console</span>
          </div>
        </div>

        {/* Sidebar Nav links */}
        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className="block group">
                <div
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#147FC3] text-white shadow-md shadow-[#147FC3]/15"
                      : "hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-900 text-amber-400 border border-slate-800"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer User Details */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/50">
          {/* User Widget */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/60 border border-slate-900">
            <div className="w-10 h-10 rounded-lg bg-zinc-805 border border-zinc-700 flex items-center justify-center font-bold text-sm text-[#147FC3]">
              AD
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-white truncate">Administrator</span>
              <span className="text-[10px] text-zinc-500 font-semibold truncate mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Session
              </span>
            </div>
          </div>

          {/* Quick links & Logout button */}
          <div className="mt-3 flex gap-2">
            <Link
              href="/"
              className="flex-1 py-2 px-2 bg-slate-900 border border-slate-855 hover:bg-slate-850 rounded-lg text-[11px] font-bold text-center text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-1"
            >
              <Home className="w-3 h-3" />
              Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 py-2 px-2 bg-rose-950/20 border border-rose-900/30 hover:bg-rose-950/40 rounded-lg text-[11px] font-bold text-center text-rose-455 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              Sign Out
            </button>
          </div>
        </div>

      </aside>

      {/* MOBILE DRAWERS & SIDEBAR */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black z-30 lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 left-0 w-72 bg-slate-950 z-40 lg:hidden flex flex-col text-slate-300 shadow-2xl"
            >
              <div className="h-20 px-6 flex items-center justify-between border-b border-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-[#FCA038] flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-base font-extrabold text-white tracking-wide">MaxValue</span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-8 h-8 rounded-lg border border-slate-900 flex items-center justify-center hover:bg-slate-900 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href} className="block">
                      <div
                        className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-[#147FC3] text-white shadow-md"
                            : "hover:bg-slate-900 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4.5 h-4.5" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isActive ? "bg-white/20 text-white" : "bg-slate-900 text-amber-450 border border-slate-800"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-900 bg-slate-950/50">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-900">
                  <div className="w-9 h-9 rounded-lg bg-zinc-850 flex items-center justify-center font-bold text-sm text-[#147FC3]">
                    AD
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs font-bold text-white truncate">Administrator</span>
                    <span className="text-[9px] text-emerald-450 font-semibold truncate mt-0.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      Connected
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Link
                    href="/"
                    className="flex-1 py-2 px-2 bg-slate-900 border border-slate-850 hover:bg-slate-850 rounded-lg text-[10px] font-bold text-center text-zinc-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-2 px-2 bg-rose-950/20 border border-rose-900/30 hover:bg-rose-950/40 rounded-lg text-[10px] font-bold text-center text-rose-450 transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* CONTENT INNER CONTAINER */}
      <div className="flex-1 min-w-0 lg:pl-72 flex flex-col relative z-10">
        
        {/* TOP BAR / NAVIGATION HEADER */}
        <header className="h-20 bg-white border-b border-zinc-150/70 px-4 sm:px-8 flex items-center justify-between shrink-0 relative z-25">
          
          <div className="flex items-center gap-4">
            {/* Hamburger menu trigger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 active:scale-95 transition-all text-zinc-650 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Title / Description */}
            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg font-extrabold text-zinc-900 tracking-tight leading-none">
                {getPageTitle()}
              </h2>
              <span className="text-[10px] sm:text-xs text-zinc-450 font-semibold mt-1.5 hidden sm:inline-block">
                MaxValue credits dashboard controls
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Input Box */}
            <div
              className={`hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border transition-all duration-350 max-w-64 bg-zinc-50/50 ${
                searchFocused ? "border-[#147FC3] bg-white ring-2 ring-[#147FC3]/10" : "border-zinc-200"
              }`}
            >
              <Search className={`w-4 h-4 transition-colors ${searchFocused ? "text-[#147FC3]" : "text-zinc-400"}`} />
              <input
                type="text"
                placeholder="Quick search (ID, client, loan)..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="bg-transparent border-none outline-none text-xs font-semibold text-zinc-700 placeholder-zinc-400 p-0 focus:ring-0 w-44"
              />
            </div>

            {/* Notification system */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:bg-zinc-50 cursor-pointer relative ${
                  showNotifications ? "border-[#147FC3] bg-[#147FC3]/5 text-[#147FC3]" : "border-zinc-200 text-zinc-650"
                }`}
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    {/* Notification Popover backdrop */}
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2.5 w-80 bg-white border border-zinc-205 rounded-2xl shadow-xl z-50 overflow-hidden font-sans"
                    >
                      <div className="p-4 bg-zinc-50 border-b border-zinc-150 flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-800">Notifications ({unreadCount} new)</span>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-[10px] font-bold text-[#147FC3] hover:underline cursor-pointer"
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                      <div className="divide-y divide-zinc-100 max-h-64 overflow-y-auto">
                        {notifications.map((item) => (
                          <div
                            key={item.id}
                            className={`p-3.5 hover:bg-zinc-50/70 transition-colors flex gap-2.5 items-start ${
                              item.unread ? "bg-sky-50/20" : ""
                            }`}
                          >
                            <div className="mt-1">
                              <span className={`w-1.5 h-1.5 rounded-full block ${item.unread ? "bg-amber-400" : "bg-zinc-305"}`} />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-zinc-700 leading-normal">{item.text}</p>
                              <span className="text-[9px] font-semibold text-zinc-400 mt-1 block">{item.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-zinc-50/50 border-t border-zinc-150 text-center">
                        <span className="text-[10px] font-bold text-zinc-500 hover:text-[#147FC3] transition-colors cursor-pointer">
                          View all activities
                        </span>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Quick avatar wrapper */}
            <div className="flex items-center gap-2.5 pl-1.5 sm:border-l sm:border-zinc-200">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 hidden sm:flex items-center justify-center font-bold text-xs text-[#FCA038]">
                AD
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-bold text-zinc-850 leading-none">Admin Room</span>
                <span className="text-[9px] font-semibold text-zinc-400 mt-1">Super User</span>
              </div>
            </div>

          </div>

        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 relative">
          {children}
        </main>

      </div>

    </div>
  );
}
