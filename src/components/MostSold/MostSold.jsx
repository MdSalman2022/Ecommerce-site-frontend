import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component'; 
import { FaStar } from 'react-icons/fa'
import {FiHeart} from 'react-icons/fi'
import { MdOutlineCompareArrows } from 'react-icons/md'
import {FaPlus, FaMinus,FaArrowRight} from 'react-icons/fa'
import { MdStars } from 'react-icons/md'

const MostSold = () => {

    
    const [count, setCount] = useState(0)


    return (
        <div className='py-20 bg-accent'>
            <div className="container mx-auto flex flex-col gap-2 justify-center items-center pb-14">
                 <h1 className="text-3xl font-bold">Most Sold This Week</h1> 
                 <p className=''>Top 10 most sold this week, next day delivery.</p>
            </div>
            <div className="container mx-auto grid grid-cols-4 gap-5"> 
                <div className="transition-all duration-300 hover:-translate-y-5 card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                    <figure><LazyLoadImage className='object-cover w-60 group-hover:scale-110 transition-all duration-300 p-2 h-60'  src="https://i.ibb.co/LS8Vy9s/Google-Pixel-Buds-2-True-Wireless-Bluetooth-Earbuds-3-1-e1635330490469.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title justify-between">
                            Pixel Buds
                            <div className="badge bg-transparent border-none text-3xl text-yellow-400"><MdStars/></div>
                        </h2>     
                        <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                        <span className='font-semibold text-xl'>$299</span>
                        <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                                <FiHeart className='p-2 bg-white hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                                <MdOutlineCompareArrows className='p-2 bg-white hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                        </div>
                        <div className="absolute bottom-4">
                            <div className="card-actions flex-col gap-3">
                                <div className='w-full flex flex-col gap-3 justify-center items-center'>
                                      <div className="flex">
                                        <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                        <input type="number" className='w-60 text-center border-none'  value={count}/>
                                        <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                            onClick={() => setCount(count + 1)}  disabled={count === 10}
                                         ><FaPlus className="text-white"/></button>
                                    </div>
                                <button className="btn rounded-full btn-primary text-white w-full">Add to cart</button>                                    
                                </div>                               
                            </div>

                        </div>
                    </div>
                </div> 
                <div className="transition-all duration-300 hover:-translate-y-5 card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                    <figure><img  src="https://i.ibb.co/xLZQ7Q3/iphn13pm.webp" alt="Shoes" className='object-cover h-60 group-hover:scale-110 transition-all duration-300' /></figure>
                    <div className="card-body">
                         <h2 className="card-title justify-between">
                            <p>Iphone 13 Pro Max</p>
                            <div className="badge bg-transparent border-none text-3xl text-yellow-400"><MdStars/></div>
                        </h2>    
                        <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                        <span className='font-semibold text-xl'>$899</span>
                        <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                                <FiHeart className='p-2 bg-white hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                                <MdOutlineCompareArrows className='p-2 bg-white hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                        </div>
                        <div className="absolute bottom-4">
                            <div className="card-actions flex-col gap-3">
                                <div className='w-full flex flex-col gap-3 justify-center items-center'>
                                      <div className="flex">
                                        <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                        <input type="number" className='w-60 text-center border-none'  value={count}/>
                                        <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                            onClick={() => setCount(count + 1)}  disabled={count === 10}
                                         ><FaPlus className="text-white"/></button>
                                    </div>
                                <button className="btn rounded-full btn-primary text-white w-full">Add to cart</button>                                    
                                </div>                               
                            </div>

                        </div>
                    </div>
                </div> 
                <div className="transition-all duration-300 hover:-translate-y-5 card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                    <figure><img  src="https://i.ibb.co/qkbxKxR/asus.webp" alt="Shoes" className='object-cover h-60 group-hover:scale-110 transition-all duration-300' /></figure>
                    <div className="card-body">
                        <h2 className="card-title justify-between">
                             Asus 34 QHD
                            <div className="badge bg-transparent border-none text-3xl text-yellow-400"><MdStars/></div>
                        </h2>     
                        <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                        <span className='font-semibold text-xl'>$470</span>
                       <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                                <FiHeart className='p-2 bg-white hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                                <MdOutlineCompareArrows className='p-2 bg-white hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                        </div>
                        <div className="absolute bottom-4">
                            <div className="card-actions flex-col gap-3">
                                <div className='w-full flex flex-col gap-3 justify-center items-center'>
                                      <div className="flex">
                                        <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                        <input type="number" className='w-60 text-center border-none'  value={count}/>
                                        <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                            onClick={() => setCount(count + 1)}  disabled={count === 10}
                                         ><FaPlus className="text-white"/></button>
                                    </div>
                                <button className="btn rounded-full btn-primary text-white w-full">Add to cart</button>                                    
                                </div>                               
                            </div>

                        </div>
                    </div>
                </div> 
                <div className="transition-all duration-300 hover:-translate-y-5 card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                    <figure><img  src="https://i.ibb.co/yhMqfqD/krakenx.jpg" alt="Razer" className='object-cover h-60 group-hover:scale-110 transition-all duration-300' /></figure>
                    <div className="card-body">
                        <h2 className="card-title justify-between">
                             Razer Kraken X
                            <div className="badge bg-transparent border-none text-3xl text-yellow-400"><MdStars/></div>
                        </h2>   
                        <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                        <span className='font-semibold text-xl'>$55</span>
                        <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                                <FiHeart className='p-2 bg-white hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                                <MdOutlineCompareArrows className='p-2 bg-white hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                        </div>
                        <div className="absolute bottom-4">
                            <div className="card-actions flex-col gap-3">
                                <div className='w-full flex flex-col gap-3 justify-center items-center'>
                                      <div className="flex">
                                        <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                        <input type="number" className='w-60 text-center border-none'  value={count}/>
                                        <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                            onClick={() => setCount(count + 1)}  disabled={count === 10}
                                         ><FaPlus className="text-white"/></button>
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

export default MostSold;