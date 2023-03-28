import React from "react";
import { Container, Nav, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import KeyCloakService from "../../security/KeyCloakService.ts";
import { getUser } from "../../api/apiHandler";
import UserGroups from "../Group/UserGroups";
import UserTopics from "../Topic/UserTopics";
import NavDropdown from "react-bootstrap/NavDropdown";
import { RiPagesLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineTopic, MdTopic } from "react-icons/md";
import { TbCalendarEvent } from "react-icons/tb";
import { GoCalendar } from "react-icons/go";
import { BiGroup } from "react-icons/bi";
import Storage from "../../storage/storage";

const Sidebar = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // const user = await getUser(KeyCloakService.GetId()); // call the getUser function with the userId prop

      setUser(Storage.getUser());
    }
    fetchData();
  }, [userId]);

  function clearProfileStorage() {
    Storage.clearSearchedUser();
  }

  return (
    <div className="sidebar">
      <Nav className="me-auto flex-column">
        <Nav.Link href="/Timeline">
          <RiPagesLine size={20} style={{ marginRight: "5px" }} />
          Timeline
        </Nav.Link>
        <Nav.Link href="/group-list">
          <HiOutlineUserGroup size={20} style={{ marginRight: "5px" }} />
          Public groups
        </Nav.Link>
        <NavDropdown
          title={
            <>
              <BiGroup size={20} style={{ marginRight: "5px" }} /> My groups
            </>
          }
        >
          {user === null ? <></> : <UserGroups groups={user.groups} />}
        </NavDropdown>
        <Nav.Link href="/topic-list">
          <MdOutlineTopic size={20} style={{ marginRight: "5px" }} />
          Public Topics
        </Nav.Link>
        <NavDropdown
          title={
            <>
              <MdTopic size={20} style={{ marginRight: "5px" }} /> My topics
            </>
          }
        >
          {user === null ? <></> : <UserTopics topics={user.topics} />}
        </NavDropdown>
        <Nav.Link href="/event-list">
          <TbCalendarEvent size={20} style={{ marginRight: "5px" }} />
          Events
        </Nav.Link>
        <Nav.Link href="/calendar-view">
          <GoCalendar size={20} style={{ marginRight: "5px" }} />
          Calendar
        </Nav.Link>
        <Nav.Link href="/chat" className="hide-sidebar-content">
          Chat
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
};

export default Sidebar;
