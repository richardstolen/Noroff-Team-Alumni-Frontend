import KeyCloakService from "../security/KeyCloakService.ts";

const apiURL = "https://teamalumninetbackend20230314105723.azurewebsites.net";

//export const user_id = "BF47A31B-1EFC-4E11-8765-D530577FDCB3";

export async function getUsers() {
  const response = await fetch(`${apiURL}/users`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
    }),
  });
  if (response.ok) {
    const user = await response.json();
    console.log(user);
    return user[0];
  }
}

export async function getUser(id) {
  const response = await fetch(`${apiURL}/user/${id}`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
    }),
  });
  if (response.ok) {
    const user = await response.json();
    console.log(user);
    return user;
  }
}

export async function editUserBio(bio) {
  console.log(bio);
  const response = await fetch(`${apiURL}/user/${KeyCloakService.GetId()}`, {
    method: "PATCH",
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "content-type": "application/json",
    }),
    body: JSON.stringify({
      UserId: KeyCloakService.GetId(),
      Bio: bio,
    }),
  });
  if (response.ok) {
    return response.ok;
  }
 }


export async function editUserStatus(status) {
  console.log(status);
  const response = await fetch(`${apiURL}/user/${KeyCloakService.GetId()}`, {
    method: "PATCH",
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "content-type": "application/json",
    }),
    body: JSON.stringify({
      UserId: KeyCloakService.GetId(),
      status: status,
    }),
  });
  if (response.ok) {
    return response.ok;
  }
}

export async function editUserFunFact(funFact) {
  console.log(funFact);
  const response = await fetch(`${apiURL}/user/${KeyCloakService.GetId()}`, {
    method: "PATCH",
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "content-type": "application/json",
    }),
    body: JSON.stringify({
      UserId: KeyCloakService.GetId(),
      funFact: funFact,
    }),
  });
  if (response.ok) {
    return response.ok;
  }
}




export async function getUserByUsername(username) {
  const response = await fetch(`${apiURL}/user/username/${username}`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
    }),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  }
}

export async function getGroups() {
  const response = await fetch(`${apiURL}/groups`);
  if (response.ok) {
    const groups = await response.json();
    console.log(groups);
    return groups[0];
  }
}

export async function createUser() {
  const response = await fetch(`${apiURL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UserId: KeyCloakService.GetId(),
      UserName: KeyCloakService.GetUserName(),
    }),
  });

  if (response.ok) {
    const user = await response.json();
    return user;
  }
}

export async function sendMessage(title, body, targetUser) {
  const target_user = await getUserByUsername(targetUser);
  console.log(target_user);
  const response = await fetch(`${apiURL}/Posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: KeyCloakService.GetId(),
      title: title,
      body: body,
      targetUser: target_user.userId,
    }),
  });

  if (response.ok) {
    const user = await response.json();
    return user;
  }
}
