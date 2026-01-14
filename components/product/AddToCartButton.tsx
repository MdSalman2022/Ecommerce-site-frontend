"use client";

import {useRouter} from "next/navigation";
import {Product} from "@/types";
import {useUserActivity} from "@/contexts/UserActivityProvider";
import {Button} from "@/components/ui/button";

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
}

export default function AddToCartButton({
  product,
  disabled = false,
}: AddToCartButtonProps) {
  const {cart, setCart} = useUserActivity();
  const router = useRouter();

  if (!product) return null;

  const mainVariant = product.variants?.[0];
  const price = mainVariant
    ? mainVariant.salePrice > 0
      ? mainVariant.salePrice
      : mainVariant.regularPrice
    : 0;
  const image = product.images?.[0] || "";
  // Detect variants that require selection
  const hasOptions =
    product.variants &&
    (product.variants.length > 1 ||
      (product.variants[0]?.attributes &&
        Object.keys(product.variants[0].attributes).length > 0));

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop propagation

    if (hasOptions) {
      router.push(`/product/${product.slug || product._id}`);
      return;
    }

    const existingItem = cart.find(
      (c: any) =>
        c.productId === product._id &&
        c.variantId === (mainVariant?._id || "default")
    );

    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((c: any) =>
        c.productId === product._id &&
        c.variantId === (mainVariant?._id || "default")
          ? {
              ...c,
              quantity: c.quantity + 1,
              totalPrice: c.price * (c.quantity + 1),
            }
          : c
      );
    } else {
      updatedCart = [
        ...cart,
        {
          _id: product._id, // Legacy compat
          productId: product._id,
          variantId: mainVariant?._id || "default",
          name: product.name,
          slug: product.slug,
          price,
          image,
          quantity: 1,
          totalPrice: price,
          cat: product.category?._id || product.category || "",
          subCat: product.subCategory?._id || product.subCategory || "",
        },
      ];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Button
      onClick={handleAction}
      disabled={disabled}
      className="w-full mt-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-md h-10 disabled:bg-gray-300"
    >
      {disabled
        ? "Out of Stock"
        : hasOptions
        ? "Select Options"
        : "Add to Cart"}
    </Button>
  );
}
