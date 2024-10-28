const API_BASE_URL = 'http://localhost:4000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchWeatherData = async (city) => {
  const response = await fetch(`${API_BASE_URL}/weather?city=${city}`, {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const fetchLunarData = async () => {
  const response = await fetch(`${API_BASE_URL}/lunar`, {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
