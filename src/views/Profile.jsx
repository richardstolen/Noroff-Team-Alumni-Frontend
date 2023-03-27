import NavBar1 from "../components/Navbar/Navbar1";
import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import CalendarSidebar from "../components/Sidebar/CalendarSidebar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "@react-hook/media-query";

import {
  getUsers,
  getUser,
  getUserByUsername,
  createUser,
  editUserProfilePicture,
  editUsername,
  editUserBio,
  editUserStatus,
  editUserFunFact,
} from "../api/apiHandler";
import KeyCloakService from "../security/KeyCloakService.ts";
import Storage from "../storage/storage";
import { PulseLoader } from "react-spinners";

function Profile({ user_id }) {
  const searchedUser = Storage.getSearchedUser();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newFunFact, setNewFunFact] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Sidebar state
  const [showSidebar, setShowSidebar] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setShowSidebar(!isSmallScreen);
  }, [isSmallScreen]);

  function handleToggleClick() {
    console.log("handleToggleClick", showSidebar);
    setShowSidebar(!showSidebar);
  }

  const handleStatusEdit = async () => {
    const newStatus = prompt("Enter new status:");
    if (newStatus !== null) {
      document.body.style.cursor = "wait";
      await editUserStatus(newStatus);
      setEditMode(true);
    }
  };

  const handleProfilePictureEdit = async () => {
    const newProfilePicture = prompt("Enter new profile picture URL:");
    if (newProfilePicture !== null) {
      document.body.style.cursor = "wait";
      await editUserProfilePicture(newProfilePicture);
      setEditMode(true);
    }
  };

  const handleBioEdit = async () => {
    const newBio = prompt("Enter new bio:");
    if (newBio !== null) {
      document.body.style.cursor = "wait";
      await editUserBio(newBio);
      setEditMode(true);
    }
  };

  const handleFunFactEdit = async () => {
    const newFunFact = prompt("Enter new fun fact:");
    if (newFunFact !== null) {
      document.body.style.cursor = "wait";
      await editUserFunFact(newFunFact);
      setEditMode(true);
    }
  };

  useEffect(() => {
    async function fetchUser() {
      // If user has searched for user
      let searchedUser = Storage.getSearchedUser();

      if (searchedUser) {
        setUser(searchedUser);
        return;
      }
      // Get user from storage
      let user = Storage.getUser();
      if (!user) {
        // IF no user in storage
        // fetch user data by user_id from the API
        user = await getUser(KeyCloakService.GetId());
        console.log(user);
        Storage.setUser(user);
      }

      if (editMode) {
        console.log("edit mode", editMode);
        await getUser(KeyCloakService.GetId()).then((user) => {
          setUser(user);
          Storage.setUser(user);
          setEditMode(false);
          document.body.style.cursor = "default";
        });
      } else {
        setUser(user);
      }

      console.log(user.groups);
    }
    fetchUser();
  }, [setUser, user_id, editMode, setEditMode]);

  if (!user) {
    return (
      <div className="text-center">
        <NavBar1 />
        <PulseLoader className="spinning-wheel" color="#0d6efd" />
      </div>
    );
  } else {
    if (searchedUser != null) {
      return (
        <div className="text-center text-muted mb-4">
          <>
            <NavBar1 onToggleClick={handleToggleClick} />
            <Container style={{ paddingLeft: 0 }} fluid>
              <Row>
                <Col xl={2} md={3} className="d-block d-md-none sidebar">
                  <Collapse in={showSidebar}>
                    <div>
                      <Sidebar />
                    </div>
                  </Collapse>
                </Col>
                <Col
                  xl={2}
                  md={3}
                  className="d-none d-md-block sidebar-wrapper"
                >
                  <Sidebar />
                </Col>
                <Col xl={10} md={9}>
                  <CalendarSidebar />
                  <img
                    src={user.image}
                    alt="Profile"
                    className="rounded-circle mb-4 mt-5"
                    style={{ width: "200px", height: "200px", border: "1px solid #ccc" }}
                  />
                  <h2
                    className="text-dark mb-4"
                    style={{ fontSize: "2rem", fontWeight: "bold" }}
                  >
                    {user.userName}
                  </h2>
                  <h3
                    className="mb-4"
                    style={{ color: "#666", fontStyle: "italic" }}
                  >
                    {user.status}
                  </h3>
                  <h4 className="mb-4" style={{ lineHeight: "1.5" }}>
                    {user.bio}
                  </h4>
                  <h4 className="mb-4" style={{ color: "#666" }}>
                    {user.funFact}
                  </h4>
                </Col>
              </Row>
            </Container>
          </>
        </div>
      );
    } else {
      return (
        <div className="text-center text-muted mb-4">
          <>
            <NavBar1 onToggleClick={handleToggleClick} />

            <Container style={{ paddingLeft: 0 }} fluid>
              <Row>
                <Col xl={2} md={3} className="d-block d-md-none sidebar">
                  <Collapse in={showSidebar}>
                    <div>
                      <Sidebar />
                    </div>
                  </Collapse>
                </Col>
                <Col
                  xl={2}
                  md={3}
                  className="d-none d-md-block sidebar-wrapper"
                >
                  <Sidebar />
                </Col>
                <Col xl={10} md={9}>
                  <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                  ></link>

                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <div className="d-flex flex-column align-items-center">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt="Profile"
                          className="rounded-circle mb-4 mt-5"
                          style={{ width: "200px", height: "200px", border: "1px solid #ccc" }}
                        />
                      ) : (
                        <Avatar
                          name={user.userName} //Er ikke ferdig her!
                          src="https://img.freepik.com/free-icon/user_318-160091.jpg?t=st=1679903580~exp=1679904180~hmac=e5329a9a93e35f27a6fa00953d1f4826f70caf0691f626b1f67f9ed3469de945"
                          className="rounded-circle mb-4 mt-5"
                          style={{ width: "200px", height: "200px" }}
                        />
                      )}
                      <div className="d-flex align-items-center">
                        <button
                          onClick={handleProfilePictureEdit}
                          className="material-icons text-5xl"
                          style={{
                            border: "none",
                            background: "none",
                            marginTop: "-10px",
                          }}
                        >
                          edit
                        </button>
                        &nbsp;
                        <div>Edit profile picture</div>
                      </div>
                    </div>
                  </div>

                  <h2
                    className="text-dark mb-4"
                    style={{ fontSize: "2rem", fontWeight: "bold" }}
                  >
                    {user.userName}
                  </h2>

                  <div
                    className="d-flex justify-content-center align-items-center mb-4"
                    style={{ color: "#666" }}
                  >
                    <h4
                      className="mb-0 mr-2"
                      style={{ lineHeight: "1.5", fontStyle: "italic" }}
                    >
                      {user.status}&nbsp;&nbsp;&nbsp;
                    </h4>
                    <div className="d-flex align-items-center">
                      <button
                        onClick={handleStatusEdit}
                        className="material-icons text-5xl"
                        style={{ border: "none", background: "none" }}
                      >
                        edit
                      </button>
                      &nbsp;
                      <div className="ml-2">Edit status</div>
                    </div>
                  </div>

                  <div
                    className="d-flex justify-content-center align-items-center mb-4"
                    style={{ color: "#666" }}
                  >
                    <h4 className="mb-0 mr-2" style={{ lineHeight: "1.5" }}>
                      {user.bio}&nbsp;&nbsp;&nbsp;
                    </h4>
                    <div className="d-flex align-items-center">
                      <button
                        onClick={handleBioEdit}
                        className="material-icons text-5xl"
                        style={{ border: "none", background: "none" }}
                      >
                        edit
                      </button>
                      &nbsp;
                      <div className="ml-2">Edit bio</div>
                    </div>
                  </div>

                  <div
                    className="d-flex justify-content-center align-items-center mb-4"
                    style={{ color: "#666" }}
                  >
                    <h4 className="mb-0 mr-2" style={{ lineHeight: "1.5" }}>
                      {user.funFact}&nbsp;&nbsp;&nbsp;
                    </h4>
                    <div className="d-flex align-items-center">
                      <button
                        onClick={handleFunFactEdit}
                        className="material-icons text-5xl"
                        style={{ border: "none", background: "none" }}
                      >
                        edit
                      </button>
                      &nbsp;
                      <div className="ml-2">Edit funfact</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </>
        </div>
      );
    }
  }
}

export default Profile;
