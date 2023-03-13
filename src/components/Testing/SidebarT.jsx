import React from "react";
import { Container,Col, Nav } from "react-bootstrap";

const SidebarT = () => {
  return (
    <Container fluid className="mt-5">
        <Col xs={2} className="bg-light sidebar">
          <Nav className="flex-column">
            <Nav.Link href="/timeline">Timeline</Nav.Link>
            <Nav.Link href="/placeholder">Groups</Nav.Link>
            <Nav.Link href="/placeholder">Topics</Nav.Link>
            <Nav.Link href="/placeholder">Events</Nav.Link>
          </Nav>
        </Col>
    </Container>
  );
};

export default SidebarT;
