import React from 'react'
import tick from './images/tick.png'
import p1 from './images/product1.png'

const BuyNow = () => {
  return (
      <div>
          <div style={{ width: "100%", textAlign: "center", marginTop: "50px", marginBottom: "50px" }}>
              <img style={{ width: "100px", marginLeft: "auto", marginRight: "auto" }} src={tick}></img>
              <br></br>
              <b>Your purchase was successful!</b>
          </div>
          <div style={{ float: "left", width: "30%", height: "", backgroundColor: "" }}>
              <img style={{marginLeft: "190px", width: "200px"}} src={p1}></img>
          </div>
          <div style={{ float: "right", width: "70%", height: "", backgroundColor: "", paddingRight: "200px", paddingTop: "20px" }}>
              Product Name:
              <br></br>
              Price:
              <br></br>
              <hr></hr>
              Name:
              <br></br>
              Phone:
              <br></br>
              Email:
          </div>
          <div style={{ float: "left", width: "100%", height: "", backgroundColor: "", paddingLeft: "200px", paddingRight: "200px" }}>
              <hr></hr>
              Your product is eligible for Warranty.
              <br></br>
              <b>Warranty Period: </b>
              <br></br>
              Your Warranty is Transferable.
              <br></br>
              <b>No. of times Warranty is transferable: </b>
              <br></br>
              <br></br>
              <b>A digital copy of your Warranty is sent to your registerd mobile number and email.</b>
              <br></br>
              To view your warranty, click the button below.
              <br></br>
              <br></br>
              <button className='btn btn-primary'>View Warranty</button>

          </div>
    </div>
  )
}

export default BuyNow