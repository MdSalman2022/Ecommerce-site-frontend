'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { 
  SiSamsung, SiAsus, SiRazer, SiIntel, SiAmd, SiNvidia, 
  SiLogitech, SiDell, SiCorsair, SiXiaomi, SiLenovo, SiHp
} from 'react-icons/si';
import { FaApple } from 'react-icons/fa';

interface CustomImage {
    id: string;
    url: string;
    alt: string;
}

interface MarqueeConfig {
    displayType: 'icons' | 'images';
    speed: number;
    pauseOnHover: boolean;
    selectedBrands: string[];
    customImages: CustomImage[];
}

const BRAND_ICONS: Record<string, any> = {
    apple: <FaApple className="mx-6 text-5xl lg:text-6xl text-gray-700 hover:text-black transition-colors" />,
    samsung: <SiSamsung className="mx-6 text-4xl lg:text-5xl text-blue-600" />,
    xiaomi: <SiXiaomi className="mx-6 text-5xl lg:text-6xl text-orange-500" />,
    asus: <SiAsus className="mx-6 text-4xl lg:text-5xl text-blue-600" />,
    razer: <SiRazer className="mx-6 text-5xl lg:text-6xl text-green-600" />,
    intel: <SiIntel className="mx-6 text-5xl lg:text-6xl text-blue-500" />,
    amd: <SiAmd className="mx-6 text-4xl lg:text-5xl text-red-600" />,
    nvidia: <SiNvidia className="mx-6 text-5xl lg:text-6xl text-green-500" />,
    dell: <SiDell className="mx-6 text-5xl lg:text-6xl text-blue-700" />,
    logitech: <SiLogitech className="mx-6 text-5xl lg:text-6xl text-sky-500" />,
    corsair: <SiCorsair className="mx-6 text-5xl lg:text-6xl text-gray-800" />,
    lenovo: <SiLenovo className="mx-6 text-5xl lg:text-6xl text-red-600" />,
    hp: <SiHp className="mx-6 text-5xl lg:text-6xl text-blue-800" />
};

export default function BrandMarquee({ config }: { config?: MarqueeConfig }) {
    // Default fallback icons if no config
    const defaultBrands = ['apple', 'samsung', 'xiaomi', 'asus', 'razer', 'intel', 'amd', 'nvidia', 'dell', 'logitech', 'corsair'];
    
    const displayType = config?.displayType || 'icons';
    const speed = config?.speed || 100;
    const pauseOnHover = config?.pauseOnHover ?? true;
    const selectedBrands = config?.selectedBrands || defaultBrands;
    const customImages = config?.customImages || [];

    return (
        <Marquee
            className="h-20 lg:h-24 bg-white border-y border-gray-100"
            speed={speed}
            pauseOnHover={pauseOnHover}
            gradient={false}
        >
            {displayType === 'icons' ? (
                selectedBrands.map(brandId => (
                    <React.Fragment key={brandId}>
                        {BRAND_ICONS[brandId]}
                    </React.Fragment>
                ))
            ) : (
                customImages.map(img => (
                    <div key={img.id} className="mx-10 flex items-center justify-center">
                        <img 
                            src={img.url} 
                            alt={img.alt} 
                            style={{ height: '40px', width: 'auto', objectFit: 'contain' }} 
                        />
                    </div>
                ))
            )}
            
            {/* If using defaults or if icons selected is small, add some default logos to fill */}
            {displayType === 'icons' && selectedBrands.includes('msi') === false && (
                <Image src="https://i.ibb.co/TcBrDB1/msi.webp" alt="MSI" width={80} height={40} className="mx-6" />
            )}
            {displayType === 'icons' && selectedBrands.includes('noctua') === false && (
                <Image src="https://i.ibb.co/Jp47P3J/noctua-logo.webp" alt="Noctua" width={80} height={40} className="mx-6" />
            )}
        </Marquee>
    );
}
