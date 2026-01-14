"use client";

import React, { useState, useEffect, useRef } from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";
import {useAuth} from "@/contexts/AuthProvider";
import {useUserActivity} from "@/contexts/UserActivityProvider";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  MapPin,
  CreditCard,
  Wallet,
  Truck,
  Edit,
  Check,
  Package,
  ShoppingBag,
  History,
  X,
  Loader2,
} from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm, {
  StripePaymentFormRef,
} from "@/components/Checkout/StripePaymentForm";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface ShippingFormData {
  name: string;
  address: string;
  contact: string;
  city: string;
  email?: string;
}

// Extracted ShippingForm Component
const ShippingForm = ({
  register,
  errors,
  user,
  previousGuestDetails,
  setValue,
  isEditingShipping,
  setIsEditingShipping,
  savedShipping,
  watch,
}: {
  register: any;
  errors: any;
  user: any;
  previousGuestDetails: ShippingFormData | null;
  setValue: any;
  isEditingShipping: boolean;
  setIsEditingShipping: (val: boolean) => void;
  savedShipping: ShippingFormData | null;
  watch: any;
}) => (
  <form className="space-y-4">
    {/* Show Previous Guest Details Option */}
    {!user && previousGuestDetails && (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <History className="w-4 h-4 text-blue-600" />
              <p className="font-medium text-blue-900">
                Use Previous Details
              </p>
            </div>
            <p className="text-sm text-blue-700 mb-3">
              {previousGuestDetails.name} • {previousGuestDetails.contact} •{" "}
              {previousGuestDetails.city}
            </p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="w-full text-blue-600 border-blue-300 hover:bg-blue-100"
              onClick={() => {
                setValue("name", previousGuestDetails.name);
                setValue("contact", previousGuestDetails.contact);
                setValue("email", previousGuestDetails.email || "");
                setValue("address", previousGuestDetails.address);
                setValue("city", previousGuestDetails.city);
                toast.success("Previous details loaded!");
              }}
            >
              <Check className="w-4 h-4 mr-2" />
              Use These Details
            </Button>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              localStorage.removeItem("guest_checkout_details");
              // This needs to be handled by parent state update if we want to hide it immediately
              // But for now, we just clear storage.
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )}

    {savedShipping && !isEditingShipping ? (
      <div className="text-sm space-y-1">
        <p className="font-medium">{watch("name")}</p>
        <p className="text-muted-foreground">{watch("contact")}</p>
        <p className="text-muted-foreground">
          {watch("address")}, {watch("city")}
        </p>
      </div>
    ) : (
      <>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            {...register("name", {required: "Name is required"})}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact">Phone Number *</Label>
          <Input
            id="contact"
            {...register("contact", {
              required: "Phone number is required",
              pattern: {
                value: /^01[0-9]{9}$/,
                message: "Enter valid BD phone (01XXXXXXXXX)",
              },
            })}
            placeholder="01712345678"
          />
          {errors.contact && (
            <p className="text-sm text-destructive">{errors.contact.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email (Optional)</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Delivery Address *</Label>
          <Input
            id="address"
            {...register("address", {required: "Address is required"})}
            placeholder="House, Street, Area"
          />
          {errors.address && (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            {...register("city", {required: "City is required"})}
            placeholder="Dhaka"
          />
          {errors.city && (
            <p className="text-sm text-destructive">{errors.city.message}</p>
          )}
        </div>

        {isEditingShipping && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setIsEditingShipping(false)}
          >
            Cancel
          </Button>
        )}
      </>
    )}
  </form>
);

export default function CheckoutPage() {
  const router = useRouter();
  const {user} = useAuth();
  const {cart, setCart} = useUserActivity();

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedShipping, setSavedShipping] = useState<ShippingFormData | null>(
    null
  );
  const [previousGuestDetails, setPreviousGuestDetails] =
    useState<ShippingFormData | null>(null);
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [creatingIntent, setCreatingIntent] = useState(false);
  const stripeFormRef = useRef<StripePaymentFormRef>(null);

  // Calculate subtotal from cart items
  const subTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    watch,
  } = useForm<ShippingFormData>();

  const shippingCost = 60;
  const totalAmount = subTotal + shippingCost;

  // Mark loading as complete after component mounts
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Load previous guest checkout details from localStorage
  useEffect(() => {
    if (!user) {
      try {
        const savedDetails = localStorage.getItem("guest_checkout_details");
        if (savedDetails) {
          const details = JSON.parse(savedDetails);
          setPreviousGuestDetails(details);
        }
      } catch (error) {
        console.error("Failed to load guest details:", error);
      }
    }
  }, [user]);

  // Load saved shipping details
  useEffect(() => {
    const loadSavedShipping = async () => {
      if (user?.email) {
        try {
          const response = await fetch(
            `${API_URL}/api/users/shipping/${user.email}`
          );
          if (response.ok) {
            const {data} = await response.json();
            if (data) {
              setSavedShipping(data);
              // Pre-fill form
              setValue("name", data.name);
              setValue("address", data.address);
              setValue("contact", data.contact);
              setValue("city", data.city);
              setValue("email", data.email || user.email);
            }
          }
        } catch (error) {
          console.error("Failed to load shipping details:", error);
        }
      }
    };

    loadSavedShipping();
  }, [user, setValue]);

  // Create payment intent when card payment is selected
  const handlePaymentMethodChange = async (method: "cod" | "card") => {
    setPaymentMethod(method);
    
    if (method === "card" && !clientSecret) {
      setCreatingIntent(true);
      try {
        const response = await fetch(`${API_URL}/api/payments/create-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart.map((item) => ({
              productId: item.productId || item._id,
              variantId: item.variantId,
              name: item.name,
              quantity: item.quantity,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create payment intent");
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Payment intent error:", error);
        toast.error("Failed to initialize payment. Please try again.");
        setPaymentMethod("cod");
      } finally {
        setCreatingIntent(false);
      }
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setPaymentIntentId(paymentIntentId);
    toast.success("Payment confirmed! Creating your order...");
    
    // Submit the form to create the order
    const shippingData = watch();
    await createOrderAfterPayment(shippingData as ShippingFormData, paymentIntentId);
  };

  // Handle payment error
  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    toast.error(error);
  };

  // Create order after successful payment
  const createOrderAfterPayment = async (
    shippingData: ShippingFormData,
    paymentIntentId: string
  ) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        name: shippingData.name,
        address: shippingData.address,
        contact: shippingData.contact,
        city: shippingData.city,
        email: shippingData.email || user?.email,
        isGuest: !user,
        transactionId: paymentIntentId,
        amount: totalAmount,
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
        shippingCost: shippingCost,
      };

      const response = await fetch(`${API_URL}/orderhistory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Order placement failed");
      }

      // Save shipping details for future orders (if logged in)
      if (user?.email) {
        try {
          await fetch(`${API_URL}/api/users/shipping`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              ...shippingData,
            }),
          });
        } catch (error) {
          console.error("Failed to save shipping details:", error);
        }
      } else {
        // Save guest checkout details to localStorage
        try {
          localStorage.setItem(
            "guest_checkout_details",
            JSON.stringify(shippingData)
          );
        } catch (error) {
          console.error("Failed to save guest details:", error);
        }
      }

      // Clear cart
      setCart([]);
      localStorage.removeItem("cart");
      localStorage.removeItem("cart_session_id");

      toast.success("Order placed successfully!");
      router.push(`/orders/success/${result.orderId || result._id}`);
    } catch (error) {
      console.error("Order error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to place order";
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle order placement
  const onSubmit = async (shippingData: ShippingFormData) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // For card payment, the form submission is handled by StripePaymentForm
    // This function only handles COD now
    if (paymentMethod === "card") {
      toast.error("Please complete the payment using the form below");
      return;
    }

    // COD payment flow
    setIsProcessing(true);

    try {
      const orderData = {
        name: shippingData.name,
        address: shippingData.address,
        contact: shippingData.contact,
        city: shippingData.city,
        email: shippingData.email || user?.email,
        isGuest: !user,
        transactionId:
          paymentMethod === "cod" ? "Cash on Delivery" : "Card Payment",
        amount: totalAmount,
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
        shippingCost: shippingCost,
      };

      const response = await fetch(`${API_URL}/orderhistory`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Order placement failed");
      }

      // Save shipping details for future orders (if logged in)
      if (user?.email) {
        try {
          await fetch(`${API_URL}/api/users/shipping`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              email: user.email,
              ...shippingData,
            }),
          });
        } catch (error) {
          console.error("Failed to save shipping details:", error);
        }
      } else {
        // Save guest checkout details to localStorage
        try {
          localStorage.setItem(
            "guest_checkout_details",
            JSON.stringify(shippingData)
          );
        } catch (error) {
          console.error("Failed to save guest details:", error);
        }
      }

      // Clear cart
      setCart([]);
      localStorage.removeItem("cart");
      localStorage.removeItem("cart_session_id");

      toast.success("Order placed successfully!");
      router.push(`/orders/success/${result.orderId || result._id}`);
    } catch (error) {
      console.error("Order error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to place order";
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-4 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                 <div className="h-64 bg-gray-200 rounded" />
              </div>
              <div className="h-64 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <Button onClick={() => router.push("/")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column: Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Details */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                  <MapPin className="w-5 h-5" />
                  Shipping Details
                </CardTitle>
                {savedShipping && !isEditingShipping && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingShipping(true)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <ShippingForm 
                  register={register}
                  errors={errors}
                  user={user}
                  previousGuestDetails={previousGuestDetails}
                  setValue={setValue}
                  isEditingShipping={isEditingShipping}
                  setIsEditingShipping={setIsEditingShipping}
                  savedShipping={savedShipping}
                  watch={watch}
                />
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={handlePaymentMethodChange}
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label
                      htmlFor="cod"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <Wallet className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          Pay when you receive
                        </p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="card" id="card" />
                    <Label
                      htmlFor="card"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <CreditCard className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Card Payment</p>
                        <p className="text-sm text-muted-foreground">
                          Pay securely with card
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {creatingIntent && (
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    Initializing payment...
                  </div>
                )}

                {/* Stripe Payment Element - Embedded Form */}
                {paymentMethod === "card" && clientSecret && (
                  <div className="mt-6">
                    <Elements
                      stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: 'stripe',
                        },
                      }}
                    >
                      <StripePaymentForm
                        ref={stripeFormRef}
                        amount={totalAmount}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                    </Elements>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Mobile Order Items Summary (Optional, but useful to have inline) */}
             <div className="lg:hidden">
               <Card>
                <CardHeader>
                   <CardTitle className="flex items-center gap-2 text-base">
                    <Package className="w-4 h-4" />
                    Order Items ({cart.length})
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cart.map((item, index: number) => (
                    <div key={index} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-accent flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                         <p className="text-sm font-bold">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
               </Card>
             </div>
          </div>

          {/* Right Column: Order Summary (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cart.map((item, index: number) => (
                    <div key={index} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-accent flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-bold">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>৳{subTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Shipping
                    </span>
                    <span>৳{shippingCost.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      ৳{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  onClick={async (e) => {
                    if (paymentMethod === "card") {
                      // Trigger Stripe payment form submission
                      e.preventDefault();
                      if (stripeFormRef.current) {
                        await stripeFormRef.current.submit();
                      }
                    } else {
                      // COD payment
                      handleSubmit(onSubmit)(e);
                    }
                  }}
                  disabled={isProcessing || (paymentMethod === "card" && !clientSecret)}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : paymentMethod === "card" ? (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pay & Place Order
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

       {/* Mobile Fixed Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-primary">
                  ৳{totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p>Subtotal: ৳{subTotal.toLocaleString()}</p>
                <p>Shipping: ৳{shippingCost.toLocaleString()}</p>
              </div>
            </div>
            <Button
              onClick={async (e) => {
                if (paymentMethod === "card") {
                  // Trigger Stripe payment form submission
                  e.preventDefault();
                  if (stripeFormRef.current) {
                    await stripeFormRef.current.submit();
                  }
                } else {
                  // COD payment
                  handleSubmit(onSubmit)(e);
                }
              }}
              disabled={isProcessing || (paymentMethod === "card" && !clientSecret)}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : paymentMethod === "card" ? (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay & Place Order
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Place Order
                </>
              )}
            </Button>
          </div>
        </div>
    </div>
  );
}

