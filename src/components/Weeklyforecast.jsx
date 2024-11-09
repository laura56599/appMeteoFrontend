import React from "react";
import "../Styles/weeklyForecast.css"; // Ajusta la ruta si `Styles` está fuera de `components`
import PropTypes from "prop-types";

function WeeklyForecast({ data }) {
  return (
    <div className="weekly-forecast-container">
      {data.map((day, index) => (
        <div key={index} className="forecast-day-card">
          <div className="forecast-day-card-header">
            <p className="forecast-day">{day.day}</p>
          </div>
          <div className="forecast-day-card-body">
            <p>Día: {day?.datetime || "No disponible"}</p>
            <p>Temperatura Máxima: {day?.tempmax || "No disponible"}°C</p>
            <p>Temperatura Mínima: {day?.tempmin || "No disponible"}°C</p>
            <p>Condición: {day?.conditions || "No disponible"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


export default WeeklyForecast;
