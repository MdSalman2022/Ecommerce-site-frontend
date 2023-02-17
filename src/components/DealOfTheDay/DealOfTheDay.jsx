import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll'

const DealOfTheDay = () => {

        
    const [imageSrc, setImageSrc] = useState('https://i.ibb.co/K0QmRyb/ps5.webp');

    const handleError = () => {
      setImageSrc(image);
    };

    const scrolltop = () => {
        scroll.scrollToTop();
    }
    return (
        <div className='pb-20'>
            <div className='container mx-auto border rounded-2xl '>
                <div className="card flex-col-reverse md:flex-col lg:card-side bg-base-100 ">
                    <div className="card-body flex-col justify-center items-center gap-10 border-r">
                        <div className="text-4xl text-center flex flex-col">Get 30% Off on<span className='text-primary font-bold'>PlayStation 5</span></div>
                        
                        <div className="flex justify-center">
                            <Link  onClick={scrolltop}  to='/console'><div className="btn btn-primary rounded-full text-accent transition-all duration-300 ease-in-out w-36  hover:w-44  ">Shop Now &nbsp; <FaArrowRight className='text-xl' /></div></Link>
                        </div>

                    </div>
                    <figure><LazyLoadImage src={imageSrc} alt="Album" onError={handleError} className='h-96 object-cover' /></figure>
                </div>
            </div>
           
        </div>
    );
};

export default DealOfTheDay;