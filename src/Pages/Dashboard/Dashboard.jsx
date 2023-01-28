import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RiShareBoxFill } from 'react-icons/ri';
import {FaTwitterSquare, FaFacebookSquare, FaWhatsappSquare} from 'react-icons/fa';

const Dashboard = () => {

    
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
            <div className="container mx-auto p-5">
                <div className="flex justify-between">
                    <span className='text-xl font-semibold mb-5'>Overview</span>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn-sm p-2 mb-2 bg-white text-black">This Month</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Lifetime</a></li>
                            <li><a>Today</a></li>
                            <li><a>Yesterday</a></li>
                            <li><a>This Week</a></li>
                            <li><a>Last Week</a></li>
                            <li><a>This Month</a></li>
                            <li><a>Last Month</a></li>
                            <li><a>Custom Range</a></li>                            
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-5">
                    <div className='bg-white p-3 h-64 rounded-xl'>
                        <p className='text-xl font-semibold'>Share store link</p>
                        <p>Customers can visit the following link and place their orders.</p>
                        <p className='flex gap-3 items-center text-primary'>somahar.shop<RiShareBoxFill/></p>
                        <p className='flex gap-3 items-center'> Share via <span className='flex gap-3 text-3xl'><FaWhatsappSquare className='text-green-500'/> <FaFacebookSquare className='text-blue-500'/> <FaTwitterSquare className='text-sky-500'/></span> </p>
                    </div>
                    <div className='bg-white p-3 h-64 rounded-xl flex flex-col justify-between'>
                        <div>
                            <p className='text-xl font-semibold flex justify-between gap-2'>Total Sales <span>1 Jan - 27 Jan</span></p>
                        <p className='flex justify-between gap-2 text-3xl'>$99 <span className='text-lg'>1 order</span></p>
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
                            <p className='text-xl font-semibold flex justify-between gap-2'>STORE VIEWS <span>1 Jan - 27 Jan</span></p>
                        <p className='flex justify-between gap-2 text-3xl'>28 <span className='text-lg'>1 product view</span></p>
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
                </div>
            </div>
        </div>
    );
};

export default Dashboard;