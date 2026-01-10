'use client';

import React from 'react';
import { 
    SiSamsung, SiAsus, SiRazer, SiIntel, SiAmd, SiNvidia, 
    SiLogitech, SiDell, SiCorsair, SiXiaomi, SiLenovo, SiHp
} from 'react-icons/si';
import { FaApple } from 'react-icons/fa';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

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

interface BrandMarqueeEditorProps {
    config: MarqueeConfig;
    onChange: (config: MarqueeConfig) => void;
}

const PREDEFINED_BRANDS = [
    { id: 'apple', name: 'Apple', icon: FaApple },
    { id: 'samsung', name: 'Samsung', icon: SiSamsung },
    { id: 'xiaomi', name: 'Xiaomi', icon: SiXiaomi },
    { id: 'asus', name: 'ASUS', icon: SiAsus },
    { id: 'razer', name: 'Razer', icon: SiRazer },
    { id: 'intel', name: 'Intel', icon: SiIntel },
    { id: 'amd', name: 'AMD', icon: SiAmd },
    { id: 'nvidia', name: 'NVIDIA', icon: SiNvidia },
    { id: 'dell', name: 'Dell', icon: SiDell },
    { id: 'logitech', name: 'Logitech', icon: SiLogitech },
    { id: 'corsair', name: 'Corsair', icon: SiCorsair },
    { id: 'lenovo', name: 'Lenovo', icon: SiLenovo },
    { id: 'hp', name: 'HP', icon: SiHp }
];

export default function BrandMarqueeEditor({ config, onChange }: BrandMarqueeEditorProps) {
    const handleToggleBrand = (brandId: string) => {
        const isSelected = config.selectedBrands.includes(brandId);
        const updated = isSelected 
            ? config.selectedBrands.filter(id => id !== brandId)
            : [...config.selectedBrands, brandId];
        onChange({ ...config, selectedBrands: updated });
    };

    const handleAddImage = () => {
        const newImg: CustomImage = {
            id: `img-${Date.now()}`,
            url: '',
            alt: ''
        };
        onChange({ ...config, customImages: [...config.customImages, newImg] });
    };

    const handleImageChange = (id: string, field: keyof CustomImage, value: string) => {
        const updated = config.customImages.map(img => 
            img.id === id ? { ...img, [field]: value } : img
        );
        onChange({ ...config, customImages: updated });
    };

    const handleRemoveImage = (id: string) => {
        onChange({ ...config, customImages: config.customImages.filter(img => img.id !== id) });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-accent/10 p-4 rounded-xl">
                <div className="space-y-1">
                    <Label className="text-sm font-bold">Marquee Speed</Label>
                    <p className="text-xs text-muted-foreground">Adjust how fast brands scroll (50-200)</p>
                </div>
                <div className="w-1/2">
                    <Slider 
                        min={50} 
                        max={300} 
                        step={10} 
                        value={[config.speed || 100]} 
                        onValueChange={(val) => onChange({ ...config, speed: val[0] })}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between bg-accent/10 p-4 rounded-xl">
                <div className="space-y-1">
                    <Label className="text-sm font-bold">Pause on Hover</Label>
                    <p className="text-xs text-muted-foreground">Stop scrolling when mouse pointer is over the marquee</p>
                </div>
                <Switch 
                    checked={config.pauseOnHover} 
                    onCheckedChange={(checked) => onChange({ ...config, pauseOnHover: checked })}
                />
            </div>

            <Tabs value={config.displayType} onValueChange={(val: any) => onChange({ ...config, displayType: val })}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="icons">Brand Icons</TabsTrigger>
                    <TabsTrigger value="images">Custom Images</TabsTrigger>
                </TabsList>

                <TabsContent value="icons" className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {PREDEFINED_BRANDS.map((brand) => (
                            <div 
                                key={brand.id}
                                onClick={() => handleToggleBrand(brand.id)}
                                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${config.selectedBrands.includes(brand.id) ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-primary/50'}`}
                            >
                                <brand.icon className={`w-5 h-5 ${config.selectedBrands.includes(brand.id) ? 'text-primary' : 'text-muted-foreground'}`} />
                                <span className="text-xs font-semibold">{brand.name}</span>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="images" className="mt-4 space-y-4">
                    <div className="space-y-3">
                        {config.customImages.map((img, index) => (
                            <div key={img.id} className="flex items-center gap-3 p-3 border rounded-xl bg-accent/5">
                                <span className="text-xs font-bold text-muted-foreground w-6">#{index + 1}</span>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Input 
                                        placeholder="Image URL (https://...)" 
                                        value={img.url}
                                        onChange={(e) => handleImageChange(img.id, 'url', e.target.value)}
                                        className="h-8 text-xs"
                                    />
                                    <Input 
                                        placeholder="Alt Text (e.g. Sony)" 
                                        value={img.alt}
                                        onChange={(e) => handleImageChange(img.id, 'alt', e.target.value)}
                                        className="h-8 text-xs"
                                    />
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-red-500 hover:bg-red-50"
                                    onClick={() => handleRemoveImage(img.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full border-dashed" onClick={handleAddImage}>
                            <Plus className="w-4 h-4 mr-2" /> Add Custom Brand Image
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
