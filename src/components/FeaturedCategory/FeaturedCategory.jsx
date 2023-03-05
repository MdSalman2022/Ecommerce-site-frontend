import React, { useContext, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa'
import {FiHeart} from 'react-icons/fi'
import { MdOutlineCompareArrows } from 'react-icons/md'
import {FaPlus, FaMinus,FaArrowRight} from 'react-icons/fa'
import { MdStars } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
 
import FeaturedCard from './FeaturedCard';
import useShowAtThreshold from '../../../hooks/useShowAtThreshold/useShowAtThreshold';

const FeaturedCategory = () => {
 
    const { products } = useContext(AuthContext)
    
    let featured = products.filter(item => item.featured === true)

    featured = featured.slice(0,4)

    const showBorder = useShowAtThreshold(2300);


    return (
        <div className='py-5 lg:py-20 px-2 mx-2 md:mx-0'>
            <div className="text-center my-5 flex flex-col items-center gap-5 lg:pb-10">
                <h1 className="text-3xl lg:text-5xl font-bold text-secondary">Featured Category</h1>
                <span className={`h-1 w-20 bg-primary rounded-full transition-width duration-500 ${showBorder ? "lg:w-20" : "lg:w-0"}`}></span>
            </div>

            <div className="md:drop-shadow-xl container mx-auto flex flex-col items-center justify-center lg:grid lg:grid-cols-4 gap-3 lg:gap-14 bg-accent dark:bg-gray-300 rounded-3xl md:pr-3 py-5 md:py-0">
                <div className="bg-white dark:bg-gray-300 shadow lg:col-span-1 w-72 md:w-80 lg:w-96 image-full  h-96 lg:h-[600px] rounded-3xl md:rounded-l-3xl flex justify-center items-center overflow-hidden relative border-b-2 md:border-b-0 lg:border-r-2">
                    <h1 className="text-3xl md:text-4xl text-primary font-bold absolute top-5 lg:top-24 text-center z-50">Smartphones</h1>                    
                    <LazyLoadImage height="300px" width="500px" src="https://i.ibb.co/9Zxt731/s22ultra.webp" alt="s22u" className='w-full absolute -bottom-20 lg:-bottom-10'/>
                </div>
                <div className="lg:col-span-3 dark:bg-gray-300 px-5 md:p-5 lg:p-0 col-span-3 grid gap-5 lg:gap-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center place-content-center">
                    {
                        featured && featured.map((item,index) => (
                            <FeaturedCard key={index} item={item} />
                       ))
                         }
                     
                </div>
            </div>
            
        </div>
    );
};

export default FeaturedCategory;