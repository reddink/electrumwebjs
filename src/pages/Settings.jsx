// src/pages/Settings.js
import React, {useState, useEffect} from 'react';

function Settings() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');

  // Load settings from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedWallet = localStorage.getItem('wallet');
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
    if (storedWallet) setWallet(storedWallet);
  }, []);

  // Save settings to localStorage
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('wallet', wallet);
    alert('Settings saved!');
  };

  return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start pt-16">
        <header className="mb-4">
          <h1 className="text-4xl font-bold text-blue-600 text-center">Settings</h1>
        </header>
        <form onSubmit={handleSave} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              My Key:
            </label>
            <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
  );
}

export default Settings;
