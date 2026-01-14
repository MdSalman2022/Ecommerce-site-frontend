"use client";

import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle, Lock } from "lucide-react";

interface StripePaymentFormProps {
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  amount: number;
}

export interface StripePaymentFormRef {
  submit: () => Promise<void>;
}

// Loading states for progressive feedback
const LOADING_MESSAGES = [
  { message: "Processing your payment...", duration: 2000 },
  { message: "Verifying transaction...", duration: 1500 },
  { message: "Creating your order...", duration: 1000 },
  { message: "Almost done...", duration: 500 },
];

const StripePaymentForm = forwardRef<StripePaymentFormRef, StripePaymentFormProps>(
  ({ onSuccess, onError, amount }, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Expose submit method to parent component
  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }));

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) return;

      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Please provide payment details.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  // Progressive loading messages
  useEffect(() => {
    if (!processing) {
      setLoadingStep(0);
      return;
    }

    let currentStep = 0;
    const intervals: NodeJS.Timeout[] = [];

    const showNextMessage = (stepIndex: number) => {
      if (stepIndex < LOADING_MESSAGES.length) {
        setLoadingStep(stepIndex);
        const timeout = setTimeout(() => {
          showNextMessage(stepIndex + 1);
        }, LOADING_MESSAGES[stepIndex].duration);
        intervals.push(timeout);
      }
    };

    showNextMessage(0);

    return () => {
      intervals.forEach(clearTimeout);
    };
  }, [processing]);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      setError("Payment system not ready. Please try again.");
      return;
    }

    setProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "An error occurred");
      setProcessing(false);
      return;
    }

    try {
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/orders`,
        },
        redirect: "if_required",
      });

      if (confirmError) {
        setError(confirmError.message || "Payment failed");
        onError(confirmError.message || "Payment failed");
        setProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Show success state briefly before calling onSuccess
        setShowSuccess(true);
        setTimeout(() => {
          onSuccess(paymentIntent.id);
        }, 1500);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      onError(errorMessage);
      setProcessing(false);
    }
  };

  const currentLoadingMessage =
    processing && loadingStep < LOADING_MESSAGES.length
      ? LOADING_MESSAGES[loadingStep].message
      : "";

  return (
    <>
      {/* Loading Overlay */}
      {processing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center space-y-6">
              {showSuccess ? (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 animate-bounce">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Payment Successful!
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Redirecting to your order...
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {currentLoadingMessage}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Please don't close this window
                    </p>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${((loadingStep + 1) / LOADING_MESSAGES.length) * 100}%`,
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span>Secured by Stripe</span>
        </div>

        {/* Portfolio Test Card Helper */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-blue-900 mb-2">Development Mode - Use these cards:</p>
          <div className="space-y-1 text-xs text-blue-800">
            <p className="font-mono">✓ Success: <strong>4242 4242 4242 4242</strong></p>
            <p className="font-mono">✗ Decline: <strong>4000 0000 0000 0002</strong></p>
            <p className="text-blue-600">Any future expiry date (e.g., 12/34) | Any 3-digit CVC</p>
          </div>
        </div>

        {/* Stripe Payment Element */}
        <div className="border rounded-lg p-4 bg-white">
          <PaymentElement />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {message && !error && (
          <Alert>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Amount:</span>
            <span className="text-2xl font-bold text-primary">
              ৳{amount.toLocaleString()}
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Click "Pay & Place Order" below to complete your purchase
        </p>
      </div>
    </>
  );
});

StripePaymentForm.displayName = "StripePaymentForm";

export default StripePaymentForm;
