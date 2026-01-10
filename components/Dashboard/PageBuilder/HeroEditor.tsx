'use client';

import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Image as ImageIcon, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Slide {
    id: string;
    badge: string;
    title: string;
    subtitle: string;
    highlight: string;
    ctaText: string;
    ctaLink: string;
    productImage: string;
    bgGradient: string;
}

interface PromoCard {
    id: string;
    subtitle: string;
    title: string;
    image: string;
    link: string;
    bgColor: string;
}

interface HeroConfig {
    slides: Slide[];
    promoCards: PromoCard[];
}

interface HeroEditorProps {
    config: HeroConfig;
    onChange: (config: HeroConfig) => void;
}

export default function HeroEditor({ config, onChange }: HeroEditorProps) {
    const [activeTab, setActiveTab] = useState<'slides' | 'promo'>('slides');

    const handleSlideChange = (id: string, field: keyof Slide, value: string) => {
        const updatedSlides = config.slides.map(slide => 
            slide.id === id ? { ...slide, [field]: value } : slide
        );
        onChange({ ...config, slides: updatedSlides });
    };

    const handleAddSlide = () => {
        const newSlide: Slide = {
            id: `slide-${Date.now()}`,
            badge: 'New Badge',
            title: 'New Title',
            subtitle: 'New Subtitle',
            highlight: 'Special Highlight',
            ctaText: 'Shop Now',
            ctaLink: '/products',
            productImage: '',
            bgGradient: 'from-orange-50 to-orange-100/50'
        };
        onChange({ ...config, slides: [...config.slides, newSlide] });
    };

    const handleRemoveSlide = (id: string) => {
        onChange({ ...config, slides: config.slides.filter(s => s.id !== id) });
    };

    const handlePromoChange = (id: string, field: keyof PromoCard, value: string) => {
        const updatedCards = config.promoCards.map(card => 
            card.id === id ? { ...card, [field]: value } : card
        );
        onChange({ ...config, promoCards: updatedCards });
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-2 border-b pb-2">
                <Button 
                    variant={activeTab === 'slides' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setActiveTab('slides')}
                >
                    Carousel Slides
                </Button>
                <Button 
                    variant={activeTab === 'promo' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setActiveTab('promo')}
                >
                    Right Promo Cards
                </Button>
            </div>

            {activeTab === 'slides' ? (
                <div className="space-y-4">
                    {config.slides.map((slide, index) => (
                        <div key={slide.id} className="border rounded-xl p-4 bg-accent/10 space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold flex items-center gap-2">
                                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                                    Slide #{index + 1}
                                </h4>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-red-500 hover:bg-red-50"
                                    onClick={() => handleRemoveSlide(slide.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs">Badge Text</Label>
                                    <Input 
                                        value={slide.badge} 
                                        onChange={(e) => handleSlideChange(slide.id, 'badge', e.target.value)}
                                        className="h-8 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Product Image URL</Label>
                                    <Input 
                                        value={slide.productImage} 
                                        onChange={(e) => handleSlideChange(slide.id, 'productImage', e.target.value)}
                                        className="h-8 text-sm"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Main Title</Label>
                                    <Input 
                                        value={slide.title} 
                                        onChange={(e) => handleSlideChange(slide.id, 'title', e.target.value)}
                                        className="h-8 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Subtitle</Label>
                                    <Input 
                                        value={slide.subtitle} 
                                        onChange={(e) => handleSlideChange(slide.id, 'subtitle', e.target.value)}
                                        className="h-8 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Highlight Text</Label>
                                    <Input 
                                        value={slide.highlight} 
                                        onChange={(e) => handleSlideChange(slide.id, 'highlight', e.target.value)}
                                        className="h-8 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Background Gradient</Label>
                                    <Input 
                                        value={slide.bgGradient} 
                                        onChange={(e) => handleSlideChange(slide.id, 'bgGradient', e.target.value)}
                                        className="h-8 text-sm"
                                        placeholder="from-orange-50 to-orange-100/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">CTA Button Text</Label>
                                    <Input 
                                        value={slide.ctaText} 
                                        onChange={(e) => handleSlideChange(slide.id, 'ctaText', e.target.value)}
                                        className="h-8 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">CTA Link URL</Label>
                                    <Input 
                                        value={slide.ctaLink} 
                                        onChange={(e) => handleSlideChange(slide.id, 'ctaLink', e.target.value)}
                                        className="h-8 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" className="w-full border-dashed" onClick={handleAddSlide}>
                        <Plus className="w-4 h-4 mr-2" /> Add Slide
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {config.promoCards.map((card, index) => (
                        <div key={card.id} className="border rounded-xl p-4 bg-accent/10 space-y-4">
                            <h4 className="text-sm font-bold">Promo Card #{index + 1}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs">Title</Label>
                                    <Input 
                                        value={card.title} 
                                        onChange={(e) => handlePromoChange(card.id, 'title', e.target.value)}
                                        className="h-8 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Subtitle</Label>
                                    <Input 
                                        value={card.subtitle} 
                                        onChange={(e) => handlePromoChange(card.id, 'subtitle', e.target.value)}
                                        className="h-8 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Background Image URL</Label>
                                    <Input 
                                        value={card.image} 
                                        onChange={(e) => handlePromoChange(card.id, 'image', e.target.value)}
                                        className="h-8 text-sm"
                                        placeholder="/assets/banners/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Link URL</Label>
                                    <Input 
                                        value={card.link} 
                                        onChange={(e) => handlePromoChange(card.id, 'link', e.target.value)}
                                        className="h-8 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Background Color Class</Label>
                                    <Input 
                                        value={card.bgColor} 
                                        onChange={(e) => handlePromoChange(card.id, 'bgColor', e.target.value)}
                                        className="h-8 text-sm"
                                        placeholder="bg-gray-800"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
