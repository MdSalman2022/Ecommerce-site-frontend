"use client";

import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {AIChatbot} from "@/components/AI";

export default function AIChatbotWrapper() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };

    checkMobile();
    setIsHydrated(true);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hide AI chatbot on cart, checkout, and order details pages
  if (
    pathname === "/cart" ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/orders/")
  ) {
    return null;
  }

  // On mobile, only show on landing page, category pages, and product pages
  if (isHydrated && isMobile) {
    const isAllowedPage =
      pathname === "/" || // Landing page
      pathname.startsWith("/category") || // Category pages
      pathname.startsWith("/search") || // Search results
      /^\/\[category\]/.test(pathname); // Dynamic category routes

    if (!isAllowedPage) {
      return null;
    }
  }

  return <AIChatbot />;
}
