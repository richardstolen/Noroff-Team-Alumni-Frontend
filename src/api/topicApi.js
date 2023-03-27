import KeyCloakService from "../security/KeyCloakService.ts";
import { formatDate } from "../utils/dateFormat";

//const apiURL = "https://teamalumninetbackend20230314105723.azurewebsites.net";
const apiURL = "https://localhost:7288";

export async function getTopicPost(id) {
  console.log("GET topicPost(ID)");
  const response = await fetch(`${apiURL}/post/topic/topic_id`, {
    headers: new Headers({
      Authorization: "Bearer " + KeyCloakService.GetAccesstoken(),
      targetTopic: id,
      // "content-type": "application/json",
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
