import React, { useEffect, useState } from "react";
import { getWeather, getLunarPhase } from "../services/api";
import MainWeatherInfo from "./MainWeatherInfo";
import LunarPhase from "./LunarPhase";
import WeeklyForecast from "./Weeklyforecast";
import HamburgerMenu from "./HamMenu";
import Header from "./Header";
import PropTypes from "prop-types";

function WeatherDashboard({ onLogout, token, onAddFavorite }) {
  const [weatherData, setWeatherData] = useState(null);
  const [lunarData, setLunarData] = useState(null);
  const [cityName, setCityName] = useState(""); // Estado para el nombre de la ciudad
  const [favorites, setFavorites] = useState([]); // Estado para los favoritos
  const [userId, setUserId] = useState(null);

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
    setCityName(city); // Actualiza el nombre de la ciudad
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
          setWeatherData(data?.data);
          setCityName(data?.data?.city); // Actualiza el nombre de la ciudad con el valor de la respuesta
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

  // Función para agregar la ciudad actual a favoritos

  const handleAddFavorite = async () => {
  if (!cityName) {
    alert("No hay ninguna ciudad seleccionada para agregar a favoritos.");
    return;
  }

  // Evitar duplicados en favoritos en el estado local
  if (favorites.includes(cityName)) {
    alert("Esta ciudad ya está en tus favoritos.");
    return;
  }

  // Añade aquí la constante o estado de `country`
  const country = "Colombia"; // Asegúrate de asignar el país correspondiente
  
  try {
    // Llamada al backend para guardar el favorito
    const response = await fetch('http://localhost:4000/favorite/addfav', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Asegúrate de que el token está configurado
      },
      body: JSON.stringify({ city: cityName, country, userId }), // Incluye `country`, `cityName` y `userId`
    });

    if (!response.ok) {
      throw new Error("Error al agregar favorito en la base de datos");
    }

    // Si se guarda correctamente en la base de datos, actualiza el estado local
    setFavorites([...favorites, cityName]);
    alert(`${cityName} ha sido agregada a tus favoritos.`);
  } catch (error) {
    console.error("Error al guardar el favorito:", error.message);
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
              <button
                onClick={handleAddFavorite}
                className="btn btn-primary mt-2"
              >
                Agregar a Favoritos
              </button>
              <WeeklyForecast data={weatherData.days} />
            </div>
          </>
        ) : (
          <div className="text-center mt-4">
            <p>Cargando información del clima...</p>
          </div>
        )}
        {lunarData ? (
          <LunarPhase data={{
            phase: lunarData.phase,
            illumination: lunarData.illumination || 0,
            date: lunarData.date
          }} />
        ) : (
          <div className="text-center mt-4">
            <p>Cargando información de la fase lunar...</p>
          </div>
        )}
      </div>

      {/* Lista de favoritos */}
      <div className="mt-4">
        <h4>Tus Ciudades Favoritas</h4>
        <ul>
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => (
              <li key={index}>{favorite}</li>
            ))
          ) : (
            <p>No tienes ciudades favoritas guardadas.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default WeatherDashboard;