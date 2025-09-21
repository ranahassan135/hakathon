import React, { Component, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './Auth'
import Dashboard from './Dashboard'
import PrivateRouting from '../components/PrivateRouting'

const Index = () => {
  return (
    <>
      <Routes>
        <Route path='/*' element={<PrivateRouting Component={Dashboard} />} />
        <Route path='auth/*' element={<Auth />} />
      </Routes>
    </>
  )
}

export default Index