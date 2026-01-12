"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./AuthProvider";
import { toast } from "react-hot-toast";

interface CartItem {
  _id: string; // Product ID
  productId: string; // Explicit Product ID
  variantId: string; // Specific variant ID
  name: string;
  price: number;
  quantity: number;
  image?: string;
  sku?: string;
  [key: string]: any;
}

interface PaymentDetails {
  id?: string;
  amount?: number;
  [key: string]: any;
}

interface DeliveryDetails {
  name: string;
  address: string;
  contact: string;
  city: string;
  email?: string; // Optional for guest
}

// ==================== ACTIVITY TRACKING TYPES ====================
interface ProductView {
  productId: string;
  categoryId: string;
  categoryName: string;
  subCategoryId?: string;
  subCategoryName?: string;
  brand: string;
  price: number;
  timestamp: number;
}

interface CategoryInterest {
  name: string;
  viewCount: number;
  lastViewed: number;
}

interface BrandInterest {
  viewCount: number;
  lastViewed: number;
}

interface PricePreference {
  min: number;
  max: number;
  average: number;
}

interface SearchEntry {
  query: string;
  timestamp: number;
}

export interface UserActivityData {
  recentViews: ProductView[];
  categoryInterests: Record<string, CategoryInterest>;
  brandInterests: Record<string, BrandInterest>;
  pricePreference: PricePreference;
  recentSearches: SearchEntry[];
  fingerprint: string;
  lastUpdated: number;
}

interface UserActivityContextType {
  // Cart
  cart: CartItem[];
  setCart: (cart: CartItem[] | ((prev: CartItem[]) => CartItem[])) => void;
  subTotal: number;
  setSubPrice: (price: number) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => Promise<void>;

  // Checkout & Orders
  paymentDetails: PaymentDetails;
  setPaymentDetails: (details: PaymentDetails) => void;
  deliveryDetails: DeliveryDetails | null;
  setDeliveryDetails: (details: DeliveryDetails) => void;
  orders: any[];
  refetchOrders: () => Promise<any>;

  // Activity Tracking (for AI recommendations)
  trackProductView: (product: {
    _id: string;
    category?: { _id: string; name: string };
    subCategory?: { _id: string; name: string };
    brand?: string;
    price: number;
  }) => void;
  trackSearch: (query: string) => void;
  getActivityData: () => UserActivityData;
  getActivityFingerprint: () => string;
}

const UserActivityContext = createContext<UserActivityContextType | undefined>(
  undefined
);

