import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import firstletter from '../assets/ekene_logo.png'
import secondletter from '../assets/ekene_logo_red.png'

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

const NavBar = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeMenu = () => setShow(false)


    return (
        <div className="nav-container" fixed='top'>
            {['sm'].map((expand) => (
                <Navbar key={expand} expand={expand} className="container mb-2" >
                    <Container fluid>
                        <Navbar.Brand href="/">
                            <div className='title-logo'>
                                <img src={firstletter} alt="logo" />
                                <img className='red_logo' src={secondletter} alt="logo" />
                            </div>
                        </Navbar.Brand>
                        <FiMenu
                            onClick={handleShow}
                            aria-controls={`offcanvasNavbar-expand-${expand}`}
                            style={{ color: "crimson", width: "30px", height: "50px", cursor: "pointer" }}
                            className='menu-bar'
                        />
                        <Navbar.Offcanvas
                            show={show} onHide={handleClose}
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            style={{ width: "80%" }}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    {/* Ekene  */}
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3 gap-3">
                                    <Link className='Link' to="/" onClick={() => closeMenu()} exact ><span className='menu-link'>HOME</span></Link>
                                    <Link className='Link' to="/about" onClick={() => closeMenu()} exact ><span className='menu-link'>ABOUT</span></Link>
                                    <Link className='Link' to="/portfolio"><span className='menu-link'>PORTFOLIO</span></Link>

                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    );
};

export default NavBar;
