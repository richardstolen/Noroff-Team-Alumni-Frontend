import NavBar1 from "../components/Navbar/Navbar1";
import React, { useState, useEffect } from "react";

import {
  getUsers,
  getUser,
  getUserByUsername,
  createUser,
  editUsername,
  editUserBio,
  editUserStatus,
  editUserFunFact,
} from "../api/apiHandler";
import KeyCloakService from "../security/KeyCloakService.ts";
import Storage from "../storage/storage";
// import { PulseLoader } from "react-spinners";

function Profile({ user_id }) {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newFunFact, setNewFunFact] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleStatusEdit = () => {
    const newStatus = prompt("Enter new status:");
    if (newStatus !== null) {
      editUserStatus(newStatus);
      setUser({ ...user, status: newStatus });
    }
  };

  const handleBioEdit = () => {
    const newBio = prompt("Enter new bio:");
    if (newBio !== null) {
      editUserBio(newBio);
      setUser({ ...user, bio: newBio });
    }
  };

  const handleFunFactEdit = () => {
    const newFunFact = prompt("Enter new fun fact:");
    if (newFunFact !== null) {
      editUserFunFact(newFunFact);
      setUser({ ...user, funFact: newFunFact });
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
        if (user == null) {
          // If no user exists because of registration, create new user in DB
          user = await createUser();
        }
        Storage.setUser(user);
      }
      setUser(user);

      console.log(user.groups);
    }
    fetchUser();
  }, [user_id]);

  if (!user) {
    return (
      <div className="text-center">
        <NavBar1 />
        Loading...
      </div>
    );
    //   <div>
    //   <PulseLoader className="spinning-wheel" color="#0d6efd" />
    //   </div>
    // </div>)
  } else {
    if (!KeyCloakService.GetId()) {
      //=== searchedUser.userId legge til dette
      return (
        <div className="text-center text-muted mb-4">
          <>
            <NavBar1 />
            <img
              src={user.image}
              alt="Profile"
              className="rounded-circle mb-4"
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
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
            ></link>
            <img
              src={user.image}
              alt="Profile"
              className="rounded-circle mb-4"
              style={{ width: "200px", height: "200px" }}
            />
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
                {user.status}&nbsp;&nbsp;
              </h4>
              <div className="d-flex align-items-center">
                <button
                  onClick={handleStatusEdit}
                  className="material-icons text-red-600 text-5xl"
                >
                  edit
                </button>
                <div className="ml-2">Edit status</div>
              </div>
            </div>

            <div
              className="d-flex justify-content-center align-items-center mb-4"
              style={{ color: "#666" }}
            >
              <h4 className="mb-0 mr-2" style={{ lineHeight: "1.5" }}>
                {user.bio}&nbsp;&nbsp;
              </h4>
              <div className="d-flex align-items-center">
                <button
                  onClick={handleBioEdit}
                  className="material-icons text-red-600 text-5xl"
                >
                  edit
                </button>
                <div className="ml-2">Edit bio</div>
              </div>
            </div>

            <div
              className="d-flex justify-content-center align-items-center mb-4"
              style={{ color: "#666" }}
            >
              <h4 className="mb-0 mr-2" style={{ lineHeight: "1.5" }}>
                {user.funFact}&nbsp;&nbsp;
              </h4>
              <div className="d-flex align-items-center">
                <button
                  onClick={handleFunFactEdit}
                  className="material-icons text-red-600 text-5xl"
                >
                  edit
                </button>
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
