import KeyCloakService from "../security/KeyCloakService.ts";

const apiURL = "https://teamalumninetbackend20230314105723.azurewebsites.net";
//const apiURL = "https://localhost:7288";

async function leaveGroup(group_id) {
  console.log("LEAVE GROUP");
  const response = await fetch(`${apiURL}/group/${group_id}/remove`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "Content-Type": "application/json",
      user_id: KeyCloakService.GetId(),
    }),
  });

  if (response.ok) {
    return response;
  }
}

const GroupAPI = {
  leaveGroup,
};

export default GroupAPI;
