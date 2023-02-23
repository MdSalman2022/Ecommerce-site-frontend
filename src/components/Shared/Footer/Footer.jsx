import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Footer = () => {
    return (
        <footer className="px-4 py-10 bg-gray-800 text-gray-100 flex flex-wrap items-center justify-around"> 
            
                <div className="md:py-10 flex flex-col items-center md:items-start ">                      
                    <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 flex "> <LazyLoadImage width={300} height={300} className='w-10' src="https://i.ibb.co/gj9Bpvm/bestdeal.png" alt="" /> Best<span className='font-normal'>Deal</span></h1>
                    <span className="text-gray-400">© Copyright 1986. All Rights Reserved.</span>                     
                </div> 
                <div className=" p-6 bg-gray-800 text-gray-100 ">
                        <div className="container grid grid-cols-1 mx-auto gap-x-40 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
                            <div className="flex flex-col space-y-4 md:items-start md:justify-start items-center justify-center">
                                <h2 className="font-medium">About Us</h2>
                                <div className="flex flex-col space-y-2  md:items-start items-center justify-center text-sm text-gray-400">
                                    <a rel="noopener noreferrer" href="#">EMI Terms</a>
                                    <a rel="noopener noreferrer" href="#">Privacy Policy</a>
                                    <a rel="noopener noreferrer" href="#">Brands</a> 
                                </div>
                            </div>
                            <div className="flex flex-col space-y-4 md:items-start md:justify-start items-center justify-center">
                                <h2 className="font-medium">Contact Us</h2>
                                <div className="flex flex-col space-y-2  md:items-start items-center md:justify-start text-sm text-gray-400">
                                    <a rel="noopener noreferrer" href="#">+8801860222102</a>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-4 md:items-start  md:justify-start items-center justify-center">
                                <h2 className="font-medium">General</h2>
                                <div className="flex flex-col space-y-2  md:items-start items-center md:justify-center text-sm text-gray-400">
                                <a rel="noopener noreferrer" href="#">Terms and Conditions</a>
                                    <a rel="noopener noreferrer" href="#">Blogs</a>
                                    <a rel="noopener noreferrer" href="#">Online Service Support</a>
                                    <a rel="noopener noreferrer" href="#">Online Delivery</a>
                                    <a rel="noopener noreferrer" href="#">Refund and Return Policy</a>
                                    <a rel="noopener noreferrer" href="#">Contact Us</a>
                                    <a rel="noopener noreferrer" href="#">Complain / Advice</a>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-4 md:items-start md:justify-start items-center justify-center">
                                <h2 className="font-medium">Community</h2>
                                <div className="flex flex-col space-y-2  md:items-start items-center md:justify-center text-sm text-gray-400">
                                    <a rel="noopener noreferrer" href="#">GitHub</a>
                                    <a rel="noopener noreferrer" href="#">Discord</a>
                                    <a rel="noopener noreferrer" href="#">Twitter</a>
                                    <a rel="noopener noreferrer" href="#">YouTube</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
            </footer>
    );
};

export default Footer;