import Navbar1 from "../components/Navbar/Navbar1";
import CalendarSidebar from "../components/Sidebar/CalendarSidebar";
import Sidebar from "../components/Sidebar/Sidebar";
import TwitterThread from "../components/Testing/TwitterThread";
import { useEffect, useState, useCallback } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Button } from "react-bootstrap";
const Timeline = () => {
  const { keycloak } = useKeycloak();

  //   useEffect(() => {
  //     if (!keycloak.authenticated) {
  //       keycloak?.login();
  //     }
  //   }, []);

  const login = useCallback(() => {
    console.log("login");
    keycloak?.login();
  }, [keycloak]);
  useEffect(() => {});

  return (
    <>
      <Navbar1 />
      {/* <CalendarSidebar />
      <Sidebar />
      <TwitterThread /> */}
      <div>
        <div>{`User is ${
          !keycloak.authenticated ? "NOT " : ""
        }authenticated`}</div>

        {!!keycloak.authenticated && (
          <Button variant="contained" onClick={() => keycloak.logout()}>
            Logout
          </Button>
        )}

        <Button variant="contained" onClick={login}>
          Login
        </Button>
      </div>
    </>
  );
};

export default Timeline;
