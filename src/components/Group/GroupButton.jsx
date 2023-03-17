import { useState } from 'react';
import { createGroup } from '../../api/apiHandler';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function GroupButton() {
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [group, setGroup] = useState(null);

  const handleClick = async () => {
    try {
      const newGroup = await createGroup(groupName, groupDesc);
      setGroup(newGroup);
      setShowModal(true);
    } catch (error) {
      console.error('Failed to create group:', error);
      // Handle error
    }
  };

  const handleClose = () => setShowModal(false);

  const handleNameInputChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleDescInputChange = (event) => {
    setGroupDesc(event.target.value);
  };

  return (
    <div className='create-group-button'>
      <Button className='mt-5' onClick={() => setShowModal(true)}>
        Create Group
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter group name'
              value={groupName}
              onChange={handleNameInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Group Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter group description'
              value={groupDesc}
              onChange={handleDescInputChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleClick}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      {group && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Group created</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Group ID: {group.groupId}</p>
            <p>Group name: {group.name}</p>
            <p>Group description: {group.description}</p>
            {/* Add more information about the group as needed */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default GroupButton;
