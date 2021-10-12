import axios from 'axios';
import { getTokenValueStorage } from '../security/auth';

import { BASE_URL } from './constants';

export const apiBasic = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: "teste",
    password: "teste"
  }
});

export const apiBearer = axios.create({
  baseURL: BASE_URL,  
  headers: { Authorization: `Bearer ${getTokenValueStorage()}` }
});

