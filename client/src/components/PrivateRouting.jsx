import React, { useContext } from 'react'
import { AuthContext } from '../contexts/Auth'
import { Navigate } from 'react-router-dom'

const PrivateRouting = ({ Component }) => {
    const { isAuth } = useContext(AuthContext)
    // console.log('isAuth', isAuth)
    if (!isAuth) return <Navigate to={"/auth/login"} />
    return (

        <Component />
    )
}

export default PrivateRouting