import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const MyOrders = () => {

    const { user } = useContext(AuthContext)
    const [myOrders, setMyOrders] = useState('')

    //filtering orders by email
    useEffect(() => {
        fetch(`https://buyandsell24-server.vercel.app/bookedList?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setMyOrders(data))
    }, [user?.email])


    return (
        <div>
            <h1 className="text-3xl my-5 text-center font-bold">My Products</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myOrders &&
                            myOrders?.map((myOrder, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td><img src={myOrder.img} alt="" className='w-20 rounded-xl' /></td>
                                    <td>{myOrder.pname}</td>
                                    <td>{myOrder.price}</td>
                                    <td>{myOrder.price}</td>
                                    <td>{myOrder.email}</td>
                                    <td>
                                        <Link to={`/dashboard/payments/${myOrder._id}`}>
                                            <button className="btn btn-primary mr-2">Pay</button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;