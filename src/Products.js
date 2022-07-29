import React, { useRef, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import p1 from './images/product1.png';
import rating from './images/rating.png';
import { db } from "./firebase";
import { collection, getDocs, addDoc, getDoc, orderBy, query, where} from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [pro, setPro] = useState([]);
    const usersCollectionRef = collection(db, "users");
    const productsCollectionRef = collection(db, "products");
    const q = query(productsCollectionRef, orderBy("timestamp", "desc"));

    useEffect(() => {
        const getProducts = async () => {
            const data = await getDocs(q);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            const res = await axios.get('http://localhost:4001/getproducts');
            setPro(res.data.products.map((prod) => ({ ...prod, id: prod._id})));
        };

        getProducts();

    }, []);

    const navigate = useNavigate();

    const handleClick = async (id) => {
        const authh = getAuth();
        const User = await getDocs(query(usersCollectionRef, where("f_email", "==", authh.currentUser.email)));
        User.forEach(async (doc) => {
            const res = await axios.post('http://localhost:4001/buy',{
                id,
                address: doc.data().f_wallet,
                phoneNo: doc.data().f_phone,
                emailId: doc.data().f_email
            });
            console.log(res);
            navigate("/yourOrders");
        });
    }
    return (
        <div style={{ marginLeft: "100px", marginRight: "100px", marginTop: "20px" }}>
            <div style={{ backgroundColor: "white", paddingTop: "10px", paddingLeft: "10px" }}>
                <h5>Suggested Items</h5>
                <a style={{ color: "grey" }}>Inspired by Your Interest</a>
                <br></br>
            </div>
            <div className="container">
                <div className="row">
                {products && pro && products.map((product, index) => {
                    const prod = pro[index];
                    return (
                        <Card style={{ width: '18rem', textAlign:"center", marginRight: "40px", marginTop: "20px " }}>
                            <Card.Img variant="top" src={p1} style={{ width: "260px" }} />
                            <Card.Body >
                                <Card.Title>{product.f_name}</Card.Title>
                                <Card.Text >
                                    {product.f_description}
                                    <br></br>
                                    Rs.{product.f_price}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleClick(prod._id)}>Buy Now</Button>
                            </Card.Body>
                        </Card>

                    )
                })}
                </div>
            </div>





        </div>
    )
}

export default Products