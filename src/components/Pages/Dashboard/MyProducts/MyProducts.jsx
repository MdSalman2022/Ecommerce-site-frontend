import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const MyProducts = () => {

    const { user } = useContext(AuthContext)
    const [myProducts, setMyProducts] = useState('')
    const [allPaidProducts, setAllPaidProducts] = useState('')


    useEffect(() => {
        fetch(`https://buyandsell24-server.vercel.app/myproducts?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setMyProducts(data))
    }, [user?.email])


    useEffect(() => {
        fetch(`https://buyandsell24-server.vercel.app/payments`)
            .then(res => res.json())
            .then(data => setAllPaidProducts(data))
    }, [])

    console.log(allPaidProducts);

    const handleAdvertise = id => {
        fetch(`https://buyandsell24-server.vercel.app/myproducts/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Product Marked as Sold successful.')
                }
            })
    }



    // const handleAvailable = id => {
    //     fetch(`https://buyandsell24-server.vercel.app/available/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.modifiedCount > 0) {
    //                 toast('Product Is Not Available')
    //             }
    //         })
    // }


    const handleDelete = data => {
        const permission = window.confirm(`Are you sure you want to delete: ${data.name}`)

        if (permission) {
            fetch(`https://buyandsell24-server.vercel.app/products/${data._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success('Product Deleted Successfully')
                        const remainingProducts = myProducts?.filter(product => product._id !== data._id)
                        setMyProducts(remainingProducts)
                    }
                })
        }
    }


    return (
        <div>
            <h1 className="text-3xl my-5 text-center font-bold">My Products</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myProducts &&
                            myProducts.map((myProduct, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{myProduct.name}</td>
                                    <td>{myProduct.price}</td>
                                    <td>{myProduct.email}</td>
                                    <td>{myProduct.Available ? 'Available' : "Sold"}</td>
                                    <td>
                                        <button onClick={() => handleAdvertise(myProduct._id)} className="btn btn-success mr-2">{myProduct.Advertise ? 'Advertised' : 'Advertise'}</button>

                                        <button onClick={() => handleDelete(myProduct)} className="btn btn-outline btn-error">Delete</button>
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

export default MyProducts;