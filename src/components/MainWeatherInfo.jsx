import PropTypes from "prop-types";

function MainWeatherInfo({ data }) {
  if (!data || !data.city) {
    return <p></p>;
  }

  return (
    <div>
      <h2>Clima en {data.city}</h2>
      <p>Temperatura actual: {data.temperature}°C</p>
    </div>
  );
}

MainWeatherInfo.propTypes = {
  data: PropTypes.shape({
    city: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
  }).isRequired,
};

export default MainWeatherInfo;
