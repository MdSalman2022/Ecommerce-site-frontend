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

export default function HeroBanner() {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

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
              className="rounded-xl overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100/50"
            >
              {heroSlides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className={`${slide.bgColor} relative h-[280px] md:h-[350px] lg:h-[400px] flex items-center`}>
                    {/* Text Content - Left side */}
                    <div className="z-10 pl-6 md:pl-10 max-w-[55%]">
                      <span className="inline-block text-red-500 text-sm font-bold mb-2">
                        {slide.badge}
                      </span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        {slide.title}
                        <br />
                        {slide.subtitle}
                        <br />
                        <span className="text-2xl md:text-3xl lg:text-4xl">{slide.highlight}</span>
                      </h2>
                      <Link
                        href={slide.link}
                        className="inline-block mt-4 bg-primary text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
                      >
                        Shop Now
                      </Link>
                    </div>
                    
                    {/* Product Image - Right side */}
                    <div className="absolute right-0 bottom-0 w-[50%] h-[90%]">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-contain object-right-bottom"
                        priority
                      />
                    </div>
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
            {promoCards.map((card) => (
              <Link
                key={card.id}
                href={card.link}
                className={`relative rounded-xl overflow-hidden h-[128px] group/card ${card.bgColor || ''}`}
                style={card.image ? { backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                {card.image && <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/50 transition-colors" />}
                <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                  <p className="text-white/80 text-xs uppercase">{card.subtitle}</p>
                  <h3 className="text-white font-bold text-lg">{card.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Promo Cards */}
          <div className="lg:hidden grid grid-cols-3 gap-2">
            {promoCards.map((card) => (
              <Link
                key={card.id}
                href={card.link}
                className={`rounded-lg overflow-hidden h-20 ${card.bgColor || 'bg-gray-800'} flex items-center justify-center`}
                style={card.image ? { backgroundImage: `url(${card.image})`, backgroundSize: 'cover' } : {}}
              >
                <div className={card.image ? 'bg-black/50 w-full h-full flex items-center justify-center' : ''}>
                  <span className="text-white text-xs font-medium text-center px-2">{card.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Marquee */}
      {isDesktop && (
        <Marquee
          className="h-20 lg:h-24 bg-white border-y border-gray-100"
          speed={100}
          pauseOnHover={true}
          gradient={false}
        >
          <FaApple className="mx-6 text-5xl lg:text-6xl text-gray-700 hover:text-black transition-colors" />
          <SiSamsung className="mx-6 text-4xl lg:text-5xl text-blue-600" />
          <SiXiaomi className="mx-6 text-5xl lg:text-6xl text-orange-500" />
          <SiAsus className="mx-6 text-4xl lg:text-5xl text-blue-600" />
          <SiRazer className="mx-6 text-5xl lg:text-6xl text-green-600" />

          <SiIntel className="mx-6 text-5xl lg:text-6xl text-blue-500" />
          <SiAmd className="mx-6 text-4xl lg:text-5xl text-red-600" />
          <SiNvidia className="mx-6 text-5xl lg:text-6xl text-green-500" />
          <SiDell className="mx-6 text-5xl lg:text-6xl text-blue-700" />
          <SiLogitech className="mx-6 text-5xl lg:text-6xl text-sky-500" />
          <SiCorsair className="mx-6 text-5xl lg:text-6xl text-gray-800" />
          <Image src="https://i.ibb.co/Jp47P3J/noctua-logo.webp" alt="Noctua" width={80} height={40} className="mx-6" />
          <Image src="https://i.ibb.co/TcBrDB1/msi.webp" alt="MSI" width={80} height={40} className="mx-6" />
        </Marquee>
      )}
    </section>
  );
}
