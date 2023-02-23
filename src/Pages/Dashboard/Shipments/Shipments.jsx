import React, { useContext, useState } from 'react'
import { BsThreeDots,BsCart4,BsQuestionCircle } from 'react-icons/bs'
import { TbFileInvoice } from 'react-icons/tb'
import { MdDoneAll } from 'react-icons/md'
import { BiError } from 'react-icons/bi'
import { HiOutlineMail, HiSortAscending } from 'react-icons/hi'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider'
import { FaAngleDown } from 'react-icons/fa';

function Shipments() {

    const { orders } = useContext(AuthContext)
    
    let productsPerPage;
      //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)
   
      const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    productsPerPage = orders.slice(indexOfFirstPost, indexOfLastPost)
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
  
    const pageNumbers = []
  
    for (let i = 1; i <= Math.ceil(orders.length / postsPerPage); i++) {
        pageNumbers.push(i) 
    }  

    const [sortType, setSortType] = useState('');

    const handleSortTypeChange = data => {
        console.log(data)
        setSortType(data);
    };
    

    const handlePostsPerPage = (e) => {
        setPostsPerPage(e.target.value);
    };

    
    const sortedItems = () => {
        switch (sortType) { 
        case 'latest':
            return productsPerPage.sort((a, b) => new Date(b.date) - new Date(a.date))
        case 'old':
            return productsPerPage.sort((a, b) => new Date(a.date) - new Date(b.date))
        default:
            return productsPerPage;
        }}; 



    return (
        <div>
        <div className='grid grid-cols-4 gap-5 py-10'>
                <div className="flex items-center gap-5 justify-center bg-white shadow w-full h-32 rounded-3xl">  
                        <BsCart4 className='text-5xl p-2 h-14 w-14 rounded-xl bg-primary bg-opacity-10 text-primary'/>
                        <div className="text-lg">Orders</div>
                        <div className="text-2xl font-bold">150</div>
                </div>        
                <div className="flex items-center gap-5 justify-center bg-white shadow w-full h-32 rounded-3xl">  
                        <TbFileInvoice className='text-5xl p-2 h-14 w-14 rounded-xl bg-primary bg-opacity-10 text-primary'/>
                        <div className="text-lg">Invoice Delivered</div>
                        <div className="text-2xl font-bold">145</div>
                </div>        
                <div className="flex items-center gap-5 justify-center bg-white shadow w-full h-32 rounded-3xl">  
                        <MdDoneAll className='text-5xl p-2 h-14 w-14 rounded-xl bg-[#2ED6A3] bg-opacity-10 text-[#2ED67B] '/>
                        <div className="text-lg">Invoice Sent</div>
                        <div className="text-2xl font-bold">145</div>
                </div>        
                <div className="flex items-center gap-5 justify-center bg-white shadow w-full h-32 rounded-3xl">  
                        <BiError className='text-5xl p-2 h-14 w-14 rounded-xl bg-[#FF844B] bg-opacity-10 text-[#FF844B]'/>
                        <div className="text-lg">Invoice Issues</div>
                        <div className="text-2xl font-bold">5</div>
                </div>        
            </div>
            <div className='w-full flex justify-end items-center gap-3'>
                <div className='dropdown dropdown-end'>
                    <button className='btn btn-secondary btn-outline text-sm normal-case  font-medium '>
                       <span className='flex items-center gap-2'>Options <FaAngleDown className='text-xl'/> </span>
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu p-2 mt-1 shadow bg-base-100 rounded-box w-52">
                        <li><a>Delete</a></li>
                        <li><a>Delivered</a></li>
                        <li><a>Picked</a></li>
                        <li><a>Canceled</a></li>
                    </ul>
                </div>
                    <select onChange={handlePostsPerPage} className="select w-20 select-bordered max-w-xs btn btn-secondary btn-outline">
                        <option value={5} selected>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-square btn-secondary btn-outline text-xl m-1"><HiSortAscending/></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"> 
                            <li onClick={()=> handleSortTypeChange('latest')}><a>Latest</a></li> 
                            <li onClick={()=> handleSortTypeChange('old')}><a>Old</a></li> 
                        </ul>
                    </div>
                </div>
            <div className="grid grid-cols-3 gap-5 bg-white p-5 rounded-2xl shadow">
                <div className="overflow-x-auto col-span-3"> 
                        <table className="table w-full  rounded-xl">

                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Customer Name</th>
                                    <th>Contact</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                        
                            <tbody>                                
                                
                            {sortType === '' &&
                                orders.map((order, index) => (
                                    <tr className='text-neutral' key={index} >
                                        <th><input type="checkbox" class="appearance- checked:bg-primary" /></th>
                                        <th>{index+1}</th>
                                        <td>#{order._id}</td>
                                        <td>{order.date}</td>
                                        <td>{order.userInfo.name}</td>
                                        <td><p className='flex items-center gap-5'><HiOutlineMail className='text-2xl' />{order.email}</p></td>
                                        <td className='font-bold text-primary'>{order.userInfo.address},{order.userInfo.city}</td>
                                        <td><div className={`btn border-none bg-opacity-10 flex gap-2 w-40 ${order.orderStatus ? order.shipment === 'delivered' && 'bg-[#2ED6A3] text-[#2ED67B]' || order.shipment === 'picked' && 'bg-[#FF844B] text-[#FF844B]' : 'bg-[#FF606B] text-[#FF606B]'} `}><BsQuestionCircle className='text-2xl capitalize' />{order.orderStatus ? order.shipment : 'Canceled'}</div></td>
                                        {/* <td className='dropdown dropdown-end'>
                                            <button className='btn btn-ghost text-2xl'>
                                                <BsThreeDots />
                                            </button>
                                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><a>Delete</a></li>
                                                <li><a>Edit</a></li>
                                                <li><a>Delivered</a></li>
                                                <li><a>Picked</a></li>
                                                <li><a>Canceled</a></li>
                                            </ul>
                                        </td> */}
                                    </tr>
                                ))
                            }
                                
                            {sortType !== '' &&
                                sortedItems().map((order, index) => (
                                    <tr className='text-neutral' key={index} >
                                        <th><input type="checkbox" class="appearance- checked:bg-primary" /></th>
                                        <th>{index+1}</th>
                                        <td>#{order._id}</td>
                                        <td>{order.date}</td>
                                        <td>{order.userInfo.name}</td>
                                        <td><p className='flex items-center gap-5'><HiOutlineMail className='text-2xl' />{order.email}</p></td>
                                        <td className='font-bold text-primary'>{order.userInfo.address},{order.userInfo.city}</td>
                                        <td><div className={`btn border-none bg-opacity-10 flex gap-2 w-40 ${order.orderStatus ? order.shipment === 'delivered' && 'bg-[#2ED6A3] text-[#2ED67B]' || order.shipment === 'picked' && 'bg-[#FF844B] text-[#FF844B]' : 'bg-[#FF606B] text-[#FF606B]'} `}><BsQuestionCircle className='text-2xl capitalize' />{order.orderStatus ? order.shipment : 'Canceled'}</div></td>
                                        {/* <td className='dropdown dropdown-end'>
                                            <button className='btn btn-ghost text-2xl'>
                                                <BsThreeDots />
                                            </button>
                                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><a>Delete</a></li>
                                                <li><a>Edit</a></li>
                                                <li><a>Delivered</a></li>
                                                <li><a>Picked</a></li>
                                                <li><a>Canceled</a></li>
                                            </ul>
                                        </td> */}
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                </div>
                <div className="col-span-3 flex justify-center">
                <div className="btn-group items-center">                   
                    { pageNumbers.length > 1 &&
                        pageNumbers.map((number, index) => (
                            <button key={index} onClick={() => paginate(number)} className={`btn btn-neutral hover:btn-primary ${currentPage === number && 'btn-active'}`}>{number}</button>
                        ))
                    }

                    
                </div>
            </div>
            </div>
    </div>
    )
}

export default Shipments
