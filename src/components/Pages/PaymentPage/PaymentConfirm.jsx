import React, { useEffect, useState } from 'react';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';


const PaymentConfirm = ({ booking }) => {

    const { price, email, bname, pname, _id, id } = booking


    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements()

    const productId = id;
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://buyandsell24-server.vercel.app/create-payment-intent", {
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
        event.preventDefault()
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }



        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setCardError(error.message)
        }
        else {
            setCardError('')
        }
        setSuccess('')
        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: pname,
                        email: email
                    },
                },
            },

        );

        if (confirmError) {
            setCardError(confirmError.message)
            return;
        }

        if (paymentIntent.status === "succeeded") {
            console.log(card)
            // store payment info in database
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bname,
                pname,
                bookingId: _id,
                productId: id,
                paid: true

            }
            fetch('https://buyandsell24-server.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats! Your payment complete')
                        setTransactionId(paymentIntent.id)
                    }
                })

        }
        setProcessing(false)


        console.log('paymentIntent', paymentIntent)

    }


    return (
        <div>
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

                <button className="btn btn-sm mt-4 btn-primary"
                    type="submit">
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p className='font-bold'>Your transactionId: {transactionId}</p>
                </div>
            }
        </div>
    );
};

export default PaymentConfirm;