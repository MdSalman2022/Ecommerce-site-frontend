import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import Banner from '../Banner/Banner';
import ProductCard from '../ProductCard/ProductCard';

const SearchPage = () => {

    let { searchText, setItems, items, setSearchText } = useContext(AuthContext)

    const [product, SetProduct] = useState('')
    // console.log(items);


    console.log(items);


    return (
        <div className='container mx-auto'>
            <Banner></Banner>
            {items.length > 0 ?
                <h1 className="lg:text-5xl px-4 font-bold">{searchText === "" ? "" : `You searched for "${searchText}"`}</h1>
                :
                <h1 className="lg:text-5xl px-4 font-bold">{`No result found for "${searchText}"`}</h1>
            }

            <div className='grid lg:grid-cols-3 mt-5 justify-items-center  gap-5'>
                {items &&
                    items.map(item => <ProductCard item={item} key={item.id} product={product} SetProduct={SetProduct}></ProductCard>)
                }
            </div>

        </div>
    );
};

export default SearchPage;