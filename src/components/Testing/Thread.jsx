import React from "react";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";

const Thread = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={6} className="bg-light p-3">
          {/* Thread header */}
          <Row>
            <Col xs={2}>
              <Image
                src="https://picsum.photos/id/237/50/50"
                roundedCircle
              />
            </Col>
            <Col xs={10}>
              <h5 className="mb-0">John Doe</h5>
              <p className="text-muted">2 hrs ago</p>
            </Col>
          </Row>

          {/* Thread content */}
          <Row>
            <Col>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
                sapien quis nunc vestibulum euismod. Proin nec ipsum ac mi
                convallis commodo.
              </p>
            </Col>
          </Row>

          {/* Thread footer */}
          <Row className="mt-3">
            <Col>
              <Form>
                <Form.Group controlId="formBasicTextarea">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write a comment..."
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-end">
            <Col xs={2}>
              <Button variant="primary" type="submit">
                Comment
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Thread;
