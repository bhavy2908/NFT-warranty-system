import React from 'react'
import Home from './Home'
import './bootstrap.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App