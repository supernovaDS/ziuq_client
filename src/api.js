import axios from 'axios';
const baseURLprod = 'https://ziuq-server.onrender.com/api';
const baseURLdev = 'http://localhost:4000/api';
const API = axios.create({ baseURL: baseURLdev });

// Add token to every request automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;