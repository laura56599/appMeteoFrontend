import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import WeatherDashboard from "./components/WeatherDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Favorites from "./components/Favorites";
import "bootstrap/dist/css/bootstrap.min.css";
import FavoritesView from "./components/FavoritesView";

function App() {
  const [token, setToken] = useState(null);

  // Cargar el token de localStorage cuando la app inicia
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Manejar el login guardando el token
  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // Manejar el logout eliminando el token
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Agregar un nuevo favorito
  const handleAddFavorite = (location) => {
    if (!Favorites.includes(location)) {
      const updatedFavorites = [...Favorites, location];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  // Eliminar un favorito
  const handleRemoveFavorite = (location) => {
    const updatedFavorites = Favorites.filter((fav) => fav !== location);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Router>
      <Routes>
        {/* Redirigir la raíz ("/") a "/login" si no está autenticado */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Ruta de Login */}
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

        {/* Ruta Protegida para el Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute token={token} redirectTo="/login">
              <WeatherDashboard onLogout={handleLogout} token={token} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute token={token} redirectTo="/login">
              <FavoritesView token={token} />
              <Favorites
                favorites={Favorites}
                onSelectFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
              />
            </ProtectedRoute>
          }
        />

        {/* Redirección para rutas no definidas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
