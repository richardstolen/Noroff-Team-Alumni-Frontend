import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import KeyCloakService from "./security/KeyCloakService.ts";
import { BrowserRouter } from "react-router-dom";
import { initialize } from "./security/keycloak.js";
import Navbar1 from "./components/Navbar/Navbar1";
import DummyNavbar from "./components/Navbar/DummyNavbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<DummyNavbar></DummyNavbar>); // Initialize Keycloak
initialize()
  .then(() => {
    root.render(<App />);
  })
  .catch((error) => {
    root.render(<p>Not connected to keycloak ...</p>);
    console.log(error);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
