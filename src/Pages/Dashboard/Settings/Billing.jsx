import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

function Billing() {

    const {user, allUsers} = useContext(AuthContext)
    
    const { register, formState: { errors }, handleSubmit } = useForm();
    //save data to local storage


    let info = allUsers.find(user => user.email === user?.email) 
 
    console.log(info)
 
    const handleCard = data => {
        let cardnumber = data.cardnumber
        let email = user.email
        fetch(`${import.meta.env.VITE_SERVER_URL}/userdata`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({cardnumber, email})
        })
          .then(res => res.json())
          .then(data => {
              if (data.modifiedCount > 0) {
                toast.success('Card Number Updated successfully')
            }
          })
          .catch(err => console.error(err))
      }



    return (
        <div>
           <div className='flex justify-between py-5 border-b-2'>
                    <div>
                            <p className="font-bold">Manage bank account</p>
                            <p className='text-gray-400 font-medium text-sm'>Manage Your Bank Account</p>
                    </div>
                    <div className='flex gap-2'>
                        <div className="btn btn-primary border-gray-400 btn-outline">Cancel</div>
                        <div className="btn btn-primary">Save Changes</div>
                    </div>
            </div>
                <form onSubmit={handleSubmit(handleCard)} className="form-control w-full ">
                    <div className='flex items-center justify-between py-5 border-b-2'>
                        <div>
                            <p className='font-bold '>Card Number</p>
                        </div>
                        <div className='flex gap-2'>
                        <input type="text" placeholder="Card Number" defaultValue={info.cardnumber} className="input input-bordered input-primary w-full max-w-xs"
                        
                        {...register("cardnumber")}
                        />
                        </div>
                    </div> 
                    <div className="flex justify-end w-full gap-5">
                        <input className='w-20 btn btn-secondary mt-5' value="Save" type="submit" />
                    </div>
                </form>

        </div>
    )
}

export default Billing
