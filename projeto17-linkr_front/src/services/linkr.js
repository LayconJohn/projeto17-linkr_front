import axios from "axios";

const BASE_URL = "https://projeto17linkr-backend.herokuapp.com/";

function listTrendingHashtags() {
    /*const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };*/
      const promisse = axios.get(`${BASE_URL}/hashtag`);
    return promisse;
}

function listPublicationsByHashtag(hashtag) {
  const promisse = axios.get(`${BASE_URL}/hashtag/${hashtag}`);
  return promisse;
}

function listHashtagsByPublication(publicationId) {
  const promisse = axios.get(`${BASE_URL}/hashtag/publication/${publicationId}`)
  return promisse;
}

function likePublication({token, publicationId}) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const promisse = axios.post(`${BASE_URL}/like/${publicationId}`, null, config);
  return promisse;
}

function verifyIdPublicationIsLiked({token, publicationId}) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const promisse = axios.get(`${BASE_URL}/like/${publicationId}/isLiked`, config);
  return promisse;
}

export {listTrendingHashtags, listPublicationsByHashtag, listHashtagsByPublication, likePublication, verifyIdPublicationIsLiked}