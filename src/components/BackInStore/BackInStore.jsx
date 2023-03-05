import React, { useContext, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; 
import { Pagination,Autoplay } from "swiper";
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MdStars } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FiHeart, FiCloudLightning } from 'react-icons/fi';
import { MdOutlineCompareArrows } from 'react-icons/md';
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'; 
import MiniCard from './MiniCard';

const BackInStore = () => {

    let { products,scrolltop } = useContext(AuthContext)
      
    let backinstore = products.slice(products.length-20, products.length);

    const [count, setCount] = useState(0)



    function getDeviceWidth() {
        return window.innerWidth;
      }
    const deviceWidth = getDeviceWidth();
 
    return (
        <div className=' py-5 md:py-20'>
            <div className="container mx-auto  grid grid-cols-1 lg:grid-cols-3">
                <div className='flex flex-col justify-center gap-3'>
                    <h3 className="font-bold text-xl md:text-4xl text-secondary">Back In Store this week</h3>
                    <p className='w-96 text-neutral dark:text-accent'>Finally these fast selling products are back in stock.
                        What's in it for you? Be quick or be...</p>
                    <Link onClick={scrolltop} to="/products" className='flex items-center gap-3 text-primary font-semibold'>View all products <FaAngleRight/></Link>

                </div>
                <div className='col-span-2'>
                    <Swiper
                slidesPerView={deviceWidth > 1024 ? 3 : deviceWidth > 768 ? 2 : 1}
                        spaceBetween={30} 
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                pagination={{
                clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                    >
                        {
                            backinstore.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <MiniCard item={item} />
                                </SwiperSlide> 
                            ))
                        }
                    
                     
                </Swiper>
                </div>
             </div>
        </div>
    );
};

export default BackInStore;