'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import { useUI } from '@/contexts/UIProvider';

import { AiOutlineShoppingCart, AiOutlineSetting, AiOutlinePercentage } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { MdOutlineLocalShipping, MdOutlineLogout, MdCategory } from 'react-icons/md';
import { BsCreditCard2Back, BsPeople, BsGrid1X2, BsBell, BsDisplay } from 'react-icons/bs';
import { HiUserGroup } from 'react-icons/hi';
import { IoStatsChart } from 'react-icons/io5';
import { Menu, Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import AdminGuard from '@/components/guards/AdminGuard';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { logout, user } = useAuth();
    const { title: contextTitle } = useUI();
    const pathname = usePathname();
    
    const getActiveTab = (path: string) => {
        if (path === '/dashboard') return 'dashboard';
        return path.split('/').pop() || '';
    };

    const getPageTitle = (path: string) => {
        if (path.includes('/products/edit/')) return 'Edit Product';
        if (path.includes('/products/add')) return 'Add Product';
        
        const segment = path.split('/').filter(Boolean).pop() || 'dashboard';
        return segment.charAt(0).toUpperCase() + segment.slice(1);
    };

    const [sheetOpen, setSheetOpen] = useState(false);
    const activeTab = getActiveTab(pathname);
    const pageTitle = contextTitle && contextTitle !== 'BestDeal' ? contextTitle : getPageTitle(pathname);

    const handleLogOut = () => {
        logout()
            .then(() => { })
            .catch(error => console.error(error));
    };

    const sidebarItems = [
        { name: 'Dashboard', icon: <BsGrid1X2 />, path: '/dashboard', id: 'dashboard' },
        { name: 'Orders', icon: <AiOutlineShoppingCart />, path: '/dashboard/orders', id: 'orders' },
        { name: 'Products', icon: <BiCategory />, path: '/dashboard/products', id: 'products' },
        { name: 'Categories', icon: <MdCategory />, path: '/dashboard/categories', id: 'categories' },
        { name: 'Customers', icon: <BsPeople />, path: '/dashboard/customers', id: 'customers' },
        { name: 'Page Builder', icon: <BsDisplay />, path: '/dashboard/page-builder', id: 'page-builder' },
        { name: 'Promo Codes', icon: <AiOutlinePercentage />, path: '/dashboard/promocodes', id: 'promocodes' },
        { name: 'Transactions', icon: <BsCreditCard2Back />, path: '/dashboard/transactions', id: 'transactions' },
        { name: 'Analytics', icon: <IoStatsChart />, path: '/dashboard/analytics', id: 'analytics' },
        { name: 'Statistics', icon: <MdOutlineLocalShipping />, path: '/dashboard/statistics', id: 'statistics' },
        { name: 'Notifications', icon: <BsBell />, path: '/dashboard/notifications', id: 'notifications' },
        ...(user?.role === 'admin' ? [{ name: 'Team', icon: <HiUserGroup />, path: '/dashboard/team', id: 'team' }] : []),
        { name: 'Settings', icon: <AiOutlineSetting />, path: '/dashboard/settings', id: 'settings' },
    ];

    const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
        <div className="flex flex-col h-full">
            <Link href="/" className="h-16 flex items-center gap-3 px-6 border-b border-gray-200" onClick={onClose}>
                <Image 
                    width={36} 
                    height={36} 
                    src="https://res.cloudinary.com/dnuulo3h5/image/upload/v1767881296/logo-colored_ee6kpe.webp" 
                    alt="logo" 
                />
                <span className="font-bold text-lg text-foreground">
                    BestDeal
                </span>
            </Link>

            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => (
                    <Link 
                        key={item.id} 
                        href={item.path}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium
                            ${activeTab === item.id 
                                ? 'bg-primary text-white' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-3 border-t border-border">
                <button 
                    onClick={() => {
                        handleLogOut();
                        onClose?.();
                    }} 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <MdOutlineLogout className="text-lg" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );

    return (
        <AdminGuard>
            <div className="fixed inset-0 z-0 bg-gray-50 flex overflow-hidden">
            
            <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col flex-shrink-0">
                <SidebarContent />
            </aside>

            
            <div className="flex-1 flex flex-col min-w-0">
                
                <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-6 flex items-center gap-4 flex-shrink-0 z-10">
                    
                    <div className="md:hidden">
                        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 p-0">
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Navigation Menu</SheetTitle>
                                </SheetHeader>
                                <SidebarContent onClose={() => setSheetOpen(false)} />
                            </SheetContent>
                        </Sheet>
                    </div>

                    
                    <div className="flex items-center min-w-0 max-w-[200px] sm:max-w-[400px] lg:max-w-[600px]">
                        <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate" title={typeof pageTitle === 'string' ? pageTitle : undefined}>
                            {pageTitle}
                        </h1>
                    </div>

                    
                    <div className={`flex-1 max-w-xl mx-auto hidden sm:block px-8 ${
                        (pathname.includes('/products/edit/') || pathname.includes('/products/add')) ? 'invisible' : ''
                    }`}>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                                placeholder="Search..." 
                                className="pl-9 h-9 bg-gray-50 border-gray-200 focus:bg-white w-full"
                            />
                        </div>
                    </div>

                    
                    <div className="flex items-center gap-2 ml-auto">
                        <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex">
                            <Bell className="h-5 w-5 text-gray-500" />
                        </Button>
                        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 hidden lg:block">
                                {user?.name || 'Admin'}
                            </span>
                        </div>
                    </div>
                </header>

                
                <main className="flex-1 overflow-y-auto p-4 md:p-[20px]">

                    
                    {children}
                </main>
            </div>
        </div>
    </AdminGuard>
);
}
