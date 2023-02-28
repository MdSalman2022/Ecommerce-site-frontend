import React from 'react'
import { FaArrowUp } from 'react-icons/fa'
import AreaCharts from '../Dashboard/AreaCharts'
import BarCharts from './BarCharts'
import PieCharts from './PieCharts'


  

const Statistics = () => {
  return (
      <div className='pb-10'>
      <h1 className='text-3xl font-bold pb-5'>Statistics</h1>
          <div className="grid grid-cols-2 gap-5">
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
                <div className="stats shadow col-span-1">  
                    <div className="stat flex">                    
                            <div className="flex flex-col">
                                <div className="stat-title">Total Site Traffic</div>
                                <div className="flex items-center gap-3">
                                <div className="text-2xl font-bold">12798</div>
                                    <div className="stat-desc text-success flex justify-center"><FaArrowUp/> 10% than last month</div>
                                </div>
                                
                      </div>
                      <div className='flex items-center'>
                                <div className='flex flex-col justify-center gap-5 mt-2'>
                                    <span className='flex items-center gap-2'><div className="badge badge-sm bg-blue-500 border-none p-2"></div>Facebook</span>
                                    <span className='flex items-center gap-2'><div className="badge badge-sm bg-sky-400 border-none p-2"></div>Twiiter</span>
                                    <span className='flex items-center gap-2'><div className="badge badge-sm bg-[#FABB05] border-none p-2"></div>Google</span>
                                    <span className='flex items-center gap-2'><div className="badge badge-sm badge-error"></div>Youtube</span>
                                </div>
                            <PieCharts/>
                      </div>
                    </div>                
              </div>
                <div className="stats shadow col-span-1">  
                    <div className="stat">
                        <div className="stat-title">Total Orders</div>
                            <div className="flex items-center gap-2">
                                <div className="text-2xl font-bold text-primary">850</div>
                                <div className="stat-desc text-success flex items-center"><FaArrowUp/> 15% than last month</div>
                            </div>
                        <BarCharts/>
                    
                    </div>                
              </div>
              
          </div>
    </div>
  )
}

export default Statistics