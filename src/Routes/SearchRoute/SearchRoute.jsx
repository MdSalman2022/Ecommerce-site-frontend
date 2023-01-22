import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const SearchRoute = ({ children }) => {

    const { searchText, items, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) return <div className='h-screen flex justify-center items-center'><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div></div>;

    if (searchText && items) {
        return children;
    }


    return <Navigate to={`/`} state={{ from: location }} replace></Navigate>
};

export default SearchRoute;