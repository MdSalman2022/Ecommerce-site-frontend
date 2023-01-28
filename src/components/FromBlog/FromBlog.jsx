import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa'
import {FiHeart} from 'react-icons/fi'
import { MdOutlineCompareArrows } from 'react-icons/md'
import {FaPlus, FaMinus,FaArrowRight} from 'react-icons/fa'
import { MdStars } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';


const FromBlog = () => {

    const [tabselect, setTabSelect] = useState('tab1')

    const [count, setCount] = useState(0)
    
    return (
        <div className='py-20'>
             <div className="text-center my-5 flex flex-col items-center gap-5 pb-10">
                <h1 className="text-4xl font-bold">From our Blog</h1>
                <span className="h-1 w-20 bg-primary rounded-full"></span>
            </div>
            <div className="flex items-center justify-center my-5 bg-accent w-[350px] mx-auto rounded-full">
                <button onClick={()=> setTabSelect('tab1')} className={`flex items-center flex-shrink-0 px-5 py-2  text-neutral text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab1' && 'bg-opacity-100 text-white font-semibold'}`}>LATEST POSTS</button>
                <button onClick={()=> setTabSelect('tab2')} className={`flex items-center flex-shrink-0 px-5 py-2  text-neutral text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab2' && 'bg-opacity-100 text-white font-semibold'}`}>MOST READ</button>
            </div>

            {
                    tabselect === 'tab1' && 
                    <div className="container mx-auto grid grid-cols-4 gap-5"> 
                        <div className="card border card-compact p-5 w-full md:w-80 lg:w-full  my-10">
                            <LazyLoadImage className='rounded-2xl lg:h-60 object-cover ' src="https://i.ibb.co/xLZQ7Q3/iphn13pm.webp" alt="iphone" />
                            <div className="mt-10 lg:space-y-3 lg:h-64 flex flex-col justify-start items-start">
                                <p className="font-semibold text-primary">John Doe - 5 hours ago</p>
                                <h2 className="card-title duration-200 hover:text-primary">
                                <Link>10 Useful CSS Generator Tools That You Should Use in 2023</Link>
                                </h2>
                                <p className='lg:leading-7 lg:tracking-wide...'>When it comes to CSS, you always have to write many code lines to make your project look beautiful and presentable in terms of styling. Of course, it’s important to focus on writing good CSS for your ...<Link className='text-blue-700'> Read More</Link></p>
                            </div>
                        </div>  
                        <div className="card border card-compact p-5 w-full md:w-80 lg:w-full  my-10">
                            <LazyLoadImage className='rounded-2xl lg:h-60 object-cover ' src="https://i.ibb.co/xLZQ7Q3/iphn13pm.webp" alt="iphone" />
                            <div className="mt-10 lg:space-y-3 lg:h-64 flex flex-col justify-start items-start">
                                <p className="font-semibold text-primary">John Doe - 5 hours ago</p>
                                <h2 className="card-title duration-200 hover:text-primary">
                                <Link>10 Useful CSS Generator Tools That You Should Use in 2023</Link>
                                </h2>
                                <p className='lg:leading-7 lg:tracking-wide...'>When it comes to CSS, you always have to write many code lines to make your project look beautiful and presentable in terms of styling. Of course, it’s important to focus on writing good CSS for your ...<Link className='text-blue-700'> Read More</Link></p>
                            </div>
                        </div>  
                        <div className="card border card-compact p-5 w-full md:w-80 lg:w-full  my-10">
                            <LazyLoadImage className='rounded-2xl lg:h-60 object-cover ' src="https://i.ibb.co/xLZQ7Q3/iphn13pm.webp" alt="iphone" />
                            <div className="mt-10 lg:space-y-3 lg:h-64 flex flex-col justify-start items-start">
                                <p className="font-semibold text-primary">John Doe - 5 hours ago</p>
                                <h2 className="card-title duration-200 hover:text-primary">
                                <Link>10 Useful CSS Generator Tools That You Should Use in 2023</Link>
                                </h2>
                                <p className='lg:leading-7 lg:tracking-wide...'>When it comes to CSS, you always have to write many code lines to make your project look beautiful and presentable in terms of styling. Of course, it’s important to focus on writing good CSS for your ...<Link className='text-blue-700'> Read More</Link></p>
                            </div>
                        </div>  
                        <div className="card border card-compact p-5 w-full md:w-80 lg:w-full  my-10">
                            <LazyLoadImage className='rounded-2xl lg:h-60 object-cover ' src="https://i.ibb.co/xLZQ7Q3/iphn13pm.webp" alt="iphone" />
                            <div className="mt-10 lg:space-y-3 lg:h-64 flex flex-col justify-start items-start">
                                <p className="font-semibold text-primary">John Doe - 5 hours ago</p>
                                <h2 className="card-title duration-200 hover:text-primary">
                                <Link>10 Useful CSS Generator Tools That You Should Use in 2023</Link>
                                </h2>
                                <p className='lg:leading-7 lg:tracking-wide...'>When it comes to CSS, you always have to write many code lines to make your project look beautiful and presentable in terms of styling. Of course, it’s important to focus on writing good CSS for your ...<Link className='text-blue-700'> Read More</Link></p>
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

        </div>
    );
};

export default FromBlog;