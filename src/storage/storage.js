const storage = sessionStorage;
const USER_KEY = "user";
const SEARCHED_USER_KEY = "searched-user";
const GROUPS_KEY = "groups";
const TOPICS_KEY = "topics";
const POSTS_KEY = "posts";
const EVENT_KEY = "event";
const DM_KEY = "direct-messages";

function getUser() {
  return JSON.parse(storage.getItem(USER_KEY));
}

function setUser(user) {
  if (user.groups === null) {
    user.groups = [];
  }
  if (user.topics === null) {
    user.topics = [];
  }

  storage.setItem(USER_KEY, JSON.stringify(user));
}

function getGroups() {
  return JSON.parse(storage.getItem(GROUPS_KEY));
}

function setGroups(groups) {
  storage.setItem(GROUPS_KEY, groups);
}

function getPosts() {
  return JSON.parse(storage.getItem(POSTS_KEY));
}

function setPosts(posts) {
  storage.setItem(POSTS_KEY, JSON.stringify(posts));
}

function getEventByUser() {
  return JSON.parse(storage.getItem(EVENT_KEY));
}

function setEvent(event) {
  storage.setItem(EVENT_KEY, JSON.stringify(event));
}

function getEventById(id) {
  return JSON.parse(storage.getItem(EVENT_KEY));
}

function setSearchedUser(user) {
  storage.setItem(SEARCHED_USER_KEY, JSON.stringify(user));
}

function getSearchedUser() {
  return JSON.parse(storage.getItem(SEARCHED_USER_KEY));
}

function clearSearchedUser() {
  storage.removeItem(SEARCHED_USER_KEY);
}

function clearStorage() {
  storage.clear();
}

function setDirectMessages(messages) {
  storage.setItem(DM_KEY, JSON.stringify(messages));
}

function getDirectMessages() {
  return JSON.parse(storage.getItem(DM_KEY));
}

const Storage = {
  getUser,
  setUser,
  getGroups,
  setGroups,
  getPosts,
  setPosts,
  getEventByUser,
  getEventById,
  setEvent,
  setSearchedUser,
  getSearchedUser,
  clearSearchedUser,
  clearStorage,
  setDirectMessages,
  getDirectMessages,
};

export default Storage;
