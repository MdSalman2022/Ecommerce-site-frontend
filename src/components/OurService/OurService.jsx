import React from 'react';
import { TbTruckDelivery } from 'react-icons/tb'
import { GiReturnArrow } from 'react-icons/gi'
import { MdSecurity } from 'react-icons/md'
import { BiPhoneCall } from 'react-icons/bi'

const OurService = () => {
    return (
        <div>
            <div className='bg-primary h-40 flex items-center'>
                <div className="container mx-auto">
                    <div className="flex justify-between gap-20 items-center text-white">
                        <div className='flex items-center gap-3'>
                            <p className='text-5xl border rounded-full p-2 bg-white text-primary'><TbTruckDelivery /></p>
                            <div className='flex flex-col'>
                                <p className="font-semibold">Free Shipping</p>
                                <p className="font-thin">Free delivery over $100</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='text-5xl border rounded-full p-2 bg-white text-primary'><GiReturnArrow /></p>
                            <div className='flex flex-col'>
                                <p className="font-semibold">Free Returns</p>
                                <p className="font-thin">Hassle free return</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='text-5xl border rounded-full p-2 bg-white text-primary'><MdSecurity /></p>
                            <div className='flex flex-col'>
                                <p className="font-semibold">Secure Shopping</p>
                                <p className="font-thin">Best security features</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='text-5xl border rounded-full p-2 bg-white text-primary'><BiPhoneCall /></p>
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