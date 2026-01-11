"use client";

import React, {useState, useEffect, useRef} from "react";
import Link from "next/link";
import {ProductCardSkeleton} from "@/components/Skeletons";
import {useUserActivity} from "@/contexts/UserActivityProvider";
import {ProductCard} from "@/components/product";
import {useQuery} from "@tanstack/react-query";
import {AIBotLottie} from "./AIBotLottie";

interface AIRecommendationsProps {
  productId?: string | null;
  title?: string;
  limit?: number;
}

export default function AIRecommendations({
  productId = null,
  title = "Recommended for You",
  limit = 4,
}: AIRecommendationsProps) {
  const {cart, setCart} = useUserActivity();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer - only fetch when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {rootMargin: "100px"} // Start loading 100px before visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Only fetch when component is visible
  const {data, isLoading} = useQuery({
    queryKey: ["recommendations", productId, limit],
    queryFn: async () => {
      const url = productId
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/recommendations/${productId}?limit=${limit}`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/recommendations?limit=${limit}`;

      const res = await fetch(url);
      const data = await res.json();

      return {
        products: data.success ? data.products : [],
        aiPowered: data.aiPowered || false,
      };
    },
    enabled: isVisible, // Only fetch when visible
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const products = data?.products || [];
  const isAIPowered = data?.aiPowered || false;

  if (!isVisible) {
    return <div ref={ref} className="py-8" />;
  }

  if (isLoading) {
    return (
      <section ref={ref} className="py-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 flex items-center justify-center bg-black rounded-full overflow-hidden">
            <AIBotLottie style={{width: "100%", height: "100%"}} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({length: limit}).map((_, i) => (
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
    <section ref={ref} className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 flex items-center justify-center bg-black rounded-full overflow-hidden">
          <AIBotLottie style={{width: "100%", height: "100%"}} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {isAIPowered && (
          <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full font-medium">
            AI Powered
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
