import React, { useRef, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import p1 from './images/product1.png';
import rating from './images/rating.png';
import { db } from "./firebase";
import { collection, getDocs, addDoc, getDoc } from "firebase/firestore";
import productReducer from "./productReducer";
import { SET_PRODUCT_DETAILS } from "./constants";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const history = useNavigate();
    const [products, setProducts] = useState([]);
    const productsCollectionRef = collection(db, "products");

    useEffect(() => {
        const getProducts = async () => {
            const data = await getDocs(productsCollectionRef);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

        };

        getProducts();

    }, []);

    const clicked = () => {
        console.log(products)

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
                {products && products.map(product => {
                    const handleBuy = (e) => {
                        e.preventDefault();
                        productReducer.dispatch({type:SET_PRODUCT_DETAILS, payload:{...product}})
                        history('/buy-now') ;
                    }
                    return (
                        
                        <Card style={{ width: '18rem', textAlign:"center", marginRight: "40px", marginTop: "20px " }} key={product.f_name}>
                            <Card.Img variant="top" src={p1} style={{ width: "260px" }} />
                            <Card.Body >
                                <Card.Title>{product.f_name}</Card.Title>
                                <Card.Text >
                                    {product.f_description}
                                    <br></br>
                                    Rs.{product.f_price}
                                </Card.Text>
                                <Button variant="primary" onClick={handleBuy}>Buy Now</Button>
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