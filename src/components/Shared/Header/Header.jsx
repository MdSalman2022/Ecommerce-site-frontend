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
import { TbTruckDelivery } from 'react-icons/tb'
import {RxDashboard} from 'react-icons/rx'
import {FaAngleDown} from 'react-icons/fa'   

const Header = () => {
    const navigate = useNavigate();
    const { user, logOut,cart } = useContext(AuthContext)
    let { searchText, setSearchText, searchedItems,setSearchedItems , loading } = useContext(AuthContext)

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





    const [options, setOptions] = useState(0)
    const [subOptions, setSubOptions] = useState(0)

    const handleOptions = id => {
        setOptions(id)
    }
    const handleSubOptions = id => {
        setSubOptions(id)
    }

    const allcategories = [
        {
            id: 1,
            name: 'Desktop Components',
            cat:'components', 
            subcategories: [
                {
                    id: 1,
                    name: 'Processor',
                    subcat:'processor',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Intel',
                            brand:'intel',
                        },
                        {
                            id: 2,
                            name: 'AMD',
                            brand:'amd',
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Motherboard',
                    subcat:'motherboard',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Gigabyte',
                            brand:'gigabyte',
                        },
                        {
                            id: 2,
                            name: 'Asus',
                            brand:'asus',
                        },
                        {
                            id: 3,
                            name: 'MSI',
                            brand:'msi',
                        },
                    ]
                },
                {
                    id: 3,
                    name: 'Ram',
                    subcat: 'ram',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Corsair',
                            brand:'corsair',
                        },
                        {
                            id: 2,
                            name: 'G.Skill',
                            brand:'gskill',
                        },
                    ]
                },
                {
                    id: 4,
                    name: 'Graphics Card',
                    subcat:'graphics-card',
                    subcategories: [
                                {
                                    id: 1,
                                    name: 'Asus',
                                    brand:'asus',
                                },
                                {
                                    id: 2,
                                    name: 'Zotac',
                                    brand:'zotac',
                                },
                                {
                                    id: 3,
                                    name: 'Sapphire',
                                    brand:'sapphire',
                                }
                            ] 
                },
                {
                    id: 5,
                    name: 'Power Supply',
                    subcat:'psu',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Corsair',
                            brand:'corsair',
                        },
                    ]
                },
                {
                    id: 6,
                    name: 'Storage',
                    subcat:'storage',
                    subcategories: [
                        {
                            id: 1,
                            name: 'SSD',
                            type: 'ssd',
                            subcategories: [
                                {
                                    id: 1,
                                    name: 'Samsung',
                                    brand:'samsung',
                                }, 
                            ]
                        },
                        {
                            id: 2,
                            name: 'HDD',
                            type: 'hdd',
                            subcategories: [
                                {
                                    id: 1,
                                    name: 'Seagate',
                                    brand:'seagate',
                                },
                                {
                                    id: 2,
                                    name: 'Western Digital',
                                    brand:'wd',
                                },
                            ]
                        }
                
                    ]
                },
                {
                    id: 7,
                    name: 'CPU Cooler',
                    subcat: 'cooler',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Corsair',
                            brand: 'corsair',
                        }
                    ]
                },
                {
                    id: 8,
                    name: 'Case',
                    subcat: 'case',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Lian LI',
                            brand: 'lianli',

                        }
                    ]
                }
            ]
        },   
        {
            id: 2,
            name: 'Laptops',
            cat: 'laptop',
            subcategories: [
                {
                    id: 1,
                    name: 'Asus',
                    brand: 'asus',
                },
                {
                    id: 2,
                    name: 'Hp',
                    brand: 'hp',
                },
                {
                    id: 3,
                    name: 'MSI',
                    brand: 'msi',
                }
            ]

        },
        {
            id: 3,
            name: 'Monitors',
            cat: 'monitor',
            subcategories: [
                {
                    id: 1,
                    name: 'Asus',
                    brand: 'asus',
                },
                {
                    id: 2,
                    name: 'Hp',
                    brand: 'hp',
                },
                {
                    id: 3,
                    name: 'MSI',
                    brand: 'msi',
                }
            ]
        },
        {
            id: 4,
            name: 'Smartphone',
            cat: 'smartphone',
            subcategories: [
                {
                    id: 1,
                    name: 'Samsung',
                    brand: 'samsung',
                },
                {
                    id: 2,
                    name: 'Apple',
                    brand: 'apple',
                },
                {
                    id: 3,
                    name: 'Xiaomi',
                    brand: 'xiaomi',
                }
            ]
        },
        {
            id: 5,
            name: 'Tablets',
            cat: 'tablet',
            subcategories: [
                {
                    id: 1,
                    name: 'Samsung',
                    brand: 'samsung',
                },
                {
                    id: 2,
                    name: 'Apple',
                    brand: 'apple',
                }
            ]
        },
        {
            id: 6,
            name: 'Camera',
            cat: 'camera',
            subcategories: [
                {
                    id: 1,
                    name: 'Canon',
                    brand: 'canon',
                },
                {
                    id: 2,
                    name: 'Nikon',
                    brand: 'nikon',
                }
            ]
        },
        {
            id: 7,
            name: 'Consoles',
            cat: 'console',
            subcategories: [
                {
                    id: 1,
                    name: 'Playstation',
                    brand: 'sony',
                },
                {
                    id: 2,
                    name: 'Xbox',
                    brand: 'microsoft',
                }
            ]
        },
        {
            id: 8,
            name: 'TV',
            cat: 'tv',
            subcategories: [
                {
                    id: 1,
                    name: 'Xiaomi',
                    brand: 'xiaomi',

                },
                {
                    id: 2,
                    name: 'Sony',
                    brand: 'sony',
                }
            ]
        },
        {
            id: 9,
            name: 'Accessories',
            cat: 'accessories',
            subcategories: [
                {
                    id: 1,
                    name: 'Headphones',
                    type: 'headphone',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Logitech',
                            brand: 'logitech',
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Mouse',
                    type: 'mouse',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Razer',
                            brand: 'razer',
                        }   
                    ]
                },
                {
                    id: 3,
                    name: 'Keyboard',
                    type: 'keyboard',
                    subcategories: [
                        {
                            id: 1,
                            name: 'Corsair',
                            brand: 'corsair',
                        }   
                    ]
                }
            ]
        },

    ]
 
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 150) { 
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
            {/* top header  */}
            <div className={`hidden h-8 md:grid grid-cols-3 container mx-auto lg:gap-80 text-sm place-items-center  bg-base-100 `}>
                <div className='flex gap-5'>
                    <Link to="/" className='flex items-center gap-2'><BiHomeAlt/> Home</Link>
                    <p className='flex items-center gap-2'><BsFillPersonFill/> About Us</p>
                    <p className='flex items-center gap-2'><BiMessageMinus/> Contact</p>
                    {/* <p><FaQuestion/> FAQ</p> */}
                </div>
                
                <div className='flex gap-5 '>
                    <p className='flex items-center gap-2'><IoLanguage/> English</p>
                    <p>$ US Dollar</p>
                </div>

                <div className='flex gap-5 border-l pl-3 '>
                    <Link to="/dashboard" className='transition-all duration-300 flex items-center gap-2 hover:text-primary'><RxDashboard/> Dashboard</Link>
                    <p className='flex items-center gap-2'><TbTruckDelivery/> Delivery</p>
                </div>

            </div>

            {/* Primary Header  */}
            <div className={`hidden md:flex border-t  `}>
                <div className="container mx-auto grid grid-cols-4 md:justify-items-center lg:justify-items-stretch gap-10 lg:grid-cols-5  py-5">
                    <div className=" col-span-1 logo hidden md:flex items-center">
                        <Link to='/' className=" ">
                            {/* <LazyLoadImage src="https://i.ibb.co/vd3xm6V/boipaben-final.png" className='w-16' alt="logo" border="0" /> */}
                            <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 flex items-center gap-1"><img className='w-10' src="https://i.ibb.co/xSLpY24/logo-colored.webp" alt="logo" />BestDeal</h1>
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="pl-3 lg:pl-0 w-full search col-span-3">
                        <div className="input-group">
                            <input defaultValue={searchText} type="text" placeholder="Search..." className="input input-bordered border-primary w-full"  {...register("name", { required: true, maxLength: 80 })} />
                            <button type="submit" className='bg-primary text-base-100 font-bold px-3 text-2xl'><AiOutlineSearch /></button>
                        </div>
                    </form>
                    <div className='flex md:text-2xl lg:text-3xl gap-5 lg:justify-end items-center col-span-1'>
                        {/* <p className='cursor-pointer rounded-full border p-1 hover:bg-primary hover:text-base-100 transition-all duration-300 ease-in-out'><BsPerson  className='p-1'/></p>  */}
                        
                        
                        {
                            user ?
                                <div className="flex items-center gap-4">
                                    <div className="flex    ">
                                        <label className='text-sm text-right'>{user.displayName}</label>   
                                    </div>
                                    {
                                        user.photoURL ?
                                            
                                            <div className="dropdown dropdown-end">
                                                <label tabIndex={0} className="btn btn-sm btn-ghost border border-gray-200 mb-1 cursor-pointer rounded-full h-10 w-10 p-0  "><img src={user.photoURL} alt="" className='w-10 rounded-full' /></label>
                                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-sm gap-1">
                                                    <li ><Link to="/orderhistory">Order History</Link></li>
                                                    <li onClick={handleLogOut}><a href="#">Logout</a></li>
                                                </ul>
                                            </div>
                                            :
                                            <div className="dropdown dropdown-end">
                                                <label tabIndex={0} className="btn btn-sm btn-ghost border border-gray-200 mb-1 cursor-pointer rounded-full h-10 w-10 p-0 text-2xl hover:bg-primary hover:border-none hover:text-base-100 transition-all duration-300 ease-in-out"><BsPerson/></label>
                                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-sm gap-1">
                                                    <li ><Link to="/orderhistory">Order History</Link></li>
                                                    <li onClick={handleLogOut}><a href="#">Logout</a></li>
                                                </ul>
                                            </div>
                                    }
                                </div>
                                
                                :
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-sm btn-ghost border border-gray-200 mb-1 cursor-pointer rounded-full h-10 w-10 p-0 text-2xl hover:bg-primary hover:border-none hover:text-base-100 transition-all duration-300 ease-in-out"><BsPerson/></label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-sm gap-1">
                                        <li><Link to="/login">Login</Link></li>
                                        <li><Link to="/register">Signup</Link></li>
                                    </ul>
                                </div>

                        }
                      
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-sm btn-ghost border border-gray-200 mb-1 cursor-pointer rounded-full h-10 w-10 p-0 text-2xl hover:bg-primary hover:border-none hover:text-base-100 transition-all duration-300 ease-in-out"><IoNotificationsOutline /></label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-sm gap-1">
                                <li><Link to="/laptop" className='text-sm bg-accent'>
                                    <div className='flex flex-col'>
                                        <p><span className='text-red-500'>30% </span> discount on <span className='text-secondary font-bold p-0'>Laptops</span>  </p>
                                        <span className='text-xs '>1 hour</span>
                                    </div>
                                </Link></li>
                                <li><Link to="/laptop" className='text-sm  bg-accent'>
                                    <div className='flex flex-col'>
                                        <p><span className='text-red-500'>50% </span> discount on <span className='text-secondary font-bold p-0'>Accessories</span>  </p>
                                        <span className='text-xs '>2 hour</span>
                                    </div>
                                </Link></li>
                            </ul>
                        </div>
                        <Link to="/cart">
                            <div className='rounded-full border p-1 hover:bg-primary hover:text-base-100 transition-all duration-300 ease-in-out relative'>
                                <BsBag className='cursor-pointer  p-1' />
                                {cart && <div className="absolute -top-1 -right-2  text-sm bg-green-500 text-base-100 rounded-full border border-primary w-5 h-5 flex items-center justify-center">{cart.length}</div>}
                            </div>
                        </Link>
                        {/* <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-sm btn-ghost border border-gray-200 mb-1 cursor-pointer rounded-full h-10 w-10 p-0 text-2xl hover:bg-primary hover:border-none hover:text-base-100 transition-all duration-300 ease-in-out"><BsPerson/></label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-sm gap-1">
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Signup</Link></li>
                            </ul>
                        </div> */}
 
                    </div>
                </div>
            </div>


            {/* Category Header  */}


            <div className={`hidden md:flex md:flex-wrap py-4  border-y bg-base-100 w-full  ${isFixed ? 'transition-all duration-300 z-50 fixed top-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80' : ''}`}>
                <div className='container mx-auto'>
                    <div className="flex justify-between md:gap-2 lg:gap-0">
                        <div className='relative group'>
                            <p className='flex gap-2 justify-center items-center p-3 bg-primary text-base-100 lg:   w-44 rounded-full '>All Categories <FaAngleDown /> </p>
                            <div className="hidden group-hover:flex group-hover:flex-col absolute z-50  py-5 lg:w-56  top-12 h-full ">
                                <ul className='space-y-2 bg-base-100 z-50 rounded-lg shadow'>
                                    {
                                        allcategories.map((category, index) => (
                                            <li key={index} onMouseEnter={()=>handleOptions(category.id)} onMouseLeave={()=>handleOptions(0)} className='transition-all duration-300 cursor-pointer hover:text-base-100 rounded-lg hover:bg-primary font-semibold border-b p-2 flex items-start relative'>
                                                <Link to={`/${category.cat}`}><span className='flex items-center'>{category.name} &nbsp; <FaAngleRight /></span></Link>
                                                    <div className={`w-48 absolute -right-44 top-0  px-5 py-0  ${options=== category.id ? '' : 'hidden'}`}>
                                                        <div className='text-neutral hover:text-primary transition-all duration-300 bg-base-100 rounded-lg'>{
                                                            category.subcategories.map((subcategory,index) => ( 
                                                                <Link key={index}
                                                                    onMouseEnter={() => handleSubOptions(subcategory.id)}
                                                                    onMouseLeave={() => handleSubOptions(0)}
                                                                    className='p-2 pl-2 transition-all duration-300 text-neutral hover:text-base-100 hover:bg-primary  border-b rounded-lg flex items-start relative'
                                                                    to={`/${category.cat}/${subcategory.subcat ? subcategory.subcat : subcategory.brand ? subcategory.brand : subcategory.type}`}>
                                                                    <span className='flex items-center'>
                                                                        {subcategory.name} &nbsp; <FaAngleRight />
                                                                    </span>
                                                          
                                                                    { subcategory.subcategories &&
                                                                        <div className={`w-48 absolute -right-44 top-0 px-5 py-0 rounded-lg ${subOptions === subcategory.id ? '' : 'hidden'}`}>
                                                                        <ul className='space-y-5 bg-base-100 rounded-lg'>
                                                                            {
                                                                                subcategory?.subcategories?.map((s,index) => (
                                                                                    <Link key={index} className='' to={`/${category.cat}/${subcategory.subcat ? subcategory.subcat : subcategory.type}/${s.brand ? s.brand : s.type}`}>
                                                                                        <li className='transition-all duration-300 text-neutral hover:text-base-100 hover:bg-primary py-2 pr-5 pl-2 border-b rounded-lg'>
                                                                                        { s.name}
                                                                                        </li>
                                                                                    </Link>
                                                                                ) )
                                                                            }
                                                                            </ul> 
                                                                        </div>
                                                                    }
                                                                </Link> 
                                                                
                                                            ))
                                                        }</div> 
                                                    </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <div className={`relative group flex gap-1 justify-center items-center transition-all duration-300 text-primary bg-accent hover:text-primary  w-32 cursor-pointer text-sm font-semibold rounded-full ${isFixed && 'border-primary border'}`}>
                                
                                <Link to="/monitor" className='flex items-center gap-2 p-2'>Monitor <FaAngleDown /></Link>

                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-40 bg-base-100 text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-base-100  rounded-lg shadow'>
                                        {
                                            allcategories[2].subcategories.map((subcategory, index) => (
                                                <Link key={index} to={`/monitor/${subcategory.brand}`}><li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2 '>{subcategory.name}</li></Link>
                                            ))

                                        }
                                    </ul>
                                </div>
                            
                            </div>
                            <div className='group relative flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                
                                <Link to="/laptop" className='flex items-center gap-2 p-2'>Laptops <FaAngleDown /></Link>

                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-40 bg-base-100 text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-base-100  rounded-lg shadow'>
                                    {
                                            allcategories[1].subcategories.map((subcategory,index) => (
                                                <Link key={index} to={`/laptop/${subcategory.brand}`}><li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2 '>{subcategory.name}</li></Link>
                                            ))

                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className='group relative flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                
                                <Link to="/smartphone" className='flex items-center gap-2 p-2'>Smartphone <FaAngleDown /></Link>

                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-40 bg-base-100 text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-base-100  rounded-lg shadow'>
                                    {
                                            allcategories[3].subcategories.map((subcategory,index) => (
                                                <Link key={index} to={`/smartphone/${subcategory.brand}`}><li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2 '>{subcategory.name}</li></Link>
 
                                            ))

                                        }
                                    </ul>
                                </div>
                            
                            </div>
                            <div className='group relative flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                 
                                <Link to="/tablet" className='flex items-center gap-2 p-2'>Tablet <FaAngleDown /></Link>
                                
                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-40 bg-base-100 text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-base-100  rounded-lg shadow'>
                                    {
                                            allcategories[4].subcategories.map((subcategory,index) => (
                                                <Link key={index} to={`/tablet/${subcategory.brand}`}><li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2 '>{subcategory.name}</li></Link>
                                            ))

                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className='group relative flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                 
                                <Link to="/camera" className='flex items-center gap-2 p-2'>Camera <FaAngleDown /></Link>

                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-40 bg-base-100 text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-base-100  rounded-lg shadow'>
                                    {
                                            allcategories[5].subcategories.map((subcategory, index) => (
                                                <Link key={index} to={`/camera/${subcategory.brand}`}><li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2 '>{subcategory.name}</li></Link>
 
                                            ))

                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className='group relative flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                 
                                <Link to="/accessories" className='flex items-center gap-2 p-2'>Accessories <FaAngleDown /></Link>

                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-40 bg-base-100 text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-base-100  rounded-lg shadow'>
                                        {
                                            allcategories[8].subcategories.map((subcategory, index) => (
                                                <Link key={index} to={`/accessories/${subcategory.type}`}><li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2 '>{subcategory.name}</li></Link>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className='group relative flex gap-1 justify-center items-center transition-all duration-300 text-neutral hover:bg-accent hover:text-primary w-32 cursor-pointer text-sm font-semibold rounded-full'>
                                 
                                <Link to="/tv" className='flex items-center gap-2 p-2'>TV <FaAngleDown /></Link>
                                
                                <div className="absolute top-12 left-0 hidden group-hover:flex group-hover:flex-col  z-50  py-5 w-40 bg-base-100 text-neutral rounded-lg h-full">
                                    <ul className='space-y-2 bg-base-100  rounded-lg shadow'>
                                    {
                                            allcategories[7].subcategories.map((subcategory, index) => (
                                                <Link key={index} to={`/tv/${subcategory.brand}`}><li className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold p-2 '>{subcategory.name}</li></Link>
                                            ))

                                        }
                                    </ul>
                                </div>
                            </div> 
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;