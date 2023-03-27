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
  console.log("Join Event");
  console.log(event_id);
  const response = await fetch(`${apiURL}/event/event_id/invite/user/user_id`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "Content-Type": "application/json",
      user_id: KeyCloakService.GetId(),
      event_id: event_id,
      type: "user",
    }),
    // body: JSON.stringify({

    // }),
  });

  if (response.ok) {
    return response;
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

async function leaveEvent(event_id) {
  console.log("Leave Event");
  console.log(event_id);
  const response = await fetch(
    `${apiURL}/event/event_id/invite/user/user_id/remove`,
    {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
        "Content-Type": "application/json",
        user_id: KeyCloakService.GetId(),
        event_id: event_id,
        type: "user",
      }),
    }
  );

  if (response.ok) {
    return response;
  }
}

const EventAPI = {
  leaveEvent,
};

export default EventAPI;
