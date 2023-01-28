import React from 'react';
import { WiMoonFull } from 'react-icons/wi';
import { FaBars, FaAngleDown } from 'react-icons/fa';
import { BiShow } from 'react-icons/bi';
import { FiCopy, FiShare2 } from 'react-icons/fi';
import { SlOptionsVertical } from 'react-icons/sl';

const Categories = () => {
    return (
       <div>
            <div className="flex justify-between p-5">
                <input type="text" className='w-96 h-12 p-2 m-1 rounded-lg' placeholder='Order ID, phone or a name...' />
                <div className='flex items-center gap-3'>
                    <p className='underline'>Reorder category</p>
                     <div className="divider lg:divider-horizontal"></div> 
                    <button className='btn btn-primary text-white'>Add new category</button>
                </div>
            </div> 
            <div className='p-5'>
                
                <div className="overflow-x-auto pt-3 px-3 bg-white  rounded-xl">
                     
                    <table className="table w-full">      
                        <thead>
                        <tr className=''>
                            <th className='w-[1100px]'>Categories</th>
                            <th className='w-32'>Products</th>  
                            <th  className='w-60'>Status</th>
                            <th>Action</th> 
                        </tr>
                        </thead>
                        <tbody>
                        <tr>  
                            <div className='flex items-center gap-5 p-2'>
                                <img src="https://i.ibb.co/hm20gWJ/9ce87c94-2d34-4eec-9416-d5bf6d823fce.jpg" alt="9ce87c94-2d34-4eec-9416-d5bf6d823fce" border="0" className='w-10 border'/>
                                <div className='flex flex-col'>
                                    <p>Demo Product</p>
                                    <p>Demo</p>
                                </div>
                            </div>                                                             
                                <td>1</td>  
                                <td className='flex items-center gap-3'><input type="checkbox" className="toggle toggle-primary" checked /> <span className='text-green-500'>Active</span></td>
                                <td>
                                    <div className="flex gap-5 text-xl">
                                        <BiShow />
                                        <FiCopy />
                                        <FiShare2 />
                                        <SlOptionsVertical/>
                                    </div>
                                </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Categories;