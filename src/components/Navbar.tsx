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
  ChevronRight
} from "lucide-react";

// Social SVG Icons
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Interlocking MaxValue Arrows Logo SVG
const MaxValueLogo = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 text-[#147FC3]" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
    {/* Outter Diamond outline */}
    <path d="M50 10 L88 48 L50 86 L12 48 Z" />
    {/* Inner split */}
    <path d="M50 25 L50 71" />
    {/* Interlocking arrows */}
    <path d="M30 48 L50 28 L70 48" />
    <path d="M30 48 L50 68 L70 48" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("HOME");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    <div className={`w-full flex flex-col z-50 bg-white shadow-sm font-sans select-none fixed top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    }`}>
      
      {/* 1. TOP BAR (Thin grey-tan layout) - MUTED FOR CLIENT REVIEW
      <div className="w-full bg-[#ECEAE7] text-zinc-600 border-b border-zinc-200/50 py-2 px-4 md:px-8 text-[11px] font-medium transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-center sm:text-left">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-zinc-500" />
              Mon - Sat 9.30 am - 5.30 pm
            </span>
            <span className="hidden sm:inline text-zinc-300">|</span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-zinc-500" />
              Customer care : 0487 2422799 / 0487 6690274
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="mailto:grievances@maxvaluecredits.com" className="flex items-center gap-1.5 hover:text-[#147FC3] transition-colors">
              <Mail className="h-3.5 w-3.5 text-zinc-500" />
              grievances@maxvaluecredits.com
            </a>
            <span className="hidden md:inline text-zinc-300">|</span>
            
            <div className="flex items-center gap-3">
              <button className="hover:text-[#147FC3] transition-colors">
                <Search className="h-3.5 w-3.5 text-zinc-500" />
              </button>
              <span className="text-zinc-300">|</span>

              <div className="flex items-center gap-2.5">
                <a href="#" className="hover:text-[#147FC3] transition-colors"><InstagramIcon className="h-3.5 w-3.5" /></a>
                <a href="#" className="hover:text-[#147FC3] transition-colors"><FacebookIcon className="h-3.5 w-3.5" /></a>
                <a href="#" className="hover:text-[#147FC3] transition-colors"><YoutubeIcon className="h-3.5 w-3.5" /></a>
                <a href="#" className="hover:text-[#147FC3] transition-colors"><TwitterIcon className="h-3.5 w-3.5" /></a>
                <a href="#" className="hover:text-[#147FC3] transition-colors"><LinkedinIcon className="h-3.5 w-3.5" /></a>
              </div>
            </div>

          </div>

        </div>
      </div>
      */}

      {/* 2. MAIN LOGO BAR (White background) */}
      <div className="w-full bg-white py-4 px-4 md:px-8 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Toll Free (Left side) */}
          <div className="hidden lg:flex items-center gap-3 w-1/4">
            <div className="h-10 w-10 rounded-full bg-[#FCA038]/10 flex items-center justify-center text-[#FCA038]">
              <Headphones className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Toll free</span>
              <span className="text-sm font-bold text-[#147FC3]">1800 425 22799</span>
            </div>
          </div>

          {/* Logo Brand (Middle Section) */}
          <div className="flex items-center justify-center flex-1 lg:flex-initial">
            <Link href="/" className="flex items-center">
              <img 
                src="/maxvalue-logo.png" 
                alt="MAXVALUE Credits and Investments LTD" 
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Pay Online & Gold Rate (Right side) */}
          <div className="hidden sm:flex flex-col items-end gap-2 text-right w-1/4">
            <button className="bg-white text-[#147FC3] border border-[#147FC3] hover:bg-[#147FC3] hover:text-white active:bg-[#FCA038] active:border-[#FCA038] text-xs font-bold py-1.5 px-4 rounded cursor-pointer transition-all duration-300 shadow-sm active:scale-95">
              Pay Online
            </button>
            <div className="text-[11px] font-medium text-zinc-600">
              Today's Gold Rate:{" "}
              <span className="font-bold text-[#FCA038] text-xs">13279</span>{" "}
              <span className="text-[10px] text-zinc-500">/gram</span>
            </div>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

        </div>
      </div>

      {/* 3. MENU NAVIGATION BAR (Solid blue background) */}
      <nav className="hidden lg:block w-full bg-[#147FC3]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center relative">
            <div className="flex items-center flex-wrap">
              {menuItems.map((item) => {
                const isCorporate = item === "CORPORATE";
                const isServices = item === "OUR SERVICES";
                const isContactUs = item === "CONTACT US";
                return (
                  <div key={item} className="relative group">
                    {isContactUs ? (
                      <Link
                        href="/contact-us"
                        onClick={() => setActiveMenu(item)}
                        className={`block px-3 xl:px-5 py-4 text-xs font-bold tracking-wider transition-colors relative cursor-pointer ${
                          activeMenu === item
                            ? "text-[#FCA038]"
                            : "text-white hover:text-[#FCA038]"
                        }`}
                      >
                        {item}
                        {activeMenu === item && (
                          <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FCA038]" />
                        )}
                      </Link>
                    ) : item === "HOME" ? (
                      <Link
                        href="/"
                        onClick={() => setActiveMenu(item)}
                        className={`block px-3 xl:px-5 py-4 text-xs font-bold tracking-wider transition-colors relative cursor-pointer ${
                          activeMenu === item
                            ? "text-[#FCA038]"
                            : "text-white hover:text-[#FCA038]"
                        }`}
                      >
                        {item}
                        {activeMenu === item && (
                          <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FCA038]" />
                        )}
                      </Link>
                    ) : (
                      <button
                        onClick={() => setActiveMenu(item)}
                        className={`px-3 xl:px-5 py-4 text-xs font-bold tracking-wider transition-colors relative cursor-pointer ${
                          activeMenu === item
                            ? "text-[#FCA038]"
                            : "text-white hover:text-[#FCA038]"
                        }`}
                      >
                        {item}
                        {activeMenu === item && (
                          <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FCA038]" />
                        )}
                      </button>
                    )}

                    {isCorporate && (
                      <div className="absolute top-full left-0 bg-white shadow-xl py-5 px-6 min-w-[220px] flex flex-col gap-4 border-b-4 border-[#FCA038] hidden group-hover:flex z-50">
                        <Link 
                          href="/about-us"
                          className="text-xs font-extrabold tracking-wider text-[#147FC3] hover:text-[#FCA038] cursor-pointer transition-colors text-left"
                        >
                          ABOUT US
                        </Link>
                        <Link 
                          href="/board-of-directors"
                          className="text-xs font-extrabold tracking-wider text-[#147FC3] hover:text-[#FCA038] cursor-pointer transition-colors text-left"
                        >
                          BOARD OF DIRECTORS
                        </Link>
                      </div>
                    )}

                    {isServices && (
                      <div className="absolute top-full left-0 bg-white shadow-xl py-5 px-6 min-w-[220px] flex flex-col gap-4 border-b-4 border-[#FCA038] hidden group-hover:flex z-50">
                        <Link 
                          href="/gold-loan"
                          className="text-xs font-extrabold tracking-wider text-[#147FC3] hover:text-[#FCA038] cursor-pointer transition-colors text-left"
                        >
                          GOLD LOAN
                        </Link>
                        <Link 
                          href="/vehicle-loan"
                          className="text-xs font-extrabold tracking-wider text-[#147FC3] hover:text-[#FCA038] cursor-pointer transition-colors text-left"
                        >
                          VEHICLE LOAN
                        </Link>
                        <Link 
                          href="/business-loan"
                          className="text-xs font-extrabold tracking-wider text-[#147FC3] hover:text-[#FCA038] cursor-pointer transition-colors text-left"
                        >
                          BUSINESS LOAN
                        </Link>
                        <Link 
                          href="/microfinance"
                          className="text-xs font-extrabold tracking-wider text-[#147FC3] hover:text-[#FCA038] cursor-pointer transition-colors text-left"
                        >
                          MICROFINANCE
                        </Link>
                        <Link 
                          href="/money-transfer"
                          className="text-xs font-extrabold tracking-wider text-[#147FC3] hover:text-[#FCA038] cursor-pointer transition-colors text-left"
                        >
                          MONEY TRANSFER
                        </Link>
                      </div>
                    )}

                    {isContactUs && (
                      <div className="absolute top-full left-0 bg-white shadow-xl py-5 px-6 min-w-[220px] flex flex-col gap-4 border-b-4 border-[#FCA038] hidden group-hover:flex z-50">
                        <Link 
                          href="/contact-us"
                          className="text-xs font-extrabold tracking-wider text-[#147FC3] hover:text-[#FCA038] cursor-pointer transition-colors text-left"
                        >
                          CONTACT US
                        </Link>
                        <Link 
                          href="/grievance"
                          className="text-xs font-extrabold tracking-wider text-[#147FC3] hover:text-[#FCA038] cursor-pointer transition-colors text-left"
                        >
                          GRIEVANCE
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden flex justify-end">
          {/* Backdrop blur */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Slide out menu */}
          <div className="relative w-4/5 max-w-xs h-full bg-white shadow-2xl flex flex-col justify-between py-6 px-5 z-10 transition-transform overflow-y-auto">
            
            {/* Top row */}
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="font-black text-sm text-[#147FC3] tracking-wider">NAVIGATE</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-zinc-500 hover:bg-zinc-100 cursor-pointer"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Menu lists */}
              <div className="flex flex-col divide-y divide-zinc-100">
                <Link
                  href="/"
                  onClick={() => { setActiveMenu("HOME"); setMobileMenuOpen(false); }}
                  className={`py-3 text-left text-xs font-bold tracking-wider flex items-center justify-between transition-colors ${activeMenu === "HOME" ? "text-[#147FC3]" : "text-zinc-700 hover:text-[#147FC3]"}`}
                >
                  HOME <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
                
                <div className="py-2 flex flex-col gap-1.5">
                  <Link
                    href="/about-us"
                    onClick={() => { setActiveMenu("CORPORATE"); setMobileMenuOpen(false); }}
                    className="py-1 text-left text-xs font-bold tracking-wider text-zinc-700 hover:text-[#147FC3] flex items-center justify-between"
                  >
                    ABOUT US <ChevronRight className="h-4 w-4 opacity-50" />
                  </Link>
                  <Link
                    href="/board-of-directors"
                    onClick={() => { setActiveMenu("CORPORATE"); setMobileMenuOpen(false); }}
                    className="py-1 text-left text-xs font-bold tracking-wider text-zinc-700 hover:text-[#147FC3] flex items-center justify-between"
                  >
                    BOARD OF DIRECTORS <ChevronRight className="h-4 w-4 opacity-50" />
                  </Link>
                </div>

                <Link
                  href="/contact-us"
                  onClick={() => { setActiveMenu("CONTACT US"); setMobileMenuOpen(false); }}
                  className={`py-3 text-left text-xs font-bold tracking-wider flex items-center justify-between transition-colors ${activeMenu === "CONTACT US" ? "text-[#147FC3]" : "text-zinc-700 hover:text-[#147FC3]"}`}
                >
                  CONTACT US <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>

                <Link
                  href="/grievance"
                  onClick={() => { setActiveMenu("CONTACT US"); setMobileMenuOpen(false); }}
                  className={`py-3 text-left text-xs font-bold tracking-wider flex items-center justify-between transition-colors ${pathname === "/grievance" ? "text-[#147FC3]" : "text-zinc-700 hover:text-[#147FC3]"}`}
                >
                  GRIEVANCE REDRESSAL <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              </div>
            </div>

            {/* Bottom info */}
            <div className="flex flex-col gap-4 border-t border-zinc-100 pt-6 text-center sm:text-left">
              <button className="w-full bg-white text-[#147FC3] border border-[#147FC3] hover:bg-[#147FC3] hover:text-white active:bg-[#FCA038] active:border-[#FCA038] text-xs font-bold py-2.5 rounded cursor-pointer transition-all duration-300 active:scale-95">
                Pay Online
              </button>
              <div className="text-[11px] font-bold text-zinc-500">
                Toll Free: <span className="text-[#147FC3]">1800 425 22799</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
