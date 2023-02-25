import React, { useContext, useEffect } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { BsDot } from 'react-icons/bs'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider'
import { useState } from 'react';
import { FaAngleDown, FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import {FiEdit} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';


function Products() {

    let { results, setResults, products, user, dashboardSearch,scrolltop } = useContext(AuthContext)

    // const [results, setResults] = useState([]);

    useEffect(() => {
      if (dashboardSearch === '') {
        setResults([]);
      } else {
        const fuse = new Fuse(products, {
          keys: ['name', 'brand',],
          threshold: 0.3,
          includeScore: true,
          location: 0,
          distance: 100,
          minMatchCharLength: 1,
          shouldSort: true,
          tokenize: true,
          matchAllTokens: true,
          findAllMatches: true,
        });
        const searchResults = fuse.search(dashboardSearch);
        const formattedResults = searchResults.map((result) => result.item);
        setResults(formattedResults);
      }
    }, [dashboardSearch, products]);
    


    if (results.length === 0) {
        products = products
        
    } else if(results.length > 0) {
        console.log(results)
        products = results
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
        }
    }; 


    const [ids, setIds] = useState([])
    
    console.log(ids)
    const handleCheckboxClick = (item) => {
        if (ids.includes(item)) {
          setIds(prevItems => prevItems.filter(i => i !== item));
        } else {
          setIds(prevItems => [...prevItems, item]);
        }
    }
    
 

    const { register, formState: { errors }, handleSubmit } = useForm();


    const [item, setItem] = useState({})

    const navigate = useNavigate();


    const handleDelete = ids => {
        console.log(ids)
        fetch('https://bestdeal-ecommerce-server.vercel.app/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ids })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.deletedCount > 0) {
                alert('Ids deleted successfully')
                setIds([])
            }
          })
          .catch(err => console.error(err))
      }
      
    
    
    const handleEdit = data => {
        
        const id = item._id
        
        if (data.stock === 'true') {
            data.stock = true;
        }
        else {
            data.stock = false;
        }

        const { name, price, stock } = data;
        const updatedProduct = {name, price, stock }
        
        fetch(`https://bestdeal-ecommerce-server.vercel.app/update/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    alert('product updated successfully')
                    console.log(data)
                    navigate('/dashboard/products')
                }
            })

    }



    // if (dashboardSearchItems.length > 0) {
    //     productsPerPage = dashboardSearchItems
    // }

    const [page, setPage] = useState('overview')


    return (
        <div className='flex flex-col gap-5 py-10'>
            <p className="text-3xl font-bold">Products</p>
                <div className="'w-full flex justify-start border-b-2">
                    <div onClick={()=>setPage("overview")} className={`btn btn-ghost text-neutral !bg-transparent btn-outline border-y-0 border-x-0 hover:border-b-2 hover:text-secondary hover:border-secondary  rounded-none ${page === 'overview' && 'border-b-2 border-secondary'}`}>Overview</div>
                    <div onClick={()=>setPage("add")} className={`btn btn-ghost text-neutral !bg-transparent btn-outline border-y-0 border-x-0 hover:border-b-2 hover:text-secondary hover:border-secondary  rounded-none gap-2 ${page === 'add' && 'border-b-2 border-secondary'}`}><FaPlus/> Add Product</div>
                </div>
            <div className="bg-white rounded-2xl shadow px-2">
                    <div className='w-full flex justify-end items-center gap-3 py-2'>
                        <div className='dropdown dropdown-end'>
                            <button className='btn btn-secondary btn-outline text-sm normal-case  font-medium '>
                            <span className='flex items-center gap-2'>Options <FaAngleDown className='text-xl'/> </span>
                            </button>
                            <ul tabIndex={0} className="dropdown-content menu p-2 mt-1 shadow bg-base-100 rounded-box w-52">
                                <li onClick={()=>handleDelete(ids)}><a>Delete</a></li>
                            </ul>
                        </div>
                        {/* Modal starts  */}
                                <div>
                                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                                    <label htmlFor="my-modal-3" className="modal cursor-pointer">
                                        <label className="modal-box relative" htmlFor="">
                                            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                            <h3 className="font-bold text-2xl mb-2">Edit</h3>
                                    <form onSubmit={handleSubmit(handleEdit)} noValidate="" action="" className="space-y-3 ng-untouched ng-pristine ng-valid">
                                        
                                        <div className="space-y-1 text-sm">
                                                <label htmlFor="">Product Name*</label>
                                                <input type="text" placeholder='Product Name'  defaultValue={item.name}
                                                {...register("name", {
                                                        validate: value => value !== "" || value === (item.name),
                                                        required: "Name is required"
                                                    })}
                                                    className="input input-bordered w-full max-w-lg" />
                                                {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                                        </div>
                                        

                                        <div className="space-y-1 text-sm">
                                            <label htmlFor="">Product Price*</label>
                                        
                                                <input type="number" placeholder='Price' defaultValue={item.price}
                                                    {...register("price", {
                                                        validate: value => value !== "" || value === (item.price),
                                                        required: "Price is required",
                                                    })}
                                                    className="input input-bordered w-full max-w-lg" />
                                                {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                                        </div>
                                        

                                        <select className="select select-primary w-full max-w-lg" {...register("stock", { required: true })} >
                                                <option value="true">In Stock</option>
                                                <option value="false">Out of Stock</option>
                                        </select>
                                        {errors.stock && <p className='text-red-600'>Stock is required</p>}
                                        
                                            <div className="modal-action justify-center">
                                            <input className='btn btn-secondary w-full border border-white' value="Submit" type="submit" />
                                            </div>
                                        </form>   
                                        </label>
                                    </label>
                                </div>
                        {/* Modal ends  */}
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
                    <div className="overflow-x-auto col-span-3"> 
                            <table className="table w-full rounded-xl">

                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>No.</th>
                                        <th>Products</th>
                                        <th>Product ID</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Amount</th> 
                                    </tr>
                                </thead>
                            
                                <tbody>                           
                               
                          
                            {
                                sortType === '' &&
                                productsPerPage.map((item, index) => (
                                    <tr className='text-black' key={index}>
                                        <th><input onClick={()=>handleCheckboxClick(item._id)} type="checkbox" className="appearance checked:bg-primary" /></th>
                                        <th>{index + 1}</th>
                                        <td className='text-sm'>
                                            <p className='tooltip tooltip-accent flex items-center gap-5'
                                                data-tip={item.name}
                                            >
                                                <Link onClick={scrolltop} to={`/productDetails/${item._id}/${encodeURIComponent(item.name).replace(/%20/g, "-").replace(/%2F/g, "-")}`}>{item.name}</Link>
                                                <label onClick={() => setItem(item)} htmlFor="my-modal-3" className="btn btn-ghost btn-square text-xl  p-3 text-secondary"><FiEdit /></label>
                                            </p>
                                        </td>
                                        <td>{item._id}</td>
                                        <td>{item.date}</td>
                                        <td><div className='flex items-center'>{item.stock ? <p className='flex items-center'><BsDot className='text-4xl text-success' />In Stock</p> : <p className='flex items-center'><BsDot className='text-4xl text-error' />Out of Stock</p>}</div></td>
                                        <td>${item.price}</td>
                                    </tr>
                                ))
                            }
                            {
                                sortType !== '' && 
                                    sortedItems().map((item, index) => (
                                        <tr className='text-black' key={index}>
                                            <th><input onClick={()=>handleCheckboxClick(item._id)} type="checkbox" className="appearance checked:bg-primary" /></th>
                                            <th>{index+1}</th>
                                            <td className='text-sm'>
                                                <p className='tooltip tooltip-accent flex items-center gap-5'
                                                    data-tip={item.name}
                                                >
                                                    <Link onClick={scrolltop} to={`/productDetails/${item._id}/${encodeURIComponent(item.name).replace(/%20/g, "-")}`}>{item.name}</Link>
                                                    <label onClick={() => setItem(item)} htmlFor="my-modal-3" className="btn btn-ghost btn-square text-xl  p-3 text-secondary"><FiEdit /></label>
                                                </p>
                                            </td>
                                            <td>{item._id}</td>
                                            <td>{item.date}</td>
                                            <td><div className='flex items-center'>{item.stock ?  <p className='flex items-center'><BsDot className='text-4xl text-success'/>In Stock</p> : <p className='flex items-center'><BsDot className='text-4xl text-error'/>Out of Stock</p>}</div></td>
                                            <td>${item.price}</td>
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
