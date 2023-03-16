const storage = sessionStorage;
const USER_KEY = "user";
const SEARCHED_USER_KEY = "searched-user";
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

const Storage = {
  getUser,
  setUser,
  getGroups,
  setGroups,
  getPosts,
  setPosts,
  setSearchedUser,
  getSearchedUser,
  clearSearchedUser,
  clearStorage,
};

export default Storage;
