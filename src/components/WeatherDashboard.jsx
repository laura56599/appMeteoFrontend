import React, { useEffect, useState } from "react";
import { getWeather, getLunarPhase } from "../services/api";
import MainWeatherInfo from "./MainWeatherInfo";
import LunarPhase from "./LunarPhase";
import WeeklyForecast from "./WeeklyForecast";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import HamburgerMenu from "./HamMenu";
import Header from "./Header";
import PropTypes from "prop-types";

function WeatherDashboard({ onLogout, token = "", onAddFavorite = () => {} }) {
  const [weatherData, setWeatherData] = useState(null);
  const [lunarData, setLunarData] = useState(null);
  const [cityName, setCityName] = useState("Bogota");
  const [favorites, setFavorites] = useState([]);

  // Manejo de búsqueda de ciudad
  const handleCitySearch = async (city) => {
    if (!city.trim()) {
      alert("Por favor, ingrese una ciudad válida.");
      return;
    }
    try {
      const data = await getWeather(city, token);
      setWeatherData(data);
      setCityName(city);
    } catch (error) {
      console.error("Error en la búsqueda de ciudad:", error.message);
      alert("Error al obtener los datos de la ciudad.");
    }
  };

  // Manejo de agregar a favoritos
  const handleAddFavorite = () => {
    if (!favorites.includes(cityName, country)) {
      setFavorites([...favorites, cityName, country]);
      onAddFavorite(cityName, country);
      alert(`${cityName, country} ha sido agregada a tus favoritos.`);
    } else {
      alert("Esta ciudad ya está en tus favoritos.");
    }
  };

  // Obtener ubicación actual
  const handleCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Coordenadas obtenidas:", latitude, longitude); // Log para depuración

        // Cambia aquí para pasar las coordenadas en lugar de 'Ubicación actual'
        const location = `${latitude},${longitude}`;
        console.log("Ubicación a enviar:", location); // Log para depuración

        try {
          const data = await getWeather(location, token); // Usa las coordenadas aquí
          setWeatherData(data);
          setCityName(`${latitude},${longitude}`); // Esta es solo la etiqueta, puedes dejarla si quieres mostrarla en la UI
        } catch (error) {
          console.error("Error obteniendo la ubicación actual:", error);
        }
      },
      (error) => {
        console.error("Error obteniendo la ubicación actual:", error);
      }
    );
  };

  // Cargar datos meteorológicos y fase lunar
  useEffect(() => {
    async function fetchData() {
      try {
        const weather = await getWeather(cityName, token);
        console.log("Datos del clima:", weather); // Verificar los datos de clima
        setWeatherData(weather);

        const lunar = await getLunarPhase(cityName, token);
        console.log("Datos de la fase lunar:", lunar); // Verificar los datos de la fase lunar
        setLunarData(lunar);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    fetchData();
  }, [token, cityName]);

  // Extraer el país de la dirección resuelta
  const country = weatherData?.resolvedAddress
    ? weatherData.resolvedAddress.split(',').pop()
    : "País no disponible";

  return (
    <Container fluid>
      <HamburgerMenu onLogout={onLogout} />
      <Header onSearch={handleCitySearch}
      handleCurrentLocation={handleCurrentLocation} />

      {/* Información meteorológica y fase lunar */}
      <Row className="justify-content-center mt-4">
        <Col md={6} lg={5}>
          <Card className="p-4 text-center">
            <h2 className="mb-4">Información Meteorológica en {cityName}, {country}</h2>
            <h3>Temperatura actual: {weatherData?.currentConditions?.temp ?? "No disponible"} °C</h3>
            <p>Viento: {weatherData?.currentConditions?.windspeed ?? "No disponible"} km/h</p>
            <p>Humedad: {weatherData?.currentConditions?.humidity ?? "No disponible"}%</p>
            <p>Probabilidad de Lluvia: {weatherData?.currentConditions?.precip ?? "0"}%</p>
            <Button onClick={handleAddFavorite} className="mt-3 btn-primary">
              Agregar a Favoritos
            </Button>
          </Card>
        </Col>

        {/* Fase lunar */}
        <Col md={6} lg={3}>
          {lunarData ? (
            <LunarPhase data={lunarData} />
          ) : (
            <Card className="p-4 text-center">
              <p>No hay datos de fase lunar disponibles.</p>
            </Card>
          )}
        </Col>
      </Row>

      {/* Pronóstico semanal */}
      <Row className="justify-content-center mt-4">
        <Col md={10}>
          <h3 className="text-center">Pronóstico Semanal</h3>
          {weatherData?.days ? (
            <WeeklyForecast data={weatherData.days} />
          ) : (
            <p className="text-center">No hay datos de pronóstico disponibles.</p>
          )}
        </Col>
      </Row>

      {/* Lista de favoritos */}
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h3 className="text-center">Tus Ciudades Favoritas</h3>
          {favorites.length > 0 ? (
            <ul className="list-group">
              {favorites.map((favCity, index) => (
                <li key={index} className="list-group-item">
                  {favCity}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No tienes ciudades favoritas guardadas.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

WeatherDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
  token: PropTypes.string,
  onAddFavorite: PropTypes.func,
};

export default WeatherDashboard;
