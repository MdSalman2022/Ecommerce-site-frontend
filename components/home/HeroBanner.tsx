'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import { 
  SiSamsung, SiAsus, SiRazer, SiIntel, SiAmd, SiNvidia, 
  SiLogitech, SiDell, SiCorsair, SiXiaomi, SiLenovo, SiHp
} from 'react-icons/si';
import { FaApple } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';

// Hero slides with content from your database theme
const heroSlides = [
  {
    id: 1,
    badge: 'Coming Soon May',
    title: 'New Lenovo',
    subtitle: 'Laptop Intel',
    highlight: 'Core I9 13900K',
    image: 'https://i.ibb.co/mqPKhHX/image-removebg-preview-2.webp',
    link: '/category/laptop',
    bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100/50',
  },
  {
    id: 2,
    badge: 'Latest Product',
    title: 'Macbook Pro',
    subtitle: 'Macbook Pro 14"',
    highlight: 'Apple M2 Pro Chip',
    image: 'https://i.ibb.co/Dprx1Fh/image-removebg-preview-4.webp',
    link: '/category/laptop',
    bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
  },
  {
    id: 3,
    badge: 'Coming Soon May',
    title: 'Ultra Reborn',
    subtitle: 'Samsung S23 Ultra',
    highlight: '200MP Wow-worthy resolution',
    image: 'https://i.ibb.co/vj1jcZ1/image-removebg-preview-5.webp',
    link: '/category/smartphone',
    bgColor: 'bg-gradient-to-br from-purple-50 to-gray-50',
  },
];

// Promo cards - matching Blisstronics layout
// Promo cards - matching Blisstronics layout
const promoCards = [
  {
    id: 1,
    subtitle: 'IN BANGLADESH',
    title: 'Gaming Experience Center',
    image: '/assets/banners/gaming_center.png',
    link: '/locations',
    bgColor: 'bg-gray-800',
  },
  {
    id: 2,
    subtitle: 'AVAILABLE NOW!',
    title: 'Latest Accessories',
    image: '/assets/banners/accessories.png',
    link: '/category/accessories',
    bgColor: 'bg-gray-800',
  },
  {
    id: 3,
    subtitle: 'Keep your eyes open',
    title: 'LAUNCHING SOON!',
    image: '/assets/banners/launching.png',
    link: '/products',
    bgColor: 'bg-gray-800',
  },
];

export default function HeroBanner({ config }: { config?: any }) {
    const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    // Use config slides or fallback to defaults
    const slides = config?.slides || [
        {
            id: '1',
            badge: 'Coming Soon May',
            title: 'New Lenovo',
            subtitle: 'Laptop Intel',
            highlight: 'Core I9 13900K',
            productImage: 'https://i.ibb.co/mqPKhHX/image-removebg-preview-2.webp',
            ctaLink: '/category/laptop',
            bgGradient: 'from-orange-50 to-orange-100/50',
        }
    ];

    // Use config promo cards or fallback
    const promoCards = config?.promoCards || [
        {
            id: '1',
            subtitle: 'IN BANGLADESH',
            title: 'Gaming Experience Center',
            image: '/assets/banners/gaming_center.png',
            link: '/locations',
            bgColor: 'bg-gray-800',
        },
        {
            id: '2',
            subtitle: 'AVAILABLE NOW!',
            title: 'Latest Accessories',
            image: '/assets/banners/accessories.png',
            link: '/category/accessories',
            bgColor: 'bg-gray-800',
        },
        {
            id: '3',
            subtitle: 'Keep your eyes open',
            title: 'LAUNCHING SOON!',
            image: '/assets/banners/launching.png',
            link: '/products',
            bgColor: 'bg-gray-800',
        },
    ];

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        setIsDesktop(mediaQuery.matches);
        
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return (
        <section>
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-4 lg:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4"> 
                    <div className="lg:col-span-2 relative group">
                        <Swiper
                            onSwiper={setSwiperRef}
                            modules={[Pagination, Autoplay, Navigation]}
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            pagination={{ clickable: true }}
                            loop={true}
                            className="rounded-xl overflow-hidden shadow-sm border border-border"
                        >
                            {slides.map((slide: any) => (
                                <SwiperSlide key={slide.id}>
                                    <div className={`bg-gradient-to-br ${slide.bgGradient || 'from-gray-50 to-gray-100'} relative h-[280px] md:h-[350px] lg:h-[400px] flex items-center`}>
                                        {/* Text Content - Left side */}
                                        <div className="z-10 pl-6 md:pl-10 max-w-[55%]">
                                            <span className="inline-block text-red-500 text-sm font-bold mb-2">
                                                {slide.badge}
                                            </span>
                                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                                {slide.title}
                                                <br />
                                                <span className="text-primary font-extrabold">{slide.subtitle}</span>
                                                <br />
                                                <span className="text-2xl md:text-3xl lg:text-4xl text-gray-700">{slide.highlight}</span>
                                            </h2>
                                            <Link
                                                href={slide.ctaLink || '#'}
                                                className="inline-block mt-4 bg-primary text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-md"
                                            >
                                                {slide.ctaText || 'Shop Now'}
                                            </Link>
                                        </div>
                                        
                                        {/* Product Image - Right side */}
                                        {slide.productImage && (
                                            <div className="absolute right-0 bottom-0 w-[50%] h-[90%] pointer-events-none">
                                                <div className="relative w-full h-full transform hover:scale-110 transition-transform duration-700">
                                                    <Image
                                                        src={slide.productImage}
                                                        alt={slide.title}
                                                        fill
                                                        className="object-contain object-right-bottom drop-shadow-2xl"
                                                        priority
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Navigation Arrows */}
                        <button
                            onClick={() => swiperRef?.slidePrev()}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                            onClick={() => swiperRef?.slideNext()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                    </div> 
                    <div className="hidden lg:flex flex-col gap-3">
                        {promoCards.map((card: any) => (
                            <Link
                                key={card.id}
                                href={card.link || '#'}
                                className={`relative rounded-xl overflow-hidden h-[128px] group/card ${card.bgColor || 'bg-gray-800'} border border-border shadow-sm`}
                                style={card.image ? { backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                            >
                                {card.image && <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/50 transition-colors" />}
                                <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                                    <p className="text-white/80 text-[10px] uppercase font-bold tracking-wider">{card.subtitle}</p>
                                    <h3 className="text-white font-bold text-lg group-hover/card:text-primary transition-colors">{card.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Promo Cards */}
                    <div className="lg:hidden grid grid-cols-3 gap-2">
                        {promoCards.map((card: any) => (
                            <Link
                                key={card.id}
                                href={card.link || '#'}
                                className={`rounded-lg overflow-hidden h-20 ${card.bgColor || 'bg-gray-800'} flex items-center justify-center border border-border shadow-sm`}
                                style={card.image ? { backgroundImage: `url(${card.image})`, backgroundSize: 'cover' } : {}}
                            >
                                <div className={card.image ? 'bg-black/50 w-full h-full flex items-center justify-center p-2' : 'p-2'}>
                                    <span className="text-white text-[10px] font-bold text-center leading-tight line-clamp-2">{card.title}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

