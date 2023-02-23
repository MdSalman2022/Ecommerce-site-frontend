import React, { useContext } from 'react';
import { FaApple } from 'react-icons/fa';
import { SiSamsung, SiAsus,SiRazer,SiIntel,SiAmd, SiNvidia, SiLogitech,SiDell,SiCorsair,SiMicrosoft,SiXiaomi } from 'react-icons/si';
import { Link } from 'react-router-dom'; 
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Brand = () => {

    const {scrolltop} = useContext(AuthContext)
   

    return (
        <div className='bg-accent'>
            <div className="container mx-auto py-10">
                <div className="text-center flex flex-col items-center justify-center my-10 gap-5">
                    <h1 className="text-4xl font-bold text-black">Shop By Brand</h1>
                    <span className="h-1 w-20 bg-primary rounded-full"></span>
                </div>
                <section className="">
                    <div className="container p-6 mx-auto space-y-6 text-center lg:p-8 lg:space-y-8">
                        <div className="h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-items-center gap-5 text-gray-500">
                            <Link onClick={scrolltop} to={`/brand/apple`}><FaApple className='p-5 text-9xl transition-all duration-300 hover:text-black '/></Link>
                        
                            <Link onClick={scrolltop} to="/brand/samsung"><SiSamsung className='p-0 text-9xl transition-all duration-300 hover:text-primary '/></Link>                            
                            <Link onClick={scrolltop} to="/brand/xiaomi"><SiXiaomi className='p-5 text-9xl transition-all duration-300 hover:text-orange-500 '/></Link>
                            <Link onClick={scrolltop} to="/brand/asus"><SiAsus className='p-1 text-9xl transition-all duration-300 hover:text-blue-600 '/></Link>
                            <Link onClick={scrolltop} to="/brand/razer"><SiRazer className='p-5 text-9xl transition-all duration-300 hover:text-green-600 '/></Link>
                            <Link onClick={scrolltop} to="/brand/microsoft"><SiMicrosoft className='p-5 text-9xl transition-all duration-300 hover:text-primary '/></Link>
                            <Link onClick={scrolltop} to="/brand/intel"><SiIntel className='p-5 text-9xl transition-all duration-300 hover:text-primary '/></Link>
                            <Link onClick={scrolltop} to="/brand/amd"><SiAmd className='p-1 text-9xl transition-all duration-300 hover:text-primary '/></Link>
                            <Link onClick={scrolltop} to="/brand/nvidea"><SiNvidia className='p-5 text-9xl transition-all duration-300 hover:text-green-500 '/> </Link>
                            <Link onClick={scrolltop} to="/brand/dell"><SiDell className='p-5 text-9xl transition-all duration-300 hover:text-primary '/></Link>
                            <Link onClick={scrolltop} to="/brand/logitech"><SiLogitech className='p-5 text-9xl transition-all duration-300 hover:text-sky-500 '/></Link>
                            <Link onClick={scrolltop} to="/brand/corsair"><SiCorsair className='p-5 text-9xl transition-all duration-300 hover:text-primary '/></Link>
                            
                        </div>
                    </div>
                </section>


            </div>
        </div>
    );
};

export default Brand;