export const useUserActivity = () => {
  const context = useContext(UserActivityContext);
  if (!context) {
    throw new Error(
      "useUserActivity must be used within a UserActivityProvider"
    );
  }
  return context;
};

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const UserActivityProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // Cart state and checkout values
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartInitialized, setCartInitialized] = useState(false);

  const [subTotal, setSubPrice] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({});
  const [deliveryDetails, setDeliveryDetails] =
    useState<DeliveryDetails | null>(null);

  // Guest cart session ID tracking
  const getSessionId = (): string => {
    if (typeof window === "undefined") return "";
    let sessionId = localStorage.getItem("cart_session_id");
    if (!sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 9)}`;
      localStorage.setItem("cart_session_id", sessionId);
    }
    return sessionId;
  };

  // ==================== ACTIVITY TRACKING (For AI Recommendations) ====================
  const ACTIVITY_STORAGE_KEY = "user_activity_data";
  const MAX_RECENT_VIEWS = 20;
  const MAX_RECENT_SEARCHES = 10;

  // Simple hash function for fingerprint generation
  const hashString = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  };

  // Generate activity fingerprint for cache lookup
  const generateFingerprint = (activity: UserActivityData): string => {
    const key = JSON.stringify({
      views: activity.recentViews.slice(0, 5).map((v) => v.productId),
      categories: Object.keys(activity.categoryInterests).slice(0, 3),
      brands: Object.keys(activity.brandInterests).slice(0, 3),
      priceRange:
        activity.pricePreference.average > 0
          ? Math.round(activity.pricePreference.average / 100) * 100
          : 0,
    });
    return hashString(key);
  };

  // Initialize activity data from localStorage
  const getInitialActivityData = (): UserActivityData => {
    if (typeof window === "undefined") {
      return createEmptyActivityData();
    }
    try {
      const stored = localStorage.getItem(ACTIVITY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse activity data:", e);
    }
    return createEmptyActivityData();
  };

  const createEmptyActivityData = (): UserActivityData => ({
    recentViews: [],
    categoryInterests: {},
    brandInterests: {},
    pricePreference: { min: 0, max: 0, average: 0 },
    recentSearches: [],
    fingerprint: "",
    lastUpdated: Date.now(),
  });

  const [activityData, setActivityData] = useState<UserActivityData>(
    createEmptyActivityData
  );

  // Load activity data on mount
  useEffect(() => {
    const data = getInitialActivityData();
    setActivityData(data);
  }, []);

  // Persist activity data to localStorage
  const persistActivityData = useCallback((data: UserActivityData) => {
    if (typeof window === "undefined") return;
    try {
      const fingerprint = generateFingerprint(data);
      const updated = { ...data, fingerprint, lastUpdated: Date.now() };
      localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(updated));
      setActivityData(updated);
    } catch (e) {
      console.error("Failed to persist activity data:", e);
    }
  }, []);

  // Track product view
  const trackProductView = useCallback(
    (product: {
      _id: string;
      category?: { _id: string; name: string };
      subCategory?: { _id: string; name: string };
      brand?: string;
      price: number;
    }) => {
      setActivityData((prev) => {
        // Don't track if already the most recent view
        if (prev.recentViews[0]?.productId === product._id) {
          return prev;
        }

        const newView: ProductView = {
          productId: product._id,
          categoryId: product.category?._id || "",
          categoryName: product.category?.name || "",
          subCategoryId: product.subCategory?._id,
          subCategoryName: product.subCategory?.name,
          brand: product.brand || "",
          price: product.price,
          timestamp: Date.now(),
        };

        // Update recent views (remove duplicate if exists, add to front)
        const filteredViews = prev.recentViews.filter(
          (v) => v.productId !== product._id
        );
        const newRecentViews = [newView, ...filteredViews].slice(
          0,
          MAX_RECENT_VIEWS
        );

        // Update category interests
        const newCategoryInterests = { ...prev.categoryInterests };
        if (product.category?._id) {
          const catId = product.category._id;
          newCategoryInterests[catId] = {
            name: product.category.name,
            viewCount: (newCategoryInterests[catId]?.viewCount || 0) + 1,
            lastViewed: Date.now(),
          };
        }

        // Update brand interests
        const newBrandInterests = { ...prev.brandInterests };
        if (product.brand) {
          newBrandInterests[product.brand] = {
            viewCount: (newBrandInterests[product.brand]?.viewCount || 0) + 1,
            lastViewed: Date.now(),
          };
        }

        // Update price preference
        const prices = newRecentViews.map((v) => v.price).filter((p) => p > 0);
        const newPricePreference: PricePreference =
          prices.length > 0
            ? {
                min: Math.min(...prices),
                max: Math.max(...prices),
                average: prices.reduce((a, b) => a + b, 0) / prices.length,
              }
            : prev.pricePreference;

        const updated: UserActivityData = {
          ...prev,
          recentViews: newRecentViews,
          categoryInterests: newCategoryInterests,
          brandInterests: newBrandInterests,
          pricePreference: newPricePreference,
          lastUpdated: Date.now(),
        };

        // Persist async
        setTimeout(() => persistActivityData(updated), 0);
        return updated;
      });
    },
    [persistActivityData]
  );

  // Track search query
  const trackSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return;

      setActivityData((prev) => {
        // Don't track duplicate consecutive searches
        if (
          prev.recentSearches[0]?.query.toLowerCase() === query.toLowerCase()
        ) {
          return prev;
        }

        const newSearch: SearchEntry = {
          query: query.trim(),
          timestamp: Date.now(),
        };

        const filteredSearches = prev.recentSearches.filter(
          (s) => s.query.toLowerCase() !== query.toLowerCase()
        );
        const newRecentSearches = [newSearch, ...filteredSearches].slice(
          0,
          MAX_RECENT_SEARCHES
        );

        const updated: UserActivityData = {
          ...prev,
          recentSearches: newRecentSearches,
          lastUpdated: Date.now(),
        };

        setTimeout(() => persistActivityData(updated), 0);
        return updated;
      });
    },
    [persistActivityData]
  );

  // Get activity data for API calls
  const getActivityData = useCallback((): UserActivityData => {
    return activityData;
  }, [activityData]);

  // Get fingerprint for cache lookup
  const getActivityFingerprint = useCallback((): string => {
    return activityData.fingerprint || generateFingerprint(activityData);
  }, [activityData]);

  // Cart sync using DB-first source

  // Initialize cart lazily - only when first accessed
  const initCart = async (force: boolean = false) => {
    if (!force && cartInitialized) return; // Already initialized

    const sessionId = getSessionId();
    const currentToken = localStorage.getItem("accessToken");

    const headers: any = { "Content-Type": "application/json" };
    if (currentToken) headers["Authorization"] = `Bearer ${currentToken}`;
    if (sessionId) headers["x-session-id"] = sessionId;

    try {
      // Sync guest session cart to user account on login
      if (user && sessionId) {
        await fetch(`${API_URL}/api/cart/sync-guest-to-user`, {
          method: "POST",
          headers,
          body: JSON.stringify({}),
        });
      }

      // Fetch Latest Cart
      const response = await fetch(`${API_URL}/api/cart`, { headers });
      const result = await response.json();

      if (result.success && result.data?.items) {
        const mappedItems = result.data.items.map((item: any) => ({
          _id: item.product._id,
          productId: item.product._id,
          variantId: item.variantId,
          name: item.product.name,
          slug: item.product.slug,
          quantity: item.quantity,
          price:
            (
              item.product.variants?.find(
                (v: any) => v._id === item.variantId
              ) || item.product.variants?.[0]
            )?.salePrice ||
            item.product.variants?.[0]?.regularPrice ||
            0,
          image:
            (
              item.product.variants?.find(
                (v: any) => v._id === item.variantId
              ) || item.product.variants?.[0]
            )?.images?.[0] || item.product.images?.[0],
          variantName: (
            item.product.variants?.find((v: any) => v._id === item.variantId) ||
            item.product.variants?.[0]
          )?.attributes
            ? Object.values(
                (
                  item.product.variants?.find(
                    (v: any) => v._id === item.variantId
                  ) || item.product.variants?.[0]
                )?.attributes
              ).join(" / ")
            : "",
        }));
        setCart(mappedItems);
      }
      setCartInitialized(true);
    } catch (error) {
      console.error("Cart init error:", error);
      setCartInitialized(true); // Mark as attempted
    }
  };

  // Fetch cart on mount (guest) and when user logs in/out
  useEffect(() => {
    // Only fetch if we're not waiting for auth to resolve initially (optional, but good practice)
    // Actually, we want to fetch guest cart immediately if user is null.
    // If user logs in, we force re-fetch to sync.
    initCart(true);
  }, [user]); // Re-run on login/logout

  // Sync cart updates directly to DB
  const updateCartInDb = async (newCart: CartItem[]) => {
    const sessionId = getSessionId();
    const currentToken = localStorage.getItem("accessToken");

    const headers: any = { "Content-Type": "application/json" };
    if (currentToken) headers["Authorization"] = `Bearer ${currentToken}`;
    if (sessionId) headers["x-session-id"] = sessionId;

    try {
      await fetch(`${API_URL}/api/cart`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          items: newCart.map((item) => ({
            productId: item.productId || item._id,
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });
    } catch (err) {
      console.error("Cart update failed", err);
    }
  };

  // Wrapper for setCart to also trigger DB update and ensure cart is initialized
  const handleSetCart = (
    newCart: CartItem[] | ((prev: CartItem[]) => CartItem[])
  ) => {
    // Initialize cart if not already done (when user adds first item)
    if (!cartInitialized) {
      initCart().then(() => {
        setCart((prev) => {
          const updated =
            typeof newCart === "function" ? newCart(prev) : newCart;
          updateCartInDb(updated);
          return updated;
        });
      });
    } else {
      setCart((prev) => {
        const updated = typeof newCart === "function" ? newCart(prev) : newCart;
        updateCartInDb(updated);
        return updated;
      });
    }
  };

  // ==================== WISHLIST STATE ====================
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [wishlistInitialized, setWishlistInitialized] = useState(false);

  // Lazy fetch wishlist - only when needed
  const initWishlist = async () => {
    if (wishlistInitialized || !user?.email) return;

    try {
      const res = await fetch(`${API_URL}/api/wishlist/${user.email}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setWishlist(data.products.map((p: any) => p._id));
      }
      setWishlistInitialized(true);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
      setWishlistInitialized(true);
    }
  };

  // Reset wishlist on logout
  useEffect(() => {
    if (!user?.email) {
      setWishlist([]);
      setWishlistInitialized(false);
    }
  }, [user?.email]);

  const toggleWishlist = async (productId: string) => {
    if (!user?.email) {
      toast.error("Please login to use wishlist");
      return;
    }

    // Initialize wishlist if not already done
    if (!wishlistInitialized) {
      await initWishlist();
    }

    const isInWishlist = wishlist.includes(productId);

    // Optimistic update
    if (isInWishlist) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      toast.success("Removed from wishlist");

      try {
        await fetch(`${API_URL}/api/wishlist/${user.email}/${productId}`, {
          method: "DELETE",
        });
      } catch (err) {
        // Revert on failure
        setWishlist((prev) => [...prev, productId]);
        toast.error("Failed to remove");
      }
    } else {
      setWishlist((prev) => [...prev, productId]);
      toast.success("Added to wishlist");

      try {
        await fetch(`${API_URL}/api/wishlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, productId }),
        });
      } catch (err) {
        // Revert on failure
        setWishlist((prev) => prev.filter((id) => id !== productId));
        toast.error("Failed to add");
      }
    }
  };

  // Orders state fetched lazily when needed
  const { data: orders = [], refetch: refetchOrders } = useQuery({
    queryKey: ["orderhistory", user?.email],
    queryFn: () => fetch(`${API_URL}/orderhistory`).then((res) => res.json()),
    enabled: false, // Disabled by default - must be manually triggered
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  const value = {
    cart,
    setCart: handleSetCart,
    subTotal,
    setSubPrice,
    wishlist,
    toggleWishlist,
    paymentDetails,
    setPaymentDetails,
    deliveryDetails,
    setDeliveryDetails,
    orders,
    refetchOrders,
    // Activity tracking for AI recommendations
    trackProductView,
    trackSearch,
    getActivityData,
    getActivityFingerprint,
  };

  return (
    <UserActivityContext.Provider value={value}>
      {children}
    </UserActivityContext.Provider>
  );
};
