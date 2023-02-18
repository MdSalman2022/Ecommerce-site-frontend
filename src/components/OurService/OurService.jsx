import React from 'react';
import { TbTruckDelivery } from 'react-icons/tb'
import { GiReturnArrow } from 'react-icons/gi'
import { MdSecurity } from 'react-icons/md'
import { BiPhoneCall } from 'react-icons/bi'

const OurService = () => {
    return (
        <div className='w-full lg:max-w-screen overflow-x-hidden'>
            <div className='bg-primary h-full w-full md:h-40 flex items-center'>
                <div className="container-fluid mx-auto p-5 md:p-0">
                    <div className="flex flex-col md:flex-row md:justify-between gap-5 lg:gap-20 md:items-center text-base-100">
                        <div className='flex text-center flex-col md:flex-row items-center gap-3'>
                            <p className='text-xl md:text-2xl lg:text-5xl border rounded-full p-2 bg-base-100 text-primary'><TbTruckDelivery /></p>
                            <div className='flex flex-col'>
                                <p className="font-semibold">Free Shipping</p>
                                <p className="font-thin">Free delivery over $100</p>
                            </div>
                        </div>
                        <div className='flex text-center md:text-left flex-col md:flex-row  items-center gap-3'>
                            <p className='text-xl md:text-2xl lg:text-5xl border rounded-full p-2 bg-base-100 text-primary'><GiReturnArrow /></p>
                            <div className='flex flex-col'>
                                <p className="font-semibold">Free Returns</p>
                                <p className="font-thin">Hassle free return</p>
                            </div>
                        </div>
                        <div className='flex text-center md:text-left flex-col md:flex-row  items-center gap-3'>
                            <p className='text-xl md:text-2xl lg:text-5xl border rounded-full p-2 bg-base-100 text-primary'><MdSecurity /></p>
                            <div className='flex flex-col'>
                                <p className="font-semibold">Secure Shopping</p>
                                <p className="font-thin">Best security features</p>
                            </div>
                        </div>
                        <div className='flex text-center md:text-left flex-col md:flex-row  items-center gap-3'>
                            <p className='text-xl md:text-2xl lg:text-5xl border rounded-full p-2 bg-base-100 text-primary'><BiPhoneCall /></p>
                            <div className='flex flex-col'>
                                <p className="font-semibold">24/7 Customer Care</p>
                                <p className="font-thin">Get your problem fixed within minutes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurService;