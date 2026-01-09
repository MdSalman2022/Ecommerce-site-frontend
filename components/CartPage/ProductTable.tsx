'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useUserActivity } from '@/contexts/UserActivityProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProductTableProps {
  item: any;
  index: number;
}

function ProductTable({ item, index }: ProductTableProps) {
  const { cart, setCart } = useUserActivity();

  const [count, setCount] = useState(item.quantity || 1);
  const [hasChanged, setHasChanged] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Number(e.target.value);
    if (newCount <= 10 && newCount >= 1) {
      setCount(newCount);
    }
  };

  useEffect(() => {
    const cartItem = cart.find((cartItem: any) => cartItem._id === item._id);
    if (cartItem?.quantity !== count) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }, [count, cart, item._id]);

  const handleConfirm = () => {
    const updatedCart = cart.map((cartItem: any) => {
      if (cartItem._id === item._id) {
        return {
          ...cartItem,
          quantity: count,
          totalPrice: cartItem.price * count,
        };
      }
      return cartItem;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setHasChanged(false);
  };

  const removeFromCart = () => {
    const updatedCart = cart.filter((cartItem: any) => cartItem._id !== item._id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="col-span-5 grid grid-cols-5 gap-4 place-items-center py-4 border-b border-border" key={index}>
      {/* Item */}
      <div className="flex items-center gap-3">
        <div className="hidden md:block relative w-16 h-16">
          <Image src={item.image} alt={item.name} fill className="object-contain" />
        </div>
        <p className="font-medium text-sm line-clamp-2">{item.name}</p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 rounded-full"
          onClick={() => setCount(Math.max(1, count - 1))}
          disabled={count <= 1}
        >
          <FaMinus className="text-xs" />
        </Button>
        <Input
          type="number"
          className="w-12 h-7 text-center text-sm"
          value={count}
          onChange={handleChange}
          min={1}
          max={10}
        />
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 rounded-full"
          onClick={() => setCount(Math.min(10, count + 1))}
          disabled={count >= 10}
        >
          <FaPlus className="text-xs" />
        </Button>
      </div>

      {/* Unit Price */}
      <p className="font-medium">${item.price}</p>

      {/* Total Price */}
      <p className="font-bold text-primary">${(item.price * count).toFixed(2)}</p>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {hasChanged && (
          <Button size="sm" onClick={handleConfirm}>
            Confirm
          </Button>
        )}
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          onClick={removeFromCart}
        >
          <AiOutlineDelete className="text-lg" />
        </Button>
      </div>
    </div>
  );
}

export default ProductTable;
