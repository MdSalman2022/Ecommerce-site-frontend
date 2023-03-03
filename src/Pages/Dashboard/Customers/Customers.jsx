import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider'
import { useState } from 'react';
import { HiSortAscending } from 'react-icons/hi';

function Customers() {

    const { user, orders, allUsers } = useContext(AuthContext)
 
 
      
  const emailCounts = orders.reduce((acc, { email }) => {
    if (email) {
      acc[email] = (acc[email] || 0) + 1;
    }
    return acc;
  }, {});
  
  const emailMap = Object.entries(emailCounts).map(([email, orders]) => ({ email, orders }))
  console.log(emailMap)
 
 
  
  console.log(allUsers)

     


  let productsPerPage;
        //pagination
      const [currentPage, setCurrentPage] = useState(1)
      const [postsPerPage, setPostsPerPage] = useState(20)

        const indexOfLastPost = currentPage * postsPerPage
      const indexOfFirstPost = indexOfLastPost - postsPerPage
      productsPerPage = allUsers.slice(indexOfFirstPost, indexOfLastPost)

      const paginate = (pageNumber) => setCurrentPage(pageNumber)

      const pageNumbers = []

      for (let i = 1; i <= Math.ceil(allUsers.length / postsPerPage); i++) {
          pageNumbers.push(i) 
      }  


      const handlePostsPerPage = (e) => {
        setPostsPerPage(e.target.value);
      };


      const [sortType, setSortType] = useState('');

      const handleSortTypeChange = data => {
          setSortType(data);
      };
    
      const sortedItems = () => {
        switch (sortType) { 
        case 'latest':
            return productsPerPage.sort((a, b) => new Date(b.date) - new Date(a.date))
        case 'old':
            return productsPerPage.sort((a, b) => new Date(a.date) - new Date(b.date))
        default:
            return productsPerPage;
    }
  }; 
  
  
    return (
        <div className=' '>
              
        <p className='text-2xl font-semibold'>Users</p>
        <div className="overflow-x-auto"> 
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
                    <table className="table w-full rounded-xl">

                        <thead>
                            <tr> 
                                <th>No.</th> 
                                <th>User name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Contact</th>  
                                <th>Orders</th>  
                            </tr>
                        </thead>
                    
                        <tbody>            
                            {
                                productsPerPage.map((u, index) => (
                                    <tr className='text-black' key={index}> 
                                      <th>{index+1}</th> 
                                      <td><p className='tooltip tooltip-accent flex items-center gap-5'>{u.name || u.orderName}</p></td>
                                      <td>{u.email}</td>
                                      <td>{u.address}</td>
                                      <td>{u.contact}</td> 
                                    <td>{emailMap.map((e, index) => (
                                        e.email === u.email && <p key={index}>{e.orders}</p> 
                                    ))}
                                    
                                    </td> 
                                    </tr>
                                  ))
                            }                

                        </tbody>
          </table>
          <div className="col-span-3 flex-wrap flex justify-center">
                                    <div className="btn-group flex-wrap items-center">                   
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

export default Customers
