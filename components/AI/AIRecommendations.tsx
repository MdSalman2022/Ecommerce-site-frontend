'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Star, ShoppingCart } from 'lucide-react';
import { WishlistButton } from '@/components/Wishlist';
import { ProductCardSkeleton } from '@/components/Skeletons';
import { useUserActivity } from '@/contexts/UserActivityProvider';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  cat: string;
  rating: number;
  stock: boolean;
}

interface AIRecommendationsProps {
  productId?: string | null;
  title?: string;
  limit?: number;
}

export default function AIRecommendations({
  productId = null,
  title = 'Recommended for You',
  limit = 4,
}: AIRecommendationsProps) {
  const { cart, setCart } = useUserActivity();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAIPowered, setIsAIPowered] = useState(false);

  useEffect(() => {
    fetchRecommendations();
  }, [productId]);

  const fetchRecommendations = async () => {
    try {
      const url = productId
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/recommendations/${productId}?limit=${limit}`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/recommendations?limit=${limit}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        setIsAIPowered(data.aiPowered);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: limit }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {isAIPowered && (
          <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full font-medium">
            AI Powered
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
          >
            {/* Image */}
            <Link
              href={`/productDetails/${product._id}/${encodeURIComponent(product.name).replace(/%20/g, '-')}`}
            >
              <div className="relative h-40 bg-gray-50">
                <Image
                  src={product.image || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform"
                />
                {/* Wishlist Button */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <WishlistButton productId={product._id} size="sm" />
                </div>
              </div>
            </Link>

            {/* Content */}
            <div className="p-3">
              <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
              <Link
                href={`/productDetails/${product._id}/${encodeURIComponent(product.name).replace(/%20/g, '-')}`}
              >
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating.toFixed(1)}</span>
                </div>
              )}

              {/* Price & Add to Cart */}
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold text-primary">${product.price}</p>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
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
                    toast.success('Added to cart');
                  }}
                  disabled={!product.stock}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 h-8 px-3"
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
