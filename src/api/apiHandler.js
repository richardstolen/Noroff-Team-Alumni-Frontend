import KeyCloakService from "../security/KeyCloakService.ts";
import { formatDate } from "../utils/dateFormat";

const apiURL = process.env.REACT_APP_API_URL;

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

export async function getUser(userId) {
  console.log("GET USER(ID)");
  const response = await fetch(`${apiURL}/user/${userId}`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
    }),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  }
}

export async function editUserProfilePicture(image) {
  console.log(image);
  const response = await fetch(`${apiURL}/user/${KeyCloakService.GetId()}`, {
    method: "PATCH",
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "content-type": "application/json",
    }),
    body: JSON.stringify({
      UserId: KeyCloakService.GetId(),
      image: image,
    }),
  });
  if (response.ok) {
    return response.ok;
  }
}

export async function editUsername(username) {
  console.log(username);
  const response = await fetch(`${apiURL}/user/${KeyCloakService.GetId()}`, {
    method: "PATCH",
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "content-type": "application/json",
    }),
    body: JSON.stringify({
      UserId: KeyCloakService.GetId(),
      username: username,
    }),
  });
  if (response.ok) {
    return response.ok;
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

export async function getGroup(groupId) {
  console.log("GET GROUP(ID)");
  const response = await fetch(`${apiURL}/group/${groupId}`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
    }),
  });
  if (response.ok) {
    const group = await response.json();
    return group;
  }
}

export async function getTopic(topicId) {
  console.log("GET TOPIC(ID)");
  const response = await fetch(`${apiURL}/topic/${topicId}`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
    }),
  });
  if (response.ok) {
    const group = await response.json();
    console.log(group);
    return group;
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
      userId: KeyCloakService.GetId(),
      userName: KeyCloakService.GetUserName(),
    }),
  });

  if (response.ok) {
    const user = await response.json();
    console.log("Create user: ", user);
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
  });
  if (response.ok) {
    return response;
  }
}

export async function sendMessage(body, targetUser) {
  console.log("SEND MESSAGE");
  const target_user = await getUserByUsername(targetUser);
  const response = await fetch(`${apiURL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
    },
    body: JSON.stringify({
      userId: KeyCloakService.GetId(),
      body: body,
      targetUser: target_user.userId,
    }),
  });

  if (response.ok) {
    const user = await response.json();
    return user;
  }
}

export async function getMessages() {
  console.log("GET MESSAGES");
  const response = await fetch(`${apiURL}/post/user`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      user_id: KeyCloakService.GetId(),
    }),
  });
  if (response.ok) {
    const messages = await response.json();

    messages.map((messageList) => {
      return messageList.messages.map((message) => {
        message.lastUpdate = formatDate(message.lastUpdate);
      });
    });

    return messages;
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
      post.comments.map((comment) => {
        comment.lastUpdate = formatDate(comment.lastUpdate);
      });
      post.lastUpdate = formatDate(post.lastUpdate);
      return post;
    });
    return posts;
  }
}

export async function getGroupPost(id) {
  console.log("GET groupPost(ID)");
  const response = await fetch(`${apiURL}/post/group/group_id`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      targetGroup: id,
    }),
  });
  if (response.ok) {
    const posts = await response.json();
    posts.map((post) => {
      post.comments.map((comment) => {
        comment.lastUpdate = formatDate(comment.lastUpdate);
      });
      post.lastUpdate = formatDate(post.lastUpdate);
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

export async function deletePost(post) {
  console.log("DELETE POST");
  const response = await fetch(`${apiURL}/post/${post.postId}`, {
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

export async function createPost(post, target_id, target) {
  console.log("CREATE POST");

  let body = {
    userId: KeyCloakService.GetId(),
    title: post.title,
    body: post.body,
  };

  if (target === "group") {
    body.targetGroup = target_id;
  } else if (target === "topic") {
    body.targetTopic = target_id;
  } else if (target === "event") {
    body.targetEvent = target_id;
  }

  const response = await fetch(`${apiURL}/post`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "Content-Type": "application/json",
      user_id: KeyCloakService.GetId(),
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return response;
  }
}
