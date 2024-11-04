// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login fallido. Verifica tus credenciales.');
      }

      const data = await response.json();
      onLogin(data.token); // Guarda el token en el estado y localStorage
      localStorage.setItem('token', data.token); // Almacena el token en localStorage

      // Verificar que esta línea se ejecuta
      console.log("Redirigiendo a /dashboard");
      navigate('/dashboard'); // Redirige a la pantalla de clima
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '22rem' }}>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {error && <p className="alert alert-danger text-center">{error}</p>}
          <div className="form-group mb-3">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="Ingrese su usuario"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
