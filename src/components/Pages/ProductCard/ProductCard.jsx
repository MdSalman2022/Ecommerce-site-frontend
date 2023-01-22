import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import Modal from '../../Shared/Modal/Modal';
import { GoVerified } from 'react-icons/go';
import toast from 'react-hot-toast';

const ProductCard = ({ item, product, SetProduct }) => {

    // product details
    const { name, img, _id, location, description, used, sname, phoneNo, price, email } = item;

    let { allUsers, user } = useContext(AuthContext)


    const [seller, setSeller] = useState('')

    // filter the seller from product in useEffect
    useEffect(() => {
        fetch(`https://buyandsell24-server.vercel.app/users?email=${email}`)
            .then(res => res.json())
            .then(data => setSeller(data))
    }, [email])

    // console.log(seller[0]?.verified)

    //for filtering buyer from user list
    allUsers = allUsers?.filter(allUser => allUser?.role === 'buyer')
    let currentUser = allUsers?.filter(allUser => allUser?.email === user?.email)

    if (email) {
        console.log("item", item);
    }
    const handleSetProduct = data => {
        SetProduct(data)
    }


    const handleReportItem = data => {
        const agree = window.confirm(`Do you want to report this product named ${data.name}`)
        if (agree) {
            fetch(`https://buyandsell24-server.vercel.app/reportedProducts/${data._id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.matchedCount > 0) {
                        toast.success(`${data.name} reported successfully!`);
                    }
                });
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-lg border-2 border-primary " key={_id}>
            <figure><img src={img} alt="Items'" className='object-cover h-64 w-full' /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <p className="text-sm">Location: {location}</p>
                <p className="text-sm">Years of used: {used}</p>
                <p className="text-sm">Posted: 2 days</p>
                <p className="text-sm flex gap-2 inline">Seller Name: <span className='font-bold'>{sname}</span> {seller[0]?.verified ? <GoVerified className='text-sky-500 mt-1' /> : <GoVerified className='text-gray-500 mt-1' />} </p>
                <p className="text-sm">Seller Email: <span className='font-bold'>{email}</span></p>
                <p className="text-sm">Seller Contact: <span className='font-bold'>{phoneNo}</span></p>
                <div className="card-actions justify-start">
                    <p className='font-bold text-lg'>Price: {price} Tk</p>
                </div>
                <div className="flex justify-between">

                    <div className="justify-start">
                        <button onClick={() => handleReportItem(item)} className="btn btn-error btn-outline ">Report to Admin</button>
                    </div>
                    <div className="card-actions flex justify-end">

                        {
                            currentUser[0]?.role === 'buyer' ?
                                <label onClick={() => handleSetProduct(item)} htmlFor="bookModal" className="btn btn-primary">Book Now</label>
                                :
                                <label className="btn btn-primary">Only For Buyers</label>
                        }

                        {item &&
                            <Modal key={_id} product={product} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;