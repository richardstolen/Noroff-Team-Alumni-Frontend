import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import KeyCloakService from "../../security/KeyCloakService.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByUsername } from "../../api/apiHandler";
import Storage from "../../storage/storage";

function Navbar1() {
  return (
    <Navbar bg="primary" variant="dark" className="sticky-nav">
      {/* {fixed="top"} */}
      <Container>
        <Navbar.Brand href="/timeline">Alumni</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/timeline">Timeline</Nav.Link>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item>Log out</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Form>
          <Form.Group role="form" className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search on Alumni"
              className="me-2 form-control"
              aria-label="Search"
            ></Form.Control>
            <Button type="subtmi" variant="dark">
              Search
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Navbar>
  );
}

export default Navbar1;

//test
