import React, { useRef, useState, useEffect } from "react";
import { auth } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { db } from "./firebase";
import { collection, getDocs, addDoc, getDoc } from "firebase/firestore";

const Signup = () => {
    const email = useRef(null);
    const pass = useRef(null);
    const name = useRef(null);
    const wallet_id = useRef(null);
    const phone = useRef(null);

    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))            
            setRefresh(true)
        };
        if(!refresh)
        getUsers();

    }, [refresh]);

    const navigate = useNavigate();

    const addData = async (e) => {
        e.preventDefault();
        await addDoc(usersCollectionRef, { f_name: name.current.value, f_email: email.current.value, f_phone: phone.current.value, f_wallet: wallet_id.current.value });
        console.log(users)
        createUserWithEmailAndPassword(auth, email.current.value, pass.current.value).then(
            (authUser) => {
                console.log(authUser)
                navigate('/home');

            }
        ).catch(
            (error) => {
                alert(error.message)
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       
        
    }

    return (
        <div className='bg-primary' style={{ height: "100vh" }}>
            <div className='bg-primary' style={{ width: "500px", marginLeft: "auto", marginRight: "auto", paddingTop: "200px", color: "white" }}>
                <form style={{ marginTop: "0px" }}>
                    <h3>Sign Up</h3>
                    
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            ref={email}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter name"
                            ref={name}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Wallet ID</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter wallet Id(metamask account Id)"
                            ref={wallet_id}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Phone No.</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Phone No."
                            ref={phone}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            ref = {pass}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-warning" onClick={handleSubmit && addData}>
                            Sign Up
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-3" style={{ color: "white", float: "right" }}>
                        Already registered? &nbsp; <Link className='float-end text-warning' to='/' > Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup