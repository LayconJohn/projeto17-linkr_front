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


export { listTrendingHashtags, createHeaders}