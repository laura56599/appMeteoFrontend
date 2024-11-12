import React, { useEffect, useState } from "react";
import { getWeather, getLunarPhase } from "../services/api";
import MainWeatherInfo from "./MainWeatherInfo";
import LunarPhase from "./LunarPhase";
import WeeklyForecast from "./Weeklyforecast";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import HamburgerMenu from "./HamMenu";
import Header from "./Header";
import PropTypes from "prop-types";

function WeatherDashboard({ onLogout, token = "", onAddFavorite = () => {} }) {
  const [weatherData, setWeatherData] = useState(null);
  const [lunarData, setLunarData] = useState(null);
  const [cityName, setCityName] = useState("Bogota");
  const [favorites, setFavorites] = useState([]);

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
    }
  };

  const handleAddFavorite = () => {
    if (!favorites.includes(cityName)) {
      setFavorites([...favorites, cityName]);
      onAddFavorite(cityName);
      alert(`${cityName} ha sido agregada a tus favoritos.`);
    } else {
      alert("Esta ciudad ya está en tus favoritos.");
    }
  };

 // Define la función onCurrentLocation
  const handleCurrentLocation = async () => {
    // Lógica para obtener la ubicación actual del usuario
    // Ejemplo básico
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await getWeather(`${latitude},${longitude}`, token);
      setWeatherData(data);
      setCityName("Ubicación actual");
    }, (error) => {
      console.error("Error obteniendo la ubicación actual:", error);
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const weather = await getWeather(cityName, token);
        setWeatherData(weather);
        const lunar = await getLunarPhase(cityName, token);
        setLunarData(lunar);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    fetchData();
  }, [token, cityName]);

  return (
    <Container fluid>
      <HamburgerMenu onLogout={onLogout} />
      <Header onSearch={handleCitySearch} />

      {/* Información meteorológica y fase lunar */}
      <Row className="justify-content-center mt-4">
        <Col md={6} lg={5}>
          <Card className="p-4 text-center">
            <h2 className="mb-4">Información Meteorológica en {cityName}</h2>
            <h3>Temperatura actual: {weatherData?.temp ?? "No disponible"} °C</h3>
            <p>Viento: {weatherData?.wind ?? "No disponible"} km/h</p>
            <p>Humedad: {weatherData?.humidity ?? "No disponible"}%</p>
            <p>Probabilidad de Lluvia: {weatherData?.rainProbability ?? "No disponible"}%</p>
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
