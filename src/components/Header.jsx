import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

function Header({ onSearch, onCurrentLocation }) {
  const [city, setCity] = React.useState("");

  const handleSearch = () => {
    onSearch(city);
    if (!city.trim()) {
      alert("Por favor, ingrese una ciudad.");
      return;
    }
    onSearch(city);
  };

  const handleCurrentLocation = () => {
    console.log("Buscando ubicación actual");
    onCurrentLocation();
  };
  return (
    <header className="header container-fluid bg-primary text-light py-3 d-flex justify-content-between align-items-center">
      <div className="search-container d-flex align-items-center">
        <input
          type="text"
          placeholder="Ingrese Ciudad"
          className="form-control me-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-light me-2">
          Buscar
        </button>
        <button
          onClick={handleCurrentLocation}
          className="btn btn-outline-light"
        >
          Ubicación Actual
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onCurrentLocation: PropTypes.func.isRequired,
};
export default Header;
