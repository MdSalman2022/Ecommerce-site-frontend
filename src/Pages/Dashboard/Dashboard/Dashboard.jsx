import React, { useState } from 'react'
import {BsThreeDots} from 'react-icons/bs' 
import {FaArrowUp} from 'react-icons/fa' 
import BarCharts from '../Statistics/BarCharts';
import PieCharts from '../Statistics/PieCharts';
import AreaCharts from './AreaCharts';
import { getAnalytics } from 'firebase/analytics';


function Dashboard() {

   

    return (
        <div className='py-10'>
            <h1 className='text-3xl font-bold pb-5'>Overview</h1>
            <div className="flex flex-col gap-5">
                <div className='grid grid-cols-3 gap-5'>
                    <div className="stats flex items-end shadow p-0">  
                        <div className="stat">
                            <div className="stat-title">Todays Sales</div>
                            <div className="stat-value">$2550</div>
                            <div className="stat-desc">We have sold 123 items</div>
                        </div>            
                        <span className='w-full flex flex-col scale-x-[-1] relative'>                                
                        <p className='absolute bottom-0 left-28 scale-x-[-1] text-white flex items-center gap-1 text-sm'>5% <FaArrowUp /></p>
                        <svg id="wave"  viewBox="0 0 1440 340" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(78, 122, 239, 0.7)" offset="0%"></stop><stop stop-color="rgba(78, 122, 239, 1)" offset="100%"></stop></linearGradient></defs><path   fill="url(#sw-gradient-0)" d="M0,204L24,215.3C48,227,96,249,144,260.7C192,272,240,272,288,260.7C336,249,384,227,432,198.3C480,170,528,136,576,107.7C624,79,672,57,720,51C768,45,816,57,864,96.3C912,136,960,204,1008,226.7C1056,249,1104,227,1152,187C1200,147,1248,91,1296,85C1344,79,1392,125,1440,158.7C1488,193,1536,215,1584,238C1632,261,1680,283,1728,294.7C1776,306,1824,306,1872,306C1920,306,1968,306,2016,272C2064,238,2112,170,2160,164.3C2208,159,2256,215,2304,204C2352,193,2400,113,2448,79.3C2496,45,2544,57,2592,68C2640,79,2688,91,2736,113.3C2784,136,2832,170,2880,192.7C2928,215,2976,227,3024,238C3072,249,3120,261,3168,255C3216,249,3264,227,3312,226.7C3360,227,3408,249,3432,260.7L3456,272L3456,340L3432,340C3408,340,3360,340,3312,340C3264,340,3216,340,3168,340C3120,340,3072,340,3024,340C2976,340,2928,340,2880,340C2832,340,2784,340,2736,340C2688,340,2640,340,2592,340C2544,340,2496,340,2448,340C2400,340,2352,340,2304,340C2256,340,2208,340,2160,340C2112,340,2064,340,2016,340C1968,340,1920,340,1872,340C1824,340,1776,340,1728,340C1680,340,1632,340,1584,340C1536,340,1488,340,1440,340C1392,340,1344,340,1296,340C1248,340,1200,340,1152,340C1104,340,1056,340,1008,340C960,340,912,340,864,340C816,340,768,340,720,340C672,340,624,340,576,340C528,340,480,340,432,340C384,340,336,340,288,340C240,340,192,340,144,340C96,340,48,340,24,340L0,340Z"></path></svg>
                        </span>
                    </div>
                    <div className="stats flex items-end shadow p-0">  
                        <div className="stat">
                            <div className="stat-title">Todays Revenue</div>
                            <div className="stat-value">$1550</div>
                            <div className="stat-desc">Available to payout</div>
                        </div>                    
                        <span className='w-full flex flex-col scale-x-[-1] relative'>          
                            <p className='absolute bottom-0 left-20 scale-x-[-1] text-white flex items-center gap-1 text-sm'>15% <FaArrowUp/></p>    
                            <svg id="wave"   viewBox="0 0 1440 340" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(78, 122, 239, 0.7)" offset="0%"></stop><stop stop-color="rgba(78, 122, 239, 1)" offset="100%"></stop></linearGradient></defs><path  fill="url(#sw-gradient-0)" d="M0,68L30,85C60,102,120,136,180,164.3C240,193,300,215,360,187C420,159,480,79,540,90.7C600,102,660,204,720,238C780,272,840,238,900,209.7C960,181,1020,159,1080,147.3C1140,136,1200,136,1260,153C1320,170,1380,204,1440,187C1500,170,1560,102,1620,107.7C1680,113,1740,193,1800,232.3C1860,272,1920,272,1980,260.7C2040,249,2100,227,2160,181.3C2220,136,2280,68,2340,62.3C2400,57,2460,113,2520,113.3C2580,113,2640,57,2700,68C2760,79,2820,159,2880,187C2940,215,3000,193,3060,198.3C3120,204,3180,238,3240,260.7C3300,283,3360,295,3420,260.7C3480,227,3540,147,3600,147.3C3660,147,3720,227,3780,226.7C3840,227,3900,147,3960,119C4020,91,4080,113,4140,113.3C4200,113,4260,91,4290,79.3L4320,68L4320,340L4290,340C4260,340,4200,340,4140,340C4080,340,4020,340,3960,340C3900,340,3840,340,3780,340C3720,340,3660,340,3600,340C3540,340,3480,340,3420,340C3360,340,3300,340,3240,340C3180,340,3120,340,3060,340C3000,340,2940,340,2880,340C2820,340,2760,340,2700,340C2640,340,2580,340,2520,340C2460,340,2400,340,2340,340C2280,340,2220,340,2160,340C2100,340,2040,340,1980,340C1920,340,1860,340,1800,340C1740,340,1680,340,1620,340C1560,340,1500,340,1440,340C1380,340,1320,340,1260,340C1200,340,1140,340,1080,340C1020,340,960,340,900,340C840,340,780,340,720,340C660,340,600,340,540,340C480,340,420,340,360,340C300,340,240,340,180,340C120,340,60,340,30,340L0,340Z"></path></svg>
                        </span>
                    </div>
                    <div className="stats flex items-end shadow p-0">  
                        <div className="stat">
                            <div className="stat-title">Todays Orders</div>
                            <div className="stat-value">16</div>
                        </div>                      
                        <span className='w-full flex flex-col scale-x-[-1] relative'>         
                        <p className='absolute bottom-0 left-28 scale-x-[-1] text-white flex items-center gap-1 text-sm'>10% <FaArrowUp className='text-sm '/></p>    
                        <svg id="wave" viewBox="0 0 1440 340" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(78, 122, 239, 0.7)" offset="0%"></stop><stop stop-color="rgba(78, 122, 239, 1)" offset="100%"></stop></linearGradient></defs><path fill="url(#sw-gradient-0)" d="M0,0L30,11.3C60,23,120,45,180,62.3C240,79,300,91,360,113.3C420,136,480,170,540,175.7C600,181,660,159,720,136C780,113,840,91,900,102C960,113,1020,159,1080,164.3C1140,170,1200,136,1260,153C1320,170,1380,238,1440,272C1500,306,1560,306,1620,277.7C1680,249,1740,193,1800,153C1860,113,1920,91,1980,73.7C2040,57,2100,45,2160,85C2220,125,2280,215,2340,215.3C2400,215,2460,125,2520,96.3C2580,68,2640,102,2700,113.3C2760,125,2820,113,2880,102C2940,91,3000,79,3060,102C3120,125,3180,181,3240,209.7C3300,238,3360,238,3420,238C3480,238,3540,238,3600,243.7C3660,249,3720,261,3780,243.7C3840,227,3900,181,3960,147.3C4020,113,4080,91,4140,107.7C4200,125,4260,181,4290,209.7L4320,238L4320,340L4290,340C4260,340,4200,340,4140,340C4080,340,4020,340,3960,340C3900,340,3840,340,3780,340C3720,340,3660,340,3600,340C3540,340,3480,340,3420,340C3360,340,3300,340,3240,340C3180,340,3120,340,3060,340C3000,340,2940,340,2880,340C2820,340,2760,340,2700,340C2640,340,2580,340,2520,340C2460,340,2400,340,2340,340C2280,340,2220,340,2160,340C2100,340,2040,340,1980,340C1920,340,1860,340,1800,340C1740,340,1680,340,1620,340C1560,340,1500,340,1440,340C1380,340,1320,340,1260,340C1200,340,1140,340,1080,340C1020,340,960,340,900,340C840,340,780,340,720,340C660,340,600,340,540,340C480,340,420,340,360,340C300,340,240,340,180,340C120,340,60,340,30,340L0,340Z"></path></svg>
                        </span>
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
