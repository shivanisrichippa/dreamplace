import React from 'react'
import { Routes,Route,Router } from 'react-router-dom'
import Home from './pages/Home'
import Orders from './pages/Orders'
import WhyUs from './pages/WhyUs'
import Cart from './pages/Cart'
import Houses  from './pages/Houses'
import SingleProduct from './pages/SingleProduct'
import PlaceOrder from './pages/PlaceOrder'
import About from './pages/About'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import OurPolicy from './components/OurPolicy'
import SellProperty from './pages/SellProperty'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import  LogOut  from './pages/LogOut'
import  Account  from './pages/Account'


export const backendUrl = import.meta.env.VITE_BACKEND_URL;




const App = () => {
  return (
    <>
     <ToastContainer/>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/houses" element={<Houses />} />
          <Route path="/house/:propertyId" element={<SingleProduct />}/>
        <Route path="/why" element={<WhyUs />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/policy' element={<OurPolicy/>}/>
      
        <Route path='/sell-property' element={<SellProperty/>}/>
        <Route path='/logout' element={<LogOut/>}/>
        <Route path='/account' element={<Account/>}/>
      </Routes>
      <Footer/>
     
    
    </>
  )
}

export default App
