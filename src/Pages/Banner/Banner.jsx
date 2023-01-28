import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Marquee from 'react-fast-marquee';
import { FaApple } from 'react-icons/fa';
import { SiSamsung, SiAsus,SiRazer,SiIntel,SiAmd, SiNvidia, SiLogitech,SiDell,SiCorsair,SiMicrosoft,SiXiaomi } from 'react-icons/si';

function Banner() {
 
    return (
        <div className="hero bg-transparent rounded-xl lg:mx-auto ">
            <div className="container mx-auto">
                <div className="flex justify-center"> 
                    <div className="flex gap-12">
                        <div className="md:col-span-2 card w-full object-cover my-10">
                            <LazyLoadImage className='rounded-2xl object-cover border-primary border' width="1200px" height="700px" src="https://i.ibb.co/6yk3vbS/Apple-Mac-Book-Pro-Late-2021-Banner2-1674277405.webp" alt="image" />
                        </div> 
                        <div className="md:col-span-1 my-10 space-y-12 h-full">
                                <div className="card space-y-2 lg:card-side bg-base-100">
                                    <LazyLoadImage className='rounded-2xl  object-cover border-primary border   w-96 h-72' src="https://i.ibb.co/Pc9jLbR/speaker.webp" alt="image" />
                                </div>                          
                            
                                <div className="card space-y-2 lg:card-side bg-base-100">
                                    <LazyLoadImage className='rounded-2xl object-cover border-primary border   w-96 h-72' src="https://i.ibb.co/kXc9Xgt/headphone.webp" alt="image" />
                                </div>                           
                        </div>
                    </div>
                </div>    
                <Marquee speed={150} pauseOnHover={true}>
                            <FaApple className='p-5 text-9xl transition-all duration-300 text-black  '/>
                            
                            <SiSamsung className='p-0 text-9xl transition-all duration-300 text-blue-600  '/>
                            
                            <SiXiaomi className='p-5 text-9xl transition-all duration-300 text-orange-500  '/>

                            <SiAsus className='p-1 text-9xl transition-all duration-300 text-blue-600  '/>                            
                            
                            <SiRazer className='p-5 text-9xl transition-all duration-300 text-green-600  '/>
                            
                            <SiMicrosoft className='p-5 text-9xl transition-all duration-300 text-primary  '/>

                            <SiIntel className='p-5 text-9xl transition-all duration-300 text-primary  '/>
                            
                            <SiAmd className='p-1 text-9xl transition-all duration-300 text-black  '/>
                            
                            <SiNvidia className='p-5 text-9xl transition-all duration-300 text-green-500  '/> 

                            <SiDell className='p-5 text-9xl transition-all duration-300 text-black  '/>

                            <SiLogitech className='p-5 text-9xl transition-all duration-300 text-sky-500  '/>

                            <SiCorsair className='p-5 text-9xl transition-all duration-300 text-black '  />  
                    
                           
                            <img src="https://i.ibb.co/Jp47P3J/noctua-logo.webp" alt="noctua-logo" border="0" className='w-40 mr-5'/>
                            <img src="https://i.ibb.co/H7vP3xf/sapphire-logo.png" alt="sapphire-logo" border="0" className='w-40 mr-5'/>
                            <img src="https://i.ibb.co/9HB36Tg/tt.png" alt="tt" border="0" className='w-40 mr-5'/>
                            <img src="https://i.ibb.co/rpRyMXt/zotac-logo-big.png" alt="zotac-logo-big" border="0" className='w-40 mr-5'/>
                            <img src="https://i.ibb.co/4Jd2GJ5/1611033291-nzxt-logo.webp" alt="1611033291-nzxt-logo" border="0" className='w-40 mr-5'/>
                            <img src="https://i.ibb.co/1McwKJV/antec.webp" alt="antec" border="0" className='w-40 mr-5'/>
                            <img src="https://i.ibb.co/xzWvwRt/Cooler-Master-Logo.png" alt="Cooler-Master-Logo" border="0" className='w-40 mr-5'/>
                            <img src="https://i.ibb.co/gRRRxx2/Deepcool-logo-black.png" alt="Deepcool-logo-black" border="0" className='w-40 mr-5'/>
                            <img src="https://i.ibb.co/vY7TxTh/Gigabyte-Symbol.png" alt="Gigabyte-Symbol" border="0" className='w-40 mr-5'/>
                            <img src="https://i.ibb.co/nczC9yv/gskill.webp" alt="gskill" border="0" className='w-40 mr-5'/>
                            <img src="https://i.ibb.co/PNzDXWV/lianli-f.jpg" alt="lianli-f" border="0" className='w-40 mr-5'/>
                            <img src="https://i.ibb.co/gV36YBn/montech.png" alt="montech" border="0" className='w-40 mr-5'/>
                            <img src="https://i.ibb.co/DzgXwt5/MSI-Logo.png" alt="MSI-Logo" border="0" className='w-40 mr-5'/>
                </Marquee>
            </div>
           
        </div>
    )
}
export default Banner
