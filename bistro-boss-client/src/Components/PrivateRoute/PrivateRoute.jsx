/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import loading from '../../assets/others/loader2.gif'

const PrivateRoute = ({children}) => {
    const {user,isLoading} = useSelector(state=>state.auth)
    const location = useLocation();

    if(isLoading){
        return <div>
            <img src={loading} alt="loading" className=" mx-auto"/>
        </div>
    }

    if(user?.email){
        return children
    }

    return (
        <Navigate to="/login" state={{from:location}} replace/>
    );
};

export default PrivateRoute;