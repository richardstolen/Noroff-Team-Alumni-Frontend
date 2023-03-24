import KeyCloakService from "../security/KeyCloakService.ts";

const apiURL = "https://teamalumninetbackend20230314105723.azurewebsites.net";
//const apiURL = "https://localhost:7288";

export async function getEventbyId(id) {
  console.log("GET EVENT(ID)");
  const response = await fetch(`${apiURL}/event/${id}`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
    }),
  });
  if (response.ok) {
    const eventId = await response.json();
    return eventId;
  }
}

export async function getEventByUser() {
  console.log("GET EVENT(USER_ID)");
  const response = await fetch(`${apiURL}/event`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      user_id: KeyCloakService.GetId(),
    }),
  });
  if (response.ok) {
    const eventUser = await response.json();
    console.log(eventUser);
    return eventUser;
  }
}

export async function joinEvent(event_id) {
  console.log("JOIN GROUP");
  const response = await fetch(`${apiURL}/group/${event_id}/join`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "Content-Type": "application/json",
      user_id: KeyCloakService.GetId(),
    }),
    // body: JSON.stringify({

    // }),
  });

  if (response.ok) {
    const group = await response.json();
    return group;
  }
}

export async function createEvent(description, date) {
  console.log("CREATE EVENT");
  console.log(description);
  console.log(new Date(date).toISOString());
  const response = await fetch(`${apiURL}/event`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "Content-Type": "application/json",
      type: "group",
      id: "1",
    }),
    body: JSON.stringify({
      userID: KeyCloakService.GetId(),
      description: description,
      date: new Date(date).toISOString(),
    }),
  });

  if (response.ok) {
    const event = await response.json();
    return event;
  }
}
