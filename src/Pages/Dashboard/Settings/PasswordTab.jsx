import React from 'react'

function PasswordTab() {
    return (
        <div className='flex flex-col'>
                <div className='flex justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Security Info</p>
                        <p className='text-gray-400 font-medium text-sm'>Update your password here</p>
                    </div>
                    <div className='flex gap-2'>
                        <div className="btn btn-primary border-gray-400 btn-outline">Cancel</div>
                        <div className="btn btn-primary">Save Changes</div>
                    </div>
                </div>
                <div className='flex items-center justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Current Password</p>
                    </div>
                    <div className='flex gap-2'>
                        <input type="text" placeholder="Current Password" className="input input-bordered input-primary w-full max-w-xs" />
                    </div>
                </div>
                <div className='flex items-center justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>New Password</p>
                    </div>
                    <div className='flex gap-2'>
                        <input type="text" placeholder="New password" className="input input-bordered input-primary w-full max-w-xs" />
                    </div>
                </div>
                <div className='flex items-center justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Re-type new Password</p>
                    </div>
                    <div className='flex gap-2'>
                        <input type="text" placeholder="New password" className="input input-bordered input-primary w-full max-w-xs" />
                    </div>
                </div>
                 

            </div>
    )
}

export default PasswordTab
