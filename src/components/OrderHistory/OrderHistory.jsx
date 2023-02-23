import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'

function OrderHistory() {

    const { user, orders } = useContext(AuthContext)

    
    console.log(orders)
    
    const filteredOrders = orders.filter(order => order.email === user.email)
    
    console.log(filteredOrders)

    return (
        <div className='py-10'>
            <div className="container mx-auto">
                <div className="flex flex-col">
                    <h2 className='text-4xl font-semibold text-center my-10'>Order History</h2>
                    { filteredOrders.length > 0 ?
                        filteredOrders.map(order => (
                            <div className='mb-5' key={order._id}>
                                <div className="flex justify-between items-center border p-5 rounded-t-xl">
                                    <div>
                                        <p className="font-bold">Order #{order._id}</p>
                                        <p className="font-bold">Ordered: {order.date}</p>
                                    </div>
                                    <p className='text-success font-bold'>Shipped</p>
                                </div>

                                <div className="flex flex-col">
                                    {
                                        order.items.map(product => (
                                            <div className='grid grid-cols-4 h-full justify-items-center place-items-center bg-accent bg-opacity-30 border px-3 py-1'>
                                                <img className='w-20' src={product.image} alt="" />
                                                <p>{product.name}</p>
                                                <p>${product.price}</p>
                                                <Link to={`/productDetails/${product._id}/${encodeURIComponent(product.name).replace(/%20/g, "-")}`} className='btn btn-secondary'>View</Link>
                                            </div>
                                        ))
                                    }
                                    {/* <img src={order.img} alt="" /> */}
                                </div>
                                
                            </div>
                        ))
                        : 
                        <div className='text-center'>
                            <p className='text-2xl font-bold'>No orders found</p>
                            <Link to='/'>
                                <button className='btn btn-secondary'>Continue Shopping</button>
                            </Link>
                        </div>
                    }

                    
                </div>
            </div>
        </div>
    )
}

export default OrderHistory
