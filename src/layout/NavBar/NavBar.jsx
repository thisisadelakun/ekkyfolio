import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../NavBar/NavBar.css';

import { authorInfo, socialsIcon } from '../../localStorage/db'
import Theme from '../../localStorage/Theme';

// import react icons here
import { FiMenu } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

//  import bootsrap components here
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';


const NavBar = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeMenu = () => setShow(false);
    const [hasShadow, setHasShadow] = useState(false);
    const [isNightMode, setIsNightMode] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setHasShadow(true);
                setHasScrolled(true);
            } else {
                setHasShadow(false);
                setHasScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMode = () => {
        setIsNightMode(!isNightMode);
    };

    return (
        <div className={`nav-container ${hasShadow && hasScrolled ? 'shadow show-background' : ''}`} fixed='top'>

            {['lg'].map((expand) => (
                <Navbar key={expand} expand={expand} className="mb-2" >
                    <Container fluid>
                        <Navbar.Brand>
                            <div className='title-logo'>
                                <NavLink to="/">
                                    <img src={authorInfo.logo1} alt="logo" />
                                    <img className='red_logo' src={authorInfo.logo2} alt="logo" />
                                </NavLink>
                            </div>
                        </Navbar.Brand>
                        <FiMenu
                            onClick={handleShow}
                            aria-controls={`offcanvasNavbar-expand-${expand}`}
                            style={{ width: "30px", height: "50px", cursor: "pointer", marginTop:"1rem" }}
                            className='menu-bar'
                        />
                        <Navbar.Offcanvas
                            show={show} onHide={handleClose}
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            className="offcanvasbgr"
                            style={{ width: "100%" }}

                        >
                            <Offcanvas.Header className="offcanvas-header">
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    {/* Empty */}
                                </Offcanvas.Title>
                                <button className="custom-close-button" onClick={handleClose}>
                                    <CgClose className='custom-close-button' />
                                </button>
                            </Offcanvas.Header>



                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-0 gap-2">

                                    <li className="nav-item nav-item-border">
                                        <Link
                                            to="/"
                                            className="nav-link"
                                            onClick={() => closeMenu()}
                                            exact="true"
                                        >
                                            HOME
                                        </Link>
                                    </li>
                                    <li className="nav-item nav-item-border">
                                        <Link
                                            to="/about-me"
                                            className="nav-link"
                                            onClick={() => closeMenu()}
                                            exact="true"
                                        >
                                            ABOUT
                                        </Link>
                                    </li>
                                    <li className="nav-item nav-item-border">
                                        <Link
                                            to="/portfolio"
                                            className="nav-link"
                                            onClick={() => closeMenu()}
                                            exact="true"
                                        >
                                            PORTFOLIO

                                        </Link>
                                    </li>
                                    <li className="nav-item nav-item-border">
                                        <Link
                                            to="/portfolio"
                                            className="nav-link"
                                            onClick={() => closeMenu()}
                                            exact="true"
                                        >
                                            BLOG

                                        </Link>
                                    </li>
                                    <li className="nav-item nav-item-border">
                                        <Link
                                            to="/contact-me"
                                            className="nav-link"
                                            onClick={() => closeMenu()}
                                            exact="true"
                                        >
                                            CONTACT
                                        </Link>
                                    </li>
                                    <li className="nav-item ">
                                        <Theme className="nav-link" />
                                    </li>

                                    <li className='nav-link-socios'>
                                        <a href="https://www.linkedin.com/in/ekene-emmanuel-0b9167238" target="_blank" rel="noopener noreferrer">
                                            {socialsIcon.linkedIn}
                                        </a>
                                        <a href="https://twitter.com/ekky_boss" target="_blank" rel="noopener noreferrer">
                                            {socialsIcon.twitter}
                                        </a>
                                        <a href="https://www.instagram.com/ekky_boss" target="_blank" rel="noopener noreferrer">
                                            {socialsIcon.instagram}
                                        </a>

                                    </li>
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
