"use client";

import React from "react";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {Slider} from "@/components/ui/slider";
import {useCategories} from "@/hooks/useCategories";
import Image from "next/image";

interface MarqueeConfig {
  displayType: "icons" | "images"; // We might keep 'icons' as default for category icons
  speed: number;
  pauseOnHover: boolean;
  selectedBrands: string[]; // We'll use this array to store selected Category IDs/Slugs
  customImages: any[]; // Deprecated but kept for type compatibility
}

interface BrandMarqueeEditorProps {
  config: MarqueeConfig;
  onChange: (config: MarqueeConfig) => void;
}

export default function BrandMarqueeEditor({
  config,
  onChange,
}: BrandMarqueeEditorProps) {
  const {categories, isLoading} = useCategories();

  // Helper to toggle selection
  const handleToggleCategory = (catSlug: string) => {
    const isSelected = config.selectedBrands.includes(catSlug);
    const updated = isSelected
      ? config.selectedBrands.filter((id) => id !== catSlug)
      : [...config.selectedBrands, catSlug];
    onChange({...config, selectedBrands: updated});
  };

  // Flatten categories for grouped selection

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-accent/10 p-4 rounded-xl">
        <div className="space-y-1">
          <Label className="text-sm font-bold">Marquee Speed</Label>
          <p className="text-xs text-muted-foreground">
            Adjust how fast items scroll (50-200)
          </p>
        </div>
        <div className="w-1/2">
          <Slider
            min={50}
            max={300}
            step={10}
            value={[config.speed || 100]}
            onValueChange={(val) => onChange({...config, speed: val[0]})}
          />
        </div>
      </div>

      <div className="flex items-center justify-between bg-accent/10 p-4 rounded-xl">
        <div className="space-y-1">
          <Label className="text-sm font-bold">Pause on Hover</Label>
          <p className="text-xs text-muted-foreground">
            Stop scrolling when mouse pointer is over the marquee
          </p>
        </div>
        <Switch
          checked={config.pauseOnHover}
          onCheckedChange={(checked) =>
            onChange({...config, pauseOnHover: checked})
          }
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold">Select Categories to Show</h3>
          <span className="text-xs text-muted-foreground">
            {config.selectedBrands.length} selected
          </span>
        </div>

        {isLoading ? (
          <div className="py-8 text-center text-sm text-gray-500">
            Loading categories...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <React.Fragment key={cat._id}>
                {/* Parent Category */}
                <div
                  onClick={() => handleToggleCategory(cat.slug)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                    config.selectedBrands.includes(cat.slug)
                      ? "border-primary bg-primary/5 ring-2 ring-primary"
                      : "hover:border-primary/50"
                  }`}
                >
                  {cat.image ? (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                      {cat.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-center line-clamp-2">
                    {cat.name}
                  </span>
                </div>

                {/* Subcategories */}
                {cat.children?.map((sub: any) => (
                  <div
                    key={sub._id}
                    onClick={() => handleToggleCategory(sub.slug)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      config.selectedBrands.includes(sub.slug)
                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                        : "hover:border-primary/50 bg-gray-50/50"
                    }`}
                  >
                    {sub.image ? (
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white">
                        <Image
                          src={sub.image}
                          alt={sub.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">
                        {sub.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs text-center line-clamp-2 text-gray-700">
                      {sub.name}
                    </span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
