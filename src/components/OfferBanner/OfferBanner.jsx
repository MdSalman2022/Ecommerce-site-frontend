import React from 'react';
import {FaArrowRight} from 'react-icons/fa';

const OfferBanner = () => {
    return (
        <div className='pt-10'>
            <div className='container mx-auto border rounded-2xl '>
                
                <div className="card bg-base-100 image-full h-[500px]">
                    <figure><img src="https://i.ibb.co/5cN06jn/promotional-gadgets-blog-banner-1.webp" alt="Album" className=' object-cover w-full ' /></figure>
                    <div className="card-body flex-col justify-center items-center ">
                        <div className="text-4xl text-center flex  text-white gap-2">Get upto <span className='font-bold text-primary '>50%</span> Off On All</div>
                        <span className='text-4xl text-primary font-bold'>Accessories</span>
                        
                        <div className="flex justify-center"><div className="btn btn-primary rounded-full text-accent transition-all duration-300 ease-in-out w-36  hover:w-44  ">Shop Now &nbsp; <FaArrowRight className='text-xl' /></div></div>

                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default OfferBanner;