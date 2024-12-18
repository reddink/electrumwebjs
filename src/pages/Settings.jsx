// src/pages/Settings.js
import React, {useState, useEffect} from 'react';
import {useElectrum} from '../context/ElectrumContext.jsx';

function Settings() {
  const {walletStore, monitor, unloadWallet} = useElectrum();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [alert, setAlert] = React.useState(null); // State for the alert

  // Load settings from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // Save settings to localStorage
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    alert('Settings saved!');
  };

  // Stop electrum server and delete wallet configuration
  const handleStopAndDelete = () => {
    // Add logic to stop electrum server here
    console.log('Stopping electrum server...'); // Replace with actual stop server logic
    monitor.stop();
    unloadWallet();
    setAlert({ type: 'success', message: 'Electrum server stopped and wallet configuration deleted.' });
    setTimeout(() => {
        setAlert(null); // Clear alert after 3 seconds
      }, 3000);
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
          <div className="flex items-center justify-between">
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Settings
            </button>
          </div>
        </form>
        {/* New Button Below the Form */}
        {walletStore ? (
            <div className="mt-4">
              <button
                  type="button"
                  onClick={handleStopAndDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Stop Server & Delete Wallet
              </button>
            </div>
        ) : null};
        {/* Alert Section */}
        {alert && (
            <div
                className={`px-4 py-3 text-center ${
                    alert.type === 'error'
                        ? 'bg-red-100 text-red-800 border-red-400'
                        : 'bg-green-100 text-green-800 border-green-400'
                } border rounded mb-4 mx-6`}
            >
              {alert.message}
            </div>
        )}

      </div>
  );
}

export default Settings;
