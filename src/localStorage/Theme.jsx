import React, { useState, useEffect } from 'react';
import {BsMoon, BsSunFill} from 'react-icons/bs'

import '../layout/NavBar/NavBar.css'

const Theme = () => {
    const [isNightMode, setIsNightMode] = useState(false);

    useEffect(() => {
        const storedMode = localStorage.getItem('mode');
        setIsNightMode(storedMode === 'night');
    }, []);

    const toggleMode = () => {
        setIsNightMode(prevMode => !prevMode);
        localStorage.setItem('mode', isNightMode ? 'day' : 'night');
    };

    useEffect(() => {
        document.body.classList.toggle('light-mode', !isNightMode);
        document.body.classList.toggle('dark-mode', isNightMode);
    }, [isNightMode]);

    return (
        <button
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                marginTop:"0.8rem",
                fontSize:"14px",
                transition: 'color 0.3s ease',
            }}
            className={`nav-link theme-button ${isNightMode ? 'night-mode' : 'day-mode'}`}
            onClick={toggleMode}
        >
            {isNightMode ? <BsMoon /> : <BsSunFill />}
        </button>
    );
};

export default Theme;
