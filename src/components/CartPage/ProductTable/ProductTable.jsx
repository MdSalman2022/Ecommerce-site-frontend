import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider'

function ProductTable({ item,index }) {
    
    const { cart,setCart} = useContext(AuthContext)
      


    const [count, setCount] = useState(item.quantity)
    const handleChange = (e) => {
        const newCount = Number(e.target.value);
        if (newCount <= 10) {
          setCount(newCount);
        }
    }

    const [active, setActive] = useState(false)


    let cartItem = cart.find((cartItem) => cartItem._id === item._id);
     
    const handleCart = (count) => { 
        cartItem.quantity = count;
        cartItem.totalPrice = cartItem.price * cartItem.quantity;
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex((item) => item._id === cartItem._id);
        if (itemIndex >= 0) {
            updatedCart[itemIndex] = cartItem;
        } else {
            updatedCart.push(cartItem);
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); 
        setActive(false)
    }
    
    useEffect(() => {
        if (cartItem?.quantity === count ) {            
            setActive(false)
        } else {
            setActive(true)
        }
    }, [count]) 

    // const removeFromCart = data => {
    //     console.log(data)
    //     setCart(cart.filter(data => JSON.stringify(data._id) !== JSON.stringify(item._id)));
    // }  
    const removeFromCart = (data) => {
        setCart(cart.filter((item) => item._id !== data._id));
      };
      

    return (
        <div className="col-span-5 grid grid-cols-5 gap-4 place-items-center  h-32 p-3" key={index}>
                <p className='font-semibold text-xs flex items-center gap-5'>
                    <img src={item.image} alt="" className='w-20 hidden md:flex'/>
                    {item.name}
                </p>
                <div className="flex items-start">
                <button className={`btn-xs h-6 w-6 flex items-center btn-primary rounded-full text-xs border-none text-neutral ${count === 1 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                    onClick={() => setCount(count - 1)} disabled={count === 1}><FaMinus className="text-base-100" /></button>
                        <input type="number" className='w-5 md:w-20 text-center border-none' value={count} onChange={handleChange}/>
                    <button className={`btn-xs h-6 w-6 flex items-center btn-primary rounded-full text-xs border-none text-neutral ${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                    onClick={() => setCount(count + 1)}  disabled={count > 9}><FaPlus className="text-base-100"/></button>
                </div>
                <p className=' '>
                    ${item.price}
                </p>
                <p>
                    ${item.price*count}
                </p>
            <div className='flex flex-col items-center md:flex-row  gap-5'>
                {active && <p onClick={()=>handleCart(count)}className='btn btn-primary btn-sm md:btn md:btn-primary  border-none text-base-100  flex items-center'>Confirm</p>}
                <p onClick={()=> removeFromCart(item)} className='btn btn-circle btn-sm md:btn-md bg-red-500 border-none text-base-100 md:text-2xl flex items-center justify-center'><AiOutlineDelete className='text-lg md:text-2xl'/></p>
            </div>
        </div>  
    )
}

export default ProductTable;