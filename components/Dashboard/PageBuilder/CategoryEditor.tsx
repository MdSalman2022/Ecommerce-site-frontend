"use client";

import React from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useQuery} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {Check, X} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";

interface CategoryConfig {
  title: string;
  selectedCategories: string[];
  displayStyle: "grid" | "carousel";
  itemsPerRow: number;
}

interface CategoryEditorProps {
  config: CategoryConfig;
  onChange: (config: CategoryConfig) => void;
}

export default function CategoryEditor({
  config,
  onChange,
}: CategoryEditorProps) {
  // Fetch categories to populate dropdown
  // Fetch categories to populate dropdown
  const {data: categories = []} = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`
      );
      const result = await res.json();
      // Backend returns { success: true, count: n, data: [...] }
      return Array.isArray(result.data) ? result.data : [];
    },
  });

  const handleToggleCategory = (catId: string) => {
    const updated = config.selectedCategories.includes(catId)
      ? config.selectedCategories.filter((id) => id !== catId)
      : [...config.selectedCategories, catId];
    onChange({...config, selectedCategories: updated});
  };

  const getCategoryDisplayName = (category: any) => {
    if (!category) return "Unknown";
    if (category.parent) {
      const parent = categories.find((c: any) => c._id === category.parent);
      if (parent) return `${parent.name} > ${category.name}`;
    }
    return category.name;
  };

  const getCategoryNameById = (id: string) => {
    const cat = categories.find((c: any) => c._id === id);
    return getCategoryDisplayName(cat) || id;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Section Title</Label>
        <Input
          value={config.title}
          onChange={(e) => onChange({...config, title: e.target.value})}
          placeholder="e.g. Popular Categories"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Display Style</Label>
          <Select
            value={config.displayStyle}
            onValueChange={(val: any) =>
              onChange({...config, displayStyle: val})
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid">Static Grid</SelectItem>
              <SelectItem value="carousel">Swiper Carousel</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Items Per Row (Grid)</Label>
          <Select
            value={config.itemsPerRow?.toString()}
            onValueChange={(val) =>
              onChange({...config, itemsPerRow: parseInt(val)})
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 Columns</SelectItem>
              <SelectItem value="3">3 Columns</SelectItem>
              <SelectItem value="4">4 Columns</SelectItem>
              <SelectItem value="6">6 Columns</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Select Categories to Show</Label>
        <div className="border rounded-xl p-4 bg-accent/5">
          <div className="flex flex-wrap gap-2 mb-4">
            {config.selectedCategories.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No categories selected. Showing all by default.
              </p>
            )}
            {config.selectedCategories.map((catId) => (
              <Badge key={catId} variant="secondary" className="gap-1 pr-1">
                {getCategoryNameById(catId)}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full hover:bg-muted"
                  onClick={() => handleToggleCategory(catId)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-2">
            {categories.map((cat: any) => {
              const Icon =
                (LucideIcons as any)[cat.icon || "Circle"] ||
                LucideIcons.Circle;
              const hasImage = cat.image && cat.image.trim() !== "";
              const isSelected = config.selectedCategories.includes(cat._id);

              return (
                <div
                  key={cat._id}
                  onClick={() => handleToggleCategory(cat._id)}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md group ${
                    isSelected
                      ? "bg-primary/10 border-primary shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  }`}
                >
                  {/* Checkmark indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}

                  {/* Icon/Image */}
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden border ${
                      isSelected
                        ? "bg-primary/5 border-primary/20"
                        : "bg-muted border-border/50"
                    }`}
                  >
                    {hasImage ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <Icon
                        className={`w-6 h-6 ${
                          isSelected ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    )}
                  </div>

                  {/* Category name */}
                  <span
                    className={`text-xs font-medium text-center line-clamp-2 ${
                      isSelected ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {getCategoryDisplayName(cat)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
