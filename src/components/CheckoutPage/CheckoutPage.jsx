import React from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function CheckoutPage() {

    
    return (
        <div>
            <div className="container mx-auto my-10">
                    <div className="flex flex-col items-center">
                        <h2 className="text-4xl font-bold text-center">Shipping</h2>
                        <div className="form-control w-full max-w-xl">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Full Name" className="input input-bordered  " />
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text" placeholder="Shipping address" className="input input-bordered w-full max-w-xl" />
                            <label className="label">
                                <span className="label-text">Contact</span>
                            </label>
                            <input type="number" placeholder="Contact No." className="input input-bordered w-full max-w-xl" />
                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <input type="text" placeholder="City Name" className="input input-bordered w-full max-w-xl" />
                            <Link to="/order-confirm" type="submit" value="submit" className="btn btn-block btn-secondary mt-5 flex items-center">Billing <FaAngleRight className='text-lg md:text-2xl'/> </Link>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default CheckoutPage
