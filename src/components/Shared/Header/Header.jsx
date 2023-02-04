import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { BsPerson, BsBag } from 'react-icons/bs';
import {IoNotificationsOutline} from 'react-icons/io5'
import {FaAngleRight, FaExchangeAlt} from 'react-icons/fa'
import {MdFavoriteBorder} from 'react-icons/md'
import { BiHomeAlt, BiMessageMinus } from 'react-icons/bi'
import { BsFillPersonFill,BsMenuButtonWideFill } from 'react-icons/bs'
import { FaQuestion } from 'react-icons/fa'
import { IoLanguage } from 'react-icons/io5'
import {TbTruckDelivery} from 'react-icons/tb'
import {FaAngleDown} from 'react-icons/fa'
import { clearConfigCache } from 'prettier';

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


    const [options, setOptions] = useState(0)

    const handleOptions = id => {
        setOptions(id)
    }

    const allcategories = [
        {
            id: 1,
            name: 'Desktop Components',
            subcategories: [
                {
                    id: 1,
                    name: 'CPU',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Intel',
                        },
                        {
                            id: 2,
                            name: 'AMD',
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Motherboard',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Gigabyte',
                        },
                        {
                            id: 2,
                            name: 'Asus',
                        },
                        {
                            id: 3,
                            name: 'MSI',
                        },
                    ]
                },
                {
                    id: 3,
                    name: 'RAM',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Corsair',
                        },
                        {
                            id: 2,
                            name: 'G.Skill',
                        },
                        {
                            id: 3,
                            name: 'Thermaltake',
                        }
                    ]
                },
                {
                    id: 4,
                    name: 'Graphics Card',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Nvidia',
                            subcategories: [
                                {
                                    id: 1,
                                    name: 'Asus',
                                },
                                {
                                    id: 2,
                                    name: 'Gigabyte',
                                },
                                {
                                    id: 3,
                                    name: 'MSI',
                                },
                                {
                                    id: 4,
                                    name: 'Zotac',
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 5,
                    name: 'Power Supply',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Corsair',
                        },
                        {
                            id: 2,
                            name: 'Thermaltake',
                        },
                        {
                            id: 3,
                            name: 'Antec',
                        }
                    ]
                },
                {
                    id: 6,
                    name: 'Storage',
                    subcategories: [
                        {
                            id: 1,
                            name: 'SSD',
                            subcategories: [
                                {
                                    id: 1,
                                    name: 'Samsung',
                                },
                                {
                                    id: 2,
                                    name: 'Thermaltake',
                                },
                                {
                                    id: 3,
                                    name: 'Corsair',
                                },
                            ]
                        },
                        {
                            id: 2,
                            name: 'HDD',
                            subcategories: [
                                {
                                    id: 1,
                                    name: 'Seagate',
                                },
                                {
                                    id: 2,
                                    name: 'Western Digital',
                                },
                            ]
                        }
                
                    ]
                },
                {
                    id: 7,
                    name: 'CPU Cooler',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Corsair',
                        },
                        {
                            id: 2,
                            name: 'Thermaltake',
                        },
                        {
                            id: 3,
                            name: 'Cooler Master',
                        },
                    ]
                },
                {
                    id: 8,
                    name: 'Case',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Corsair',

                        },
                        {
                            id: 2,
                            name: 'Thermaltake',
                        },
                        {
                            id: 3,
                            name: 'Cooler Master',
                        },
                    ]
                }
            ]
        },   
        {
            id: 2,
            name: 'Laptops',
            subcategories: [
                {
                    id: 1,
                    name: 'Asus',
                },
                {
                    id: 2,
                    name: 'Hp',
                },
                {
                    id: 3,
                    name: 'MSI',
                }
            ]

        },
        {
            id: 3,
            name: 'Monitors',
            subcategories: [
                {
                    id: 1,
                    name: 'Asus',
                },
                {
                    id: 2,
                    name: 'Hp',
                },
                {
                    id: 3,
                    name: 'MSI',
                }
            ]
        },
        {
            id: 4,
            name: 'Smartphone',
            subcategories: [
                {
                    id: 1,
                    name: 'Asus',
                },
                {
                    id: 2,
                    name: 'Hp',
                },
                {
                    id: 3,
                    name: 'MSI',
                }
            ]
        },
        {
            id: 5,
            name: 'Tablets',
            subcategories: [
                {
                    id: 1,
                    name: 'Samsung',
                },
                {
                    id: 2,
                    name: 'Apple',
                }
            ]
        },
        {
            id: 6,
            name: 'Camera',
            subcategories: [
                {
                    id: 1,
                    name: 'Canon',
                },
                {
                    id: 2,
                    name: 'Nikon',
                }
            ]
        },
        {
            id: 7,
            name: 'Consoles',
            subcategories: [
                {
                    id: 1,
                    name: 'Playstation',
                },
                {
                    id: 2,
                    name: 'Xbox',
                }
            ]
        },
        {
            id: 8,
            name: 'TV',
            subcategories: [
                {
                    id: 1,
                    name: 'Samsung',
                },
                {
                    id: 2,
                    name: 'Sony',
                }
            ]
        },
        {
            id: 9,
            name: 'AC',
            subcategories: [
                {
                    id: 1,
                    name: 'General',
                },
                {
                    id: 2,
                    name: 'LG',
                }
            ]
        },
        {
            id: 10,
            name: 'Accessories',
            subcategories: [
                {
                    id: 1,
                    name: 'Headphones',
                },
                {
                    id: 2,
                    name: 'Mouse',
                },
                {
                    id: 3,
                    name: 'Keyboard',
                }
            ]
        },

    ]
 
    
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
                <div className='py-4  border-y '>
                <div className='container mx-auto'>
                    <div className="flex justify-between ">
                        <div className='relative group'>
                            <p className='flex gap-2 justify-center items-center p-3 bg-primary text-base-100 w-44 rounded-full '>All Categories <FaAngleDown /> </p>
                            <div className="hidden group-hover:flex group-hover:flex-col absolute z-50  py-5 w-56  top-12 h-full ">
                                <ul className='space-y-2 bg-white z-50 rounded-lg'>
                                    {
                                        allcategories.map(category => (
                                            <li onMouseEnter={()=>handleOptions(category.id)} onMouseLeave={()=>handleOptions(0)} className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold border-b p-2 flex items-start relative group'>
                                                <span className='flex items-center'>{category.name} &nbsp; <FaAngleRight /></span>
                                                    <div className={`w-44 absolute -right-44 top-0 bg-white px-5 py-2 rounded-lg ${options=== category.id ? '' : 'hidden'}`}>
                                                        <ul className='text-neutral hover:text-primary transition-all duration-300'>{
                                                            category.subcategories.map(subcategory => (
                                                                <li className='cursor-pointer text-neutral hover:text-primary'>{subcategory.name}</li>
                                                                
                                                            ))
                                                        }</ul> 
                                                    </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='flex gap-3'>
                            <div className='relative group flex gap-1 justify-center items-center transition-all duration-300 text-primary bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                
                                Monitor <FaAngleDown />

                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-32 bg-white text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-white rounded-lg'>
                                        {
                                            allcategories[2].subcategories.map(subcategory => (
                                                <li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2'>{subcategory.name}</li>
                                            ))

                                        }
                                    </ul>
                                </div>
                            
                            </div>
                            <div className='group relative flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                
                                Laptops <FaAngleDown />
                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-56 bg-white text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-white  rounded-lg'>
                                    {
                                            allcategories[1].subcategories.map(subcategory => (
                                                <li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2'>{subcategory.name}</li>
                                            ))

                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className='group relative flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                Smartphone <FaAngleDown />

                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-56 bg-white text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-white  rounded-lg'>
                                    {
                                            allcategories[3].subcategories.map(subcategory => (
                                                <li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2'>{subcategory.name}</li>
                                            ))

                                        }
                                    </ul>
                                </div>
                            
                            </div>
                            <div className='group relative flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                
                                Tablet <FaAngleDown />
                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-56 bg-white text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-white  rounded-lg'>
                                    {
                                            allcategories[4].subcategories.map(subcategory => (
                                                <li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2'>{subcategory.name}</li>
                                            ))

                                        }
                                    </ul>
                                </div>
                            </div>
                            <p className='group relative flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                
                                Camera <FaAngleDown />
                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-56 bg-white text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-white  rounded-lg'>
                                    {
                                            allcategories[5].subcategories.map(subcategory => (
                                                <li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2'>{subcategory.name}</li>
                                            ))

                                        }
                                    </ul>
                                </div>
                            </p>
                            <p className='group relative flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                
                                Gadgets & Accessories <FaAngleDown />

                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-56 bg-white text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-white  rounded-lg'>
                                    {
                                            allcategories[10].subcategories.map(subcategory => (
                                                <li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2'>{subcategory.name}</li>
                                            ))

                                        }
                                    </ul>
                                </div>
                            </p>
                            <div className='group relative flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                
                                TV <FaAngleDown/>
                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-56 bg-white text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-white  rounded-lg'>
                                    {
                                            allcategories[7].subcategories.map(subcategory => (
                                                <li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2'>{subcategory.name}</li>
                                            ))

                                        }
                                    </ul>
                                </div>
                            </div>
                            <p className='group relative flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                
                                AC <FaAngleDown />
                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-56 bg-white text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-white  rounded-lg'>
                                    {
                                            allcategories[8].subcategories.map(subcategory => (
                                                <li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2'>{subcategory.name}</li>
                                            ))

                                        }
                                    </ul>
                                </div>
                            
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;