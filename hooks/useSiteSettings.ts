"use client";

import {useCallback} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// ==================== TYPES ====================
export interface AnnouncementBarSettings {
  enabled: boolean;
  text: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface LayoutSettings {
  announcementBar: AnnouncementBarSettings;
  header: {
    showSearchBar: boolean;
    showWishlist: boolean;
    showCompare: boolean;
  };
  footer: {
    showNewsletter: boolean;
    copyrightText: string;
  };
}

export interface StoreInfo {
  name: string;
  tagline: string;
  logo: string;
  favicon: string;
  email: string;
  phone: string;
  address: string;
  currency: string;
  currencySymbol: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  whatsapp: string;
}

export interface EcommerceSettings {
  enableGuestCheckout: boolean;
  minOrderAmount: number;
  maxOrderAmount: number;
  freeShippingThreshold: number;
  defaultShippingCost: number;
  lowStockThreshold: number;
  showOutOfStock: boolean;
  enableReviews: boolean;
  reviewModeration: boolean;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  googleAnalyticsId: string;
  facebookPixelId: string;
}

export interface MaintenanceSettings {
  enabled: boolean;
  message: string;
  allowedIPs: string[];
}

export interface NotificationSettings {
  orderConfirmationEmail: boolean;
  orderStatusEmail: boolean;
  lowStockAlert: boolean;
  newOrderAlert: boolean;
  adminEmail: string;
}

export interface ShippingSettings {
  dhaka_in: number;
  dhaka_out: number;
}

export interface StoreSettings {
  layout: LayoutSettings;
  store: StoreInfo;
  social: SocialLinks;
  ecommerce: EcommerceSettings;
  seo: SEOSettings;
  maintenance: MaintenanceSettings;
  notifications: NotificationSettings;
  shipping: ShippingSettings;
}

// ==================== DEFAULTS ====================
const DEFAULT_ANNOUNCEMENT: AnnouncementBarSettings = {
  enabled: true,
  text: "🎉 Welcome to BestDeal!",
  backgroundColor: "",
  textColor: "",
};

const DEFAULT_SETTINGS: StoreSettings = {
  layout: {
    announcementBar: DEFAULT_ANNOUNCEMENT,
    header: {showSearchBar: true, showWishlist: true, showCompare: true},
    footer: {showNewsletter: true, copyrightText: ""},
  },
  store: {
    name: "BestDeal",
    tagline: "",
    logo: "",
    favicon: "",
    email: "",
    phone: "",
    address: "",
    currency: "USD",
    currencySymbol: "$",
  },
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    linkedin: "",
    whatsapp: "",
  },
  ecommerce: {
    enableGuestCheckout: true,
    minOrderAmount: 0,
    maxOrderAmount: 0,
    freeShippingThreshold: 0,
    defaultShippingCost: 0,
    lowStockThreshold: 0,
    showOutOfStock: true,
    enableReviews: true,
    reviewModeration: false,
  },
  seo: {
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    googleAnalyticsId: "",
    facebookPixelId: "",
  },
  maintenance: {enabled: false, message: "", allowedIPs: []},
  notifications: {
    orderConfirmationEmail: true,
    orderStatusEmail: true,
    lowStockAlert: false,
    newOrderAlert: false,
    adminEmail: "",
  },
  shipping: {
    dhaka_in: 60,
    dhaka_out: 120,
  },
};

// ==================== HOOK ====================
interface UseSiteSettingsReturn {
  announcementBar: AnnouncementBarSettings;
  settings: StoreSettings | null;
  layout: LayoutSettings;
  store: StoreInfo;
  social: SocialLinks;
  ecommerce: EcommerceSettings;
  seo: SEOSettings;
  notifications: NotificationSettings;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Fetch function
const fetchSiteSettings = async (): Promise<StoreSettings> => {
  const token = localStorage.getItem("accessToken");
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/api/settings`, {headers});

  if (!response.ok) {
    console.warn("Failed to fetch settings, using defaults");
    return DEFAULT_SETTINGS;
  }

  const data = await response.json();

  if (data.success && data.data) {
    return data.data;
  }

  return DEFAULT_SETTINGS;
};

export function useSiteSettings(): UseSiteSettingsReturn {
  const queryClient = useQueryClient();

  // Fetch settings with React Query - ONLY when this hook is used by a component
  const {
    data: settings = DEFAULT_SETTINGS,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: fetchSiteSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    // Removed global enabled check - will only fetch when component mounts
  });

  const error = queryError ? "Failed to load settings" : null;

  const refetch = useCallback(async () => {
    await queryClient.invalidateQueries({queryKey: ["siteSettings"]});
  }, [queryClient]);

  // Extract announcement bar from layout
  const announcementData = settings?.layout?.announcementBar;
  const announcementBar: AnnouncementBarSettings = announcementData
    ? {
        enabled: announcementData.enabled ?? DEFAULT_ANNOUNCEMENT.enabled,
        text: announcementData.text || DEFAULT_ANNOUNCEMENT.text,
        backgroundColor: announcementData.backgroundColor || "",
        textColor: announcementData.textColor || "",
      }
    : DEFAULT_ANNOUNCEMENT;

  // Use fetched settings or fall back to defaults
  const safeSettings = settings || DEFAULT_SETTINGS;

  return {
    announcementBar,
    settings,
    layout: safeSettings.layout || DEFAULT_SETTINGS.layout,
    store: safeSettings.store || DEFAULT_SETTINGS.store,
    social: safeSettings.social || DEFAULT_SETTINGS.social,
    ecommerce: safeSettings.ecommerce || DEFAULT_SETTINGS.ecommerce,
    seo: safeSettings.seo || DEFAULT_SETTINGS.seo,
    notifications: safeSettings.notifications || DEFAULT_SETTINGS.notifications,
    isLoading,
    error,
    refetch,
  };
}
