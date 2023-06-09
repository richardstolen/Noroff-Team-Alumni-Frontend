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
import { BiGroup, BiChat } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { FaUserGraduate } from "react-icons/fa";
import Storage from "../../storage/storage";
import { useContext } from "react";
import { TriggerContext } from "../../contexts/triggerContext";

const Sidebar = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [trigger, setTrigger, triggerRender] = useContext(TriggerContext);

  useEffect(() => {
    async function fetchData() {
      // const user = await getUser(KeyCloakService.GetId()); // call the getUser function with the userId prop

      setUser(Storage.getUser());
    }
    fetchData();
  }, [userId, trigger]);

  function clearProfileStorage() {
    Storage.clearSearchedUser();
  }

  return (
    <div className="sidebar">
      <Nav className="me-auto flex-column">
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
          {user === null ? (
            <></>
          ) : user.groups === null ? (
            <></>
          ) : (
            <UserGroups groups={user.groups} />
          )}
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
          {user === null ? (
            <></>
          ) : user.topics === null ? (
            <></>
          ) : (
            <UserTopics topics={user.topics} />
          )}
        </NavDropdown>
        <Nav.Link href="/event-list">
          <TbCalendarEvent size={20} style={{ marginRight: "5px" }} />
          Events
        </Nav.Link>
        <Nav.Link href="/calendar-view">
          <GoCalendar size={20} style={{ marginRight: "5px" }} />
          Calendar
        </Nav.Link>
        <Nav.Link
          href="/chat"
          style={{ marginRight: "18px" }}
          className="hide-sidebar-content"
        >
          <BiChat size={20} style={{ marginRight: "5px" }} />
          Chat
        </Nav.Link>
        <Nav.Link href="/Timeline" className="hide-sidebar-content">
          <RiPagesLine size={20} style={{ marginRight: "5px" }} />
          Timeline
        </Nav.Link>
        <NavDropdown
          title={
            <>
              <FaUserGraduate size={20} style={{ marginRight: "5px" }} />{" "}
              Profile
            </>
          }
          id="basic-nav-dropdown"
          className="hide-sidebar-content"
        >
          <NavDropdown.Item href="/profile" onClick={clearProfileStorage}>
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item onClick={KeyCloakService.CallLogout}>
            Log out
            <FiLogOut style={{ marginLeft: "5px" }} />
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default Sidebar;
