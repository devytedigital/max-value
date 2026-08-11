"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
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
  const [goldRate, setGoldRate] = useState<number | null>(null);

  useEffect(() => {
    const docRef = doc(db, "blogs", "gold-rate-settings");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.rate) {
          setGoldRate(data.rate);
        }
      }
    }, (err) => {
      // Fail silently
    });
    return () => unsubscribe();
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("HOME");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [mobileCorporateOpen, setMobileCorporateOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isLightPage = pathname !== "/" && pathname !== "";

  const isHeaderLight = isScrolled || isLightPage;

  const useCapsule = (pathname === "/" || pathname === "") && !isScrolled;

  useEffect(() => {
    if (!pathname) return;
    if (pathname === "/" || pathname === "") {
      setActiveMenu("HOME");
    } else if (pathname === "/about-us" || pathname === "/board-of-directors" || pathname.startsWith("/corporate")) {
      setActiveMenu("CORPORATE");
    } else if (pathname === "/our-services" || pathname === "/gold-loan" || pathname === "/vehicle-loan" || pathname === "/business-loan" || pathname === "/traders-loan" || pathname === "/microfinance") {
      setActiveMenu("OUR SERVICES");
    } else if (pathname === "/media") {
      setActiveMenu("MEDIA");
    } else if (pathname === "/career") {
      setActiveMenu("CAREER");
    } else if (pathname === "/news") {
      setActiveMenu("NEWS");
    } else if (pathname === "/blog" || pathname.startsWith("/blog/")) {
      setActiveMenu("BLOG");
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
    if (item === "BLOG") return "/blog";
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
    "BLOG",
    "BRANCH NETWORK",
    "CONTACT US"
  ];

  return (
    <>
      <div className={`w-full z-50 fixed top-0 left-0 right-0 select-none font-sans transition-all duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isHeaderLight
          ? "bg-[#FAF9F6]/90 backdrop-blur-xl border-b border-zinc-200/60 shadow-md"
          : isScrolled
            ? "bg-[#0c141c]/45 backdrop-blur-xl border-b border-white/10 shadow-lg"
            : "bg-transparent border-b border-transparent"
        }`}>
        {/* Subtle background grid lines pattern */}
        <div className={`absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"
          }`} />

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
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
                      className="h-11 md:h-14 w-auto object-contain"
                    />
                  </div>
                </Link>
              </div>

              {/* Centered navigation pill capsule (Desktop only) */}
              <div className={`hidden lg:flex items-center rounded-full px-1.5 py-1 border transition-all duration-300 ${useCapsule
                  ? "bg-white/5 border-white/10 backdrop-blur-xl shadow-inner"
                  : "bg-transparent border-transparent"
                }`}>
                <div className="flex items-center gap-1 bg-transparent">
                  {menuItems.map((item) => {
                    const isCorporate = item === "CORPORATE";
                    const isServices = item === "OUR SERVICES";
                    const isContactUs = item === "CONTACT US";
                    const isActive = activeMenu === item;
                    const href = getHref(item);
                    const hasDropdown = isCorporate || isServices || isContactUs;

                    const linkClass = `px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300 flex items-center gap-0.5 cursor-pointer select-none ${isActive
                        ? isHeaderLight
                          ? "bg-[#147FC3] text-white shadow-md font-bold"
                          : "bg-white text-zinc-950 shadow-md font-bold"
                        : isHeaderLight
                          ? "text-zinc-700 hover:text-[#147FC3] hover:bg-zinc-950/5"
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
                          <div className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 border shadow-2xl rounded-2xl py-3 px-4 min-w-[200px] flex flex-col gap-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-left backdrop-blur-xl ${isHeaderLight
                              ? "bg-[#FAF9F6]/95 border-zinc-200/80"
                              : "bg-[#0c141c]/40 border-white/10"
                            }`}>
                            <Link
                              href="/about-us"
                              className={`text-[11px] font-bold tracking-wider cursor-pointer transition-colors ${isHeaderLight
                                  ? "text-zinc-700 hover:text-[#147FC3]"
                                  : "text-zinc-300 hover:text-[#FCA038]"
                                }`}
                            >
                              ABOUT US
                            </Link>
                            <Link
                              href="/board-of-directors"
                              className={`text-[11px] font-bold tracking-wider cursor-pointer transition-colors ${isHeaderLight
                                  ? "text-zinc-700 hover:text-[#147FC3]"
                                  : "text-zinc-300 hover:text-[#FCA038]"
                                }`}
                            >
                              BOARD OF DIRECTORS
                            </Link>
                          </div>
                        )}

                        {isServices && (
                          <div className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 border shadow-2xl rounded-2xl py-4 px-5 min-w-[200px] flex flex-col gap-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-left backdrop-blur-xl ${isHeaderLight
                              ? "bg-[#FAF9F6]/95 border-zinc-200/80"
                              : "bg-[#0c141c]/40 border-white/10"
                            }`}>
                            <Link
                              href="/gold-loan"
                              className={`text-[11px] font-bold tracking-wider cursor-pointer transition-colors ${isHeaderLight
                                  ? "text-zinc-700 hover:text-[#147FC3]"
                                  : "text-zinc-300 hover:text-[#FCA038]"
                                }`}
                            >
                              GOLD LOAN
                            </Link>
                            <Link
                              href="/vehicle-loan"
                              className={`text-[11px] font-bold tracking-wider cursor-pointer transition-colors ${isHeaderLight
                                  ? "text-zinc-700 hover:text-[#147FC3]"
                                  : "text-zinc-300 hover:text-[#FCA038]"
                                }`}
                            >
                              VEHICLE LOAN
                            </Link>
                            <Link
                              href="/business-loan"
                              className={`text-[11px] font-bold tracking-wider cursor-pointer transition-colors ${isHeaderLight
                                  ? "text-zinc-700 hover:text-[#147FC3]"
                                  : "text-zinc-300 hover:text-[#FCA038]"
                                }`}
                            >
                              BUSINESS LOAN
                            </Link>
                            <Link
                              href="/microfinance"
                              className={`text-[11px] font-bold tracking-wider cursor-pointer transition-colors ${isHeaderLight
                                  ? "text-zinc-700 hover:text-[#147FC3]"
                                  : "text-zinc-300 hover:text-[#FCA038]"
                                }`}
                            >
                              MICROFINANCE
                            </Link>
                          </div>
                        )}

                        {isContactUs && (
                          <div className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 border shadow-2xl rounded-2xl py-3 px-4 min-w-[200px] flex flex-col gap-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-left backdrop-blur-xl ${isHeaderLight
                              ? "bg-[#FAF9F6]/95 border-zinc-200/80"
                              : "bg-[#0c141c]/40 border-white/10"
                            }`}>
                            <Link
                              href="/contact-us"
                              className={`text-[11px] font-bold tracking-wider cursor-pointer transition-colors ${isHeaderLight
                                  ? "text-zinc-700 hover:text-[#147FC3]"
                                  : "text-zinc-300 hover:text-[#FCA038]"
                                }`}
                            >
                              CONTACT US
                            </Link>
                            <Link
                              href="/grievance"
                              className={`text-[11px] font-bold tracking-wider cursor-pointer transition-colors ${isHeaderLight
                                  ? "text-zinc-700 hover:text-[#147FC3]"
                                  : "text-zinc-300 hover:text-[#FCA038]"
                                }`}
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
                <div className={`flex flex-col text-right pr-3 border-r mr-3 transition-colors duration-300 ${isHeaderLight
                    ? "border-zinc-200"
                    : "border-white/10"
                  }`}>
                  <span className={`text-[8.5px] uppercase tracking-widest font-bold leading-none ${isHeaderLight
                      ? "text-zinc-500"
                      : "text-zinc-400"
                    }`}>Gold Live Price</span>
                  <span className="text-xs font-bold text-[#FCA038] mt-0.5 leading-none">
                    ₹{goldRate ? goldRate.toLocaleString("en-IN") : "7,250"}<span className={`text-[9.5px] font-medium font-sans ${isHeaderLight ? "text-zinc-500" : "text-zinc-550"}`}>/g</span>
                  </span>
                </div>

                {/* Pay Now Button */}
                <button className="bg-[#FCA038] hover:bg-[#e08922] text-zinc-955 font-bold text-[10.5px] px-4 py-2 rounded-full transition-all duration-300 shadow-md shadow-[#FCA038]/10 hover:shadow-[#FCA038]/25 active:scale-95 cursor-pointer">
                  Pay Now
                </button>
              </div>
            </div>

            {/* MOBILE/TABLET NAVBAR VIEW */}
            <div className="flex lg:hidden items-center justify-between w-full">
              {/* Left: Hamburger menu toggle icon & brand logo */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className={`p-2 -ml-2 rounded-lg transition-colors cursor-pointer ${isHeaderLight
                      ? "text-zinc-800 hover:bg-zinc-950/5"
                      : "text-white hover:bg-white/10"
                    }`}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <Link href="/" className="flex items-center">
                  <img
                    src="/maxvalue-logo.png"
                    alt="MAXVALUE Credits and Investments LTD"
                    className="h-7 w-auto object-contain"
                  />
                </Link>
              </div>

              {/* Right: Gold Live Price & Pay Now Button */}
              <div className="flex items-center gap-3">
                {/* Gold Live Price Indicator */}
                <div className="flex flex-col text-right">
                  <span className={`text-[7.5px] uppercase tracking-widest font-bold leading-none ${isHeaderLight
                      ? "text-zinc-500"
                      : "text-zinc-400"
                    }`}>Gold Live Price</span>
                  <span className="text-[11px] font-black text-[#FCA038] mt-0.5 leading-none">
                    ₹{goldRate ? goldRate.toLocaleString("en-IN") : "7,250"}<span className={`text-[8.5px] font-medium font-sans ${isHeaderLight ? "text-zinc-500" : "text-zinc-550"}`}>/g</span>
                  </span>
                </div>

                {/* Pay Now Button */}
                <button className="bg-[#FCA038] hover:bg-[#e08922] text-zinc-955 font-bold text-[10px] px-3.5 py-1.5 rounded-full transition-all duration-300 shadow-md shadow-[#FCA038]/10 hover:shadow-[#FCA038]/25 active:scale-95 cursor-pointer">
                  Pay Now
                </button>
              </div>
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

          <div data-lenis-prevent className="relative w-4/5 max-w-xs h-full bg-[#FAF9F6] text-zinc-900 shadow-2xl flex flex-col justify-between z-10 transition-transform overflow-hidden animate-none">

            {/* Header (Sticky at top) */}
            <div className="flex justify-between items-center py-5 px-5 border-b border-zinc-200 bg-[#FAF9F6]">
              <span className="font-bold text-sm text-[#FCA038] tracking-wider">Navigate</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-zinc-500 hover:text-zinc-900 cursor-pointer"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Gold Live Price Indicator (Mobile) */}
            <div className="px-5 py-3 bg-zinc-100 border-b border-zinc-200 flex items-center justify-between shrink-0">
              <span className="text-[10px] tracking-widest font-bold text-zinc-550">Gold Live Price</span>
              <span className="text-xs font-black text-[#FCA038]">
                ₹{goldRate ? goldRate.toLocaleString("en-IN") : "7,250"}<span className="text-[10px] font-bold text-zinc-500 font-sans">/g</span>
              </span>
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
                  Home
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
                    <span>Corporate</span>
                    <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${mobileCorporateOpen ? "rotate-180 text-[#FCA038]" : ""}`} />
                  </button>
                  {mobileCorporateOpen && (
                    <div className="pl-4 mt-1 flex flex-col gap-2 border-l-2 border-zinc-200 py-1">
                      <Link
                        href="/about-us"
                        onClick={() => { setActiveMenu("CORPORATE"); setMobileMenuOpen(false); }}
                        className="py-1 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        About Us
                      </Link>
                      <Link
                        href="/board-of-directors"
                        onClick={() => { setActiveMenu("CORPORATE"); setMobileMenuOpen(false); }}
                        className="py-1 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        Board of Directors
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
                    <span>Our Services</span>
                    <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180 text-[#FCA038]" : ""}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-4 mt-1 flex flex-col gap-2 border-l-2 border-zinc-200 py-1">
                      <Link
                        href="/gold-loan"
                        onClick={() => { setActiveMenu("OUR SERVICES"); setMobileMenuOpen(false); }}
                        className="py-1.5 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        Gold Loan
                      </Link>
                      <Link
                        href="/vehicle-loan"
                        onClick={() => { setActiveMenu("OUR SERVICES"); setMobileMenuOpen(false); }}
                        className="py-1.5 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        Vehicle Loan
                      </Link>
                      <Link
                        href="/business-loan"
                        onClick={() => { setActiveMenu("OUR SERVICES"); setMobileMenuOpen(false); }}
                        className="py-1.5 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        Business Loan
                      </Link>
                      <Link
                        href="/microfinance"
                        onClick={() => { setActiveMenu("OUR SERVICES"); setMobileMenuOpen(false); }}
                        className="py-1.5 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        Microfinance
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
                  Media
                </Link>

                {/* CAREER */}
                <Link
                  href="/career"
                  onClick={() => { setActiveMenu("CAREER"); setMobileMenuOpen(false); }}
                  className={`py-3 text-left text-xs font-bold tracking-wider flex items-center justify-between transition-colors ${activeMenu === "CAREER" ? "text-[#FCA038]" : "text-zinc-700 hover:text-[#FCA038]"}`}
                >
                  Career
                </Link>

                {/* NEWS */}
                <Link
                  href="/news"
                  onClick={() => { setActiveMenu("NEWS"); setMobileMenuOpen(false); }}
                  className={`py-3 text-left text-xs font-bold tracking-wider flex items-center justify-between transition-colors ${activeMenu === "NEWS" ? "text-[#FCA038]" : "text-zinc-700 hover:text-[#FCA038]"}`}
                >
                  News
                </Link>

                {/* BRANCH NETWORK */}
                <Link
                  href="/branch-network"
                  onClick={() => { setActiveMenu("BRANCH NETWORK"); setMobileMenuOpen(false); }}
                  className={`py-3 text-left text-xs font-bold tracking-wider flex items-center justify-between transition-colors ${activeMenu === "BRANCH NETWORK" ? "text-[#FCA038]" : "text-zinc-700 hover:text-[#FCA038]"}`}
                >
                  Branch Network
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
                    <span>Contact Us</span>
                    <ChevronDown className={`h-4 w-4 text-zinc-450 transition-transform duration-200 ${mobileContactOpen ? "rotate-180 text-[#FCA038]" : ""}`} />
                  </button>
                  {mobileContactOpen && (
                    <div className="pl-4 mt-1 flex flex-col gap-2 border-l-2 border-zinc-200 py-1">
                      <Link
                        href="/contact-us"
                        onClick={() => { setActiveMenu("CONTACT US"); setMobileMenuOpen(false); }}
                        className="py-1 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        Contact Us
                      </Link>
                      <Link
                        href="/grievance"
                        onClick={() => { setActiveMenu("CONTACT US"); setMobileMenuOpen(false); }}
                        className="py-1 text-left text-[11px] font-bold tracking-wider text-zinc-500 hover:text-[#FCA038] flex items-center justify-between"
                      >
                        Grievance Redressal
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer (Sticky at bottom) */}
            <div className="flex flex-col gap-4 border-t border-zinc-200 p-5 bg-[#FAF9F6] text-center">
              {/* Gold price display for mobile drawer */}
              <div className="flex items-center justify-between bg-zinc-950/5 border border-zinc-200/85 rounded-xl p-3">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Gold Live Price</span>
                <span className="text-sm font-black text-[#FCA038]">
                  ₹{goldRate ? goldRate.toLocaleString("en-IN") : "7,250"}{" "}
                  <span className="text-[10px] text-zinc-500 font-medium font-sans">/g</span>
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
