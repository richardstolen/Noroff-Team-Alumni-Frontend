import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";



function Navbar1() {
  return (
    <Navbar bg="primary" variant="dark" >  
    {/* {fixed="top"} */}
      <Container>
        <Navbar.Brand href="/timeline">Alumni</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/timeline">Timeline</Nav.Link>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item >
                Log out

                
              </NavDropdown.Item>
            </NavDropdown>
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search on Alumni"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="dark">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default Navbar1;

//test
