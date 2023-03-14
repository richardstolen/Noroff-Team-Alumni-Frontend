import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

function SidebarT() {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link href="#">Link 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">Link 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">Link 3</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={10} className="main-content">
          <h1>Main Content</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default SidebarT;
