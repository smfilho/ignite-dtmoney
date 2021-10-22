import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://hardcore-hypatia-a81ed6.netlify.app/',
  //baseURL: 'http://localhost:3000/api',
});
