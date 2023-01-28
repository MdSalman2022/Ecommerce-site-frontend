import React from 'react';
import {FaArrowRight} from 'react-icons/fa';

const LimitedOffer = () => {

    // countdown hook 

    const [countdown, setCountdown] = React.useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const { days, hours, minutes, seconds } = countdown;
    
    const startCountdown = () => {
        const countDownDate = new Date("Mar 26, 2023 23:59:59").getTime();
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

    
    return (
        <div className='py-20'>
            <div className='container mx-auto border rounded-2xl '>
                <div className="card lg:card-side bg-base-100 ">
                    <figure><img src="https://i.ibb.co/4mC2XsP/macbook.webp" alt="Album" className='h-full object-cover'/></figure>
                    <div className="card-body flex-col justify-center items-center gap-10 border-l">
                        <div className="text-3xl font-semibold text-center">Limited Offer on <span className="font-bold text-primary">Laptops</span> <h2 className="text-4xl font-bold text-primary">Upto 60%</h2></div> 
                        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                            <div className="flex flex-col p-2 bg-primary rounded-box text-white">
                                <span className="countdown font-mono text-5xl">
                                <span style={{"--value":days}}></span>
                                </span>
                                days
                            </div> 
                            <div className="flex flex-col p-2 bg-primary rounded-box text-white">
                                <span className="countdown font-mono text-5xl">
                                <span style={{"--value":hours}}></span>
                                </span>
                                hours
                            </div> 
                            <div className="flex flex-col p-2 bg-primary rounded-box text-white">
                                <span className="countdown font-mono text-5xl">
                                <span style={{"--value":minutes}}></span>
                                </span>
                                min
                            </div> 
                            <div className="flex flex-col p-2 bg-primary rounded-box text-white">
                                <span className="countdown font-mono text-5xl">
                                <span style={{"--value":seconds}}></span>
                                </span>
                                sec
                            </div>
                        </div>
                        <div className="flex justify-center"><div className="btn btn-primary rounded-full text-accent transition-all duration-300 ease-in-out w-52  hover:w-56  ">SEE ALL PRODUCTS &nbsp; <FaArrowRight className='text-xl' /></div></div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LimitedOffer;