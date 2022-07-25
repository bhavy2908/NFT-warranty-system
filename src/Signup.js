import React, { useRef } from 'react'
import { auth } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Signup = () => {
    const email = useRef(null);
    const pass = useRef(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
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

    return (
        <div className='bg-primary' style={{ height: "100vh" }}>
            <div className='bg-primary' style={{ width: "500px", marginLeft: "auto", marginRight: "auto", paddingTop: "300px", color: "white" }}>
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
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            ref = {pass}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-warning" onClick={handleSubmit}>
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