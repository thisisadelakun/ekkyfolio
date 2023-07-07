import React, { useState } from 'react';
import { firestore, firebase } from '../../hooks/Firebase/firebase';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Table, Button, Modal } from 'react-bootstrap';

const AuthorsInfoForm = () => {
    const [authorInfoState, setAuthorInfo] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const queryClient = useQueryClient();

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const fetchAuthorInfo = async () => {
        const snapshot = await firestore.collection('authorInfo').get();
        const data = snapshot.docs.map((doc) => {
            const info = doc.data();
            info.editing = false;
            info.id = doc.id;
            return info;
        });
        setAuthorInfo(data); // Update authorInfo state here
        return data;
    };


    const {
        data: authorInfoQuery, // Rename the destructured variable
        isLoading,
        isError,
        refetch,
    } = useQuery('authorInfo', fetchAuthorInfo, {
        enabled: false,
        refetchOnWindowFocus: false,
    });

    const mutation = useMutation((author) =>
        firestore.collection('authorInfo').doc(author.id).update(author)
    );

    const handleRefresh = () => {
        refetch();
    };


    const handleEdit = async (index) => {
        try {
            const docId = authorInfoState[index].id;
            const snapshot = await firestore.collection('authorInfo').doc(docId).get();
            const originalAuthorInfo = snapshot.data();

            setAuthorInfo((prevState) => {
                const updatedAuthorInfos = [...prevState];
                updatedAuthorInfos[index] = {
                    ...originalAuthorInfo,
                    editing: !prevState[index].editing,
                };
                return updatedAuthorInfos;
            });
        } catch (error) {
            console.error('Error fetching original author information:', error);
        }
    };


    const handleInputChange = (e, index) => {
        const { name, value, files } = e.target;
        if (name === 'profilePicFile' && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                setAuthorInfo((prevState) => {
                    const updatedAuthorInfos = [...prevState];
                    updatedAuthorInfos[index]['profilePic'] = imageUrl;
                    return updatedAuthorInfos;
                });
            };
            reader.readAsDataURL(file);
        } else {
            setAuthorInfo((prevState) => {
                const updatedAuthorInfo = [...prevState];
                updatedAuthorInfo[index][name] = value;
                return updatedAuthorInfo;
            });
        }
    };

    const handleUpdate = async (author, index) => {
        try {
            if (author.profilePicFile) {
                const file = author.profilePicFile;
                const storageRef = firebase.storage().ref();
                const fileRef = storageRef.child(`authorInfo/${file.name}`);
                await fileRef.put(file);
                const downloadUrl = await fileRef.getDownloadURL();
                author.profilePic = downloadUrl;
                delete author.profilePicFile;
            }

            await mutation.mutateAsync(author);
            setShowSuccessModal(true);
            queryClient.invalidateQueries('authorInfo');

            setAuthorInfo((prevState) => {
                const updatedAuthorInfos = [...prevState];
                updatedAuthorInfos[index].editing = false;
                return updatedAuthorInfos;
            });
        } catch (error) {
            console.error('Error updating author information:', error);
        }
    };

    return (
        <div style={{ width: '100%', margin: '8rem auto', fontFamily: "'Montserrat', sans-serif", }}>
            <div
                style={{
                    display: "flex", flexDirection: "row", justifyContent: "space-between"
                }}>
                <h3>Author Infos</h3>
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
            <div className='shadow' style={{ margin: '2rem auto' }}>
                <Table bordered responsive size="sm">
                    <thead>
                        <tr
                            style={{
                                width: '100%',
                                alignItems: "center",
                                textAlign: "left",
                                fontSize: "14px",
                            }}>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Job title 1</th>
                            <th>Job title 2</th>
                            <th>Job Description</th>
                            <th>Profile Picture</th>
                            <th>About Paragraph 1</th>
                            <th>About Paragraph 2</th>
                            <th>About Paragraph 3</th>
                            <th>About Paragraph 4</th>
                            <th>About Paragraph 5</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authorInfoState.map((author, index) => (
                            <tr
                                style={{
                                    fontSize: "13px"
                                }}
                                key={author.id}>
                                <td>
                                    {author.editing ? (
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={author.firstName}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    ) : (
                                        <p>{author.firstName}</p>
                                    )}
                                </td>
                                <td>
                                    {author.editing ? (
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={author.lastName}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    ) : (
                                        <p>{author.lastName}</p>
                                    )}
                                </td>
                                <td>
                                    {author.editing ? (
                                        <input
                                            type="text"
                                            name="email"
                                            value={author.email}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    ) : (
                                        <p>{author.email}</p>
                                    )}
                                </td>

                                <td>
                                    {author.editing ? (
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={author.phoneNumber}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    ) : (
                                        <p>{author.phoneNumber}</p>
                                    )}
                                </td>

                                <td>
                                    {author.editing ? (
                                        <input
                                            type="text"
                                            name="jobTitle1"
                                            value={author.jobTitle1}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    ) : (
                                        <p>{author.jobTitle1}</p>
                                    )}
                                </td>

                                <td>
                                    {author.editing ? (
                                        <input
                                            type="text"
                                            name="jobTitle2"
                                            value={author.jobTitle2}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    ) : (
                                        <p>{author.jobTitle2}</p>
                                    )}
                                </td>

                                <td>
                                    {author.editing ? (
                                        <input
                                            type="text"
                                            name="jobDescription"
                                            value={author.jobDescription}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    ) : (
                                        <p>{author.jobDescription}</p>
                                    )}
                                </td>

                                <td>
                                    {author.editing ? (
                                        <>
                                            <input
                                                type="file"
                                                name="profilePicFile"
                                                onChange={(e) => handleInputChange(e, index)}
                                            />
                                            {author.profilePic && (
                                                <img
                                                    src={author.profilePic}
                                                    alt="Profile"
                                                    style={{ width: '150px', height: '150px' }}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <p>
                                            {author.profilePic && (
                                                <img
                                                    src={author.profilePic}
                                                    alt="Profile"
                                                    style={{ width: '150px', height: '150px' }}
                                                />
                                            )}
                                        </p>
                                    )}
                                </td>
                                <td>
                                    {author.editing ? (
                                        <input
                                            type="text"
                                            name="aboutPg1"
                                            value={author.aboutPg1}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    ) : (
                                        <p>{author.aboutPg1}</p>
                                    )}
                                </td>
                                <td>
                                    {author.editing ? (
                                        <input
                                            type="text"
                                            name="aboutPg2"
                                            value={author.aboutPg2}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    ) : (
                                        <p>{author.aboutPg2}</p>
                                    )}
                                </td>
                                <td>
                                    {author.editing ? (
                                        <input
                                            type="text"
                                            name="aboutPg3"
                                            value={author.aboutPg3}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    ) : (
                                        <p>{author.aboutPg3}</p>
                                    )}
                                </td>
                                <td>
                                    {author.editing ? (
                                        <input
                                            type="text"
                                            name="aboutPg4"
                                            value={author.aboutPg4}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    ) : (
                                        <p>{author.aboutPg4}</p>
                                    )}
                                </td>
                                <td>
                                    {author.editing ? (
                                        <input
                                            type="text"
                                            name="aboutPg5"
                                            value={author.aboutPg5}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    ) : (
                                        <p>{author.aboutPg5}</p>
                                    )}
                                </td>
                                <td>
                                    {author.editing ? (
                                        <>
                                            <Button
                                                className='shadow'
                                                style={{
                                                    borderRadius: "0", padding: "5px 15px", margin: "5px 0", fontSize: "14px"
                                                }}
                                                variant="success" onClick={() => handleUpdate(author, index)}>
                                                Update
                                            </Button>
                                            <Button
                                                className='shadow'
                                                style={{
                                                    borderRadius: "0", padding: "5px 17px", margin: "5px 0", fontSize: "14px"
                                                }}
                                                variant="primary" onClick={() => handleEdit(index)}>
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            className='shadow'
                                            style={{
                                                borderRadius: "0", padding: "5px 15px", margin: "5px 0", fontSize: "14px"
                                            }}
                                            variant="info" onClick={handleEdit.bind(null, index)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Modal style={{ color: '#0D1117' }} show={showSuccessModal} onHide={handleCloseSuccessModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Author information updated successfully.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuccessModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

};

export default AuthorsInfoForm;
