import React from "react";
import { useNavigate } from "react-router-dom";

function Favorites({ favorites, onSelectFavorite, onRemoveFavorite }) {
  const navigate = useNavigate();

  const handleSelectFavorite = (location) => {
    onSelectFavorite(location);
    navigate("/dashboard"); // Redirige al dashboard
  };

  return (
    <div className="favorites-container">
      <h2>Ubicaciones Favoritas</h2>
      {favorites.length === 0 ? (
        <p>No tienes ubicaciones favoritas aún.</p>
      ) : (
        <ul className="list-group">
          {favorites.map((favorite, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span onClick={() => handleSelectFavorite(favorite)}>
                {favorite}
              </span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onRemoveFavorite(favorite)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
