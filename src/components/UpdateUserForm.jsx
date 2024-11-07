import React, { useState } from 'react';

function UpdateUserForm({ token, onUpdate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la información.');
      }

      setSuccess('Información actualizada exitosamente.');
      onUpdate();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="update-user-form">
      <h2>Actualizar Información del Usuario</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su nuevo correo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Nueva Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su nueva contraseña"
          />
        </div>
        <button type="submit" className="update-button">Actualizar</button>
      </form>
    </div>
  );
}

export default UpdateUserForm;
