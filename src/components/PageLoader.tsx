"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const DURATION_MS = 1500; // 1.5 seconds loading animation duration

const getRouteTitle = (path: string): string => {
  if (!path || path === "/") return "Home";
  const cleanPath = path.split("?")[0].split("#")[0];

  const routeTitles: Record<string, string> = {
    "/": "Home",
    "/about-us": "About Us",
    "/board-of-directors": "Board of Directors",
    "/branch-network": "Branch Network",
    "/business-loan": "Business Loan",
    "/career": "Careers",
    "/contact": "Contact Us",
    "/contact-us": "Contact Us",
    "/gold-loan": "Gold Loan",
    "/grievance": "Grievance Redressal",
    "/media": "Media & Gallery",
    "/microfinance": "Microfinance",
    "/news": "News & Updates",
    "/traders-loan": "Traders Loan",
    "/vehicle-loan": "Vehicle Loan",
    "/adminpanel": "Admin Portal",
  };

  if (routeTitles[cleanPath]) {
    return routeTitles[cleanPath];
  }

  // Formatting helper for unknown routes (e.g. /some-page -> Some Page)
  const formatted = cleanPath
    .replace(/^\//, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return formatted || "MaxValue";
};

function PageLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [displayRoute, setDisplayRoute] = useState("");
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startLoading = useCallback((targetUrl?: string) => {
    const routeName = getRouteTitle(targetUrl || window.location.pathname);
    setDisplayRoute(routeName);
    setIsLoading(true);
    setProgress(0);

    startTimeRef.current = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentPct = Math.min(Math.round((elapsed / DURATION_MS) * 100), 100);
      setProgress(currentPct);

      if (elapsed < DURATION_MS) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(updateProgress);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsLoading(false);
      // Reset scroll position on new route load for seamless experience
      window.scrollTo({ top: 0, behavior: "instant" });
    }, DURATION_MS);
  }, []);

  // Intercept anchor link clicks across the app
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external, hashes, mailto, tel, downloads, blank target
      if (
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.getAttribute("target") === "_blank" ||
        target.hasAttribute("download")
      ) {
        return;
      }

      try {
        const targetUrlObj = new URL(href, window.location.href);
        const targetPathName = targetUrlObj.pathname;
        const currentPathName = window.location.pathname;

        // Skip loading if navigating to exact same pathname without query string changes
        if (targetPathName === currentPathName && targetUrlObj.search === window.location.search) {
          return;
        }

        startLoading(targetPathName);
      } catch {
        // Fallback if URL parsing fails
      }
    };

    const handlePopState = () => {
      startLoading(window.location.pathname);
    };

    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [startLoading]);

  // Trigger when pathname or searchParams change programmatically
  const prevPathRef = useRef<string>("");
  useEffect(() => {
    const currentPathStr = pathname + (searchParams ? searchParams.toString() : "");
    if (prevPathRef.current && prevPathRef.current !== currentPathStr) {
      if (!isLoading) {
        startLoading(pathname);
      }
    }
    prevPathRef.current = currentPathStr;
  }, [pathname, searchParams, isLoading, startLoading]);

  // Clean up animation frames & timeouts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -12,
            scale: 0.98,
            transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
          }}
className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-2xl text-slate-900 select-none overflow-hidden"        >
          {/* Ambient Glowing Background Orbs */}
          <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#147FC3]/25 rounded-full blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#FCA038]/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />

          {/* Grid Overlay pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

          {/* Centerpiece Container */}
          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">

            {/* Logo Emblem with Dual Rotating Gradient Rings */}
            <div className="relative mb-8 flex items-center justify-center">
              {/* Outer Counter-Rotating Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute -inset-5 rounded-full"
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#147FC3" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#FCA038" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#147FC3" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="url(#ringGrad1)"
                    strokeWidth="2.5"
                    strokeDasharray="180 60"
                  />
                </svg>
              </motion.div>

              {/* Inner Rotating Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute -inset-2 rounded-full"
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FCA038" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#147FC3" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="url(#ringGrad2)"
                    strokeWidth="2"
                    strokeDasharray="120 90"
                  />
                </svg>
              </motion.div>

              {/* Logo Glass Box */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border border-slate-200 shadow-2xl backdrop-blur-xl  p-4 shadow-[0_0_50px_rgba(20,127,195,0.35)] flex items-center justify-center"
              >
                <Image
                  src="/maxvalue-logo.png"
                  alt="MaxValue Logo"
                  width={90}
                  height={90}
                  className="object-contain drop-shadow-md"
                  priority
                />
              </motion.div>
            </div>

            {/* Destination Title & Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.35 }}
              className="space-y-1 mb-6"
            >
              <div className="text-xs uppercase tracking-[0.25em] text-[#147FC3] font-semibold flex items-center justify-center gap-1.5">
                <span>Navigating</span>
                <span className="inline-flex gap-0.5">
                  <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-slate-900">
                {displayRoute}
              </h2>

              <p className="text-xs text-slate-500 font-medium tracking-wide">
                MaxValue Financial Services
              </p>
            </motion.div>

            {/* Shimmering Progress Bar */}
            <div className="w-full space-y-2">
              <div className="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden p-[1px] border border-slate-300 shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#147FC3] via-[#FCA038] to-[#147FC3] shadow-[0_0_15px_rgba(252,160,56,0.6)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              {/* Live Percentage Status */}
              <div className="flex justify-between items-center text-[11px] font-mono text-stone-400">
                <span className="text-stone-500">Preparing interface...</span>
                <span className="font-semibold text-[#FCA038]">{progress}%</span>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PageLoader() {
  return (
    <Suspense fallback={null}>
      <PageLoaderContent />
    </Suspense>
  );
}
