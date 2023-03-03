import React, { useContext, useEffect } from 'react'
import {loadStripe} from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';


function CheckoutForm({ subTotal }) {
    
    const {setPaymentDetails, user} = useContext(AuthContext)
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState("");

    const stripe = useStripe();
    const elements = useElements();

    const price = subTotal;

    
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://bestdeal-ecommerce-server.vercel.app/create-payment-intent", {
          method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
          body: JSON.stringify({ price }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, [price]);
    


    const handleSubmit = async (event) => { 
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            setCardError('')
        }

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                    name: user.displayName,
                    email: user.email,
                },
              },
            },
        );
        
        if (confirmError) {
            setCardError(confirmError.message)
            return;
        }
        console.log('paymentIntent', paymentIntent)
        setPaymentDetails(paymentIntent)
        toast.success(`Payment successfully`)

    }

    return (
        <>
        <form onSubmit={handleSubmit}>
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
                <button                    
                    className='btn btn-sm mt-4 btn-primary'
                    type="submit"
                    disabled={!stripe || !clientSecret}>
                Pay
                </button>
            </form>
            <p className='text-red-500'>{cardError}</p>
        </>
    )
}

export default CheckoutForm
