import React, { useEffect, useRef, useState } from "react";

import { MdMobileFriendly } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FiCloudLightning } from 'react-icons/fi';

const HotProduct = () => {

    
    const [countdown, setCountdown] = React.useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const { days, hours, minutes, seconds } = countdown;

 
    const startCountdown = () => {
        const countDownDate = new Date("Mar 15, 2023 23:59:59").getTime();
        const x = setInterval(function () {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setCountdown({ days, hours, minutes, seconds });
            if (distance < 0) {
                clearInterval(x);
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);
    };

    React.useEffect(() => {
        startCountdown();
    }, []);
 
     
    let range;

    if (days === 0) {
        range = 'max-w-5xl via-yellow-600 to-red-600';
     } else if (days <= 2) {
        range = 'max-w-4xl via-yellow-500 to-red-500';
     } else if (days <= 4) {
         range = 'max-w-3xl via-yellow-500 to-red-400';
     } else if (days <= 6) {
         range = 'max-w-2xl via-yellow-500 to-red-300';
     } else if (days <= 8) {
         range = 'max-w-xl via-yellow-400 to-red-200';
     } else if (days <= 10) {
         range = 'max-w-lg via-yellow-300 to-red-200';
     } else if (days <= 12) {
         range = 'max-w-md via-yellow-300 to-red-200';
     }else if (days <= 16) {
        range = 'max-w-sm via-yellow-300 to-red-200';
    } else{
         range = 'max-w-xs via-yellow-300 to-red-200';
     }


    return (
        <div className='py-20'>
            <div className="container mx-auto ">
                    <div className="flex flex-col items-center md:grid h-full md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {/* sidebar */}
                        <div className="col-span-1 flex flex-col gap-2">
                            <div className=" h-72 bg-base-100 w-full border p-5 flex flex-col rounded-xl">
                                <p>Get the all new</p>
                                <p className="font-bold text-xl text-primary">Intel I5 13600K</p>
                                <LazyLoadImage src="https://i.ibb.co/QMjtYff/i5-13th.webp" alt="i5-13th" className="w-52" />
                            </div>
                            <div className=" h-56 bg-base-100 w-full border py-5 flex flex-col justify-center  gap-5 rounded-xl text-sm">
                                <p className=" px-2 flex flex-nowrap items-center gap-5  "><MdMobileFriendly className="text-2xl"/> Download our App to your Phone </p>
                                <span className="border-b"></span>
                                <p className=" px-2 flex flex-nowrap items-center gap-5  "><MdMobileFriendly className="text-3xl "/> Order now so you dont miss the opportunities.</p>
                                <span className="border-b"></span>
                                <p className=" px-2 flex flex-nowrap items-center gap-5  "><MdMobileFriendly className="text-3xl"/> Your order will arrive at your door in 2 hour.</p>
                            </div>
                        </div>
                    
                    {/* Hot product box  */}
                    <div className="md:col-span-2 lg:col-span-4">
                        <div className="text-center pb-10">
                            <p className="text-center text-3xl font-bold">
                                <span className="text-red-500">Hot</span> Product This Week
                            </p>
                            <p>Dont miss this opportunity at a special discount just for this week.</p>
                        </div>
                            <div className="border border-primary md:h-96 rounded-lg flex flex-col  md:flex-row justify-center items-center p-5 md:p-10 gap-10">
                            <div className="relative group">
                                <span className=" group-hover:animate-pulse md:group-hover:-translate-y-10 transition-all duration-300  absolute -left-5 -top-2 z-50 font-mono bg-red-500 h-10 w-10 md:h-10 lg:h-16 md:w-10 lg:w-16 md:text-xl lg:text-3xl font-bold  text-base-100 flex justify-center items-center  rounded-full">60%</span>
                                <LazyLoadImage src="https://i.ibb.co/JqbDVkt/airpulse-a300-001-500x500.jpg" alt="airpulse" className="w-40 md:w-96 lg:w-56 group-hover:scale-125 transition-all duration-300 "/>
                            </div>
                            <div className="flex flex-col w-full max-w-5xl z-50 gap-2">
                                <p className="md:text-2xl lg:text-3xl font-bold ">$999.10 <span className="line-through font-semibold text-red-500">$1280.89</span></p>
                                <p className="text-2xl lg:text-4xl font-bold mb-5">Edifier Airpulse A300 Hi-Res Audio Bluetooth Speaker with Stand</p>
                                <p className="text-green-600">IN STOCK</p>  
                                <div className="relative">
                                    <div className="absolute w-full bg-gray-200 h-3 rounded-full "></div>
                                    <input className={`absolute w-full h-3 rounded-full bg-gradient-to-r from-green-800  ${range} `}></input>
                                </div>
                                
                                <div className="flex gap-5 text-center auto-cols-max mt-5">
                                    <div className="flex flex-col p-2 bg-neutral rounded-box text-base-100">
                                        <span className="countdown font-mono text-2xl">
                                        <span style={{"--value":days}}></span>
                                        </span>
                                        days
                                    </div> 
                                    <div className="flex flex-col p-2 bg-neutral rounded-box text-base-100">
                                        <span className="countdown font-mono text-2xl">
                                        <span style={{"--value":hours}}></span>
                                        </span>
                                        hours
                                    </div> 
                                    <div className="flex flex-col p-2 bg-neutral rounded-box text-base-100">
                                        <span className="countdown font-mono text-2xl">
                                        <span style={{"--value":minutes}}></span>
                                        </span>
                                        min
                                    </div> 
                                    <div className="flex flex-col p-2 bg-neutral rounded-box text-base-100">
                                        <span className="countdown font-mono text-2xl">
                                        <span style={{"--value":seconds}}></span>
                                        </span>
                                        sec
                                    </div>
                                    <div className="flex text-left items-center">
                                        <p>Remains until the end of <br /> the offer</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </div>
            
            <hr className="container mx-auto mt-20" />
        </div>
    );
};

export default HotProduct;