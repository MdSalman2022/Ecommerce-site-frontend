import React, { useContext } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';
import Header from '../components/Shared/Header/Header'; 
import MobileHeader from '../components/Shared/Header/MobileHeader';
import { BsBag } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';


const Main = () => {


    const { cart, scrolltop } = useContext(AuthContext)
    

    return (
        <div>
            <Link onClick={scrolltop} to="/cart" className={`animate-bounce z-50 bottom-5 right-5 ${cart.length > 0 ? 'fixed' : 'hidden'}`}>
                <div className=' rounded-full border-2 border-primary p-1 hover:bg-primary hover:border-white hover:text-base-100 transition-all duration-300 ease-in-out relative bg-white'>
                    <BsBag className='cursor-pointer  p-2 text-4xl text-primary hover:text-white' />
                    {cart && <div className="absolute -top-1 -right-2 text-sm bg-primary text-base-100 rounded-full   w-5 h-5 flex items-center justify-center">{cart.length}</div>}
                </div>
            </Link>
            <Header></Header> 
            <div  className="md:hidden">

            <MobileHeader>
                <Outlet></Outlet>
            </MobileHeader>
            </div>
            <div className='hidden md:grid'>
                <Outlet></Outlet>
            </div>
            <LazyLoadComponent><Footer></Footer></LazyLoadComponent>
        </div>
    );
};

export default Main;