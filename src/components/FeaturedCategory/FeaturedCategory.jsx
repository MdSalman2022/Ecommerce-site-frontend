import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa'
import {FiHeart} from 'react-icons/fi'
import { MdOutlineCompareArrows } from 'react-icons/md'
import {FaPlus, FaMinus,FaArrowRight} from 'react-icons/fa'
import { MdStars } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component';


const FeaturedCategory = () => {

    const [count, setCount] = useState(0)


    return (
        <div className='py-20'>
            <div className="text-center my-5 flex flex-col items-center gap-5 pb-10">
                <h1 className="text-4xl font-bold">Featured Category</h1>
                <span className="h-1 w-20 bg-primary rounded-full"></span>
            </div>

            <div className="container mx-auto grid grid-cols-4 gap-3 bg-accent rounded-3xl pr-3">
                <div className="col-span-1 w-full image-full h-[550px] rounded-l-3xl flex justify-center items-center overflow-hidden relative border-r-2">
                    <h1 className="text-4xl text-primary font-bold absolute top-24 text-center z-50">Smartphones</h1>                    
                    <LazyLoadImage height="300px" width="500px" src="https://i.ibb.co/9Zxt731/s22ultra.webp" alt="s22u" className='w-full absolute -bottom-20'/>
                </div>
                <div className="col-span-3 grid grid-cols-4 justify-items-center place-content-center ">
                        <div className="card w-64 card-compact bg-base-100  shadow-blue-50 h-[500px] group relative">
                            <figure><LazyLoadImage className='object-cover w-52 h-60 group-hover:scale-110 transition-all duration-300 p-2'  src="https://i.ibb.co/PNSM6dd/i14pm.webp" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title justify-between">
                                        iPhone 14 Pro Max
                                    <div className="badge bg-transparent border-none text-3xl text-yellow-400"><MdStars/></div>
                                </h2>     
                                <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                                <span className='font-semibold text-xl'>$299</span>
                                <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                                        <FiHeart className='p-2 bg-white hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                                        <MdOutlineCompareArrows className='p-2 bg-white hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                                </div>
                                <div className="absolute bottom-4">
                                    <div className=" ">
                                        <div className=' flex flex-col gap-3 items-center'>
                                            <div className="flex w-full justify-center items-center">
                                                <button className='btn btn-primary rounded-full ' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                                <input type="number" className='w-32 text-center border-none'  value={count}/>
                                                <button className={`btn btn-primary rounded-full border-none text-neutral ${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                                onClick={() => setCount(count + 1)}  disabled={count === 10}><FaPlus className="text-white"/></button>
                                            </div>
                                        <button className="btn rounded-full btn-primary text-white w-56">Add to cart</button>                                    
                                        </div>                               
                                    </div>
                                    
                                </div>
                            </div>
                        </div> 
                    <div className="card w-64 card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><LazyLoadImage className='object-cover w-52 h-60 group-hover:scale-110 transition-all duration-300 p-2'  src="https://i.ibb.co/J5MLWhJ/s22u.jpg" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title justify-between">
                                    Samsung S22 Ultra
                                    <div className="badge bg-transparent border-none text-3xl text-yellow-400"><MdStars/></div>
                                </h2>     
                                <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                                <span className='font-semibold text-xl'>$299</span>
                                <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                                        <FiHeart className='p-2 bg-white hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                                        <MdOutlineCompareArrows className='p-2 bg-white hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                                </div>
                                <div className="absolute bottom-4">
                                    <div className=" ">
                                        <div className=' flex flex-col gap-3 items-center'>
                                            <div className="flex w-full justify-center items-center">
                                                <button className='btn btn-primary rounded-full ' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                                <input type="number" className='w-32 text-center border-none'  value={count}/>
                                                <button className={`btn btn-primary rounded-full border-none text-neutral ${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                                onClick={() => setCount(count + 1)}  disabled={count === 10}><FaPlus className="text-white"/></button>
                                            </div>
                                        <button className="btn rounded-full btn-primary text-white w-56">Add to cart</button>                                    
                                        </div>                               
                                    </div>
                                    
                                </div>
                            </div>
                    </div> 
                    <div className="card w-64 card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><LazyLoadImage className='object-cover w-52 h-60 group-hover:scale-110 transition-all duration-300 p-2'  src="https://i.ibb.co/K6N7gNy/nothing.webp" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title justify-between">
                                    Nothing Phone
                                    <div className="badge bg-transparent border-none text-3xl text-yellow-400"><MdStars/></div>
                                </h2>     
                                <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                                <span className='font-semibold text-xl'>$299</span>
                                <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                                        <FiHeart className='p-2 bg-white hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                                        <MdOutlineCompareArrows className='p-2 bg-white hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                                </div>
                                <div className="absolute bottom-4">
                                    <div className=" ">
                                        <div className=' flex flex-col gap-3 items-center'>
                                            <div className="flex w-full justify-center items-center">
                                                <button className='btn btn-primary rounded-full ' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                                <input type="number" className='w-32 text-center border-none'  value={count}/>
                                                <button className={`btn btn-primary rounded-full border-none text-neutral ${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                                onClick={() => setCount(count + 1)}  disabled={count === 10}><FaPlus className="text-white"/></button>
                                            </div>
                                        <button className="btn rounded-full btn-primary text-white w-56">Add to cart</button>                                    
                                        </div>                               
                                    </div>
                                    
                                </div>
                            </div>
                    </div> 
                    <div className="card w-64 card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><LazyLoadImage className='object-cover w-52 h-60 group-hover:scale-110 transition-all duration-300 p-2'  src="https://i.ibb.co/pX8hctR/op10pro.webp" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title justify-between">
                                    Oneplus 10 Pro
                                    <div className="badge bg-transparent border-none text-3xl text-yellow-400"><MdStars/></div>
                                </h2>     
                                <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                                <span className='font-semibold text-xl'>$299</span>
                                <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                                        <FiHeart className='p-2 bg-white hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                                        <MdOutlineCompareArrows className='p-2 bg-white hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                                </div>
                                <div className="absolute bottom-4">
                                    <div className=" ">
                                        <div className=' flex flex-col gap-3 items-center'>
                                            <div className="flex w-full justify-center items-center">
                                                <button className='btn btn-primary rounded-full ' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                                <input type="number" className='w-32 text-center border-none'  value={count}/>
                                                <button className={`btn btn-primary rounded-full border-none text-neutral ${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                                onClick={() => setCount(count + 1)}  disabled={count === 10}><FaPlus className="text-white"/></button>
                                            </div>
                                        <button className="btn rounded-full btn-primary text-white w-56">Add to cart</button>                                    
                                        </div>                               
                                    </div>
                                    
                                </div>
                            </div>
                        </div> 
                </div>
            </div>
            
        </div>
    );
};

export default FeaturedCategory;