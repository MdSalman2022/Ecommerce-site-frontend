import React from 'react'

function Billing() {
    return (
        <div>
            <div>
                <p className="font-bold">Manage bank account</p>
                <p className='text-gray-400 font-medium text-sm'>Manage Your Bank Account</p>
           </div>

            <div className='bg-white rounded-xl p-5 flex gap-5'>

                <div className="card-1 bg-primary p-3">
                <div className="flex flex-col items-center justify-center w-80 h-52 rounded-lg shadow-lg bg-red-500">
                    <div className="flex items-center justify-between w-4/5 mb-4">
                        <div className="w-12 h-8 rounded-lg bg-white" />
                        <div className="w-12 h-8 rounded-lg bg-white" />
                        <div className="w-12 h-8 rounded-lg bg-white" />
                        <div className="w-12 h-8 rounded-lg bg-white" />
                    </div>
                    <div className="flex items-center justify-between w-4/5 mb-4">
                        <div className="text-white text-lg font-bold">Card Holder</div>
                        <div className="w-1/2 h-6 rounded-lg bg-white" />
                    </div>
                    <div className="flex items-center justify-between w-4/5 mb-4">
                        <div className="text-white text-lg font-bold">Valid Thru</div>
                        <div className="w-16 h-6 rounded-lg bg-white" />
                    </div>
                    <div className="flex items-center justify-between w-4/5">
                        <div className="text-white text-lg font-bold">Card Number</div>
                        <div className="w-1/2 h-6 rounded-lg bg-white" />
                    </div>
                    </div>


                </div>
                
           </div>
        </div>
    )
}

export default Billing
