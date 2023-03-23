import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Timeline from "./views/Timeline";
import Dashboard from "./views/Dashboard";
import KeyCloakService from "./security/KeyCloakService.ts";
import Profile from "./views/Profile";
import { useEffect, useState, useCallback } from "react";
import { getUser, createUser, getPosts } from "./api/apiHandler";
import Storage from "./storage/storage";
import { PulseLoader } from "react-spinners";
import GroupList from "./views/GroupList";
import TopicList from "./views/TopicList";
import Navbar1 from "./components/Navbar/Navbar1";
import EventList from "./views/Event";
import keycloak from "./security/keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { useKeycloak } from "@react-keycloak/web";

function Routing() {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  if (keycloak.authenticated) {
    navigate("/timeline");
  } else {
    keycloak.login();
  }
  return <></>;
}

export default Routing;
