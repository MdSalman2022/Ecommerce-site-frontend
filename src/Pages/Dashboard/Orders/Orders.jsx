import React from 'react'
import { BsThreeDots,BsCart4,BsQuestionCircle } from 'react-icons/bs'
import { TbFileInvoice } from 'react-icons/tb'
import { MdDoneAll } from 'react-icons/md'
import { BiError } from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi'

function Orders() {
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
                            <div className="text-lg">Invoice Completed</div>
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
        <div className="grid grid-cols-3 gap-5 bg-white p-5 rounded-2xl shadow">
                    <div className="overflow-x-auto col-span-3"> 
                            <table className="table w-full rounded-xl">

                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Product</th>
                                        <th>Order ID</th>
                                        <th>Customer Name</th>
                                        <th>Date</th>
                                        <th>Contact</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                            
                                <tbody>                                
                                    <tr className='text-black'>
                                        <th>1</th>
                                        <td>iPhone 14 Pro Max</td>
                                        <td>#11232</td>
                                        <td>Feb 18, 2023</td>
                                        <td>Arnab Rahman</td>
                                        <td><p className='flex items-center gap-5'><HiOutlineMail className='text-2xl'/> james@gmail.com</p></td>
                                        <td><div className="btn border-none bg-[#2ED6A3] bg-opacity-10 text-[#2ED67B] flex gap-2 w-40"><MdDoneAll className='text-2xl'/> Completed</div></td>
                                        <td className='font-bold text-primary'>$1150.00</td>
                                        <td className='dropdown dropdown-end'>
                                            <button className='btn btn-ghost text-2xl'>
                                                <BsThreeDots />
                                            </button>
                                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><a>Delete</a></li>
                                                <li><a>Edit</a></li>
                                                <li><a>Cancel</a></li>
                                                <li><a>Completed</a></li>
                                                <li><a>Pending</a></li>
                                                <li><a>Unpaid</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr className='text-black'>
                                        <th>1</th>
                                        <td>iPhone 14 Pro Max</td>
                                        <td>#11232</td>
                                        <td>Feb 18, 2023</td>
                                        <td>Arnab Rahman</td>
                                        <td><p className='flex items-center gap-5'><HiOutlineMail className='text-2xl'/> james@gmail.com</p></td>
                                        <td><div className="btn border-none bg-[#FF844B] bg-opacity-10 text-[#FF844B] flex gap-2 w-40"><BsQuestionCircle className='text-2xl'/> Pending</div></td>
                                        <td className='font-bold text-primary'>$1150.00</td>
                                        <td><button className='btn btn-ghost text-2xl'><BsThreeDots/></button></td>
                                    </tr>
                                    <tr className='text-black'>
                                        <th>1</th>
                                        <td>iPhone 14 Pro Max</td>
                                        <td>#11232</td>
                                        <td>Feb 18, 2023</td>
                                        <td>Arnab Rahman</td>
                                        <td><p className='flex items-center gap-5'><HiOutlineMail className='text-2xl'/> james@gmail.com</p></td>
                                        <td><div className="btn border-none bg-[#FF606B] bg-opacity-10 text-[#FF606B] flex gap-2 w-40"><BsQuestionCircle className='text-2xl'/> Unpaid</div></td>
                                        <td className='font-bold text-primary'>$1150.00</td>
                                        <td><button className='btn btn-ghost text-2xl'><BsThreeDots/></button></td>
                                    </tr>
                                    <tr className='text-black'>
                                        <th>1</th>
                                        <td>iPhone 14 Pro Max</td>
                                        <td>#11232</td>
                                        <td>Feb 18, 2023</td>
                                        <td>Arnab Rahman</td>
                                        <td><p className='flex items-center gap-5'><HiOutlineMail className='text-2xl'/> james@gmail.com</p></td>
                                        <td><div className="btn border-none bg-[#2ED6A3] bg-opacity-10 text-[#2ED67B] flex gap-2 w-40"><MdDoneAll className='text-2xl'/> Completed</div></td>
                                        <td className='font-bold text-primary'>$1150.00</td>
                                        <td><button className='btn btn-ghost text-2xl'><BsThreeDots/></button></td>
                                    </tr>
                                    <tr className='text-black'>
                                        <th>1</th>
                                        <td>iPhone 14 Pro Max</td>
                                        <td>#11232</td>
                                        <td>Feb 18, 2023</td>
                                        <td>Arnab Rahman</td>
                                        <td><p className='flex items-center gap-5'><HiOutlineMail className='text-2xl'/> james@gmail.com</p></td>
                                        <td><div className="btn border-none bg-[#2ED6A3] bg-opacity-10 text-[#2ED67B] flex gap-2 w-40"><MdDoneAll className='text-2xl'/> Completed</div></td>
                                        <td className='font-bold text-primary'>$1150.00</td>
                                        <td><button className='btn btn-ghost text-2xl'><BsThreeDots/></button></td>
                                    </tr>
                    
                                </tbody>
                            </table>
                    </div>
                </div>
        </div>
    )
}

export default Orders
