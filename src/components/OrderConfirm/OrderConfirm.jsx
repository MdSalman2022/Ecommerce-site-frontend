import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useContext } from 'react'
import { AiFillCreditCard } from 'react-icons/ai'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'
import CheckoutForm from '../CartPage/CheckoutForm/CheckoutForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PK)


function OrderConfirm() {

    
    
    const { cart,subTotal, paymentDetails } = useContext(AuthContext)    

    return (

        <div>
            <div className="h-screen container mx-auto py-10">

                <div className="grid md:grid-cols-4 gap-10 py-5">
                    <div className='col-span-1 space-y-10 border p-5 rounded-xl'>
                        <h2 className="text-4xl font-bold">Payment Method</h2>
                        <div className='flex items-center gap-3'>
                            <input type="radio" name="radio-1" className="radio" checked />
                            <AiFillCreditCard className='text-3xl'/>
                        </div>            
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                            subTotal={subTotal}
                            />
                        </Elements>
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
                                        <td className='text-secondary font-bold'>${subTotal}</td>
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
                                        <td className='text-secondary font-bold'>${subTotal+10}</td>
                                    </tr>
                                    
                                </tbody>
                                </table>
                        </div>
                       
                    </div>
                    
                </div>    
                <div className='space-y-5'>    
                    <hr />
                    <div className="flex justify-end">
                        <button className="btn btn-secondary" disabled={paymentDetails.id ? false : true}>Place Order</button>
                    </div>
                </div>
                    
            </div>
        </div>
    )
}

export default OrderConfirm
