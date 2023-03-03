import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { FaAngleRight, FaExchangeAlt,FaSearch } from 'react-icons/fa'
import { HiBars3BottomLeft } from 'react-icons/hi2'
import { IoIosNotificationsOutline } from 'react-icons/io'
import {BsBag} from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai';


const MobileHeader = ({ children }) => {


    const navigate = useNavigate();
    let { searchText, setSearchText,cart,searchResult, searchedItems,setSearchedItems , loading } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [isOpen, setIsOpen] = useState(false);
    
    const onSubmit = data => {
        setIsOpen(!isOpen);
        setSearchText(data.name);
        if (data.name === " ") {
            navigate(`/`)
        }
        else { data.name ? navigate(`/search/${data.name}`) : navigate(`/`) }

        console.log(errors);
    }

    const handleSearch = event => {
        event.preventDefault()
        const search = event.target.value;
        console.log(search)
        setSearchText(search);        
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

    
    const handleSearchBox = () =>{
        setIsOpen(!isOpen);
    }



  return (
    <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content"> 
           <div className="navbar bg-base-100">
                <div className="navbar-start">
                        <label htmlFor="my-drawer" tabIndex={0} className="btn btn-ghost drawer-button btn-circle text-2xl">
                            <HiBars3BottomLeft/>
                        </label>
                </div>
                <div className="navbar-center">
                    <Link to="/" className="btn btn-ghost normal-case text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 flex gap-2"><img className='w-5' src="https://i.ibb.co/xSLpY24/logo-colored.webp" alt="logo"  />BestDeal</Link>
                </div>
                <div className="navbar-end">
                    <button onClick={handleSearchBox} className="btn btn-ghost btn-circle">
                  {/*search*/}<FaSearch className='text-xl'/>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                    <Link to="/cart">
                            <div className='rounded-full border p-1 hover:bg-primary hover:text-base-100 transition-all duration-300 ease-in-out relative'>
                                <BsBag className='text-xl p-0 md:p-1' />
                                {cart && <div className="absolute -top-1 -right-2  text-sm bg-green-500 text-base-100 rounded-full border border-primary w-3 h-3 p-2 flex items-center justify-center">{cart.length}</div>}
                            </div>
                        </Link>
                    </button>
                </div>
              </div>
              {/* search box  */}
                    <div className={`absolute z-50 top-16 left-0 flex md:hidden ${isOpen ? 'flex' : 'hidden'}`}>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-screen px-2">
                            <div onChange={handleSearch} className="input-group">
                                <input defaultValue={searchText} autoComplete="off" type="text" placeholder="Search..." className="input input-bordered border-primary w-full"  {...register("name", { required: true, maxLength: 80 })} />
                                <button type="submit" className='bg-primary text-base-100 font-bold px-2 text-2xl'><AiOutlineSearch /></button>
                            </div>
                            <ul className='absolute bg-white z-50 w-96 shadow-xl rounded-lg'>
                                
                                {searchResult.length > 0 &&
                                searchResult.slice(0,4).map((item, index) => (
                                        <li className='cursor-pointer text-neutral hover:bg-accent p-1 transition-all duration-300 ease-in-out flex items-center gap-2' key={index}>
                                            <img src={item.image} alt="" className='w-20'/>
                                            <div className='flex flex-col'>
                                                <Link to={`/productDetails/${item._id}/${encodeURIComponent(item.name).replace(/%20/g, "-")}`} className='text-primary'>{item.name}</Link>
                                                <p>${item.price}</p>
                                            </div>
                                        </li>
                                ))
                                }
                            { searchResult.length > 0 && <Link to={`/search/${searchText}`} className='flex items-center justify-center p-2 rounded-b-lg text-white bg-secondary'>See all results</Link>}
                            
                            </ul>
                        </form>
                    </div>
                {children}
    {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-72 bg-base-100 text-base-content"> 
                {
                        allcategories.map((category, index) => (
                            <li key={index} onMouseEnter={()=>handleOptions(category.id)} onMouseLeave={()=>handleOptions(0)} className='transition-all duration-300 cursor-pointer hover:text-primary font-semibold border-b p-2 flex flex-col '>
                                <Link to={`/${category.cat}`}><span className='flex items-center'>{category.name} &nbsp; <FaAngleRight /></span></Link>
                                    <div className={`flex flex-col items-start w-full bg-base-100 ${options=== category.id ? '' : 'hidden'}`}>
                                        <div className='w-full text-neutral hover:text-primary transition-all duration-300 bg-base-100 p-2  '>{
                                            category.subcategories.map((subcategory, index) => ( 
                                                <Link
                                                    key={index}
                                                    onMouseEnter={() => handleSubOptions(subcategory.id)}
                                                    onMouseLeave={() => handleSubOptions(0)}
                                                    className='bg-base-100 w-full p-3 transition-all duration-300 text-neutral flex flex-col '
                                                    to={`/${category.cat}/${subcategory.subcat ? subcategory.subcat : subcategory.brand ? subcategory.brand : subcategory.type}`}>
                                                    <span className=' flex items-center p-3 border-l-2'>
                                                        {subcategory.name} &nbsp; <FaAngleRight />
                                                    </span>
                                          
                                                    { subcategory.subcategories &&
                                                        <div className={`flex flex-col w-full px-5 py-0 p-2 ${subOptions === subcategory.id ? '' : 'hidden'}`}>
                                                        <ul className='space-y-5 bg-base-100  p-2 '>
                                                            {
                                                                subcategory?.subcategories?.map((s,index)=> (
                                                                    <Link key={index} className='' to={`/${category.cat}/${subcategory.subcat ? subcategory.subcat : subcategory.type}/${s.brand ? s.brand : s.type}`}>
                                                                        <li className='transition-all duration-300 text-neutral p-3 border-l-2 hover:bg-primary hover:text-base-100' >
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
    
  )
}

export default MobileHeader