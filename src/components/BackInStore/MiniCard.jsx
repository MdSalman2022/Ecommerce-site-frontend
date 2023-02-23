import React, { useContext, useState } from 'react' 
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MdStars } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FiHeart, FiCloudLightning } from 'react-icons/fi';
import { MdOutlineCompareArrows } from 'react-icons/md';
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

function MiniCard({ item }) {
    

    const [count, setCount] = useState(0)
    const {scrolltop} = useContext(AuthContext)


    const handleChange = (e) => {
        const newCount = Number(e.target.value);
        if (newCount <= 10) {
          setCount(newCount);
        }
    }

    return (
        <div className="card card-compact bg-base-100 shadow-lg shadow-blue-50 h-[500px] group relative">
            <figure><LazyLoadImage className='object-cover group-hover:scale-110 transition-all duration-300 p-2 '  src={item?.image} alt={item?.cat} /></figure>
            <div className="card-body">
                <h2 className="card-title text-sm justify-between">
                <Link preventScrollReset={false}  onClick={scrolltop} className='hover:text-primary transition-all' to={`/productDetails/${item?._id}/${encodeURIComponent(item?.name).replace(/%20/g, "-")}`}>{item?.name}</Link>
                    {/* {item?.name} */}
                    <div className="badge bg-transparent border-none text-3xl text-yellow-400"><MdStars/></div>
                </h2>     
                <span className='font-semibold flex gap-2 text-yellow-300'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                <span className='font-semibold text-xl'>${item?.price}</span>
                <div className='absolute top-5 right-4 flex flex-col gap-3 w-10'>
                    <FiHeart className='p-2 bg-base-100 hover:scale-110 hover:border-error transition-all duration-300 text-4xl border rounded-full text-error'/>
                    <MdOutlineCompareArrows className='p-2 bg-base-100 hover:scale-110 hover:border-success transition-all duration-300 text-4xl border rounded-full text-success'/>
                </div>
                <div className="absolute bottom-4">
                    <div className="card-actions flex-col gap-3">
                        <div className='w-full flex flex-col gap-3 justify-center items-center'>
                            <div className="flex">
                                <button className='btn btn-secondary rounded-full h-5 w-12 text-xl' onClick={() => setCount(count - 1)} disabled={count === 0}><FaMinus className="text-base-100"/></button>
                                <input type="number" className=' text-center border-none'  value={count} onChange={handleChange}/>
                                <button className={`btn btn-secondary rounded-full h-8 w-12 text-xl border-none text-neutral${count === 10 ? ' hover:bg-[#e5e7eb] bg-[#e5e7eb] ' : ''}`}
                                    onClick={() => setCount(count + 1)}  disabled={count === 10}
                                ><FaPlus className="text-base-100"/></button>
                            </div>
                        <button className="btn rounded-full btn-secondary text-base-100 w-full md:w-48 lg:w-80">Add to cart</button>                                    
                        </div>                               
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiniCard
