import React, { useRef, useContext, useEffect, useState } from 'react' 
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Marquee from 'react-fast-marquee';
import { FaApple } from 'react-icons/fa';
import { SiSamsung, SiAsus, SiRazer, SiIntel, SiAmd, SiNvidia, SiLogitech, SiDell, SiCorsair, SiMicrosoft, SiXiaomi } from 'react-icons/si';


import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper";


function Banner() {
 
    return (
        <div className="hero bg-transparent md:rounded-xl lg:mx-auto">
            <div className="container mx-auto flex flex-col flex-wrap overflow-hidden">
                <div className="flex justify-center "> 
                    <div className="flex flex-col md:flex-col lg:flex-row md:gap-12">
                        <div className="card w-full object-cover my-5 md:my-10 md:px-0">
                                <Swiper 
                                    modules={[Pagination,Autoplay]}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    
                                    pagination={{
                                    clickable: true,
                                    }} 
                                    className="mySwiper w-screen md:w-[750px] lg:w-[1200px] md:rounded-2xl border border-primary"
                                    >
                                    <SwiperSlide><Link to="/laptop"><img className='w-full h-full' src="https://i.ibb.co/6yk3vbS/Apple-Mac-Book-Pro-Late-2021-Banner2-1674277405.webp" alt="image" /></Link></SwiperSlide>
                                    <SwiperSlide><Link to="/components/motherboard"><LazyLoadImage className='w-full h-full' src="https://i.ibb.co/6FW5G2d/MSI-MPG-Z690-EDGE-Wi-Fi-6-Gaming-Motherboard-Slider-1675861274.webp" alt="image" /></Link></SwiperSlide>
                                    <SwiperSlide><Link to="/monitor"><LazyLoadImage className='w-full h-full' src="https://i.ibb.co/qF5Kd6H/Ben-Q-ZOWIE-XL2546-245-inch-Gaming-Monitor-Main-Slider-1675937487.webp" alt="image" /></Link></SwiperSlide>
                                    

                                </Swiper>
                            
                        </div> 
                        <div className="my-2 md:my-10 gap-3 px-2 md:gap-5 lg:gap-0 md:px-0 lg:space-y-12 h-full flex items-start lg:items-end md:items-center justify-around lg:justify-start lg:flex-col ">
                                <div className="card lg:card-side bg-white">
                                    <LazyLoadImage className='rounded-2xl  object-cover border-primary border w-full h-40 lg:w-96 md:h-72' src="https://i.ibb.co/Pc9jLbR/speaker.webp" alt="image" />
                                </div>                          
                            
                                <div className="card lg:card-side bg-white">
                                    <LazyLoadImage className='rounded-2xl object-cover border-primary border w-52 h-40 md:w-96 md:h-72' src="https://i.ibb.co/kXc9Xgt/headphone.webp" alt="image" />
                                </div>                           
                        </div>
                    </div>
                </div>    
                <Marquee className="w-screen h-20 md:h-40 overflow-hidden"  speed={150} pauseOnHover={true}>
                            <FaApple className='p-3 lg:p-5 text-6xl lg:text-9xl transition-all duration-300 text-black  '/>
                            
                            <SiSamsung className='p-0 text-5xl lg:text-9xl transition-all duration-300 text-blue-600  '/>
                            
                            <SiXiaomi className='p-3 lg:p-5 text-6xl lg:text-9xl transition-all duration-300 text-orange-500  '/>

                            <SiAsus className='p-1 text-5xl lg:text-9xl transition-all duration-300 text-blue-600  '/>                            
                            
                            <SiRazer className='p-3 lg:p-5 text-6xl lg:text-9xl transition-all duration-300 text-green-600  '/>
                            
                            <SiMicrosoft className='p-3 lg:p-5 text-6xl lg:text-9xl transition-all duration-300 text-primary  '/>

                            <SiIntel className='p-3 lg:p-5 text-6xl lg:text-9xl transition-all duration-300 text-primary  '/>
                            
                            <SiAmd className='p-1 text-5xl lg:text-9xl transition-all duration-300 text-black  '/>
                            
                            <SiNvidia className='p-3 lg:p-5 text-6xl lg:text-9xl transition-all duration-300 text-green-500  '/> 

                            <SiDell className='p-3 lg:p-5 text-6xl lg:text-9xl transition-all duration-300 text-black  '/>

                            <SiLogitech className='p-3 lg:p-5 text-6xl lg:text-9xl transition-all duration-300 text-sky-500  '/>

                            <SiCorsair className='p-3 lg:p-5 text-6xl lg:text-9xl transition-all duration-300 text-black '  />  
 
                           
                            <LazyLoadImage src="https://i.ibb.co/Jp47P3J/noctua-logo.webp" alt="noctua-logo" border="0" className='w-20 md:w-40 mr-5'/>
                            <LazyLoadImage src="https://i.ibb.co/H7vP3xf/sapphire-logo.png" alt="sapphire-logo" border="0" className='w-20 md:w-40 mr-5'/>
                            <LazyLoadImage src="https://i.ibb.co/9HB36Tg/tt.png" alt="tt" border="0" className='w-20 md:w-40 mr-5'/>
                            <LazyLoadImage src="https://i.ibb.co/xGkffpc/zotac.webp" alt="zotac-logo-big" border="0" className='w-20 md:w-40 mr-5'/>
                            <LazyLoadImage src="https://i.ibb.co/4Jd2GJ5/1611033291-nzxt-logo.webp" alt="1611033291-nzxt-logo" border="0" className='w-20 md:w-40 mr-5'/>
                            <LazyLoadImage src="https://i.ibb.co/1McwKJV/antec.webp" alt="antec" border="0" className='w-20 md:w-40 mr-5'/>
                            <LazyLoadImage src="https://i.ibb.co/fCZ1gbP/Cooler-Master-Logo.webp" alt="Cooler-Master-Logo" border="0" className='w-20 md:w-40 mr-5'/>
                            <LazyLoadImage src="https://i.ibb.co/HBwfqGs/Deepcool-logo-black.webp" alt="Deepcool-logo-black" border="0" className='w-20 md:w-40 mr-5'/>
                            <LazyLoadImage src="https://i.ibb.co/vY7TxTh/Gigabyte-Symbol.png" alt="Gigabyte-Symbol" border="0" className='w-20 md:w-40 mr-5'/>
                            <LazyLoadImage src="https://i.ibb.co/nczC9yv/gskill.webp" alt="gskill" border="0" className='w-20 md:w-40 mr-5'/>
                            <LazyLoadImage src="https://i.ibb.co/PNzDXWV/lianli-f.jpg" alt="lianli-f" border="0" className='w-20 md:w-40 mr-5'/>
                            <LazyLoadImage src="https://i.ibb.co/gV36YBn/montech.png" alt="montech" border="0" className='w-20 md:w-40 mr-5'/>
                            <LazyLoadImage src="https://i.ibb.co/TcBrDB1/msi.webp" alt="MSI-Logo" border="0" className='w-20 md:w-40 mr-5'/>
                </Marquee>
            </div>
           
        </div>
    )
}
export default Banner
