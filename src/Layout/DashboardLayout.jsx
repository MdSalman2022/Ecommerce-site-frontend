import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import {AiOutlineShoppingCart,AiOutlineSetting} from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { MdOutlineLocalShipping,MdOutlineLogout,MdOpenInFull,MdCloseFullscreen } from 'react-icons/md';
import { BsCreditCard2Back, BsPeople,BsGrid1X2 } from 'react-icons/bs';
import { IoStatsChart } from 'react-icons/io5';
import {FaChevronCircleRight,FaChevronCircleLeft} from 'react-icons/fa'
import DashboardHeader from '../components/Dashboard/DashboardHeader/DashboardHeader';


function DashboardLayout() {


    const location = useLocation();
    const segments = location.pathname.split('/');
    const lastSegment = segments.pop(); 

    console.log(lastSegment)

    const [isOpen, setIsOpen] = useState(true)
    const [activeTab, setActiveTab] = useState(lastSegment)

  
 

    const handleSidebar = () => {
        setIsOpen(!isOpen);
    }

 

    return (
        <div className={`bg-accent h-full select-none grid ${isOpen ? 'grid-cols-8' : 'grid-cols-12'}`}>
            <aside className={`col-span-1 transition-colors duration-300 h-full bg-base-100 flex flex-col py-10 gap-y-10 items-start pl-6 ${isOpen ? 'w-52 ' : 'w-24'}`}>
                <Link to="/" className={`transaction-colors duration-300 flex items-center gap-5 group `}><img className='w-10' src="https://i.ibb.co/xSLpY24/logo-colored.webp" alt="logo" /><span className={`transition-colors duration-300 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-2xl ${isOpen ? '' : 'hidden'}`}>BestDeal</span></Link>
                <div className='flex flex-col gap-5 '>
                    <Link onClick={()=>setActiveTab('dashboard')} to="/dashboard" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'dashboard' ? 'border-primary border-r-4 text-primary' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-primary'><BsGrid1X2/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-primary ${isOpen ? '' : 'hidden'}`}>Dashboard</span></Link>
                    <Link onClick={()=>setActiveTab('products')} to="/dashboard/products" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'products' ? 'border-primary border-r-4 text-primary' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-primary'><BiCategory/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-primary ${isOpen ? '' : 'hidden'}`}>Products</span> </Link>
                    <Link onClick={()=>setActiveTab('orders')} to="/dashboard/orders" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'orders' ? 'border-primary border-r-4 text-primary' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-primary'><AiOutlineShoppingCart/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-primary ${isOpen ? '' : 'hidden'}`}>Orders</span> </Link>
                    <Link onClick={()=>setActiveTab('shipments')} to="/dashboard/shipments" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'shipments' ? 'border-primary border-r-4 text-primary' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-primary'><MdOutlineLocalShipping/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-primary ${isOpen ? '' : 'hidden'}`}>Shipments</span> </Link>
                    <Link onClick={()=>setActiveTab('transaction')} to="/dashboard/" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${isOpen ? 'pr-6' : 'pr-4'} ${activeTab === 'transaction' ? 'border-primary border-r-4 text-primary' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-primary'><BsCreditCard2Back/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-primary ${isOpen ? '' : 'hidden'}`}>Transaction</span> </Link>
                    <Link onClick={()=>setActiveTab('customers')} to="/dashboard/" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'customers' ? 'border-primary border-r-4 text-primary' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-primary'><BsPeople/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-primary ${isOpen ? '' : 'hidden'}`}>Customers</span> </Link>
                    <Link onClick={()=>setActiveTab('statistics')} to="/dashboard/" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'statistics' ? 'border-primary border-r-4 text-primary' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-primary'><IoStatsChart/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-primary ${isOpen ? '' : 'hidden'}`}>Statistics</span> </Link>
                    <Link onClick={()=>setActiveTab('settings')} to="/dashboard/" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'settings' ? 'border-primary border-r-2' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-primary'><AiOutlineSetting/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-primary ${isOpen ? '' : 'hidden'}`}>Settings</span> </Link>
                    <Link to="/dashboard/" className={`flex items-center gap-5 group ${isOpen ? 'pr-8' : 'pr-6'}`}><p className='shadow-lg p-3 rounded-xl text-2xl text-primary'><MdOutlineLogout/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-primary ${isOpen ? '' : 'hidden'}`}>Logout</span> </Link>
                </div>
                    <p onClick={handleSidebar}  className={`cursor-pointer text-primary shadow-lg p-3 rounded-xl text-2xl ${isOpen ? 'hidden' : ''}`}><MdOpenInFull/></p>
                    <div onClick={handleSidebar}  className={`cursor-pointer  flex items-center gap-5 group ${isOpen ? 'pr-8' : 'pr-6'}`}><p className={`text-primary shadow-lg p-3 rounded-xl text-2xl ${isOpen ? '' : 'hidden'}`}><MdCloseFullscreen/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-primary ${isOpen ? '' : 'hidden'}`}>Minimize</span></div>
            </aside>
            <div className={` pr-8 ${isOpen ? 'col-span-7' : 'col-span-11'}`}>
                <DashboardHeader/>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default DashboardLayout;
