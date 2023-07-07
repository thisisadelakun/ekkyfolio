import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { firestore, storage } from '../../hooks/Firebase/firebase';
import { Table, Button, Modal } from 'react-bootstrap';

const fetchAuthorProjects = async () => {
    const snapshot = await firestore.collection('authorProjects').get();
    const data = snapshot.docs.map((doc) => {
        const project = doc.data();
        project.id = doc.id;
        return project;
    });
    return data;
};

const AuthorProjectForm = () => {
    const updateMutation = useMutation((params) => updateAuthorProject(...params));
    const deleteMutation = useMutation((projectId) => deleteAuthorProject(projectId));
    const addMutation = useMutation((newProjectData) => addAuthorProject(newProjectData));

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteProjectId, setDeleteProjectId] = useState(null);
    const [newProject, setNewProject] = useState({
        title: '',
        author: '',
        content: '',
        img: null,
    });
    const [authorProjects, setAuthorProjects] = useState([]);

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const { isLoading, isError, refetch } = useQuery('authorProjects', fetchAuthorProjects, {
        onSuccess: (data) => {
            setAuthorProjects(data);
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

    const updateAuthorProject = async (projectId, updatedProject) => {
        try {
            await firestore
                .collection('authorProjects')
                .doc(projectId)
                .update(updatedProject);
        } catch (error) {
            throw new Error('Error updating author project');
        }
    };

    const deleteAuthorProject = async (projectId) => {
        try {
            await firestore.collection('authorProjects').doc(projectId).delete();
        } catch (error) {
            throw new Error('Error deleting author project');
        }
    };

    const addAuthorProject = async (newProjectData) => {
        try {
            const docRef = await firestore.collection('authorProjects').add(newProjectData);
            const projectId = docRef.id;
            return { projectId, newProjectData };
        } catch (error) {
            throw new Error('Error adding author project');
        }
    };

    const handleUpdate = async (projectId, updatedProject) => {
        try {
            await updateMutation.mutateAsync([projectId, updatedProject]);
            setAuthorProjects((prevState) => {
                const updatedProjects = [...prevState];
                updatedProjects[editingIndex] = { ...updatedProject, id: projectId };
                return updatedProjects;
            });
            setEditingIndex(null);
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error updating author project:', error);
        }
    };

    const handleDelete = (projectId) => {
        setDeleteProjectId(projectId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteMutation.mutateAsync(deleteProjectId);
            setAuthorProjects((prevState) =>
                prevState.filter((project) => project.id !== deleteProjectId)
            );
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting author project:', error);
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        setAuthorProjects((prevState) => {
            const updatedProjects = [...prevState];
            updatedProjects[index][name] = value;
            return updatedProjects;
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewProject((prevState) => ({ ...prevState, img: file }));
    };

    const uploadImage = async (imageFile) => {
        try {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`authorProjects/${imageFile.name}`);
            await fileRef.put(imageFile);
            const imageUrl = await fileRef.getDownloadURL();
            return imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const handleAddProject = async () => {
        try {
            const { title, author, content, img } = newProject;

            if (!title || !author || !content || !img) {
                console.error('Please fill in all the fields.');
                return;
            }

            const imageUrl = await uploadImage(img);

            if (!imageUrl) {
                console.error('Image upload failed.');
                return;
            }

            const newProjectData = {
                title,
                author,
                content,
                img: imageUrl,
            };

            const { projectId, newProjectData: addedProject } = await addMutation.mutateAsync(newProjectData);
            setAuthorProjects((prevState) => [
                {
                    ...addedProject,
                    id: projectId,
                },
                ...prevState,
            ]);
            setNewProject({
                title: '',
                author: '',
                content: '',
                img: null,
            });
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error adding author project:', error);
        }
    };


    return (
        <div style={{ width: '100%', margin: '8rem auto', fontFamily: "'Montserrat', sans-serif" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <h3>Author Projects</h3>
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
                <div>Error fetching author projects</div>
            ) : (
                <React.Fragment>
                    <div className="shadow">
                        <div style={{ margin: '1rem auto' }}>
                            <Table bordered responsive size="lg">
                                <thead>
                                    <tr style={{ fontSize: "15px" }}>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Content</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {authorProjects.map((project, index) =>
                                        editingIndex === index ? (
                                            <tr style={{ fontSize: "13px" }} key={project.id}>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={project.title}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="author"
                                                        value={project.author}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <textarea
                                                        name="content"
                                                        value={project.content}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="file"
                                                        name="img"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
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
                                                        onClick={() => handleUpdate(project.id, project)}
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
                                            <tr style={{ fontSize: "13px" }} key={project.id}>
                                                <td>{project.title}</td>
                                                <td>{project.author}</td>
                                                <td>{project.content}</td>
                                                <td>
                                                    <img src={project.img} alt="Project" style={{ width: '50px', height: '50px' }} />
                                                </td>
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
                                                        onClick={() => handleDelete(project.id)}
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
                            <h4>Add New Project</h4>
                            <div
                                style={{
                                    margin: "1rem 0", alignItems: "center", display: "flex", gap: "0.5rem"
                                }}>
                                <label>Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newProject.title}
                                    onChange={(e) => setNewProject((prevState) => ({ ...prevState, title: e.target.value }))}
                                />
                            </div>
                            <div
                                style={{
                                    margin: "1rem 0", alignItems: "center", display: "flex", gap: "0.5rem"
                                }}>
                                <label>Author:</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={newProject.author}
                                    onChange={(e) => setNewProject((prevState) => ({ ...prevState, author: e.target.value }))}
                                />
                            </div>
                            <div
                                style={{
                                    margin: "1rem 0", alignItems: "center", display: "flex", gap: "0.5rem"
                                }}>
                                <label>Content:</label>
                                <textarea
                                    name="content"
                                    value={newProject.content}
                                    onChange={(e) => setNewProject((prevState) => ({ ...prevState, content: e.target.value }))}
                                />
                            </div>
                            <div
                                style={{
                                    margin: "1rem 0", alignItems: "center", display: "flex", gap: "0.5rem"
                                }}>
                                <label>Image:</label>
                                <input
                                    type="file"
                                    name="img"
                                    accept="image/*"
                                    onChange={handleImageChange}
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
                                    variant="primary"
                                    onClick={handleAddProject}
                                >
                                    Add Project
                                </Button>
                            </div>
                        </div>
                        <Modal style={{ color: '#0D1117' }} show={showSuccessModal} onHide={handleCloseSuccessModal}>
                            <Modal.Body>
                                <p>Project updated successfully.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseSuccessModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal style={{ color: '#0D1117' }} show={showDeleteModal} onHide={handleCloseDeleteModal}>
                            <Modal.Body>
                                <p>Are you sure you want to delete this project?</p>
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

export default AuthorProjectForm;
