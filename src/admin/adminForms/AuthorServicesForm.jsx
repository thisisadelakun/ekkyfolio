import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';

import { firestore, storage } from '../../hooks/Firebase/firebase';
import { Table, Button, Modal } from 'react-bootstrap';


const fetchAuthorServices = async () => {
  const snapshot = await firestore.collection('authorServices').get();
  const data = snapshot.docs.map((doc) => {
    const service = doc.data();
    service.id = doc.id;
    return service;
  });
  return data;
};

const AuthorServicesForm = () => {
  const updateMutation = useMutation((params) => updateAuthorService(...params));
  const deleteMutation = useMutation((serviceId) => deleteAuthorService(serviceId));
  const addMutation = useMutation((newServiceData) => addAuthorService(newServiceData));

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const [newService, setNewService] = useState({
    id: '',
    icon: '',
    jobDescription: '',
    title: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [authorServices, setAuthorServices] = useState([]); // Added authorServices state

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const { isLoading, isError, refetch } = useQuery('authorServices', fetchAuthorServices, {
    onSuccess: (data) => {
      setAuthorServices(data); // Update authorServices state on successful query
    },
    enabled: false, // Prevents auto-fetching
    staleTime: Infinity, // Disable auto-fetching
    refetchOnWindowFocus: false, // Disable refetch on window focus
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

  const updateAuthorService = async (serviceId, updatedService) => {
    try {
      await firestore
        .collection('authorServices')
        .doc(serviceId)
        .update(updatedService);
    } catch (error) {
      throw new Error('Error updating author service');
    }
  };

  const deleteAuthorService = async (serviceId) => {
    try {
      await firestore.collection('authorServices').doc(serviceId).delete();
    } catch (error) {
      throw new Error('Error deleting author service');
    }
  };

  const addAuthorService = async (newServiceData) => {
    try {
      const docRef = await firestore.collection('authorServices').add(newServiceData);
      const serviceId = docRef.id;
      return { serviceId, newServiceData };
    } catch (error) {
      throw new Error('Error adding author service');
    }
  };

  const handleUpdate = async (serviceId, updatedService) => {
    try {
      await updateMutation.mutateAsync([serviceId, updatedService]);
      setAuthorServices((prevState) => {
        const updatedServices = [...prevState];
        updatedServices[editingIndex] = { ...updatedService, id: serviceId };
        return updatedServices;
      });
      setEditingIndex(null);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error updating author service:', error);
    }
  };

  const handleDelete = (serviceId) => {
    setDeleteServiceId(serviceId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMutation.mutateAsync(deleteServiceId);
      setAuthorServices((prevState) =>
        prevState.filter((service) => service.id !== deleteServiceId)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting author service:', error);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setAuthorServices((prevState) => {
      const updatedServices = [...prevState];
      updatedServices[index][name] = value;
      return updatedServices;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const uploadImage = async (imageFile) => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`authorSkills/${imageFile.name}`);
      await fileRef.put(imageFile);
      const imageUrl = await fileRef.getDownloadURL();
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };



  const handleAddService = async () => {
    try {
      if (!selectedImage) {
        console.error('No image selected.');
        return;
      }

      const imageUrl = await uploadImage(selectedImage);

      if (!imageUrl) {
        console.error('Image upload failed.');
        return;
      }

      const newServiceData = {
        ...newService,
        icon: imageUrl,
      };

      const { serviceId, newServiceData: addedService } = await addMutation.mutateAsync(newServiceData);
      setAuthorServices((prevState) => [
        {
          ...addedService,
          id: serviceId,
        },
        ...prevState,
      ]);
      setSelectedImage(null);
      setNewService({
        id: '',
        icon: '',
        jobDescription: '',
        title: '',
      });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error adding author service:', error);
    }
  };

  return (
    <div style={{ width: '100%', margin: '8rem auto', fontFamily: "'Montserrat', sans-serif", }}>
      <div
        style={{
          display: "flex", flexDirection: "row", justifyContent: "space-between"
        }}>
        <h3>Author Services</h3>
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
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error fetching author services</div>
      ) : (
        <React.Fragment>
          <div className='shadow' style={{ margin: '1rem auto' }}>
            <Table bordered responsive size="lg">
              <thead>
                <tr style={{ fontSize: "15px" }}>
                  <th>ID</th>
                  <th>Icon</th>
                  <th>Title</th>
                  <th>Job Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {authorServices.map((service, index) =>
                  editingIndex === index ? (
                    <tr
                      style={{
                        fontSize: "13px"
                      }}
                      key={service.id} >
                      <td >
                        <input
                          type="text"
                          name="id"
                          value={service.id}
                          onChange={(e) => handleInputChange(e, index)}

                        />
                      </td>
                      <td >
                        <input
                          type="text"
                          name="icon"
                          value={service.icon}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </td>
                      <td style={{ fontSize: "13px" }}>
                        <input
                          type="text"
                          name="title"
                          value={service.title}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </td>
                      <td>
                        <textarea
                          name="jobDescription"
                          value={service.jobDescription}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </td>
                      <td>
                        <Button
                          className='shadow'
                          style={{
                            fontSize: "14px", borderRadius: "0", padding: "5px 18px", margin: "5px 0",
                          }} variant="success" onClick={() => handleUpdate(service.id, service)}>
                          Save
                        </Button>
                        <Button
                          className='shadow'
                          style={{
                            fontSize: "14px", borderRadius: "0", padding: "5px 10px", margin: "5px 0",
                          }} variant="secondary" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    <tr
                      style={{
                        fontSize: "13px"
                      }}
                      key={service.id}>
                      <td>
                        {service.Id}
                      </td>
                      <td>
                        <img src={service.icon} alt="Icon" style={{ width: '50px', height: '50px' }} />
                      </td>
                      <td>{service.title}</td>
                      <td>{service.jobDescription}</td>
                      <td>
                        <Button
                          className='shadow'
                          style={{
                            borderRadius: "0", padding: "5px 20px", margin: "5px 0", fontSize: "14px"
                          }} variant="info" onClick={() => handleEdit(index)}>
                          Edit
                        </Button>
                        <Button
                          className='shadow'
                          style={{
                            borderRadius: "0", padding: "5px 10px", margin: "5px 0", fontSize: "14px"
                          }} variant="danger" onClick={() => handleDelete(service.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>

            {/* Add Service Form */}
            <div
              style={{
                background: "inherit", margin: "2rem auto", width: "95%",
                alignItems: "left"
              }}>
              <h5>Add Service</h5>
              <div
                style={{
                  margin: "1rem 0", alignItems: "center", display: "flex", gap: "0.5rem"
                }}>
                <label htmlFor="iconInput">Id:</label>
                <input
                  type="text"
                  id="IdInput"
                  value={newService.Id}
                  onChange={(e) => setNewService({ ...newService, Id: e.target.value })}
                />
              </div>

              <div
                style={{
                  margin: "1rem 0", alignItems: "center", display: "flex", gap: "0.5rem"
                }}>
                <label htmlFor="iconInput">Icon:</label>
                <input type="file" id="iconInput" onChange={handleImageChange} accept="image/*" />
              </div>

              <div
                style={{
                  margin: "1rem 0", alignItems: "center", display: "flex", gap: "0.5rem"
                }}>
                <label htmlFor="titleInput">Title:</label>
                <input
                  type="text"
                  id="titleInput"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                />
              </div>

              <div
                style={{
                  margin: "1rem 0", alignItems: "center", display: "flex", gap: "0.5rem"
                }}>
                <label htmlFor="jobDescriptionInput">Job Description:</label>
                <textarea
                  id="jobDescriptionInput"
                  value={newService.jobDescription}
                  onChange={(e) => setNewService({ ...newService, jobDescription: e.target.value })}
                />
              </div>

              <Button
                className='shadow'
                style={{
                  margin: "1.5rem 0"
                }}
                variant="success" onClick={handleAddService}>
                Add Service
              </Button>
            </div>

            {/* Success Modal */}
            <Modal style={{ color: '#0D1117' }} show={showSuccessModal} onHide={handleCloseSuccessModal}>
              <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Service successfully updated.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSuccessModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal style={{ color: '#0D1117' }} show={showDeleteModal} onHide={handleCloseDeleteModal}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this service?</p>
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

export default AuthorServicesForm;
