import React, { useContext, useState } from 'react'; 
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Banner from '../Banner/Banner';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useParams } from 'react-router-dom';
import Fuse from 'fuse.js';

const SearchPage = () => {

    let { searchText, searchResult, products } = useContext(AuthContext)

    console.log(searchResult)

    if (searchResult.length === 0) {
        products = products
        
    } else if(searchResult.length > 0) {
        products = searchResult
    }

    let productsPerPage;
      //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(12)
   
      const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    productsPerPage = products.slice(indexOfFirstPost, indexOfLastPost)
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
  
    const pageNumbers = []
  
    for (let i = 1; i <= Math.ceil(products.length / postsPerPage); i++) {
        pageNumbers.push(i) 
    }  


 

    
    return (
        <div className='container mx-auto my-10 space-y-5'>
            {searchResult.length > 0 ?
                <h1 className="lg:text-5xl px-4 font-bold">{searchText === "" ? "" : `You searched for "${searchText}"`}</h1>
                :
                <h1 className="lg:text-5xl px-4 font-bold">{`No result found for "${searchText}"`}</h1>
            }

            <div className='grid lg:grid-cols-4 mt-5 justify-items-center  gap-10'>
                { searchResult.length > 0 ?
                    productsPerPage.map((item, index) => <ProductCard item={item} key={index}></ProductCard>)
                    :
                    productsPerPage.map((item, index) => <ProductCard item={item} key={index}></ProductCard>)
                }
            </div>
            <div className="flex justify-center">
                <div className="btn-group items-center">                   
                    { pageNumbers.length > 1 &&
                        pageNumbers.map((number, index) => (
                            <button key={index} onClick={() => paginate(number)} className={`btn btn-neutral hover:btn-primary ${currentPage === number && 'btn-active'}`}>{number}</button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchPage;