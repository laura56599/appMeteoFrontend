// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajusta la URL según tu configuración
});

// Ejemplo de función para login
export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data; // Retorna el token recibido
};

// Ejemplo para obtener datos del clima
export const getWeather = async (city, token) => {
  const { data } = await api.get(`/weather?city=${city}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Ejemplo para obtener datos de fase lunar
export const getLunarPhase = async (token) => {
  const { data } = await api.get('/lunar-phase', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export default api;
