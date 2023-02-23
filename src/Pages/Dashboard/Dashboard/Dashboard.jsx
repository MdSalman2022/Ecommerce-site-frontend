import React, { useState } from 'react'
import {BsThreeDots} from 'react-icons/bs'
import ReactApexChart from 'react-apexcharts'
import {FaArrowUp} from 'react-icons/fa'
import moment from "moment";


function Dashboard() {

    const [state, setState] = useState({        
        series: [{
          name: 'sales',
            data: [{
                x: new Date("02/01/2022").getTime(),
                y: [5]
            }, {
                x: new Date("02/02/2022").getTime(),
                y: [10]
                }, {
                x: new Date("02/03/2022").getTime(),
                y: [2]
                }, {
                x: new Date("02/04/2022").getTime(),
                y: [7]
                }, {
                x: new Date("02/05/2022").getTime(),
                y: [3]
                }, {
                x: new Date("02/06/2022").getTime(),
                y: [9]
                }, {
                x: new Date("02/07/2022").getTime(),
                y: [9]
                }, {
                x: new Date("02/08/2022").getTime(),
                y: [8]
                }, {
                x: new Date("02/09/2022").getTime(),
                y: [8]
                }, {
                x: new Date("02/10/2022").getTime(),
                y: [7]
                }, {
                x: new Date("02/11/2022").getTime(),
                y: [7]
                }, {
                x: new Date("02/12/2022").getTime(),
                y: [7]
                }, {
                x: new Date("02/13/2022").getTime(),
                y: [3]
                }, {
                x: new Date("02/14/2022").getTime(),
                y: [7]
                }, {
                x: new Date("02/15/2022").getTime(),
                y: [2]
                }, {
                x: new Date("02/16/2022").getTime(),
                y: [1]
                }, {
                x: new Date("02/17/2022").getTime(),
                y: [0]
                }, {
                x: new Date("02/18/2022").getTime(),
                y: [5]
                }, {
                x: new Date("02/19/2022").getTime(),
                y: [5]
                }, {
                x: new Date("02/20/2022").getTime(),
                y: [6]
                }, {
                x: new Date("02/21/2022").getTime(),
                y: [6]
                }, {
                x: new Date("02/22/2022").getTime(),
                y: [2]
                }, {
                x: new Date("02/23/2022").getTime(),
                y: [4]
                }, {
                x: new Date("02/24/2022").getTime(),
                y: [9]
                }, {
                x: new Date("02/25/2022").getTime(),
                y: [10]
                }, {
                x: new Date("02/26/2022").getTime(),
                y: [8]
                }, {
                x: new Date("02/27/2022").getTime(),
                y: [5]
                }, {
                x: new Date("02/28/2022").getTime(),
                y: [2]
                }
            ]
        },],
        
        options: {
            chart:          
            {
                animation: {
                    enabled: false,
                },
            height: 350,
                type: 'area',
                toolbar: {
                    show: false,
                }
            },
            grid: {
                borderColor: '#f7f8fd', 
                xaxis: {
                  lines: {
                    show: false
                  }
                },
                yaxis: {
                  lines: {
                    show: true
                  }
                }
              },
            toolbar: {
                tools: {},
            },
            fill: {
                colors: ['#4E7AEF']
              },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth", 
            colors: ['#4E7AEF']
          },
          xaxis: {
            type: 'datetime',
            tickAmount: 12,
            min: new Date("02/01/2022").getTime(),
            max: new Date("02/28/2022").getTime(),
            labels: {
                rotate: -15,
                rotateAlways: true,
                formatter: function(val, timestamp) {
                  return moment(new Date(timestamp)).format("DD MMM YYYY")
              }
            }
            },
          yaxis: {
                tickAmount: 6,
            },
          tooltip: {
            x: {
               format: 'dd MMM yyyy'
            },
          },
        },
      
      
    }); 


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
                                <ReactApexChart 
                                options={state.options}
                                series={state.series}
                                type="area"
                                height={350}
                                className="w-full overflow-hidden"
                            /> 
                            
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
