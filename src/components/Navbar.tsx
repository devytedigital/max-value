"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Clock, 
  Phone, 
  Mail, 
  Search, 
  Headphones, 
  Menu, 
  X as CloseIcon,
  ChevronRight,
  ChevronDown
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("HOME");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [mobileCorporateOpen, setMobileCorporateOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!pathname) return;
    if (pathname === "/" || pathname === "") {
      setActiveMenu("HOME");
    } else if (pathname === "/about-us" || pathname === "/board-of-directors" || pathname.startsWith("/corporate")) {
      setActiveMenu("CORPORATE");
    } else if (pathname === "/our-services" || pathname === "/gold-loan" || pathname === "/vehicle-loan" || pathname === "/business-loan" || pathname === "/microfinance" || pathname === "/money-transfer") {
      setActiveMenu("OUR SERVICES");
    } else if (pathname === "/media") {
      setActiveMenu("MEDIA");
    } else if (pathname === "/career") {
      setActiveMenu("CAREER");
    } else if (pathname === "/news") {
      setActiveMenu("NEWS");
    } else if (pathname === "/branch-network") {
      setActiveMenu("BRANCH NETWORK");
    } else if (pathname === "/contact-us" || pathname === "/grievance") {
      setActiveMenu("CONTACT US");
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down past a threshold (150px), show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const getHref = (item: string) => {
    if (item === "HOME") return "/";
    if (item === "MEDIA") return "/media";
    if (item === "CAREER") return "/career";
    if (item === "NEWS") return "/news";
    if (item === "BRANCH NETWORK") return "/branch-network";
    if (item === "CONTACT US") return "/contact-us";
    return "";
  };

  const menuItems = [
    "HOME",
    "CORPORATE",
    "OUR SERVICES",
    "MEDIA",
    "CAREER",
    "NEWS",
    "BRANCH NETWORK",
    "CONTACT US"
  ];

  return (
    <>
      <div className={`w-full z-50 fixed top-0 left-0 right-0 select-none font-sans transition-all duration-300 ease-in-out ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    } ${
      isScrolled 
        ? "bg-[#0c141c]/20 backdrop-blur-xl border-b border-white/10 shadow-lg" 
        : "bg-transparent border-b border-transparent"
    }`}>
      {/* Subtle background grid lines pattern */}
      <div className={`absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] transition-opacity duration-300 ${
        isScrolled ? "opacity-100" : "opacity-0"
      }`} />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="h-20 lg:h-22 flex items-center w-full">
          
          {/* DESKTOP NAVBAR VIEW */}
          <div className="hidden lg:flex items-center justify-between w-full gap-6">
            {/* Logo brand left */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="flex items-center justify-center">
                  <img 
                    src="/maxvalue-logo.png" 
                    alt="MAXVALUE Credits and Investments LTD" 
                    className="h-9 md:h-10 w-auto object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Centered navigation pill capsule (Desktop only) */}
            <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-1.5 py-1 backdrop-blur-xl shadow-inner">
              <div className="flex items-center gap-1 bg-transparent">
                {menuItems.map((item) => {
                  const isCorporate = item === "CORPORATE";
                  const isServices = item === "OUR SERVICES";
                  const isContactUs = item === "CONTACT US";
                  const isActive = activeMenu === item;
                  const href = getHref(item);
                  const hasDropdown = isCorporate || isServices || isContactUs;

                  const linkClass = `px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300 flex items-center gap-0.5 cursor-pointer select-none ${
                    isActive 
                      ? "bg-white text-zinc-950 shadow-md font-bold" 
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`;

                  return (
                    <div key={item} className="relative group py-0.5">
                      {href ? (
                        <Link href={href} className={linkClass} onClick={() => setActiveMenu(item)}>
                          <span>{item}</span>
                          {hasDropdown && (
                            <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                          )}
                        </Link>
                      ) : (
                        <button className={linkClass}>
                          <span>{item}</span>
                          {hasDropdown && (
                            <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                          )}
                        </button>
                      )}

                      {/* Submenu Dropdowns */}
                      {isCorporate && (
                        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#0c141c]/40 border border-white/10 shadow-2xl rounded-2xl py-3 px-4 min-w-[200px] flex flex-col gap-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-left backdrop-blur-xl">
                          <Link 
                            href="/about-us"
                            className="text-[11px] font-bold tracking-wider text-zinc-300 hover:text-[#FCA038] cursor-pointer transition-colors"
                          >
                            ABOUT US
                          </Link>
                          <Link 
                            href="/board-of-directors"
                            className="text-[11px] font-bold tracking-wider text-zinc-300 hover:text-[#FCA038] cursor-pointer transition-colors"
                          >
                            BOARD OF DIRECTORS
                          </Link>
                        </div>
                      )}

                      {isServices && (
                        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#0c141c]/40 border border-white/10 shadow-2xl rounded-2xl py-4 px-5 min-w-[200px] flex flex-col gap-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-left backdrop-blur-xl">
                          <Link 
                            href="/gold-loan"
                            className="text-[11px] font-bold tracking-wider text-zinc-300 hover:text-[#FCA038] cursor-pointer transition-colors"
                          >
                            GOLD LOAN
                          </Link>
                          <Link 
                            href="/vehicle-loan"
                            className="text-[11px] font-bold tracking-wider text-zinc-300 hover:text-[#FCA038] cursor-pointer transition-colors"
                          >
                            VEHICLE LOAN
                          </Link>
                          <Link 
                            href="/business-loan"
                            className="text-[11px] font-bold tracking-wider text-zinc-300 hover:text-[#FCA038] cursor-pointer transition-colors"
                          >
                            BUSINESS LOAN
                          </Link>
                          <Link 
                            href="/microfinance"
                            className="text-[11px] font-bold tracking-wider text-zinc-300 hover:text-[#FCA038] cursor-pointer transition-colors"
                          >
                            MICROFINANCE
                          </Link>
                          <Link 
                            href="/money-transfer"
                            className="text-[11px] font-bold tracking-wider text-zinc-300 hover:text-[#FCA038] cursor-pointer transition-colors"
                          >
                            MONEY TRANSFER
                          </Link>
                        </div>
                      )}

                      {isContactUs && (
                        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#0c141c]/40 border border-white/10 shadow-2xl rounded-2xl py-3 px-4 min-w-[200px] flex flex-col gap-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-left backdrop-blur-xl">
                          <Link 
                            href="/contact-us"
                            className="text-[11px] font-bold tracking-wider text-zinc-300 hover:text-[#FCA038] cursor-pointer transition-colors"
                          >
                            CONTACT US
                          </Link>
                          <Link 
                            href="/grievance"
                            className="text-[11px] font-bold tracking-wider text-zinc-300 hover:text-[#FCA038] cursor-pointer transition-colors"
                          >
                            GRIEVANCE REDRESSAL
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Action Block */}
            <div className="flex items-center">
              {/* Gold Live Price Indicator */}
              <div className="flex flex-col text-right pr-3 border-r border-white/10 mr-3">
                <span className="text-[8.5px] uppercase tracking-widest text-zinc-400 font-bold leading-none">Gold Live Price</span>
                <span className="text-xs font-bold text-[#FCA038] mt-0.5 leading-none">
                  ₹13,279<span className="text-[9.5px] text-zinc-550 font-medium font-sans">/g</span>
                </span>
              </div>

              {/* Pay Now Button */}
              <button className="bg-[#FCA038] hover:bg-[#e08922] text-zinc-950 font-bold text-[10.5px] px-4 py-2 rounded-full transition-all duration-300 shadow-md shadow-[#FCA038]/10 hover:shadow-[#FCA038]/25 active:scale-95 cursor-pointer">
                Pay Now
              </button>
            </div>
          </div>

          {/* MOBILE/TABLET NAVBAR VIEW */}
          <div className="flex lg:hidden items-center justify-between w-full relative">
            {/* Left: Hamburger menu toggle icon */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Center: Centered brand logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link href="/" className="flex items-center justify-center">
                <img 
                  src="/maxvalue-logo.png" 
                  alt="MAXVALUE Credits and Investments LTD" 
                  className="h-8 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Right: Action Button (Pay Now) */}
            <button className="bg-[#FCA038] hover:bg-[#e08922] text-zinc-950 font-bold text-[11px] px-4 py-2 rounded-full transition-all duration-300 shadow-md shadow-[#FCA038]/10 hover:shadow-[#FCA038]/25 active:scale-95 cursor-pointer">
              Pay Now
            </button>
          </div>

        </div>
      </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden flex justify-start">
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-white/60 backdrop-blur-sm"
          />

          <div data-lenis-prevent className="relative w-4/5 max-w-xs h-full bg-white text-zinc-900 shadow-2xl flex flex-col justify-between z-10 transition-transform overflow-hidden animate-none">
            
            {/* Header (Sticky at top) */}
            <div className="flex justify-between items-center py-5 px-5 border-b border-zinc-100 bg-white">
              <span className="font-black text-sm text-[#FCA038] tracking-wider">NAVIGATE</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-zinc-500 hover:text-zinc-900 cursor-pointer"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Middle List (Scrollable body) */}
            <div className="flex-1 min-h-0 overflow-y-auto py-4 px-5 text-left overscroll-contain">
              <div className="flex flex-col divide-y divide-zinc-100">
                {/* HOME */}
                <Link
                  href="/"
                  onClick={() => { setActiveMenu("HOME"); setMobileMenuOpen(false); }}
                  className={`py-3 text-left text-xs font-bold tracking-wider flex items-center justify-between transition-colors ${activeMenu === "HOME" ? "text-[#FCA038]" : "text-zinc-700 hover:text-[#FCA038]"}`}
                >
                  HOME
                </Link>
                
                {/* CORPORATE Accordion */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      setMobileCorporateOpen(!mobileCorporateOpen);
                      setMobileServicesOpen(false);
                      setMobileContactOpen(false);
                    }}
                    className="w-full text-left text-xs font-bold tracking-wider text-zinc-700 hover:text-[#FCA038] flex items-center justify-between py-2 bg-transparent border-none cursor-pointer animate-none"
                  >
                    <span>CORPORATE</span>
                    <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${mobileCorporateOpen ? "rotate-180 text-[#FCA038]" : ""}`} />
                  </button>
                  {mobileCorporateOpen && (
                    <div className="pl-4 mt-1 flex flex-col gap-2 border-l-2 border-zinc-200 py-1">
                      <Link
                        href="/about-us"
                        onClick={() => { setActiveMenu("CORPORATE"); setMobileMenuOpen(false); }}
                        className="py-1 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        ABOUT US
                      </Link>
                      <Link
                        href="/board-of-directors"
                        onClick={() => { setActiveMenu("CORPORATE"); setMobileMenuOpen(false); }}
                        className="py-1 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        BOARD OF DIRECTORS
                      </Link>
                    </div>
                  )}
                </div>

                {/* OUR SERVICES Accordion */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      setMobileServicesOpen(!mobileServicesOpen);
                      setMobileCorporateOpen(false);
                      setMobileContactOpen(false);
                    }}
                    className="w-full text-left text-xs font-bold tracking-wider text-zinc-700 hover:text-[#FCA038] flex items-center justify-between py-2 bg-transparent border-none cursor-pointer"
                  >
                    <span>OUR SERVICES</span>
                    <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180 text-[#FCA038]" : ""}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-4 mt-1 flex flex-col gap-2 border-l-2 border-zinc-200 py-1">
                      <Link
                        href="/gold-loan"
                        onClick={() => { setActiveMenu("OUR SERVICES"); setMobileMenuOpen(false); }}
                        className="py-1.5 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        GOLD LOAN
                      </Link>
                      <Link
                        href="/vehicle-loan"
                        onClick={() => { setActiveMenu("OUR SERVICES"); setMobileMenuOpen(false); }}
                        className="py-1.5 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        VEHICLE LOAN
                      </Link>
                      <Link
                        href="/business-loan"
                        onClick={() => { setActiveMenu("OUR SERVICES"); setMobileMenuOpen(false); }}
                        className="py-1.5 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        BUSINESS LOAN
                      </Link>
                      <Link
                        href="/microfinance"
                        onClick={() => { setActiveMenu("OUR SERVICES"); setMobileMenuOpen(false); }}
                        className="py-1.5 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        MICROFINANCE
                      </Link>
                      <Link
                        href="/money-transfer"
                        onClick={() => { setActiveMenu("OUR SERVICES"); setMobileMenuOpen(false); }}
                        className="py-1.5 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        MONEY TRANSFER
                      </Link>
                    </div>
                  )}
                </div>

                {/* MEDIA */}
                <Link
                  href="/media"
                  onClick={() => { setActiveMenu("MEDIA"); setMobileMenuOpen(false); }}
                  className={`py-3 text-left text-xs font-bold tracking-wider flex items-center justify-between transition-colors ${activeMenu === "MEDIA" ? "text-[#FCA038]" : "text-zinc-700 hover:text-[#FCA038]"}`}
                >
                  MEDIA
                </Link>

                {/* CAREER */}
                <Link
                  href="/career"
                  onClick={() => { setActiveMenu("CAREER"); setMobileMenuOpen(false); }}
                  className={`py-3 text-left text-xs font-bold tracking-wider flex items-center justify-between transition-colors ${activeMenu === "CAREER" ? "text-[#FCA038]" : "text-zinc-700 hover:text-[#FCA038]"}`}
                >
                  CAREER
                </Link>

                {/* NEWS */}
                <Link
                  href="/news"
                  onClick={() => { setActiveMenu("NEWS"); setMobileMenuOpen(false); }}
                  className={`py-3 text-left text-xs font-bold tracking-wider flex items-center justify-between transition-colors ${activeMenu === "NEWS" ? "text-[#FCA038]" : "text-zinc-700 hover:text-[#FCA038]"}`}
                >
                  NEWS
                </Link>

                {/* BRANCH NETWORK */}
                <Link
                  href="/branch-network"
                  onClick={() => { setActiveMenu("BRANCH NETWORK"); setMobileMenuOpen(false); }}
                  className={`py-3 text-left text-xs font-bold tracking-wider flex items-center justify-between transition-colors ${activeMenu === "BRANCH NETWORK" ? "text-[#FCA038]" : "text-zinc-700 hover:text-[#FCA038]"}`}
                >
                  BRANCH NETWORK
                </Link>

                {/* CONTACT US Accordion */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      setMobileContactOpen(!mobileContactOpen);
                      setMobileCorporateOpen(false);
                      setMobileServicesOpen(false);
                    }}
                    className="w-full text-left text-xs font-bold tracking-wider text-zinc-700 hover:text-[#FCA038] flex items-center justify-between py-2 bg-transparent border-none cursor-pointer"
                  >
                    <span>CONTACT US</span>
                    <ChevronDown className={`h-4 w-4 text-zinc-450 transition-transform duration-200 ${mobileContactOpen ? "rotate-180 text-[#FCA038]" : ""}`} />
                  </button>
                  {mobileContactOpen && (
                    <div className="pl-4 mt-1 flex flex-col gap-2 border-l-2 border-zinc-200 py-1">
                      <Link
                        href="/contact-us"
                        onClick={() => { setActiveMenu("CONTACT US"); setMobileMenuOpen(false); }}
                        className="py-1 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        CONTACT US
                      </Link>
                      <Link
                        href="/grievance"
                        onClick={() => { setActiveMenu("CONTACT US"); setMobileMenuOpen(false); }}
                        className="py-1 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        GRIEVANCE REDRESSAL
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer (Sticky at bottom) */}
            <div className="flex flex-col gap-4 border-t border-zinc-150 p-5 bg-white text-center">
              {/* Gold price display for mobile drawer */}
              <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200/85 rounded-xl p-3">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Gold Live Price</span>
                <span className="text-sm font-black text-[#FCA038]">
                  ₹13,279 <span className="text-[10px] text-zinc-500 font-medium font-sans">/g</span>
                </span>
              </div>

              <button className="w-full bg-[#FCA038] hover:bg-[#e08922] text-zinc-950 font-black text-xs py-2.5 rounded-full cursor-pointer transition-all duration-300 active:scale-95 shadow-md shadow-[#FCA038]/10">
                Pay Now
              </button>
              <div className="text-[11px] font-bold text-zinc-500">
                Toll Free: <span className="text-[#FCA038]">1800 425 22799</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
