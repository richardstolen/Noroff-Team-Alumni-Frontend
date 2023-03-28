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
import PropTypes from "prop-types";
import { TbSchool } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { FaUserGraduate } from "react-icons/fa";
import { BiChat } from "react-icons/bi"; 
import { RiPagesLine } from "react-icons/ri";


function Navbar1({ onToggleClick }) {
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

  function handleToggle() {
    console.log("handleToggle");
    onToggleClick();
  }

  function clearProfileStorage() {
    Storage.clearSearchedUser();
  }
  return (
    <Navbar expand="md" bg="primary" variant="dark" sticky="top">
      <Navbar.Brand className="nb-title" href="/timeline" style={{ display: 'flex', alignItems: 'center', marginRight: "1.2rem" }}>
        <TbSchool style={{ marginRight: '1rem', marginLeft: "5px" }} size={37} />
        <span style={{ fontSize: '1.5rem' }}>Alumni</span>
      </Navbar.Brand>
      <Container className="navbar-content">
        <Nav className="me-auto">
          <Nav.Link href="/timeline" style={{ marginRight: "15px" }}>
            <RiPagesLine size={20} style={{ marginRight: "5px" }} />
            Timeline
          </Nav.Link>
          <Nav.Link href="/chat" style={{ marginRight: "18px" }}>
            <BiChat size={20} style={{ marginRight: "5px" }} />
            Chat
          </Nav.Link>
          <NavDropdown title={<><FaUserGraduate size={20} style={{ marginRight: "5px" }} /> Profile</>} id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile" onClick={clearProfileStorage}>
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item onClick={KeyCloakService.CallLogout}>
              Log out
              <FiLogOut style={{ marginLeft: '5px' }} />
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
            <Button type="submit" variant="dark">
              Search
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <Navbar.Toggle onClick={handleToggle} />
    </Navbar>
  );
}
Navbar1.propTypes = {
  onToggleClick: PropTypes.func,
}
export default Navbar1;


