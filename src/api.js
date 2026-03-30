import axios from 'axios';
export const baseURLprod = 'https://ziuq-server.onrender.com/api';
export const baseURLdev = 'http://localhost:4000/api';
const API = axios.create({ baseURL: baseURLdev });

// Add token to every request automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;