import React, { useContext, useEffect, useState } from 'react'; 
import { GoVerified } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RiAdvertisementFill } from 'react-icons/ri';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';


const AdvertisedProducts = () => {

    const { loading, setLoading, user, allUsers } = useContext(AuthContext)



    if (loading) {
        <progress className="progress w-56"></progress>
    }


    const [product, SetProduct] = useState('')

    const handleSetProduct = data => {
        SetProduct(data)
    }


    setLoading(false)

    const [tabselect, setTabSelect] = useState('tab1')

        return (
            <div className='py-10 lg:py-0 lg:min-h-[800px] flex flex-col justify-center'>
                <div className="container mx-auto flex flex-col items-center gap-5 text-center ">
                    <h1 className="text-5xl font-bold">Why Buy From Us</h1>
                    <span className="h-1 w-20 bg-primary rounded-full"></span>
                    <p className=''>We have a wide selection of products from top brands and a knowledgeable staff to help you find exactly what you need. Plus, our fast delivery ensures that you receive your purchase as soon as possible. Choose us for all your electronic needs and experience the difference. <span className='underline text-secondary'>Learn More</span> </p>

                    <div className="flex items-center overflow-x-auto sm:justify-center my-5 bg-accent rounded-full">
                        <button onClick={()=> setTabSelect('tab1')} className={`flex items-center flex-shrink-0 px-5 py-2  text-neutral text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab1' && 'bg-opacity-100 text-white font-semibold'}`}>Top Categories</button>
                        <button onClick={()=> setTabSelect('tab2')} className={`flex items-center flex-shrink-0 px-5 py-2  text-neutral text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab2' && 'bg-opacity-100 text-white font-semibold'}`}>Mobile</button>
                        <button onClick={()=> setTabSelect('tab3')} className={`flex items-center flex-shrink-0 px-5 py-2  text-neutral text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab3' && 'bg-opacity-100 text-white font-semibold'}`}>Laptop</button>
                        <button onClick={()=> setTabSelect('tab4')} className={`flex items-center flex-shrink-0 px-5 py-2  text-neutral text-xl rounded-full transition-all duration-300 bg-primary bg-opacity-0 border-r ${tabselect === 'tab4' && 'bg-opacity-100 text-white font-semibold'}`}>Components</button>
                    </div>
                </div> 
               
                {
                    tabselect === 'tab1' && 
                    <div className="container mx-auto grid grid-cols-6 gap-5">
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/RSK9ZVy/laptop.webp" alt="" />
                            <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Laptop</button>
                        </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-contain h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/5459tTj/camera.webp" alt="" />
                            <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Camera</button>
                            </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-contain h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/6gk5rrn/headphone.webp" alt="" />
                            <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Accessories</button>
                            </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-contain h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/Kr0jRtD/smartphone.webp" alt="" />
                            <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Smartphone</button>
                            </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/K0QmRyb/ps5.webp" alt="" />
                            <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Consoles</button>
                            </div>
                    
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-contain h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/0J7pnwP/watch.webp" alt="" />
                            <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Watch</button>
                        </div> 
                    </div>

                }
                {
                    tabselect === 'tab2' &&
                    <div className="container mx-auto grid grid-cols-6 gap-5">
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/J5MLWhJ/s22u.jpg" alt="" />
                            <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Samsung S22 Ultra</button>
                        </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/PNSM6dd/i14pm.webp" alt="" />
                            <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>iPhone 14 Pro Max</button>
                        </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/K6N7gNy/nothing.webp" alt="" />
                            <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Nothing Phone</button>
                        </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/ckTwwx5/xiaomi12p.webp" alt="" />
                            <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Xiaomi 12 Pro</button>
                        </div>
              
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/pX8hctR/op10pro.webp" alt="" />
                            <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Oneplus 10 Pro</button>
                        </div>
                        <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                            <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/S5qyP9h/oppo.webp" alt="" />
                            <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Oppo Find X5</button>
                        </div>
                
                    </div>
                }
                {
                    tabselect === 'tab3' && 
                   <div className="container mx-auto grid grid-cols-6 gap-5">
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/RSK9ZVy/laptop.webp" alt="" />
                        <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Asus Zenbook Pro</button>
                    </div> 
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/Fx737Ld/Apple-Mac-Book-Pro-2021-M1-14-and-16-inch-Colors.webp" alt="" />
                        <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Apple MacBook Pro</button>
                    </div>
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/LY6wpYV/blade-14.jpg" alt="" />
                        <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Razor Blade 14</button>
                    </div>
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/WkvdxGW/dell-xps.webp" alt="" />
                        <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Dell XPS 13</button>
                    </div>
              
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/WKRR5Q3/lenovo-yoga-7i-gen7-14inch.webp" alt="" />
                        <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Lenovo Yoga 7i</button>
                    </div>
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/Qjgftjp/Samsung-Galaxy-Book2-Pro-360-a.webp" alt="" />
                        <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Samsung Galaxy Book 2 Pro</button>
                    </div>                   
                
                </div>

                }
                {
                    tabselect === 'tab4' && 
                   <div className="container mx-auto grid grid-cols-6 gap-5">
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/qs3W7ky/monitor.webp" alt="" />
                        <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Asus Rog 34 QHD </button>
                    </div>
              
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/8xLdT2P/ryzen-9.webp" alt="" />
                        <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Ryzen 9 7950x</button>
                    </div>
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/RyctzzW/meg-godlike.jpg" alt="" />
                        <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>MSI GodLike x670</button>
                    </div>
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/JxJRBXq/logitech-g-pro.jpg" alt="" />
                        <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Logitech G Pro</button>
                    </div>
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/0Y876QK/ducky-one-3.webp" alt="" />
                        <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Ducky One 3</button>
                    </div>                   
             
                    <div className='rounded-lg flex justify-center items-start p-5 pb-16  shadow-lg shadow-blue-50 border relative'>
                        <LazyLoadImage height="200px" width="100px" className='object-cover h-52 w-60 hover:scale-110 transition-all duration-300' src="https://i.ibb.co/DrrRtzv/viper-ultimate.webp" alt="" />
                        <button className='hover:bg-accent transition-all duration-300 border absolute bottom-3 p-2 rounded-lg'>Razor Viper Ultimate</button>
                    </div>                 
                
                </div>

                }
                

                


                
            </div>
        );
    }

export default AdvertisedProducts;