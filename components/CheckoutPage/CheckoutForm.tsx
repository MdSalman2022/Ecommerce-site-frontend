'use client';

import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthProvider';
import { useUserActivity } from '@/contexts/UserActivityProvider';
import { Button } from '@/components/ui/button';

interface CheckoutFormProps {
  subTotal: number;
}

function CheckoutForm({ subTotal }: CheckoutFormProps) {
  const { user } = useAuth();
  const { cart, setPaymentDetails } = useUserActivity();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const price = subTotal;

  useEffect(() => {
    if (price > 0 && cart.length > 0) {
      // Send items for server-side price calculation (Super Safe)
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            price, // Keep for legacy but backend will override if items present
            items: cart.map(item => ({
                productId: item.productId || item._id,
                variantId: item.variantId,
                quantity: item.quantity
            }))
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((err) => console.error('Payment intent error:', err));
    }
  }, [price, cart.length]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setProcessing(true);

    const card = elements.getElement(CardElement);

    if (card === null) {
      setProcessing(false);
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message || 'Payment failed');
      setProcessing(false);
      return;
    } else {
      setCardError('');
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name || 'Guest',
            email: user?.email || '',
          },
        },
      }
    );

    if (confirmError) {
      setCardError(confirmError.message || 'Payment confirmation failed');
      setProcessing(false);
      return;
    }

    if (paymentIntent) {
      setPaymentDetails({
        id: paymentIntent.id,
        amount: paymentIntent.amount,
      });
      toast.success('Payment successful!');
    }

    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 border border-border rounded-lg bg-background">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        <Button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="w-full"
        >
          {processing ? 'Processing...' : `Pay ৳${subTotal.toLocaleString()}`}
        </Button>
      </form>
      {cardError && <p className="text-destructive text-sm mt-2">{cardError}</p>}
    </>
  );
}

export default CheckoutForm;
