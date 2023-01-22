import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { GoVerified } from 'react-icons/go';
import Modal from '../../Shared/Modal/Modal';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../ProductCard/ProductCard';


const CategoryPage = () => {

    const items = useLoaderData()

    const [product, SetProduct] = useState('')


    return (
        <div>
            <h1 className='text-5xl text-center font-bold'>{items[0].brand}</h1>
            <div className='grid grid-cols-3 mt-5 justify-items-center  gap-5'>
                {
                    items?.map(item => <ProductCard item={item} key={item._id} product={product} SetProduct={SetProduct}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default CategoryPage;