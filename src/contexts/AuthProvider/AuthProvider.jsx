import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { useQuery } from '@tanstack/react-query';
import { animateScroll as scroll } from 'react-scroll'
import { getAnalytics } from 'firebase/analytics'; 



export const AuthContext = createContext();
const auth = getAuth(app)

const analysis = getAnalytics(app)

const AuthProvider = ({ children }) => {

  
 
    // let [cart, setCart] = useState([]);

    const [cart, setCart] = useState(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        return savedCart ? savedCart : [];
      });
     
    const scrolltop = () => {
        scroll.scrollToTop();
    }
    
  
    
    let [subTotal, setSubPrice] = useState(0)
    let [paymentDetails, setPaymentDetails] = useState({})
 
     

    const [loading, setLoading] = useState(true)

    const [title, setTitle] = useState('home')
    

    const { data: allUsers = [] } = useQuery({
        queryKey: ['getusers'],
        queryFn: () => fetch('https://bestdeal-ecommerce-server.vercel.app/getusers')
        .then(res => res.json())
    }, [])
  
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch('https://bestdeal-ecommerce-server.vercel.app/products')
        .then(res => res.json())
        
    }, [])

/*     const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ['products', { sort: 'price', page: 1 }],
        queryFn: async (params) => {
          const query = new URLSearchParams(params).toString();
          const response = await fetch(`https://bestdeal-ecommerce-server.vercel.app/products?${query}`);
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          return response.json();
        },
        staleTime: 60000, // 1 minute
        cacheTime: 3600000, // 1 hour
      });
    
      if (isLoading) {
        console.log('Loading...')
      }
    
      if (isError) {
        console.log('Error')
    } */
    
    /*
    !Search for users starts 
    */
    let [searchText, setSearchText] = useState("")

    let [searchResult, setSearchResult] = useState("")

    let [searchedItems, setSearchedItems] = useState("")


    /* 
    !Search for users ends 
    */


    /* 
    ! Search for dashboard starts 
    */

    let [dashboardSearch, setDashBoardSearch] = useState("")

    
    const [results, setResults] = useState([]);


    /* 
    !Search for dashboard ends 
    */


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart.length]);

    useEffect(() => {
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
        if (cartFromLocalStorage && JSON.stringify(cartFromLocalStorage) !== JSON.stringify(cart)) {
          setCart(cartFromLocalStorage);
        }
      }, [cart]);


 
    const [user, setUser] = useState(null)
    
    const { data: orders = [] } = useQuery({
        queryKey: ['orderhistory'],
        queryFn: () => fetch('https://bestdeal-ecommerce-server.vercel.app/orderhistory')
            .then(res => res.json())
    }, [])

 /*    const { data: orders = [] } = useQuery({
        queryKey: ['orderhistory'],
        queryFn: async () => {
          const response = await fetch('https://bestdeal-ecommerce-server.vercel.app/orderhistory')
          const data = await response.json()
          return data
        },
        staleTime: 60000, // cache for 1 minute
        cacheTime: 600000, // keep cache for 10 minutes
        refetchOnMount: false, // don't refetch on mount
        refetchOnWindowFocus: false // don't refetch on window focus
      })
      
    if (isLoading) {
          console.log('Loading...')
        // render loading state
    } else if (isError) {
        console.log('Error')
        // render error state
    } else {
        // render orders data
      } */
      

    const createUser = (name, email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, name, email, password)
    }

    const updateUser = (userInfo) => {
        setLoading(true)

        return updateProfile(auth.currentUser, userInfo)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const providerLogin = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    if (loading) {
        <progress className="progress w-56"></progress>
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log(currentUser)
          setLoading(false)
        });

        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading, 
        setLoading,
        updateUser,
        createUser,
        signIn,
        providerLogin,
        logOut,   
        setTitle,
        title,
        products,
        cart,
        setCart,
        setSearchedItems,
        searchedItems,
        setSearchText,
        searchText,
        setSubPrice,
        subTotal,
        setPaymentDetails,
        paymentDetails,
        scrolltop,
        orders,
        //dashboard search
        dashboardSearch,
        setDashBoardSearch,
        setResults,
        results,
        setSearchResult,
        searchResult,
        allUsers
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider