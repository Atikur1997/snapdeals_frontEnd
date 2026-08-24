import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user, loading}=use(AuthContext)
    if(loading){
        return <div className='flex justify-center w-full'><span className="loading loading-spinner text-info w-[50%] "></span></div>
    }
    if(!user){
        return <Navigate to="/login" ></Navigate>
    }
    return children
};

export default PrivateRoutes;