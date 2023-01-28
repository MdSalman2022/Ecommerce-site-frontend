import React, { useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import {AiFillNotification} from 'react-icons/ai'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {

    const {title} = useContext(AuthContext)
    console.log(title);
    return (
        <div>
            <div className="navbar bg-white">
                <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3   shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a>
                                    <div className="form-control">
                                        <input type="text" placeholder="Search" className="input input-bordered" />
                                    </div>
                                </a>
                            </li>
                </ul>
                </div>
                    <div className="pl-4 flex flex-col justify-start items-start">
                        <a className=" text-lg font-semibold">{title}</a>
                        {
                            title === 'Home' && <span className='font-semibold text-sm text-secondary'>Admin account</span>  
                        }
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                             <div className='max-w-md mx-auto'>
                                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-secondary">
                                    <div className="grid place-items-center h-full w-12 text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                     </svg>
                                    </div>
                                    <form >
                                        <input className='peer h-full w-full outline-none text-sm text-gray-700 pr-32 lg:pr-52 py-10'   type="text" placeholder="What are you looking for"/>
                                    </form>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end flex gap-10">
                    <span className='bg-gray-200 h-10 w-10 p-1 rounded-full text-black flex items-center justify-center text-xl hover:text-primary transition-all duration-300'><AiFillNotification/></span> 
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className='bg-gray-200 h-10 w-10 p-1 rounded-full text-black flex items-center justify-center text-xl hover:text-primary transition-all duration-300'><FaBars /></label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link to="/dashboard/myaccounts">My account</Link></li> 
                                <li><Link to="/dashboard/storesettings">Store settings</Link></li> 
                                <li><a>Tutorials</a></li> 
                                <li><a>Help & support</a></li> 
                                <li><a>Sign out</a></li> 
                            </ul>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;