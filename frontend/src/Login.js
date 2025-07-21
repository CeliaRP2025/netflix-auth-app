// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering
      ? 'http://localhost:8000/api/register/' // Endpoint para registro
      : 'http://localhost:8000/api/login/';   // Endpoint para login

    try {
      const response = await axios.post(url, {
        username,
        password,
      });

      if (isRegistering) {
        setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
      } else {
        setMessage('Inicio de sesión exitoso.');
        console.log('Token recibido:', response.data);
        // Puedes guardar el token en localStorage si lo necesitas:
        // localStorage.setItem('token', response.data.access);
      }
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.detail || 'Ocurrió un error'));
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Registrarse' : 'Iniciar sesión'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? 'Registrarse' : 'Iniciar sesión'}</button>
      </form>
      <p>{message}</p>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  );
};
export default Login;
