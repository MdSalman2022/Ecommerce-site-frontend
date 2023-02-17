import React, { useContext, useState } from 'react';
import { FaStar,FaPlus,FaMinus } from 'react-icons/fa';
import {FiHeart} from 'react-icons/fi';
import {MdOutlineCompareArrows} from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component'; 
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import {FaRegHandPointRight} from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll'
import { Link } from 'react-router-dom';
import BigCard from './BigCard';
import SmallCard from './SmallCard';


const ProductGrid = () => {

    let {products} = useContext(AuthContext)

    const [count, setCount] = useState(0)

    const handleChange = (e) => {
        const newCount = Number(e.target.value);
        if (newCount <= 10) {
          setCount(newCount);
        }
    }
    

    
    const scrolltop = () => {
        scroll.scrollToTop();
    }


    return (
        <div className='py-5 md:py-20'>
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center mb-14">
                     <h1 className="md:text-5xl font-bold">Recent Products</h1>
                    <span className="h-1 w-20 bg-primary rounded-full"></span> 
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 md:p-0">
                    <BigCard products={products}/>
                         
                    <div className="flex flex-col gap-5">
                        <SmallCard products={products} len={2} />
                        <SmallCard products={products} len={3} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;