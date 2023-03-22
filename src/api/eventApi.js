import KeyCloakService from "../security/KeyCloakService.ts";
const apiURL = "https://teamalumninetbackend20230314105723.azurewebsites.net";

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




export async function createEvent(name, description, accepted) {
    console.log("CREATE EVENT");
    const response = await fetch(`${apiURL}/event`, {
        method: "POST",
        headers: new Headers({
            Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({
            CreatedBy: KeyCloakService.GetId(),
            Name: name,
            Description: description,
            Accepted: accepted,
        }),
    });

    if (response.ok) {
        const event = await response.json();
        return event;
    }
}