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
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  async function handleSearch(e) {
    e.preventDefault();
    const user = await getUserByUsername(value);
    if (user) {
      Storage.setSearchedUser(user);
      if (window.location.pathname === "/profile") {
        window.location.reload();
      } else {
        navigate("/profile");
      }
    } else {
      alert("No user found");
    }
  }

  function clearProfileStorage() {
    Storage.clearSearchedUser();
  }
  return (
    <Navbar bg="primary" variant="dark" sticky="top">
      {/* {fixed="top"} */}
      <Container>
        <Navbar.Brand href="/timeline">Alumni</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/timeline">Timeline</Nav.Link>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile" onClick={clearProfileStorage}>
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item onClick={KeyCloakService.CallLogout}>
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Form onSubmit={(e) => handleSearch(e)}>
          <Form.Group role="form" className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search on Alumni"
              className="me-2 form-control"
              aria-label="Search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
