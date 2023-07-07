import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { firebase } from '../../hooks/Firebase/firebase';

import AdminForms from '../adminForms/AdminForms';
import './Admin.css'

const AdminLogin = ({ onLogin, onSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                onLogin(); // Notify the parent component that the user has logged in
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Card
            style={{
                margin: "5rem auto", width: "80%", fontFamily: "'Kanit', sans-serif"
            }}>
            <Card.Body>
                <h2 className="text-center mb-4"
                    style={{
                        textAlign: "center", width: "100%", margin: "2rem 0"
                    }}>Admin Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleLogin}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Show Password"
                            onClick={toggleShowPassword}
                        />
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-3">
                        Login
                    </Button>
                </Form>
                <div className="text-center mt-2">
                    <p>
                        Don't have an account?{' '}
                        <Button variant="link" onClick={onSignup}>
                            Signup here
                        </Button>
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
};

const AdminSignup = ({ onSignup, onCancel }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                onSignup(); // Notify the parent component that the user has signed up
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Card
            style={{
                margin: "5rem auto", width: "80%", fontFamily: "'Kanit', sans-serif"
            }}>
            <Card.Body>
                <h2 className="text-center mb-4"
                    style={{
                        textAlign: "center", width: "100%", margin: "2rem 0"
                    }}>Admin Signup</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSignup}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Show Password"
                            onClick={toggleShowPassword}
                        />
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-3">
                        Signup
                    </Button>
                    <div className="text-center mt-2">
                        <Button variant="link" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

const AdminUI = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleSignup = () => {
        setShowSignup(true);
    };

    const handleCancelSignup = () => {
        setShowSignup(false);
    };

    const handleLogout = () => {
        firebase.auth().signOut();
        setLoggedIn(false);
    };

    return (
        <div className='admin'>
            <div className="admin_header">
                <h1> MY SPACE</h1>
            </div>
            <div
                className="admin_main">
                {loggedIn ? (
                    <>
                        <Button
                            style={{
                                margin: "5rem 0"
                            }}
                            onClick={handleLogout}>
                            Logout
                        </Button>
                        <AdminForms />
                    </>
                ) : (
                    <>
                        {showSignup ? (
                            <AdminSignup onSignup={handleLogin} onCancel={handleCancelSignup} />
                        ) : (
                            <AdminLogin onLogin={handleLogin} onSignup={handleSignup} />
                        )}
                    </>
                )}
            </div>
            <div className="admin_footer"></div>
        </div>
    );
};

export default AdminUI;
