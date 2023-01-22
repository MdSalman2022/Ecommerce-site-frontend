import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import PaymentConfirm from './PaymentConfirm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PK)

const PaymentPage = () => {

    const booking = useLoaderData()
    const navigation = useNavigation()
    console.log('booking data', booking);

    const { pname, bname, price } = booking;


    return (
        <div>
            <h3 className="text-3xl">Payment for {pname}</h3>
            <p className="text-xl">Please pay {price}Tk  </p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <PaymentConfirm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default PaymentPage;