import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const AllSeller = () => {
    let { allUsers, setAllUsers } = useContext(AuthContext)
    let sellers = allUsers?.filter(allUser => allUser?.role === 'seller')


    const handleDelete = data => {
        const permission = window.confirm(`Are you sure you want to delete: ${data.name}`)

        if (permission) {
            fetch(`https://buyandsell24-server.vercel.app/users/${data._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success('User Deleted Successfully')
                        const remainingUsers = allUsers?.filter(user => user._id !== data._id)
                        setAllUsers(remainingUsers)
                    }
                })
        }
    }


    const handleVerify = id => {
        fetch(`https://buyandsell24-server.vercel.app/seller/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    console.log(data)
                    toast.success('User Verified')
                }
            })
    }



    return (
        <div>
            <h1 className="text-3xl my-5 text-center font-bold">All Sellers</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers &&
                            sellers?.map((seller, index) =>
                                <tr key={seller?._id}>
                                    <th>{index + 1}</th>
                                    <td>{seller?.name}</td>
                                    <td>{seller?.email}</td>
                                    <td>{seller?.verified}</td>
                                    <td><button onClick={() => handleVerify(seller._id)} className="btn btn-error mr-2">Verify</button>
                                        <button onClick={() => handleDelete(seller)} className="btn btn-error">Delete</button></td>
                                </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default AllSeller;