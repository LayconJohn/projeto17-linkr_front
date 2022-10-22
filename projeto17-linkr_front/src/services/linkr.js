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

export {listTrendingHashtags}