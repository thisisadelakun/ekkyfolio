import React, {useState} from 'react';
import { useQuery, useMutation } from 'react-query';
import { firestore } from '../../hooks/Firebase/firebase';
import { Table, Button, Modal } from 'react-bootstrap';

const fetchContacts = async () => {
    const snapshot = await firestore.collection('contacts').get();
    const data = snapshot.docs.map((doc) => {
        const contact = doc.data();
        contact.id = doc.id;
        return contact;
    });
    return data;
};

const ContactFormUI = () => {
    const deleteMutation = useMutation((contactId) => deleteContact(contactId));

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteContactId, setDeleteContactId] = useState(null);
    const [contacts, setContacts] = useState([]);

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const { isLoading, isError, refetch } = useQuery('contacts', fetchContacts, {
        onSuccess: (data) => {
            setContacts(data);
        },
        enabled: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    const handleRefresh = () => {
        refetch();
    };

    const deleteContact = async (contactId) => {
        try {
            await firestore.collection('contacts').doc(contactId).delete();
            setContacts((prevState) =>
                prevState.filter((contact) => contact.id !== contactId)
            );
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleDelete = (contactId) => {
        setDeleteContactId(contactId);
        setShowDeleteModal(true);
    };

    return (
        <div style={{ width: '100%', margin: '8rem auto', fontFamily: "'Montserrat', sans-serif" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <h3>Contact Form Submissions</h3>
                <Button
                    className="shadow"
                    style={{ margin: '2rem' }}
                    variant="secondary"
                    onClick={handleRefresh}
                    disabled={isLoading}
                >
                    {isLoading ? 'Refreshing...' : 'Refresh'}
                </Button>
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error fetching contacts</div>
            ) : (
                <div className='shadow' style={{ margin: '1rem auto' }}>
                    <Table bordered responsive size="lg">
                        <thead>
                            <tr style={{ fontSize: "15px" }}>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr style={{ fontSize: "13px" }} key={contact.id}>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.message}</td>
                                    <td>
                                        <Button
                                            className='shadow'
                                            style={{
                                                borderRadius: "0",
                                                padding: "5px 10px",
                                                margin: "5px 0",
                                                fontSize: "14px"
                                            }}
                                            variant="danger"
                                            onClick={() => handleDelete(contact.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
            <Modal style={{ color: '#0D1117' }} show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Body>
                    <p>Are you sure you want to delete this contact?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => deleteMutation.mutateAsync(deleteContactId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ContactFormUI;
