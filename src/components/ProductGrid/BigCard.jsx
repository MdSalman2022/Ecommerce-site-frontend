import React, { useContext } from 'react'
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom'; 
import { FaStar,FaPlus,FaMinus } from 'react-icons/fa';
import {FiHeart} from 'react-icons/fi';
import { MdOutlineCompareArrows } from 'react-icons/md';
import {FaRegHandPointRight} from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';


function BigCard({ products }) {
     

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
            <div className="card card-compact lg:card-side bg-base-100 relative border">
                        <figure className='w-full object-cover p-5'><LazyLoadImage src={products[products.length-1]?.image} alt="Album"/></figure>
                        <div className="card-body flex flex-col justify-between w-full">
                            <div className='card-title flex-col justify-start items-start'>
                                <Link  onClick={scrolltop} className='hover:text-primary transition-all' to={`/productDetails/${products[products.length-1]?._id}/${encodeURIComponent(products[products.length-1]?.name).replace(/%20/g, "-")}`}>{products[products.length-1]?.name}</Link>
                                <p className="text-xl font-semibold">${products[products.length-1]?.price}</p>
                                <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                            </div>
                            <div className='space-y-5'>
                            {
                                products[products.length-1]?.spec.map((item,index) => {
                                    return (
                                        <p key={index} className='flex items-center gap-5'><FaRegHandPointRight/> {item}</p>
                                    )
                                })
                            }
                            </div>
                            <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                                <FiHeart className='p-2 bg-base-100 hover:scale-110 hover:border-error transition-all duration-300 text-5xl border rounded-full text-error'/>
                                <MdOutlineCompareArrows className='p-2 bg-base-100 hover:scale-110 hover:border-success transition-all duration-300 text-5xl border rounded-full text-success'/>
                            </div>

                            <div className="">
                                <div className="">
                                    <div className=' flex flex-col gap-3 items-center'>
                                        <div className="flex w-full justify-center items-center">
                                            <button className='btn btn-secondary rounded-full ' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-base-100"/></button>
                                            <input type="number" className='w-full text-center border-none' value={count} onChange={handleChange} />
                                            <button className={`btn btn-secondary rounded-full border-none text-neutral ${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                            onClick={() => setCount(count + 1)}  disabled={count === 10}><FaPlus className="text-base-100"/></button>
                                        </div>
                                    <button onClick={()=>handleCart(products[products.length-1], count)} className="btn rounded-full btn-secondary text-base-100 w-full">Add to cart</button>                                    
                                    </div>                               
                                </div>                                    
                            </div>
                        </div>
            </div>
    )
}

export default BigCard;
