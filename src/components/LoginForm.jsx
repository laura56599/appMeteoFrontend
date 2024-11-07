import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setlastName] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
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
        throw new Error('Error en el login. Verifica tus credenciales.');
      }

      const data = await response.json();
      onLogin(data.access_token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      password,
      email,
      name,
      last_name: lastName, 
    };

    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Error en el registro. Intenta nuevamente.');
      }

      setIsRegistering(false); // Cambiar a la vista de login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-form-container">
      {isRegistering ? (
        <form className="login-form" onSubmit={handleRegister}>
          <h2>Registrar Nuevo Usuario</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingrese su nombre"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Apellido</label>
            <input
              type="text"
              id="last_name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              placeholder="Ingrese su apellido"
              required
            />
          </div>
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
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo"
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
          <button type="submit" className="login-button">
            Registrar
          </button>
          <button
            type="button"
            className="switch-button"
            onClick={() => setIsRegistering(false)}
          >
            ¿Ya tienes cuenta? Iniciar Sesión
          </button>
        </form>
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">
            Ingresar
          </button>
          <button
            type="button"
            className="switch-button"
            onClick={() => setIsRegistering(true)}
          >
            ¿No tienes cuenta? Regístrate
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginForm;

