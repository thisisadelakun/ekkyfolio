import React from 'react';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar />
            <div className="layout-col" style={{ flex: '1', marginTop: '10px' }}>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
