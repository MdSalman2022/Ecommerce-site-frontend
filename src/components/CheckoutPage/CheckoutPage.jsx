import React, { useContext, useState } from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';


function CheckoutPage() {

    const {user, allUsers} = useContext(AuthContext)

    const { register, formState: { errors }, handleSubmit } = useForm();
    //save data to local storage

    const [active, setActive] = useState(false);
 

    let info = allUsers.find(u => u.email === user?.email)
    console.log(info)

    const { name, address, contact, city } = info;
 

    const handleDelivery = data => {
        console.log(data) 
        let email = user.email
        let orderName = data.name
        let address = data.address
        let contact = data.contact
        let city = data.city
        fetch('https://bestdeal-ecommerce-server.vercel.app/deliveryInfo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email ,orderName, address,contact,city })
        })
        .then(res => res.json())
        .then(data => {
            setActive(true)
            if (data.modifiedCount > 0) {
                toast.success('Delivery Details Updated successfully')
            }
          })
          .catch(err => console.error(err))
    }
    
    return (
        <div>
            <div className="checkoutpage container mx-auto my-10">
                    <div className="flex flex-col items-center">
                        <h2 className="text-4xl font-bold text-center">Shipping</h2>
                        <form onSubmit={handleSubmit(handleDelivery)} className="form-control w-full max-w-xl">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" defaultValue={name ? name : info.orderName}
                            {...register("name", {
                                        validate: value => value !== "" || value === (name ? name : info?.orderName),
                                        required: "Name is required"
                                    })}
                                    className="input input-bordered w-full max-w-xl" />
                                {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text" defaultValue={address}
                            {...register("address", {
                                validate: value => value !== "" || value === (address),
                                        required: "Shipping Address is required"
                                    })}
                                    className="input input-bordered w-full max-w-xl" />
                                {errors.address && <p className='text-red-600'>{errors.address?.message}</p>}
                            <label className="label">
                                <span className="label-text">Contact</span>
                            </label>
                            <input type="number" defaultValue={contact}
                            {...register("contact", {
                                        validate: value => value !== "" || value === (contact),
                                        required: "Contact number is required"
                                    })}
                                    className="input input-bordered w-full max-w-xl" />
                                {errors.contact && <p className='text-red-600'>{errors.contact?.message}</p>}    
                        

                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <input type="text" defaultValue={city}
                            {...register("city", {
                                        validate: value => value !== "" || value === (city),
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
