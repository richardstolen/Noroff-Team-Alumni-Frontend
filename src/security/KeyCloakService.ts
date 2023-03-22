import React from "react";
import Keycloak from "keycloak-js";
import { KeycloakInitOptions } from "keycloak-js";
import Storage from "../storage/storage";

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
    refreshToken: RefreshToken(),
    token: AccessToken(),
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
function Logout() {
  Storage.clearStorage();
  keycloak.logout();
}
const AccessToken = () => keycloak.token;
const RefreshToken = () => keycloak.refreshToken;
const Id = () => keycloak.tokenParsed?.sub;

const KeyCloakService = {
  CallLogin: Login,
  GetUserName: UserName,
  GetAccesstoken: AccessToken,
  GetRefreshToken: RefreshToken,
  GetId: Id,
  CallLogout: Logout,
};

export default KeyCloakService;
