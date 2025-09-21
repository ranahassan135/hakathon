import React, { useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import { AuthContext } from '../../contexts/Auth'


const Auth = () => {
  const navigate = useNavigate()
   const { isAuth } = useContext(AuthContext)
    console.log('isAuth', isAuth)
    if(isAuth) return navigate('/')
  return (
    <>
    <Routes>
      <Route path='login'element={<Login/>} />
      <Route path='register'element={<Register/>} />
    </Routes>
    </>
  )
}

export default Auth