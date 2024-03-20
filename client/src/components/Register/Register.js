import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { signup } from '../../api';
import ThemeContext from '../../context/ThemeContext/ThemeContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { theme } = useContext(ThemeContext);

  const handleRegister = async () => {
    const result = await signup(username, email, password);
    if (result.success) {
      alert("Register Successfully!");
      history.push('/login');
    } else {
      alert("Fail to register.");
      return;
    }
  };

  const containerStyle = {
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#333',
  };

  return (
    <div className="bg-gradient-to-b from-blue-400 to-blue-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96" style={containerStyle}>
        <h2 className="text-3xl mb-4 text-blue-500 font-semibold text-center">
          Register a New Account
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{' '}
          <a className="text-blue-500" href="/login">Login Now</a>
        </p>
      </div>
    </div>
  );
};

export default Register;