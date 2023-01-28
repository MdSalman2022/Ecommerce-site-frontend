import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; 

// import required modules
import { Pagination, Autoplay } from "swiper";
import {FaPlus, FaMinus} from 'react-icons/fa'
import { MdStars } from 'react-icons/md'
import { FaStar } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import {MdOutlineCompareArrows} from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component'; 

const PopulerProducts = () => {

    const [type, setType] = useState('')
    let projectType = ['', 'ecommerce', 'blog', 'portfolio', 'business', 'others']
    const [TypeCount, setTypeCount] = useState(0)

    const [count, setCount] = useState(0)

    
    if (TypeCount > 5) {
        setTypeCount(0)
    } else if (TypeCount < 0) {
        setTypeCount(5)
    }

    const handleType = async (n) => {
            await setTypeCount(count => {
                const newCount = count + n;
                setType(projectType[newCount]);
                return newCount;
            });
    }
    
    useEffect(() => {
        setType(projectType[TypeCount])
    }, [TypeCount])
 


    return (
        <div className='py-20 bg-accent'>
            <div className='container mx-auto'>
                
                <div className="flex justify-between gap-2 py-5">
                        <p className="text-2xl xl text-primary font-bold py-2">Populer Products</p>                     
                        <div className='flex justify-center items-center gap-5'>
                            <div className='flex flex-wrap gap-3'>
                                <button onClick={() => setType("")} className={`btn rounded-3xl btn-primary transition-all duration-300 border ${type !== '' ? 'btn-outline' : 'text-white'}`}>All</button>
                                <button onClick={() => setType("ecommerce")} className={`btn rounded-3xl transition-all duration-300 border btn-primary ${type !== 'ecommerce' ? 'btn-outline' : 'text-white'}`}>Smartphones</button>
                                <button onClick={() => setType("blog")} className={`btn rounded-3xl transition-all duration-300 border btn-primary ${type !== 'blog' ? 'btn-outline' : ''}`}>Laptops</button>
                                <button onClick={() => setType("portfolio")} className={`btn rounded-3xl transition-all duration-300 border btn-primary ${type !== 'portfolio' ? 'btn-outline' : 'text-white'}`}>Desktop components</button>
                                <button onClick={() => setType("business")} className={`btn rounded-3xl transition-all duration-300 border btn-primary ${type !== 'business' ? 'btn-outline' : 'text-white'}`}>Gadgets</button>
                                <button onClick={() => setType("others")} className={`btn rounded-3xl transition-all duration-300 border btn-primary ${type !== 'others' ? 'btn-outline' : 'text-white'}`}>Other's</button>
                            </div>
                            <div className='flex lg:justify-center justify-between gap-3 w-full md:w-32 text-white'>
                                <button onClick={() => handleType(-1)}><FaArrowLeft className='lg:p-5 p-2 text-4xl lg:text-6xl border-2  rounded-full cursor-pointer text-primary hover:border-primary transition-all duration-300' disabled /></button>
                                <button onClick={() => handleType(1)}><FaArrowRight className='lg:p-5 p-2 text-4xl lg:text-6xl border-2  rounded-full cursor-pointer text-primary hover:border-primary transition-all duration-300' /></button>
                            </div>
                    </div>
                    
                </div>
                <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        slidesPerGroup={1}
                         autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                        clickable: true,
                        }} 
                        modules={[Pagination,Autoplay]}
                        className="mySwiper p-5"
                    >
                        <SwiperSlide>
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
                                                    <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setTypeCount(TypeCount - 1)} disabled={TypeCount === 0}><FaMinus className="text-white"/></button>
                                                    <input type="number" className='w-60 text-center border-none'  value={TypeCount}/>
                                                    <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${TypeCount === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                                        onClick={() => setTypeCount(TypeCount + 1)}  disabled={TypeCount === 10}
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
                                                    <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setTypeCount(TypeCount - 1)} disabled={TypeCount === 0}><FaMinus className="text-white"/></button>
                                                    <input type="number" className='w-60 text-center border-none'  value={TypeCount}/>
                                                    <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${TypeCount === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                                        onClick={() => setTypeCount(TypeCount + 1)}  disabled={TypeCount === 10}
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
                                                    <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setTypeCount(TypeCount - 1)} disabled={TypeCount === 0}><FaMinus className="text-white"/></button>
                                                    <input type="number" className='w-60 text-center border-none'  value={TypeCount}/>
                                                    <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${TypeCount === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                                        onClick={() => setTypeCount(TypeCount + 1)}  disabled={TypeCount === 10}
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
                                                    <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setTypeCount(TypeCount - 1)} disabled={TypeCount === 0}><FaMinus className="text-white"/></button>
                                                    <input type="number" className='w-60 text-center border-none'  value={TypeCount}/>
                                                    <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${TypeCount === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                                        onClick={() => setTypeCount(TypeCount + 1)}  disabled={TypeCount === 10}
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
                                                    <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setTypeCount(TypeCount - 1)} disabled={TypeCount === 0}><FaMinus className="text-white"/></button>
                                                    <input type="number" className='w-60 text-center border-none'  value={TypeCount}/>
                                                    <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${TypeCount === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                                        onClick={() => setTypeCount(TypeCount + 1)}  disabled={TypeCount === 10}
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
                                                    <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setTypeCount(TypeCount - 1)} disabled={TypeCount === 0}><FaMinus className="text-white"/></button>
                                                    <input type="number" className='w-60 text-center border-none'  value={TypeCount}/>
                                                    <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${TypeCount === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                                        onClick={() => setTypeCount(TypeCount + 1)}  disabled={TypeCount === 10}
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
                                                    <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setTypeCount(TypeCount - 1)} disabled={TypeCount === 0}><FaMinus className="text-white"/></button>
                                                    <input type="number" className='w-60 text-center border-none'  value={TypeCount}/>
                                                    <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${TypeCount === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                                        onClick={() => setTypeCount(TypeCount + 1)}  disabled={TypeCount === 10}
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
                                                    <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setTypeCount(TypeCount - 1)} disabled={TypeCount === 0}><FaMinus className="text-white"/></button>
                                                    <input type="number" className='w-60 text-center border-none'  value={TypeCount}/>
                                                    <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${TypeCount === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                                        onClick={() => setTypeCount(TypeCount + 1)}  disabled={TypeCount === 10}
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
                                                    <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setTypeCount(TypeCount - 1)} disabled={TypeCount === 0}><FaMinus className="text-white"/></button>
                                                    <input type="number" className='w-60 text-center border-none'  value={TypeCount}/>
                                                    <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${TypeCount === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                                        onClick={() => setTypeCount(TypeCount + 1)}  disabled={TypeCount === 10}
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
    );
};

export default PopulerProducts;