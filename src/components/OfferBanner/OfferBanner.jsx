import React from 'react';
import {FaArrowRight} from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const OfferBanner = () => {
    return (
        <div className='md:pt-10 px-2'>
            <div className='container mx-auto md:border rounded-none md:rounded-2xl '>
                
                <div className="card  bg-base-100 image-full md:h-[500px]">
                    <figure><LazyLoadImage src="https://i.ibb.co/5cN06jn/promotional-gadgets-blog-banner-1.webp" alt="Album" className=' object-cover w-full ' /></figure>
                    <div className="card-body flex-col justify-center items-center ">
                        <div className="text-xl md:text-4xl text-center flex  text-accent gap-2">Get upto <span className='font-bold box-decoration-slice bg-gradient-to-r from-primary to-secondary text-white  '>50%</span> Off On All </div>
                        <span className='text-xl md:text-4xl box-decoration-slice bg-gradient-to-r from-primary to-secondary text-white '>Accessories</span>
                        
                        <div className="flex justify-center"><div className="btn btn-primary rounded-full text-accent transition-all duration-300 ease-in-out w-36  hover:w-44  ">Shop Now &nbsp; <FaArrowRight className='text-xl' /></div></div>

                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default OfferBanner;