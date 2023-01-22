import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {


    const [allUsers, setAllUsers] = useState('')

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetch('https://buyandsell24-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setAllUsers(data))
    }, [])


    let [searchText, setSearchText] = useState("")

    let [items, setItems] = useState("")

    useEffect(() => {
        fetch(`https://buyandsell24-server.vercel.app/search?name=${searchText}`)
            .then(res => res.json())
            .then(data => setItems(data))
    }, [searchText])

    console.log(items)
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
        setSearchText,
        searchText,
        items,
        setItems

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider