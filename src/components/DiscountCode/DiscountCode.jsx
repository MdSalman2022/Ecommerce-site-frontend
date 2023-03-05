import React from 'react';

const DiscountCode = () => {
    return (
        <div className="bg-green-100  text-green-500 dark:bg-opacity-80 ">
            <div className='mx-auto'>
            <div className="flex justify-center  p-5 ">
                <div className='flex flex-col md:flex-row items-center gap-2'>Super discount for your <span className='underline text-green-500 font-semibold'>first purchase</span> <span className='p-2 font-semibold rounded-full border-2 border-green-500 border-dashed text-green-500 select-text'>FREEFIRSTPURCHASE</span> <p className="text-sm">Use discount code in checkout!</p> </div>

            </div>
        </div>
        </div>
    );
};

export default DiscountCode;