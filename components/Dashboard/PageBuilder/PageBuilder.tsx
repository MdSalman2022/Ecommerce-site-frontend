"use client";

import React, {useState} from "react";
import {
  Layout,
  Eye,
  EyeOff,
  Settings,
  GripVertical,
  Trash2,
  Plus,
  Save,
  ArrowUp,
  ArrowDown,
  Loader2,
  RefreshCcw,
  Monitor,
  X,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import HeroEditor from "./HeroEditor";
import BrandMarqueeEditor from "./BrandMarqueeEditor";
import CategoryEditor from "./CategoryEditor";
import ProductEditor from "./ProductEditor";
import {Input} from "@/components/ui/label";

interface Section {
  id: string;
  type: string;
  isVisible: boolean;
  order: number;
  config: any;
}

export default function PageBuilderDashboard() {
  const queryClient = useQueryClient();
  const [selectedPage, setSelectedPage] = useState("home");
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Fetch page configuration
  const {
    data: pageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["page-builder", selectedPage],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/page-builder/${selectedPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
  });

  // Update section mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedSections: Section[]) => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/page-builder/${selectedPage}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({sections: updatedSections}),
        }
      );
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["page-builder", selectedPage]});
      toast.success("Draft saved successfully");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to save draft");
    },
  });

  // Publish mutation
  const publishMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/page-builder/${selectedPage}/publish`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["page-builder", selectedPage]});
      toast.success("Page published successfully!");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to publish page");
    },
  });

  // Reset mutation
  const resetMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/page-builder/${selectedPage}/reset`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["page-builder", selectedPage]});
      toast.success("Reset to default configuration");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to reset page");
    },
  });

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse">
          Loading builder...
        </p>
      </div>
    );
  }

  // IDs must come from backend to avoid edit bugs
  const sections = [...(pageData?.sections || [])].sort(
    (a, b) => a.order - b.order
  );

  const handleToggleVisibility = (sectionId: string) => {
    const updated = sections.map((s) =>
      s.id === sectionId ? {...s, isVisible: !s.isVisible} : s
    );
    updateMutation.mutate(updated);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const newSections = [...sections];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= newSections.length) return;

    // Swap orders
    [newSections[index].order, newSections[newIndex].order] = [
      newSections[newIndex].order,
      newSections[index].order,
    ];

    updateMutation.mutate(newSections);
  };

  const handleEditSection = (section: Section) => {
    // Deep copy to prevent reference issues
    setEditingSection(JSON.parse(JSON.stringify(section)));
    setIsEditorOpen(true);
  };

  const handleAddSection = (type: string) => {
    let defaultConfig: any = {};

    // Set proper defaults based on section type
    switch (type) {
      case "hero":
        defaultConfig = {
          carouselSlides: [],
          promoCards: [],
        };
        break;
      case "brandMarquee":
        defaultConfig = {
          displayType: "icons",
          selectedBrands: [],
          customImages: [],
          speed: 50,
          pauseOnHover: true,
        };
        break;
      case "categories":
        defaultConfig = {
          title: "Featured Categories",
          displayStyle: "grid",
          itemsPerRow: 4,
          selectedCategories: [],
        };
        break;
      case "products":
        defaultConfig = {
          title: "Featured Products",
          sourceType: "featured",
          categoryId: "",
          productIds: [],
          limit: 10,
          viewAllLink: "/products?filter=featured",
        };
        break;
      case "serviceBar":
        defaultConfig = {
          services: [],
        };
        break;
      default:
        defaultConfig = {
          title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
        };
    }

    // Generate MongoDB-like ObjectID (24-char hex string)
    const timestamp = Math.floor(Date.now() / 1000)
      .toString(16)
      .padStart(8, "0");
    const randomBytes = Array.from({length: 16}, () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, "0")
    ).join("");
    const objectId = timestamp + randomBytes.substring(0, 16);

    const newSection: Section = {
      id: objectId,
      type,
      isVisible: true,
      order: sections.length,
      config: JSON.parse(JSON.stringify(defaultConfig)), // Deep copy
    };

    // Set the new section as editing and open dialog immediately
    setEditingSection(newSection);
    setIsEditorOpen(true);
  };

  const handleSaveSectionEdit = () => {
    if (!editingSection) return;

    // Check if this is a new section (not in current sections array)
    const isNewSection = !sections.find((s) => s.id === editingSection.id);

    let updated;
    if (isNewSection) {
      // Add new section
      updated = [...sections, JSON.parse(JSON.stringify(editingSection))];
    } else {
      // Update existing section
      updated = sections.map((s) =>
        s.id === editingSection.id
          ? JSON.parse(JSON.stringify(editingSection))
          : s
      );
    }

    updateMutation.mutate(updated);
    setIsEditorOpen(false);
    setEditingSection(null);
  };

  const handleCancelEdit = () => {
    // If this was a new section that wasn't saved, just close
    setIsEditorOpen(false);
    setEditingSection(null);
  };

  const handleRemoveSection = (sectionId: string) => {
    if (!sectionId) {
      toast.error("Cannot delete section: Invalid section ID");
      return;
    }

    if (confirm("Are you sure you want to remove this section?")) {
      const updated = sections.filter((s) => s.id !== sectionId);

      // Safety check - if we're about to delete everything, something went wrong
      if (updated.length === 0 && sections.length > 1) {
        toast.error(
          "Error: Cannot delete all sections. Please refresh and try again."
        );
        return;
      }

      updateMutation.mutate(updated);
    }
  };

  const renderEditor = () => {
    if (!editingSection) return null;

    const handleConfigChange = (newConfig: any) => {
      // Create a completely new object to avoid mutations
      setEditingSection({
        ...editingSection,
        config: JSON.parse(JSON.stringify(newConfig)),
      });
    };

    switch (editingSection.type) {
      case "hero":
        return (
          <HeroEditor
            config={editingSection.config}
            onChange={handleConfigChange}
          />
        );
      case "brandMarquee":
        return (
          <BrandMarqueeEditor
            config={editingSection.config}
            onChange={handleConfigChange}
          />
        );
      case "categories":
        return (
          <CategoryEditor
            config={editingSection.config}
            onChange={handleConfigChange}
          />
        );
      case "products":
        return (
          <ProductEditor
            config={editingSection.config}
            onChange={handleConfigChange}
          />
        );
      default:
        return (
          <div className="p-4 text-center text-muted-foreground italic">
            No specialized editor available for this section type.
          </div>
        );
    }
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case "hero":
        return <Monitor className="w-4 h-4" />;
      case "brandMarquee":
        return <RefreshCcw className="w-4 h-4" />;
      case "categories":
        return <Layout className="w-4 h-4" />;
      case "products":
        return <Plus className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Landing Page Builder
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Customize your store's landing page sections and content
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => resetMutation.mutate()}
            disabled={resetMutation.isPending}
            className="flex-1 sm:flex-none"
          >
            <span className="hidden sm:inline">Reset Defaults</span>
            <span className="sm:hidden">Reset</span>
          </Button>
          <Button
            size="sm"
            onClick={() => publishMutation.mutate()}
            disabled={publishMutation.isPending}
            className="bg-primary hover:bg-primary/90 flex-1 sm:flex-none"
          >
            {publishMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Publish
          </Button>
        </div>
      </div>

      {/* Section List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Layout className="w-5 h-5 text-primary" />
            Page Sections ({sections.length})
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Plus className="w-4 h-4" /> Add Section
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleAddSection("hero")}>
                <Monitor className="w-4 h-4 mr-2" /> Hero Banner
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAddSection("brandMarquee")}
              >
                <RefreshCcw className="w-4 h-4 mr-2" /> Brand Marquee
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddSection("categories")}>
                <Layout className="w-4 h-4 mr-2" /> Categories Grid
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddSection("products")}>
                <Plus className="w-4 h-4 mr-2" /> Product Section
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid gap-3">
          {sections.map((section, index) => (
            <div
              key={section.id || index}
              className={`group bg-white border rounded-xl p-3 md:p-4 shadow-sm hover:border-primary/50 transition-all ${
                !section.isVisible ? "opacity-60 bg-gray-50" : ""
              }`}
            >
              <div className="flex items-start sm:items-center justify-between gap-2 md:gap-4">
                <div className="flex items-start sm:items-center gap-2 md:gap-4 flex-1 min-w-0">
                  <div className="p-2 bg-accent rounded-lg">
                    {getSectionIcon(section.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground capitalize">
                      {section.type.replace(/([A-Z])/g, " $1")}
                      <span className="ml-2 text-[10px] text-muted-foreground font-mono bg-accent px-1.5 py-0.5 rounded">
                        ID: {section.id || "N/A"}
                      </span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {section.config?.title || "No title configured"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {/* Action Buttons */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 md:h-8 md:w-8 text-primary"
                    title="Edit Section"
                    onClick={() => handleEditSection(section)}
                  >
                    <Settings className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 md:h-8 md:w-8 ${
                      section.isVisible ? "text-blue-500" : "text-gray-400"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleVisibility(section.id);
                    }}
                    title={section.isVisible ? "Hide Section" : "Show Section"}
                  >
                    {section.isVisible ? (
                      <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    )}
                  </Button>

                  <div className="hidden sm:flex flex-col gap-0.5 border-l pl-1 md:pl-2 border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 md:h-7 md:w-7 hover:bg-accent disabled:opacity-30"
                      disabled={index === 0}
                      onClick={() => handleMove(index, "up")}
                    >
                      <ArrowUp className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 md:h-7 md:w-7 hover:bg-accent disabled:opacity-30"
                      disabled={index === sections.length - 1}
                      onClick={() => handleMove(index, "down")}
                    >
                      <ArrowDown className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 md:h-8 md:w-8 text-red-500 hover:bg-red-50"
                    title="Remove Section"
                    onClick={() => handleRemoveSection(section.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="capitalize flex items-center gap-2">
              {getSectionIcon(editingSection?.type || "")}
              Edit {editingSection?.type.replace(/([A-Z])/g, " $1")} Section
            </DialogTitle>
            <DialogDescription>
              Configure the content and behavior for this section.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">{renderEditor()}</div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveSectionEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Information */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
        <div className="bg-blue-100 p-1.5 rounded-full">
          <Settings className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-blue-900">
            Current Status:{" "}
            {pageData?.isPublished
              ? "Live & Published"
              : "Draft (Unsaved changes)"}
          </p>
          <p className="text-xs text-blue-700/80 mt-0.5 uppercase font-semibold">
            Version {pageData?.metadata?.version} • Last edited by{" "}
            {pageData?.metadata?.lastEditedBy || "Admin"}
          </p>
        </div>
      </div>
    </div>
  );
}
