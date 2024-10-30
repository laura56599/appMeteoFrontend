// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import WeatherDashboard from './components/WeatherDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';

function App() {
  const [token, setToken] = useState(null);

  // Cargar el token de localStorage cuando la app inicia
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Manejar el login guardando el token
  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // Manejar el logout eliminando el token
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
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
              <WeatherDashboard onLogout={handleLogout} />
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
