'use client';

import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

const socialLinks = [
  { 
    icon: Facebook, 
    href: 'https://facebook.com', 
    className: 'bg-blue-600 hover:bg-blue-700',
    label: 'Facebook' 
  },
  { 
    icon: Instagram, 
    href: 'https://instagram.com', 
    className: 'bg-gradient-to-br from-purple-600 via-pink-500 to-primary/70 hover:opacity-90',
    label: 'Instagram' 
  },
  { 
    icon: FaTiktok, 
    href: 'https://tiktok.com', 
    className: 'bg-black hover:bg-gray-800',
    label: 'TikTok' 
  },
];

export default function RightSidebar() {
  return (
    <aside className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col rounded-l-lg overflow-hidden shadow-lg">
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <Link
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center p-2.5 text-white transition-all ${social.className}`}
            aria-label={social.label}
          >
            <Icon className="w-4 h-4" />
          </Link>
        );
      })}
    </aside>
  );
}
