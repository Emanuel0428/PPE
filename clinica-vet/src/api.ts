import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data.error || 'Error en el servidor';
      return Promise.reject(new Error(message));
    }
    return Promise.reject(new Error('Error de conexión'));
  }
);

export default api;