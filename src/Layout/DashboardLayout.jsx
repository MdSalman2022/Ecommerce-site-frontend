import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../components/Shared/Header/Header';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';

const DashboardLayout = () => {

    const { user } = useContext(AuthContext)

    const [role, setRole] = useState('')

    useEffect(() => {
        fetch(`https://buyandsell24-server.vercel.app/users?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setRole(data[0]?.role))
    }, [user?.email])

    return (
        <div>

            <Header></Header>
            <div className="drawer drawer-mobile container mx-auto">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">

                    <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">Dashboard sidebar</label>
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80  text-base-content">
                        <li><Link to='/dashboard'>Dashboard</Link></li>
                        {
                            role === 'buyer' ?
                                <>
                                    <li><Link to='/dashboard/myorders'>My Orders</Link></li>
                                    {/* <li><Link to='/dashboard/wishlist'>Wishlist</Link></li> */}
                                </>
                                :
                                ''
                        }
                        {
                            role === 'seller' ?
                                <>
                                    <li><Link to='/dashboard/addproduct'>Add Product</Link></li>
                                    <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                                    <li><Link to='/dashboard/mybuyers'>My Buyers</Link></li>
                                </>
                                :
                                ''
                        }
                        {
                            role === 'admin' ?
                                <>
                                    <li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
                                    <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                                    <li><Link to='/dashboard/reports'>Reported Items</Link></li>
                                </>
                                :
                                ''
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;