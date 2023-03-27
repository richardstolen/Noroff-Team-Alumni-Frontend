import React from "react";
import { Container, Nav, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import KeyCloakService from "../../security/KeyCloakService.ts";
import { getUser } from "../../api/apiHandler";
import UserGroups from "../Group/UserGroups";
import UserTopics from "../Topic/UserTopics";
import NavDropdown from "react-bootstrap/NavDropdown";
import Storage from "../../storage/storage";

function Sidebar(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  function clearProfileStorage() {
    Storage.clearSearchedUser();
  }

  return (
    <div className="sidebar">
      <Nav className="me-auto flex-column">
        <Nav.Link href="/Timeline">Timeline</Nav.Link>
        <Nav.Link href="/group-list">Public groups</Nav.Link>
        <NavDropdown title="My groups">
          <UserGroups groups={Storage.getUser().groups} />
        </NavDropdown>
        <Nav.Link href="/topic-list">Public Topics</Nav.Link>
        <NavDropdown title="My topics">
          <UserTopics topics={Storage.getUser().topics} />
        </NavDropdown>
        <Nav.Link href="/event-list">Events</Nav.Link>
        <Nav.Link href="/calendar-view">Calendar</Nav.Link>
        <Nav.Link href="/dashboard" className="hide-sidebar-content">
          Dashboard
        </Nav.Link>
        <NavDropdown
          title="Profile"
          id="basic-nav-dropdown"
          className="hide-sidebar-content"
        >
          <NavDropdown.Item href="/profile" onClick={clearProfileStorage}>
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item onClick={KeyCloakService.CallLogout}>
            Log out
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
}

export default Sidebar;
