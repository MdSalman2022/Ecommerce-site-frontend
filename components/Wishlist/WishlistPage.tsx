'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, Star, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { useUserActivity } from '@/contexts/UserActivityProvider';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

interface WishlistProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  regularPrice: number;
  image: string;
  brand: string;
  category: any;
  subCategory: any;
  rating: number;
  stock: boolean;
  flags: any;
  addedAt: string;
}

export default function WishlistPage() {
  const { user } = useAuth();
  const { cart, setCart, toggleWishlist } = useUserActivity();
  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchWishlist();
    } else {
      setIsLoading(false);
    }
  }, [user?.email]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist/${user?.email}`
      );
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Failed to load wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    await toggleWishlist(productId);
    setProducts(products.filter((p) => p._id !== productId));
  };

  const handleMoveToCart = (product: WishlistProduct) => {
    const existingItem = cart.find((item: any) => item._id === product._id);
    if (existingItem) {
      setCart(cart.map((item: any) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        totalPrice: product.price,
      }]);
    }
    removeFromWishlist(product._id);
    toast.success('Moved to cart');
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-gray-50/50">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center max-w-md w-full text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
            <p className="text-gray-500 mb-8">Please login to sync your wishlist across devices and enjoy personalized deals.</p>
            <Link href="/login" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90 h-12 text-lg">Sign In</Button>
            </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm animate-pulse">
              <div className="w-full h-48 bg-gray-100 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="relative mb-8">
            <Heart className="w-24 h-24 text-gray-100 fill-gray-50" />
            <div className="absolute inset-0 flex items-center justify-center translate-y-2">
                <Package className="w-10 h-10 text-gray-300" />
            </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8 max-w-xs text-center">Save items you like to see them later and get notified about price drops.</p>
        <Link href="/">
          <Button variant="outline" className="h-12 px-8 border-gray-200 hover:bg-gray-50 rounded-full">Explore Latest Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 rounded-lg">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">My Wishlist</h1>
            <p className="text-sm text-gray-500">{products.length} item{products.length > 1 ? 's' : ''} saved</p>
          </div>
        </div>
        
        <Link href="/">
            <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-primary/5">
                Continue Shopping
            </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const discount = product.regularPrice > product.price 
            ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100) 
            : 0;

          return (
            <div
              key={product._id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative"
            >
              <Button
                onClick={() => removeFromWishlist(product._id)}
                variant="secondary"
                size="icon"
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </Button>

              {/* Image */}
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.image || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.name}
                    fill
                    className="object-contain p-6 scale-95 group-hover:scale-100 transition-transform duration-500"
                  />
                  
                  {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                        -{discount}%
                    </div>
                  )}

                  {!product.stock && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">Out of Stock</span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                        {product.brand || 'General'}
                    </span>
                    <Link href={`/product/${product.slug}`}>
                        <h3 className="font-semibold text-gray-800 line-clamp-2 leading-snug hover:text-primary transition-colors mt-1 h-10">
                        {product.name}
                        </h3>
                    </Link>
                </div>

                {/* Price Section */}
                <div className="mt-auto pt-4 flex items-end justify-between">
                    <div className="flex flex-col">
                        {product.regularPrice > product.price && (
                            <span className="text-xs text-gray-400 line-through mb-0.5">
                                ${product.regularPrice.toLocaleString()}
                            </span>
                        )}
                        <span className="text-xl font-bold text-primary">
                            ${product.price.toLocaleString()}
                        </span>
                    </div>
                    
                    {product.rating > 0 && (
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-bold text-amber-700">{product.rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-5 pt-5 border-t border-gray-50">
                  <Button
                    onClick={() => handleMoveToCart(product)}
                    disabled={!product.stock}
                    className="w-full bg-gray-900 hover:bg-primary text-white transition-colors h-11 rounded-xl gap-2 font-medium"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Move to Cart
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
