import React, { Suspense } from 'react';
import { HeroBanner, Categories, ServiceBar } from '@/components/home';
import { AIRecommendations } from '@/components/AI';
import ProductSection from '@/app/(main)/ProductSection';
import BrandMarquee from '@/components/home/BrandMarquee';

interface Section {
    id: string;
    type: string;
    isVisible: boolean;
    order: number;
    config: any;
}

export default function SectionRenderer({ section }: { section: Section }) {
    if (!section.isVisible) return null;

    switch (section.type) {
        case 'hero':
            return <HeroBanner config={section.config} />;
        
        case 'brandMarquee':
            return <BrandMarquee config={section.config} />;
            
        case 'categories':
            return <Categories config={section.config} />;
            
        case 'products':
            // We pass config to ProductSection, it will need to be updated to handle it
            return (
                <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading products...</div>}>
                    <ProductSection config={section.config} />
                </Suspense>
            );
            
        case 'serviceBar':
            return <ServiceBar />;
            
        case 'aiRecommendations':
            return (
                <div className="container mx-auto px-4">
                    <AIRecommendations 
                        title={section.config?.title || "Selected For You"} 
                        limit={section.config?.limit || 4} 
                    />
                </div>
            );
            
        default:
            return null;
    }
}
