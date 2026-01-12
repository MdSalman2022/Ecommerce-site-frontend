"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {AiOutlineDelete} from "react-icons/ai";
import {FaMinus, FaPlus} from "react-icons/fa";
import {useUserActivity} from "@/contexts/UserActivityProvider";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {X} from "lucide-react";

interface ProductTableProps {
  item: any;
  index: number;
}

function ProductTable({item, index}: ProductTableProps) {
  const {cart, setCart} = useUserActivity();

  const [count, setCount] = useState(item.quantity || 1);

  // Auto-update cart when count changes - with proper debounce
  useEffect(() => {
    if (count === item.quantity) return; // No change needed

    const timer = setTimeout(() => {
      const updatedCart = cart.map((cartItem: any) => {
        if (
          (cartItem.productId || cartItem._id) ===
            (item.productId || item._id) &&
          cartItem.variantId === item.variantId
        ) {
          return {
            ...cartItem,
            quantity: count,
            totalPrice: cartItem.price * count,
          };
        }
        return cartItem;
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]); // Only depend on count changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Number(e.target.value);
    if (newCount <= 10 && newCount >= 1) {
      setCount(newCount);
    }
  };

  const removeFromCart = () => {
    const updatedCart = cart.filter(
      (cartItem: any) =>
        !(
          (cartItem.productId || cartItem._id) ===
            (item.productId || item._id) &&
          cartItem.variantId === item.variantId
        )
    );
    setCart(updatedCart);
  };

  return (
    <>
      {/* Desktop Layout */}
      <div
        className="hidden md:grid col-span-5 grid-cols-5 gap-4 place-items-center py-4 border-b border-border last:border-b-0"
        key={index}
      >
        {/* Item */}
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <p className="font-medium text-sm line-clamp-2">{item.name}</p>
            {item.variantName && (
              <p className="text-[10px] text-primary font-semibold uppercase mt-1">
                {item.variantName}
              </p>
            )}
          </div>
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
        <p className="font-medium">৳{item.price.toLocaleString()}</p>

        {/* Total Price */}
        <p className="font-bold text-primary">
          ৳{(item.price * count).toLocaleString()}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
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

      {/* Mobile Layout - Card Based */}
      <div className="md:hidden mb-3 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow relative">
        {/* Remove Button - Top Left Corner (Bigger) */}
        <Button
          variant="destructive"
          size="icon"
          className="absolute -top-2 -left-2 h-7 w-7 rounded-full p-0 z-10"
          onClick={removeFromCart}
          title="Remove item"
        >
          <X className="text-base" />
        </Button>

        <div className="p-3">
          {/* Row 1: Image + Product Name (2 lines) + Unit Price */}
          <div className="flex gap-2 mb-3">
            <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-accent/50">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm line-clamp-2 leading-snug mb-1">
                {item.name}
              </p>
              {item.variantName && (
                <p className="text-[9px] text-primary font-semibold uppercase bg-primary/10 px-1.5 py-0.5 rounded inline-block">
                  {item.variantName}
                </p>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-muted-foreground mb-0.5">Price</p>
              <p className="text-sm font-bold text-primary leading-tight">
                ৳{item.price.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Row 2: Quantity Controls (Left) + Total Price (Right) */}
          <div className="flex items-center justify-between gap-2">
            {/* Quantity Controls */}
            <div className="flex items-center gap-1 bg-accent/20 rounded-lg p-1.5 flex-shrink-0">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full p-0"
                onClick={() => setCount(Math.max(1, count - 1))}
                disabled={count <= 1}
              >
                <FaMinus className="text-[10px]" />
              </Button>
              <Input
                type="number"
                className="w-10 h-6 text-center text-xs p-1 bg-white"
                value={count}
                onChange={handleChange}
                min={1}
                max={10}
              />
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full p-0"
                onClick={() => setCount(Math.min(10, count + 1))}
                disabled={count >= 10}
              >
                <FaPlus className="text-[10px]" />
              </Button>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Total Price */}
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-muted-foreground mb-0.5">Total</p>
              <p className="text-base font-bold text-primary leading-tight">
                ৳{(item.price * count).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductTable;
