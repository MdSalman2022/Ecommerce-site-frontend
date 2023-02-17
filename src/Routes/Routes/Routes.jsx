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
        ]
    }
])