import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redireccionar

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/auth/login', { // Asegúrate de usar el puerto correcto
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
      onLogin(data.token); // Pasa el token al estado de App
      localStorage.setItem('token', data.token); // Guarda el token en localStorage

      // Redirigir al usuario a la pantalla de clima
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su usuario"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <button type="submit" className="login-button">Ingresar</button>
        <button type="submit" className="login-button">Registrese</button>
      </form>
    </div>
  );
}

export default LoginForm;
