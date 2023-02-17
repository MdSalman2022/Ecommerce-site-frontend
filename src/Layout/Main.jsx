import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';
import Header from '../components/Shared/Header/Header'; 
import MobileHeader from '../components/Shared/Header/MobileHeader';

const Main = () => {
    return (
        <div>
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