import React, { useState } from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';

const TwitterThread = () => {
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const replies = (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header>Jane Smith (@janesmith)</Card.Header>
            <Card.Body>
              <Card.Text>
                I agree, John! Where did you get that coffee? 🔍
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>John Doe (@johndoe)</Card.Header>
            <Card.Body>
              <Card.Text>
                @janesmith I got it at the new coffee shop on Main St. 😊
              </Card.Text>
              <Image src="coffeeshop.jpg" fluid />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
            <h4>This Capuccino, holy moly...</h4>
            <br />
            <small>Intended audience: coffee lovers</small>
            <br />
            <small>Created by: John Doe</small>
            </Card.Header>
            <Card.Body>
              <Card.Text>
              In mattis, sem et ullamcorper posuere, justo tellus ullamcorper tellus, 
              eget aliquet magna velit non elit. Donec mi felis, pretium eget 
              sagittis molestie, vestibulum ut urna. Aenean congue justo at nulla 
              convallis ultrices. Praesent cursus justo non tortor congue pellentesque. 
              Donec pulvinar ipsum risus, sit amet commodo velit posuere quis. 
              Tor sapien. Integer volutpat velit lacus, id auctor eros euismod in.
              </Card.Text>
              <Image src="coffee.jpg" fluid />
              <Button
                variant="link"
                className="mt-2"
                onClick={toggleReplies}
              >
                {showReplies ? 'Hide replies' : 'Show replies'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {showReplies && replies}
    </Container>
  );
};

export default TwitterThread;
