"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "./AuthProvider";
import {toast} from "react-hot-toast";

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

export const UserActivityProvider = ({children}: {children: ReactNode}) => {
  const {user} = useAuth();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // ==================== CART STATE ====================
  // ==================== CART STATE ====================
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartInitialized, setCartInitialized] = useState(false);

  const [subTotal, setSubPrice] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({});
  const [deliveryDetails, setDeliveryDetails] =
    useState<DeliveryDetails | null>(null);

  // ==================== SESSION ID MANAGEMENT ====================
  // Persistent Session ID for Guest Carts
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

  // ==================== CART SYNC (DB FIRST) ====================

  // Initialize cart lazily - only when first accessed
  const initCart = async () => {
    if (cartInitialized) return; // Already initialized

    const sessionId = getSessionId();
    const currentToken = localStorage.getItem("accessToken");

    const headers: any = {"Content-Type": "application/json"};
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
      const response = await fetch(`${API_URL}/api/cart`, {headers});
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

  // Only fetch cart when user logs in (not on initial page load)
  useEffect(() => {
    if (user) {
      initCart(); // Fetch cart when user logs in
    } else {
      setCartInitialized(false); // Reset on logout
    }
  }, [user]); // Re-run on login/logout

  // 2. Update Cart -> Sync DB Immediately
  // Note: We use a separate function for updates to avoid circular dependency with useEffect
  const updateCartInDb = async (newCart: CartItem[]) => {
    const sessionId = getSessionId();
    const currentToken = localStorage.getItem("accessToken");

    const headers: any = {"Content-Type": "application/json"};
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
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({email: user.email, productId}),
        });
      } catch (err) {
        // Revert on failure
        setWishlist((prev) => prev.filter((id) => id !== productId));
        toast.error("Failed to add");
      }
    }
  };

  // ==================== ORDERS STATE ====================
  // Lazy fetch orders - only when explicitly requested (e.g., when user visits orders page)
  const {data: orders = [], refetch: refetchOrders} = useQuery({
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
  };

  return (
    <UserActivityContext.Provider value={value}>
      {children}
    </UserActivityContext.Provider>
  );
};
