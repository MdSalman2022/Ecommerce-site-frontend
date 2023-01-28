import React from 'react';
import { FaStore } from 'react-icons/fa';

const MyAccount = () => {
    return (
        <div>
            <div className="w-[1000px] mx-auto">
                <div className="grid grid-cols-4 gap-10 mt-5">
                    <div className="bg-white p-8 h-10 flex gap-2 items-center text-primary font-semibold">
                       <FaStore/> Store details
                    </div>

                    <div className='col-span-3 flex flex-col gap-5'>
                        <p className='text-xl mb-2 font-semibold'>Store details</p>
                        <div className="bg-white h-44 w-full flex flex-col p-4 gap-5 rounded-lg">
                            <p className='font-semibold'>Store logo</p>                           
                            <div className='flex items-center gap-10'>
                                <div className="box bg-gray-300 h-24 w-24 text-7xl flex items-center justify-center rounded-xl text-gray-400">
                                    <FaStore/>
                                </div>
                                <input type="file" className="file-input w-full max-w-xs" />
                            </div>
                        </div>
                        <div className="bg-white h-full w-full flex flex-col p-4 gap-5  rounded-lg">
                            <p className='font-semibold'>Store information</p>                           
                            <div className='grid grid-cols-2 gap-10'>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">What is your name?</span>
                                    </label>
                                    <input defaultValue="samahar.shop" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" disabled/>
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">What is your name?</span>
                                    </label>
                                    <input defaultValue="samahar.shop" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"  />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">What is your name?</span>
                                    </label>
                                    <input defaultValue="samahar.shop" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"  />
                                </div>
                                <div className="form-control w-full max-w-xs opacity-0">
                                    <label className="label">
                                        <span className="label-text">What is your name?</span>
                                    </label>
                                    <input defaultValue="samahar.shop" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" disabled/>
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">What is your name?</span>
                                    </label>
                                    <input defaultValue="samahar.shop" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" disabled/>
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">What is your name?</span>
                                    </label>
                                    <input defaultValue="samahar.shop" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"  />
                                </div>
                                <div className="form-control w-full max-w-full col-span-2">
                                    <label className="label">
                                        <span className="label-text">What is your name?</span>
                                    </label>
                                    <input defaultValue="samahar.shop" type="text" placeholder="Type here" className="input input-bordered  "  />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default MyAccount;