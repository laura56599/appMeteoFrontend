import React from 'react';

function Header({ onSearch, onCurrentLocation }) {
  const [city, setCity] = React.useState('');

  const handleSearch = () => {
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
    <header className="header">
      <div className="logo">
        <img src="path/to/logo.png" alt="Logo" className="logo-img" />
      </div>
      <input
        type="text"
        placeholder="Ingrese Ciudad"
        className="search-bar"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch} className="search-button">
        Buscar
      </button>
      <button onClick={handleCurrentLocation} className="location-button">
        Ubicación Actual
      </button>
    </header>
  );
}

export default Header;
