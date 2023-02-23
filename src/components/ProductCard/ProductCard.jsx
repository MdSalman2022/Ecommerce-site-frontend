import React, { useContext, useEffect, useState } from 'react'; 
import { FaStar } from 'react-icons/fa'
import {FiHeart} from 'react-icons/fi'
import { MdOutlineCompareArrows } from 'react-icons/md'
import {FaPlus, FaMinus,FaArrowRight} from 'react-icons/fa'
import { MdStars } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';   
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
 

const ProductCard = ({ item }) => {

    let { cart, setCart,scrolltop } = useContext(AuthContext)

    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let specialprice;
    if (item.special) {
        specialprice = (item.price - (item.price * item.discount / 100).toFixed(1)); 
    }

    const [count, setCount] = useState(0)

    const handleChange = (e) => {
        const newCount = Number(e.target.value);
        if (newCount <= 10) {
          setCount(newCount);
        }
    }

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= item?.rating) {
        stars.push(<FaStar key={i} className="text-xl" />);
      } else {
        stars.push(<FaStar key={i} className="text-xl text-gray-300" />);
      }
    }

    const encodedProductName = encodeURIComponent(item.name).replace(/%20/g, "-");
     


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
        <div className="transition-all duration-300 card card-compact w-11/12 bg-base-100 shadow-md  h-full group">
        <Link onClick={scrolltop} to={`/productDetails/${item._id}/${encodedProductName}`}>
        <figure className='relative'>
                <LazyLoadImage className='object-contain group-hover:scale-110 transition-all duration-300 p-2  h-64' src={item.image} alt={item?.cat}/>
                
                    <div className='absolute top-5 right-0 w-14 flex flex-col items-center gap-3'>
                        <FiHeart className='p-2 bg-base-100 hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                        <MdOutlineCompareArrows className='p-2 bg-base-100 hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full'/>
                        {item?.featured && <div className="badge bg-base-100 border-none text-4xl text-yellow-400"><MdStars className=''/></div>}
                    </div>

               
            </figure>
        </Link>
               
            <div className="card-body items-center  lg:items-center h-80">
                    <h2 className={`card-title text-left md:text-left ${item?.featured && 'justify-between'}`}> 
                        <span className='card-title text-lg'>
                            <Link preventScrollReset={false}  onClick={scrolltop} className='hover:text-primary transition-all' to={`/productDetails/${item._id}/${encodedProductName}`}>{item?.name}  {item?.bestseller ? <div className="badge bg-green-600 border-0 text-base-100 top-40 right-3">{item?.sells}+</div> : ''}</Link>
                            {item?.latest && <div className="badge-md border rounded-lg">NEW</div>}
                       </span>
                       
                    </h2>
                    {item?.rating && <span className='font-semibold flex gap-2 text-yellow-300'>{stars}</span>}      
                    <div className="flex items-center gap-3">
                       {item?.special ? <span className='font-semibold text-2xl '>${specialprice}</span> : ''}
                        <span className={`text-2xl text-left ${item?.special ? 'line-through' : ''}`}>${item?.price}</span>
                        {item?.special && <span className={`text-lg text-error`}>-{item?.discount}%</span>}
                    </div>
              
                <div className="absolute bottom-4">
                    <div className="card-actions flex-col items-center justify-center gap-3">
                        <div className='w-full flex flex-col gap-3 justify-center items-center'>
                            <div className="flex items-center px-2">
                                <button className='btn btn-secondary rounded-full h-5 w-12 text-xl' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-base-100"/></button>
                                <input type="number" className='w-[70%] text-center border-none'  value={count} onChange={handleChange}/>
                                <button className={`btn btn-secondary rounded-full h-8 w-12 text-xl border-none text-neutral${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                    onClick={() => setCount(count + 1)}  disabled={count > 9}
                                ><FaPlus className="text-base-100"/></button>
                            </div>
                        <button onClick={()=>handleCart(item, count)} className="btn rounded-full btn-secondary text-base-100 w-[90%] lg:w-full">Add to cart</button>                                    
                        </div>                               
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ProductCard;