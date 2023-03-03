import React from 'react'
import { useForm } from 'react-hook-form';
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddProduct() {

    
    const { register, formState: { errors }, handleSubmit } = useForm();

    const imageHostKey = import.meta.env.VITE_IMGBB_KEY;


    const navigate = useNavigate();


    const handleAdd = data => {

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
                        cat: data.cat,
                        subcat: data.subcat,
                        brand: data.brand,
                        spec: data.spec = data.spec.split("."),
                        price: data.price,
                        image: imgUpload.data.url,
                        stock: data.stock === 'true' ? true : false,
                        featured: data.featured === 'true' ? true : false,
                        special: data.special === 'true' ? true : false,
                        bestseller: data.bestseller === 'true' ? true : false,
                        discount: data.discount ? data.discount : 0,
                        rating: 0,
                        sells: 0,
                        capacity: data.capacity ? data.capacity : "",
                        date: new Date().toDateString(),



                    }
                    fetch('https://bestdeal-ecommerce-server.vercel.app/addproduct', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success(`${product.name} is added successfully`)
                            navigate('/dashboard/products')
                        }
                        )
                }
            })

    }


    return (
        <div> 
                <form onSubmit={handleSubmit(handleAdd)} className="form-control w-full flex flex-col md:grid grid-cols-2 justify-items-start p-5">
                            <div className="col-span-1 w-full max-w-3xl">
                                <label className="label">
                                    <span className="text-lg label-text">Product Name</span> 
                                </label>
                                <input type="text" placeholder="Sony Bravia 4k..." className="input input-bordered w-full"
                                {...register("name", {
                                    required: "Name is required"
                                    })}/>
                                <p className='text-xs text-gray-300'>Do not exceed 20 characters when entering the product name.</p> 
                                {errors.name && <p className='text-red-600'>Name is required</p>}

                                <label className="label">
                                    <span className="text-lg label-text flex items-center gap-2">Category <BsFillInfoCircleFill className='cursor-pointer text-gray-300 text-sm'/> </span> 
                                </label>
                                <input type="text" placeholder="TV / Smartphone / Components / Console" className="input input-bordered w-full"
                                {...register("cat", {
                                    required: "Name is required"
                                })}
                                />
                                {errors.cat && <p className='text-red-600'>Category is required</p>}

                                <label className="label">
                                    <span className="text-lg label-text flex items-center gap-2">Sub Category</span> 
                                </label>
                                <input type="text" placeholder="Motherboard / Processor" className="input input-bordered w-full"
                                {...register("subcat", {
                                    required: "Sub Category is required"
                                    })}
                                />
                                {errors.subcat && <p className='text-red-600'>Sub Category is required</p>}
                    


                                <label className="label">
                                    <span className="text-lg label-text flex items-center gap-2">Brand</span> 
                                </label>
                                <input type="text" placeholder="Sony" className="input input-bordered w-full"
                                {...register("brand", {
                                    required: "Brand is required"
                                    })}
                                />
                                {errors.brand && <p className='text-red-600'>Brand is required</p>}

                                <label className="label">
                                    <span className="text-lg label-text flex items-center gap-2">Description</span> 
                                </label>
                                <textarea className="textarea textarea-primary w-full" placeholder="Description"
                                {...register("spec", {
                                    required: "Description is required"
                                })}
                                ></textarea>
                                <p className='text-xs text-gray-300'>Do not exceed 100 characters or 4 sentences when entering the product description.</p> 
                                {errors.spec && <p className='text-red-600'>Description is required</p>}

                                <label className="label">
                                    <span className="text-lg label-text flex items-center gap-2">Price</span> 
                                </label>
                                <input type="number" placeholder="$249" className="input input-bordered w-full"
                                {...register("price", {
                                    required: "Brand is required"
                                    })}
                                />
                                {errors.brand && <p className='text-red-600'>Brand is required</p>}

                            </div>
                        
                            <div className="col-span-1 w-full space-y-5">
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="text-lg label-text">Pick a file</span> 
                                    </label>
                                    <input type="file" className="file-input file-input-bordered w-full "
                                    {...register("image", {
                                        required: "Image is required"
                                    })}
                                    />                                
                                    {errors.image && <p className='text-red-600'>Image is required</p>}
                                </div>
                                
                                <div>
                                    <label className="label">
                                        <span className="text-lg label-text flex items-center gap-2">Stock</span> 
                                    </label>
                                    <select className="select select-primary w-full" defaultChecked="true" {...register("stock", { required: true })} >
                                        <option value="true">In Stock</option>
                                        <option value="false">Out of Stock</option>
                                    </select>

                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-lg label-text flex items-center gap-2">featured</span> 
                                    </label>
                                    <select className="select select-primary w-full" defaultChecked="false" {...register("featured", { required: true })} >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-lg label-text flex items-center gap-2">Special</span> 
                                    </label>
                                    <select className="select select-primary w-full" defaultChecked="false" {...register("special", { required: true })} >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-lg label-text flex items-center gap-2">Discount</span> 
                                    </label>
                                    <input type="number" placeholder="40 (40% discount)" className="input input-bordered w-full" {...register("discount", { required: true })}/>
                                </div>
                                <input className='btn btn-secondary w-full border border-white' value="Submit" type="submit" />
                            </div>
                </form>
        </div>
    )
}

export default AddProduct
