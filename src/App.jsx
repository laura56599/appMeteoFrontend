// src/App.jsx
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import WeatherDashboard from './components/WeatherDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
      {!token ? (
        <LoginForm onLogin={(token) => setToken(token)} />
      ) : (
        <WeatherDashboard token={token} />
      )}
    </div>
  );
}

export default App;
