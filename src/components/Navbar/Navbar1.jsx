import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar1() {
  return (
    <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/timeline">Alumni</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/timeline">Timeline</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default NavBar1;