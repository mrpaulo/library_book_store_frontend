import axios from 'axios';
import { getTokenValueStorage } from '../security/auth';

import { BASE_API_URL, BASE_URL } from './constants';

export const apiBasic = axios.create({
  baseURL: BASE_API_URL,
  auth: {
    username: "client",
    password: "teste"
  }
});

export const apiBearer = axios.create({
  baseURL: BASE_API_URL 
});

export const apiLogin = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: "client",
    password: "teste"
  }
});

export  const getBearerHeader = () =>{
  let token = getTokenValueStorage();  
  return {
    headers: { Authorization: `Bearer ${token}` }
  }
}