// src/pages/Settings.js
import React, { useState, useEffect } from 'react';

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
    <div className="AppBody">
      <header>
        <h1>Settings</h1>
      </header>
      <form onSubmit={handleSave}>
        <label>
          Username:
          <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br/>
        <label>
          Email:
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br/>
        <label>
          My Key:
          <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
          />
        </label>
        <br/>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
}

export default Settings;
