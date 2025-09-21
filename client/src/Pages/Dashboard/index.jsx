import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import NgoDashboard from './NgoDashboard'
import CreateCampaign from './CreateCampaign'
const Dashboard = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<NgoDashboard />} />
                <Route path='/createcampaign' element={<CreateCampaign />} />

            </Routes>
            <Footer />
        </>
    )
}

export default Dashboard