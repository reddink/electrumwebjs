import React, {useState} from 'react';
import {useAuth} from '../context/AuthContext.jsx';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username);
    navigate('/dashboard');
  };

  return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start pt-16">
        <header className="mb-4">
          <h1 className="text-4xl font-bold text-blue-600 text-center">Login</h1>
        </header>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login
          </button>
        </form>
      </div>
  );
};

export default Login;
