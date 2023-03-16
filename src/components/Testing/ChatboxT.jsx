import { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

function ChatboxT() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== '') {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <Container className='container-test'>
      <Row className="justify-content-center">
        <Col md={6}>
          <h3>Chat Box</h3>
          <ListGroup className="my-3">
            {messages.map((message, index) => (
              <ListGroup.Item key={index}>{message}</ListGroup.Item>
            ))}
          </ListGroup>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMessage">
              <Form.Control
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatboxT;
