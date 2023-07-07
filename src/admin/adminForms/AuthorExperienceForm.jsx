import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { firestore } from '../../hooks/Firebase/firebase';
import { Table, Button, Modal } from 'react-bootstrap';

const fetchAuthorExperience = async () => {
    const snapshot = await firestore.collection('authorExperience').get();
    const data = snapshot.docs.map((doc) => {
        const experience = doc.data();
        experience.id = doc.id;
        return experience;
    });
    return data;
};

const AuthorExperienceForm = () => {
    const updateMutation = useMutation((params) => updateAuthorExperience(...params));
    const deleteMutation = useMutation((experienceId) => deleteAuthorExperience(experienceId));
    const addMutation = useMutation((newExperienceData) => addAuthorExperience(newExperienceData));

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteExperienceId, setDeleteExperienceId] = useState(null);
    const [newExperience, setNewExperience] = useState({
        cardTitle: '',
        cardSubtitle: '',
        cardDetailedText: '',
    });
    const [authorExperience, setAuthorExperience] = useState([]);

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const { isLoading, isError, refetch } = useQuery('authorExperience', fetchAuthorExperience, {
        onSuccess: (data) => {
            setAuthorExperience(data);
        },
        enabled: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    const handleRefresh = () => {
        refetch();
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
    };

    const handleCancel = () => {
        setEditingIndex(null);
    };

    const updateAuthorExperience = async (experienceId, updatedExperience) => {
        try {
            await firestore
                .collection('authorExperience')
                .doc(experienceId)
                .update(updatedExperience);
        } catch (error) {
            throw new Error('Error updating author experience');
        }
    };

    const deleteAuthorExperience = async (experienceId) => {
        try {
            await firestore.collection('authorExperience').doc(experienceId).delete();
        } catch (error) {
            throw new Error('Error deleting author experience');
        }
    };

    const addAuthorExperience = async (newExperienceData) => {
        try {
            const docRef = await firestore.collection('authorExperience').add(newExperienceData);
            const experienceId = docRef.id;
            return { experienceId, newExperienceData };
        } catch (error) {
            throw new Error('Error adding author experience');
        }
    };

    const handleUpdate = async (experienceId, updatedExperience) => {
        try {
            await updateMutation.mutateAsync([experienceId, updatedExperience]);
            setAuthorExperience((prevState) => {
                const updatedExperiences = [...prevState];
                updatedExperiences[editingIndex] = { ...updatedExperience, id: experienceId };
                return updatedExperiences;
            });
            setEditingIndex(null);
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error updating author experience:', error);
        }
    };

    const handleDelete = (experienceId) => {
        setDeleteExperienceId(experienceId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteMutation.mutateAsync(deleteExperienceId);
            setAuthorExperience((prevState) =>
                prevState.filter((experience) => experience.id !== deleteExperienceId)
            );
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting author experience:', error);
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        setAuthorExperience((prevState) => {
            const updatedExperiences = [...prevState];
            updatedExperiences[index][name] = value;
            return updatedExperiences;
        });
    };

    const handleAddExperience = async () => {
        try {
            const { cardTitle, cardSubtitle, cardDetailedText } = newExperience;

            if (!cardTitle || !cardSubtitle || !cardDetailedText) {
                console.error('Please fill in all the fields.');
                return;
            }

            const newExperienceData = {
                cardTitle,
                cardSubtitle,
                cardDetailedText,
            };

            const { experienceId, newExperienceData: addedExperience } = await addMutation.mutateAsync(newExperienceData);
            setAuthorExperience((prevState) => [
                {
                    ...addedExperience,
                    id: experienceId,
                },
                ...prevState,
            ]);
            setNewExperience({
                cardTitle: '',
                cardSubtitle: '',
                cardDetailedText: '',
            });
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error adding author experience:', error);
        }
    };

    return (
        <div style={{ width: '100%', margin: '8rem auto', fontFamily: "'Montserrat', sans-serif" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <h3>Author Experience</h3>
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
                <div>Error fetching author experience</div>
            ) : (
                <React.Fragment>
                    <div className="shadow">
                        <div style={{ margin: '1rem auto' }}>
                            <Table bordered responsive size="lg">
                                <thead>
                                    <tr style={{ fontSize: "15px" }}>
                                        <th>Card Title</th>
                                        <th>Card Subtitle</th>
                                        <th>Card Detailed Text</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {authorExperience.map((experience, index) =>
                                        editingIndex === index ? (
                                            <tr style={{ fontSize: "13px" }} key={experience.id}>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="cardTitle"
                                                        value={experience.cardTitle}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="cardSubtitle"
                                                        value={experience.cardSubtitle}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="cardDetailedText"
                                                        value={experience.cardDetailedText}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <Button
                                                        className='shadow'
                                                        style={{
                                                            fontSize: "14px",
                                                            borderRadius: "0",
                                                            padding: "5px 18px",
                                                            margin: "5px 0"
                                                        }}
                                                        variant="success"
                                                        onClick={() => handleUpdate(experience.id, experience)}
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        className='shadow'
                                                        style={{
                                                            fontSize: "14px",
                                                            borderRadius: "0",
                                                            padding: "5px 10px",
                                                            margin: "5px 0"
                                                        }}
                                                        variant="secondary"
                                                        onClick={handleCancel}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr style={{ fontSize: "13px" }} key={experience.id}>
                                                <td>{experience.cardTitle}</td>
                                                <td>{experience.cardSubtitle}</td>
                                                <td>{experience.cardDetailedText}</td>
                                                <td>
                                                    <Button
                                                        className='shadow'
                                                        style={{
                                                            borderRadius: "0",
                                                            padding: "5px 20px",
                                                            margin: "5px 0",
                                                            fontSize: "14px"
                                                        }}
                                                        variant="info"
                                                        onClick={() => handleEdit(index)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className='shadow'
                                                        style={{
                                                            borderRadius: "0",
                                                            padding: "5px 10px",
                                                            margin: "5px 0",
                                                            fontSize: "14px"
                                                        }}
                                                        variant="danger"
                                                        onClick={() => handleDelete(experience.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <div
                            style={{
                                background: "inherit", margin: "2rem auto", width: "95%",
                                alignItems: "left"
                            }}>
                            <h4>Add New Experience</h4>
                            <div
                                style={{
                                    margin: "1rem 0", alignItems: "center", display: "flex", gap: "0.5rem"
                                }}>
                                <label>Card Title:</label>
                                <input
                                    type="text"
                                    name="cardTitle"
                                    value={newExperience.cardTitle}
                                    onChange={(e) => setNewExperience((prevState) => ({ ...prevState, cardTitle: e.target.value }))}
                                />
                            </div>
                            <div
                                style={{
                                    margin: "1rem 0", alignItems: "center", display: "flex", gap: "0.5rem"
                                }}>
                                <label>Card Subtitle:</label>
                                <input
                                    type="text"
                                    name="cardSubtitle"
                                    value={newExperience.cardSubtitle}
                                    onChange={(e) => setNewExperience((prevState) => ({ ...prevState, cardSubtitle: e.target.value }))}
                                />
                            </div>
                            <div
                                style={{
                                    margin: "1rem 0", alignItems: "center", display: "flex", gap: "0.5rem"
                                }}>
                                <label>Card Detailed Text:</label>
                                <input
                                    type="text"
                                    name="cardDetailedText"
                                    value={newExperience.cardDetailedText}
                                    onChange={(e) => setNewExperience((prevState) => ({ ...prevState, cardDetailedText: e.target.value }))}
                                />
                            </div>
                            <div
                                style={{
                                    margin: "1rem 0", alignItems: "center", display: "flex", gap: "0.5rem"
                                }}>
                                <Button
                                    className='shadow'
                                    style={{
                                        fontSize: "14px",
                                        borderRadius: "5px",
                                        padding: "5px 18px",
                                        margin: "2rem 0"
                                    }}
                                    variant="success"
                                    onClick={handleAddExperience}
                                >
                                    Add Experience
                                </Button>
                            </div>
                        </div>
                        <Modal style={{ color: '#0D1117' }} show={showSuccessModal} onHide={handleCloseSuccessModal}>
                            <Modal.Body>
                                <p>Experience updated successfully.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseSuccessModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal style={{ color: '#0D1117' }} show={showDeleteModal} onHide={handleCloseDeleteModal}>
                            <Modal.Body>
                                <p>Areyou sure you want to delete this experience?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseDeleteModal}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={confirmDelete}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default AuthorExperienceForm;
