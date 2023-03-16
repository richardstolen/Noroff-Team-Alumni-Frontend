import React from "react";
import Keycloak from "keycloak-js";
import { KeycloakInitOptions } from "keycloak-js";

const keycloak = new Keycloak({
  // TODO MUST HIDE IN ENV VARIABLES
  url: "https://teamalumnikeycloak.azurewebsites.net/auth",
  realm: "TeamAlumniRealm",
  clientId: "TeamAlumniClient",
});

const Login = (onAuthenticatedCallback: Function) => {
  const initoptions: KeycloakInitOptions = {
    onLoad: "login-required",
    pkceMethod: "S256",

    checkLoginIframe: false,
  };
  keycloak
    .init(initoptions)
    .then(function (authenticated) {
      authenticated ? onAuthenticatedCallback() : alert("non authenticated");
    })
    .catch((e) => {
      console.dir(e);
      console.log(`keycloak init exception: ${e}`);
    });
};

const UserName = () => keycloak.tokenParsed?.preferred_username;
const Logout = () => keycloak.logout;
const AccessToken = () => keycloak.token;
const Id = () => keycloak.tokenParsed?.sub;

const KeyCloakService = {
  CallLogin: Login,
  GetUserName: UserName,
  GetAccesstoken: AccessToken,
  GetId: Id,
  CallLogout: Logout,
};

export default KeyCloakService;