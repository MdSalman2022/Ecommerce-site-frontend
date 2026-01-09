'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import { useSearch } from '@/contexts/SearchProvider';
import { BiMessageDetail } from 'react-icons/bi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SearchFormData {
    name: string;
}

function DashboardHeader() {
    const { user } = useAuth();
    const { dashboardSearch, setDashBoardSearch } = useSearch();
    const navigate = useRouter();
    const { register, handleSubmit } = useForm<SearchFormData>();

    const onSubmit = (data: SearchFormData) => {
        setDashBoardSearch(data.name);
        navigate.push(`/dashboard/products`);
    };

    const handleReset = () => {
       window.location.reload(); 
    };

    return (
        <div className='hidden md:flex justify-end md:items-center md:justify-between md:py-3 relative'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input 
                        defaultValue={dashboardSearch} 
                        type="text" 
                        placeholder="Search…" 
                        className="md:w-96 focus-visible:ring-primary"
                        {...register("name", { required: true, maxLength: 80 })} 
                    />
                    <Button type="submit" variant="ghost" size="icon" className="border border-primary">
                        <AiOutlineSearch className='text-3xl text-primary'/>
                    </Button>
                </div>
                {
                    dashboardSearch &&
                    <div className="flex ml-2">
                        <Button onClick={handleReset} variant="ghost" size="sm">Reset Search</Button>
                    </div>
                }
            </form>

            <div className='flex items-center gap-5 '>
                <div className='md:relative hidden md:block'>
                    <Button variant="ghost" className='text-lg md:text-2xl p-2 text-foreground rounded-lg'>
                        <BiMessageDetail/>
                    </Button>
                    <div className="badge rounded-full w-2 md:w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center absolute top-0 right-0">0</div>
                </div>
                <div className='md:relative hidden md:block'>
                    <Button variant="ghost" className='text-lg md:text-2xl p-2 text-foreground rounded-lg'>
                        <IoIosNotificationsOutline/>
                    </Button>
                    <div className="badge rounded-full w-2 md:w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center absolute top-0 right-0">0</div>
                </div>
                <div className='flex items-center gap-3'>
                    <Avatar className="w-8 h-8 md:w-14 md:h-14 border border-gray-200">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-gray-100">
                            <User className="w-1/2 h-1/2 text-gray-400" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col">
                        <p className='text-xs md:text-md font-semibold'>{user?.name ? user?.name : 'User'}</p>
                        <p className='text-xs md:text-md text-muted-foreground'>Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHeader;
