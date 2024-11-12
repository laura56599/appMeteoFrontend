import React from "react";
import "../Styles/weeklyForecast.css"; // Ajusta la ruta si `Styles` está fuera de `components`
import cloudyIcon from "../assets/weather/cloudy.svg";
import rainyIcon from "../assets/weather/rainy.svg";
import sunnyIcon from "../assets/weather/sunny.svg";
import stormIcon from "../assets/weather/storm.svg";
import defaultIcon from "../assets/weather/default.svg";

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
  
// Mapea las condiciones del clima a los archivos SVG en assets
const getWeatherIcon = (condition) => {
  if (condition.includes("Nublado")) return cloudyIcon;
  if (condition.includes("Lluvia")) return rainyIcon;
  if (condition.includes("Soleado") || condition.includes("Claro")) return sunnyIcon;
  if (condition.includes("Tormenta")) return stormIcon;
  return defaultIcon; // Ícono predeterminado
};



function WeeklyForecast({ data }) {
  return (
    <div className="d-flex flex-wrap justify-content-center weekly-forecast-container">
      {data.map((day, index) => (
        <div key={index} className="card text-white bg-primary m-2" style={{ width: '18rem' }}>
          <div className="card-header text-center d-flex align-items-center justify-content-between">
            <div>
              <p className="forecast-day mb-0"><strong>{getDayName(day?.datetime) || "No disponible"}</strong></p>
              <p className="forecast-date mb-0">{getFormattedDate(day?.datetime) || "No disponible"}</p>
            </div>
            <img
              src={getWeatherIcon(day?.conditions)}
              alt="Icono del clima"
              style={{ width: '70px', height: '70px' }} // Aumenta el tamaño del icono
              className="ms-2"
            />
          </div>
          <div className="card-body forecast-day-card-body text-center">
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