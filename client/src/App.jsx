import React, { useContext } from 'react'
import './App.css'
import '@ant-design/v5-patch-for-react-19';
import Routes from './Pages/Routes'
import { AuthContext } from './contexts/Auth';
function App() {
  const { isAuth } = useContext(AuthContext)

  console.log('isAuth', isAuth)
  return (
    <>

      <Routes />
    </>
  )
}

export default App
