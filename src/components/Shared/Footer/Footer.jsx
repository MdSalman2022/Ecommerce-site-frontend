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
                            <div className="flex flex-col space-y-4 md:items-start items-center justify-center">
                                <h2 className="font-medium">Getting started</h2>
                                <div className="flex flex-col space-y-2  md:items-start items-center justify-center text-sm text-gray-400">
                                    <a rel="noopener noreferrer" href="#">Installation</a>
                                    <a rel="noopener noreferrer" href="#">Release Notes</a>
                                    <a rel="noopener noreferrer" href="#">Upgrade Guide</a>
                                    <a rel="noopener noreferrer" href="#">Using with Preprocessors</a>
                                    <a rel="noopener noreferrer" href="#">Optimizing for Production</a>
                                    <a rel="noopener noreferrer" href="#">Browser Support</a>
                                    <a rel="noopener noreferrer" href="#">IntelliSense</a>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-4 md:items-start items-center justify-center">
                                <h2 className="font-medium">Core Concepts</h2>
                                <div className="flex flex-col space-y-2  md:items-start items-center md:justify-center text-sm text-gray-400">
                                    <a rel="noopener noreferrer" href="#">Utility-First</a>
                                    <a rel="noopener noreferrer" href="#">Responsive Design</a>
                                    <a rel="noopener noreferrer" href="#">Hover, Focus, &amp; Other States</a>
                                    <a rel="noopener noreferrer" href="#">Mode</a>
                                    <a rel="noopener noreferrer" href="#">Adding Base Styles</a>
                                    <a rel="noopener noreferrer" href="#">Extracting Components</a>
                                    <a rel="noopener noreferrer" href="#">Adding New Utilities</a>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-4 md:items-start items-center justify-center">
                                <h2 className="font-medium">Customization</h2>
                                <div className="flex flex-col space-y-2  md:items-start items-center md:justify-center text-sm text-gray-400">
                                    <a rel="noopener noreferrer" href="#">Configuration</a>
                                    <a rel="noopener noreferrer" href="#">Theme Configuration</a>
                                    <a rel="noopener noreferrer" href="#">Breakpoints</a>
                                    <a rel="noopener noreferrer" href="#">Customizing Colors</a>
                                    <a rel="noopener noreferrer" href="#">Customizing Spacing</a>
                                    <a rel="noopener noreferrer" href="#">Configuring Variants</a>
                                    <a rel="noopener noreferrer" href="#">Plugins</a>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-4 md:items-start items-center justify-center">
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