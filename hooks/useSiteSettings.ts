'use client';

import { useEffect, useState, useCallback } from 'react';

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

export interface StoreSettings {
    layout: LayoutSettings;
    store: StoreInfo;
    social: SocialLinks;
    ecommerce: EcommerceSettings;
    seo: SEOSettings;
    maintenance: MaintenanceSettings;
    notifications: NotificationSettings;
}

// ==================== DEFAULTS ====================
const DEFAULT_ANNOUNCEMENT: AnnouncementBarSettings = {
    enabled: true,
    text: '🎉 Welcome to BestDeal!',
    backgroundColor: '',
    textColor: '',
};

const DEFAULT_SETTINGS: StoreSettings = {
    layout: {
        announcementBar: DEFAULT_ANNOUNCEMENT,
        header: { showSearchBar: true, showWishlist: true, showCompare: true },
        footer: { showNewsletter: true, copyrightText: '' }
    },
    store: {
        name: 'BestDeal', tagline: '', logo: '', favicon: '',
        email: '', phone: '', address: '', currency: 'USD', currencySymbol: '$'
    },
    social: {
        facebook: '', instagram: '', twitter: '', youtube: '', linkedin: '', whatsapp: ''
    },
    ecommerce: {
        enableGuestCheckout: true, minOrderAmount: 0, maxOrderAmount: 0,
        freeShippingThreshold: 0, defaultShippingCost: 0, lowStockThreshold: 0,
        showOutOfStock: true, enableReviews: true, reviewModeration: false
    },
    seo: {
        metaTitle: '', metaDescription: '', metaKeywords: '',
        googleAnalyticsId: '', facebookPixelId: ''
    },
    maintenance: { enabled: false, message: '', allowedIPs: [] },
    notifications: {
        orderConfirmationEmail: true, orderStatusEmail: true,
        lowStockAlert: false, newOrderAlert: false, adminEmail: ''
    }
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

export function useSiteSettings(): UseSiteSettingsReturn {
    const [settings, setSettings] = useState<StoreSettings | null>(null);
    const [announcementBar, setAnnouncementBar] = useState<AnnouncementBarSettings>(DEFAULT_ANNOUNCEMENT);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSettings = useCallback(async () => {
        try {
            // Keep loading true only on initial fetch if needed, 
            // but here we might want to be silent if re-fetching
            // For now, simple approach:
            
            const response = await fetch(`${API_URL}/api/settings`);
            // Handle non-200 responses
            if (!response.ok) {
                // throw new Error('Network response was not ok'); // Don't throw, just log
                console.warn('Failed to fetch settings, using defaults');
                setError('Failed to load settings');
                setIsLoading(false);
                return;
            }
            
            const data = await response.json();

            if (data.success && data.data) {
                setSettings(data.data);
                
                // Extract announcement bar from layout
                const announcementData = data.data.layout?.announcementBar;
                if (announcementData) {
                    setAnnouncementBar({
                        enabled: announcementData.enabled ?? DEFAULT_ANNOUNCEMENT.enabled,
                        text: announcementData.text || DEFAULT_ANNOUNCEMENT.text,
                        backgroundColor: announcementData.backgroundColor || '',
                        textColor: announcementData.textColor || '',
                    });
                }
            }
        } catch (err) {
            console.error('Failed to fetch site settings:', err);
            setError('Failed to load settings');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    // Use fetched settings or fall back to defaults to prevent crashes
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
        refetch: fetchSettings,
    };
}
