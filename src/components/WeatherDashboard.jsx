import React, { useEffect, useState } from 'react';
import { getWeather, getLunarPhase} from '../services/api';
import MainWeatherInfo from './MainWeatherInfo';
import LunarPhase from './LunarPhase';
import WeeklyForecast from './WeeklyForecast';
import '../styles.css';


function WeatherDashboard({ onLogout,token }) {
  const [weatherData, setWeatherData] = useState(null);
  const [lunarData, setLunarData] = useState(null);

useEffect(() => {
    async function fetchData() {
      try {
        const location = 'Bogotá'; // Aquí puedes cambiar por la ciudad que necesites
        const weather = await getWeather(location, token);
        setWeatherData(weather);

        const lunar = await getLunarPhase(location, token);
        setLunarData(lunar);
      } catch (error) {
        console.error('Error al obtener los datos del clima o la fase lunar:', error);
      }
    }

    fetchData();
  }, [token]);

  return (
        <div>
      <h1>Bienvenido al Dashboard Meteorológico</h1>
      {weatherData ? (
        <>
          <p>La temperatura actual es: {weatherData?.days[0]?.temp} °C</p>
          <MainWeatherInfo data={weatherData} />
          <WeeklyForecast data={weatherData?.days} />
        </>
      ) : (
        <p>Cargando información del clima...</p>
      )}
      {lunarData ? (
        <LunarPhase data={lunarData} />
      ) : (
        <p>Cargando información de la fase lunar...</p>
      )}
      <button onClick={onLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default WeatherDashboard;