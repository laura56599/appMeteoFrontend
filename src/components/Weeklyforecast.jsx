// src/components/WeeklyForecast.jsx
import React from 'react';

function WeeklyForecast({ data }) {
  if (!data) return null;

  return (
    <div className="weekly-forecast">
      <h3>Pronóstico Semanal</h3>
      <ul>
        {data.map((day, index) => (
          <li key={index}>
            <p>Día: {day.date}</p>
            <p>Temperatura Máx: {day.max_temp}°C</p>
            <p>Temperatura Mín: {day.min_temp}°C</p>
            <p>Condición: {day.condition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeeklyForecast;
