import React from 'react';
import { FaApple } from 'react-icons/fa';
import { SiSamsung, SiAsus,SiRazer,SiIntel,SiAmd, SiNvidia, SiLogitech,SiDell,SiCorsair,SiMicrosoft,SiXiaomi } from 'react-icons/si';

const Brand = () => {
    return (
        <div className='bg-accent'>
            <div className="container mx-auto py-10">
                <div className="text-center flex flex-col items-center justify-center my-10 gap-5">
                    <h1 className="text-4xl font-bold">Shop By Brand</h1>
                    <span className="h-1 w-20 bg-primary rounded-full"></span>
                </div>
                <section className="">
                    <div className="container p-6 mx-auto space-y-6 text-center lg:p-8 lg:space-y-8">
                        <div className="grid grid-cols-6 gap-5">
                            <FaApple className='p-5 text-9xl transition-all duration-300 hover:text-black '/>
                            
                            <SiSamsung className='p-0 text-9xl transition-all duration-300 hover:text-primary '/>
                            
                            <SiXiaomi className='p-5 text-9xl transition-all duration-300 hover:text-orange-500 '/>

                            <SiAsus className='p-1 text-9xl transition-all duration-300 hover:text-blue-600 '/>
                            
                            
                            <SiRazer className='p-5 text-9xl transition-all duration-300 hover:text-green-600 '/>
                            
                            <SiMicrosoft className='p-5 text-9xl transition-all duration-300 hover:text-primary '/>

                            <SiIntel className='p-5 text-9xl transition-all duration-300 hover:text-primary '/>
                            
                            <SiAmd className='p-1 text-9xl transition-all duration-300 hover:text-primary '/>
                            
                            <SiNvidia className='p-5 text-9xl transition-all duration-300 hover:text-green-500 '/> 

                            <SiDell className='p-5 text-9xl transition-all duration-300 hover:text-primary '/>

                            <SiLogitech className='p-5 text-9xl transition-all duration-300 hover:text-sky-500 '/>

                            <SiCorsair className='p-5 text-9xl transition-all duration-300 hover:text-primary '/>
                     
                            
                        </div>
                    </div>
                </section>


            </div>
        </div>
    );
};

export default Brand;