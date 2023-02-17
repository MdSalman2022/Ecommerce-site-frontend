import React, { useContext, useState } from 'react'; 
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Banner from '../Banner/Banner';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useParams } from 'react-router-dom';

const SearchPage = () => {

    let { searchText,setSearchText, setItems, searchedItems, setSearchedItems } = useContext(AuthContext)

    const [product, SetProduct] = useState('') 

 
    // if(brandName){
    //     setSearchText(brandName.name)
    // }

    return (
        <div className='container mx-auto my-10'>
            {searchedItems.length > 0 ?
                <h1 className="lg:text-5xl px-4 font-bold">{searchText === "" ? "" : `You searched for "${searchText}"`}</h1>
                :
                <h1 className="lg:text-5xl px-4 font-bold">{`No result found for "${searchText}"`}</h1>
            }

            <div className='grid lg:grid-cols-4 mt-5 justify-items-center  gap-10'>
                {searchedItems &&
                    searchedItems.map((item,index) => <ProductCard item={item} key={index} product={product} SetProduct={SetProduct}></ProductCard>)
                }
            </div>

        </div>
    );
};

export default SearchPage;