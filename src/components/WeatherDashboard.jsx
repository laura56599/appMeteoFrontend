import React, { useEffect, useState } from "react";
import { getWeather, getLunarPhase } from "../services/api";
import MainWeatherInfo from "./MainWeatherInfo";
import LunarPhase from "./LunarPhase";
import WeeklyForecast from "./WeeklyForecast";
import HamburgerMenu from "./HamMenu";
import Header from "./Header";
import PropTypes from "prop-types";

function WeatherDashboard({ onLogout, token, onAddFavorite }) {
  const [weatherData, setWeatherData] = useState(null);
  const [lunarData, setLunarData] = useState(null);
  const [currentCity, setCurrentCity] = useState("");

  const handleCitySearch = async (city) => {
    if (!city.trim()) {
      alert("Por favor, ingrese una ciudad válida.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:4000/weather?location=${city}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener datos del clima");
      }
      const data = await response.json();
      setWeatherData(data?.data); // Verifica la estructura de `data` en la respuesta
    } catch (error) {
      console.error("Error en la búsqueda de ciudad:", error.message);
    }
  };

  const handleLocationSearch = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `http://localhost:4000/weather/location?lat=${latitude}&lon=${longitude}`
            );
            if (!response.ok) {
              throw new Error(
                "Error al obtener datos del clima de la ubicación actual"
              );
            }
            const data = await response.json();
            setWeatherData(data?.data); // Verifica la estructura de `data` en la respuesta
          } catch (error) {
            console.error(
              "Error al obtener datos de la ubicación actual:",
              error.message
            );
          }
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error.message);
          alert(
            "Error obteniendo la ubicación. Asegúrate de permitir acceso a la ubicación."
          );
        }
      );
    } else {
      console.error("Geolocalización no soportada en este navegador.");
      alert("Tu navegador no soporta la geolocalización.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const location = "Bogota"; // Puedes cambiar esto a la ciudad predeterminada que prefieras
        const weather = await getWeather(location, token);
        setWeatherData(weather);

        const lunar = await getLunarPhase(location, token);
        setLunarData(lunar);
      } catch (error) {
        console.error(
          "Error al obtener los datos del clima o la fase lunar:",
          error
        );
      }
    }

    fetchData();
  }, [token]);

  return (
    <div>
      <HamburgerMenu onLogout={onLogout} />
      <Header
        onSearch={handleCitySearch}
        onCurrentLocation={handleLocationSearch}
      />
      <div className="container mt-4">
        {weatherData && weatherData.days ? (
          <>
            <div className="card mt-4 p-3">
              <h3>La temperatura actual es: {weatherData.days[0]?.temp} °C</h3>
              <MainWeatherInfo data={weatherData} />
              <WeeklyForecast data={weatherData.days} />
            </div>
          </>
        ) : (
          <div className="text-center mt-4">
            <p>Cargando información del clima...</p>
          </div>
        )}
        {lunarData ? (
          <LunarPhase data={lunarData} />
        ) : (
          <div className="text-center mt-4">
            <p>Cargando información de la fase lunar...</p>
          </div>
        )}
      </div>
    </div>
  );
}

WeatherDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
  token: PropTypes.func.isRequired,
};
export default WeatherDashboard;
