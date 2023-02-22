import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../Layout/Main';
import Login from '../../components/Shared/Login/Login';
import Register from '../../components/Shared/Register/Register'; 
import ErrorPage from '../../Pages/ErrorPage/ErrorPage';
import Home from '../../Pages/Home/Home';    
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import ProductPage from '../../Pages/ProductPage/ProductPage'; 
import CartPage from '../../components/CartPage/CartPage';
import SearchPage from '../../Pages/SearchPage/SearchPage';
import BrandPage from '../../Pages/BrandPage/BrandPage';
import DashboardLayout from '../../Layout/DashboardLayout';
import Dashboard from '../../Pages/Dashboard/Dashboard/Dashboard';
import Products from '../../Pages/Dashboard/Products/Products';
import Orders from '../../Pages/Dashboard/Orders/Orders';
import Shipments from '../../Pages/Dashboard/Shipments/Shipments';
import CheckoutPage from '../../components/CheckoutPage/CheckoutPage';
import OrderConfirm from '../../components/OrderConfirm/OrderConfirm';


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
                path: '/productdetails/:id/:name',
                loader: ({ params }) => fetch(`https://bestdeal-ecommerce-server.vercel.app/product/${params.id}`),
                element: <ProductDetails></ProductDetails>
            }, 
            {
                path: '/:category',
                element: <ProductPage></ProductPage>
            }, 
            {
                path: '/:category/:subcategory',
                element: <ProductPage></ProductPage>
            },
            {
                path: '/:category/:subcategory/:brand',
                element: <ProductPage></ProductPage>
            },
            {
                path: '/cart',
                element: <CartPage></CartPage>
            },  
            {
                path: '/checkout',
                element: <CheckoutPage></CheckoutPage>
            },  
            {
                path: '/order-confirm',
                element: <OrderConfirm></OrderConfirm>
            },  
            {
                path: '/search/:name',
                element: <SearchPage></SearchPage>
            },
            {
                path: '/brand/:name',
                element: <BrandPage></BrandPage>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ],
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/home',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/products',
                element: <Products></Products>
            },
            {
                path: '/dashboard/orders',
                element: <Orders></Orders>
            },
            {
                path: '/dashboard/shipments',
                element: <Shipments></Shipments>
            },
        ]
    }
])