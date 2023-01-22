import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const AddProduct = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const { user } = useContext(AuthContext)





    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const handleProductSubmit = data => {


        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgUpload => {
                if (imgUpload.success) {
                    const product = {
                        name: data.name,
                        sname: data.sname,
                        price: data.price,
                        oriprice: data.oriprice,
                        condition: data.condition,
                        phoneNo: data.phoneNo,
                        location: data.location,
                        description: data.description,
                        year: data.year,
                        email: data.email,
                        categoryId: data.categoryId,
                        img: imgUpload.data.url
                    }
                    fetch('https://buyandsell24-server.vercel.app/categoryitems', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        // headers: {
                        //     'content-type': 'application/json',
                        //     authorization: `bearer ${localStorage.getItem('accessToken')}`
                        // },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success(`${product.name} is added successfully`)
                            Navigate('/dashboard/myproducts')
                        }
                        )
                }
            })

    }





    return (
        <div className=' my-10'>
            <div className="p-8 space-y-3 rounded-xl bg-base-200 mx-auto">
                <h1 className="text-3xl font-bold text-center">Add A Product</h1>
                <form onSubmit={handleSubmit(handleProductSubmit)} novalidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid grid grid-cols-2">

                    <div className="mt-5 space-y-1 text-sm">
                        <label for="name" className="block ">Product Name</label>
                        <input type="text"
                            {...register("name",
                                { required: "Name is required", })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>

                    <div className='space-y-1 text-sm'>
                        <label className="label"><span className="label-text">Photo</span></label>
                        <input type="file"
                            {...register("image",
                                { required: "Photo is required", })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                    </div>


                    <div className='space-y-1 text-sm'>
                        <label for="categoryId" className="block ">Product Brand</label>
                        <select className="select select-primary w-full max-w-xs" {...register("categoryId", { required: true })}>
                            <option value="1" id="412">Apple</option>
                            <option value="2">Samsung</option>
                            <option value="3">Xiaomi</option>
                            <option value="4">Oppo</option>
                            <option value="5">Oneplus</option>
                        </select>
                    </div>

                    <div className="space-y-1 text-sm">
                        <label for="sname" className="block ">Seller Name</label>
                        <input type="text"
                            {...register("sname",
                                { required: "Name is required", })}
                            className="input input-bordered w-full max-w-xs" defaultValue={user?.displayName} />
                        {errors.sname && <p className='text-red-500'>{errors.sname.message}</p>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label for="email" className="block ">Email Address</label>
                        <input type="email"
                            {...register("email",
                                { required: "Email is required" })}
                            className="input input-bordered w-full max-w-xs " defaultValue={user?.email} readOnly />
                        {/* {errors?.email && <p className='text-red-500'>{errors?.email.message}</p>} */}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label for="price" className="block ">Price</label>
                        <input type="number"
                            {...register("price",
                                { required: "Price is required", })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label for="oriprice" className="block ">Original Price</label>
                        <input type="number"
                            {...register("oriprice",
                                { required: "Price is required", })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.oriprice && <p className='text-red-500'>{errors.oriprice.message}</p>}
                    </div>
                    <div className='space-y-1 text-sm'>
                        <label for="condition" className="block ">Product Condition</label>
                        <select className="select select-primary w-full max-w-xs" {...register("condition", { required: true })}>
                            <option value="excellent" selected>Excellent</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                        </select>
                    </div>
                    <div className="space-y-1 text-sm">
                        <label for="phoneNo" className="block ">Contact Number</label>
                        <input type="text"
                            {...register("phoneNo",
                                { required: "Contact Number is required", })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.phoneNo && <p className='text-red-500'>{errors.phoneNo.message}</p>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label for="location" className="block ">Location</label>
                        <input type="text"
                            {...register("location",
                                { required: "Location is required", })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label for="description" className="block ">Description</label>
                        <input type="text"
                            {...register("description",
                                { required: "Location is required", })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label for="year" className="block ">Year Of Purchase</label>
                        <input type="number"
                            {...register("year",
                                { required: "Year is required", })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.year && <p className='text-red-500'>{errors.year.message}</p>}
                    </div>
                    <input className='btn btn-success w-full max-w-xs mt-4' value="Submit" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;