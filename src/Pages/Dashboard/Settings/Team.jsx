import React from 'react'

function Team() {
    return (
        <div className='flex flex-col'>
                <div className='flex justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Team Info</p>
                        <p className='text-gray-400 font-medium text-sm'>Update your team info here</p>
                    </div>
                    <div className='flex gap-2'>
                        <div className="btn btn-primary border-gray-400 btn-outline">Cancel</div>
                        <div className="btn btn-primary">Save Changes</div>
                    </div>
                </div>
                <div className='flex items-center justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Owner</p>
                    </div>
                    <div className='flex gap-2'>
                        <select className="select select-bordered select-primary w-full max-w-xl">
                            <option disabled selected>Brenda Wyatt</option>
                        </select>
                    </div>
                </div>
                <div className='flex items-center justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Admin</p>
                    </div>
                    <div className='flex gap-2'>
                        <select className="select select-bordered select-primary w-full max-w-xl">
                            <option disabled selected>Brenda Wyatt</option>
                            <option>Paul P. Adkins</option>
                            <option>Rolf S. Carter</option>
                        </select>
                    </div>
                </div>
                <div className='flex items-center justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Moderator</p>
                    </div>
                    <div className='flex gap-2'>
                        <select className="select select-bordered select-primary w-full max-w-xl">
                            <option disabled selected>Brian Harrison</option>
                            <option>John Doe</option>
                            <option>Bill Morgan</option>
                        </select>
                    </div>
                </div>
                <div className='flex items-center justify-between py-5 border-b-2'>
                    <div>
                        <p className='font-bold '>Developer</p> 
                    </div>
                    <div className='flex gap-2'>
                        <select className="select select-bordered select-primary w-full max-w-xl">
                            <option disabled selected>Ronald Koeman</option>
                            <option>Kim Jon</option>
                            <option>Billy Watson</option>
                        </select>
                    </div>
                </div>
                <div className='flex items-center justify-center py-5 '>
                    <div>
                        <button className='btn btn-secondary btn-outline'>Add New Member</button> 
                    </div>
                </div>

            </div>
    )
}

export default Team
