import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider'

function Customers() {

    const { user, orders } = useContext(AuthContext)

    const groupedOrders = {};

    orders.forEach(order => {
        if (!groupedOrders[order.email]) {
          groupedOrders[order.email] = [order];
        } else {
          groupedOrders[order.email].push(order);
        }
      });
      

    const { email } = groupedOrders
    


    return (
        <div>
            <div className="overflow-x-auto col-span-3"> 
                    <table className="table w-full rounded-xl">

                        <thead>
                            <tr> 
                                <th>No.</th> 
                                <th>User name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Contact</th> 
                                <th>Orders Count</th> 
                            </tr>
                        </thead>
                    
                        <tbody>            
                            {
                                Object.entries(groupedOrders).map(([email, orders], index) => (
                                    <tr className='text-black' key={index}> 
                                      <th>{index+1}</th> 
                                      <td><p className='tooltip tooltip-accent flex items-center gap-5' data-tip={orders[0].name}>{orders[0].name}</p></td>
                                      <td>{email}</td>
                                      <td>{orders[0].address}, {orders[0].city}</td>
                                      <td>{orders[0].contact}</td>
                                      <td>{orders.length}</td>
                                    </tr>
                                  ))
                            }                

                        </tbody>
                    </table>
            </div>
        </div>
    )
}

export default Customers
