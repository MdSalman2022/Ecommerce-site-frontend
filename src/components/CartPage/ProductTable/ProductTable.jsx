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
        localStorage.setItem('cart', JSON.stringify(cart)); 
        setCart([...cart])
        setActive(false)
    }
    useEffect(() => {
        if (cartItem?.quantity === count ) {            
            setActive(false)
        } else {
            setActive(true)
        }
    }, [count]) 

    const removeFromCart = data => {
        console.log(data)
        setCart(cart.filter(data => JSON.stringify(data._id) !== JSON.stringify(item._id)));
    }  


    return (
        <div className="col-span-5 grid grid-cols-5 gap-4 place-items-center  h-32 p-3" key={index}>
                <p className='font-semibold text-xs flex items-center gap-5'>
                    <img src={item.image} alt="" className='w-20'/>
                    {item.name}
                </p>
                <div className="flex items-start">
                <button className={`btn-xs h-6 w-6 flex items-center btn-primary rounded-full text-xs border-none text-neutral ${count === 1 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                    onClick={() => setCount(count - 1)} disabled={count === 1}><FaMinus className="text-white" /></button>
                        <input type="number" className='w-20 text-center border-none' value={count} onChange={handleChange}/>
                    <button className={`btn-xs h-6 w-6 flex items-center btn-primary rounded-full text-xs border-none text-neutral ${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                    onClick={() => setCount(count + 1)}  disabled={count > 9}><FaPlus className="text-white"/></button>
                </div>
                <p>
                    ${item.price}
                </p>
                <p>
                    ${item.price*count}
                </p>
            <div className='flex gap-5'>
                {active && <p onClick={()=>handleCart(count)}className='btn btn-primary  border-none text-white  flex items-center'>Confirm</p>}
                <p onClick={()=> removeFromCart(item)} className='btn btn-circle bg-red-500 border-none text-white text-2xl flex items-center'><AiOutlineDelete /></p>
            </div>
        </div>  
    )
}

export default ProductTable;