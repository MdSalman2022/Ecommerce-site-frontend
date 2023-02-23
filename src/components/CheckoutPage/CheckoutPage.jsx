import React, { useState } from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';


function CheckoutPage() {

    const { register, formState: { errors }, handleSubmit } = useForm();
    //save data to local storage

    const [active, setActive] = useState(false);

    const handleLogin = data => {
        console.log(data)
        localStorage.setItem('userInfo', JSON.stringify(data))
        setActive(true)
    }
    
    return (
        <div>
            <div className="container mx-auto my-10">
                    <div className="flex flex-col items-center">
                        <h2 className="text-4xl font-bold text-center">Shipping</h2>
                        <form onSubmit={handleSubmit(handleLogin)} className="form-control w-full max-w-xl">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"
                                    {...register("name", {
                                        required: "Name is required"
                                    })}
                                    className="input input-bordered w-full max-w-xl" />
                                {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text"
                                    {...register("address", {
                                        required: "Shipping Address is required"
                                    })}
                                    className="input input-bordered w-full max-w-xl" />
                                {errors.address && <p className='text-red-600'>{errors.address?.message}</p>}
                            <label className="label">
                                <span className="label-text">Contact</span>
                            </label>
                            <input type="number"
                                    {...register("contact", {
                                        required: "Contact number is required"
                                    })}
                                    className="input input-bordered w-full max-w-xl" />
                                {errors.contact && <p className='text-red-600'>{errors.contact?.message}</p>}    
                        

                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <input type="text"
                                    {...register("city", {
                                        required: "City Name is required"
                                    })}
                                    className="input input-bordered w-full max-w-xl" />
                            {errors.city && <p className='text-red-600'>{errors.city?.message}</p>}    
                        
                            <div className="flex justify-between w-full gap-5">
                                <input className='w-20 btn btn-secondary mt-5' value="Save" type="submit" />
                                <Link to="/order-confirm" className='w-80'><button type="submit" value="submit"  className="btn  w-full btn-secondary mt-5 flex items-center" disabled={active ? false : true}>Billing <FaAngleRight className='text-lg md:text-2xl'/> </button>  </Link>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    )
}

export default CheckoutPage
