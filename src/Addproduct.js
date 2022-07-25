import React, { useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

const Seller = () => {
    const image = useRef(null);
    const name = useRef(null);
    const transfer = useRef(null);
    const time = useRef(null);
    const description = useRef(null);
    const price = useRef(null);

    const handleSubmit = () => {
        console.log("submitted")
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
                            ref={time}
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