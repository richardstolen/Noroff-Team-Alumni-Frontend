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
            <NavDropdown title="Groups" id="basic-nav-dropdown">
              <NavDropdown.Item href="#gruppe1">Gruppe 1</NavDropdown.Item>
              <NavDropdown.Item href="#gruppe2">
                Gruppe 2
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Topics" id="basic-nav-dropdown">
              <NavDropdown.Item href="#topic1">Topic 1</NavDropdown.Item>
              <NavDropdown.Item href="#topic2">
                Topic 2
              </NavDropdown.Item>
            </NavDropdown>
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

export default Sidebar;
