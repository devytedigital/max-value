"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/adminlogin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}
