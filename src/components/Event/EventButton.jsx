import { useState } from 'react';
import { createEvent } from '../../api/eventApi';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DateObject from "react-date-object";

function CreateEventButton() {
    const [showModal, setShowModal] = useState(false);
    const [eventDescription, setEventDescription] = useState('');
    const [eventDate, setEventDate]= useState('')
    const [event, setEvent] = useState(null);


    const handleClick = async () => {
        try {
            const formattedDate = new Date(eventDate).toLocaleDateString()
            const newEvent = await createEvent(eventDescription, formattedDate); 
            setEvent(newEvent);
            setShowModal(false);

        } catch (error) {
            console.error('Failed to create event', error)
        }
    };

    const handleClose = () => setShowModal(false)

    const handleDescriptionInputChange = (event) => {
        setEventDescription(event.target.value);
    }
    const handleDateInputChange = (event) => {
        setEventDate(event.target.value);
      };

    return (
        <div className='create-button'>
            <Button className='mt-5' onClick={() => setShowModal(true)}>
                Create Event
            </Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Event Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter event description'
                            value={eventDescription}
                            onChange={handleDescriptionInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Event Date</Form.Label>
                        <Form.Control
                            type='date' 
                            placeholder='Enter event date'
                            value={eventDate}
                            onChange={handleDateInputChange}
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
            {event && (
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Event created</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Event description: {event.description}</p>
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



export default CreateEventButton;