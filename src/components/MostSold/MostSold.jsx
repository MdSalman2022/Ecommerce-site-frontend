import React, { useContext, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component'; 
import { FaStar } from 'react-icons/fa'
import {FiHeart} from 'react-icons/fi'
import { MdOutlineCompareArrows } from 'react-icons/md'
import {FaPlus, FaMinus,FaArrowRight} from 'react-icons/fa'
import { MdStars } from 'react-icons/md'  
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom'; 
import ProductCard from '../ProductCard/ProductCard';



const MostSold = () => {

    const { products } = useContext(AuthContext)
    const mostsells = products.sort((a, b) => b.sells - a.sells).slice(0, 4);


    let bestseller = products.filter(product => product.bestseller === true)
    bestseller = bestseller.slice(0,4) 
    
    const [count, setCount] = useState(0)
 

    return (
        <div className='py-20 bg-accent dark:bg-opacity-10'>
            <div className="container mx-auto flex flex-col gap-2 justify-center items-center pb-14">
                 <h1 className="text-4xl font-bold text-secondary">Most Sold This Week</h1> 
                 <p className='text-neutral dark:text-accent'>Top 10 most sold this week, next day delivery.</p>
            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-5 p-5"> 
                {bestseller.map((item,index) => (
                    <ProductCard key={index} item={item} />
                ))
                     
                }
            </div>
        </div>
    );
};

export default MostSold;