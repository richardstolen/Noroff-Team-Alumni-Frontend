import KeyCloakService from "../security/KeyCloakService.ts";

const apiURL = "https://teamalumninetbackend20230314105723.azurewebsites.net";

export async function getTopicPost(id) {
  console.log("GET topicPost(ID)");
  const response = await fetch(`${apiURL}/post/topic/topic_id`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      targetGroup: id,
      // "content-type": "application/json",
    }),
  });
  if (response.ok) {
    const post = await response.json();
    console.log(post);
    return post;
  }
}

export async function joinTopic(topic_id) {
  console.log("JOIN TOPIC");
  const response = await fetch(`${apiURL}/topic/${topic_id}/join`, {
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

export async function createTopic(name, description) {
  console.log("CREATE TOPIC");
  const response = await fetch(`${apiURL}/topic`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      CreatedBy: KeyCloakService.GetId(),
      Name: name,
      Description: description,
    }),
  });

  if (response.ok) {
    const topic = await response.json();
    return topic;
  }
}

export async function getTopic(topic_id) {
  console.log("GET TOPIC(ID)");
  const response = await fetch(`${apiURL}/topic/${topic_id}`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
    }),
  });
  if (response.ok) {
    const topic = await response.json();
    console.log(topic);
    return topic;
  } 
}

export async function getTopics() {
  console.log("GET TOPICS");
  const response = await fetch(`${apiURL}/topic`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
    }),
  });
  if (response.ok) {
    const topics = await response.json();
    return topics;
  }
}



async function leaveTopic(topic_id) {
  console.log("LEAVE TOPIC");
  const response = await fetch(`${apiURL}/topic/${topic_id}/remove`, {
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

const TopicAPI = {
  leaveTopic,
};

export default TopicAPI;
