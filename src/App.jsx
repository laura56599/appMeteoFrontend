import { useState } from 'react'
import React from 'react'
import CitySearch from './components/CitySearch'
import WeatherDisplay from './components/WeatherDisplay'
import LunarWidget from './components/LunarWidget'
import { fetchWeatherData } from './services/weatherService'
import './App.css'
import LoginForm from './components/LoginForm'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Verificar si hay un token en localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSearch = (city) => {
    fetchWeatherData(city).then(data => setWeatherData(data));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      <h1>Weather App</h1>
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <CitySearch onSearch={handleSearch} />
          <WeatherDisplay weatherData={weatherData} />
          <LunarWidget />
        </>
      )}
    </div>
  );
};

export default App;