import React from "react";
import "../Styles/weeklyForecast.css"; // Ajusta la ruta si `Styles` está fuera de `components`

// Función para obtener el nombre del día de la semana
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { weekday: 'long' }).charAt(0).toUpperCase() + date.toLocaleDateString('es-ES', { weekday: 'long' }).slice(1);
};
  
// Función para obtener la fecha en formato DD/MM/AAAA
  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };


function WeeklyForecast({ data }) {
  return (
    <div className="d-flex flex-wrap justify-content-center weekly-forecast-container">
      {data.map((day, index) => (
        <div key={index} className="card text-white bg-primary m-2" style={{ width: '18rem' }}>
          <div className="card-header text-center">
            <p className="forecast-day"><strong>{getDayName(day?.datetime) || "No disponible"}</strong></p>
            <p className="forecast-date">{getFormattedDate(day?.datetime) || "No disponible"}</p>
          </div>
          <div className="card-body forecast-day-card-body">
            <p className="card-text"><strong>Temperatura Máxima:</strong> {day?.tempmax || "No disponible"}°C</p>
            <p className="card-text"><strong>Temperatura Mínima:</strong> {day?.tempmin || "No disponible"}°C</p>
            <p className="card-text"><strong>Condición:</strong> {day?.conditions || "No disponible"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeeklyForecast;