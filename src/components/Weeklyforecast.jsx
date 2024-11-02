import React from 'react';

function WeeklyForecast({ data }) {
  return (
    <div>
      {data.map((day, index) => (
        <div key={index} className="forecast-day">
          <p>Día: {day.day}</p>
          <p>Temperatura Máxima: {day.maxTemp}°C</p>
          <p>Temperatura Mínima: {day.minTemp}°C</p>
          <p>Condición: {day.condition}</p>
        </div>
      ))}
    </div>
  );
}

export default WeeklyForecast;