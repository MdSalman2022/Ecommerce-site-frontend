import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useState } from 'react';



function DashboardMobileHeader() {
    
    let { dashboardSearch, setDashBoardSearch, products, user } = useContext(AuthContext)
    
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm(); 

    const onSubmit = data => {
        setIsOpen(!isOpen)
        setDashBoardSearch(data.name);
        navigate(`/dashboard/products`);
    }

    const handleSearchBox = () => {
        setIsOpen(!isOpen)
    }
    
    return (
        <div className='flex z-50'>
            <button onClick={()=>handleSearchBox()} className="btn btn-ghost btn-circle absolute right-2 "><AiOutlineSearch className='text-2xl md:text-3xl text-primary'/></button>

            <div className='flex md:hidden absolute top-5 '>
                <form onSubmit={handleSubmit(onSubmit)} className={`form-control ${isOpen ? 'absolute top-10 left-0':'hidden'}`}>
                    <div className="input-group w-screen">
                        <input defaultValue={dashboardSearch} type="text" autoComplete='off' placeholder="Search…" className="w-[80%] input input-bordered focus:border-b focus:outline-none"   {...register("name", { required: true, maxLength: 80 })} />
                        <button type="submit" className="w-[15%] btn btn-square border-primary"><AiOutlineSearch className='text-3xl text-primary'/></button>
                    </div>
               
                </form>
            </div>
        </div>
    )
}

export default DashboardMobileHeader
