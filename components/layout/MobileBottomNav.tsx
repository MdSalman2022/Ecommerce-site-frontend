"use client";

import React from "react";
import Link from "next/link";
import {Home, ShoppingCart, User} from "lucide-react";
import {useUserActivity} from "@/contexts/UserActivityProvider";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

export default function MobileBottomNav() {
  const {cart} = useUserActivity();
  const pathname = usePathname();
  const cartCount = cart?.length || 0;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 z-50 lg:hidden">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Cart - Left */}
        <Link
          href="/cart"
          className={cn(
            "flex flex-col items-center gap-1 relative transition-colors",
            pathname === "/cart" ? "text-primary" : "text-gray-500"
          )}
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div> 
        </Link>

        {/* Home - Center */}
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            pathname === "/" ? "text-primary" : "text-gray-500"
          )}
        >
          <div
            className={cn(
              "p-3 rounded-full transition-all",
              pathname === "/"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-gray-100"
            )}
          >
            <Home className="w-6 h-6" />
          </div> 
        </Link>

        {/* Profile - Right */}
        <Link
          href="/profile"
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            pathname === "/profile" ? "text-primary" : "text-gray-500"
          )}
        >
          <User className="w-6 h-6" /> 
        </Link>
      </div>
    </nav>
  );
}
