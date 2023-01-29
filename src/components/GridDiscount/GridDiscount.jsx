import React from 'react';

const GridDiscount = () => {
    return (
        <div>
            <div className="grid grid-cols-2 mx-auto container gap-5"> 
                <div className='h-full bg-white border flex justify-center py-20 rounded-lg relative group'> 
                    <div className=' transition-all duration-300'>
                        <img src="https://i.ibb.co/j5PXGqC/iphone-14-pro-box.webp" alt="iphone-14-pro-box" border="0" className='h-64 flex transition-all duration-300 opacity-100 group-hover:opacity-0 relative ease-in-out'/>
                        <img src="https://i.ibb.co/k8XLgQW/iphone-14-pro-transparent.webp" alt="iphone-14-pro-box" border="0" className='flex  items-start justify-start h-56 transition-all duration-300  opacity-0 group-hover:opacity-100 hover:scale-150 absolute top-16 right-52 ease-in-out'/>
                    </div>
                    <div className="absolute bg-neutral h-40 w-full bottom-0 flex flex-col text-white justify-center items-center rounded-b-lg">
                        <p className="font-bold text-3xl">10% sale on Smartphone</p>
                        <p className="flex">Extra because you deserve some class. Use code: &nbsp; <div className="font-mono text-primary select-text"> 10SMARTPHONE</div></p>
                        <div className="primary-btn mt-5">Shop Now</div>
                    </div>
                </div>
                <div className='h-full bg-white border flex justify-center py-10 rounded-lg relative group'>
                    <div className=' transition-all duration-300'>
                        <img src="https://i.ibb.co/XSvGVVq/Google-Pixel-Watch-Green.jpg" alt="iphone-14-pro-box" border="0" className=' h-64 flex transition-all duration-300 opacity-100 group-hover:opacity-0 relative ease-in-out'/>
                        <img src="https://i.ibb.co/H2GRHZ1/google-pixel-watch-angles-official-image-io-22.webp" alt="iphone-14-pro-box" border="0" className='flex  items-start justify-start h-40 transition-all duration-300  opacity-0 group-hover:opacity-100 hover:scale-150 absolute top-16 right-52 ease-in-out'/>
                    </div>
                    <div className="absolute bg-accent h-40 w-full bottom-0 flex flex-col text-neutral justify-center items-center border-t rounded-b-lg">
                        <p className="font-bold text-3xl">10% sale on Watch accessories</p>
                        <p className="flex">Extra because you deserve some class. Use code: &nbsp; <div className="font-mono text-primary select-text"> 10WATCH</div></p>
                        <div className="primary-btn mt-5">Shop Now</div>
                    </div>
                </div>
 
            </div>
            
        </div>
    );
};

export default GridDiscount;