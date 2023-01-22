import React, { useContext, useEffect, useState } from 'react';
import Modal from '../../Shared/Modal/Modal';
import { GoVerified } from 'react-icons/go';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RiAdvertisementFill } from 'react-icons/ri';


const AdvertisedProducts = () => {

    const { loading, setLoading, user, allUsers } = useContext(AuthContext)

    const { data: advertiseItems = [] } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch('https://buyandsell24-server.vercel.app/products')
            .then(res => res.json())
    })



    if (loading) {
        <progress className="progress w-56"></progress>
    }


    const [product, SetProduct] = useState('')

    const handleSetProduct = data => {
        SetProduct(data)
    }

    console.log(advertiseItems)
    let advertiseItemsFiltered = advertiseItems.filter(item => item?.Advertise === true)

    setLoading(false)

    if (advertiseItemsFiltered.length != 0) {
        return (
            <div>
                <div className='grid grid-cols-1 lg:grid-cols-3 mt-3 justify-items-center gap-5 container mx-auto'>

                    {advertiseItemsFiltered &&
                        advertiseItemsFiltered.map(item =>
                            <div className="card w-96 bg-base-100 shadow-lg border-2 border-primary ">
                                <figure><img src={item.img} alt="Items'" className='object-cover h-64 w-full' /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.name} <RiAdvertisementFill className='text-secondary' /></h2>
                                    <p>{item.description}</p>
                                    <p className="text-sm">Location: {item.location}</p>
                                    <p className="text-sm">Years of used: {item.used}</p>
                                    <p className="text-sm">Posted: 2 days</p>
                                    <p className="text-sm flex gap-2 inline">Seller Name: <span className='font-bold'>{item.sname}</span> {item.verified ? <GoVerified className='text-sky-500 mt-1' /> : <GoVerified className='text-gray-500 mt-1' />} </p>
                                    <p className="text-sm">Seller Contact: <span className='font-bold'>{item.phoneNo}</span></p>

                                    <div className="flex justify-between">
                                        <div className="card-actions justify-start">
                                            <button className="btn btn-outline">{item.price} Tk</button>
                                        </div>
                                        <div className="card-actions justify-end">
                                            {/* <button className="btn ">Book Now</button> */}
                                            {user ?
                                                <label onClick={() => handleSetProduct(item)} htmlFor="bookModal" className="btn btn-primary">Book Now</label>
                                                :

                                                <Link to='/login' className="btn btn-primary">Please Login First</Link>
                                            }
                                            <Modal key={item._id} product={product} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    }


                </div>
            </div>
        );
    }
};

export default AdvertisedProducts;