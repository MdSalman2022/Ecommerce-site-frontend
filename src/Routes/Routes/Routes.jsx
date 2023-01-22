import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../Layout/Main';
import Home from '../../components/Pages/Home/Home';
import CategoryPage from '../../components/Pages/Category/CategoryPage';
import Login from '../../components/Shared/Login/Login';
import Register from '../../components/Shared/Register/Register';
import MyOrders from '../../components/Pages/Dashboard/MyOrders/MyOrders';
import Dashboard from '../../components/Pages/Dashboard/Dashboard/Dashboard'
import AddProduct from '../../components/Pages/Dashboard/AddProduct/AddProduct';
import MyProducts from '../../components/Pages/Dashboard/MyProducts/MyProducts';
import MyBuyers from '../../components/Pages/Dashboard/MyBuyers/MyBuyers';
import DashboardLayout from '../../Layout/DashboardLayout';
import AllSeller from '../../components/Pages/Dashboard/AllSellers/AllSellers';
import AllBuyers from '../../components/Pages/Dashboard/AllBuyers/AllBuyers';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ErrorPage from '../../components/Pages/ErrorPage/ErrorPage';
import Blog from '../../components/Pages/Blog/Blog';
import AllReports from '../../components/Pages/Dashboard/AllReports/AllReports';
import PaymentPage from '../../components/Pages/PaymentPage/PaymentPage';
import SearchPage from '../../components/Pages/SearchPage/SearchPage';
import SearchRoute from '../SearchRoute/SearchRoute';


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
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/search/:name',
                element: <SearchRoute><SearchPage></SearchPage></SearchRoute>
            },
            {
                path: '/category/:id',
                loader: ({ params }) => fetch(`https://buyandsell24-server.vercel.app/category/${params.id}`),
                element: <PrivateRoute><CategoryPage></CategoryPage></PrivateRoute>
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
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: '/dashboard/myorders/',
                element: <PrivateRoute> <MyOrders></MyOrders></PrivateRoute>
            },
            // {
            //     path: '/dashboard/wishlist/',
            //     element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
            // },
            {
                path: '/dashboard/addproduct/',
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path: '/dashboard/addproduct/',
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path: '/dashboard/myproducts/',
                element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
            },
            {
                path: '/dashboard/mybuyers/',
                element: <PrivateRoute><MyBuyers></MyBuyers></PrivateRoute>
            },
            {
                path: '/dashboard/allsellers/',
                element: <PrivateRoute><AllSeller></AllSeller></PrivateRoute>
            },
            {
                path: '/dashboard/allbuyers/',
                element: <PrivateRoute><AllBuyers></AllBuyers></PrivateRoute>
            },
            {
                path: '/dashboard/reports/',
                element: <PrivateRoute><AllReports></AllReports></PrivateRoute>
            },
            {
                path: '/dashboard/payments/:id',
                element: <PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>,
                loader: ({ params }) => fetch(`https://buyandsell24-server.vercel.app/bookedList/${params.id}`)
            },
        ]
    }

])