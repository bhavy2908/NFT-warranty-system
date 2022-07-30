import React, { useState, useEffect } from 'react'
import p1 from './images/product1.png'
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
var user_email = null
const authh = getAuth();
onAuthStateChanged(authh, (user) => {
    if (user) {
        user_email = user.email;
    } else {
    }
});

const ViewOrders = () => {

    
    console.log(user_email)

    const purchaseCollectionRef = collection(db, "orders");
    const [orders, setOrders] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const currentOrders = [];
    const [temp, setTemp] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            const data = await getDocs(purchaseCollectionRef);
            setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setRefresh(true)
        };
        if (!refresh)
            getOrders();
        var element = null;
        for (let index = 0; index < orders.length; index++) {
            element = orders[index];
            if (element.user === user_email) {
                console.log('yes')
                currentOrders.push(element)
                console.log(currentOrders)
                
            }
        }
        setTemp(currentOrders);
    }, [refresh]);

    const handleTransfer = (value) => {
        if (value === "0") {
            return ("Non - Transferable")
        }
        else {
            return ("Transferable")
        }
    }


  return (
      <div className='container'>
          <div style={{paddingTop: '50px'}}>
              <h1>Your Orders</h1>
              <hr></hr>
          </div>
          <div>
              {temp.map((order) => {
                  return (
                      <div style={{ height: '130px', backgroundColor: '#EEEEEE', marginTop: '30px', borderRadius: '7px' }}>
                          <div style={{ width: '10%', float: 'left', paddingTop: "10px", paddingLeft: "10px" }}><img style={{ width: '110px' }} src={p1}></img></div>
                          <div style={{ width: '90%', float: "right", paddingTop: "15px" }}>
                              Product: <b>{order.name}</b>
                              <br></br>
                              Price: <b>Rs. {order.price}</b>
                              <br></br>
                              Warranty Type: <b>{handleTransfer(order.transfer)}</b> 
                              <br></br>
                              Warranty Time Period:<b>{order.time} Months</b>
                              <a href="https://testnets.opensea.io/account"><btn  className='btn btn-primary' style={{ float: 'right', marginRight: '10px', marginTop: '-5px' }}>View Warranty</btn></a>
                          </div>
                      </div>
                  )
              })}
              
          </div>
    </div>
  )
}

export default ViewOrders 