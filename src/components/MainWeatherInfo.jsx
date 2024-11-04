function MainWeatherInfo({ data }) {
  if (!data || !data.city) {
    return <p>Cargando información del clima...</p>;
  }

  return (
    <div>
      <h2>Clima en {data.city}</h2>
      <p>Temperatura actual: {data.temperature}°C</p>
    </div>
  );
}

export default MainWeatherInfo;