"use client";

import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import {LOTTIE_AI_BOT} from "@/lib/lottie.config";
import {useEffect, useState} from "react";

// Singleton cache for Lottie data
let lottieDataCache: string | null = null;
let loadingPromise: Promise<string> | null = null;

const loadLottieData = async (): Promise<string> => {
  // Return cached data if available
  if (lottieDataCache) {
    return lottieDataCache;
  }

  // Return existing promise if already loading
  if (loadingPromise) {
    return loadingPromise;
  }

  // Start loading
  loadingPromise = fetch(LOTTIE_AI_BOT)
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      lottieDataCache = url;
      loadingPromise = null;
      return url;
    })
    .catch((err) => {
      console.error("Failed to load Lottie animation:", err);
      loadingPromise = null;
      return LOTTIE_AI_BOT; // Fallback to original URL
    });

  return loadingPromise;
};

interface AIBotLottieProps {
  className?: string;
  style?: React.CSSProperties;
}

export function AIBotLottie({className, style}: AIBotLottieProps) {
  const [src, setSrc] = useState<string>(lottieDataCache || LOTTIE_AI_BOT);

  useEffect(() => {
    if (!lottieDataCache) {
      loadLottieData().then(setSrc);
    }
  }, []);

  return (
    <DotLottieReact
      src={src}
      loop
      autoplay
      className={className}
      style={style}
    />
  );
}
