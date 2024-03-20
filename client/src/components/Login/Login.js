import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../api';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import UserContext from '../../context/UserContext/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = useContext(ThemeContext);
  const { setUser, authenticate, setToken } = useContext(UserContext);
  const history = useHistory();

  const handleLogin = async () => {
    const result = await login(username, password);
    if (result.success) {
      authenticate()
      setUser(result.data.user)
      setToken(result.data.token)
      history.push('/');
    } else {
      alert("Password wrong. Please Try again.");
      return;
    }
  };

  const handleRegisterClick = () => {
    history.push('/register');
  };

  const containerStyle = {
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#333',
  };

  return (
    <div className="bg-gradient-to-b from-indigo-400 to-indigo-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96" style={containerStyle}>
        <h2 className="text-3xl mb-4 text-indigo-500 font-semibold text-center">
          Welcome to Foodies
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{' '}
          <span
            className="text-indigo-500 cursor-pointer hover:underline"
            onClick={handleRegisterClick}
          >
            Click to Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;