// src/components/WeatherDashboard.jsx
import React, { useState, useEffect } from 'react';
import { getWeather, getLunarPhase } from '../services/api';
import MainWeatherInfo from './MainWeatherInfo';
import LunarPhase from './LunarPhase';
import WeeklyForecast from './WeeklyForecast';
import Map from './Map';

function WeatherDashboard({ token }) {
  const [weatherData, setWeatherData] = useState(null);
  const [lunarData, setLunarData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const weather = await getWeather('defaultCity', token); // Puedes configurar una ciudad predeterminada
      const lunar = await getLunarPhase(token);
      setWeatherData(weather);
      setLunarData(lunar);
    }
    fetchData();
  }, [token]);

  return (
    <div>
      <MainWeatherInfo data={weatherData} />
      <LunarPhase data={lunarData} />
      <WeeklyForecast data={weatherData?.forecast} />
      <Map />
    </div>
  );
}

export default WeatherDashboard;
