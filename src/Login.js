import React, { useRef } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    const email = useRef(null);
    const pass = useRef(null);
    const navigate = useNavigate();

    

    

    

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email.current.value, pass.current.value).then(
            (authUser) => {

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
                <form >
                    <h3>Sign In</h3>
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
                            ref={pass}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="custom-control custom-checkbox ">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                            />
                            <label className="custom-control-label" htmlFor="customCheck1">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-warning" onClick = {handleSubmit}>
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right w-100" >
                        <Link className='mt-3 text-warning' to='add-product' >Are you a seller?</Link>

                        <Link className='float-end text-warning' to='signup' >Sign Up</Link>
                    </p>
                </form>

            </div>
        </div>
    )

}

export default Login