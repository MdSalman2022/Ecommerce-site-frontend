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
  price: number;
  image: string;
  brand: string;
  category: string;
  rating: number;
  stock: boolean;
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
    // Add to cart
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <Heart className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist</h2>
        <p className="text-gray-500 mb-6">Please login to view your wishlist</p>
        <Link href="/login">
          <Button className="bg-primary hover:bg-primary/90">Login</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <Heart className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Start adding products you love!</p>
        <Link href="/">
          <Button className="bg-primary hover:bg-primary/90">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
        <span className="text-sm text-gray-500">({products.length} items)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
          >
            {/* Image */}
            <Link href={`/productDetails/${product._id}/${encodeURIComponent(product.name).replace(/%20/g, '-')}`}>
              <div className="relative h-48 bg-gray-50">
                <Image
                  src={product.image || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform"
                />
                {!product.stock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
            </Link>

            {/* Content */}
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
              <Link href={`/productDetails/${product._id}/${encodeURIComponent(product.name).replace(/%20/g, '-')}`}>
                <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating.toFixed(1)}</span>
                </div>
              )}

              {/* Price */}
              <p className="text-xl font-bold text-primary mt-2">${product.price}</p>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => handleMoveToCart(product)}
                  disabled={!product.stock}
                  className="flex-1 bg-primary hover:bg-primary/90 text-sm"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Move to Cart
                </Button>
                <Button
                  onClick={() => removeFromWishlist(product._id)}
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
