import React from 'react';

const Payouts = () => {
    return (
        <div>
            <div className="p-5 mx-auto flex justify-center">
                <div className="h-10/12 w-[800px] bg-white">
                    <div className="flex flex-col justify-center p-5">
                        <p className='font-semibold'>Payment partners</p>
                        <p>Set up payment methods through these payment providers to accept payments from your customers.</p> 
                        <hr />
                        <div className="flex flex-col space-y-5 mt-5">
                            <div className="cod flex justify-between">
                            <p>Cash On delivery</p>
                            <input type="checkbox" className="toggle toggle-primary" checked />
                            </div>
                            <div className="bkash flex justify-between items-center font-semibold">
                                <p>Bkash</p>
                                <div className="btn btn-outline btn-primary">Set up</div>
                            </div>
                            <div className="rocket flex justify-between items-center font-semibold">
                                <p>Rocket</p>
                                <div className="btn btn-outline btn-primary">Set up</div>
                            </div>
                            <div className="nogod flex justify-between items-center font-semibold">
                                <p>Nogod</p>
                                <div className="btn btn-outline btn-primary">Set up</div>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>
            
        </div>
    );
};

export default Payouts;