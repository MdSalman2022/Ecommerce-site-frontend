"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {AiFillCreditCard} from "react-icons/ai";
import {TiTick} from "react-icons/ti";
import {useAuth} from "@/contexts/AuthProvider";
import {useUserActivity} from "@/contexts/UserActivityProvider";
import CheckoutForm from "@/components/CheckoutPage/CheckoutForm";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {PromoCodeInput} from "@/components/Checkout";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

function OrderConfirm() {
  const {user} = useAuth();
  const {
    cart,
    subTotal,
    setSubPrice,
    paymentDetails,
    setCart,
    setPaymentDetails,
    deliveryDetails,
  } = useUserActivity();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "delivery" | "">(
    ""
  );
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  useEffect(() => {
    let price = 0;
    cart.forEach((item: any) => {
      price += item.totalPrice || item.price * (item.quantity || 1);
    });
    const finalPrice = price + 10 - (appliedPromo?.discount || 0);
    setSubPrice(finalPrice > 0 ? finalPrice : 0);
  }, [cart, setSubPrice, appliedPromo]);

  const userInfo: any = user || deliveryDetails || {};

  const handleOrder = async () => {
    const orderData = {
      name: userInfo.name || userInfo.orderName,
      address: userInfo.address,
      contact: userInfo.contact,
      city: userInfo.city,
      email: user?.email || userInfo.email || null,
      isGuest: !user,
      transactionId: paymentDetails?.id || "Cash on Delivery",
      amount: paymentDetails?.amount ? paymentDetails.amount / 100 : subTotal, // amount in Taka
      items: cart.map((item) => ({
        productId: item.productId || item._id,
        variantId: item.variantId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        image: item.image,
        variantName: item.variantName,
      })),
      date: new Date().toDateString(),
      orderStatus: "pending",
      shipment: "picked",
      promoCode: appliedPromo?.code || null,
      discountAmount: appliedPromo?.discount || 0,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/orderhistory`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        const orderResult = await response.json();

        // Mark cart as converted for abandoned cart tracking
        const sessionId = localStorage.getItem("cart_session_id");
        const token = localStorage.getItem("accessToken");

        if (sessionId || token) {
          try {
            const headers: any = {"Content-Type": "application/json"};
            if (token) headers["Authorization"] = `Bearer ${token}`;
            if (sessionId) headers["x-session-id"] = sessionId;

            await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cart/converted`,
              {
                method: "POST",
                headers,
                body: JSON.stringify({
                  orderId: orderResult.orderId || orderResult._id,
                }),
              }
            );

            // Clear session ID for next cart session
            if (sessionId) {
              localStorage.removeItem("cart_session_id");
            }
          } catch (err) {
            console.debug("Cart conversion tracking error:", err);
          }
        }

        // If promo code was used, we should notify the backend to increment usage
        if (appliedPromo) {
          await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/promo/apply`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              code: appliedPromo.code,
              orderTotal: subTotal + appliedPromo.discount, // Total before discount
            }),
          });
        }

        setOrderPlaced(true);
        setCart([]);
        setPaymentDetails({});
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
    }
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-background">
        <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full">
          <TiTick className="text-5xl text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Order Placed Successfully!
        </h1>
        <p className="text-lg text-muted-foreground text-center max-w-md">
          Thank you for shopping with us. Your order will be delivered soon.
        </p>
        <Link href="/">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="md:min-h-screen bg-background">
      <div className="container mx-auto py-10 px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Left Column: Payment & Promo */}
          <div className="md:col-span-1 space-y-6">
            <div className="p-6 border border-border rounded-xl bg-card space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                Payment Method
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {/* Credit Card */}
                <div
                  onClick={() => setPaymentMethod("card")}
                  className="cursor-pointer"
                >
                  <div
                    className={`relative flex items-center justify-center p-4 border-2 rounded-lg bg-white dark:bg-background hover:border-primary transition-colors ${
                      paymentMethod === "card"
                        ? "border-primary"
                        : "border-border"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <TiTick className="absolute top-1 right-1 bg-primary text-white text-xl rounded-full" />
                    )}
                    <Image
                      src="https://i.ibb.co/PxH0KQw/creditcard.webp"
                      alt="Credit Card"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium text-center mt-2">
                    Credit Card
                  </p>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod("delivery")}
                  className="cursor-pointer"
                >
                  <div
                    className={`relative flex items-center justify-center p-4 border-2 rounded-lg bg-white dark:bg-background hover:border-primary transition-colors ${
                      paymentMethod === "delivery"
                        ? "border-primary"
                        : "border-border"
                    }`}
                  >
                    {paymentMethod === "delivery" && (
                      <TiTick className="absolute top-1 right-1 bg-primary text-white text-xl rounded-full" />
                    )}
                    <Image
                      src="https://i.ibb.co/PxH0KQw/creditcard.webp"
                      alt="Cash on Delivery"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium text-center mt-2">
                    Cash on Delivery
                  </p>
                </div>
              </div>

              {/* Stripe Form */}
              {paymentMethod === "card" && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm subTotal={subTotal} />
                </Elements>
              )}

              {/* Payment Success Info */}
              {paymentDetails?.id && (
                <div className="space-y-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-xl font-bold text-green-600">Paid</p>
                  <p className="text-sm">
                    <span className="font-medium">Transaction ID:</span>{" "}
                    {paymentDetails.id}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Amount:</span> ৳
                    {paymentDetails.amount?.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Promo Code Section */}
            <div className="p-6 border border-border rounded-xl bg-card">
              <PromoCodeInput
                orderTotal={subTotal + (appliedPromo?.discount || 0)}
                onApply={(discount, code) => setAppliedPromo({code, discount})}
                onRemove={() => setAppliedPromo(null)}
                appliedCode={appliedPromo?.code}
                appliedDiscount={appliedPromo?.discount}
              />
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="md:col-span-3 space-y-6 p-6 border border-border rounded-xl bg-card h-fit">
            <h2 className="text-2xl font-bold text-foreground font-mono">
              Order Summary
            </h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((item: any, index: number) => (
                  <TableRow
                    key={
                      (item.productId || item._id) + (item.variantId || "") ||
                      index
                    }
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        {item.variantName && (
                          <span className="text-[10px] text-primary font-semibold uppercase">
                            {item.variantName}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>৳{item.price.toLocaleString()}</TableCell>
                    <TableCell>
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}

                {/* Detailed Summary */}
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell className="font-medium border-t">
                    Subtotal:
                  </TableCell>
                  <TableCell className="font-bold border-t">
                    ৳
                    {(
                      subTotal +
                      (appliedPromo?.discount || 0) -
                      10
                    ).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell className="font-medium">Delivery:</TableCell>
                  <TableCell className="font-bold">৳10</TableCell>
                </TableRow>

                {appliedPromo && (
                  <TableRow>
                    <TableCell colSpan={2}></TableCell>
                    <TableCell className="font-medium text-green-600">
                      Discount ({appliedPromo.code}):
                    </TableCell>
                    <TableCell className="font-bold text-green-600">
                      -৳{appliedPromo.discount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                )}

                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell className="font-medium text-xl">Total:</TableCell>
                  <TableCell className="font-bold text-xl text-primary">
                    ৳{subTotal.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Place Order */}
        <div className="flex justify-end mt-8 pt-6 border-t border-border">
          <Button
            size="lg"
            onClick={handleOrder}
            disabled={
              paymentMethod === "card"
                ? !paymentDetails?.id
                : paymentMethod === "delivery"
                ? false
                : true
            }
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirm;
