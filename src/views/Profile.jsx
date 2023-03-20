import NavBar1 from "../components/Navbar/Navbar1";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Container, Offcanvas } from "react-bootstrap";
import {
  getUsers,
  getUser,
  getUserByUsername,
  createUser,
} from "../api/apiHandler";
import KeyCloakService from "../security/KeyCloakService.ts";
import Storage from "../storage/storage";
//import {Icon} from "react-materialize";

function Profile({ user_id }) {
  const [user, setUser] = useState(null);

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
        <>
          <NavBar1 />
        </>
        Loading...
      </div>
    );
  }

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
        <h2 className="text-dark mb-4">{user.userName}</h2>
        <h3 className="mb-4">{user.status}</h3>
        <h4 className="mb-4">{user.bio}</h4>
        <h4 className="mb-4">{user.funFact}</h4>
      </>
    </div>
  );
}

// function EditUserDetail (userid)

//   // DISPLAY BIO

//   // BUTTON FOR CHANGE?  (on_click --> do something)

//   // HTML FIELD WHERE USER CAN INPUT BIO

//   // STORE IT TO A LOCAL VARIABLE (NEW_BIO)

//    editUserBio(new_bio)
// )

export default Profile;
