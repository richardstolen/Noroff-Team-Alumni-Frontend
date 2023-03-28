import { useState } from "react";
import { createTopic } from "../../api/topicApi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { validInput } from "../../utils/validateInput";
import Pointer from "../../utils/mousePointer";

function TopicButton() {
  const [showModal, setShowModal] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [topicDesc, setTopicDesc] = useState("");
  const [topic, setTopic] = useState(null);

  const handleClick = async () => {
    Pointer.setLoading();
    const isValid = validInput(topicName, topicDesc);
    if (isValid) {
      try {
        const newTopic = await createTopic(topicName, topicDesc);
        setTopic(newTopic);
        Pointer.setDefault();
        handleClose();
        window.location.reload();
      } catch (error) {
        console.error("Failed to create topic:", error);
        // Handle error
      }
    }
  };

  const handleClose = () => setShowModal(false);

  const handleNameInputChange = (event) => {
    setTopicName(event.target.value);
  };

  const handleDescInputChange = (event) => {
    setTopicDesc(event.target.value);
  };

  return (
    <div className="create-button">
      <Button className="mt-5" onClick={() => setShowModal(true)}>
        Create Topic
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Topic Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter topic name"
              value={topicName}
              onChange={handleNameInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Topic Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter topic description"
              value={topicDesc}
              onChange={handleDescInputChange}
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
      {topic && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Topic created</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Topic ID: {topic.topicId}</p>
            <p>Topic name: {topic.name}</p>
            <p>Topic description: {topic.description}</p>
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

export default TopicButton;
