import React from 'react'
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll'
import { FaStar,FaPlus,FaMinus } from 'react-icons/fa';
import {FiHeart} from 'react-icons/fi';
import { MdOutlineCompareArrows } from 'react-icons/md';
import { FaRegHandPointRight } from 'react-icons/fa';


function SmallCard({products, len}) {


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
        <div className="card items-center card-compact lg:card-side bg-base-100 relative border h-full w-full">
            <figure className='w-80 object-cover'><LazyLoadImage src={products[products.length-len]?.image} alt="Album" className='w-60 object-cover'/></figure>
            <div className="card-body flex flex-col w-full">
                <div className='card-title flex-col justify-start items-start w-[90%]'>
                    <Link  onClick={scrolltop} className='hover:text-primary transition-all' to={`/productDetails/${products[products.length-len]?._id}/${encodeURIComponent(products[products.length-len]?.name).replace(/%20/g, "-")}`}>{products[products.length-len]?.name}</Link>
                    <p className="text-xl font-semibold">${products[products.length-len]?.price}</p>
                    <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                </div>
                <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                    <FiHeart className='p-2 bg-base-100 hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                    <MdOutlineCompareArrows className='p-2 bg-base-100 hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                </div>  
                    <div className=' flex flex-col gap-3 items-center'>
                    <div className="flex w-full justify-center items-center">
                        <button className='btn btn-primary rounded-full ' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-base-100"/></button>
                        <input type="number" className=' w-full text-center border-none'  value={count} onChange={handleChange} />
                        <button className={`btn btn-primary rounded-full border-none text-neutral ${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                        onClick={() => setCount(count + 1)}  disabled={count === 10}><FaPlus className="text-base-100"/></button>
                        </div>
                    <button className="btn rounded-full btn-primary text-base-100 w-full">Add to cart</button>                                    
                </div>        
            </div>                        
        </div>
    )
}

export default SmallCard
