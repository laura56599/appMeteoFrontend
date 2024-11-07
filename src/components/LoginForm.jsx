import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
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
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          {isRegistering ? (
            <form onSubmit={handleRegister}>
              <h2 className="card-title text-center">Registrar Nuevo Usuario</h2>
              {error && <p className="alert alert-danger">{error}</p>}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su nombre"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">Apellido</label>
                <input
                  type="text"
                  id="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su apellido"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Usuario</label>
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
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su correo"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
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
              <button type="submit" className="btn btn-primary w-100 mb-3">
                Registrar
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => setIsRegistering(false)}
              >
                ¿Ya tienes cuenta? Iniciar Sesión
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <h2 className="card-title text-center">Iniciar Sesión</h2>
              {error && <p className="alert alert-danger">{error}</p>}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Usuario</label>
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
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
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
              <button type="submit" className="btn btn-primary w-100 mb-3">
                Ingresar
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => setIsRegistering(true)}
              >
                ¿No tienes cuenta? Regístrate
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
