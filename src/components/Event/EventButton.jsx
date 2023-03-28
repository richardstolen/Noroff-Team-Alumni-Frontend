import { useState } from "react";
import { createEvent } from "../../api/eventApi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DateObject from "react-date-object";
import Pointer from "../../utils/mousePointer";
import { getGroup } from "../../api/apiHandler";

function CreateEventButton(prop) {
  const [showModal, setShowModal] = useState(false);
  const [eventDescription, setEventDescription] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [event, setEvent] = useState(null);

  const handleClick = async () => {
    Pointer.setLoading();
    try {
      const formattedDate = new Date(eventDate).toLocaleDateString();

      let type = "";
      let name = "";

      if (prop.url === "/group-detail") {
        type = "group";
        let group = await getGroup(prop.id);
        console.log(group);
      } else if (prop.url === "/topic-detail") {
        type = "topic";
      }

      const newEvent = await createEvent(
        eventTitle + " - " + name,
        eventDescription,
        formattedDate,
        type,
        prop.id
      );
      setEvent(newEvent);
      Pointer.setDefault();
      setShowModal(false);
    } catch (error) {
      console.error("Failed to create event", error);
    }
  };

  const handleClose = () => setShowModal(false);

  const handleDescriptionInputChange = (event) => {
    setEventDescription(event.target.value);
  };
  const handleTitleInputChange = (event) => {
    setEventTitle(event.target.value);
  };
  const handleDateInputChange = (event) => {
    setEventDate(event.target.value);
  };

  return (
    <div className="create-button">
      <Button className="mt-5" onClick={() => setShowModal(true)}>
        Create Event
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event title"
              value={eventTitle}
              onChange={handleTitleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event description"
              value={eventDescription}
              onChange={handleDescriptionInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Event Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter event date"
              value={eventDate}
              onChange={handleDateInputChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClick}>
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default CreateEventButton;
