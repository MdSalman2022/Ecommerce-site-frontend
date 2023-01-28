import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RiShareBoxFill } from 'react-icons/ri';


const Analytics = () => {

    
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
    ];


    return (
        <div>
            <div className="p-5 flex justify-between">
                <p>Sales</p>
               <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn-sm p-2 mb-2 bg-white text-black border flex items-center">This Month <FaAngleDown /></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Lifetime</a></li>
                            <li><a>Today</a></li>
                            <li><a>Yesterday</a></li>
                            <li><a>This Week</a></li>
                            <li><a>Last Week</a></li>
                            <li className='text-primary font-semibold'><a>This Month</a></li>
                            <li><a>Last Month</a></li>
                            <li><a>Custom Range</a></li>                            
                        </ul>
                    </div>
            </div>
            <div className="grid grid-cols-4 p-5">
                <div className='h-28 w-96 bg-white border rounded-lg p-3'>
                    <h4 className="text-xl">Average Orders Per Day</h4>
                    <div className="text-3xl font-semibold">0</div>
                </div>
                <div className='h-28 w-96 bg-white border rounded-lg p-3'>
                    <h4 className="text-xl">Average Orders Value</h4>
                    <div className="text-3xl font-semibold">0</div>
                </div>
                <div className='h-28 w-96 bg-white border rounded-lg p-3'>
                    <h4 className="text-xl">Average Sales Per Day</h4>
                    <div className="text-3xl font-semibold">0</div>
                </div>
                <div className='h-28 w-96 bg-white border rounded-lg p-3'>
                    <h4 className="text-xl">Returning Customers</h4>
                    <div className="text-3xl font-semibold">0</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 pr-12 pl-5">
                    <div className='bg-white p-3 h-64 rounded-xl flex flex-col justify-between'>
                        <div>
                            <p className='text-xl font-semibold flex justify-between gap-2'>Total Orders</p>
                        <p className='flex justify-between gap-2 text-3xl'>$99 <span className='text-3xl'>1</span></p>
                        </div>
                        <ResponsiveContainer width="100%" height="60%">
                            <BarChart
                                width={150}
                                height={40}
                                data={data}
                            >
                                <XAxis dataKey="name" />
                                 <YAxis />
                                <Tooltip />
                                <Legend />
                            <Bar dataKey="uv" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='bg-white p-3 h-64 rounded-xl flex flex-col justify-between'>
                        <div>
                            <p className='text-xl font-semibold flex justify-between gap-2'>Gross Sales <span className='underline text-sm'>View breakdown</span></p>
                        <p className='flex justify-between gap-2 text-3xl'>$99 <span className='text-3xl'>$99</span></p>
                        </div>
                        <ResponsiveContainer width="100%" height="60%">
                            <BarChart
                                width={150}
                                height={40}
                                data={data}
                            >
                                <XAxis dataKey="name" />
                                 <YAxis />
                                <Tooltip />
                                <Legend />
                            <Bar dataKey="uv" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='h-44 w-full bg-white border rounded-lg p-3'>
                        <h4 className="text-xl capitalize mb-5">Sales by top Regions</h4>
                        <div className="text-md font-semibold">1. Dhaka</div>
                        <input type="range" min="0" max="100" value="100" className="range range-primary" />
                        <p className="text-center underline font-semibold">View detailed report</p>
                    </div>
                    <div className='h-44 w-full bg-white border rounded-lg p-3'>
                        <h4 className="text-xl capitalize mb-5">Sales by traffic source</h4>
                        <p className='text-center'>Not enough data to show.</p>
                    </div> 
                

            </div>
            
        </div>
    );
};

export default Analytics;