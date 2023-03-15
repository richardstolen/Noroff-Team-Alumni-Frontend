import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';


const LeftSidebar = () => {
  return (
    <Col  md={2} className="bg-light sidebar mt-5">
      <Nav className="flex-column">
            <Nav.Link href="/timeline">Timeline</Nav.Link>
            <Nav.Link href="/placeholder">Groups</Nav.Link>
            <Nav.Link href="/placeholder">Topics</Nav.Link>
            <Nav.Link href="/placeholder">Events</Nav.Link>
          </Nav>
      
    </Col>
  );
};

const RightSidebar = () => {
  return (
    <Col md={2} className="ml-auto bg-light sidebar">
      {/* Your right sidebar content here */}
    </Col>
  );
};

const TwoSidebarsT = () => {
  return (
    <Container>
      <Row>
        <LeftSidebar />
        <Col md={8} >
            
        </Col>
        <RightSidebar />
      </Row>
    </Container>
  );
};

export default TwoSidebarsT;
