import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; 
import { Pagination,Autoplay } from "swiper";
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MdStars } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { MdOutlineCompareArrows } from 'react-icons/md';
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';


const BackInStore = () => {


    
    const [count, setCount] = useState(0)

    return (
        <div className='py-20'>
            <div className="container mx-auto grid grid-cols-3">
                <div className='flex flex-col justify-center gap-3'>
                    <h3 className="text-3xl">Back In Store this week</h3>
                    <p className='w-96'>Finally these fast selling products are back in stock.
                        What's in it for you? Be quick or be...</p>
                    <Link className='flex items-center gap-3 text-primary font-semibold'>View all products <FaAngleRight/></Link>

                </div>
                <div className='col-span-2'>
                    <Swiper
                slidesPerView={3}
                        spaceBetween={30} 
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                        }}
                pagination={{
                clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><LazyLoadImage className='object-cover group-hover:scale-110 transition-all duration-300 p-2 '  src="https://i.ibb.co/LS8Vy9s/Google-Pixel-Buds-2-True-Wireless-Bluetooth-Earbuds-3-1-e1635330490469.jpg" alt="Shoes" /></figure>
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
                                                <input type="number" className=' text-center border-none'  value={count}/>
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
                    </SwiperSlide> 
                    <SwiperSlide>
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><LazyLoadImage className='object-cover group-hover:scale-110 transition-all duration-300 p-2 '  src="https://i.ibb.co/LS8Vy9s/Google-Pixel-Buds-2-True-Wireless-Bluetooth-Earbuds-3-1-e1635330490469.jpg" alt="Shoes" /></figure>
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
                                                <input type="number" className=' text-center border-none'  value={count}/>
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
                    </SwiperSlide> 
                    <SwiperSlide>
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><LazyLoadImage className='object-cover group-hover:scale-110 transition-all duration-300 p-2 '  src="https://i.ibb.co/LS8Vy9s/Google-Pixel-Buds-2-True-Wireless-Bluetooth-Earbuds-3-1-e1635330490469.jpg" alt="Shoes" /></figure>
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
                                                <input type="number" className=' text-center border-none'  value={count}/>
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
                    </SwiperSlide> 
                    <SwiperSlide>
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><LazyLoadImage className='object-cover group-hover:scale-110 transition-all duration-300 p-2 '  src="https://i.ibb.co/LS8Vy9s/Google-Pixel-Buds-2-True-Wireless-Bluetooth-Earbuds-3-1-e1635330490469.jpg" alt="Shoes" /></figure>
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
                                                <input type="number" className=' text-center border-none'  value={count}/>
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
                    </SwiperSlide> 
                    <SwiperSlide>
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><LazyLoadImage className='object-cover group-hover:scale-110 transition-all duration-300 p-2 '  src="https://i.ibb.co/LS8Vy9s/Google-Pixel-Buds-2-True-Wireless-Bluetooth-Earbuds-3-1-e1635330490469.jpg" alt="Shoes" /></figure>
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
                                                <input type="number" className=' text-center border-none'  value={count}/>
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
                    </SwiperSlide> 
                    <SwiperSlide>
                        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
                            <figure><LazyLoadImage className='object-cover group-hover:scale-110 transition-all duration-300 p-2 '  src="https://i.ibb.co/LS8Vy9s/Google-Pixel-Buds-2-True-Wireless-Bluetooth-Earbuds-3-1-e1635330490469.jpg" alt="Shoes" /></figure>
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
                                                <input type="number" className=' text-center border-none'  value={count}/>
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
                    </SwiperSlide> 
                </Swiper>
                </div>
             </div>
        </div>
    );
};

export default BackInStore;