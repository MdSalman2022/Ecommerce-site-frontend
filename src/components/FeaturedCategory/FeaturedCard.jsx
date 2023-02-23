import React, { useContext, useState } from 'react' 

import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'
import {FiHeart} from 'react-icons/fi'
import { MdOutlineCompareArrows } from 'react-icons/md'
import {FaPlus, FaMinus,FaArrowRight} from 'react-icons/fa'
import { MdStars } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

function FeaturedCard({ item }) {
    
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
        <div className="card px-5 md:px-0 lg:w-64 card-compact bg-white shadow-lg md:h-[550px] group relative">
        <figure><LazyLoadImage className='object-cover md:w-52 h-60 group-hover:scale-110 transition-all duration-300 p-2'  src={item.image} alt="featured" /></figure>
        <div className="card-body h-72 md:h-52">
                <h2 className="card-title text-lg justify-between">
                <Link onClick={scrolltop} className='hover:text-secondary transition-all' to={`/productDetails/${item._id}/${encodeURIComponent(item.name).replace(/%20/g, "-")}`}>{item.name} {item?.bestseller ? <div className="badge bg-green-600 border-0 text-base-100 top-40 right-3">{item?.sells}+</div> : ''}</Link>
                     
            </h2>     
            {/* {item?.rating && <span className='font-semibold flex gap-2 text-yellow-300'>{stars}</span>}       */}
            <span className='font-semibold text-xl text-secondary'>${item.price}</span>
            <div className='absolute top-5 right-4 flex flex-col items-center gap-3 w-10'>
                    <FiHeart className='p-2 bg-base-100 hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                    <MdOutlineCompareArrows className='p-2 bg-base-100 hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                    <div className="bg-base-100 rounded-full  border-none text-3xl text-yellow-400 "><MdStars/></div>
            </div>
            <div className="absolute bottom-4 ">
                <div className=" ">
                    <div className=' flex flex-col gap-3 items-center'>
                        <div className="flex w-full justify-center items-center">
                            <button className='btn btn-secondary rounded-full ' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-base-100"/></button>
                            <input type="number" className='w-52 lg:w-32 text-center border-none'  value={count} onChange={handleChange}/>
                            <button className={`btn btn-secondary rounded-full border-none text-neutral ${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                            onClick={() => setCount(count + 1)}  disabled={count === 10}><FaPlus className="text-base-100"/></button>
                        </div>
                    <button onClick={()=>handleCart(item, count)}  className="btn rounded-full btn-secondary text-base-100 w-full md:w-56">Add to cart</button>                                    
                    </div>                               
                </div>
                
            </div>
        </div>
    </div>
    )
}

export default FeaturedCard
