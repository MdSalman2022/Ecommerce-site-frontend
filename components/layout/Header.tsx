'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Search, Menu, X, User, GitCompare, Heart, ShoppingBag, ChevronDown, ChevronRight, Check,
  Cpu, Gamepad2, Headphones, Mouse, Keyboard, Monitor, Laptop, 
  CircuitBoard, Square, Zap, MemoryStick, Wifi, Speaker, HardDrive, Camera,
  Smartphone, Tablet, Tv
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { useUI } from '@/contexts/UIProvider';
import { useUserActivity } from '@/contexts/UserActivityProvider';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useCategories } from '@/hooks/useCategories';
import { brandLinks } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Icon mapping matching Categories.tsx
// Icon mapping matching Categories.tsx (Dynamic now, but keeping map for fallback/lookup if needed)
import * as LucideIcons from 'lucide-react';


export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { cart } = useUserActivity();
  const { toggleSidebar } = useUI();
  const { announcementBar, layout } = useSiteSettings();
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const showSearchBar = layout?.header?.showSearchBar ?? true;
  const showWishlist = layout?.header?.showWishlist ?? true;
  const showCompare = layout?.header?.showCompare ?? true;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
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
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

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
              <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
                <div className="flex w-full border border-gray-300 rounded-md overflow-hidden focus-within:border-primary transition-colors">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products"
                    className="flex-1 border-0 focus-visible:ring-0 h-11"
                  />
                  <select className="bg-gray-50 border-l border-gray-300 px-3 text-sm text-gray-600 cursor-pointer focus:outline-none">
                    <option value="">SELECT CATEGORY</option>
                    <option value="">SELECT CATEGORY</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                  <Button type="submit" className="rounded-none h-11 w-11 bg-primary hover:bg-primary/90">
                    <Search className="w-5 h-5" />
                  </Button>
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
              
              {/* Wishlist - Secondary action, hidden on smallest screens for cleaner look */}
              {user && showWishlist && (
                <Link 
                  href="/wishlist" 
                  className="hidden xs:flex sm:flex items-center justify-center min-w-11 min-h-11 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </Link>
              )}

               {/* User Menu - Clean button styling */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center min-w-11 min-h-11 outline-none">
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
                    {['admin', 'moderator'].includes(user.role) && (
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/orderhistory">Order History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => logout()} className="text-red-600">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button size="sm" className="hidden sm:flex rounded-full px-6 bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20">
                    Login
                  </Button>
                  <Button size="icon" variant="ghost" className="sm:hidden text-gray-600">
                    <User className="w-5 h-5" />
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
                {categories.filter(c => c.showInHeader && !c.parent).slice(0, 5).map((category) => {
                  const Icon = (LucideIcons as any)[category.icon || 'Circle'] || LucideIcons.Circle;
                  const hasImage = category.image && category.image.trim() !== '';

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
                {showCompare && (
                  <Link href="/compare" className="relative text-gray-600 hover:text-primary transition-colors">
                    <GitCompare className="w-5 h-5" />
                    <span className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
                  </Link>
                )}
                {showWishlist && (
                  <Link href="/wishlist" className="relative text-gray-600 hover:text-primary transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========== MOBILE SEARCH BAR ========== */}
      {showSearchBar && (
        <div className="lg:hidden bg-white px-4 py-3 border-b">
          <form onSubmit={handleSearch}>
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products"
                className="flex-1 border-0 focus-visible:ring-0 h-10"
              />
              <Button type="submit" className="rounded-none h-10 w-10 bg-primary hover:bg-primary/90">
                <Search className="w-4 h-4" />
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
              {categories.filter(c => c.showInHeader).map((category) => (
                <div key={category._id} className="border-b border-gray-100">
                  <button
                    onClick={() => setExpandedCategory(
                      expandedCategory === parseInt(category._id) ? null : parseInt(category._id) // Temp fix for ID type mismatch if any
                    )}
                    className="flex items-center justify-between w-full px-4 py-3 text-left"
                  >
                    <span className="font-medium text-gray-800">{category.name}</span>
                    {category.children && category.children.length > 0 && (
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                        expandedCategory === parseInt(category._id) ? 'rotate-90' : ''
                      }`} />
                    )}
                  </button>
                  
                  {expandedCategory === parseInt(category._id) && category.children && (
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

      {/* ========== MOBILE BOTTOM BAR ========== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4 flex items-center justify-around z-50 lg:hidden">
        {showCompare && (
          <Link href="/compare" className="flex flex-col items-center text-gray-500">
            <GitCompare className="w-5 h-5" />
            <span className="text-[10px]">Compare</span>
          </Link>
        )}
        {showWishlist && (
          <Link href="/wishlist" className="flex flex-col items-center text-gray-500">
            <Heart className="w-5 h-5" />
            <span className="text-[10px]">Wishlist</span>
          </Link>
        )}
        <Link href="/cart" className="flex flex-col items-center text-gray-500 relative">
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 right-3 bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[10px]">Cart</span>
        </Link>
      </div>
    </>
  );
}
