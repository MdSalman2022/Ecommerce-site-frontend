import React from 'react'
import { BiMessageDetail } from 'react-icons/bi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import {AiOutlineSearch} from 'react-icons/ai'

function DashboardHeader() {
    return (
        <div className='flex items-center justify-between py-3'>
            <div className="form-control">
                <div className="input-group">
                    <input type="text" placeholder="Search…" className="input input-bordered w-96 focus:border-b focus:outline-none" />
                    <button className="btn bg-transparent btn-square border-primary">
                    <AiOutlineSearch className='text-3xl text-primary'/>
                    </button>
                </div>
            </div>

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
