"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import {
  MapPin,
  Phone,
  Mail,
  ChevronUp,
  PhoneCall,
  Calendar,
  Layers,
  Clock
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

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M9 11a2.4 2.4 0 0 0 2 2h0a2.4 2.4 0 0 0 2-2" />
  </svg>
);

export default function Footer() {
  const lenis = useLenis();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#FAF9F6] text-zinc-600 pt-12 font-sans relative select-none border-t-2 border-[#FCA038]">

      {/* Footer Main Columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

        {/* Column 1: Corporate Office */}
        <div className="flex flex-col text-left">
          <h4 className="font-extrabold text-sm text-[#147FC3] tracking-wider mb-5 uppercase">
            Corporate Office
          </h4>
          <ul className="flex flex-col gap-4 text-xs font-semibold leading-relaxed">
            <li className="flex gap-2.5 items-start">
              <MapPin className="h-4.5 w-4.5 text-[#147FC3] mt-0.5 shrink-0" />
              <span>
                1st Floor Cee Kay Plaza,<br />
                Opp. Metropolitan Hospital Koorkencherry,<br />
                Thrissur, Kerala - 680007
              </span>
            </li>
            <li className="flex gap-2.5 items-start">
              <Phone className="h-4.5 w-4.5 text-[#147FC3] mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider mb-0.5">
                  Customer Care
                </span>
                <div className="flex flex-wrap gap-1">
                  <a href="tel:04872422799" className="hover:text-[#147FC3] transition-colors">
                    0487 2422799
                  </a>
                  <span className="text-zinc-350">/</span>
                  <a href="tel:04876690274" className="hover:text-[#147FC3] transition-colors">
                    0487 6690274
                  </a>
                </div>
              </div>
            </li>
            <li className="flex gap-2.5 items-start">
              <Clock className="h-4.5 w-4.5 text-[#147FC3] mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider mb-0.5">
                  Working Hours
                </span>
                <span>Mon - Sat: 9.30 am - 5.30 pm</span>
              </div>
            </li>
            <li className="flex gap-2.5 items-start">
              <Mail className="h-4.5 w-4.5 text-[#147FC3] mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider mb-0.5">
                  Email
                </span>
                <a href="mailto:info@maxvaluecredits.com" className="hover:text-[#147FC3] transition-colors">
                  info@maxvaluecredits.com
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 2: Bangalore Regional Office */}
        <div className="flex flex-col text-left">
          <h4 className="font-extrabold text-sm text-[#147FC3] tracking-wider mb-5 uppercase">
            Bangalore Regional Office
          </h4>
          <ul className="flex flex-col gap-4 text-xs font-semibold leading-relaxed">
            <li className="flex gap-2.5 items-start">
              <MapPin className="h-4.5 w-4.5 text-[#147FC3] mt-0.5 shrink-0" />
              <span>
                GVS Complex, No. 329, 10th A main Road,<br />
                3rd Block Jayanagar, Bangalore,<br />
                Karnataka - 560011
              </span>
            </li>
            <li className="flex gap-2.5 items-start">
              <Phone className="h-4.5 w-4.5 text-[#147FC3] mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider mb-0.5">
                  Phone
                </span>
                <a href="tel:08029650516" className="hover:text-[#147FC3] transition-colors">
                  08029650516
                </a>
              </div>
            </li>
            <li className="flex gap-2.5 items-start">
              <Clock className="h-4.5 w-4.5 text-[#147FC3] mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider mb-0.5">
                  Working Hours
                </span>
                <span>Mon - Sat: 9.30 am - 5.30 pm</span>
              </div>
            </li>
            <li className="flex gap-2.5 items-start">
              <Mail className="h-4.5 w-4.5 text-[#147FC3] mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider mb-0.5">
                  Email
                </span>
                <a href="mailto:info@maxvaluecredits.com" className="hover:text-[#147FC3] transition-colors">
                  info@maxvaluecredits.com
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 3: Useful Links */}
        <div className="flex flex-col text-left">
          <h4 className="font-extrabold text-sm text-[#147FC3] tracking-wider mb-5 uppercase">
            Useful Links
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs font-bold leading-relaxed">
            {[
              { label: "About Company", href: "/about-us" },
              { label: "Gold Loan", href: "/gold-loan" },
              { label: "Vehicle Loan", href: "/vehicle-loan" },
              { label: "Business Loan", href: "/business-loan" },
              { label: "Microfinance", href: "/microfinance" },
              { label: "Financial Blog", href: "/blog" },
              { label: "Latest News", href: "/news" },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-[#147FC3] transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Profile Description & Socials */}
        <div className="flex flex-col text-left">
          <p className="text-xs font-semibold leading-relaxed text-zinc-650 mb-5">
            MAXVALUE Credits & Investments Ltd. is an innovative venture providing high quality financial services to the common man.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-[#FCA038] transition-colors text-[#147FC3]"><InstagramIcon className="h-4.5 w-4.5" /></a>
            <a href="#" className="hover:text-[#FCA038] transition-colors text-[#147FC3]"><FacebookIcon className="h-4.5 w-4.5" /></a>
            <a href="#" className="hover:text-[#FCA038] transition-colors text-[#147FC3]"><YoutubeIcon className="h-4.5 w-4.5" /></a>
            <a href="#" className="hover:text-[#FCA038] transition-colors text-[#147FC3]"><TwitterIcon className="h-4.5 w-4.5" /></a>
            <a href="#" className="hover:text-[#FCA038] transition-colors text-[#147FC3]"><LinkedinIcon className="h-4.5 w-4.5" /></a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full bg-zinc-950/5 py-4 px-6 md:px-8 border-t border-zinc-200/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] font-bold tracking-wide uppercase text-zinc-500">
          <span>
            Maxvalue Credits and Investments Ltd. &copy; 2026 All rights reserved
          </span>
          <a href="#" className="hover:text-[#147FC3] transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Floating Badges */}

      {/* 2. Scroll to Top Button (Bottom Right) */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-[49] h-10 w-10 bg-[#147FC3] text-white hover:bg-[#FCA038] active:scale-95 flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer rounded-sm"
          aria-label="Scroll to Top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

    </footer>
  );
}
