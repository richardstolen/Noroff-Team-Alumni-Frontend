import React from 'react';
import { Container, Nav,Row, Col } from 'react-bootstrap';


const SidebarT = () => {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <div className="sidebar"  style={{backgroundColor: '#ADD8E6'}}>
            <Nav className="me-auto">
            <Nav.Link href="/Timeline">Timeline</Nav.Link> 
            <Nav.Link href="#Groups">Groups</Nav.Link>
            <Nav.Link href="#Topics">Topics</Nav.Link>
            <Nav.Link href="#Events">Events</Nav.Link>
          </Nav>
          </div>
        </Col>
        <Col md={9}>
          <div className="main-content">
             John doe.
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SidebarT;
