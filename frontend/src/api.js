import axios from 'axios';

// Professional Base Configuration
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Matches your Django server log
});

// Request Interceptor: Automatically attaches the JWT 'Passport'
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); // Pulls the token we verified
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Handshake for AWS RDS
  }
  return config;
});

export default api;