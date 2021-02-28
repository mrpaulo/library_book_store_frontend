import axios from 'axios';

import { BASE_URL } from './constants';

const api = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: "teste",
    password: "teste"
  }
});

export default api;