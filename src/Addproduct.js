import { collection, getDocs, addDoc, getDoc } from "firebase/firestore";
import React, { useRef, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { db } from "./firebase";
import axios from "axios";

const Seller = () => {
    const image = useRef(null);
    const name = useRef(null);
    const transfer = useRef(null);
    const time = useRef(null);
    const description = useRef(null);
    const price = useRef(null);

    const timestamp = Date.now();

    const navigate = useNavigate();
    
    const [products, setProducts] = useState([]);
    const productsCollectionRef = collection(db, "products");

    useEffect(() => {
        const getProducts = async () => {
            const data = await getDocs(productsCollectionRef);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            
        };

        getProducts();
        
    }, []);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(productsCollectionRef, { f_name: name.current.value, f_price: price.current.value, f_description: description.current.value, f_time: time.current.value, f_transfer: transfer.current.value, timestamp: (new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)) });
        const res = await axios.post('http://localhost:4001/createproduct', {
            name: name.current.value,
            warrantyTime: time.current.value,
            soul: transfer.current.value
        });
        console.log(res);
        navigate("/");
    };

    const handleUpload = () => {
        image.current?.click();
    };

    return (
        <div className='bg-primary' style={{ height: "100vh" }}>
            <div className='bg-primary' style={{ width: "500px", marginLeft: "auto", marginRight: "auto", paddingTop: "175px", color: "white" }}>
                <form >
                    <h3>Add a Product</h3>
                    <div className="mb-3">
                        <label>Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name of the product you would like to sell"
                            ref={name}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Description</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Description of the product"
                            ref={description}
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label>Price in Rupees (₹)</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="eg: (6900)"
                            ref={price}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Warranty Period (in months)</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="eg: (14)"
                            ref={time}
                        />
                    </div>
                    <div className="mb-3">
                        <label>No. of times Warranty is TRANSFERABLE</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter 0 if NOT transferable"
                            ref={transfer}
                        />
                    </div>

                    <div className="">
                        <label className="">Upload Image: </label>
                        <input className="d-none" type="file" ref={image} />
                        <button onClick={handleUpload} className="m-3 btn btn-outline-warning">Upload</button>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-warning" onClick={handleSubmit}>
                            Add 
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Seller