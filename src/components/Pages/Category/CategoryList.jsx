import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryList = () => {


    const { data: categories = [] } = useQuery({
        queryKey: ['categorylist'],
        queryFn: () => fetch('https://buyandsell24-server.vercel.app/categorylist')
            .then(res => res.json())
    })

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-5 justify-items-center  gap-5 container mx-auto">
                {
                    categories &&
                    categories?.map(category =>
                        <div key={category.categoryId} className=''>
                            <div className="max-w-xs rounded-3xl bg-transparent ">
                                <img src={category.img} alt="" className="rounded-2xl p-2 object-contain object-fit w-64 rounded-t-md h-32  bg-transparent" />
                            </div>
                            <Link to={`/category/${category.categoryId}`}><button type="button" className="hover:bg-secondary transition-colors hover:text-white mt-5 flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md btn-primary">{category.name}</button></Link>
                        </div>)
                }

            </div>




        </div>
    );
};

export default CategoryList;