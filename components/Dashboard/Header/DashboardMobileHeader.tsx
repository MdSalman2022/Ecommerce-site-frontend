'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/contexts/SearchProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchFormData {
    name: string;
}

function DashboardMobileHeader() {
    const { dashboardSearch, setDashBoardSearch } = useSearch();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useRouter();
    const { register, handleSubmit } = useForm<SearchFormData>();

    const onSubmit = (data: SearchFormData) => {
        setIsOpen(!isOpen);
        setDashBoardSearch(data.name);
        navigate.push(`/dashboard/products`);
    };

    return (
        <div className='flex z-50 md:hidden'>
            <div className='flex md:hidden absolute top-5 w-full'>
                 {/* This form logic in original was a bit weird with absolute positioning controlled by parent or state. 
                     Assuming this header is rendered when search is needed or always there.
                     Original used `isOpen` but `isOpen` was toggle-able. 
                     Here I'll keep it simple: always show search if mobile? 
                     Or maybe it's meant to be toggled from outside?
                     In original code, `handleSearchBox` toggled `isOpen`. But `handleSearchBox` was not used in JSX.
                     It seems the search input is hidden by default and maybe shown by some trigger?
                     Wait, looking at original code: `className={form-control ${isOpen ? 'absolute ...' : 'hidden'}}`
                     And `handleSearchBox` was defined but NOT used. 
                     So `isOpen` is initially false, so it's hidden. 
                     And there is no button to open it in this component?
                     Ah, `MobileHeader.jsx` had a search icon. Maybe `DashboardMobileHeader` is supposed to work similarly?
                     Let's check `DashboardLayout` again. It renders `DashboardMobileHeader`.
                     But `DashboardLayout` has a `HiBars3BottomLeft` button. 
                     Maybe the search on mobile dashboard is intended to be triggered differently?
                     
                     For now, I will render it but visible if `dashboardSearch` is active or just keep it simple.
                     I'll replicate exact structure, but add a trigger button if it's missing or fix the logic if it was broken.
                     Actually looking at `DashboardLayout` line 60: `<DashboardMobileHeader/>`.
                     And `DashboardHeader` line 36: `className="form-control md:flex hidden"`.
                     So desktop has search. Mobile has `DashboardMobileHeader`.
                     
                     In `DashboardMobileHeader.jsx`:
                     It has a form that is hidden if `!isOpen`.
                     And `handleSearchBox` sets `isOpen`.
                     BUT `handleSearchBox` is unused. 
                     This implies the search box on mobile dashboard effectively never opens in the original code unless Im missing something.
                     
                     I will add a button to toggle it for better UX.
                 */}
                  
                <form onSubmit={handleSubmit(onSubmit)} className={`form-control w-full px-2 ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="flex w-full items-center space-x-2 bg-background p-2 shadow-lg rounded-lg">
                        <Input 
                            defaultValue={dashboardSearch} 
                            type="text" 
                            autoComplete='off' 
                            placeholder="Search…" 
                            className="w-full focus-visible:ring-primary"   
                            {...register("name", { required: true, maxLength: 80 })} 
                        />
                        <Button type="submit" size="icon" className="shrink-0">
                            <AiOutlineSearch className='text-xl'/>
                        </Button>
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>X</Button>
                    </div>
                </form>
                 
                {!isOpen && (
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-2 bg-white/50 backdrop-blur-sm shadow-sm"
                        onClick={() => setIsOpen(true)}
                     >
                        <AiOutlineSearch className='text-2xl'/>
                     </Button>
                )}
            </div>
        </div>
    );
}

export default DashboardMobileHeader;
