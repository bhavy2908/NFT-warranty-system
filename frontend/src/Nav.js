import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import image from "./images/search.png"
import cart from "./images/cart.png"
import React from 'react'
import logo from './images/logo.png'
import heart from './images/heart.gif'
import { auth } from './firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";



var user_email = null
const authh = getAuth();
onAuthStateChanged(authh, (user) => {
    if (user) {
        user_email = user.email;
        user_email = user_email.substring(0, user_email.indexOf('@'));
    } else {
    }
});


const Navb = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/orders')
    }
    
    return (

        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#"><img style={{ width: "90px" }} src={logo}></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 "
                        style={{ maxHeight: '40px' }}
                        navbarScroll
                    >
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                style={{ paddingRight: "400px" }}
                                aria-label="Search"

                            />
                            <Button variant="light"><img style={{ width: "20px" }} src={image} /></Button>


                        </Form>


                        <NavDropdown style={{ marginLeft: "110px", color: "white" }} title={user_email} id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="" onClick={handleClick}>
                                View Orders
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link style={{ marginLeft: "10px", color: "white" }} href="#action1"><h6>Wishlist <img style={{ width: "25px", marginBottom: "5px" }} src={heart}></img></h6></Nav.Link>

                        <Nav.Link style={{ marginLeft: "10px", color: "white" }} href="#action1"><h6><img style={{ width: "18px" }} src={cart}></img>  Cart</h6></Nav.Link>

                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navb