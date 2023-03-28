import KeyCloakService from "../security/KeyCloakService.ts";

const apiURL = process.env.REACT_APP_API_URL;

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
