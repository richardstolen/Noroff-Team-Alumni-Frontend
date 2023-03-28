import KeyCloakService from "../security/KeyCloakService.ts";

const apiURL = process.env.REACT_APP_API_URL;

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
    return eventUser;
  }
}

export async function getAcceptedEventByUser() {
  console.log("GET ACCEPTED EVENTS(USER_ID)");
  const response = await fetch(`${apiURL}/event/accepted`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      user_id: KeyCloakService.GetId(),
    }),
  });
  if (response.ok) {
    const eventUser = await response.json();
    return eventUser;
  }
}

export async function joinEvent(event_id) {
  console.log("Join Event");
  const response = await fetch(`${apiURL}/event/join`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "Content-Type": "application/json",
      user_id: KeyCloakService.GetId(),
      event_id: event_id,
    }),
  });

  if (response.ok) {
    return response;
  }
}

export async function createEvent(title, description, date, type, id) {
  console.log("CREATE EVENT");
  console.log(description);
  console.log(new Date(date).toISOString());
  const response = await fetch(`${apiURL}/event`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "Content-Type": "application/json",
      type: type,
      id: id,
    }),
    body: JSON.stringify({
      userID: KeyCloakService.GetId(),
      title: title,
      description: description,
      date: new Date(date).toISOString(),
    }),
  });

  if (response.ok) {
    const event = await response.json();
    return event;
  }
}

// async function leaveEvent(event_id) {
//   console.log("Leave Event");
//   const response = await fetch(`${apiURL}/event/leave`, {
//     method: "POST",
//     headers: new Headers({
//       Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
//       "Content-Type": "application/json",
//       user_id: KeyCloakService.GetId(),
//       event_id: event_id,
//     }),
//   });

//   if (response.ok) {
//     return response;
//   }
// }

async function leaveEvent(event_id) {
  console.log("Leave Event");
  const response = await fetch(`${apiURL}/event/${event_id}/remove`, {
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

const EventAPI = {
  leaveEvent,
};

export default EventAPI;
