import React from "react";
import { Container, Nav, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import KeyCloakService from "../../security/KeyCloakService.ts";
import { getUser } from "../../api/apiHandler";
import UserGroups from "../Group/UserGroups";
import UserTopics from "../Topic/UserTopics";
import NavDropdown from "react-bootstrap/NavDropdown";

const Sidebar = ({userId}) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(userId);
    async function fetchData() {
      const user = await getUser(KeyCloakService.GetId()); // call the getUser function with the userId prop
      setUser(user);
    }
    fetchData();
  }, [userId]);


    return (
    <Container>
      <Row>
        <Col md={3}>
          <div className="sidebar" style={{ backgroundColor: "#ADD8E6" }}>
            <Nav className="me-auto flex-column">
              <Nav.Link href="/Timeline">Timeline</Nav.Link>
              <Nav.Link href="/group-list">Public groups</Nav.Link>
              <NavDropdown title="My groups">
              {user === null ? <></> : <UserGroups groups={user.groups}/>} 
              </NavDropdown>
              <Nav.Link href="/topic-list">Public Topics</Nav.Link>
              <NavDropdown title="My topics">
              {user === null ? <></> : <UserTopics topics={user.topics}/>} 
              </NavDropdown>
              <Nav.Link href="/event-list">Events</Nav.Link>
            </Nav>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;


