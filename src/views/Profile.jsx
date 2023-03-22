import NavBar1 from "../components/Navbar/Navbar1";
import React, { useState, useEffect } from "react";
import Avatar from 'react-avatar';
import CalendarSidebar from "../components/Sidebar/CalendarSidebar";
import Sidebar from "../components/Sidebar/Sidebar";

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
        await getUser(KeyCloakService.GetId()).then(user => {
          setUser(user);
          Storage.setUser(user);
          setEditMode(false);
          document.body.style.cursor = "default";
        })
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
            <NavBar1 />
            <Sidebar/>
            <CalendarSidebar/>
            <img
              src={user.image}
              alt="Profile"
              className="rounded-circle mb-4 mt-5"
              style={{ width: "200px", height: "200px" }}
            />
            <h2
              className="text-dark mb-4"
              style={{ fontSize: "2rem", fontWeight: "bold" }}
            >
              {user.userName}
            </h2>
            <h3 className="mb-4" style={{ color: "#666", fontStyle: "italic" }}>
              {user.status}
            </h3>
            <h4 className="mb-4" style={{ lineHeight: "1.5" }}>
              {user.bio}
            </h4>
            <h4 className="mb-4" style={{ color: "#666" }}>
              {user.funFact}
            </h4>
          </>
        </div>
      );
    } else {
      return (
        <div className="text-center text-muted mb-4">
          <>
            <NavBar1 />
            <Sidebar/>
            <CalendarSidebar/>
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
                    style={{ width: "200px", height: "200px" }}
                  />
                ) : (
                  <Avatar
                    name={user.userName} //Er ikke ferdig her! 
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1679478862~exp=1679479462~hmac=d521cabb939009438282af6efab35797ed4dbc2b1dec8abd9a96e47416df520c"
                    className="rounded-circle mb-4 mt-5"
                    style={{ width: "200px", height: "200px" }}
                  />
                )}
                <div className="d-flex align-items-center">
                  <button
                    onClick={handleProfilePictureEdit}
                    className="material-icons text-5xl"
                    style={{ border: "none", background: "none", marginTop: "-10px" }}
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
              <h4 className="mb-0 mr-2" style={{ lineHeight: "1.5" }}>
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
          </>
        </div>
      );
    }
  }
}

export default Profile;
