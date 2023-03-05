import React, { useContext } from 'react'
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom'; 
import { FaStar,FaPlus,FaMinus } from 'react-icons/fa';
import {FiHeart} from 'react-icons/fi';
import { MdOutlineCompareArrows } from 'react-icons/md';
import { FaRegHandPointRight } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';


function SmallCard({products, len}) {

 
    let {cart, setCart, scrolltop} = useContext(AuthContext)

    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const [count, setCount] = useState(0)

    const handleChange = (e) => {
        const newCount = Number(e.target.value);
        if (newCount <= 10) {
          setCount(newCount);
        }
    }
 

    const handleCart = (data, count) => {
        const cartItem = cart.find((item) => item._id === data._id);
      
        if (cartItem) {
          const updatedCart = cart.map((item) => {
            if (item._id === data._id) {
              return {
                ...item,
                quantity: count ? count : item.quantity + 1,
                totalPrice: item.price * (count ? count : item.quantity + 1)
              }
            } else {
              return item;
            }
          });
          setCart(updatedCart);
          localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
          const newCartItem = {
            ...data,
            quantity: count ? count : 1,
            totalPrice: data.price * (count ? count : 1)
          };
          setCart([...cart, newCartItem]);
          localStorage.setItem('cart', JSON.stringify([...cart, newCartItem]));
        }
      }
      
 

    return (
        <div className="card items-center card-compact lg:card-side bg-base-100 relative drop-shadow-md h-full w-full">
            <figure className='w-80 object-cover'><LazyLoadImage src={products[products.length-len]?.image} alt="Album" className='w-60 object-cover'/></figure>
            <div className="card-body flex flex-col w-full dark:bg-neutral dark:text-accent dark:border dark:rounded-r-2xl">
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
                        <button className='btn btn-secondary rounded-full ' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-base-100"/></button>
                        <input type="number" className=' w-full text-center border-none dark:bg-transparent'  value={count} onChange={handleChange} />
                        <button className={`btn btn-secondary rounded-full border-none text-neutral ${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                        onClick={() => setCount(count + 1)}  disabled={count === 10}><FaPlus className="text-base-100"/></button>
                        </div>
                    <button  onClick={()=>handleCart(products[products.length-len], count)}  className="btn rounded-full btn-secondary text-base-100 w-full">Add to cart</button>                                    
                </div>        
            </div>                        
        </div>
    )
}

export default SmallCard
