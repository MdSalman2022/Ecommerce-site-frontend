import Link from 'next/link';
import { 
  Cpu, Gamepad2, Headphones, Mouse, Keyboard, Monitor, Laptop, 
  CircuitBoard, Square, Zap, MemoryStick, Wifi, Speaker, HardDrive, Camera,
  Smartphone, Tablet, Tv
} from 'lucide-react';
import { categories } from '@/lib/constants';

// Category data with Lucide icons
const categoryIcons: Record<string, React.ElementType> = {
  cpu: Cpu,
  gamepad: Gamepad2,
  headphones: Headphones,
  mouse: Mouse,
  keyboard: Keyboard,
  monitor: Monitor,
  laptop: Laptop,
  circuit: CircuitBoard,
  square: Square,
  zap: Zap,
  memory: MemoryStick,
  wifi: Wifi,
  speaker: Speaker,
  harddrive: HardDrive,
  camera: Camera,
  smartphone: Smartphone,
  tablet: Tablet,
  tv: Tv,
};

export default function Categories() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        Popular Categories
      </h2>
      
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
        {categories.map((category, index) => {
          const IconComponent = categoryIcons[category.icon || 'cpu'] || CircuitBoard;
          
          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex flex-col items-center gap-2 group"
            >
              {/* Icon Box - Line art style matching Blisstronics */}
              <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-gray-200 rounded-lg flex items-center justify-center bg-white group-hover:border-primary transition-colors">
                <IconComponent 
                  className="w-8 h-8 md:w-10 md:h-10 text-gray-600 group-hover:text-primary transition-colors" 
                  strokeWidth={1.2}
                />
              </div>
              <span className="text-[10px] md:text-xs text-gray-600 text-center group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
