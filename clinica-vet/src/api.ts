import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la solicitud:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    if (error.response) {
      const message = error.response.data.error || 'Error en el servidor';
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(new Error(message));
    }
    return Promise.reject(new Error('Error de conexión'));
  }
);

export default api;