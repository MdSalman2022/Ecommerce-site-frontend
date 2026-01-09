import { Truck, RotateCcw, Shield, Headphones } from 'lucide-react';

const services = [
  { 
    icon: Truck, 
    title: 'Free Shipping', 
    description: 'On orders over ৳5000' 
  },
  { 
    icon: RotateCcw, 
    title: 'Easy Returns', 
    description: '7 days return policy' 
  },
  { 
    icon: Shield, 
    title: 'Secure Payment', 
    description: '100% Protected' 
  },
  { 
    icon: Headphones, 
    title: '24/7 Support', 
    description: 'Dedicated support' 
  },
];

export default function ServiceBar() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors"
            >
              <div className="p-3 bg-primary/10 rounded-full shrink-0">
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-gray-800 truncate">{service.title}</p>
                <p className="text-xs text-gray-500 truncate">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
