"use client";

import {usePathname} from "next/navigation";
import {AIChatbot} from "@/components/AI";

/**
 * Wrapper component to conditionally show/hide the AI Chatbot
 * Hides the chatbot on cart, checkout, and order details pages for better UX
 */
export default function AIChatbotWrapper() {
  const pathname = usePathname();

  // Hide AI chatbot on cart, checkout, and order details pages
  if (
    pathname === "/cart" ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/orders/")
  ) {
    return null;
  }

  return <AIChatbot />;
}
