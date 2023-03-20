import KeyCloakService from "../security/KeyCloakService.ts";

const apiURL = "https://teamalumninetbackend20230314105723.azurewebsites.net";
//const apiURL = "https://localhost:7288";

//export const user_id = "BF47A31B-1EFC-4E11-8765-D530577FDCB3";

export async function getUsers() {
  console.log("GET USERS");
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
  console.log("GET USER(ID)");
  const response = await fetch(`${apiURL}/user/${id}`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "access-control-allow-origin": "*",
    }),
  });
  if (response.ok) {
    const user = await response.json();
    console.log(user);
    return user;
  }
}

export async function editUserBio(bio) {
  console.log("EDIT USER BIO");
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
  console.log("EDIT USER STATUS");
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
  console.log("EDIT USER FUNFACT");
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
  console.log("GET USER BY USERNAME");
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
  console.log("GET GROUPS");
  const response = await fetch(`${apiURL}/groups`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
    }),
  });
  if (response.ok) {
    const groups = await response.json();
    return groups;
  }
}

export async function createUser() {
  console.log("CREATE USER");
  const response = await fetch(`${apiURL}/user`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
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

export async function createGroup(name, description, isPrivate) {
  console.log("CREATE GROUP");
  const response = await fetch(`${apiURL}/group`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      CreatedBy: KeyCloakService.GetId(),
      Name: name,
      Description: description,
      IsPrivate: isPrivate,
    }),
  });

  if (response.ok) {
    const group = await response.json();
    return group;
  }
}

export async function joinGroup(group_id) {
  console.log("JOIN GROUP");
  const response = await fetch(`${apiURL}/group/${group_id}/join`, {
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

export async function sendMessage(title, body, targetUser) {
  console.log("SEND MESSAGE");
  const target_user = await getUserByUsername(targetUser);
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

export async function getPosts() {
  console.log("GET POSTS");
  const response = await fetch(`${apiURL}/post`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      user_id: KeyCloakService.GetId(),
      "Access-Control-Allow-Origin": "*",
    }),
  });
  if (response.ok) {
    const posts = await response.json();
    posts.map((post) => {
      const date = new Date(post.lastUpdate);
      const month = date.toLocaleString("default", { month: "long" });
      const dateString = ` ${date.getDate()}. ${month} at ${date.getHours()}:${date.getMinutes()}`;
      post.lastUpdate = dateString;
      return post;
    });
    return posts;
  }
}

export async function editPost(post) {
  console.log("EDIT POST");
  const response = await fetch(`${apiURL}/post/${post.postId}`, {
    method: "PATCH",
    headers: new Headers({
      user_id: KeyCloakService.GetId(),
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "content-type": "application/json",
    }),
    body: JSON.stringify({
      postid: post.postId,
      title: post.title,
      body: post.body,
    }),
  });
  if (response.ok) {
    return response.ok;
  }
}

export async function deletePost(postId) {
  console.log("DELETE POST");
  const response = await fetch(`${apiURL}/post/${postId}`, {
    method: "DELETE",
    headers: new Headers({
      user_id: KeyCloakService.GetId(),
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "content-type": "application/json",
    }),
  });
  if (response.ok) {
    return response.ok;
  }
}

export async function commentPost(post) {
  console.log("COMMENT ON POST");
  console.log(post);
  const response = await fetch(`${apiURL}/post`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "Content-Type": "application/json",
      user_id: KeyCloakService.GetId(),
    },
    body: JSON.stringify({
      userId: KeyCloakService.GetId(),
      title: post.title,
      body: post.body,
      targetPost: post.postId,
    }),
  });

  if (response.ok) {
    return response;
  }
}
