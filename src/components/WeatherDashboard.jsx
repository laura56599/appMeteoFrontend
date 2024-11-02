import React, { useEffect, useState } from 'react';
import { getWeather, getLunarPhase } from '../services/api';
import MainWeatherInfo from './MainWeatherInfo';
import LunarPhase from './LunarPhase';
import WeeklyForecast from './WeeklyForecast';
import '../styles.css';


function WeatherDashboard({ onLogout,token }) {
  const [weatherData, setWeatherData] = useState(null);
  const [lunarData, setLunarData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const weather = await getWeather('defaultCity', token);
      const lunar = await getLunarPhase(token);
      setWeatherData(weather);
      setLunarData(lunar);
    }
    fetchData();
  }, [token]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard Meteorologico</h1>
        <button className="logout-button" onClick={onLogout}>Cerrar Sesion</button>
      </header>

      <section className="main-weather-info">
        <h2>Informacion Principal del Clima</h2>
        {weatherData ? (
          <MainWeatherInfo weatherData={weatherData} />
        ) : (
          <p>Cargando infromacion del clima...</p>
            )}
      </section>

      <section className="lunar-phase">
        <h2>Fase Lunar Actual</h2>
        {lunarData ? (
          <LunarPhase data={lunarData} />
        ) : (
          <p>Cargando infromacion de la fase lunar...</p>
            )}
      </section>

      <section className="weekly-forecast">
        <h2>Pronostico Semanal</h2>
        {weatherData?.forecast ? (
          <WeeklyForecast data={weatherData.forecast}/>
        ) : (
          <p>Cargando pronostico Semanal...</p>
            )}
      </section>
    </div>
  );
}

export default WeatherDashboard;