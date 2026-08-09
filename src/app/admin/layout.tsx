"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  GitBranch,
  FileSpreadsheet,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User,
  Clock,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  Image as ImageIcon,
  ChevronDown,
  Newspaper,
  ShieldAlert,
  ArrowLeft
} from "lucide-react";

interface CurrentUser {
  id?: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New Gold Loan application submitted", time: "5 mins ago", unread: true },
    { id: 2, text: "System backup completed successfully", time: "1 hour ago", unread: true },
    { id: 3, text: "High-value Business Loan approved", time: "2 hours ago", unread: false },
  ]);

  // Handle Authentication verification and user profile extraction
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      // Redirect to login if not authenticated
      router.push("/adminlogin");
    } else {
      setIsAuthenticated(true);
      const userStr = localStorage.getItem("admin_user");
      if (userStr) {
        try {
          const parsed = JSON.parse(userStr);
          setCurrentUser(parsed);
        } catch (e) {
          setCurrentUser({ name: "Administrator", email: "admin@gmail.com", role: "Admin" });
        }
      } else {
        setCurrentUser({ name: "Administrator", email: "admin@gmail.com", role: "Admin" });
      }
    }
  }, [router]);

  // Breadcrumbs/Page title resolver
  const getPageTitle = () => {
    switch (pathname) {
      case "/admin":
        return "Dashboard Overview";
      case "/admin/branches":
        return "Branch Management";
      case "/admin/careers":
        return "Careers Management";
      case "/admin/news":
        return "News Management";
      case "/admin/admins":
        return "Admin Users Management";
      case "/admin/media":
        return "Media Gallery Management";
      case "/admin/logs":
        return "System Activity Logs";
      case "/admin/settings":
        return "Security & Settings";
      default:
        return "Management Console";
    }
  };

  interface NavItem {
    name: string;
    href?: string;
    icon: any;
    badge?: string;
    adminOnly?: boolean;
    subItems?: { name: string; href: string }[];
  }

  const allNavItems: NavItem[] = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Branch Network", href: "/admin/branches", icon: GitBranch },
    { name: "Careers Management", href: "/admin/careers", icon: Briefcase },
    { name: "News Management", href: "/admin/news", icon: Newspaper },
    {
      name: "Media Management",
      icon: ImageIcon,
      subItems: [
        { name: "Photo Gallery", href: "/admin/media/gallery" },
        { name: "Video Gallery", href: "/admin/media/videos" },
        { name: "Documents", href: "/admin/media/documents" }
      ]
    },
    { name: "Admin Team", href: "/admin/admins", icon: ShieldCheck, adminOnly: true },
  ];

  // Filter navigation items for Normal Users (Hide Admin Team link)
  const navItems = allNavItems.filter((item) => {
    if (item.adminOnly) {
      return currentUser?.role !== "Normal User";
    }
    return true;
  });

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/adminlogin");
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Close menus on page transition
  useEffect(() => {
    setIsMobileOpen(false);
    setShowNotifications(false);
    if (pathname?.startsWith("/admin/media")) {
      setMediaOpen(true);
    }
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

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FCA038] animate-ping" />
            <span className="text-sm font-medium text-slate-400">Verifying session credentials...</span>
          </div>

          {/* Clean modern spinner */}
          <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#147FC3] to-[#FCA038] w-full"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => n.unread).length;

  const userInitials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "AD";

  const isRestrictedAdminRoute = pathname?.startsWith("/admin/admins") && currentUser?.role === "Normal User";

  return (
    <div
      data-lenis-prevent
      className="min-h-screen w-full bg-[#f8fafc] flex flex-col font-sans select-none antialiased relative overflow-hidden"
    >
      
      {/* DESKTOP PERMANENT SIDEBAR */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-slate-950 flex-col z-30 text-slate-300 shadow-2xl border-r border-slate-900">
        
        {/* Brand Banner */}
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
            if (item.subItems) {
              const isSubActive = pathname?.startsWith("/admin/media");
              return (
                <div key={item.name} className="space-y-1 select-none">
                  {/* Dropdown Toggle Header */}
                  <div
                    onClick={() => setMediaOpen(!mediaOpen)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isSubActive && !mediaOpen
                        ? "bg-slate-900 text-white"
                        : "hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4.5 h-4.5 text-zinc-500" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${mediaOpen ? "rotate-180 text-white" : ""}`} />
                  </div>

                  {/* Collapsible Subitems */}
                  {mediaOpen && (
                    <div className="pl-6 space-y-1 mt-1 transition-all duration-200">
                      {item.subItems.map((sub) => {
                        const isSubLinkActive = pathname === sub.href;
                        return (
                          <Link key={sub.name} href={sub.href} className="block group">
                            <div
                              className={`flex items-center justify-between px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                                isSubLinkActive
                                  ? "bg-[#147FC3] text-white shadow-sm shadow-[#147FC3]/10"
                                  : "text-zinc-400 hover:text-white hover:bg-slate-900/50"
                              }`}
                            >
                              <span>{sub.name}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href || "#"} className="block group">
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

        {/* Sidebar Footer User Details */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/50">
          {/* User Widget */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/60 border border-slate-900">
            <div className="w-10 h-10 rounded-lg bg-zinc-805 border border-zinc-700 flex items-center justify-center font-bold text-sm text-[#147FC3]">
              {userInitials}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-white truncate">
                {currentUser?.name || "Administrator"}
              </span>
              <span className="text-[10px] text-zinc-400 font-semibold truncate mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {currentUser?.role || "Admin"}
              </span>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <Link
              href="/"
              className="flex-1 py-2 px-2 bg-slate-900 border border-slate-850 hover:bg-slate-850 rounded-lg text-[10px] font-bold text-center text-zinc-400 hover:text-white transition-colors"
            >
              Public Home
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 py-2 px-2 bg-rose-950/20 border border-rose-900/30 hover:bg-rose-950/40 rounded-lg text-[10px] font-bold text-center text-rose-450 transition-colors cursor-pointer"
            >
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
                  if (item.subItems) {
                    const isSubActive = pathname?.startsWith("/admin/media");
                    return (
                      <div key={item.name} className="space-y-1 select-none text-left">
                        {/* Dropdown Toggle Header */}
                        <div
                          onClick={() => setMediaOpen(!mediaOpen)}
                          className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                            isSubActive && !mediaOpen
                              ? "bg-slate-900 text-white"
                              : "hover:bg-slate-900 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="w-4.5 h-4.5 text-zinc-500" />
                            <span>{item.name}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${mediaOpen ? "rotate-180 text-white" : ""}`} />
                        </div>

                        {/* Collapsible Subitems */}
                        {mediaOpen && (
                          <div className="pl-6 space-y-1 mt-1 transition-all duration-200">
                            {item.subItems.map((sub) => {
                              const isSubLinkActive = pathname === sub.href;
                              return (
                                <Link key={sub.name} href={sub.href} className="block group">
                                  <div
                                    className={`flex items-center justify-between px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                                      isSubLinkActive
                                        ? "bg-[#147FC3] text-white shadow-sm shadow-[#147FC3]/10"
                                        : "text-zinc-400 hover:text-white hover:bg-slate-900/50"
                                    }`}
                                  >
                                    <span>{sub.name}</span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href || "#"} className="block">
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
                    {userInitials}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs font-bold text-white truncate">
                      {currentUser?.name || "Administrator"}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-semibold truncate mt-0.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      {currentUser?.role || "Admin"}
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

            {/* Breadcrumb Info Title */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                <span>Console</span>
                <ChevronRight className="w-3 h-3 text-zinc-400" />
                <span className="text-[#147FC3]">{getPageTitle()}</span>
              </div>
              <h2 className="text-lg font-black text-zinc-900 tracking-tight leading-none mt-1">
                {getPageTitle()}
              </h2>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 rounded-xl border border-zinc-200/90 flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 active:scale-95 transition-all relative cursor-pointer"
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
                {userInitials}
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-bold text-zinc-850 leading-none">
                  {currentUser?.name || "Administrator"}
                </span>
                <span className="text-[9px] font-bold text-[#147FC3] mt-1 uppercase tracking-wider">
                  {currentUser?.role || "Admin"}
                </span>
              </div>
            </div>

          </div>

        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 p-4 sm:p-8 md:p-10 overflow-y-auto max-w-[1600px] w-full mx-auto font-sans">
          {isRestrictedAdminRoute ? (
            /* ACCESS RESTRICTED SCREEN FOR NORMAL USERS */
            <div className="py-20 text-center max-w-lg mx-auto bg-white rounded-3xl border border-zinc-200 shadow-sm p-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-black uppercase text-zinc-900 tracking-tight">
                Access Restricted
              </h2>
              <p className="text-xs font-semibold text-zinc-500 leading-relaxed max-w-sm mx-auto">
                You do not have administrative privileges to manage system users. Your account role is <strong>Normal User</strong>.
              </p>
              <div className="pt-3">
                <button
                  onClick={() => router.push("/admin")}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-950 hover:bg-[#147FC3] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            children
          )}
        </main>

      </div>

    </div>
  );
}
