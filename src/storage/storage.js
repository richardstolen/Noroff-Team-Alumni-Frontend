const storage = sessionStorage;
const USER_KEY = "user";
const GROUPS_KEY = "groups";
const TOPICS_KEY = "topics";
const POSTS_KEY = "posts";

function getUser() {
  return JSON.parse(storage.getItem(USER_KEY));
}

function setUser(user) {
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

function clearStorage() {
  storage.clear();
}

const Storage = {
  getUser,
  setUser,
  getGroups,
  setGroups,
  getPosts,
  setPosts,
  clearStorage,
};

export default Storage;
