'use client';

import React from 'react';
import { Settings, Hammer, Mail, Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { FaWhatsapp } from 'react-icons/fa';

const socialIcons: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  whatsapp: FaWhatsapp,
};

export default function MaintenancePage() {
  const { social, store, isLoading } = useSiteSettings();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6">
      {/* Header/Logo Area */}
      <div className="w-full max-w-7xl flex justify-center py-8">
        <Link href="/" className="flex items-center gap-2">
          {store.logo && (
            <Image 
              src={store.logo} 
              alt={store.name} 
              width={40} 
              height={40} 
              className="object-contain"
            />
          )}
          <span className="text-2xl font-black text-gray-900 tracking-tight">{store.name}</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl w-full text-center py-12">
        <div className="mb-10 relative inline-block">
          <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center animate-pulse">
            <Settings className="w-16 h-16 text-primary animate-spin-slow" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100 transform rotate-12">
            <Hammer className="w-8 h-8 text-amber-500" />
          </div>
        </div>
        
        <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight leading-none">
          Site Maintenance
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg mx-auto">
          We&apos;re currently updating our store to serve you better. 
          Please check back soon!
        </p>

        {/* Contact info card-like section */}
        <div className="flex flex-col items-center gap-8">
          {store.email && (
            <div className="flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-full border border-gray-100">
               <Mail className="w-5 h-5 text-primary" />
               <span className="text-base font-bold text-gray-700">{store.email}</span>
            </div>
          )}

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {Object.entries(social).map(([key, url]) => {
              if (!url) return null;
              const Icon = socialIcons[key] || Mail;
              return (
                <Link 
                  key={key} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary hover:shadow-lg transition-all duration-300 group"
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                >
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-7xl border-t border-gray-100 pt-8 pb-6 text-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 text-gray-500 text-sm">
          <p className="font-semibold tracking-wide uppercase text-[10px]">
            &copy; {new Date().getFullYear()} {store.name}. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-primary transition-colors font-bold uppercase text-[10px] tracking-widest">
              Login
            </Link>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <p className="font-medium">Powered by BestDeal CMS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
