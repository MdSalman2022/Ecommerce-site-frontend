import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const AllBuyers = () => {

    let { allUsers, setAllUsers } = useContext(AuthContext)

    let buyers = allUsers?.filter(allUser => allUser?.role === 'buyer')


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

    return (
        <div>
            <h1 className="text-3xl my-5 text-center font-bold">All Buyers</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyers &&
                            buyers?.map((buyer, index) =>
                                <tr key={buyer?._id}>
                                    <th>{index + 1}</th>
                                    <td>{buyer?.name}</td>
                                    <td>{buyer?.email}</td>
                                    <td><button onClick={() => handleDelete(buyer)} className="btn btn-error">Delete</button></td>
                                </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;