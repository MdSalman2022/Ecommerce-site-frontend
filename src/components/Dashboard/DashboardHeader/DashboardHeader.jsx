import React, { useContext, useEffect, useState } from 'react'
import { BiMessageDetail } from 'react-icons/bi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import {AiOutlineSearch} from 'react-icons/ai'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
// import Fuse from 'fuse.js';

function DashboardHeader() {


let { dashboardSearch, setDashBoardSearch,products } = useContext(AuthContext)

    
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm(); 
    
    const onSubmit = data => {
        setDashBoardSearch(data.name);
        navigate(`/dashboard/products`);
    }


    const handleReset = data => {
        location.reload();
      }
    
    
    return (
        <div className='flex items-center justify-between py-3'>

            <form onSubmit={handleSubmit(onSubmit)} className="form-control">
                <div className="input-group">
                    <input defaultValue={dashboardSearch} type="text" placeholder="Search…" className="input input-bordered w-96 focus:border-b focus:outline-none"   {...register("name", { required: true, maxLength: 80 })} />
                    <button type="submit" className="btn bg-transparent btn-square border-primary"><AiOutlineSearch className='text-3xl text-primary'/></button>
                </div>
                {
                    dashboardSearch &&
                    <div className="flex mt-1">
                        <button onClick={()=>handleReset(products)} className="btn btn-sm btn-ghost">Reset Search</button>
                    </div>
                }
            </form>

            <div className='flex items-center gap-5'>
                <div className='relative'>
                    <p className='btn btn-ghost text-2xl p-2 text-neutral rounded-lg'><BiMessageDetail/></p>
                    <div className="badge rounded-full w-4 h-4 badge-primary text-white badge-xs absolute top-2 right-1">0</div>
                </div>
                <div className='relative'>
                    <p className='btn btn-ghost text-2xl p-2 text-neutral rounded-lg'><IoIosNotificationsOutline/></p>
                    <div className="badge rounded-full w-4 h-4 badge-primary text-white badge-xs absolute top-2 right-1">0</div>
                </div>
                <div className='flex items-center gap-3'>
                    <div className="avatar">
                        <div className="w-14 rounded-full">
                            <img src="https://i.ibb.co/hfByZJ1/img1.webp" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className='text-md font-semibold'>Rico</p>
                        <p className='text-md'>Admin</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default DashboardHeader
