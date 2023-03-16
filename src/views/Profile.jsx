import NavBar1 from "../components/Navbar/Navbar1";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Card, Container, Offcanvas } from 'react-bootstrap';
import { getUsers, getUser, getUserByUsername } from "../api/apiHandler";
import KeyCloakService from "../security/KeyCloakService.ts";
//import {Icon} from "react-materialize";


  function Profile({ user_id }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
      async function fetchUser() {
        // fetch user data by user_id from the API
        const user = await getUser(KeyCloakService.GetId());
        setUser(user);
      }
      fetchUser();
    }, [user_id]);

    if (!user) {
      return (<div className="text-center"><><NavBar1/></>Loading...</div>)
    } 

    return (
      <div className="text-center text-muted mb-4">
        <>
        <NavBar1/>
        <img src={user.image} alt="Profile" className="rounded-circle mb-4" style={{ width: '200px', height: '200px' }} />
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