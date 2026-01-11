"use client";

import React from "react";
import Link from "next/link";
import {Facebook, Instagram} from "lucide-react";
import {FaTiktok} from "react-icons/fa";
import {useSiteSettings} from "@/hooks/useSiteSettings";

// Static links removed in favor of dynamic settings

export default function RightSidebar() {
  const {social} = useSiteSettings();

  // Map dynamic settings to icon components
  const activeLinks = React.useMemo(() => {
    const links = [];

    if (social.facebook)
      links.push({
        icon: Facebook,
        href: social.facebook,
        className: "bg-blue-600 hover:bg-blue-700",
        label: "Facebook",
      });
    if (social.instagram)
      links.push({
        icon: Instagram,
        href: social.instagram,
        className:
          "bg-gradient-to-br from-purple-600 via-pink-500 to-primary/70 hover:opacity-90",
        label: "Instagram",
      });
    if (social.tiktok)
      links.push({
        icon: FaTiktok,
        href: social.tiktok,
        className: "bg-black hover:bg-gray-800",
        label: "TikTok",
      });

    return links;
  }, [social]);

  if (activeLinks.length === 0) return null;

  return (
    <aside className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col rounded-l-lg overflow-hidden shadow-lg">
      {activeLinks.map((social, index) => {
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
