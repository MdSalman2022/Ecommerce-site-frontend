import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { BsPerson, BsBag } from 'react-icons/bs';
import {IoNotificationsOutline} from 'react-icons/io5'
import {FaExchangeAlt} from 'react-icons/fa'
import {MdFavoriteBorder} from 'react-icons/md'
import { BiHomeAlt, BiMessageMinus } from 'react-icons/bi'
import { BsFillPersonFill,BsMenuButtonWideFill } from 'react-icons/bs'
import { FaQuestion } from 'react-icons/fa'
import { IoLanguage } from 'react-icons/io5'
import {TbTruckDelivery} from 'react-icons/tb'
import {FaAngleDown} from 'react-icons/fa'

const Header = () => {
    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext)
    let { searchText, items, setItems, setSearchText, loading } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm();

    
    const onSubmit = data => {
        setSearchText(data.name);
        console.log(data.name);
        console.log(searchText);
        if (data.name === " ") {
            navigate(`/`)
        }
        else { data.name ? navigate(`/search/${data.name}`) : navigate(`/`) }

        console.log(errors);
    }



    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }


    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 50) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div className='grid grid-cols-3 container mx-auto lg:gap-80 text-sm justify-items-center place-content-center bg-base-100 w-full h-8'>
                <div className='flex gap-5'>
                    <p className='flex items-center gap-2'><BiHomeAlt/> Home</p>
                    <p className='flex items-center gap-2'><BsFillPersonFill/> About Us</p>
                    <p className='flex items-center gap-2'><BiMessageMinus/> Contact</p>
                    {/* <p><FaQuestion/> FAQ</p> */}
                </div>
                
                <div className='flex gap-5 '>
                    <p className='flex items-center gap-2'><IoLanguage/> English</p>
                    <p>$ US Dollar</p>
                </div>

                <div className='flex gap-5 border-l pl-3 '>
                    <p className='flex items-center gap-2'><BsMenuButtonWideFill/> More Menus</p>
                    <p className='flex items-center gap-2'><TbTruckDelivery/> Delivery</p>
                </div>

            </div>
            <div className={`border-t`}>
                <div className="container mx-auto grid grid-cols-4 justify-items-start gap-10 lg:grid-cols-5  py-5">
                    <div className="logo hidden lg:flex">
                        <Link to='/' className=" ">
                            {/* <LazyLoadImage src="https://i.ibb.co/vd3xm6V/boipaben-final.png" className='w-16' alt="logo" border="0" /> */}
                            <h1 className="text-4xl font-semibold text-primary underline">Best<span className='font-bold text-neutral'>Deal</span></h1>
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="pl-3 lg:pl-0 w-full search col-span-3">
                        <div className="input-group">
                            <input defaultValue={searchText} type="text" placeholder="Search for a Book" className="input input-bordered border-primary w-full"  {...register("name", { required: true, maxLength: 80 })} />
                            <button type="submit" className='bg-primary text-base-100 font-bold px-3 text-2xl'><AiOutlineSearch /></button>
                        </div>
                    </form>
                    <div className='flex text-3xl gap-5 justify-start items-center col-span-1'>
                            <p className='rounded-full border p-1 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'><BsPerson  className='p-1'/></p>
                            <p className='rounded-full border p-1 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'><MdFavoriteBorder  className=' p-1'/></p>
                            <p className='rounded-full border p-1 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'><FaExchangeAlt className=' p-1'/></p>
                            <p className='rounded-full border p-1 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'><IoNotificationsOutline className=' p-1'/></p>
                            <p className='rounded-full border p-1 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'><BsBag  className=' p-1'/></p>
                    </div>
                </div>
            </div>
                <div className=' py-5 border-y'>
                <div className='container mx-auto'>
                    <div className="flex justify-between ">
                        <div className=''>
                            <p className='flex gap-2 justify-center items-center p-3 bg-primary text-base-100 w-44 rounded-full'>All Categories <FaAngleDown/> </p>
                        </div>
                        <div className='flex gap-3'>
                            <p className='flex gap-1 justify-center items-center transition-all duration-300 text-primary bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>Computers <FaAngleDown/> </p>
                            <p className='flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>Laptops <FaAngleDown/> </p>
                            <p className='flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>Smartphone <FaAngleDown/> </p>
                            <p className='flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>Tablet <FaAngleDown/> </p>
                            <p className='flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>Camera <FaAngleDown/> </p>
                            <p className='flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>Gadgets <FaAngleDown/> </p>
                            <p className='flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>TV <FaAngleDown/> </p>
                            <p className='flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>AC <FaAngleDown/> </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;