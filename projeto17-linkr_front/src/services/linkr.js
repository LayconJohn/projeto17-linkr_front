import axios from "axios";

const BASE_URL = "http://localhost:4000";

function listTrendingHashtags() {
  /*const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };*/
  const promisse = axios.get(`${BASE_URL}/hashtag`);
  return promisse;
}


function createHeaders() {
  const auth = JSON.parse(localStorage.getItem('linkr'));
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`
    }
  };

  return config;
}


function postSignUp(body) {
  const promise = axios.post(`${BASE_URL}/sign-up`, body);
  return promise

}

function postSignIn(body) {
  const promise = axios.post(`${BASE_URL}/sign-in`, body);
  return promise
}

export { listTrendingHashtags, createHeaders, postSignIn, postSignUp }