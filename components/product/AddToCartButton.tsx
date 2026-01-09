'use client';

import { Product } from '@/types';
import { Product } from '@/types';
import { useUserActivity } from '@/contexts/UserActivityProvider';
import { Button } from '@/components/ui/button';

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
}

export default function AddToCartButton({ product, disabled = false }: AddToCartButtonProps) {
  const { cart, setCart } = useUserActivity();

  const handleAddToCart = () => {
    const existingItem = cart.find((c: any) => c._id === product._id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((c: any) =>
        c._id === product._id
          ? { ...c, quantity: c.quantity + 1, totalPrice: c.price * (c.quantity + 1) }
          : c
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1, totalPrice: product.price }];
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled}
      className="w-full mt-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-md h-10 disabled:bg-gray-300"
    >
      {disabled ? 'Out of Stock' : 'Select Options'}
    </Button>
  );
}
