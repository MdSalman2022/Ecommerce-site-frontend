'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from './AuthProvider';
import { toast } from 'react-hot-toast';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
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

const UserActivityContext = createContext<UserActivityContextType | undefined>(undefined);

export const useUserActivity = () => {
  const context = useContext(UserActivityContext);
  if (!context) {
    throw new Error('useUserActivity must be used within a UserActivityProvider');
  }
  return context;
};

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const UserActivityProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  
  // ==================== CART STATE ====================
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  
  const [subTotal, setSubPrice] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({});
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails | null>(null);

  // ==================== SESSION ID FOR ABANDONED CART TRACKING ====================
  const getSessionId = (): string => {
    if (typeof window === 'undefined') return '';
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  };

  // Sync cart with localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Track cart updates to backend for abandoned cart analytics
  useEffect(() => {
    if (typeof window === 'undefined' || cart.length === 0) return;

    const trackCart = async () => {
      try {
        const sessionId = getSessionId();
        const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        await fetch(`${API_URL}/api/cart/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            userId: user?._id,
            email: user?.email,
            items: cart.map(item => ({
              productId: item._id,
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: item.quantity,
              totalPrice: item.price * item.quantity
            })),
            cartTotal
          })
        });
      } catch (error) {
        // Silent fail - don't disrupt user experience for analytics
        console.debug('Cart tracking error:', error);
      }
    };

    // Debounce cart tracking (1 second after last change)
    const timeout = setTimeout(trackCart, 1000);
    return () => clearTimeout(timeout);
  }, [cart, user]);

  // Load cart from localStorage on mount (double check)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cartFromLocalStorage = localStorage.getItem('cart');
      if (cartFromLocalStorage) {
        const parsed = JSON.parse(cartFromLocalStorage);
        if (JSON.stringify(parsed) !== JSON.stringify(cart)) {
          setCart(parsed);
        }
      }
    }
  }, []);

  // ==================== WISHLIST STATE ====================
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Fetch full wishlist once on mount or when user changes
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.email) {
        setWishlist([]);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/wishlist/${user.email}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
            // Store only product IDs for efficient exist checks
            setWishlist(data.products.map((p: any) => p._id));
        }
      } catch (err) { 
        console.error("Failed to fetch wishlist", err); 
      }
    };

    fetchWishlist();
  }, [user?.email]);

  const toggleWishlist = async (productId: string) => {
    if (!user?.email) {
        toast.error('Please login to use wishlist');
        return;
    }

    const isInWishlist = wishlist.includes(productId);
    
    // Optimistic update
    if (isInWishlist) {
        setWishlist(prev => prev.filter(id => id !== productId));
        toast.success("Removed from wishlist");
        
        try {
            await fetch(`${API_URL}/api/wishlist/${user.email}/${productId}`, { method: 'DELETE' });
        } catch (err) {
            // Revert on failure
            setWishlist(prev => [...prev, productId]);
            toast.error("Failed to remove");
        }
    } else {
        setWishlist(prev => [...prev, productId]);
        toast.success("Added to wishlist");
        
        try {
            await fetch(`${API_URL}/api/wishlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, productId }),
            });
        } catch (err) {
            // Revert on failure
            setWishlist(prev => prev.filter(id => id !== productId));
            toast.error("Failed to add");
        }
    }
  };

  // ==================== ORDERS STATE ====================
  const { data: orders = [], refetch: refetchOrders } = useQuery({
    queryKey: ['orderhistory', user?.email], // Refetch when user changes
    queryFn: () => fetch(`${API_URL}/orderhistory`).then(res => res.json()),
    enabled: typeof window !== 'undefined'
  });

  const value = {
    cart,
    setCart,
    subTotal,
    setSubPrice,
    wishlist,
    toggleWishlist,
    paymentDetails,
    setPaymentDetails,
    deliveryDetails,
    setDeliveryDetails,
    orders,
    refetchOrders
  };

  return (
    <UserActivityContext.Provider value={value}>
      {children}
    </UserActivityContext.Provider>
  );
};
