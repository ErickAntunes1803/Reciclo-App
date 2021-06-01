import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import logo from '../../assets/logo.png'
import './Header.css';
import { Link } from "react-router-dom";
import consts from '../../Utils/Constants'

const Header = () => {
        return(
     <div>
        {/* <Navbar bg="dark" variant="dark" expand="lg" className='menu'> */}
        <Navbar  expand="lg" className='menuHeader'>
        <Navbar.Brand href= {`${consts.BASE_URL}/`}> 
            <img src={logo} alt="" className="logoNav"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
            </Nav>
        </Navbar.Collapse>
        </Navbar>

     </div>
    );

}

export default Header;