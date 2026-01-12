"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import {SiVisa, SiMastercard} from "react-icons/si";

import {useSiteSettings} from "@/hooks/useSiteSettings";
import {useCategories} from "@/hooks/useCategories";

const footerLinks = {
  about: [
    {name: "About Us", href: "/about"},
    {name: "Store Locations", href: "/locations"},
    {name: "EMI Terms", href: "/emi-terms"},
    {name: "Privacy Policy", href: "/privacy"},
    {name: "Terms & Conditions", href: "/terms"},
  ],
  support: [
    {name: "Track Order", href: "/orderhistory"},
    {name: "Shipping Info", href: "/shipping"},
    {name: "Returns & Refunds", href: "/returns"},
    {name: "FAQs", href: "/faq"},
    {name: "Contact Us", href: "/contact"},
  ],
  // Categories will be dynamic
};

export default function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const {store, social} = useSiteSettings();
  const {categories} = useCategories();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const socialLinks = [
    {
      Icon: Facebook,
      href: social?.facebook,
      color: "hover:bg-blue-600",
      show: !!social?.facebook,
    },
    {
      Icon: Instagram,
      href: social?.instagram,
      color: "hover:bg-pink-600",
      show: !!social?.instagram,
    },
    {
      Icon: Youtube,
      href: social?.youtube,
      color: "hover:bg-red-600",
      show: !!social?.youtube,
    },
  ].filter((link) => link.show);

  return (
    <>
      <footer className="bg-white border-t border-gray-200 pb-20 lg:pb-0 print:hidden">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image
                  src="https://i.ibb.co/xSLpY24/logo-colored.webp"
                  alt="BestDeal"
                  width={40}
                  height={40}
                />
                <span className="text-xl font-bold">
                  <span className="text-primary">Best</span>
                  <span className="text-gray-800">Deal</span>
                </span>
              </Link>

              <p className="text-gray-500 text-sm mb-4 max-w-sm">
                Your trusted destination for quality electronics and gaming
                peripherals at the best prices.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                {store?.phone && (
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    {store.phone}
                  </p>
                )}
                {store?.email && (
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    {store.email}
                  </p>
                )}
                {store?.address && (
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {store.address}
                  </p>
                )}
              </div>

              {/* Social Icons */}
              <div className="flex gap-2">
                {socialLinks.map((social, i) => (
                  <Link
                    key={i}
                    href={social.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 ${social.color} hover:text-white transition-colors`}
                  >
                    <social.Icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:block">
              <h3 className="font-semibold text-gray-800 mb-4">About</h3>
              <ul className="space-y-2">
                {footerLinks.about.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block">
              <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block">
              <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.slice(0, 5).map((category) => (
                  <li key={category._id}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-sm text-gray-500 hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Accordions */}
            <div className="md:hidden col-span-1 border-t border-gray-200 pt-4 space-y-0">
              {Object.entries(footerLinks).map(([key, links]) => (
                <div key={key} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection(key)}
                    className="flex items-center justify-between w-full py-3"
                  >
                    <span className="font-medium text-gray-800 capitalize">
                      {key}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        expandedSection === key ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedSection === key && (
                    <ul className="pb-3 space-y-2">
                      {links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-sm text-gray-500 hover:text-primary"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} BestDeal. All Rights Reserved.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">Payment Partners:</span>
              <SiVisa className="text-2xl text-blue-600" />
              <SiMastercard className="text-2xl text-red-500" />
              <Image
                src="https://download.logo.wine/logo/BKash/BKash-Logo.wine.png"
                alt="bKash"
                width={50}
                height={20}
                className="h-5 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
