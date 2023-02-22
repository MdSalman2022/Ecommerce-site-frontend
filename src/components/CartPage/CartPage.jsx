import React, { useContext, useEffect, useState } from 'react'
import {HiArrowNarrowLeft} from 'react-icons/hi'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'
import ProductTable from './ProductTable/ProductTable'
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PK)
import { Elements } from '@stripe/react-stripe-js';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';

console.log(stripePromise)

function CartPage() {


    const {cart, setCart, subTotal, setSubPrice} = useContext(AuthContext)

    console.log(subTotal)
    
    useEffect(() => {
        let price = 0;
        cart.forEach((item) => {
            price += item.totalPrice
        })
        setSubPrice(price)
    },[cart])
    

    if (cart.length > 0) {
        return (
            <div className='container mx-auto h-full py-5 md:py-20'>
                <div className="grid lg:grid-cols-4 gap-5">
                    <div className='col-span-4'>
                        <h1 className="text-3xl font-semibold mb-5">Shopping Cart</h1>
                        <div className="grid grid-cols-4 lg:grid-cols-5 gap-1 md:gap-5 border-b-2 mb-5">
                            <div className='col-span-5 bg-gray-100  grid grid-cols-5 place-items-center  h-12 rounded-lg'>
                                <p className=''>Items</p>
                                <p className=''>Quantity</p>
                                <p className=' '>Unit Price</p>
                                <p className=''>Total Price</p>
                                <p className=''></p>
                            </div>
                            {
                                cart.map((item, index) => (
                                    <ProductTable key={index} item={item} setSubPrice={setSubPrice} />  
                                ))
                            }
                        </div>
                        <div className="grid grid-cols-5">
                            <p className='col-span-3 flex items-center gap-3 text-primary cursor-pointer'><HiArrowNarrowLeft/> <p className='font-bold'>Continue Shopping</p></p>
                            <span className='flex items-center gap-5'>Subtotal: <p className='text-2xl font-bold'>${subTotal}</p></span>
                            <Link to="/checkout" className='btn btn-secondary flex items-center '>Checkout <FaAngleRight className='text-lg md:text-2xl'/></Link>
                        </div>
                    </div>
                    {/* <div className='bg-gray-100 col-span-1 w-80 flex flex-col p-5 gap-2 rounded-xl'>
                        <h1 className="text-2xl">Card details</h1>
    
                        <p>Card Type</p>
    
                        <p>Name on card</p>
                        <input type="text" />
                        <p>Card Number</p>
                        <input type="text" />
                        <p>Expiration Date</p>
                        <input type="text" />
                        

                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                            subTotal={subTotal}
                            />
                        </Elements>

                    </div> */}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='h-full flex flex-col py-10 justify-center items-center'>
                <p className='col-span-4 flex justify-center text-3xl font-bold py-10'>Cart is empty</p>
                <Link to="/"><button className='btn btn-primary btn-outline '>Continue Shopping</button></Link>
            </div>

        )
    }
    
}

export default CartPage;