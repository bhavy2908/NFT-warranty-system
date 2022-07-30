import React from 'react'
import Categories from './Categories'
import Navb from './Nav'
import Products from './Products'
import Slider from './Slider'

const Home = () => {
    return (
        <div style={{ backgroundColor: '#EEEEEE'}}>
            <Navb />
            <Categories />
            <Slider />
            <Products />
        </div>
    )
}

export default Home