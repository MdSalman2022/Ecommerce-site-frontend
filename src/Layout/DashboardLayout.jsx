import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../components/Shared/Header/Header';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import { FaAngleDown } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';
import { MdOutlineListAlt } from 'react-icons/md';
import { FaTruck } from 'react-icons/fa';
import { BsFillGridFill } from 'react-icons/bs';
import { SiGoogleanalytics } from 'react-icons/si';
import { BiMoney } from 'react-icons/bi';
import { VscTools } from 'react-icons/vsc';
import { TbDiscount2 } from 'react-icons/tb';
import {IoIosColorPalette} from 'react-icons/io';
import DashboardHeader from '../components/Shared/Header/DashboardHeader';

const DashboardLayout = () => {

    const { user, title, setTitle } = useContext(AuthContext) 

    const [active, setActive] = useState('home')
    
    const handleActive = data => {
        setActive(data)

        if (data === 'home') {
            setTitle('Home')
        } else if (data === 'orders') {
            setTitle('All Orders')
        } else if (data === 'abandoned') {
            setTitle('Abandoned | Lifetime')
        } else if (data === 'delivery') {
            setTitle('Delivery')
        } else if (data === 'products' || data === 'categories' || data === 'inventory') {
            setTitle('Catalogue')
        } else if (data === 'analytics') {
            setTitle('Analytics')
        } else if (data === 'payouts') {
            setTitle('Set up payment methods')
        } else if (data === 'tools') {
            setTitle('Tools')
        } else if (data === 'discounts') {
            setTitle('Discount Coupons')
        } else if (data === 'appearance') {
            setTitle('Themes')
        } 
        else {
            setTitle('Home')
        }
    }



    console.log(active)
    return (
        <div className='bg-[#F7F7F7]'>
            <div className="drawer drawer-mobile mx-auto">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">Dashboard sidebar</label>
                    <DashboardHeader/>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-1 w-52 bg-[#1E2640] text-white text-lg  ">
                        <li>
                            <Link to='/dashboard'>
                            <div className="avatar">
                                <div className="w-10 rounded-lg">
                                    <img src="https://placeimg.com/192/192/people" />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                    <p>Profile</p>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <p><FaAngleDown /> </p>
                            </div>
                            </Link>
                        </li>
                        <li onClick={() => handleActive('home')} className={` ${active === 'home' ? 'bg-[#353C53] text-white' : 'text-[#ccc]'  } rounded-lg`}><Link to='/dashboard/'><HiHome/> Home</Link></li>

                        <li onClick={() => handleActive('orders')} className={` ${active === 'orders' || active === 'abandoned' ? 'bg-[#353C53] text-white' : 'text-[#ccc]'} rounded-lg`}><Link to='/dashboard/orders'><MdOutlineListAlt /> Orders</Link></li>                        
                        <ul className={`pl-8 ${active === 'orders' || active === 'abandoned' ? '' : 'hidden'}`}>
                            <li onClick={() => handleActive('orders')} className={active === 'orders' ? 'text-white text-sm' : 'text-gray-500 text-sm' }><Link to='/dashboard/orders'>All Orders (1)</Link></li>
                            <li onClick={() => handleActive('abandoned')} className={active === 'abandoned' ? 'text-white text-sm' : 'text-gray-500 text-sm' }><Link to='/dashboard/orders'>Abandoned carts</Link></li>
                        </ul>      
                        
                        <li onClick={()=> handleActive('delivery')} className={` ${active === 'delivery' ? 'bg-[#353C53] text-white' : 'text-[#ccc]' } rounded-lg`}><Link to='/dashboard/delivery'><FaTruck/> Delivery</Link></li>
                        <li onClick={()=> handleActive('products')} className={` ${active === 'products' ? 'bg-[#353C53] text-white' : 'text-[#ccc]' } rounded-lg`}><Link to='/dashboard/products'><BsFillGridFill/> Products</Link></li>
                        <ul className={`pl-8 ${active === 'products' || active === 'categories' || active === 'inventory' ? '' : 'hidden'}`}>
                            <li onClick={() => handleActive('products')} className={active === 'products' ? 'text-white text-sm' : 'text-gray-500 text-sm' }><Link to='/dashboard/products'>All Products (1)</Link></li>
                            <li onClick={() => handleActive('categories')} className={active === 'categories' ? 'text-white text-sm' : 'text-gray-500 text-sm' }><Link to='/dashboard/categories'>Categories</Link></li>
                            <li onClick={() => handleActive('inventory')} className={active === 'inventory' ? 'text-white text-sm' : 'text-gray-500 text-sm' }><Link to='/dashboard/inventory'>Inventory</Link></li>
                        </ul>  
                        <li onClick={()=> handleActive('analytics')} className={` ${active === 'analytics' ? 'bg-[#353C53] text-white' : 'text-[#ccc]' } rounded-lg`}><Link to='/dashboard/analytics'><SiGoogleanalytics/> Analytics</Link></li>
                        <li onClick={()=> handleActive('payouts')} className={` ${active === 'payouts' ? 'bg-[#353C53] text-white' : 'text-[#ccc]' } rounded-lg`}><Link to='/dashboard/payouts'><BiMoney/> Payouts</Link></li>
                        <li onClick={()=> handleActive('tools')} className={` ${active === 'tools' ? 'bg-[#353C53] text-white' : 'text-[#ccc]' } rounded-lg`}><Link to='/dashboard/tools'><VscTools/> Tools</Link></li>
                        <li onClick={()=> handleActive('discounts')} className={` ${active === 'discounts' ? 'bg-[#353C53] text-white' : 'text-[#ccc]' } rounded-lg`}><Link to='/dashboard/discounts'><TbDiscount2/> Discounts</Link></li>
                        <li onClick={()=> handleActive('appearance')} className={` ${active === 'appearance' ? 'bg-[#353C53] text-white' : 'text-[#ccc]' } rounded-lg`}><Link to='/dashboard/appearance'><IoIosColorPalette/> Appearance</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;