import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { useQuery } from '@tanstack/react-query';
import { animateScroll as scroll } from 'react-scroll'


export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
 
    // let [cart, setCart] = useState([]);

    const [cart, setCart] = useState(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        return savedCart ? savedCart : [];
      });
     
    const scrolltop = () => {
        scroll.scrollToTop();
    }
    
    
    // useEffect(() => {
    //     const shoppingCart = localStorage.getItem("cart");
    //     if (!shoppingCart) {
    //       // If not, create an empty array and store it in localStorage
    //       localStorage.setItem("cart", JSON.stringify([]));
    //     } else {
    //         setCart(JSON.parse(shoppingCart));
    //     }
    // }, []);

    let [subTotal, setSubPrice] = useState(0)
    let [paymentDetails, setPaymentDetails] = useState({})
 
    
    const [allUsers, setAllUsers] = useState('')

    const [loading, setLoading] = useState(true)

    const [title, setTitle] = useState('home')

    
    let [searchText, setSearchText] = useState("")

    let [searchedItems, setSearchedItems] = useState("")

    useEffect(() => {
        fetch(`https://bestdeal-ecommerce-server.vercel.app/search?name=${searchText}`)
            .then(res => res.json())
            .then(data => setSearchedItems(data))
    }, [searchText])


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart.length]);

    useEffect(() => {
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
        if (cartFromLocalStorage && JSON.stringify(cartFromLocalStorage) !== JSON.stringify(cart)) {
          setCart(cartFromLocalStorage);
        }
      }, [cart]);

    

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch('https://bestdeal-ecommerce-server.vercel.app/products')
            .then(res => res.json())
    },[])
 
    const [user, setUser] = useState(null)


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
            console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
        });

        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        allUsers,
        setAllUsers,
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
        scrolltop
        
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider