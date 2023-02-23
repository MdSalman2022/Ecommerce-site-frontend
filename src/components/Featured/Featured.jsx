import React, { useContext, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Featured.css'
import { FaStar } from 'react-icons/fa'
import {FiCloudLightning, FiHeart} from 'react-icons/fi'
import { MdOutlineCompareArrows } from 'react-icons/md'
import {FaPlus, FaMinus,FaArrowRight} from 'react-icons/fa'
import { MdStars } from 'react-icons/md'
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'; 

const Featured = () => {


    const [tabselect, setTabSelect] = useState('tab1')

    const [count, setCount] = useState(0)

    const {products,scrolltop} = useContext(AuthContext)



    let featured = products.filter(product => product.featured === true) 

    featured = featured.slice(3,8)
    
    
    // console.log(featured)


    // const latest = products.filter(product => product.latest === true)
    let latest = products;
    latest = latest.slice(products.length-5,products.length-1)
    
    let bestseller = products.filter(product => product.bestseller === true)
    bestseller = bestseller.slice(0,4)
    // console.log(bestseller)
    
    let special = products.filter(product => product.special === true)
    special = special.slice(0,4)
 
    // console.log(special)
    
 
    
    return (
        <div className='bg-primary py-20'>
                <div className="container mx-auto flex flex-col items-center gap-5 text-center  ">
                    <h1 className="text-5xl font-bold text-base-100">Featured Products</h1>
                    <span className="h-1 w-20 bg-base-100 rounded-full"></span>
                    <p className='text-base-100'>These are the most highly rated product in our store <span className='underline text-secondary'>Learn More</span> </p>

                    <div className="grid grid-cols-2 gap-5 md:gap-0 md:flex items-center overflow-x-auto sm:justify-center my-5 md:bg-accent md:rounded-full border-2 border-white">
                        <button onMouseMove={()=> setTabSelect('tab1')} className={`flex items-center flex-shrink-0 px-5 py-2  text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab1' ? 'bg-opacity-100 text-base-100 font-semibold' : 'text-neutral'}`}>Featured</button>
                        <button onMouseMove={()=> setTabSelect('tab2')} className={`flex items-center flex-shrink-0 px-5 py-2  text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab2' ? 'bg-opacity-100 text-base-100 font-semibold' : 'text-neutral'}`}>Latest</button>
                        <button onMouseMove={()=> setTabSelect('tab3')} className={`flex items-center flex-shrink-0 px-5 py-2  text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab3' ? 'bg-opacity-100 text-base-100 font-semibold' : 'text-neutral'}`}>Bestsellers</button>
                        <button onMouseMove={()=> setTabSelect('tab4')} className={`flex items-center flex-shrink-0 px-5 py-2  text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab4' ? 'bg-opacity-100 text-base-100 font-semibold' : 'text-neutral'}`}>Specials</button>
                    </div>
                </div> 

                {
                    tabselect === 'tab1' && 
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 md:px-0"> 
                        {
                            featured.map((item,index) => (
                                <ProductCard item={item} key={index} />
                            ))
                        }
                        
                    </div>
                }

                {
                    tabselect === 'tab2' && 
                    <div className="container mx-auto grid grid-cols-1;md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 md:px-0"> 
                        {
                            latest.map((item, index) => (
                                <ProductCard item={item} key={index} />
                            ))
                             
                         
                       }
                    </div>

                }
                
            {
                    tabselect === 'tab3' && 
                    <div className="container mx-auto grid grid-cols-1;md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 md:px-0"> 
                        {
                            bestseller.map((item, index) => (
                                <ProductCard item={item} key={index} />
                                    
                            ))
                        }
                    </div>

            }
            {
                    tabselect === 'tab4' && 
                    <div className="container mx-auto grid grid-cols-1;md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 md:px-0"> 
                        {
                            special.map((item, index) => (
                                <ProductCard item={item} key={index} />
                                    
                            ))
                        }
                    </div>
            }

            
            <Link  onClick={scrolltop} to="/products">
                <div className="flex justify-center mt-10"><div className="btn btn-secondary text-base-100 rounded-full transition-all duration-300 ease-in-out w-52  hover:w-56  ">SEE ALL PRODUCTS &nbsp; <FaArrowRight className='text-xl'/></div></div>
            </Link>


                
            </div>
    );
};

export default Featured;