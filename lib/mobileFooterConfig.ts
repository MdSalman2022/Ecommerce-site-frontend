/**
 * Mobile Footer Configuration
 *
 * This file contains all configuration for the mobile footer navigation
 * Centralized configuration makes it easy to:
 * - Add/remove navigation items
 * - Change icons
 * - Modify behavior per page
 * - Update variants
 */

import {
  Home,
  ShoppingCart,
  User,
  Search,
  Heart,
  Package,
  Tag,
  Bell,
} from "lucide-react";
import {LucideIcon} from "lucide-react";

export type NavItemId =
  | "home"
  | "search"
  | "cart"
  | "wishlist"
  | "profile"
  | "orders"
  | "deals"
  | "notifications";
export type FooterVariant =
  | "default"
  | "minimal"
  | "extended"
  | "checkout"
  | "shopping";

export interface NavItem {
  id: NavItemId;
  label: string;
  icon: LucideIcon;
  href: string;
  exact: boolean;
  badge?: "cart" | "notifications" | "wishlist" | null;
  hideOn?: FooterVariant[];
  showOn?: FooterVariant[];
}

/**
 * All available navigation items
 */
export const ALL_NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/",
    exact: true,
    badge: null,
  },
  {
    id: "search",
    label: "Search",
    icon: Search,
    href: "/search",
    exact: false,
    badge: null,
    hideOn: ["minimal", "checkout"],
  },
  {
    id: "deals",
    label: "Deals",
    icon: Tag,
    href: "/deals",
    exact: false,
    badge: null,
    showOn: ["shopping"],
  },
  {
    id: "cart",
    label: "Cart",
    icon: ShoppingCart,
    href: "/cart",
    exact: false,
    badge: "cart",
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: Heart,
    href: "/wishlist",
    exact: false,
    badge: "wishlist",
    hideOn: ["minimal", "checkout"],
  },
  {
    id: "orders",
    label: "Orders",
    icon: Package,
    href: "/orderhistory",
    exact: false,
    badge: null,
    showOn: ["extended"],
  },
  {
    id: "notifications",
    label: "Alerts",
    icon: Bell,
    href: "/notifications",
    exact: false,
    badge: "notifications",
    showOn: ["extended"],
  },
  {
    id: "profile",
    label: "Account",
    icon: User,
    href: "/profile",
    exact: false,
    badge: null,
  },
];

/**
 * Variant configurations
 * Define which items appear in each variant
 */
export const VARIANT_CONFIGS: Record<
  FooterVariant,
  {
    itemIds: NavItemId[];
    showLabels: boolean;
    description: string;
  }
> = {
  default: {
    itemIds: ["home", "cart", "profile"],
    showLabels: false,
    description: "Simple 3-item navigation - Home, Cart, Profile",
  },
  minimal: {
    itemIds: ["home", "cart", "profile"],
    showLabels: false,
    description: "Minimal version, same as default",
  },
  extended: {
    itemIds: ["home", "search", "cart", "orders", "profile"],
    showLabels: true,
    description: "Extended navigation with labels and more options",
  },
  checkout: {
    itemIds: ["home", "cart"],
    showLabels: false,
    description: "Simplified for checkout flow",
  },
  shopping: {
    itemIds: ["home", "search", "deals", "cart", "wishlist"],
    showLabels: false,
    description: "Shopping-focused navigation",
  },
};

/**
 * Page-specific footer configurations
 * Define which variant to use on specific pages
 */
export const PAGE_FOOTER_CONFIGS: Record<
  string,
  {
    variant: FooterVariant;
    showLabels?: boolean;
  }
> = {
  "/": {
    variant: "default",
    showLabels: false,
  },
  "/cart": {
    variant: "default",
    showLabels: false,
  },
  "/checkout": {
    variant: "checkout",
    showLabels: false,
  },
  "/product": {
    variant: "default",
    showLabels: false,
  },
  "/search": {
    variant: "default",
    showLabels: false,
  },
  "/profile": {
    variant: "default",
    showLabels: false,
  },
  "/orderhistory": {
    variant: "default",
    showLabels: false,
  },
};

/**
 * Get footer configuration for a specific page
 */
export function getFooterConfig(pathname: string) {
  // Check for exact match
  if (PAGE_FOOTER_CONFIGS[pathname]) {
    return PAGE_FOOTER_CONFIGS[pathname];
  }

  // Check for partial matches
  for (const [path, config] of Object.entries(PAGE_FOOTER_CONFIGS)) {
    if (pathname.startsWith(path) && path !== "/") {
      return config;
    }
  }

  // Default configuration
  return {
    variant: "default" as FooterVariant,
    showLabels: false,
  };
}

/**
 * Get navigation items for a variant
 */
export function getNavItemsForVariant(variant: FooterVariant): NavItem[] {
  const config = VARIANT_CONFIGS[variant];

  return ALL_NAV_ITEMS.filter((item) => {
    // If showOn is defined, only show if variant is in showOn
    if (item.showOn) {
      return item.showOn.includes(variant);
    }

    // If hideOn is defined, hide if variant is in hideOn
    if (item.hideOn && item.hideOn.includes(variant)) {
      return false;
    }

    // Otherwise, include if it's in the variant's itemIds
    return config.itemIds.includes(item.id);
  });
}
