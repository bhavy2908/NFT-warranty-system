import React from 'react'
import Home from './Home'
import './bootstrap.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import Seller from './Addproduct';
import BuyNow from './BuyNow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/' element={<Login />} />
        <Route exact path='/buy-now' element={<BuyNow />} />
        <Route exact path='/add-product' element={<Seller />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App