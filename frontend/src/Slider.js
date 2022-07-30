import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import slide1 from './images/slider1.jpg'
import slide2 from './images/slider2.jpg'
import slide3 from './images/slider3.jpg'
import slide4 from './images/slider4.jpg'
import slide5 from './images/slider5.jpg'

const Slider = () => {
    return (
        <div style={{ paddingLeft: "0px", paddingRight: "0px", marginTop: "20px" }}>
      <Carousel >
          <Carousel.Item interval={2000}>
              <img
                  className="d-block w-100"
                  src={slide1}
                  alt="First slide"
              />
              
          </Carousel.Item>
          <Carousel.Item interval={2000}>
              <img
                  className="d-block w-100"
                  src={slide2}
                  alt="Second slide"
              />
              
          </Carousel.Item>
          <Carousel.Item>
              <img
                  className="d-block w-100"
                  src={slide5}
                  alt="Third slide"
              />
              
          </Carousel.Item>
            </Carousel>
        </div>
  )
}

export default Slider