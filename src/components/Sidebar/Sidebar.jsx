import React from 'react';
import { Container, Nav,Row, Col } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Sidebar = () => {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <div className="sidebar"  style={{backgroundColor: '#ADD8E6'}}>
            <Nav className="me-auto flex-column">
            <Nav.Link href="/Timeline">Timeline</Nav.Link>
            <Nav.Link href="/group-list">Groups</Nav.Link> 
            <Nav.Link href="/topic-list">Topics</Nav.Link>
            <Nav.Link href="#Events">Events</Nav.Link>
          </Nav>
          </div>
        </Col>
        {/* <Col md={9}>
          <div className="main-content">
             John doe.
          </div>
        </Col> */}
      </Row>
    </Container>
  );
};

export default Sidebar;
