"use client";

import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter, usePathname} from "next/navigation";
import {
  Search,
  Menu,
  X,
  User,
  GitCompare,
  Heart,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  Check,
  Cpu,
  Gamepad2,
  Headphones,
  Mouse,
  Keyboard,
  Monitor,
  Laptop,
  CircuitBoard,
  Square,
  Zap,
  MemoryStick,
  Wifi,
  Speaker,
  HardDrive,
  Camera,
  Smartphone,
  Tablet,
  Tv,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import {useAuth} from "@/contexts/AuthProvider";
import {useUI} from "@/contexts/UIProvider";
import {useUserActivity} from "@/contexts/UserActivityProvider";
import {useSiteSettings} from "@/hooks/useSiteSettings";
import {useCategories} from "@/hooks/useCategories";
import {brandLinks} from "@/lib/constants";
import {AIBotLottie} from "@/components/AI/AIBotLottie";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as LucideIcons from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const {user, logout} = useAuth();
  const {cart, trackSearch} = useUserActivity();
  const {toggleSidebar} = useUI();
  const {announcementBar, layout} = useSiteSettings();
  const {categories, isLoading: isCategoriesLoading} = useCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [isAISearch, setIsAISearch] = useState(true);

  // Check if on checkout or cart page
  const isCheckoutOrCartPage =
    pathname === "/checkout" ||
    pathname.startsWith("/checkout/") ||
    pathname === "/cart";

  const showSearchBar = layout?.header?.showSearchBar ?? true;
  const showWishlist = layout?.header?.showWishlist ?? true;
  const showCompare = layout?.header?.showCompare ?? true;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Track search for AI recommendations
      trackSearch(searchQuery.trim());

      if (isAISearch) {
        router.push(`/search/${encodeURIComponent(searchQuery)}`);
      } else {
        router.push(`/search/${encodeURIComponent(searchQuery)}?mode=keyword`);
      }
      setSearchQuery("");
    }
  };

  const cartCount = cart?.length || 0;

  return (
    <>
      {/* ========== TOP ANNOUNCEMENT BAR (Dynamic) ========== */}
      {announcementBar.enabled && (
        <div
          className="bg-primary text-white py-2"
          style={{
            backgroundColor: announcementBar.backgroundColor || undefined,
            color: announcementBar.textColor || undefined,
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs md:text-sm font-semibold">
              {announcementBar.text}
            </p>
          </div>
        </div>
      )}

      {/* ========== MAIN HEADER ========== */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            {/* Mobile Menu Toggle / Back Button */}
            {isCheckoutOrCartPage ? (
              <button
                onClick={() => router.back()}
                className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-gray-700 hover:text-primary"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="https://i.ibb.co/xSLpY24/logo-colored.webp"
                alt="BestDeal"
                width={40}
                height={40}
                className="w-8 h-8 md:w-10 md:h-10"
              />
              <span className="hidden sm:block text-xl lg:text-2xl font-bold">
                <span className="text-primary">Best</span>
                <span className="text-gray-800">Deal</span>
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            {showSearchBar && (
              <form
                onSubmit={handleSearch}
                className="hidden md:flex flex-1 max-w-xl mx-4"
              >
                <div className="flex items-center w-full border border-gray-300 rounded-full bg-white pr-1 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all group overflow-hidden">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isAISearch
                        ? "Best Laptop in 100k..."
                        : "Search products..."
                    }
                    className="flex-1 border-0 focus-visible:ring-0 h-11 pl-5 bg-transparent"
                  />

                  {/* Search Mode Toggle & Action */}
                  <div className="flex items-center gap-1 px-1 ml-1 pl-2 py-1 select-none">
                    <div className="flex bg-gray-100 p-1 rounded-full border border-gray-200">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          if (!isAISearch) {
                            // Already Standard: Submit search
                            if (searchQuery.trim()) {
                              if (isAISearch) {
                                router.push(
                                  `/search/${encodeURIComponent(searchQuery)}`
                                );
                              } else {
                                router.push(
                                  `/search/${encodeURIComponent(
                                    searchQuery
                                  )}?mode=keyword`
                                );
                              }
                              setSearchQuery("");
                            }
                          } else {
                            // Switch to Standard
                            setIsAISearch(false);
                          }
                        }}
                        className={cn(
                          "px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300",
                          !isAISearch
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                        )}
                      >
                        Standard
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          if (isAISearch) {
                            // Already AI: Submit search
                            if (searchQuery.trim()) {
                              if (isAISearch) {
                                router.push(
                                  `/search/${encodeURIComponent(searchQuery)}`
                                );
                              } else {
                                router.push(
                                  `/search/${encodeURIComponent(
                                    searchQuery
                                  )}?mode=keyword`
                                );
                              }
                              setSearchQuery("");
                            }
                          } else {
                            // Switch to AI
                            setIsAISearch(true);
                          }
                        }}
                        className={cn(
                          "flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold rounded-full transition-all duration-300",
                          isAISearch
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                        )}
                      >
                        <div className="w-5 h-5 flex items-center justify-center bg-black rounded-full">
                          <AIBotLottie
                            style={{width: "100%", height: "100%"}}
                          />
                        </div>
                        AI Search
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* Header Right Actions - Optimized for mobile */}
            <div className="flex items-center gap-1 md:gap-3">
              {/* Cart - Primary action with prominent styling */}
              <Link
                href="/cart"
                className="relative flex items-center justify-center min-w-11 min-h-11 md:min-w-12 md:min-h-12"
              >
                <div className="bg-primary text-white p-2.5 md:p-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 md:-top-1 md:-right-1 bg-green-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Wishlist - Desktop only */}
              {user && showWishlist && (
                <Link
                  href="/wishlist"
                  className="hidden lg:flex items-center justify-center min-w-11 min-h-11 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </Link>
              )}

              {/* User Menu - Desktop only */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hidden lg:flex items-center justify-center min-w-11 min-h-11 outline-none">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-primary transition-colors border border-gray-200">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {["admin", "moderator"].includes(user.role) && (
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/orderhistory">Order History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => logout()}
                      className="text-red-600"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login" className="hidden lg:block">
                  <Button
                    size="sm"
                    className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* ========== CATEGORY NAV BAR - Desktop ========== */}
        <div className="hidden lg:block border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center h-12 gap-6">
              {/* All Categories Toggle */}
              <div>
                <button
                  onClick={toggleSidebar}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Menu className="w-4 h-4" />
                  All Categories
                </button>
              </div>

              {/* Category Links (Top 4) */}
              <nav className="flex items-center gap-6">
                {categories
                  .filter((c) => c.showInHeader && !c.parent)
                  .slice(0, 5)
                  .map((category) => {
                    const Icon =
                      (LucideIcons as any)[category.icon || "Circle"] ||
                      LucideIcons.Circle;
                    const hasImage =
                      category.image && category.image.trim() !== "";

                    return (
                      <Link
                        key={category._id}
                        href={`/category/${category.slug}`}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary font-medium transition-colors"
                      >
                        {hasImage ? (
                          <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <Icon className="w-4 h-4 text-primary" />
                        )}
                        {category.name}
                      </Link>
                    );
                  })}
              </nav>

              {/* Right Icons */}
              <div className="ml-auto flex items-center gap-4">
                <Link
                  href="/track"
                  className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Track Order
                </Link>
                {showWishlist && (
                  <Link
                    href="/wishlist"
                    className="relative text-gray-600 hover:text-primary transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      0
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========== MOBILE SEARCH BAR ========== */}
      {showSearchBar && !isCheckoutOrCartPage && (
        <div className="lg:hidden bg-white px-4 py-3 border-b">
          <form onSubmit={handleSearch}>
            <div className="flex items-center w-full border border-gray-300 rounded-full bg-white pr-1 focus-within:border-primary transition-all">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAISearch ? "Ask DealBot AI..." : "Search..."}
                className="flex-1 border-0 focus-visible:ring-0 h-10 pl-4 bg-transparent"
              />
              <button
                type="button"
                onClick={() => setIsAISearch(!isAISearch)}
                className={cn(
                  "flex items-center justify-center p-0 rounded-full transition-all duration-300 mr-2 border",
                  isAISearch
                    ? "bg-gradient-to-r from-black border-transparent shadow-md"
                    : "bg-gray-100 border-gray-200"
                )}
              >
                <div className="w-7 h-7 flex items-center justify-center bg-black rounded-full overflow-hidden">
                  <AIBotLottie style={{width: "100%", height: "100%"}} />
                </div>
              </button>
              <Button
                type="submit"
                className="rounded-full h-8 w-8 bg-primary hover:bg-primary/90 p-0 flex items-center justify-center"
              >
                <Search className="w-3.5 h-3.5 text-white" />
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* ========== MOBILE MENU DRAWER ========== */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white z-[101] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b bg-primary text-white">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="py-2">
              {categories
                .filter((c) => c.showInHeader)
                .map((category) => (
                  <div key={category._id} className="border-b border-gray-100">
                    <button
                      onClick={() =>
                        setExpandedCategory(
                          expandedCategory === parseInt(category._id)
                            ? null
                            : parseInt(category._id) // Temp fix for ID type mismatch if any
                        )
                      }
                      className="flex items-center justify-between w-full px-4 py-3 text-left"
                    >
                      <span className="font-medium text-gray-800">
                        {category.name}
                      </span>
                      {category.children && category.children.length > 0 && (
                        <ChevronRight
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            expandedCategory === parseInt(category._id)
                              ? "rotate-90"
                              : ""
                          }`}
                        />
                      )}
                    </button>

                    {expandedCategory === parseInt(category._id) &&
                      category.children && (
                        <ul className="bg-gray-50 py-2">
                          <li>
                            <Link
                              href={`/category/${category.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-8 py-2 text-sm text-primary font-medium"
                            >
                              View All
                            </Link>
                          </li>
                          {category.children.map((sub) => (
                            <li key={sub._id}>
                              <Link
                                href={`/category/${category.slug}/${sub.slug}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-8 py-2 text-sm text-gray-600 hover:text-primary"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
