import React, { useState } from 'react';
import { FaStar,FaPlus,FaMinus } from 'react-icons/fa';
import {FiHeart} from 'react-icons/fi';
import {MdOutlineCompareArrows} from 'react-icons/md';

const ProductGrid = () => {
    const [count, setCount] = useState(0)

    return (
        <div className='py-20'>
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center mb-14">
                     <h1 className="text-5xl font-bold">Recent Products</h1>
                    <span className="h-1 w-20 bg-primary rounded-full"></span> 
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="card card-compact lg:card-side bg-base-100 relative border">
                        <figure><img src="https://i.ibb.co/qkbxKxR/asus.webp" alt="Album"/></figure>
                        <div className="card-body flex flex-col justify-between">
                            <div className='card-title flex-col justify-start items-start'>
                                 <p className="text-xl font-semibold">Asus 34" QHD Monitor</p>
                                <p className="text-xl font-semibold">$599</p>
                                <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                            </div>
                            <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                                <FiHeart className='p-2 bg-white hover:scale-110 hover:border-error transition-all duration-300 text-5xl border rounded-full text-error'/>
                                <MdOutlineCompareArrows className='p-2 bg-white hover:scale-110 hover:border-success transition-all duration-300 text-5xl border rounded-full text-success'/>
                            </div>

                            <div className="">
                                <div className="">
                                    <div className=' flex flex-col gap-3 items-center'>
                                        <div className="flex w-full justify-center items-center">
                                            <button className='btn btn-primary rounded-full ' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                            <input type="number" className='  text-center border-none'  value={count}/>
                                            <button className={`btn btn-primary rounded-full border-none text-neutral ${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                            onClick={() => setCount(count + 1)}  disabled={count === 10}><FaPlus className="text-white"/></button>
                                        </div>
                                    <button className="btn rounded-full btn-primary text-white w-full">Add to cart</button>                                    
                                    </div>                               
                                </div>                                    
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="card card-compact lg:card-side bg-base-100 relative border h-60 ">
                            <figure><img src="https://i.ibb.co/6Z0czxP/ryzen.webp" alt="Album" className='w-60 object-cover'/></figure>
                            <div className="card-body flex flex-col ">
                                <div className='card-title flex-col justify-start items-start'>
                                    <p className="text-xl font-semibold">Ryzen R9 7900X</p>
                                    <p className="text-xl font-semibold">$599</p>
                                    <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                                </div>
                                <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                                    <FiHeart className='p-2 bg-white hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                                    <MdOutlineCompareArrows className='p-2 bg-white hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                                </div>  
                                    <div className=' flex flex-col gap-3 items-center'>
                                    <div className="flex w-full justify-center items-center">
                                        <button className='btn btn-primary rounded-full ' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                        <input type="number" className=' w-full text-center border-none'  value={count}/>
                                        <button className={`btn btn-primary rounded-full border-none text-neutral ${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                        onClick={() => setCount(count + 1)}  disabled={count === 10}><FaPlus className="text-white"/></button>
                                        </div>
                                    <button className="btn rounded-full btn-primary text-white w-full">Add to cart</button>                                    
                                </div>        
                            </div>                        
                        </div>
                        <div className="card card-compact lg:card-side bg-base-100 relative border h-60 ">
                            <figure><img src="https://i.ibb.co/whBpg7X/rtx4090.webp" alt="Album" className='h-60 p-5 object-cover'/></figure>
                            <div className="card-body flex flex-col ">
                                <div className='card-title flex-col justify-start items-start'>
                                    <p className="text-xl font-semibold">Asus Rog RTX 4090</p>
                                    <p className="text-xl font-semibold">$1599</p>
                                    <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                                </div>
                                <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                                    <FiHeart className='p-2 bg-white hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                                    <MdOutlineCompareArrows className='p-2 bg-white hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                                </div>  
                                    <div className=' flex flex-col gap-3 items-center'>
                                    <div className="flex w-full justify-center items-center">
                                        <button className='btn btn-primary rounded-full ' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                        <input type="number" className=' w-full text-center border-none'  value={count}/>
                                        <button className={`btn btn-primary rounded-full border-none text-neutral ${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                        onClick={() => setCount(count + 1)}  disabled={count === 10}><FaPlus className="text-white"/></button>
                                        </div>
                                    <button className="btn rounded-full btn-primary text-white w-full">Add to cart</button>                                    
                                </div>        
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;