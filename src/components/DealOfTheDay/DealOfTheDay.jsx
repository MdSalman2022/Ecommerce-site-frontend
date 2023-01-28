import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const DealOfTheDay = () => {
    return (
        <div className='pb-20'>
            <div className='container mx-auto border rounded-2xl '>
                <div className="card lg:card-side bg-base-100 ">
                    <div className="card-body flex-col justify-center items-center gap-10 border-r">
                        <div className="text-4xl text-center flex flex-col">Get 30% Off on<span className='text-primary font-bold'>PlayStation 5</span></div>
                        
                        <div className="flex justify-center"><div className="btn btn-primary rounded-full text-accent transition-all duration-300 ease-in-out w-36  hover:w-44  ">Shop Now &nbsp; <FaArrowRight className='text-xl' /></div></div>

                    </div>
                    <figure><img src="https://i.ibb.co/K0QmRyb/ps5.webp" alt="Album" className='h-96 object-cover' /></figure>
                </div>
            </div>
           
        </div>
    );
};

export default DealOfTheDay;