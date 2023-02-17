import React, { useContext, useEffect, useState } from 'react'; 
import { FaStar } from 'react-icons/fa'
import {FiHeart} from 'react-icons/fi'
import { MdOutlineCompareArrows } from 'react-icons/md'
import {FaPlus, FaMinus,FaArrowRight} from 'react-icons/fa'
import { MdStars } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';  
import { animateScroll as scroll } from 'react-scroll'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
 

const ProductCard = ({ item }) => {

    let { cart, setCart } = useContext(AuthContext)

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
     


    const scrolltop = () => {
        scroll.scrollToTop();
    }

    const handleCart = (data, count) => {
        console.log(data,count)
        let cartItem = cart.find((cartItem) => cartItem._id === data._id);
        if (cartItem) {
            cartItem.quantity += count ? count : 1;
            cartItem.totalPrice = cartItem.quantity * cartItem.price;
            setCart([...cart, cartItem]);
        } else {
            cartItem = { ...data, quantity: count ? count : 1 };
            cartItem.totalPrice = cartItem.quantity * cartItem.price;
            setCart([...cart, cartItem]); 
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }


    return (
        <div className="transition-all duration-300 card card-compact bg-base-100 shadow-md  h-full group">
            <figure className='relative'>
                <LazyLoadImage className='object-contain group-hover:scale-110 transition-all duration-300 p-2  h-64' src={item.image} alt={item?.cat}/>
                
                    <div className='absolute top-5 right-0 w-14 flex flex-col items-center gap-3'>
                        <FiHeart className='p-2 bg-white hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                        <MdOutlineCompareArrows className='p-2 bg-white hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full'/>
                        {item?.featured && <div className="badge bg-white border-none text-4xl text-yellow-400"><MdStars className=''/></div>}
                    </div>

               
            </figure>
               
            <div className="card-body items-center md:items-start h-80">
                    <h2 className={`card-title text-center md:text-left ${item?.featured && 'justify-between'}`}> 
                        <span className='card-title text-lg'>
                            <Link preventScrollReset={false}  onClick={scrolltop} className='hover:text-primary transition-all' to={`/productDetails/${item._id}/${encodedProductName}`}>{item?.name}  {item?.bestseller ? <div className="badge bg-green-600 border-0 text-white top-40 right-3">{item?.sells}+</div> : ''}</Link>
                            {item?.latest && <div className="badge-md border rounded-lg">NEW</div>}
                       </span>
                       
                    </h2>
                    {item?.rating && <span className='font-semibold flex gap-2 text-yellow-300'>{stars}</span>}      
                    <div className="flex items-center gap-3">
                       {item?.special ? <span className='font-semibold text-2xl '>${specialprice}</span> : ''}
                        <span className={`text-2xl ${item?.special ? 'line-through' : ''}`}>${item?.price}</span>
                        {item?.special && <span className={`text-lg text-error`}>-{item?.discount}%</span>}
                    </div>
              
                <div className="absolute bottom-4">
                    <div className="card-actions flex-col items-center justify-center gap-3">
                        <div className='w-full flex flex-col gap-3 justify-center items-center'>
                            <div className="flex items-center">
                                <button className='btn btn-primary rounded-full h-5 w-12 text-xl' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-white"/></button>
                                <input type="number" className='w-full md:w-60 text-center border-none'  value={count} onChange={handleChange}/>
                                <button className={`btn btn-primary rounded-full h-8 w-12 text-xl border-none text-neutral${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                    onClick={() => setCount(count + 1)}  disabled={count > 9}
                                ><FaPlus className="text-white"/></button>
                            </div>
                        <button onClick={()=>handleCart(item, count)} className="btn rounded-full btn-primary text-white w-full">Add to cart</button>                                    
                        </div>                               
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ProductCard;