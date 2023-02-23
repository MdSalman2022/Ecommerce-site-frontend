import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa'
import {FiHeart} from 'react-icons/fi'
import { MdOutlineCompareArrows } from 'react-icons/md'
import {FaPlus, FaMinus,FaArrowRight} from 'react-icons/fa'
import { MdStars } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
 
import FeaturedCard from './FeaturedCard';

const FeaturedCategory = () => {
 
    const { products } = useContext(AuthContext)
    
    let featured = products.filter(item => item.featured === true)

    // console.log(featured)
    featured = featured.slice(0,4)

    // console.log(name)
    // const stars = [];
    // for (let i = 1; i <= 5; i++) {
    //   if (i <= item?.rating) {
    //     stars.push(<FaStar key={i} className="text-xl" />);
    //   } else {
    //     stars.push(<FaStar key={i} className="text-xl text-gray-300" />);
    //   }
    // }



    return (
        <div className='py-5 lg:py-20'>
            <div className="text-center my-5 flex flex-col items-center gap-5 lg:pb-10">
                <h1 className="lg:text-4xl font-bold text-secondary">Featured Category</h1>
                <span className="h-1 w-20 bg-secondary rounded-full"></span>
            </div>

            <div className="container mx-auto flex flex-col items-center justify-center lg:grid lg:grid-cols-4 gap-3 lg:gap-14 bg-accent rounded-3xl md:pr-3">
                <div className="lg:col-span-1 w-80 lg:w-96 image-full md:h-96 lg:h-[600px] rounded-l-3xl flex justify-center items-center overflow-hidden relative border-b-2 md:border-b-0 lg:border-r-2">
                    <h1 className="text-4xl text-secondary font-bold absolute top-5 lg:top-24 text-center z-50">Smartphones</h1>                    
                    <LazyLoadImage height="300px" width="500px" src="https://i.ibb.co/9Zxt731/s22ultra.webp" alt="s22u" className='w-full absolute -bottom-20 lg:-bottom-10'/>
                </div>
                <div className="lg:col-span-3 p-0 md:p-5 lg:p-0 col-span-3 grid gap-5 lg:gap-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center place-content-center ">
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