import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useContext, useEffect } from 'react'
import { AiFillCreditCard } from 'react-icons/ai'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'
import CheckoutForm from '../CheckoutPage/CheckoutForm/CheckoutForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PK)
import { useState } from 'react';
import { Link } from 'react-router-dom'


function OrderConfirm() {
    
    
    const { cart, subTotal,setSubPrice, paymentDetails, setCart, setPaymentDetails, user } = useContext(AuthContext)    
    
    useEffect(() => {
        let price = 0;
        cart.forEach((item) => {
            price += item.totalPrice
        })
        setSubPrice(price+10)
    }, [cart])

    const [orderPlaced, setOrderPlaced] = useState(false)

    
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];


    const handleOrder = () => {
        const orderData = {
            userInfo,
            email: user.email,
            paymentDetails,
            items: cart,
            date: new Date().toDateString(),
            orderStatus: true,
            shipment: 'picked',
        };
      
        fetch('https://bestdeal-ecommerce-server.vercel.app/orderhistory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to post order');
          }
          setOrderPlaced(true);
        })
        .catch(error => {
          console.error(error);
          // Handle the error as appropriate (e.g. show an error message to the user)
        });
      };
      
    useEffect(() => {
        if (orderPlaced) {
            setCart([]);
            setPaymentDetails({});
        }
    }, [orderPlaced]);



    return (

        <div>
            {
                orderPlaced ?
                <div className='flex flex-col items-center justify-center h-96 '>
                    <AiFillCreditCard className='text-5xl text-primary mb-5' />
                    <h1 className='text-2xl font-semibold mb-5'>Order Placed</h1>
                    <p className='text-lg text-gray-500 mb-5'>Thank you for shopping with us. Your order will be delivered in 3-5 business days.</p>
                    <Link to="/" className='btn btn-secondary'>Continue Shopping</Link>
                </div>
                    : 
                    <div className="h-screen container mx-auto py-10">

                <div className="grid md:grid-cols-4 gap-10 py-5">
                    <div className='col-span-1 space-y-10 border p-5 rounded-xl'>
                        <h2 className="text-4xl font-bold">Payment Method</h2>
                        <div className='flex items-center gap-3'>
                            <input type="radio" name="radio-1" className="radio radio-secondary" checked />
                            <AiFillCreditCard className='text-3xl'/>
                        </div>            
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                            subTotal={subTotal}
                            />
                                </Elements>
                                
                                {
                                    paymentDetails.id && <div className='flex flex-col gap-2'>
                                        <p className='text-2xl font-semibold text-success '>Paid</p>
                                        <p className='text-lg font-semibold'>Payment Details</p>
                                        <p className='text-sm text-secondary font-bold'>Transaction id: <span className="text-neutral font-normal">{paymentDetails.id}</span></p>
                                        <p className='text-sm text-secondary font-bold'>Amount: <span className="text-neutral font-normal">${paymentDetails.amount/100}</span></p>
                                    </div>
                        }
                    </div>      
                    
                    <div className="col-span-3 space-y-10 bg-base-100 rounded-xl border p-5">
                        <h2 className='text-4xl font-bold'>Order Summary</h2>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody> 
                                        {
                                            cart.map((item, index) => (
                                                <tr key={index}>
                                                    <th>{index+1}</th>
                                                    <td>{item.name}</td>
                                                    <td>${item.price}</td>
                                                    <td>${item.totalPrice}</td>
                                                </tr>
                                            ))
                                    }
                                     <tr>
                                        <th></th>
                                        <td></td>
                                        <td>Sub Total:</td>
                                        <td className='text-secondary font-bold'>${subTotal-10}</td>
                                    </tr>
                                     <tr>
                                        <th></th>
                                        <td></td>
                                        <td>Home Delivery:</td>
                                        <td className='text-secondary font-bold'>$10</td>
                                    </tr>
                                     <tr>
                                        <th></th>
                                        <td></td>
                                        <td>Total</td>
                                        <td className='text-secondary font-bold'>${subTotal}</td>
                                    </tr>
                                    
                                </tbody>
                                </table>
                        </div>
                       
                    </div>
                    
                </div>    
                <div className='space-y-5'>    
                    <hr />
                    <div className="flex justify-end">
                        <button onClick={handleOrder} className="btn btn-secondary" disabled={paymentDetails.id ? false : true}>Place Order</button>
                    </div>
                </div>
                    
            </div>
                    
                        
            }
        </div>
    )
}

export default OrderConfirm
