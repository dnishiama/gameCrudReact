import axios from 'axios';

const API_URL = 'http://localhost:5000/api/games/';

const getGames = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const createGame = (game) => {
  return axios.post(API_URL, game, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const updateGame = (id, game) => {
  return axios.put(`${API_URL}${id}`, game, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const deleteGame = (id) => {
  return axios.delete(`${API_URL}${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export default {
  getGames,
  createGame,
  updateGame,
  deleteGame,
};
