"use client";

import React, {useState, useEffect} from "react";
import {ProductCardSkeleton} from "@/components/Skeletons";
import {useUserActivity} from "@/contexts/UserActivityProvider";
import {ProductCard} from "@/components/product";
import {useQuery} from "@tanstack/react-query";
import {AIBotLottie} from "./AIBotLottie";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface AIRecommendationsProps {
  productId?: string | null;
  title?: string;
  limit?: number;
}

interface RecommendationMetadata {
  tier: number;
  tierName: string;
  aiPowered: boolean;
  reasoning?: string;
  fromCache?: boolean;
}

export default function AIRecommendations({
  productId = null,
  title = "Recommended for You",
  limit = 10,
}: AIRecommendationsProps) {
  const {cart, getActivityData, wishlist} = useUserActivity();
  const [isVisible, setIsVisible] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      {rootMargin: "100px"}
    );
    const element = document.getElementById(`ai-recs-${title}`);
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [title]);

  const {data, isLoading} = useQuery({
    queryKey: [
      "recommendations",
      productId,
      limit,
      getActivityData().fingerprint,
    ],
    queryFn: async () => {
      if (productId) {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/recommendations/${productId}?limit=${limit}`;
        const res = await fetch(url);
        const data = await res.json();
        return {
          products: data.success ? data.products : [],
          metadata: {
            tier: 2,
            tierName: "product-similar",
            aiPowered: data.aiPowered || false,
            reasoning: "Similar products you might like",
          } as RecommendationMetadata,
        };
      }

      const activity = getActivityData();
      const enrichedActivity = {
        ...activity,
        cartProductIds: cart.map((item) => item.productId || item._id),
        wishlistProductIds: wishlist,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/personalized-recommendations`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            activity: enrichedActivity,
            limit,
            forceAI: false,
          }),
        }
      );

      const data = await res.json();
      return {
        products: data.success ? data.products : [],
        metadata: data.metadata as RecommendationMetadata,
      };
    },
    enabled: isVisible,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const products = data?.products || [];
  const metadata = data?.metadata;
  const isAIPowered = metadata?.aiPowered || false;
  const reasoning = metadata?.reasoning;

  if (!isVisible) {
    return <div id={`ai-recs-${title}`} className="py-8" />;
  }

  if (isLoading) {
    return (
      <section id={`ai-recs-${title}`} className="py-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 flex items-center justify-center bg-black rounded-full overflow-hidden">
            <AIBotLottie style={{width: "100%", height: "100%"}} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {Array.from({length: Math.min(limit, 5)}).map((_, i) => (
              <CarouselItem key={i} className="basis-1/2 md:basis-1/2 lg:basis-1/4">
                <ProductCardSkeleton />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section id={`ai-recs-${title}`} className="py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center bg-black rounded-full overflow-hidden">
            <AIBotLottie style={{width: "100%", height: "100%"}} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {isAIPowered && (
            <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full font-medium">
              AI Powered
            </span>
          )}
          {metadata?.fromCache && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">
              ⚡ Cached
            </span>
          )}
        </div>
      </div>

      {reasoning && <p className="text-sm text-gray-500 mb-6">{reasoning}</p>}

      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product: never) => (
            <CarouselItem
              key={product._id}
              className="pl-2 md:pl-4 basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      {count > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="flex items-center gap-1.5">
            {Array.from({length: count}).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  current === index + 1
                    ? "bg-primary w-8 h-2"
                    : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {current} / {count}
          </span>
        </div>
      )}
    </section>
  );
}
