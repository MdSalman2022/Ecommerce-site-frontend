import React from 'react'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider'
import { useContext } from 'react';

function MyProfile() {

    const {allUsers,user} = useContext(AuthContext)

    

    let info = allUsers.find(user => user.email === user?.email)
    console.log(info)
console.log(info)


    return (
        <div className='flex flex-col'>
                <div className='flex justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Personal Info</p>
                        <p className='text-gray-400 font-medium text-sm'>Update your photo and personal details here</p>
                    </div>
                    <div className='flex gap-2'>
                        <div className="btn btn-primary border-gray-400 btn-outline">Cancel</div>
                        <div className="btn btn-primary">Save Changes</div>
                    </div>
                </div>
                <div className='flex items-center justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Name</p>
                    </div>
                    <div className='flex gap-2'>
                    <input type="text" placeholder="First Name" defaultValue={info?.name.split(" ").slice(0,-1).join(" ")} className="input input-bordered input-primary w-full max-w-xs" />
                    <input type="text" placeholder="Last Name" defaultValue={info?.name.split(" ")[length-1]} className="input input-bordered input-primary w-full max-w-xs" />
                    </div>
                </div>
                <div className='flex items-center justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Email</p>
                    </div>
                    <div className='flex gap-2'>
                    <input type="text" placeholder="example@gmail.com" defaultValue={user?.email} className="input input-bordered input-primary w-full max-w-lg" />
                    </div>
                </div>
                <div className='flex items-center justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Your Photo</p>
                        <p className='text-gray-400 font-medium text-sm'>This will be displayed on your profile</p>
                    </div>
                    <div className='flex gap-2'>
                    <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                    </div>
                </div>
                <div className='flex items-center justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Role</p> 
                    </div>
                    <div className='flex gap-2'>
                    <input type="text" placeholder="Type here" defaultValue={"Admin"} className="input input-bordered input-primary w-full max-w-lg" readOnly/>
                    </div>
                </div>
                <div className='flex items-center justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Country</p> 
                    </div>
                    <div className='flex gap-2'>
                        <select className="select select-bordered select-primary w-full max-w-xl">
                            <option disabled selected>Bangladesh</option>
                            <option>India</option>
                            <option>Nepal</option>
                        </select>
                    </div>
                </div>

            </div>
    )
}

export default MyProfile
