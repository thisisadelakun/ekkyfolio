import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { firestore } from '../Firebase/firebase';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // State to control success modal visibility

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Save form data to Firebase
            await firestore.collection('contacts').add({
                name,
                email,
                message,
            });

            // Reset form fields
            setName('');
            setEmail('');
            setMessage('');

            // Show success modal
            setShowModal(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group style={{ margin: '1rem 0' }} controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
            </Form.Group>

            <Form.Group style={{ margin: '1rem 0' }} controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
            </Form.Group>

            <Form.Group style={{ margin: '1rem 0' }} controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                    required
                />
            </Form.Group>

            <Button style={{ margin: '1rem 0' }} variant="primary" type="submit">
                Send Message
            </Button>

            <Modal style={{ color: '#0D1117' }} show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Thank you for your message! We will get back to you soon.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
};

export default ContactForm;
