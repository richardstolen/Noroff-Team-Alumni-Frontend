import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
  // TODO MUST HIDE IN ENV VARIABLES
  url: "https://teamalumnikeycloak.azurewebsites.net/auth",
  realm: "TeamAlumniRealm",
  clientId: "TeamAlumniClient",
});
export const initialize = () => {
  const config = {
    onload: "check-sso",
    checkLoginIframe: false,
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
  };
  return keycloak.init(config);
};
export default keycloak;
