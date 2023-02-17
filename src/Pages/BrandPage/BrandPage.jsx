import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

function BrandPage() {

    const {products} = useContext(AuthContext)
    
    const brandName = useParams();

    let brandProducts;

    if (brandName) {
        brandProducts = products.filter(product => product.brand === brandName.name)
    }


    return (
        <div className='container mx-auto'>
            <div className='flex flex-col items-center py-10'>
                <h1 className=" text-center capitalize text-5xl font-bold">{brandName.name}</h1>
                <hr className="border-2 border-primary w-10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            { brandProducts ?
                brandProducts.map((product,index) => 
                    <ProductCard key={index} item={product} />
                    )
                    :
                    <h1 className="lg:text-5xl px-4 font-bold">{`No result found for "${brandName.name}"`}</h1>
            }
            </div>
        </div>
    )
}

export default BrandPage;
