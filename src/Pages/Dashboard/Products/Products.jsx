import React, { useContext } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { BsDot } from 'react-icons/bs'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider'
import { useState } from 'react';

function Products() {

    const { products } = useContext(AuthContext)
    

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
      
        const formattedDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
      
        return formattedDate;
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
        console.log(data)
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
            return productsPerPage.sort((a, b) => a.price - b.price)
        case 'latest':
            return productsPerPage.sort((a, b) => new Date(b.date) - new Date(a.date))
        case 'old':
            return productsPerPage.sort((a, b) => new Date(a.date) - new Date(b.date))
        default:
            return productsPerPage;
        }}; 

    return (
        <div className='flex flex-col gap-5 py-10'>
            <p className="text-3xl font-bold">Products</p>
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
                            <li onClick={()=> handleSortTypeChange('latest')}><a>Latest</a></li> 
                            <li onClick={()=> handleSortTypeChange('old')}><a>Old</a></li> 
                        </ul>
                    </div>
                </div>
            <div className="bg-white p-5 rounded-2xl shadow ">
                    <div className="overflow-x-auto col-span-3"> 
                            <table className="table w-full rounded-xl">

                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Products</th>
                                        <th>Product ID</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                            
                                <tbody>                           
                                       
                            {
                                sortType === '' &&
                                productsPerPage.map((item, index) => (
                                    <tr className='text-black'>
                                        <th>{index + 1}</th>
                                        <td className='text-sm'><p className='tooltip tooltip-accent' data-tip={item.name}>{item.name}</p></td>
                                        <td>{item._id}</td>
                                        <td>{formatDate(item.date)}</td>
                                        <td><div className='flex items-center'>{item.stock ? <p className='flex items-center'><BsDot className='text-4xl text-success' />In Stock</p> : <p className='flex items-center'><BsDot className='text-4xl text-error' />Out of Stock</p>}</div></td>
                                        <td>${item.price}</td>
                                        <td><button className='btn btn-ghost text-2xl'><BsThreeDots /></button></td>
                                    </tr>
                                ))
                            }
                            {
                                sortType !== '' &&
                                    sortedItems().map((item, index) => (
                                        <tr className='text-black'>
                                            <th>{index+1}</th>
                                            <td className='text-sm'><p className='tooltip tooltip-accent' data-tip={item.name}>{item.name}</p></td>
                                            <td>{item._id}</td>
                                            <td>{formatDate(item.date)}</td>
                                            <td><div className='flex items-center'>{item.stock ?  <p className='flex items-center'><BsDot className='text-4xl text-success'/>In Stock</p> : <p className='flex items-center'><BsDot className='text-4xl text-error'/>Out of Stock</p>}</div></td>
                                            <td>${item.price}</td>
                                            <td><button className='btn btn-ghost text-2xl'><BsThreeDots/></button></td>
                                        </tr>
                                    ))
                            }                                
                                </tbody>
                            </table>
                    </div>
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
    )
}

export default Products
