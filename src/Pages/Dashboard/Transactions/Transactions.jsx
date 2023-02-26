import React, { useContext, useState } from 'react'
import { BsThreeDots,BsCart4,BsQuestionCircle } from 'react-icons/bs'
import { TbFileInvoice } from 'react-icons/tb'
import { MdDoneAll } from 'react-icons/md'
import { BiError } from 'react-icons/bi'
import { HiOutlineMail, HiSortAscending } from 'react-icons/hi'
import { FaAngleDown } from 'react-icons/fa'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider'

function Transactions() {


    const { orders } = useContext(AuthContext)

    let productsPerPage;
      //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)
   
      const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    productsPerPage = orders.slice(indexOfFirstPost, indexOfLastPost)
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
  
    const pageNumbers = []
  
    for (let i = 1; i <= Math.ceil(orders.length / postsPerPage); i++) {
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
        case 'latest':
            return productsPerPage.sort((a, b) => new Date(b.date) - new Date(a.date))
        case 'old':
            return productsPerPage.sort((a, b) => new Date(a.date) - new Date(b.date))
        default:
            return productsPerPage;
        }}; 



    return (
        <div>
            <h1 className="text-3xl font-bold">Transactions</h1>
                <div className='w-full flex justify-end items-center gap-3'>
                    
                        <select onChange={handlePostsPerPage} className="select w-20 select-bordered max-w-xs btn btn-secondary btn-outline">
                            <option value={5} selected>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                        </select>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-square btn-secondary btn-outline text-xl m-1"><HiSortAscending/></label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"> 
                                <li onClick={()=> handleSortTypeChange('latest')}><a>Latest</a></li> 
                                <li onClick={()=> handleSortTypeChange('old')}><a>Old</a></li> 
                            </ul>
                        </div>
                </div>
            <div className="grid grid-cols-3 bg-white p-5 rounded-2xl shadow">
                    <div className="overflow-x-auto col-span-3"> 
                            <table className="table w-full rounded-xl">

                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Order ID</th>
                                        <th>Customer Name</th>
                                        <th>Date</th>
                                        <th>Contact</th>
                                        <th>Status</th>
                                        <th>Amount</th> 
                                    </tr>
                                </thead>
                            
                                <tbody>                                
                                {sortType === '' &&
                                productsPerPage.map((order, index) => (
                                    <tr className='text-neutral' key={index} >
                                    <th><input onClick={()=>handleCheckboxClick(order._id)} type="checkbox" className="appearance checked:bg-primary" /></th>
                                    <th>{index+1}</th>
                                    <td>#{order._id}</td>
                                    <td>{order.name}</td>
                                    <td>{order.date}</td>
                                    <td><p className='flex items-center gap-5'><HiOutlineMail className='text-2xl' />{order.email}</p></td>
                                    <td className='text-primary font-semibold'>{order.transactionId}</td>
                                    <td className='text-primary font-semibold'>${order.amount/100}</td>
                                </tr>
                                ))
                            }
                                
                            {sortType !== '' &&
                                sortedItems().map((order, index) => (
                                    <tr className='text-neutral' key={index} >
                                    <th><input onClick={()=>handleCheckboxClick(order._id)} type="checkbox" className="appearance checked:bg-primary" /></th>
                                    <th>{index+1}</th>
                                    <td>#{order._id}</td>
                                    <td>{order.name}</td>
                                    <td>{order.date}</td>
                                    <td><p className='flex items-center gap-5'><HiOutlineMail className='text-2xl' />{order.email}</p></td>
                                    <td className='text-primary font-semibold'>{order.transactionId}</td>
                                    <td className='text-primary font-semibold'>${order.amount/100}</td>
                                </tr>
                                ))
                            }
                                </tbody>
                            </table>
                    </div>
                    <div className="col-span-3 flex justify-center">
                        <div className="btn-group items-center">                   
                            { pageNumbers.length > 1 &&
                                pageNumbers.map((number, index) => (
                                    <button key={index} onClick={() => paginate(number)} className={`btn btn-neutral hover:btn-primary ${currentPage === number && 'btn-active'}`}>{number}</button>
                                ))
                            }

                            
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Transactions
