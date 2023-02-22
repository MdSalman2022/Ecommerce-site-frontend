import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'

import {HiEmojiSad} from 'react-icons/hi'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { Link, useParams } from 'react-router-dom';

function ProductPage() {

    let { products } = useContext(AuthContext)
    
    let { category, brand, subcategory } = useParams();

    console.log('cat '+ category)
    console.log('brand ' + brand)
    console.log('subcat ' + subcategory)

    if (category && subcategory && brand) {
        products = products.filter(product => product.cat === category && (product.brand === brand || product.type === brand) && product.subcat === subcategory)
    }
    else if (category && subcategory && !brand) {
        products = products.filter(product => product.cat === category && product.subcat === subcategory || product.cat === category && product.brand === subcategory)
    }
    else if (category && brand && !subcategory) {
        products = products.filter(product => product.cat === category && product.subcat === subcategory)
    }
    else if (category === 'products' && !subcategory && !brand) {
        products = products
    }
    else if (category && !subcategory && !brand) {
        products = products.filter(product => product.cat === category)
    } 

    let productsPerPage;
    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(20)
 
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    productsPerPage = products.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(products.length / postsPerPage); i++) {
        pageNumbers.push(i) 
    }  

    const [sortType, setSortType] = useState('');

    const handleSortTypeChange = data => {
      setSortType(data);
    };
  
 
    const handlePostsPerPage = (e) => {
        setPostsPerPage(e.target.value);
      };
    
    const sortedItems = () => {
      switch (sortType) { 
        case 'high-to-low':
          return productsPerPage.sort((a, b) => b.price - a.price)
        case 'low-to-high':
          return productsPerPage.sort((a, b) => a.price - b.price);
        default:
          return productsPerPage;
      }
    };

    return (
        <div>
            <div className="container mx-auto flex flex-col space-y-5 py-5 items-center">
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li className="capitalize"><a>{category}</a></li> 
                            <li className="capitalize"><a>{subcategory}</a></li> 
                            {brand && <li className="capitalize">{brand}</li>}
                        </ul>
                    </div>
                <h1 className="text-center text-5xl capitalize pb-10 font-bold">{brand ? brand : name}</h1>

                {
                    productsPerPage.length>0 || products.length > 0 &&
                    <div className='w-full flex justify-end items-center'>
                    <select onChange={handlePostsPerPage} className="select w-20 select-bordered max-w-xs">
                        <option value={20} selected>20</option>
                        <option value={40}>40</option>
                        <option value={60}>60</option>
                        <option value={80}>80</option>
                    </select>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-outline btn-primary m-1">Sort</label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"> 
                                <li onClick={()=> handleSortTypeChange('low-to-high')}><a>Low to High</a></li>
                                <li onClick={()=> handleSortTypeChange('high-to-low')}><a>High to Low</a></li> 
                            </ul>
                        </div>
                </div>
                }
                {
                    productsPerPage.length>0 || products.length > 0 ?
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-5 md:p-0">

                            {sortType === '' &&
                                productsPerPage.map((item, index) => (
                                    <ProductCard key={index} item={item} />
                                ))
                            }

                            {sortType !== '' &&
                                sortedItems().map((item, index) => (
                                    <ProductCard key={index} item={item} />
                                ))
                            }

                        </div>
                        :
                        <div className="flex flex-col items-center gap-5 h-96">
                            <p className='text-7xl p-10 bg-error rounded-full text-error bg-opacity-10'><HiEmojiSad/></p>
                            <h1 className="text-3xl font-bold">Sorry! No Products Found</h1>
                            <h1 className="text-xl font-bold">Please try searching for something else</h1>
                            <Link to="/" className="px-8 py-3 font-semibold rounded btn btn-outline btn-primary">Back to homepage</Link>
                        </div>
                    
                }
                <div className="btn-group">                   
                    { pageNumbers.length > 1 &&
                        pageNumbers.map((number, index) => (
                            <button key={index} onClick={() => paginate(number)} className={`btn btn-neutral hover:btn-primary ${currentPage === number && 'btn-active'}`}>{number}</button>
                        ))
                    }

                    
                </div>
            </div>
            
        </div>
    )
}

export default ProductPage
