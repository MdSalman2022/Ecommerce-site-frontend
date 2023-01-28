import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../Layout/Main';
import Login from '../../components/Shared/Login/Login';
import Register from '../../components/Shared/Register/Register'; 
import PrivateRoute from '../PrivateRoute/PrivateRoute';  
import ErrorPage from '../../Pages/ErrorPage/ErrorPage';
import Home from '../../Pages/Home/Home';
import SearchPage from '../../Pages/SearchPage/SearchPage';
import SearchRoute from '../SearchRoute/SearchRoute';
import DashboardLayout from '../../Layout/DashboardLayout';
import Dashboard from '../../Pages/Dashboard/Dashboard';
import Orders from '../../Pages/Dashboard/Orders/Orders';
import Delivery from '../../Pages/Dashboard/Delivery/Delivery';
import Products from '../../Pages/Dashboard/Products/Products';
import Categories from '../../Pages/Dashboard/Categories/Categories';
import Inventory from '../../Pages/Dashboard/Inventory/Inventory';
import Analytics from '../../Pages/Dashboard/Analytics/Analytics';
import Payouts from '../../Pages/Dashboard/Payouts/Payouts';
import Tools from '../../Pages/Dashboard/Tools/Tools';
import Discounts from '../../Pages/Dashboard/Discounts/Discounts';
import Percentage from '../../Pages/Dashboard/Discounts/Percentage/Percentage';
import Appearance from '../../Pages/Dashboard/Appearance/Appearance';
import MyAccount from '../../Pages/Dashboard/MyAccount/MyAccount';
import StoreSettings from '../../Pages/Dashboard/StoreSettings/StoreSettings';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/search/:name',
                element: <SearchRoute><SearchPage></SearchPage></SearchRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '/',
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/orders',
                element: <Orders></Orders>
            },
            {
                path: '/dashboard/delivery',
                element: <Delivery></Delivery>
            },
            {
                path: '/dashboard/products',
                element: <Products></Products>
            },
            {
                path: '/dashboard/categories',
                element: <Categories></Categories>
            },
            {
                path: '/dashboard/inventory',
                element: <Inventory></Inventory>
            },
            {
                path: '/dashboard/analytics',
                element: <Analytics></Analytics>
            },
            {
                path: '/dashboard/payouts',
                element: <Payouts></Payouts>
            },
            {
                path: '/dashboard/tools',
                element: <Tools></Tools>
            },
            {
                path: '/dashboard/discounts',
                element: <Discounts></Discounts>
            },
            {
                path: '/dashboard/discounts/percentage',
                element: <Percentage></Percentage>
            },
            {
                path: '/dashboard/appearance',
                element: <Appearance></Appearance>
            },
            {
                path: '/dashboard/myaccounts',
                element: <MyAccount></MyAccount>
            },
            {
                path: '/dashboard/storesettings',
                element: <StoreSettings></StoreSettings>
            },
        ]
    }
])