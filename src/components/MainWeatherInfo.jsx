import React from 'react';

function MainWeatherInfo({ data }) {
  return (
    <div>
      <h2>{data.city}</h2>
      <p>Temperatura: {data.temperature}°C</p>
      <p>Estado: {data.condition}</p>
      <p>Humedad: {data.humidity}%</p>
      <p>Viento: {data.wind_speed} km/h</p>
    </div>
  );
}

export default MainWeatherInfo;
