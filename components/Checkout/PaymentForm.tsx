"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface PaymentFormProps {
  clientSecret: string;
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  isProcessing: boolean;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    invalid: {
      color: "#9e2146",
    },
  },
  hidePostalCode: true,
};

export default function PaymentForm({
  clientSecret,
  amount,
  onSuccess,
  onError,
  isProcessing,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCardChange = (event: any) => {
    setCardComplete(event.complete);
    setError(event.error ? event.error.message : null);
  };

  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret) {
      setError("Payment system not ready. Please refresh and try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card information is required.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

      if (stripeError) {
        setError(stripeError.message || "Payment failed. Please try again.");
        onError(stripeError.message || "Payment failed");
        setProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent.id);
        setProcessing(false);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      onError(errorMessage);
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4 bg-background">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="w-4 h-4 text-muted-foreground" />
          <label className="text-sm font-medium">Card Information</label>
        </div>
        <div className="p-3 border rounded-md bg-white">
          <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleCardChange} />
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Amount to charge:</span>
        <span className="font-bold text-foreground">৳{amount.toLocaleString()}</span>
      </div>

      <Button
        type="button"
        onClick={handlePayment}
        disabled={!stripe || !cardComplete || processing || isProcessing}
        className="w-full"
        size="lg"
      >
        {processing || isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Pay ৳{amount.toLocaleString()}
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Your payment is secured by Stripe. We never store your card details.
      </p>
    </div>
  );
}
