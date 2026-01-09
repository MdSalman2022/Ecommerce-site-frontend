
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as LucideIcons from 'lucide-react';

// Curated list of icons for e-commerce
const POPULAR_ICONS = [
    // Electronics & Gadgets
    'Smartphone', 'Laptop', 'Monitor', 'Tablet', 'Camera', 'Headphones', 'Speaker', 
    'Watch', 'Tv', 'Cpu', 'Printer', 'HardDrive', 'Keyboard', 'Mouse', 'Plug', 
    'Battery', 'Wifi', 'Radio', 'Gamepad', 'Zap', 'Server', 'Database', 'Microchip',
    'CircuitBoard', 'Cable', 'Projector', 'Webcam', 'Mic', 'Router',

    // Clothing & Fashion
    'Shirt', 'Footprints', 'Glasses', 'Crown', 'Gem', 'Scissors', 'Umbrella', 
    'Briefcase', 'ShoppingBag', 'Tag', 'Watch', 'GraduationCap', 'Pocket', 'Scissors',
    'Ruler', 'Palette', 'Highlighter',

    // Home & Lifestyle
    'Home', 'Armchair', 'Bed', 'Lamp', 'Bath', 'Utensils', 'Coffee', 'Wine', 
    'Dumbbell', 'Bike', 'Car', 'Plane', 'Baby', 'Dog', 'Flower', 'Hammer', 'Wrench',
    'Sofa', 'DoorOpen', 'Refrigerator', 'ChefHat', 'Pizza', 'Beer', 'Martini',
    'Trees', 'Mountain', 'Tent', 'Fan', 'Thermometer', 'Droplet', 'Wind',

    // Office & Stationary
    'Book', 'FileText', 'Folder', 'Paperclip', 'Pen', 'Pencil', 'Clipboard', 
    'Calculator', 'Printer', 'Archive', 'Trash2', 'Mail', 'Phone', 'Calendar',

    // General E-commerce & UI
    'ShoppingCart', 'CreditCard', 'Wallet', 'Banknote', 'Coins', 'Receipt', 
    'Package', 'Box', 'Truck', 'MapPin', 'Globe', 'Gift', 'Percent', 'Megaphone', 
    'Flame', 'Star', 'Heart', 'Award', 'ThumbsUp', 'User', 'Users', 'Settings', 
    'Menu', 'Grid', 'List', 'Search', 'Filter', 'Image', 'Video', 'Music', 'Ticket', 
    'Ghost', 'Smile', 'Sun', 'Moon', 'Bell', 'Info', 'HelpCircle', 'AlertTriangle',
    'CheckCircle', 'XCircle', 'Plus', 'Minus', 'ChevronRight', 'ArrowRight'
];

interface IconPickerProps {
    value: string;
    onChange: (iconName: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isManual, setIsManual] = useState(false);
    const [manualValue, setManualValue] = useState('');

    const filteredIcons = POPULAR_ICONS.filter(icon => 
        icon.toLowerCase().includes(search.toLowerCase())
    );

    const SelectedIcon = (LucideIcons as any)[value] || LucideIcons.HelpCircle;

    // Helper to get icon component safely
    const getIconComponent = (name: string) => {
        return (LucideIcons as any)[name];
    };

    return (
        <div className="relative">
            <Button
                type="button"
                variant="outline"
                className="w-full justify-between px-3 font-normal"
                onClick={() => {
                    setIsOpen(!isOpen);
                    setIsManual(false); // Reset to picker view on open
                    setSearch('');
                }}
            >
                <div className="flex items-center gap-2">
                    <SelectedIcon className="h-4 w-4" />
                    <span>{value || "Select an icon"}</span>
                </div>
            </Button>

            {isOpen && (
                <div className="absolute top-full text-left left-0 w-full z-50 mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg p-3">
                    {!isManual ? (
                        <>
                            <div className="mb-2">
                                <Input 
                                    placeholder="Search icons..." 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="h-8"
                                    autoFocus
                                />
                            </div>
                            <div className="grid grid-cols-6 gap-2 max-h-[200px] overflow-y-auto p-1 text-left">
                                {filteredIcons.map((iconName) => {
                                    const Icon = (LucideIcons as any)[iconName];
                                    if (!Icon) return null;
                                    
                                    return (
                                        <button
                                            key={iconName}
                                            type="button"
                                            onClick={() => {
                                                onChange(iconName);
                                                setIsOpen(false);
                                            }}
                                            className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors ${
                                                value === iconName ? 'bg-primary/10 text-primary ring-1 ring-primary' : 'text-gray-600 dark:text-gray-400'
                                            }`}
                                            title={iconName}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </button>
                                    );
                                })}
                            </div>
                            {filteredIcons.length === 0 && (
                                <div className="text-center py-4 text-sm text-gray-500">
                                    No icons found
                                </div>
                            )}
                            <div className="border-t mt-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsManual(true);
                                        setManualValue(value);
                                    }}
                                    className="text-xs text-primary hover:underline w-full text-center block"
                                >
                                    Can&apos;t find it? Type icon name directly
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">
                                    Manual Icon Name (Lucide)
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="e.g. Activity"
                                        value={manualValue}
                                        onChange={(e) => setManualValue(e.target.value)}
                                        className="h-8 flex-1"
                                        autoFocus
                                    />
                                    <div className="w-8 h-8 rounded border flex items-center justify-center bg-gray-50">
                                        {(() => {
                                            const PreviewIcon = getIconComponent(manualValue);
                                            return PreviewIcon ? <PreviewIcon className="h-4 w-4" /> : <LucideIcons.HelpCircle className="h-4 w-4 text-gray-300" />;
                                        })()}
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">
                                    Enters case-sensitive name from Lucide React library.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="flex-1 h-8 text-xs"
                                    onClick={() => setIsManual(false)}
                                >
                                    Back to List
                                </Button>
                                <Button 
                                    size="sm" 
                                    className="flex-1 h-8 text-xs"
                                    disabled={!getIconComponent(manualValue)}
                                    onClick={() => {
                                        if (getIconComponent(manualValue)) {
                                            onChange(manualValue);
                                            setIsOpen(false);
                                        }
                                    }}
                                >
                                    Apply
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {/* Backdrop to close */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
