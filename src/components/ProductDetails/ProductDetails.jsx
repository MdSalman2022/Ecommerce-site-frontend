import React, { useContext } from 'react'
import {TbDiscount2 } from 'react-icons/tb'
import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MdStars } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { MdOutlineCompareArrows } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../ProductCard/ProductCard';

function ProductDetails() {

    const [count, setCount] = useState(0)

    const {products} = useContext(AuthContext)

    const handleChange = (e) => {
        const newCount = Number(e.target.value);
        if (newCount <= 10) {
          setCount(newCount);
        }
    }

    const { _id, name, cat,subcat,brand,image, spec, price, rating, featured, latest, bestseller, sells, special, discount } = useLoaderData();
 
    

    let specialprice;
    if (special) {
        specialprice = (price - (price * discount / 100).toFixed(1)); 
    }

    let suggestion = products;

    suggestion = suggestion.filter((item) => item.cat === cat && item._id !== _id);


    return (
        <div className='pt-10'>
            <div className="">
                <div className="px-3 flex flex-wrap md:flex-row container mx-auto">
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li><Link>Home</Link></li> 
                            <li><Link>Component</Link></li> 
                            <li>{name}</li>
                        </ul>
                    </div>
                </div>

                <div className="container mx-auto grid md:grid-cols-2 justify-items-center  place-items-center h-full py-10 px-5 ">
                    <LazyLoadImage src={image} alt={name} className='md:w-96'/>
                    <div className='flex flex-col gap-5'>
                        <p className="text-xl capitalize font-semibold">{brand}</p>
                        <p className="text-2xl font-bold md:text-3xl lg:text-5xl">{name}</p>
                        <div className="specs space-y-3">
                            <p className="text-lg font-semibold ">Key Feature</p> 
                            <p>Model: {name} </p>
                            {
                                spec.map((item, index) => {
                                    return (
                                        <p key={index}>{item}</p>
                                    )
                                })
                            }
                            <p>Warrenty: 3 Years</p>
                        </div>
                        <p className="underline text-primary font-bold">View More Specs</p>

                        <div className='flex gap-2 items-center border-t-2 py-5'>
                                {special && <span className={`text-lg  py-3 bg-green-200 text-green-700 font-bold border-none badge flex items-center gap-1`}><TbDiscount2 /> {discount}%</span>} 
                                <span className={`${special ? 'line-through text-3xl ' : 'text-5xl '}`}>${price}</span> 
                                {special ? <span className='font-semibold text-5xl '>${specialprice}</span> : ''} 
                        </div>
                        <hr className='border-2'/>
                        <div className='w-full flex flex-col gap-3 items-center'>
                            <div className="flex">
                                <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                <input type="number" className='w-60 text-center border-none'  value={count} onChange={handleChange} />
                                <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                    onClick={() => setCount(count + 1)}  disabled={count === 10}
                                ><FaPlus className="text-white"/></button>
                            </div>
                            <button className="btn rounded-full btn-primary text-white w-full">Add to cart</button>                                    
                        </div>        
                        <button className='btn btn-primary rounded-full btn-outline border-2 hover:text-white'>Buy Now</button>
                    </div>

                </div>
                <div className="bg-accent px-2 py-10 md:px-0"> 
                    <div className="container mx-auto grid lg:grid-cols-4 gap-5 "> 
                        {
                            suggestion.map((item, index) => (
                                <ProductCard key={index} item={item} />
                            ))
                         }
                    </div>

                
                </div>            
            </div>            
        </div>
    )
}

export default ProductDetails
