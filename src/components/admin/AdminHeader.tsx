"use client";

import React, { useState } from "react";
import { Search, Bell, LogOut, Menu, User, Shield, Check, Globe } from "lucide-react";

interface AdminHeaderProps {
  activeTabTitle: string;
  onLogout: () => void;
  toggleSidebar: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

export default function AdminHeader({
  activeTabTitle,
  onLogout,
  toggleSidebar,
  searchTerm,
  setSearchTerm,
}: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "New branch added: BENGALURU KORAMANGALA", time: "10m ago" },
    { id: 2, text: "Board Director details updated", time: "1h ago" },
    { id: 3, text: "3 new job applications received for Kochi", time: "2h ago" },
  ]);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span>{activeTabTitle}</span>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Live Mock UI
            </span>
          </h1>
          <p className="text-[11px] text-slate-500 hidden md:block">
            MaxValue Credits &amp; Investments Ltd Management Console
          </p>
        </div>
      </div>

      {/* Center: Quick Search */}
      <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search in ${activeTabTitle}...`}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] transition-all"
          />
        </div>
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Visit Website Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#147FC3] px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Globe className="w-3.5 h-3.5" /> View Public Site
        </a>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-slate-800">Recent Admin System Alerts</span>
                <span className="text-[10px] text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full font-semibold">
                  3 New
                </span>
              </div>
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                {notifications.map((item) => (
                  <div key={item.id} className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <p className="text-slate-700 font-medium text-[11px]">{item.text}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User Profile Badge */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-[#147FC3] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            A
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-slate-800 leading-tight">Admin User</span>
            <span className="block text-[10px] font-medium text-slate-500">admin@gmail.com</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          title="Sign Out"
          className="ml-1 sm:ml-2 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors flex items-center gap-1.5 text-xs font-semibold border border-slate-200 hover:border-rose-200 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
