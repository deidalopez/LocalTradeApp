// const BASE_URL = 'http://192.168.0.181:3001';
const BASE_URL = process.env.EXPO_API_URL;
const APIservice = {};

APIservice.register = (user) => {
  const init = {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(user)
  };
  return fetch(`${BASE_URL}/register`, init)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

APIservice.login = (user) => {
  const init = {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(user)
  };
  return fetch(`${BASE_URL}/login`, init)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

APIservice.fetchUser = (user) => {
  const init = {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(user)
  };
  return fetch(`${BASE_URL}/`, init)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

APIservice.getUserByEmail = (email) => {
  const init = {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-type': 'application/json' },
  };
  return fetch(`${BASE_URL}/getByEmail/${email}`, init)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

APIservice.getUserById = (user_id) => {
  const init = {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-type': 'application/json' },
  };
  return fetch(`${BASE_URL}/getById/${user_id}`, init)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

// make post
APIservice.newPost = (post) => {
  const init = {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(post)
  };
  return fetch(`${BASE_URL}/newPost`, init)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

// getALLposts
APIservice.getAllPosts = () => {
  const init = {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-type': 'application/json' },
  };
  return fetch(`${BASE_URL}/allPosts`, init)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export default APIservice;