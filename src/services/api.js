import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

// Función para login
export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error('Error en el login');
  return response.json();
};

// Instancia de Axios con la URL base
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Función para obtener datos del clima
export const getWeather = async (location, token) => {
  try {
    console.log("Location en la solicitud:", location); // Log para verificar el valor de location
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: { location },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data; // Asegúrate de acceder a la data correctamente
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    throw error;
  }
};


export const getLunarPhase = async (location, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather/lunar-phase`, {
      params: { location },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data; // Accede a los datos que necesitas
  } catch (error) {
    console.error('Error al obtener la fase lunar:', error);
    throw error;
  }
};
