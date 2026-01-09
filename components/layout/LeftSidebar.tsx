'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Keyboard, Mouse, Headphones, Gamepad2, Mic, Square, Monitor, 
  Sun, Layers, Zap, Cpu, Laptop, CircuitBoard, Speaker, HardDrive, Printer, 
  Camera, Wifi, Menu, ChevronRight, Smartphone, Tablet, Tv
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/constants';
import { useUI } from '@/contexts/UIProvider';

// Icon mapping based on strings in constants.ts
const iconMap: Record<string, any> = {
  components: Cpu,
  laptop: Laptop,
  monitor: Monitor,
  smartphone: Smartphone,
  tablet: Tablet,
  camera: Camera,
  console: Gamepad2,
  tv: Tv,
  accessories: Headphones,
  // Keep fallbacks/others if needed
  keyboard: Keyboard,
  mouse: Mouse,
  headphones: Headphones,
  gamepad: Gamepad2,
  mic: Mic,
  square: Square,
  sun: Sun,
  layers: Layers,
  zap: Zap,
  circuit: CircuitBoard,
  speaker: Speaker,
  harddrive: HardDrive,
  printer: Printer,
  wifi: Wifi,
};

export default function LeftSidebar() {
  const { isSidebarOpen, closeSidebar } = useUI();
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  // Expanded if globally open (toggle) OR locally hovered
  const isExpanded = isSidebarOpen || isSidebarHovered;

  return (
    <>
      {/* Backdrop Overlay when sidebar is explicitly toggled open via Header Or just expanded?
          User said "clicks on open spec then it will close". Usually refers to toggled state.
          If just hovering, moving mouse away closes it, so backing drop isn't "clickable" in same way,
          but we can show it for focus. 
          Let's show it if isExpanded is true to darken everything else.
      */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-[55] transition-opacity duration-300"
          aria-hidden="true" 
          onClick={closeSidebar} // Click backdrop to close (if toggled)
        />
      )}

      {/* Sidebar Container - FIXED Full Height (Blisstronics Style) */}
      <aside 
        className={cn(
          "hidden lg:flex fixed left-0 top-0 bottom-0 z-[100] flex-col bg-white border-r border-gray-100 shadow-xl transition-all duration-300 ease-in-out",
          isExpanded ? "w-[260px]" : "w-[60px]"
        )}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => {
          setIsSidebarHovered(false);
          setActiveCategoryId(null);
        }}
      >
        {/* Top "All Categories" visual anchor (matches Header button alignment) */}
        <div className={cn(
          "flex items-center h-[60px] px-[10px] transition-all duration-300",
          isExpanded ? "justify-start pl-4" : "justify-center"
        )}>
           <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
             <Menu className="w-5 h-5" strokeWidth={2} />
           </div>
           
           <span className={cn(
             "ml-3 font-bold text-gray-800 text-lg whitespace-nowrap overflow-hidden transition-all duration-300",
             isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
           )}>
             All Categories
           </span>
        </div>

        {/* Scrollable Category List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 scrollbar-thin scrollbar-thumb-gray-200">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || CircuitBoard; // Fallback icon
            
            return (
              <div key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className={cn(
                    "flex items-center px-[14px] py-3 text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors relative group",
                    isExpanded ? "justify-start" : "justify-center"
                  )}
                  onMouseEnter={() => setActiveCategoryId(category.id)}
                >
                  <Icon className="w-5 h-5 shrink-0" strokeWidth={1.25} />
                  
                  {/* Label (Visible only when expanded) */}
                  <span className={cn(
                    "ml-4 font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                    isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
                  )}>
                    {category.name}
                  </span>

                  {/* Arrow for subcategories (Visible only when expanded & has subs) */}
                  {isExpanded && category.subcategories && (
                    <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                  )}

                  {/* Tooltip (Visible ONLY when collapsed) */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-lg">
                      {category.name}
                      <div className="absolute top-1/2 -left-1 -mt-1 border-4 border-transparent border-r-gray-800" />
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Mega Menu Panel (Rendered outside the list but relative to sidebar) */}
        {isExpanded && activeCategoryId && (
          <div 
            className="absolute left-[260px] top-0 bottom-0 w-[240px] bg-white border-l border-gray-100 shadow-xl overflow-y-auto py-6 px-6 z-30"
            onMouseEnter={() => setIsSidebarHovered(true)} // Keep sidebar open
          >
            {/* Find active category content */}
            {(() => {
              const activeCat = categories.find(c => c.id === activeCategoryId);
              if (!activeCat || !activeCat.subcategories) return null;

              return (
                <div className="animate-in fade-in slide-in-from-left-2 duration-200">
                  <h3 className="font-bold text-gray-900 border-b pb-2 mb-3">{activeCat.name}</h3>
                  <ul className="space-y-2">
                    {activeCat.subcategories.map((sub) => (
                      <li key={sub.id}>
                        <Link 
                          href={`/category/${activeCat.slug}/${sub.slug}`}
                          className="block text-sm text-gray-600 hover:text-primary hover:translate-x-1 transition-all"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </div>
        )}
      </aside>
    </>
  );
}
