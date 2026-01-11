"use client";

import {useState, useEffect, useRef} from "react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import {
  Menu,
  ChevronRight,
  CircuitBoard,
  LayoutDashboard,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import {cn} from "@/lib/utils";
import {useUI} from "@/contexts/UIProvider";
import {useCategories} from "@/hooks/useCategories";
import {useAuth} from "@/contexts/AuthProvider";

export default function LeftSidebar() {
  const {isSidebarOpen, closeSidebar} = useUI();
  const {categories, isLoading} = useCategories();
  const {user, logout} = useAuth();
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Expanded if globally open (toggle) OR locally hovered
  const isExpanded = isSidebarOpen || isSidebarHovered;

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsSidebarHovered(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    // Clear the expansion timeout if user leaves before 300ms
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Immediately collapse when leaving
    setIsSidebarHovered(false);
    setActiveCategoryId(null);
  };

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] transition-opacity duration-300"
          aria-hidden="true"
          onClick={closeSidebar} // Click backdrop to close (if toggled)
        />
      )}

      <aside
        className={cn(
          "hidden lg:flex fixed left-0 top-0 bottom-0 z-[100] flex-col bg-white border-r border-gray-100 shadow-xl transition-all duration-300 ease-in-out",
          isExpanded ? "w-[260px]" : "w-[60px]"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={cn(
            "flex items-center h-[60px] px-4 transition-all duration-300",
            isExpanded ? "justify-start" : "justify-center"
          )}
        >
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
            <Menu className="w-4 h-4" strokeWidth={2} />
          </div>

          <span
            className={cn(
              "ml-4 font-bold text-gray-800 text-lg whitespace-nowrap overflow-hidden transition-all duration-300",
              isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
            )}
          >
            All Categories
          </span>
        </div>
        {/* Scrollable Categories Section */}

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 scrollbar-thin scrollbar-thumb-gray-200">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-40 space-y-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            categories.map((category) => {
              // Dynamic icon lookup matching Header.tsx
              const Icon =
                (LucideIcons as any)[category.icon || "Circle"] || CircuitBoard;
              const hasImage = category.image && category.image.trim() !== "";

              return (
                <div key={category._id}>
                  <Link
                    href={`/category/${category.slug}`}
                    className={cn(
                      "flex items-center px-4 py-3 text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors relative group",
                      isExpanded ? "justify-start" : "justify-center"
                    )}
                    onMouseEnter={() => setActiveCategoryId(category._id)}
                  >
                    {hasImage ? (
                      <div className="w-5 h-5 shrink-0 relative overflow-hidden flex items-center justify-center">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <Icon className="w-5 h-5 shrink-0" strokeWidth={1.25} />
                    )}

                    <span
                      className={cn(
                        "ml-4 font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                        isExpanded
                          ? "opacity-100 w-auto"
                          : "opacity-0 w-0 hidden"
                      )}
                    >
                      {category.name}
                    </span>

                    {isExpanded &&
                      category.children &&
                      category.children.length > 0 && (
                        <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                      )}

                    {!isExpanded && (
                      <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-lg">
                        {category.name}
                        <div className="absolute top-1/2 -left-1 -mt-1 border-4 border-transparent border-r-gray-800" />
                      </div>
                    )}
                  </Link>
                </div>
              );
            })
          )}
        </div>

        {/* Fixed Bottom Menu Items */}
        {user && (
          <div className="border-t border-gray-200 bg-white">
            <div className="py-2">
              {["admin", "moderator"].includes(user.role) && (
                <Link
                  href="/dashboard"
                  className={cn(
                    "flex items-center px-4 py-3 text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors",
                    isExpanded ? "justify-start" : "justify-center"
                  )}
                >
                  <LayoutDashboard
                    className="w-5 h-5 shrink-0"
                    strokeWidth={1.25}
                  />
                  <span
                    className={cn(
                      "ml-4 font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                      isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
                    )}
                  >
                    Dashboard
                  </span>
                </Link>
              )}

              <Link
                href="/orderhistory"
                className={cn(
                  "flex items-center px-4 py-3 text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors",
                  isExpanded ? "justify-start" : "justify-center"
                )}
              >
                <ShoppingBag className="w-5 h-5 shrink-0" strokeWidth={1.25} />
                <span
                  className={cn(
                    "ml-4 font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                    isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
                  )}
                >
                  Order History
                </span>
              </Link>

              <button
                onClick={() => logout()}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors",
                  isExpanded ? "justify-start" : "justify-center"
                )}
              >
                <LogOut className="w-5 h-5 shrink-0" strokeWidth={1.25} />
                <span
                  className={cn(
                    "ml-4 font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                    isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
                  )}
                >
                  Logout
                </span>
              </button>
            </div>
          </div>
        )}

        {isExpanded && activeCategoryId && (
          <div
            className="absolute left-[260px] top-0 bottom-0 w-[240px] bg-white border-l border-gray-100 shadow-xl overflow-y-auto py-6 px-6 z-30"
            onMouseEnter={() => setIsSidebarHovered(true)} // Keep sidebar open
          >
            {(() => {
              const activeCat = categories.find(
                (c) => c._id === activeCategoryId
              );
              if (
                !activeCat ||
                !activeCat.children ||
                activeCat.children.length === 0
              )
                return null;

              return (
                <div className="animate-in fade-in slide-in-from-left-2 duration-200">
                  <h3 className="font-bold text-gray-900 border-b pb-2 mb-3">
                    {activeCat.name}
                  </h3>
                  <ul className="space-y-2">
                    {activeCat.children.map((sub) => (
                      <li key={sub._id}>
                        <Link
                          href={`/category/${activeCat.slug}/${sub.slug}`}
                          className="block text-sm text-gray-600 hover:text-primary hover:translate-x-1 transition-all"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </div>
        )}
      </aside>
    </>
  );
}
