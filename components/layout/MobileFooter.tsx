"use client";

import React from "react";
import Link from "next/link";
import {useUserActivity} from "@/contexts/UserActivityProvider";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {
  getFooterConfig,
  getNavItemsForVariant,
  FooterVariant,
} from "@/lib/mobileFooterConfig";

interface MobileFooterProps {
  variant?: FooterVariant;
  showLabels?: boolean;
  autoDetect?: boolean;
}
export default function MobileFooter({
  variant,
  showLabels,
  autoDetect = true,
}: MobileFooterProps) {
  const {cart} = useUserActivity();
  const pathname = usePathname();

  // Hide footer on checkout page - multiple conditions to ensure it's hidden
  const isCheckoutPage =
    pathname === "/checkout" ||
    pathname.startsWith("/checkout/") ||
    pathname.includes("checkout");

  if (isCheckoutPage) {
    return <div className="hidden" />;
  }

  // Auto-detect configuration based on page
  const autoConfig = autoDetect ? getFooterConfig(pathname) : null;
  const finalVariant = variant || autoConfig?.variant || "default";
  const finalShowLabels = showLabels ?? autoConfig?.showLabels ?? false;

  // Get navigation items for current variant
  const navItems = getNavItemsForVariant(finalVariant);

  // Get badge values
  const getBadgeValue = (badgeType: string | null | undefined) => {
    if (!badgeType) return null;

    switch (badgeType) {
      case "cart":
        return cart?.length || 0;
      case "wishlist":
        // You can connect this to wishlist context when available
        return 0;
      case "notifications":
        // You can connect this to notifications context when available
        return 0;
      default:
        return null;
    }
  };

  // Check if item is active
  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 lg:hidden print:hidden",
        "shadow-lg shadow-black/5",
        finalVariant === "extended" && "pb-safe"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-around mx-auto px-2 py-2.5",
          navItems.length <= 3 ? "max-w-md" : "max-w-lg"
        )}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          const badgeValue = getBadgeValue(item.badge);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 relative transition-all duration-200",
                "min-w-[64px] py-1.5 rounded-xl",
                active
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-700 active:scale-95"
              )}
            >
              {/* Icon with badge */}
              <div className="relative">
                <div
                  className={cn(
                    "p-2 rounded-full transition-all duration-200",
                    active ? "bg-primary/10 scale-110" : "hover:bg-gray-100"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-all duration-200",
                      active && "stroke-[2.5]"
                    )}
                  />
                </div>

                {/* Badge for cart or notifications */}
                {badgeValue !== null && badgeValue > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 shadow-md animate-in zoom-in-50">
                    {badgeValue > 99 ? "99+" : badgeValue}
                  </span>
                )}
              </div>

              {/* Label */}
              {finalShowLabels && (
                <span
                  className={cn(
                    "text-[10px] font-medium transition-all duration-200",
                    active ? "opacity-100" : "opacity-70"
                  )}
                >
                  {item.label}
                </span>
              )}

              {/* Active indicator */}
              {active && (
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Safe area for devices with home indicator */}
      <div className="h-safe bg-white/95" />
    </nav>
  );
}
