
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error('Error en el login');
  return response.json();
};


const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Ajusta la URL según tu configuración
});


// Ejemplo para obtener datos del clima
export const getWeather = async (city, token) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/weather`, {
      params: { city }, // Agregar el parámetro `city`
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    throw error;
  }
};

// Ejemplo para obtener datos de fase lunar
export const getLunarPhase = async (token) => {
  const { data } = await api.get('/lunar-phase', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export default api;
