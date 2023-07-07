import React, { useState } from 'react';
import { firestore } from '../../hooks/Firebase/firebase';
import { Table, Button, Modal } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const AuthorSkillsForm = () => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteSkillId, setDeleteSkillId] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [authorSkills, setAuthorSkills] = useState([]);

    const { isLoading, isError, error, refetch } = useQuery('authorSkills', async () => {
        const snapshot = await firestore.collection('authorSkills').get();
        const data = snapshot.docs.map((doc) => {
            const skill = doc.data();
            skill.id = doc.id;
            return skill;
        });
        setAuthorSkills(data);
        return data;
    }, {
        enabled: false, // Prevents auto-fetching
        refetchOnWindowFocus: false, // Disables refetch on window focus
    });


    const handleEdit = (index) => {
        setEditingIndex(index);
    };

    const handleCancel = () => {
        setEditingIndex(null);
    };

    const queryClient = useQueryClient();

    const updateAuthorSkill = useMutation(
        async (skillData) => {
            const { id, ...updatedSkill } = skillData;
            await firestore.collection('authorSkills').doc(id).update(updatedSkill);
        },
        {
            onSuccess: () => {
                setShowSuccessModal(true);
            },
            onError: (error) => {
                console.error('Error updating author skill:', error);
            },
            onSettled: () => {
                refetch(); // Manually trigger the query to fetch updated skills
                setEditingIndex(null);
            },
        }
    );

    const deleteAuthorSkill = useMutation(
        async (skillId) => {
            await firestore.collection('authorSkills').doc(skillId).delete();
        },
        {
            onSuccess: () => {
                setShowDeleteModal(false);
            },
            onError: (error) => {
                console.error('Error deleting author skill:', error);
            },
            onSettled: () => {
                refetch(); // Manually trigger the query to fetch updated skills
            },
        }
    );

    const addAuthorSkill = useMutation(
        async () => {
            const newSkill = {
                skills1: '',
                skills2: '',
                skills3: '',
                skills4: '',
                skills5: '',
                title: '',
            };
            const docRef = await firestore.collection('authorSkills').add(newSkill);
            return { id: docRef.id, ...newSkill };
        },
        {
            onSettled: () => {
                refetch(); // Manually trigger the query to fetch updated skills
            },
        }
    );


    const handleUpdate = (skillId, updatedSkill) => {
        updateAuthorSkill.mutate({ skillId, updatedSkill });
    };

    const handleDelete = (skillId) => {
        setDeleteSkillId(skillId);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        deleteAuthorSkill.mutate(deleteSkillId);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        setAuthorSkills((prevState) => {
            const updatedSkills = [...prevState];
            updatedSkills[index][name] = value;
            return updatedSkills;
        });
    };

    const handleAddSkill = () => {
        addAuthorSkill.mutate();
        refetch(); // Manually trigger the query to fetch updated skills
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };
    const handleRefresh = () => {
        refetch();
    };


    return (
        <div style={{ width: '100%', margin: '8rem auto', fontFamily: "'Montserrat', sans-serif" }}>
            <div
                style={{
                    display: "flex", flexDirection: "row", justifyContent: "space-between"
                }}>
                <h3>Author Skills</h3>
                <Button
                    className="shadow"
                    style={{ margin: '2rem' }}
                    variant="secondary"
                    onClick={handleRefresh}
                    disabled={isLoading} // Disable the button while the query is loading
                >
                    {isLoading ? 'Refreshing...' : 'Refresh'}
                </Button>
            </div>
            {isError && <div>Error: {error.message}</div>}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="shadow" style={{ margin: '1rem auto' }}>
                    <Table bordered responsive size="lg">
                        <thead>
                            <tr style={{ fontSize: '14px' }}>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Skills</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authorSkills.map((skill, index) => (
                                <tr style={{ fontSize: '13px' }} key={skill.id}>
                                    <td>{skill.id}</td>
                                    <td>
                                        {editingIndex === index ? (
                                            <input
                                                type="text"
                                                name="title"
                                                value={skill.title}
                                                placeholder="Skill title"
                                                onChange={(e) => handleInputChange(e, index)}
                                            />
                                        ) : (
                                            skill.title
                                        )}
                                    </td>
                                    <td>
                                        {editingIndex === index ? (
                                            <>
                                                <input
                                                    type="text"
                                                    name="skills1"
                                                    value={skill.skills1}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                />
                                                <input
                                                    type="text"
                                                    name="skills2"
                                                    value={skill.skills2}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                />
                                                <input
                                                    type="text"
                                                    name="skills3"
                                                    value={skill.skills3}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                />
                                                <input
                                                    type="text"
                                                    name="skills4"
                                                    value={skill.skills4}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                />
                                                <input
                                                    type="text"
                                                    name="skills5"
                                                    value={skill.skills5}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                />
                                            </>
                                        ) : (
                                            `${skill.skills1}, ${skill.skills2}, ${skill.skills3}, ${skill.skills4}, ${skill.skills5}`
                                        )}
                                    </td>
                                    <td>
                                        {editingIndex === index ? (
                                            <>
                                                <Button
                                                    className="shadow"
                                                    style={{
                                                        borderRadius: '0',
                                                        padding: '5px 15px',
                                                        margin: '5px 0',
                                                        fontSize: '14px',
                                                    }}
                                                    variant="success"
                                                    onClick={() => handleUpdate(skill.id, skill)}
                                                    disabled={updateAuthorSkill.isLoading} // Disable the button while the mutation is processing
                                                >
                                                    {updateAuthorSkill.isLoading ? 'Updating...' : 'Update'}
                                                </Button>
                                                <Button
                                                    className="shadow"
                                                    style={{
                                                        borderRadius: '0',
                                                        padding: '5px 17px',
                                                        margin: '5px 0',
                                                        fontSize: '14px',
                                                    }}
                                                    variant="primary"
                                                    onClick={handleCancel}
                                                    disabled={updateAuthorSkill.isLoading} // Disable the button while the mutation is processing
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    className="shadow"
                                                    style={{
                                                        borderRadius: '0',
                                                        padding: '5px 15px',
                                                        margin: '5px 0',
                                                        fontSize: '14px',
                                                    }}
                                                    variant="info"
                                                    onClick={() => handleEdit(index)}
                                                    disabled={updateAuthorSkill.isLoading || deleteAuthorSkill.isLoading} // Disable the button while the mutation is processing
                                                >
                                                    {updateAuthorSkill.isLoading ? 'Updating...' : 'Edit'}
                                                </Button>
                                                <Button
                                                    className="shadow"
                                                    style={{
                                                        borderRadius: '0',
                                                        padding: '5px',
                                                        margin: '5px 0',
                                                        fontSize: '14px',
                                                    }}
                                                    variant="danger"
                                                    onClick={() => handleDelete(skill.id)}
                                                    disabled={updateAuthorSkill.isLoading || deleteAuthorSkill.isLoading} // Disable the button while the mutation is processing
                                                >
                                                    {deleteAuthorSkill.isLoading ? 'Deleting...' : 'Delete'}
                                                </Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h5 style={{ margin: '0rem 1rem ' }}>Click to add skill(s)</h5>
                    <Button
                        className="shadow"
                        style={{ margin: '2rem' }}
                        variant="success"
                        onClick={handleAddSkill}
                        disabled={addAuthorSkill.isLoading} // Disable the button while the mutation is processing
                    >
                        {addAuthorSkill.isLoading ? 'Adding...' : 'Add Skill'}
                    </Button>

                    <Modal style={{ color: '#0D1117' }} show={showSuccessModal} onHide={handleCloseSuccessModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Success!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>The skill has been updated successfully.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseSuccessModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal style={{ color: '#0D1117' }} show={showDeleteModal} onHide={handleCloseDeleteModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this skill?</Modal.Body>
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
            )}
        </div>
    );
};

export default AuthorSkillsForm;
