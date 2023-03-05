import React, { useContext, useEffect, useState } from 'react'; 
import { GoVerified } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RiAdvertisementFill } from 'react-icons/ri';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useShowAtThreshold from '../../../hooks/useShowAtThreshold/useShowAtThreshold';


const AdvertisedProducts = () => {

    const { loading, setLoading, user } = useContext(AuthContext)
 

    if (loading) {
        <progress className="progress w-56"></progress>
    }

    
    const showBorder = useShowAtThreshold(500);

    const [tabselect, setTabSelect] = useState('tab1')

        return (
            <div className='py-5 md:py-10 lg:py-0 lg:min-h-[800px] flex flex-col justify-center'>
                <div className="container mx-auto flex flex-col items-center gap-5 text-center ">
                    <h1 className="md:text-5xl font-bold text-primary">Why Buy From Us</h1>
                    <span className={`h-1 w-20 bg-primary rounded-full transition-width duration-500 ${showBorder ? "lg:w-20" : "lg:w-0"}`}></span>


                    <p className='text-sm dark:text-accent'>We have a wide selection of products from top brands and a knowledgeable staff to help you find exactly what you need. Plus, our fast delivery ensures that you receive your purchase as soon as possible. Choose us for all your electronic needs and experience the difference. <span className='underline text-secondary'>Learn More</span> </p>

                    <div className="grid grid-cols-2 gap-5 md:gap-0 md:flex items-center overflow-x-auto sm:justify-center my-5 md:bg-accent md:rounded-full">
                        <button onMouseMove={()=> setTabSelect('tab1')} className={`flex justify-center items-center flex-shrink-0 px-5 py-2 text-xl rounded-full transition-all duration-300 md:border-r-2 ${tabselect === 'tab1' ? 'bg-primary bg-opacity-100 text-base-100 font-semibold' : 'bg-opacity-0 text-neutral'}`}>Top Categories</button>
                        <button onMouseMove={()=> setTabSelect('tab2')} className={`flex justify-center items-center flex-shrink-0 px-5 py-2 text-xl rounded-full transition-all duration-300 md:border-r-2 ${tabselect === 'tab2' ? 'bg-primary bg-opacity-100 text-base-100 font-semibold' : 'bg-opacity-0 text-neutral'}`}>Mobile</button>
                        <button onMouseMove={()=> setTabSelect('tab3')} className={`flex justify-center items-center flex-shrink-0 px-5 py-2 text-xl rounded-full transition-all duration-300 md:border-r-2 ${tabselect === 'tab3' ? 'bg-primary bg-opacity-100 text-base-100 font-semibold' : 'bg-opacity-0 text-neutral'}`}>Laptop</button>
                        <button onMouseMove={()=> setTabSelect('tab4')} className={`flex justify-center items-center flex-shrink-0 px-5 py-2 text-xl rounded-full transition-all duration-300 md:border-r-2 ${tabselect === 'tab4' ? 'bg-primary bg-opacity-100 text-base-100 font-semibold' : 'bg-opacity-0 text-neutral'}`}>Components</button>
                    </div>
                </div> 
               
                {
                    tabselect === 'tab1' && 
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 p-5">
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/RSK9ZVy/laptop.webp" alt="" />
                            <Link className='absolute bottom-3 ' to="/laptop"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Laptop</button></Link>
                        </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-contain h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/5459tTj/camera.webp" alt="" />
                            <Link className='absolute bottom-3 ' to="/camera"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Camera</button></Link>
                        </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-contain h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/6gk5rrn/headphone.webp" alt="" />
                            <Link className='absolute bottom-3 ' to="/accessories"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Accessories</button></Link>
                            </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-contain h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/Kr0jRtD/smartphone.webp" alt="" />
                            <Link className='absolute bottom-3 ' to="/smartphone"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Smartphone</button></Link>
                            </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/K0QmRyb/ps5.webp" alt="" />
                            <Link className='absolute bottom-3 ' to="/console"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Consoles</button></Link>
                        </div>
                    
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-contain h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/0J7pnwP/watch.webp" alt="" />
                            <Link className='absolute bottom-3 ' to="/watch"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Watch</button></Link>
                        </div> 
                    </div>

                }
                {
                    tabselect === 'tab2' &&
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 p-5">
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/J5MLWhJ/s22u.jpg" alt="" />
                            <Link className='absolute bottom-3 ' to="/smartphone/samsung"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Samsung</button></Link>
                        </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/PNSM6dd/i14pm.webp" alt="" />
                            <Link className='absolute bottom-3 ' to="/smartphone/apple"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Apple</button></Link>
                        </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/K6N7gNy/nothing.webp" alt="" />
                            <Link className='absolute bottom-3 ' to="/smartphone/nothing"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Nothing</button></Link>
                        </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/ckTwwx5/xiaomi12p.webp" alt="" />
                            <Link className='absolute bottom-3 ' to="/smartphone/xiaomi"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Xiaomi</button></Link>
                        </div>
              
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/pX8hctR/op10pro.webp" alt="" />
                            <Link className='absolute bottom-3 ' to="/smartphone/oneplus"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Oneplus</button></Link>
                        </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/S5qyP9h/oppo.webp" alt="" />
                            <Link className='absolute bottom-3 ' to="/smartphone/oppo"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Oppo</button></Link>
                        </div>
                
                    </div>
                }
                {
                    tabselect === 'tab3' && 
                   <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 p-5">
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/RSK9ZVy/laptop.webp" alt="" />
                        <Link className='absolute bottom-3 ' to="/laptop/asus"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Asus</button></Link>
                    </div> 
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/Fx737Ld/Apple-Mac-Book-Pro-2021-M1-14-and-16-inch-Colors.webp" alt="" />
                        <Link className='absolute bottom-3 ' to="/laptop/apple"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Apple</button></Link>
                    </div>
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/LY6wpYV/blade-14.jpg" alt="" />
                        <Link className='absolute bottom-3 ' to="/laptop/razor"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Razor</button></Link>
                    </div>
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/WkvdxGW/dell-xps.webp" alt="" />
                        <Link className='absolute bottom-3 ' to="/laptop/dell"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Dell</button></Link>
                    </div>
              
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/WKRR5Q3/lenovo-yoga-7i-gen7-14inch.webp" alt="" />
                        <Link className='absolute bottom-3 ' to="/laptop/lenovo"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Lenovo</button></Link>
                    </div>
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/Qjgftjp/Samsung-Galaxy-Book2-Pro-360-a.webp" alt="" />
                        <Link className='absolute bottom-3 ' to="/laptop/samsung"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Samsung</button></Link>
                    </div>                   
                
                </div>

                }
                {
                    tabselect === 'tab4' && 
                   <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 p-5">
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/qs3W7ky/monitor.webp" alt="" />
                        <Link className='absolute bottom-3 ' to="/monitor"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Monitor</button></Link> 
                    </div>
              
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/8xLdT2P/ryzen-9.webp" alt="" />
                        <Link className='absolute bottom-3 ' to="/processor"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Processor</button></Link>  
                    </div>
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/RyctzzW/meg-godlike.jpg" alt="" />
                        <Link className='absolute bottom-3 ' to="/motherboard"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Motherboard</button></Link>  
                                
                    </div>
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/JxJRBXq/logitech-g-pro.jpg" alt="" />
                        <Link className='absolute bottom-3 ' to="/accessories/headphone"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Headphone</button></Link>  
 
                    </div>
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/0Y876QK/ducky-one-3.webp" alt="" />
                        <Link className='absolute bottom-3 ' to="/accessories/keyboard"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Keyboard</button></Link>  
                         
                    </div>                   
             
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg dark:bg-accent shadow-blue-50 dark:shadow-none border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/DrrRtzv/viper-ultimate.webp" alt="" />
                        <Link className='absolute bottom-3 ' to="/accessories/mouse"><button className='bg-primary hover:bg-secondary text-base-100 transition-all duration-300  p-2 rounded-lg'>Mouse</button></Link>  
                         
                    </div>                 
                
                </div>

                }
                

                


                
            </div>
        );
    }

export default AdvertisedProducts;