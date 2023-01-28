import React from 'react'; 
import { FaBars, FaAngleDown } from 'react-icons/fa'; 

const Inventory = () => {
    return (
       <div>
            <div className="flex justify-between p-5">
                <input type="text" className='w-96 h-12 p-2 m-1 rounded-lg border' placeholder='Search Products' />
                <div className='flex items-center gap-3'>
                    <input type="checkbox" className="checkbox checkbox-neutral" /> Show low/out of stock products 
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-primary text-white w-52 my-2">All categories &nbsp; <FaAngleDown /></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>All Categories</a></li>
                            <li><a>Demo</a></li>
                        </ul>
                    </div>
                </div>
            </div> 
            <div className='p-5'>
                
                <div className="overflow-x-auto pt-3 px-3 bg-white  rounded-xl">
                    <table className="table w-full">      
                        <thead>
                        <tr className=''>
                            <th className='w-[900px]'>Product</th>
                            <th className='w-40'>Inventory</th>
                            <th className='w-40'>Unit / Variant</th>
                            <th className='w-32'>Price</th> 
                            <th  className='w-60'>Selling Price</th> 
                        </tr>
                        </thead>
                        <tbody>
                        <tr>  
                            <td className='flex items-center gap-5 p-2'>
                                <img src="https://i.ibb.co/hm20gWJ/9ce87c94-2d34-4eec-9416-d5bf6d823fce.jpg" alt="9ce87c94-2d34-4eec-9416-d5bf6d823fce" border="0" className='w-10 border'/>
                                <div className='flex flex-col'>
                                    <p>Demo Product</p>
                                    <p>Demo</p>
                                </div>
                            </td>                                                             
                            <td><input type="text"  className='h-10 border-2 p-1 rounded-lg' /></td> 
                            <td>1 piece</td>
                            <td><input type="text" defaultValue="$99" className='h-10 border-2 p-1 rounded-lg' /></td> 
                            <td><input type="text" defaultValue="$99" className='h-10 border-2 p-1 rounded-lg' /></td>    
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inventory;