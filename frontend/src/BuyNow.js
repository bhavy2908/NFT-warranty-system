import React, { useState, useEffect} from 'react'
import tick from './images/tick.png'
import p1 from './images/product1.png'
import productReducer from './productReducer'
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

var user_email = null
const authh = getAuth();
onAuthStateChanged(authh, (user) => {
    if (user) {
        user_email = user.email;
    } else {
    }
});

const BuyNow = () => {
    const product = productReducer.getState().productReducer.productDetails;
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState(null);
    const [userPhone, setUserPhone] = useState(null)
    const [refresh, setRefresh] = useState(false);
    const [transfer, setTransfer] = useState(null)
    const usersCollectionRef = collection(db, "users");
    
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))            
            setRefresh(true)
        };
        if(!refresh)
        getUsers();
        for (let index = 0; index < users.length; index++) {
            const element = users[index];
            if (element.f_email === user_email) {
                setUserName(element.f_name);
                setUserPhone(element.f_phone);
                return;
            }
        }
        console.log(product.f_transfer);
        if (product.f_transfer === '0') {
            setTransfer('not');
        }
    }, [refresh]);
    const hideTransfer = (value) => {
        if (value === 'not') {
            return ('')
        }
        else {
            return (<b>No. of times Warranty is transferable: {product.f_transfer}</b>)
        }
    }
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
              Product Name: <b>{product.f_name}</b>
              <br></br>
              Price: <b>{product.f_price}</b>
              <br></br>
              <hr></hr>
              Name: <b> {userName}</b>
              <br></br>
              Phone: <b>{userPhone}</b>
              <br></br>
              Email: <b>{user_email}</b>
          </div>
          <div style={{ float: "left", width: "100%", height: "", backgroundColor: "", paddingLeft: "200px", paddingRight: "200px" }}>
              <hr></hr>
              Your product is eligible for Warranty.
              <br></br>
              <b>Warranty Period: {product.f_time} Months </b>
              <br></br>
              Your Warranty is {transfer} Transferable.
              <br></br>
              {hideTransfer(transfer)}
              <br></br>
              <br></br>
              <b>Your warranty will be issued to you in a very short time which will be notified to you by email and a sms.</b>
              <br></br>
              To view your warranty, click the button below.
              <br></br>
              <br></br>
              <a href="https://testnets.opensea.io/account"><button className='btn btn-primary'>View Warranty</button></a>

          </div>
    </div>
  )
}

export default BuyNow