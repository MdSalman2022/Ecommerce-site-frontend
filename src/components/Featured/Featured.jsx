import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Featured.css'
import { FaStar } from 'react-icons/fa'
import {FiHeart} from 'react-icons/fi'
import { MdOutlineCompareArrows } from 'react-icons/md'
import {FaPlus, FaMinus,FaArrowRight} from 'react-icons/fa'
import { MdStars } from 'react-icons/md'

const Featured = () => {


    const [tabselect, setTabSelect] = useState('tab1')

    const [count, setCount] = useState(0)

    return (
        <div className='bg-accent py-20'>
            <div className="container mx-auto flex flex-col items-center gap-5 text-center  ">
                    <h1 className="text-5xl font-bold">Featured Products</h1>
                    <span className="h-1 w-20 bg-primary rounded-full"></span>
                    <p className=''>These are the most highly rated product in our store <span className='underline text-secondary'>Learn More</span> </p>

                    <div className="flex items-center  overflow-x-auto sm:justify-center my-5 bg-white rounded-full">
                        <button onClick={()=> setTabSelect('tab1')} className={`flex items-center flex-shrink-0 px-5 py-2  text-neutral text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab1' && 'bg-opacity-100 text-white font-semibold'}`}>Featured</button>
                        <button onClick={()=> setTabSelect('tab2')} className={`flex items-center flex-shrink-0 px-5 py-2  text-neutral text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab2' && 'bg-opacity-100 text-white font-semibold'}`}>Latest</button>
                        <button onClick={()=> setTabSelect('tab3')} className={`flex items-center flex-shrink-0 px-5 py-2  text-neutral text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab3' && 'bg-opacity-100 text-white font-semibold'}`}>Bestsellers</button>
                        <button onClick={()=> setTabSelect('tab4')} className={`flex items-center flex-shrink-0 px-5 py-2  text-neutral text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab4' && 'bg-opacity-100 text-white font-semibold'}`}>Specials</button>
                    </div>
                </div> 

                {
                    tabselect === 'tab1' && 
                    <div className="container mx-auto grid grid-cols-4 gap-5"> 
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
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
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
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
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
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
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
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
                }

                {
                    tabselect === 'tab2' && 
                    <div className="container mx-auto grid grid-cols-4 gap-5"> 
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><LazyLoadImage className='object-cover w-60 group-hover:scale-110 transition-all duration-300 p-2'  src="https://i.ibb.co/jk8VtGM/core-i9-13900kf-01-500x500.webp" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                Core i9-13900K
                                <div className="badge-md border rounded-lg">NEW</div>
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
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><img  src="https://i.ibb.co/6Z0czxP/ryzen.webp" alt="Shoes" className='object-cover h-60 group-hover:scale-110 transition-all duration-300' /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                Ryzen 7900X
                                <div className="badge-md border rounded-lg">NEW</div>
                                </h2>
                                <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                                <span className='font-semibold text-xl'>$1099</span>
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
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><img  src="https://i.ibb.co/qkbxKxR/asus.webp" alt="Shoes" className='object-cover h-60 group-hover:scale-110 transition-all duration-300' /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                Asus 34 QHD
                                <div className="badge-md border rounded-lg">NEW</div>
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
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><img  src="https://i.ibb.co/PNSM6dd/i14pm.webp" alt="Razer" className='object-cover h-60 group-hover:scale-110 transition-all duration-300' /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                Iphone 14 Pro Max
                                <div className="badge-md border rounded-lg">NEW</div>
                                </h2>
                                <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                                <span className='font-semibold text-xl'>$1099</span>
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

                }
                
            {
                    tabselect === 'tab3' && 
                    <div className="container mx-auto grid grid-cols-4 gap-5"> 
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><LazyLoadImage className='object-cover w-60 group-hover:scale-110 transition-all duration-300 p-2 h-60'  src="https://i.ibb.co/LS8Vy9s/Google-Pixel-Buds-2-True-Wireless-Bluetooth-Earbuds-3-1-e1635330490469.jpg" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title flex justify-between">
                                <p>Pixel Buds</p>
                                <div className="badge bg-green-600 border-0 text-white">999+</div>
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
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><img  src="https://i.ibb.co/xLZQ7Q3/iphn13pm.webp" alt="Shoes" className='object-cover h-60 group-hover:scale-110 transition-all duration-300' /></figure>
                            <div className="card-body">
                                <h2 className="card-title flex justify-between">
                                    <p>iPhone 14 Pro Max</p>
                                    <div className="badge bg-green-500 border-0 text-white">756+</div>                                    
                                </h2>
                                <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                                <span className='font-semibold text-xl'>$1099</span>
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
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><img  src="https://i.ibb.co/qkbxKxR/asus.webp" alt="Shoes" className='object-cover h-60 group-hover:scale-110 transition-all duration-300' /></figure>
                            <div className="card-body">
                                <h2 className="card-title flex justify-between">
                                <p>Asus 34 inch QHD </p>
                                <div className="badge bg-green-400 border-0 text-white">459+</div>
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
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><img  src="https://i.ibb.co/yhMqfqD/krakenx.jpg" alt="Razer" className='object-cover h-60 group-hover:scale-110 transition-all duration-300' /></figure>
                            <div className="card-body">
                                <h2 className="card-title flex justify-between">
                                <p>Razer Kraken X</p>
                                <div className="badge bg-green-400 border-0 text-white">345+</div>
                                </h2>
                                <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                                <span className='font-semibold text-xl'>$65</span>
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

            }
            {
                    tabselect === 'tab4' && 
                    <div className="container mx-auto grid grid-cols-4 gap-5"> 
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><LazyLoadImage className='object-cover   group-hover:scale-110 transition-all duration-300 p-2'  src="https://i.ibb.co/J5MLWhJ/s22u.jpg" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title justify-between">
                                Samsung S22 Ultra
                                <div className="text-sm bg-error px-3 py-1 rounded-lg text-white text-thin">-40%</div>
                                </h2>
                                
                                <div className="flex gap-3">
                                    <span className='font-semibold text-xl '>$799</span>
                                    <span className='text-xl line-through'>$1149</span>
                                </div>
                                <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                                        <FiHeart className='p-2 bg-white hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                                        <MdOutlineCompareArrows className='p-2 bg-white hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                                </div>
                                <div className="absolute bottom-4">
                                    <div className="card-actions flex-col gap-3">
                                        <div className='w-full flex flex-col gap-3 justify-center items-center'>
                                            <div className="form-control rounded-lg">
                                              <label className="">
                                                    <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                                        <input type="number" className='w-60 text-center border-none'  value={count}/>
                                                    <button className={count === 10 ? 'btn hover:bg-[#e5e7eb] bg-[#e5e7eb] border-none text-neutral rounded-full h-8 w-12 text-xl' : 'btn btn-primary rounded-full'}
                                                        onClick={() => {
                                                            if (count < 10) { setCount(count + 1) }
                                                            else {
                                                                setCount(10)
                                                            }
                                                        }}  
                                                     ><FaPlus className="text-white"/></button>
                                                </label>
                                            </div>
                                        <button className="btn rounded-full btn-primary text-white w-full">Add to cart</button>                                    
                                        </div>                               
                                    </div>
                                    
                                </div>
                            </div>
                        </div> 
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><img   className='object-cover h-60 group-hover:scale-110 transition-all duration-300' src="https://i.ibb.co/K6N7gNy/nothing.webp" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title justify-between">
                                Nothing Phone
                                <div className="text-sm bg-error px-3 py-1 rounded-lg text-white text-thin">-46%</div>
                                </h2>
                                
                                <div className="flex gap-3">
                                    <span className='font-semibold text-xl '>$250</span>
                                    <span className='text-xl line-through'>$450</span>
                                </div>
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
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><img  className='object-cover h-60 group-hover:scale-110 transition-all duration-300' src="https://i.ibb.co/Fx737Ld/Apple-Mac-Book-Pro-2021-M1-14-and-16-inch-Colors.webp" alt="Macbook" /></figure>
                            <div className="card-body">
                                <h2 className="card-title justify-between">
                                Macbook Pro 2021
                                <div className="text-sm bg-error px-3 py-1 rounded-lg text-white text-thin">-40%</div>
                                </h2>
                                
                                <div className="flex gap-3">
                                    <span className='font-semibold text-xl '>$999</span>
                                    <span className='text-xl line-through'>$1599</span>
                                </div>
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
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><img  className='object-cover h-60 group-hover:scale-110 transition-all duration-300' src="https://i.ibb.co/0Y876QK/ducky-one-3.webp" alt="ducky"  /></figure>
                            <div className="card-body ">
                                <h2 className="card-title justify-between">
                                    Razer Kraken X
                                    <div className="text-sm bg-error px-3 py-1 rounded-full text-white text-thin">-33%</div>
                                </h2>                                
                                <div className="flex gap-3">
                                    <span className='font-semibold text-xl '>$46</span>
                                    <span className='text-xl line-through'>$65</span>
                                </div>
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
                                        <button className="btn rounded-full btn-primary text-white w-full ">Add to cart</button>                                    
                                        </div>                               
                                    </div>
                                    
                                </div>
                            </div>
                        </div> 
                    </div>
            }

            
            <div className="flex justify-center mt-10"><div className="btn btn-primary rounded-full text-accent transition-all duration-300 ease-in-out w-52  hover:w-56  ">SEE ALL PRODUCTS &nbsp; <FaArrowRight className='text-xl'/></div></div>


                
            </div>
    );
};

export default Featured;