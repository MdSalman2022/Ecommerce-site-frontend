import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';


const Modal = ({ product }) => {


    // console.log("product", product._id)

    const handleBooking = event => {
        event.preventDefault()
        const form = event.target
        const bname = form.bname.value
        const email = form.email.value
        const pname = form.pname.value
        const price = form.price.value
        const location = form.location.value
        const phoneNo = form.phoneNo.value

        const booking = {
            bname: bname,
            img: product.img,
            email: email,
            pname,
            price,
            location,
            phoneNo,
            id: product._id
        }

        fetch('https://buyandsell24-server.vercel.app/bookedList', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            // headers: {
            //     'content-type': 'application/json',
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`${booking.pname} is booked successfully`)
                // Navigate('/dashboard/myproducts')
            })

        console.log(booking)

    }
    const { user } = useContext(AuthContext)

    // console.log(item)
    // console.log(item._id);

    return (
        <div>

            <input type="checkbox" id="bookModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="bookModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10   ">
                        <div className="mb-8 text-center">
                            <h1 className="my-3 text-4xl font-bold">Confirm Order!</h1>
                        </div>
                        <form onSubmit={handleBooking} novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                            <div className="space-y-4">
                                <div>
                                    <label for="email" className="block mb-2 text-sm">User Name</label>
                                    <input type="text" name="bname" id="name" defaultValue={user?.displayName} placeholder="John Doe" className="w-full px-3 py-2 border rounded-md  " disabled />
                                </div>
                                <div>
                                    <label for="email" className="block mb-2 text-sm">Email address</label>
                                    <input type="email" name="email" id="email" defaultValue={user?.email} placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md  " disabled />
                                </div>
                                <div>
                                    <label for="pname" className="block mb-2 text-sm">Product Name</label>
                                    <input type="text" name="pname" id="name" defaultValue={product?.name} placeholder="iPhone 13 Pro Max" className="w-full px-3 py-2 border rounded-md  " disabled />
                                </div>
                                <div>
                                    <label for="price" className="block mb-2 text-sm">Price</label>
                                    <input type="text" name="price" id="item" defaultValue={product?.price} placeholder="$$$" className="w-full px-3 py-2 border rounded-md  " disabled />
                                </div>
                                <div>
                                    <label for="location" className="block mb-2 text-sm">Meeting Location</label>
                                    <input type="text" name="location" id="meetlocation" placeholder="Infront of National Museum front gate" className="w-full px-3 py-2 border rounded-md  " />
                                </div>
                                <div>
                                    <label for="phoneNo" className="block mb-2 text-sm">Contact Number</label>
                                    <input type="text" name="phoneNo" id="phoneNo" placeholder="+88012345678" className="w-full px-3 py-2 border rounded-md  " />
                                </div>
                                <div className="modal-action justify-center">
                                    <input className='btn btn-accent w-full ' type="submit" value="Submit" />
                                    <Toaster />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;