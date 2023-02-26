import React, { useState } from 'react'
import {BsThreeDots} from 'react-icons/bs' 
import {FaArrowUp} from 'react-icons/fa' 
import AreaCharts from './AreaCharts';


function Dashboard() {

   

    return (
        <div className='py-10'>
            <h1 className='text-3xl font-bold pb-5'>Overview</h1>
            <div className="flex flex-col gap-5">
                <div className='grid grid-cols-3 gap-5'>
                    <div className="stats shadow">  
                        <div className="stat">
                            <div className="stat-title">Todays Sales</div>
                            <div className="stat-value">$2550</div>
                            <div className="stat-desc">We have sold 123 items</div>
                        </div>                
                    </div>
                    <div className="stats shadow">  
                        <div className="stat">
                            <div className="stat-title">Todays Revenue</div>
                            <div className="stat-value">$1550</div>
                            <div className="stat-desc">Available to payout</div>
                        </div>                
                    </div>
                    <div className="stats shadow">  
                        <div className="stat">
                            <div className="stat-title">Todays Orders</div>
                            <div className="stat-value">16</div>
                        </div>                
                    </div>                
                </div>
                <div className='grid grid-cols-3 gap-5'>

                    <div className="stats shadow col-span-2">  
                        <div className="stat">
                            <div className="stat-title">Total Revenue</div>
                                <div className="flex items-center gap-2">
                                    <div className="text-2xl font-bold">$75000</div>
                                    <div className="stat-desc text-success flex items-center"><FaArrowUp/> 5% than last month</div>
                                </div>
                         
                            <AreaCharts/>
                        </div>                
                    </div>
                    <div className="stats shadow">  
                        <div className="stat">
                            <div className="stat-title">Most Sold Items</div>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col">
                                    <div className='flex justify-between'>
                                        <span>Components</span>
                                        <span>85%</span>
                                   </div>
                                    <progress className="progress progress-primary w-full" value="85" max="100"></progress>
                                </div>
                                <div className="flex flex-col">
                                    <div className='flex justify-between'>
                                        <span>Desktop</span>
                                        <span>70%</span>
                                   </div>
                                    <progress className="progress progress-primary w-full" value="70" max="100"></progress>
                                </div>
                                <div className="flex flex-col">
                                    <div className='flex justify-between'>
                                        <span>Smartphone</span>
                                        <span>60%</span>
                                   </div>
                                    <progress className="progress progress-primary w-full" value="60" max="100"></progress>
                                </div>
                                <div className="flex flex-col">
                                    <div className='flex justify-between'>
                                        <span>Laptops</span>
                                        <span>55%</span>
                                   </div>
                                    <progress className="progress progress-primary w-full" value="55" max="100"></progress>
                                </div>
                                <div className="flex flex-col">
                                    <div className='flex justify-between'>
                                        <span>Accessories</span>
                                        <span>52%</span>
                                   </div>
                                    <progress className="progress progress-primary w-full" value="52" max="100"></progress>
                                </div>
                                <div className="flex flex-col">
                                    <div className='flex justify-between'>
                                        <span>TV</span>
                                        <span>45%</span>
                                   </div>
                                    <progress className="progress progress-primary w-full" value="45" max="100"></progress>
                                </div>                                
                                <div className="flex flex-col">
                                    <div className='flex justify-between'>
                                        <span>Camera</span>
                                        <span>30%</span>
                                   </div>
                                    <progress className="progress progress-primary w-full" value="30" max="100"></progress>
                                </div>
                              
                                <div className="flex flex-col">
                                    <div className='flex justify-between'>
                                        <span>Tablet</span>
                                        <span>20%</span>
                                   </div>
                                    <progress className="progress progress-primary w-full" value="20" max="100"></progress>
                                </div>
                            </div>
                        </div>                
                    </div>      
                    
                </div>
                <div className="grid grid-cols-3 gap-5 bg-white p-5 rounded-2xl shadow">
                    <div className="overflow-x-auto col-span-3">
                        <p className='text-xl font-bold'>Latest Orders</p>
                            <table className="table w-full rounded-xl">

                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Products</th>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Customer Name</th>
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
                                        <td>Delivered</td>
                                        <td>$1150.00</td>
                                        <td><button className='btn btn-ghost text-2xl'><BsThreeDots/></button></td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
